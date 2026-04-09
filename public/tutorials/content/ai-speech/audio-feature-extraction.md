## From Waveform to Features

Raw waveforms are hard to learn from. The pipeline: *waveform → STFT → Mel Spectrogram → MFCCs*.

<!-- title: feature_extraction.py -->
```python
import librosa
import numpy as np

audio, sr = librosa.load("speech.wav", sr=16000, mono=True)

# 1. Mel Spectrogram
mel_spec = librosa.feature.melspectrogram(
    y=audio, sr=sr, n_mels=80, n_fft=512, hop_length=160, win_length=400, fmin=80, fmax=7600,
)
mel_db = librosa.power_to_db(mel_spec, ref=np.max)
print(f"Mel spectrogram shape: {mel_db.shape}")  # (80, time_frames)

# 2. MFCCs — compact decorrelated features
mfccs   = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=13, hop_length=160)
delta   = librosa.feature.delta(mfccs)
delta2  = librosa.feature.delta(mfccs, order=2)
features = np.vstack([mfccs, delta, delta2])  # 39-dim feature vector
print(f"MFCC feature shape: {features.shape}")  # (39, time_frames)
```

> **NOTE:** **Modern ASR skips MFCCs:** End-to-end models like Whisper learn features directly from mel spectrograms using CNN layers. MFCCs are important for understanding traditional systems and constrained environments.
