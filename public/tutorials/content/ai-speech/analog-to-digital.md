## Digitizing Audio

Microphones produce *continuous* analog signals. Computers need *discrete* digital numbers. ADC involves **sampling** (measuring amplitude at regular intervals) and **quantization** (rounding to the nearest integer).

| Parameter | Common Values | Effect |
| --- | --- | --- |
| Sample Rate | 8 kHz (phone), 16 kHz (ASR), 44.1 kHz (music) | Nyquist: captures frequencies up to rate/2 |
| Bit Depth | 8-bit, 16-bit, 24-bit | 16-bit = 96 dB dynamic range |
| Channels | Mono (1), Stereo (2) | ASR uses mono 16 kHz 16-bit PCM as standard |

<!-- title: audio_basics.py -->
```python
import librosa
import soundfile as sf
import numpy as np

audio, sr = librosa.load("speech.wav", sr=16000, mono=True)
print(f"Sample rate: {sr} Hz")
print(f"Duration: {len(audio)/sr:.2f} seconds")
print(f"Amplitude range: [{audio.min():.3f}, {audio.max():.3f}]")

# Normalize amplitude
audio_normalized = audio / np.max(np.abs(audio))
sf.write("speech_16k.wav", audio_normalized, 16000, subtype='PCM_16')
```
