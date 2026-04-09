## What is Speech Recognition?

**Automatic Speech Recognition (ASR)** converts spoken audio into text. It powers Siri, Google Assistant, live captions, medical dictation, and call center automation.

| Era | Technology | Notes |
| --- | --- | --- |
| 1950s–1980s | Template matching, DTW | Digit recognition only, speaker-dependent |
| 1990s–2000s | Hidden Markov Models (HMM) | Statistical, vocabulary-limited |
| 2010s | Deep Neural Networks + HMM | Hybrid systems, major accuracy jump |
| 2014+ | Seq2Seq with CTC | End-to-end, no HMM needed |
| 2022+ | Large self-supervised models | Whisper, wav2vec 2.0 — near-human accuracy |

**Flow:**

1. **Audio** — Microphone input or WAV file
2. **Feature Extraction** — MFCCs, mel spectrograms
3. **Acoustic Model** — Maps audio to phonemes
4. **Language Model** — Scores word sequence probability
5. **Transcript** — Final text output

