## OpenAI Whisper

| Model | Parameters | Speed | WER (EN) |
| --- | --- | --- | --- |
| tiny | 39M | 32× realtime | ~14% |
| base | 74M | 16× realtime | ~11% |
| small | 244M | 6× realtime | ~9% |
| medium | 769M | 2× realtime | ~7% |
| large-v3 | 1550M | 1× realtime | ~5% |

<!-- title: whisper_transcribe.py -->
```python
import whisper

model = whisper.load_model("base")

result = model.transcribe(
    "interview.mp3",
    language="en",
    task="transcribe",    # or "translate" → always outputs English
    fp16=False,
    word_timestamps=True,
)

print(f"Language: {result['language']}")
print(f"Transcript:\n{result['text']}")

for segment in result["segments"]:
    print(f"[{segment['start']:.2f}s → {segment['end']:.2f}s] {segment['text']}")
```

<!-- title: faster_whisper.py -->
```python
from faster_whisper import WhisperModel

# 4× faster, less VRAM, same accuracy
model = WhisperModel("large-v3", device="cpu", compute_type="int8")

segments, info = model.transcribe(
    "lecture.mp3",
    beam_size=5,
    language="en",
    vad_filter=True,
    vad_parameters=dict(min_silence_duration_ms=500),
)

print(f"Language: {info.language} ({info.language_probability:.2f})")
for segment in segments:
    print(f"[{segment.start:.2f}s - {segment.end:.2f}s] {segment.text.strip()}")
```

> **TIP:** **Production tip:** Use `faster-whisper` with `compute_type="int8"` for CPU deployment. Runs Whisper large-v3 in real-time on modern CPUs — no GPU required.
