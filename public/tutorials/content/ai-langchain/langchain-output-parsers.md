## Why Output Parsers?

Output parsers coerce LLM text into structured Python objects — JSON dicts, Pydantic models, lists — making LLM outputs directly usable in code.

<!-- title: output_parsers.py -->
```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import CommaSeparatedListOutputParser
from langchain.output_parsers import PydanticOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

# 1. CommaSeparatedListOutputParser
list_parser = CommaSeparatedListOutputParser()
chain = ChatPromptTemplate.from_messages([
    ("human", "List 5 {category}. {format_instructions}"),
]) | llm | list_parser
result = chain.invoke({"category": "Python web frameworks", "format_instructions": list_parser.get_format_instructions()})
print(result)  # ['Django', 'Flask', 'FastAPI', 'Tornado', 'Starlette']

# 2. Pydantic Output Parser
class MovieReview(BaseModel):
    title: str = Field(description="Movie title")
    rating: float = Field(description="Rating from 0 to 10")
    genre: str = Field(description="Primary genre")
    recommended: bool = Field(description="Whether to recommend it")

parser = PydanticOutputParser(pydantic_object=MovieReview)
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a movie critic. {format_instructions}"),
    ("human", "Review the movie: {movie}"),
]).partial(format_instructions=parser.get_format_instructions())

review: MovieReview = (prompt | llm | parser).invoke({"movie": "Inception (2010)"})
print(f"Rating: {review.rating}/10 | Recommended: {review.recommended}")
```
