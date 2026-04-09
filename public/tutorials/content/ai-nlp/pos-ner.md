## Part-of-Speech (POS) Tagging

POS tagging assigns a grammatical label to each token — noun, verb, adjective, etc. It is the foundation for parsing, information extraction, and disambiguation.

| Tag | Meaning | Example |
| --- | --- | --- |
| NN | Noun (singular) | "dog", "city" |
| VB | Verb (base) | "run", "eat" |
| JJ | Adjective | "fast", "blue" |
| RB | Adverb | "quickly", "never" |
| IN | Preposition | "in", "on", "at" |

<!-- title: pos_ner.py -->
```python
import spacy

nlp = spacy.load("en_core_web_sm")
doc = nlp("Apple is looking to buy a startup in the UK for $1 billion.")

# POS tags
for token in doc:
    print(f"{token.text:15}{token.pos_:8}{token.tag_}")

# Named entities
print("\nEntities:")
for ent in doc.ents:
    print(f"{ent.text:20}{ent.label_:12}{spacy.explain(ent.label_)}")
# Apple          ORG         Companies, agencies
# UK             GPE         Countries, cities
# $1 billion     MONEY       Monetary values
```

| Entity Type | Description | Example |
| --- | --- | --- |
| PERSON | People, including fictional | "Elon Musk" |
| ORG | Companies, agencies, institutions | "Google", "MIT" |
| GPE | Countries, cities, states | "France", "New York" |
| DATE | Absolute or relative dates | "January 2025" |
| MONEY | Monetary values | "$1 billion" |
