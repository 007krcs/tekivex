## End-to-End Voice Pipeline

**Flow:**

1. **Microphone** — Capture audio stream
2. **VAD** — Voice activity detection
3. **Whisper** — Speech to text
4. **LLM** — Generate response
5. **TTS** — Text to speech output


<!-- title: voice_assistant.py -->
```python
import sounddevice as sd
import numpy as np
import queue, threading
from faster_whisper import WhisperModel
from openai import OpenAI
import pyttsx3

whisper = WhisperModel("base", device="cpu", compute_type="int8")
openai_client = OpenAI()
tts = pyttsx3.init()
tts.setProperty('rate', 175)

SAMPLE_RATE = 16000
CHUNK_SIZE  = int(SAMPLE_RATE * 0.5)
SILENCE_THRESHOLD = 0.01
SILENCE_CHUNKS = 6  # 3 seconds

audio_queue = queue.Queue()
history = [{"role": "system", "content": "You are a helpful voice assistant. Keep responses under 3 sentences."}]

def capture():
    with sd.InputStream(samplerate=SAMPLE_RATE, channels=1, dtype='float32',
                        blocksize=CHUNK_SIZE, callback=lambda d, *_: audio_queue.put(d.copy())):
        print("🎤 Listening...")
        threading.Event().wait()

def process():
    buf, silent = [], 0
    while True:
        chunk = audio_queue.get()
        rms = np.sqrt(np.mean(chunk ** 2))
        if rms > SILENCE_THRESHOLD:
            buf.append(chunk); silent = 0
        elif buf:
            buf.append(chunk); silent += 1
            if silent >= SILENCE_CHUNKS:
                audio = np.concatenate(buf).flatten()
                segs, _ = whisper.transcribe(audio, vad_filter=True)
                text = " ".join(s.text.strip() for s in segs).strip()
                if text and len(text) > 2:
                    print(f"\n👤 You: {text}")
                    history.append({"role": "user", "content": text})
                    resp = openai_client.chat.completions.create(
                        model="gpt-4o-mini", messages=history, max_tokens=150
                    ).choices[0].message.content
                    history.append({"role": "assistant", "content": resp})
                    print(f"🤖 Assistant: {resp}")
                    tts.say(resp); tts.runAndWait()
                buf, silent = [], 0

threading.Thread(target=capture, daemon=True).start()
process()
```
