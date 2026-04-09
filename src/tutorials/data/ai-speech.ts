import type { TutorialCategory } from '../types';

const category: TutorialCategory = {
  id: 'ai-speech',
  title: 'Speech Recognition & LLM Engineering',
  icon: 'mic',
  color: '#f97316',
  description: 'Speech recognition with Whisper, TTS pipelines, and practical LLM Engineering: prompt engineering, evaluation, and production observability.',
  sections: [
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SECTION 11 — Speech Recognition
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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
          contentFile: 'ai-speech/speech-recognition-intro.md',
        },
        {
          slug: 'sound-speech-basics',
          title: 'Sound & Speech Basics',
          description: 'Frequency, amplitude, phonemes, formants, and how human speech production creates the acoustic signal.',
          keywords: ['sound waves', 'frequency', 'amplitude', 'phonemes', 'formants'],
          difficulty: 'beginner',
          estimatedMinutes: 14,
          contentFile: 'ai-speech/sound-speech-basics.md',
        },
        {
          slug: 'analog-to-digital',
          title: 'Analog to Digital Conversion',
          description: 'Sampling, quantization, Nyquist theorem, bit depth, and their impact on ASR quality.',
          keywords: ['analog to digital', 'sampling rate', 'nyquist theorem', 'bit depth', 'pcm'],
          difficulty: 'intermediate',
          estimatedMinutes: 12,
          contentFile: 'ai-speech/analog-to-digital.md',
        },
        {
          slug: 'audio-feature-extraction',
          title: 'Audio Feature Extraction — FFT & MFCCs',
          description: 'FFT converts audio to frequency domain; MFCCs extract compact perceptually-motivated features that power classical ASR.',
          keywords: ['fft', 'mfcc', 'mel spectrogram', 'librosa', 'feature extraction'],
          difficulty: 'intermediate',
          estimatedMinutes: 20,
          contentFile: 'ai-speech/audio-feature-extraction.md',
        },
        {
          slug: 'asr-technology-mechanics',
          title: 'How Speech Recognition Technology Works',
          description: 'CTC loss, seq2seq models, beam search decoding, and language model fusion in modern ASR systems.',
          keywords: ['ctc loss', 'seq2seq', 'beam search', 'wav2vec', 'end-to-end asr'],
          difficulty: 'advanced',
          estimatedMinutes: 20,
          contentFile: 'ai-speech/asr-technology-mechanics.md',
        },
        {
          slug: 'asr-environment-setup',
          title: 'Speech Recognition Environment Setup',
          description: 'Install librosa, soundfile, PyAudio, and verify your audio pipeline.',
          keywords: ['librosa', 'soundfile', 'pyaudio', 'speech recognition setup'],
          difficulty: 'beginner',
          estimatedMinutes: 10,
          contentFile: 'ai-speech/asr-environment-setup.md',
        },
        {
          slug: 'web-speech-api',
          title: 'Google Web Speech API',
          description: 'Use Python\'s SpeechRecognition library and the browser\'s Web Speech API for real-time voice transcription.',
          keywords: ['web speech api', 'google cloud speech', 'speech recognition python'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          contentFile: 'ai-speech/web-speech-api.md',
        },
        {
          slug: 'noise-spectrograms',
          title: 'Background Noise & Spectrograms',
          description: 'Handle background noise with spectral gating and visualize audio with mel spectrograms.',
          keywords: ['noise reduction', 'spectral subtraction', 'mel spectrogram', 'noisereduce'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          contentFile: 'ai-speech/noise-spectrograms.md',
        },
        {
          slug: 'openai-whisper',
          title: 'OpenAI Whisper — State-of-the-Art ASR',
          description: 'High-accuracy transcription, translation across 99 languages, and word-level timestamps with Whisper and Faster-Whisper.',
          keywords: ['whisper', 'openai whisper', 'faster-whisper', 'transcription', 'multilingual'],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          contentFile: 'ai-speech/openai-whisper.md',
        },
        {
          slug: 'voice-assistant-final',
          title: 'Building a Real-Time Voice Assistant',
          description: 'End-to-end pipeline: microphone → noise reduction → Whisper → LLM response → text-to-speech output.',
          keywords: ['voice assistant', 'real-time asr', 'text to speech', 'voice pipeline'],
          difficulty: 'advanced',
          estimatedMinutes: 22,
          contentFile: 'ai-speech/voice-assistant-final.md',
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SECTION 12 — LLM Engineering
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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
          contentFile: 'ai-speech/llm-engineering-intro.md',
        },
        {
          slug: 'planning-stage',
          title: 'Planning Stage — Before You Write Code',
          description: 'How to scope an LLM project: define success criteria, choose the right model, identify failure modes, and build an evaluation dataset first.',
          keywords: ['llm planning', 'success criteria', 'evaluation dataset', 'cost estimation'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          contentFile: 'ai-speech/planning-stage.md',
        },
        {
          slug: 'prompt-engineering',
          title: 'Crafting & Testing Prompts',
          description: 'System prompts, few-shot examples, chain-of-thought, structured output, and building a prompt testing harness.',
          keywords: ['prompt engineering', 'chain of thought', 'few shot', 'system prompt', 'prompt testing'],
          difficulty: 'intermediate',
          estimatedMinutes: 20,
          contentFile: 'ai-speech/prompt-engineering.md',
        },
        {
          slug: 'streamlit-llm',
          title: 'Building LLM Prototypes with Streamlit',
          description: 'Rapidly prototype LLM applications with Streamlit — chat interfaces, streaming responses, and session state.',
          keywords: ['streamlit', 'llm prototype', 'chat interface', 'session state', 'streaming'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          contentFile: 'ai-speech/streamlit-llm.md',
        },
        {
          slug: 'llm-prototype-development',
          title: 'Developing the LLM Prototype',
          description: 'Production LLM patterns: async processing, retry logic, response caching, token budgeting, and error handling.',
          keywords: ['llm production', 'async', 'retry', 'caching', 'token budget'],
          difficulty: 'advanced',
          estimatedMinutes: 22,
          contentFile: 'ai-speech/llm-prototype-development.md',
        },
        {
          slug: 'real-world-ai-challenges',
          title: 'Solving Real-World AI Challenges',
          description: 'Tackle the hardest production LLM challenges: hallucination mitigation, evaluation at scale, cost optimization, and guardrails.',
          keywords: ['hallucination', 'llm evaluation', 'cost optimization', 'guardrails', 'observability'],
          difficulty: 'advanced',
          estimatedMinutes: 20,
          contentFile: 'ai-speech/real-world-ai-challenges.md',
        },
      ],
    },

  ],
};

export default category;
