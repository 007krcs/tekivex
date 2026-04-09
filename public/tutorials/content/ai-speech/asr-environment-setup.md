## Setting Up Your Audio Environment

<!-- title: install_audio.sh -->
```bash
pip install librosa soundfile audioread
pip install pyaudio          # microphone input
pip install transformers torchaudio
pip install openai-whisper   # or: pip install faster-whisper
pip install SpeechRecognition
```

<!-- title: verify_audio.py -->
```python
import sounddevice as sd
import soundfile as sf

# List input devices
for i, d in enumerate(sd.query_devices()):
    if d['max_input_channels'] > 0:
        print(f"Input {i}: {d['name']}")

# Record 3 seconds
print("Recording...")
recording = sd.rec(int(3 * 16000), samplerate=16000, channels=1, dtype='float32')
sd.wait()
sf.write("test_recording.wav", recording, 16000)
print("Saved to test_recording.wav")
```
