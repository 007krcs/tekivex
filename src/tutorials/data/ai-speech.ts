import type { TutorialCategory } from '../types';

const category: TutorialCategory = {
  id: 'ai-speech',
  title: 'Speech Recognition & LLM Engineering',
  icon: 'mic',
  color: '#f97316',
  description: 'Speech recognition with Whisper, TTS pipelines, and practical LLM Engineering: prompt engineering, evaluation, and production observability.',
  sections: [
    // â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”
    // SECTION 11 â€” Speech Recognition
    // â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”
    {
      title: 'Speech Recognition',
      topics: [
        {
          slug: 'speech-recognition-intro',
          title: 'Introduction to Speech Recognition',
          description: 'What ASR is, its evolution from HMMs to end-to-end deep learning, and key use cases.',
          keywords: ['speech recognition', 'asr', 'automatic speech recognition', 'voice'],
          difficulty: 'beginner',
          estimatedMinutes: 12,
          content: [
            { type: 'heading', level: 2, text: 'What is Speech Recognition?', id: 'what-is-asr' },
            { type: 'paragraph', html: '<strong>Automatic Speech Recognition (ASR)</strong> converts spoken audio into text. It powers Siri, Google Assistant, live captions, medical dictation, and call center automation.' },
            { type: 'table', headers: ['Era', 'Technology', 'Notes'], rows: [
              ['1950sâ€“1980s', 'Template matching, DTW', 'Digit recognition only, speaker-dependent'],
              ['1990sâ€“2000s', 'Hidden Markov Models (HMM)', 'Statistical, vocabulary-limited'],
              ['2010s', 'Deep Neural Networks + HMM', 'Hybrid systems, major accuracy jump'],
              ['2014+', 'Seq2Seq with CTC', 'End-to-end, no HMM needed'],
              ['2022+', 'Large self-supervised models', 'Whisper, wav2vec 2.0 â€” near-human accuracy'],
            ]},
            { type: 'flow', steps: [
              { label: 'Audio', desc: 'Microphone input or WAV file', color: '#6366f1' },
              { label: 'Feature Extraction', desc: 'MFCCs, mel spectrograms', color: '#8b5cf6' },
              { label: 'Acoustic Model', desc: 'Maps audio to phonemes', color: '#f59e0b' },
              { label: 'Language Model', desc: 'Scores word sequence probability', color: '#ef4444' },
              { label: 'Transcript', desc: 'Final text output', color: '#22c55e' },
            ]},
          ],
        },
        {
          slug: 'sound-speech-basics',
          title: 'Sound & Speech Basics',
          description: 'Frequency, amplitude, phonemes, formants, and how human speech production creates the acoustic signal.',
          keywords: ['sound waves', 'frequency', 'amplitude', 'phonemes', 'formants'],
          difficulty: 'beginner',
          estimatedMinutes: 14,
          content: [
            { type: 'heading', level: 2, text: 'The Physics of Sound', id: 'physics-of-sound' },
            { type: 'paragraph', html: 'Sound is a mechanical wave â€” vibrations propagating through air. Key properties: <strong>frequency</strong> (pitch, Hz), <strong>amplitude</strong> (loudness, dB). Human hearing spans 20 Hz to 20 kHz; speech occupies 300 Hzâ€“3,400 Hz.' },
            { type: 'table', headers: ['Property', 'Unit', 'Speech Range', 'Perception'], rows: [
              ['Frequency', 'Hertz (Hz)', '80â€“300 Hz (fundamental)', 'Pitch â€” high vs. low'],
              ['Amplitude', 'Decibels (dB)', '40â€“80 dB normal speech', 'Loudness'],
              ['Duration', 'Milliseconds (ms)', '50â€“300 ms per phoneme', 'Rhythm, prosody'],
              ['Sample Rate', 'Hz (samples/sec)', '16,000 Hz (ASR standard)', 'Audio quality'],
            ]},
            { type: 'callout', variant: 'note', html: '<strong>Phonemes:</strong> English has ~44 phonemes â€” the smallest units of sound that distinguish meaning (e.g., /p/ vs /b/). ASR models ultimately map acoustic features to phoneme sequences, then to words.' },
          ],
        },
        {
          slug: 'analog-to-digital',
          title: 'Analog to Digital Conversion',
          description: 'Sampling, quantization, Nyquist theorem, bit depth, and their impact on ASR quality.',
          keywords: ['analog to digital', 'sampling rate', 'nyquist theorem', 'bit depth', 'pcm'],
          difficulty: 'intermediate',
          estimatedMinutes: 12,
          content: [
            { type: 'heading', level: 2, text: 'Digitizing Audio', id: 'digitizing-audio' },
            { type: 'paragraph', html: 'Microphones produce <em>continuous</em> analog signals. Computers need <em>discrete</em> digital numbers. ADC involves <strong>sampling</strong> (measuring amplitude at regular intervals) and <strong>quantization</strong> (rounding to the nearest integer).' },
            { type: 'table', headers: ['Parameter', 'Common Values', 'Effect'], rows: [
              ['Sample Rate', '8 kHz (phone), 16 kHz (ASR), 44.1 kHz (music)', 'Nyquist: captures frequencies up to rate/2'],
              ['Bit Depth', '8-bit, 16-bit, 24-bit', '16-bit = 96 dB dynamic range'],
              ['Channels', 'Mono (1), Stereo (2)', 'ASR uses mono 16 kHz 16-bit PCM as standard'],
            ]},
            { type: 'code', language: 'python', title: 'audio_basics.py', code: `import librosa
import soundfile as sf
import numpy as np

audio, sr = librosa.load("speech.wav", sr=16000, mono=True)
print(f"Sample rate: {sr} Hz")
print(f"Duration: {len(audio)/sr:.2f} seconds")
print(f"Amplitude range: [{audio.min():.3f}, {audio.max():.3f}]")

# Normalize amplitude
audio_normalized = audio / np.max(np.abs(audio))
sf.write("speech_16k.wav", audio_normalized, 16000, subtype='PCM_16')` },
          ],
        },
        {
          slug: 'audio-feature-extraction',
          title: 'Audio Feature Extraction â€” FFT & MFCCs',
          description: 'FFT converts audio to frequency domain; MFCCs extract compact perceptually-motivated features that power classical ASR.',
          keywords: ['fft', 'mfcc', 'mel spectrogram', 'librosa', 'feature extraction'],
          difficulty: 'intermediate',
          estimatedMinutes: 20,
          content: [
            { type: 'heading', level: 2, text: 'From Waveform to Features', id: 'audio-features' },
            { type: 'paragraph', html: 'Raw waveforms are hard to learn from. The pipeline: <em>waveform â†’ STFT â†’ Mel Spectrogram â†’ MFCCs</em>.' },
            { type: 'code', language: 'python', title: 'feature_extraction.py', code: `import librosa
import numpy as np

audio, sr = librosa.load("speech.wav", sr=16000, mono=True)

# 1. Mel Spectrogram
mel_spec = librosa.feature.melspectrogram(
    y=audio, sr=sr, n_mels=80, n_fft=512, hop_length=160, win_length=400, fmin=80, fmax=7600,
)
mel_db = librosa.power_to_db(mel_spec, ref=np.max)
print(f"Mel spectrogram shape: {mel_db.shape}")  # (80, time_frames)

# 2. MFCCs â€” compact decorrelated features
mfccs   = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=13, hop_length=160)
delta   = librosa.feature.delta(mfccs)
delta2  = librosa.feature.delta(mfccs, order=2)
features = np.vstack([mfccs, delta, delta2])  # 39-dim feature vector
print(f"MFCC feature shape: {features.shape}")  # (39, time_frames)` },
            { type: 'callout', variant: 'note', html: '<strong>Modern ASR skips MFCCs:</strong> End-to-end models like Whisper learn features directly from mel spectrograms using CNN layers. MFCCs are important for understanding traditional systems and constrained environments.' },
          ],
        },
        {
          slug: 'asr-technology-mechanics',
          title: 'How Speech Recognition Technology Works',
          description: 'CTC loss, seq2seq models, beam search decoding, and language model fusion in modern ASR systems.',
          keywords: ['ctc loss', 'seq2seq', 'beam search', 'wav2vec', 'end-to-end asr'],
          difficulty: 'advanced',
          estimatedMinutes: 20,
          content: [
            { type: 'heading', level: 2, text: 'CTC â€” Handling Variable-Length Alignment', id: 'ctc' },
            { type: 'paragraph', html: 'CTC introduces a blank token and allows repeated emissions, then collapses the output. Training maximizes the probability of all CTC paths that produce the correct transcription.' },
            { type: 'code', language: 'python', title: 'ctc_decode.py', code: `def ctc_greedy_decode(emissions: list[str], blank: str = "<b>") -> str:
    """CTC greedy decoding: collapse repeated chars, remove blanks."""
    prev = None
    result = []
    for char in emissions:
        if char != blank and char != prev:
            result.append(char)
        prev = char
    return "".join(result)

frames = ["<b>","<b>","h","h","h","<b>","e","e","<b>","l","<b>","l","o","o","<b>"]
print(ctc_greedy_decode(frames))  # "hello"` },
            { type: 'table', headers: ['Model', 'Architecture', 'Key Innovation'], rows: [
              ['DeepSpeech 2', 'RNN + CTC', 'Baidu\'s end-to-end ASR, 2015'],
              ['wav2vec 2.0', 'Transformer + CTC, self-supervised', 'Pre-trains on unlabeled audio'],
              ['Conformer', 'Conv + Transformer hybrid', 'Local + global modeling'],
              ['Whisper', 'Encoder-Decoder Transformer', '680K hours; 99 languages, translation'],
            ]},
          ],
        },
        {
          slug: 'asr-environment-setup',
          title: 'Speech Recognition Environment Setup',
          description: 'Install librosa, soundfile, PyAudio, and verify your audio pipeline.',
          keywords: ['librosa', 'soundfile', 'pyaudio', 'speech recognition setup'],
          difficulty: 'beginner',
          estimatedMinutes: 10,
          content: [
            { type: 'heading', level: 2, text: 'Setting Up Your Audio Environment', id: 'audio-setup' },
            { type: 'code', language: 'bash', title: 'install_audio.sh', code: `pip install librosa soundfile audioread
pip install pyaudio          # microphone input
pip install transformers torchaudio
pip install openai-whisper   # or: pip install faster-whisper
pip install SpeechRecognition` },
            { type: 'code', language: 'python', title: 'verify_audio.py', code: `import sounddevice as sd
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
print("Saved to test_recording.wav")` },
          ],
        },
        {
          slug: 'web-speech-api',
          title: 'Google Web Speech API',
          description: 'Use Python\'s SpeechRecognition library and the browser\'s Web Speech API for real-time voice transcription.',
          keywords: ['web speech api', 'google cloud speech', 'speech recognition python'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          content: [
            { type: 'heading', level: 2, text: 'SpeechRecognition Library', id: 'sr-library' },
            { type: 'code', language: 'python', title: 'speech_recognition.py', code: `import speech_recognition as sr

recognizer = sr.Recognizer()

def recognize_microphone() -> str:
    with sr.Microphone(sample_rate=16000) as source:
        print("Adjusting for ambient noise...")
        recognizer.adjust_for_ambient_noise(source, duration=1)
        print("Say something!")
        audio = recognizer.listen(source, timeout=5, phrase_time_limit=10)
    try:
        text = recognizer.recognize_google(audio, language="en-US")
        print(f"You said: {text}")
        return text
    except sr.UnknownValueError:
        print("Could not understand audio")
    except sr.RequestError as e:
        print(f"API error: {e}")
    return ""

def recognize_file(filepath: str) -> str:
    with sr.AudioFile(filepath) as source:
        audio = recognizer.record(source)
    return recognizer.recognize_google(audio)

recognize_microphone()` },
            { type: 'code', language: 'javascript', title: 'web_speech.js', code: `// Web Speech API â€” Chrome/Edge
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';

recognition.onresult = (event) => {
    const last = event.results.length - 1;
    const text = event.results[last][0].transcript;
    const isFinal = event.results[last].isFinal;
    console.log(\`[\${isFinal ? 'FINAL' : 'interim'}] \${text}\`);
    if (isFinal) document.getElementById('transcript').innerText += text + ' ';
};

recognition.onerror = (e) => console.error(e.error);
recognition.onend = () => recognition.start();
document.getElementById('btn-start').onclick = () => recognition.start();
document.getElementById('btn-stop').onclick  = () => recognition.stop();` },
          ],
        },
        {
          slug: 'noise-spectrograms',
          title: 'Background Noise & Spectrograms',
          description: 'Handle background noise with spectral gating and visualize audio with mel spectrograms.',
          keywords: ['noise reduction', 'spectral subtraction', 'mel spectrogram', 'noisereduce'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          content: [
            { type: 'heading', level: 2, text: 'Noise Reduction', id: 'noise-reduction' },
            { type: 'code', language: 'python', title: 'noise_reduction.py', code: `import librosa
import noisereduce as nr
import numpy as np
import soundfile as sf

audio, sr = librosa.load("noisy_speech.wav", sr=16000, mono=True)

# Use first 0.5s as noise profile
noise_sample = audio[:int(0.5 * sr)]
reduced = nr.reduce_noise(y=audio, y_noise=noise_sample, sr=sr, prop_decrease=0.8, stationary=False)

sf.write("speech_cleaned.wav", reduced, sr)
snr_improvement = 20 * np.log10(np.std(reduced) / np.std(audio - reduced))
print(f"SNR improvement: {snr_improvement:.1f} dB")` },
          ],
        },
        {
          slug: 'openai-whisper',
          title: 'OpenAI Whisper â€” State-of-the-Art ASR',
          description: 'High-accuracy transcription, translation across 99 languages, and word-level timestamps with Whisper and Faster-Whisper.',
          keywords: ['whisper', 'openai whisper', 'faster-whisper', 'transcription', 'multilingual'],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          content: [
            { type: 'heading', level: 2, text: 'OpenAI Whisper', id: 'whisper' },
            { type: 'table', headers: ['Model', 'Parameters', 'Speed', 'WER (EN)'], rows: [
              ['tiny', '39M', '32Ã— realtime', '~14%'],
              ['base', '74M', '16Ã— realtime', '~11%'],
              ['small', '244M', '6Ã— realtime', '~9%'],
              ['medium', '769M', '2Ã— realtime', '~7%'],
              ['large-v3', '1550M', '1Ã— realtime', '~5%'],
            ]},
            { type: 'code', language: 'python', title: 'whisper_transcribe.py', code: `import whisper

model = whisper.load_model("base")

result = model.transcribe(
    "interview.mp3",
    language="en",
    task="transcribe",    # or "translate" â†’ always outputs English
    fp16=False,
    word_timestamps=True,
)

print(f"Language: {result['language']}")
print(f"Transcript:\\n{result['text']}")

for segment in result["segments"]:
    print(f"[{segment['start']:.2f}s â†’ {segment['end']:.2f}s] {segment['text']}")` },
            { type: 'code', language: 'python', title: 'faster_whisper.py', code: `from faster_whisper import WhisperModel

# 4Ã— faster, less VRAM, same accuracy
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
    print(f"[{segment.start:.2f}s - {segment.end:.2f}s] {segment.text.strip()}")` },
            { type: 'callout', variant: 'tip', html: '<strong>Production tip:</strong> Use <code>faster-whisper</code> with <code>compute_type="int8"</code> for CPU deployment. Runs Whisper large-v3 in real-time on modern CPUs â€” no GPU required.' },
          ],
        },
        {
          slug: 'voice-assistant-final',
          title: 'Building a Real-Time Voice Assistant',
          description: 'End-to-end pipeline: microphone â†’ noise reduction â†’ Whisper â†’ LLM response â†’ text-to-speech output.',
          keywords: ['voice assistant', 'real-time asr', 'text to speech', 'voice pipeline'],
          difficulty: 'advanced',
          estimatedMinutes: 22,
          content: [
            { type: 'heading', level: 2, text: 'End-to-End Voice Pipeline', id: 'voice-pipeline' },
            { type: 'flow', steps: [
              { label: 'Microphone', desc: 'Capture audio stream', color: '#6366f1' },
              { label: 'VAD', desc: 'Voice activity detection', color: '#8b5cf6' },
              { label: 'Whisper', desc: 'Speech to text', color: '#f59e0b' },
              { label: 'LLM', desc: 'Generate response', color: '#ef4444' },
              { label: 'TTS', desc: 'Text to speech output', color: '#22c55e' },
            ]},
            { type: 'code', language: 'python', title: 'voice_assistant.py', code: `import sounddevice as sd
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
        print("ðŸŽ¤ Listening...")
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
                    print(f"\\nðŸ‘¤ You: {text}")
                    history.append({"role": "user", "content": text})
                    resp = openai_client.chat.completions.create(
                        model="gpt-4o-mini", messages=history, max_tokens=150
                    ).choices[0].message.content
                    history.append({"role": "assistant", "content": resp})
                    print(f"ðŸ¤– Assistant: {resp}")
                    tts.say(resp); tts.runAndWait()
                buf, silent = [], 0

threading.Thread(target=capture, daemon=True).start()
process()` },
          ],
        },
      ],
    },

    // â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”
    // SECTION 12 â€” LLM Engineering
    // â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”
    {
      title: 'LLM Engineering',
      topics: [
        {
          slug: 'llm-engineering-intro',
          title: 'Introduction to LLM Engineering',
          description: 'The LLM engineer role, product development lifecycle for AI apps, and key decisions separating prototypes from production.',
          keywords: ['llm engineering', 'ai product', 'production llm'],
          difficulty: 'intermediate',
          estimatedMinutes: 12,
          content: [
            { type: 'heading', level: 2, text: 'What is LLM Engineering?', id: 'llm-eng-intro' },
            { type: 'paragraph', html: 'LLM Engineering builds reliable, production-grade applications powered by large language models. Unlike ML research, it focuses on product outcomes: Does the user\'s problem get solved? Is it fast enough? Does it fail gracefully?' },
            { type: 'comparison', left: { title: 'ML Engineer', color: '#6366f1', items: [
              'Trains models from scratch',
              'Writes loss functions, backprop',
              'Optimizes GPU training',
              'Evaluates with benchmark metrics',
            ]}, right: { title: 'LLM Engineer', color: '#f59e0b', items: [
              'Orchestrates pre-trained models',
              'Writes prompts, RAG, agents',
              'Optimizes latency, cost, reliability',
              'Evaluates with human test cases',
            ]}},
            { type: 'flow', steps: [
              { label: 'Plan', desc: 'Define problem, success metrics', color: '#6366f1' },
              { label: 'Prompt', desc: 'Engineer and test prompts', color: '#8b5cf6' },
              { label: 'Prototype', desc: 'Build with Streamlit', color: '#f59e0b' },
              { label: 'Evaluate', desc: 'Test cases, LLM-as-judge', color: '#ef4444' },
              { label: 'Ship', desc: 'API, observability, monitoring', color: '#22c55e' },
            ]},
          ],
        },
        {
          slug: 'planning-stage',
          title: 'Planning Stage â€” Before You Write Code',
          description: 'How to scope an LLM project: define success criteria, choose the right model, identify failure modes, and build an evaluation dataset first.',
          keywords: ['llm planning', 'success criteria', 'evaluation dataset', 'cost estimation'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          content: [
            { type: 'heading', level: 2, text: 'Planning Your LLM Application', id: 'llm-planning' },
            { type: 'list', ordered: true, items: [
              '<strong>Define the task precisely:</strong> e.g., "Summarize support tickets into one sentence with priority label HIGH/MEDIUM/LOW"',
              '<strong>Write success criteria first:</strong> "95% of summaries rated â‰¥4/5 by human reviewer"',
              '<strong>Build evaluation set before prompting:</strong> 50â€“200 examples with expected outputs',
              '<strong>Estimate cost and latency:</strong> tokens Ã— price Ã— volume = monthly budget',
              '<strong>Identify failure modes:</strong> What happens when model refuses? Gets priority wrong? Produces gibberish?',
              '<strong>Choose the right model tier:</strong> Simple tasks â†’ gpt-4o-mini ($0.15/1M); complex â†’ gpt-4o ($5/1M)',
            ]},
            { type: 'code', language: 'python', title: 'cost_estimator.py', code: `import tiktoken

def estimate_monthly_cost(system_prompt: str, avg_user_msg: str,
                           avg_output_tokens: int, requests_per_day: int,
                           model: str = "gpt-4o-mini") -> dict:
    enc = tiktoken.encoding_for_model("gpt-4o")
    input_per_req  = len(enc.encode(system_prompt)) + len(enc.encode(avg_user_msg))
    monthly_reqs   = requests_per_day * 30
    monthly_input  = monthly_reqs * input_per_req
    monthly_output = monthly_reqs * avg_output_tokens

    pricing = {
        "gpt-4o-mini": {"input": 0.15, "output": 0.60},
        "gpt-4o":      {"input": 5.00, "output": 15.00},
    }
    p = pricing.get(model, pricing["gpt-4o-mini"])
    cost = monthly_input / 1e6 * p["input"] + monthly_output / 1e6 * p["output"]
    return {"model": model, "monthly_requests": monthly_reqs, "estimated_cost_usd": round(cost, 2)}

print(estimate_monthly_cost(
    system_prompt="You are a customer support analyst...",
    avg_user_msg="Customer: I can't log into my account...",
    avg_output_tokens=50, requests_per_day=500,
))` },
          ],
        },
        {
          slug: 'prompt-engineering',
          title: 'Crafting & Testing Prompts',
          description: 'System prompts, few-shot examples, chain-of-thought, structured output, and building a prompt testing harness.',
          keywords: ['prompt engineering', 'chain of thought', 'few shot', 'system prompt', 'prompt testing'],
          difficulty: 'intermediate',
          estimatedMinutes: 20,
          content: [
            { type: 'heading', level: 2, text: 'Advanced Prompt Engineering', id: 'advanced-prompting' },
            { type: 'table', headers: ['Technique', 'When to Use', 'Example'], rows: [
              ['Zero-shot', 'Simple, well-defined tasks', '"Classify this email as spam or not spam."'],
              ['Few-shot', 'Complex or domain-specific tasks', '3â€“5 examples of input â†’ expected output'],
              ['Chain-of-Thought', 'Multi-step reasoning, math, logic', '"Think step by step before answering."'],
              ['Self-Consistency', 'Reduce reasoning errors', 'Generate 5 answers, take majority vote'],
              ['Structured Output', 'When output must be parsed by code', 'JSON schema + Pydantic parser'],
            ]},
            { type: 'code', language: 'python', title: 'prompt_testing.py', code: `from openai import OpenAI
import json

client = OpenAI()

eval_set = [
    {"input": "The product arrived broken and customer service was rude.",
     "expected": {"sentiment": "negative", "priority": "HIGH", "category": "complaint"}},
    {"input": "Love this product! Best purchase of the year.",
     "expected": {"sentiment": "positive", "priority": "LOW", "category": "praise"}},
    {"input": "I have a question about my order status.",
     "expected": {"sentiment": "neutral", "priority": "MEDIUM", "category": "inquiry"}},
]

prompts = {
    "v1_basic": "Analyze this customer message and return JSON with keys: sentiment, priority, category.",
    "v2_few_shot": """Analyze customer support messages. Return JSON only.
Examples:
Input: "Package never arrived!"
Output: {"sentiment":"negative","priority":"HIGH","category":"complaint"}
Input: "Thanks for the quick response!"
Output: {"sentiment":"positive","priority":"LOW","category":"praise"}
Now analyze:""",
}

def evaluate_prompt(name: str, system: str) -> float:
    correct = sum(
        1 for ex in eval_set
        if json.loads(client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "system", "content": system}, {"role": "user", "content": ex["input"]}],
            temperature=0, max_tokens=100,
        ).choices[0].message.content.strip()) == ex["expected"]
    )
    print(f"[{name}] {correct}/{len(eval_set)} correct")
    return correct / len(eval_set)

for name, prompt in prompts.items():
    evaluate_prompt(name, prompt)` },
          ],
        },
        {
          slug: 'streamlit-llm',
          title: 'Building LLM Prototypes with Streamlit',
          description: 'Rapidly prototype LLM applications with Streamlit â€” chat interfaces, streaming responses, and session state.',
          keywords: ['streamlit', 'llm prototype', 'chat interface', 'session state', 'streaming'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          content: [
            { type: 'heading', level: 2, text: 'LLM Chat App with Streamlit', id: 'streamlit-chat' },
            { type: 'code', language: 'python', title: 'llm_chatbot.py', code: `import streamlit as st
from openai import OpenAI

st.set_page_config(page_title="AI Assistant", page_icon="ðŸ¤–")
st.title("ðŸ¤– AI Assistant")
client = OpenAI()

if "messages" not in st.session_state:
    st.session_state.messages = [{"role": "system", "content": "You are a helpful assistant."}]

with st.sidebar:
    model = st.selectbox("Model", ["gpt-4o-mini", "gpt-4o"])
    temperature = st.slider("Temperature", 0.0, 2.0, 0.7, 0.1)
    if st.button("Clear conversation"):
        st.session_state.messages = [st.session_state.messages[0]]
        st.rerun()

for msg in st.session_state.messages[1:]:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

if prompt := st.chat_input("Ask me anything..."):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)
    with st.chat_message("assistant"):
        placeholder = st.empty()
        full = ""
        for chunk in client.chat.completions.create(
            model=model, messages=st.session_state.messages,
            temperature=temperature, stream=True,
        ):
            if chunk.choices[0].delta.content:
                full += chunk.choices[0].delta.content
                placeholder.markdown(full + "â–Œ")
        placeholder.markdown(full)
    st.session_state.messages.append({"role": "assistant", "content": full})` },
            { type: 'code', language: 'bash', title: 'run.sh', code: `pip install streamlit openai
streamlit run llm_chatbot.py  # opens http://localhost:8501` },
          ],
        },
        {
          slug: 'llm-prototype-development',
          title: 'Developing the LLM Prototype',
          description: 'Production LLM patterns: async processing, retry logic, response caching, token budgeting, and error handling.',
          keywords: ['llm production', 'async', 'retry', 'caching', 'token budget'],
          difficulty: 'advanced',
          estimatedMinutes: 22,
          content: [
            { type: 'heading', level: 2, text: 'Production-Ready LLM Patterns', id: 'llm-production' },
            { type: 'code', language: 'python', title: 'production_llm.py', code: `import asyncio, hashlib, json
from openai import AsyncOpenAI
from tenacity import retry, stop_after_attempt, wait_exponential
import tiktoken

client = AsyncOpenAI()
_cache: dict = {}

@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=1, max=10))
async def call_llm(messages: list, model: str = "gpt-4o-mini", **kwargs) -> str:
    response = await client.chat.completions.create(model=model, messages=messages, **kwargs)
    return response.choices[0].message.content

async def cached_call(messages: list, model: str = "gpt-4o-mini", temperature: float = 0.0) -> str:
    if temperature > 0:
        return await call_llm(messages, model, temperature=temperature)
    key = hashlib.sha256(json.dumps({"messages": messages, "model": model}, sort_keys=True).encode()).hexdigest()
    if key not in _cache:
        _cache[key] = await call_llm(messages, model, temperature=temperature)
    return _cache[key]

def enforce_token_budget(messages: list, max_tokens: int = 3000) -> list:
    enc = tiktoken.encoding_for_model("gpt-4o")
    system = [m for m in messages if m["role"] == "system"]
    convo  = [m for m in messages if m["role"] != "system"]
    while convo:
        total = sum(len(enc.encode(m["content"])) for m in system + convo)
        if total <= max_tokens: break
        convo = convo[2:]  # drop oldest pair
    return system + convo

async def process_batch(items: list[str], system: str) -> list[str]:
    sem = asyncio.Semaphore(10)
    async def one(item):
        async with sem:
            return await cached_call([{"role": "system", "content": system}, {"role": "user", "content": item}])
    return list(await asyncio.gather(*[one(i) for i in items], return_exceptions=True))` },
          ],
        },
        {
          slug: 'real-world-ai-challenges',
          title: 'Solving Real-World AI Challenges',
          description: 'Tackle the hardest production LLM challenges: hallucination mitigation, evaluation at scale, cost optimization, and guardrails.',
          keywords: ['hallucination', 'llm evaluation', 'cost optimization', 'guardrails', 'observability'],
          difficulty: 'advanced',
          estimatedMinutes: 20,
          content: [
            { type: 'heading', level: 2, text: 'Hard Problems in Production LLM Systems', id: 'hard-llm-problems' },
            { type: 'table', headers: ['Challenge', 'Description', 'Solutions'], rows: [
              ['Hallucination', 'Model invents plausible but false information', 'RAG, citations, fact-checking, constrained generation'],
              ['Evaluation at Scale', 'Human review doesn\'t scale', 'LLM-as-judge, automated metrics, sampling + human review'],
              ['Cost Explosion', 'Tokens add up fast', 'Caching, smaller models, prompt compression, batching'],
              ['Latency', 'LLMs are slow (1â€“30 seconds)', 'Streaming, smaller models, speculative decoding'],
              ['Prompt Injection', 'Malicious instructions in user content', 'Input sanitization, sandboxed context, validation'],
            ]},
            { type: 'code', language: 'python', title: 'llm_judge.py', code: `from openai import OpenAI
import json

client = OpenAI()

JUDGE_PROMPT = """Score the response 1-5. Return JSON: {{"score":<1-5>, "reasoning":"<brief>", "passed":<true if >=4>}}

Criteria: 5=Perfect, 4=Good, 3=Acceptable, 2=Poor, 1=Fail

Question: {question}
Expected: {expected}
Actual response: {response}"""

def judge(question: str, expected: str, response: str) -> dict:
    result = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": JUDGE_PROMPT.format(
            question=question, expected=expected, response=response
        )}],
        temperature=0, response_format={"type": "json_object"},
    )
    return json.loads(result.choices[0].message.content)

test_cases = [
    {"q": "What is RAG?", "expected": "Retrieval-Augmented Generation"},
    {"q": "Capital of France?", "expected": "Paris"},
]

for tc in test_cases:
    verdict = judge(tc["q"], tc["expected"], "Paris is the capital of France.")
    print(f"Score {verdict['score']}/5 | Passed: {verdict['passed']} | {verdict['reasoning']}")` },
            { type: 'callout', variant: 'tip', html: '<strong>Observability:</strong> Use LangSmith or Weights & Biases Traces to log every LLM call â€” prompt, response, latency, token count, cost. You cannot improve what you cannot measure. Start logging from day 1.' },
          ],
        },
      ],
    },
  ],
};

export default category;
