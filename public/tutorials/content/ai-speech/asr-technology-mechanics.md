## CTC — Handling Variable-Length Alignment

CTC introduces a blank token and allows repeated emissions, then collapses the output. Training maximizes the probability of all CTC paths that produce the correct transcription.

<!-- title: ctc_decode.py -->
```python
def ctc_greedy_decode(emissions: list[str], blank: str = "<b>") -> str:
    """CTC greedy decoding: collapse repeated chars, remove blanks."""
    prev = None
    result = []
    for char in emissions:
        if char != blank and char != prev:
            result.append(char)
        prev = char
    return "".join(result)

frames = ["<b>","<b>","h","h","h","<b>","e","e","<b>","l","<b>","l","o","o","<b>"]
print(ctc_greedy_decode(frames))  # "hello"
```

| Model | Architecture | Key Innovation |
| --- | --- | --- |
| DeepSpeech 2 | RNN + CTC | Baidu's end-to-end ASR, 2015 |
| wav2vec 2.0 | Transformer + CTC, self-supervised | Pre-trains on unlabeled audio |
| Conformer | Conv + Transformer hybrid | Local + global modeling |
| Whisper | Encoder-Decoder Transformer | 680K hours; 99 languages, translation |
