## Setting Up LangChain

<!-- title: install.sh -->
```bash
pip install langchain langchain-openai langchain-anthropic langchain-community python-dotenv
```

<!-- title: first_chain.py -->
```python
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful coding assistant."),
    ("human", "Explain {concept} in simple terms with a Python example."),
])

chain = prompt | llm | StrOutputParser()
print(chain.invoke({"concept": "decorators"}))
```
