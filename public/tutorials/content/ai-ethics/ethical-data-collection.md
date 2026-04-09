## Ethical Data Principles

1. **Informed Consent:** Users must understand their data will train AI models
2. **Data Minimization:** Collect only what you need for the stated purpose
3. **Data Provenance:** Track every training data source; respect copyright and licenses
4. **Representation:** Training data must represent the full diversity of your user population
5. **Right to Erasure:** Be able to remove user data and retrain (machine unlearning)

<!-- title: pii_scrubber.py -->
```python
import re
import spacy

nlp = spacy.load("en_core_web_sm")

def scrub_pii(text: str) -> str:
    """Remove PII before using text as training data."""
    text = re.sub(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', '[EMAIL]', text)
    text = re.sub(r'(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})', '[PHONE]', text)
    text = re.sub(r'\b\d{3}-\d{2}-\d{4}\b', '[SSN]', text)
    doc = nlp(text)
    for ent in reversed(doc.ents):
        if ent.label_ == "PERSON":
            text = text[:ent.start_char] + "[PERSON]" + text[ent.end_char:]
    return text

sample = "Hi, I'm John Smith. Call me at 555-123-4567 or email john@example.com"
print(scrub_pii(sample))
# Hi, I'm [PERSON]. Call me at [PHONE] or email [EMAIL]
```
