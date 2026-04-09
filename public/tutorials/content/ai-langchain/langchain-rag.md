## What is RAG?

**RAG** dynamically retrieves relevant documents from a knowledge base and injects them into the prompt, preventing hallucination and enabling up-to-date answers.

**Flow:**

1. **Load Docs** — PDF, web, DB, code
2. **Chunk** — Split into overlapping passages
3. **Embed** — Convert to dense vectors
4. **Vector Store** — Index vectors (FAISS/Chroma)
5. **Retrieve** — Find top-k similar chunks
6. **Generate** — LLM answers with context


<!-- title: rag_pipeline.py -->
```python
from langchain_community.document_loaders import WebBaseLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

# 1. Load
loader = WebBaseLoader("https://en.wikipedia.org/wiki/Transformer_(deep_learning_architecture)")
docs = loader.load()

# 2. Chunk
splits = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200).split_documents(docs)
print(f"Split into {len(splits)} chunks")

# 3. Embed & store
vectorstore = Chroma.from_documents(splits, OpenAIEmbeddings(model="text-embedding-3-small"))
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

# 4. RAG prompt
rag_prompt = ChatPromptTemplate.from_messages([
    ("system", "Answer using ONLY this context. Say 'I don't know' if unsure.\n\nContext:\n{context}"),
    ("human", "{question}"),
])

# 5. RAG chain
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
rag_chain = (
    {"context": retriever | (lambda docs: "\n\n".join(d.page_content for d in docs)),
     "question": RunnablePassthrough()}
    | rag_prompt | llm | StrOutputParser()
)

print(rag_chain.invoke("What is the attention mechanism in transformers?"))
```

> **TIP:** **Chunking strategy matters:** Use `chunk_size=1000` with `chunk_overlap=200` as a starting point. For code: chunk by function. For legal docs: chunk by section.
