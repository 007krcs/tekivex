## LangChain Expression Language (LCEL)

LCEL uses Python's `|` pipe operator to chain *Runnables* into pipelines with streaming, batching, parallelism, and fallbacks built in.

<!-- title: lcel_basics.py -->
```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableParallel, RunnablePassthrough

llm = ChatOpenAI(model="gpt-4o-mini")

# 1. Basic chain
chain = (
    ChatPromptTemplate.from_messages([("human", "Summarize: {text}")])
    | llm | StrOutputParser()
)

# 2. Streaming
for chunk in chain.stream({"text": "Python is great for data science..."}):
    print(chunk, end="", flush=True)

# 3. Batch
results = chain.batch([{"text": "Text 1..."}, {"text": "Text 2..."}])

# 4. Parallel — run multiple chains concurrently
summary_chain  = ChatPromptTemplate.from_messages([("human", "Summarize in 1 sentence: {text}")]) | llm | StrOutputParser()
keywords_chain = ChatPromptTemplate.from_messages([("human", "Extract 5 keywords: {text}")]) | llm | StrOutputParser()

parallel = RunnableParallel({"summary": summary_chain, "keywords": keywords_chain, "original": RunnablePassthrough()})
result = parallel.invoke({"text": "Machine learning is a subset of AI..."})
print(result["summary"])
print(result["keywords"])
```
