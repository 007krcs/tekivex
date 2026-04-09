## Prompt Templates in LangChain

<!-- title: prompt_templates.py -->
```python
from langchain_core.prompts import (
    PromptTemplate, ChatPromptTemplate, FewShotPromptTemplate, MessagesPlaceholder,
)
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o-mini")

# 1. Basic PromptTemplate
template = PromptTemplate(
    input_variables=["language", "task"],
    template="Write a {language} function that {task}. Include docstring and type hints.",
)
print(template.format(language="Python", task="reverses a string in place"))

# 2. ChatPromptTemplate
chat_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an expert {domain} teacher who explains things step by step."),
    ("human", "Explain {topic} to a {level} student."),
])
chain = chat_prompt | llm
response = chain.invoke({"domain": "mathematics", "topic": "eigenvalues", "level": "undergraduate"})
print(response.content)

# 3. Few-Shot Template
examples = [
    {"input": "happy", "output": "sad"},
    {"input": "tall",  "output": "short"},
]
example_prompt = PromptTemplate(input_variables=["input", "output"], template="Input: {input}\nOutput: {output}")
few_shot = FewShotPromptTemplate(
    examples=examples, example_prompt=example_prompt,
    prefix="Give the antonym.", suffix="Input: {adjective}\nOutput:", input_variables=["adjective"],
)
print(few_shot.format(adjective="bright"))
```
