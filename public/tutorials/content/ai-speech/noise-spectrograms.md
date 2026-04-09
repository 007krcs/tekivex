## Noise Reduction

<!-- title: noise_reduction.py -->
```python
import librosa
import noisereduce as nr
import numpy as np
import soundfile as sf

audio, sr = librosa.load("noisy_speech.wav", sr=16000, mono=True)

# Use first 0.5s as noise profile
noise_sample = audio[:int(0.5 * sr)]
reduced = nr.reduce_noise(y=audio, y_noise=noise_sample, sr=sr, prop_decrease=0.8, stationary=False)

sf.write("speech_cleaned.wav", reduced, sr)
snr_improvement = 20 * np.log10(np.std(reduced) / np.std(audio - reduced))
print(f"SNR improvement: {snr_improvement:.1f} dB")
```
