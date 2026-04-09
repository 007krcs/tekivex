## SpeechRecognition Library

<!-- title: speech_recognition.py -->
```python
import speech_recognition as sr

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

recognize_microphone()
```

<!-- title: web_speech.js -->
```javascript
// Web Speech API — Chrome/Edge
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';

recognition.onresult = (event) => {
    const last = event.results.length - 1;
    const text = event.results[last][0].transcript;
    const isFinal = event.results[last].isFinal;
    console.log(`[${isFinal ? 'FINAL' : 'interim'}] ${text}`);
    if (isFinal) document.getElementById('transcript').innerText += text + ' ';
};

recognition.onerror = (e) => console.error(e.error);
recognition.onend = () => recognition.start();
document.getElementById('btn-start').onclick = () => recognition.start();
document.getElementById('btn-stop').onclick  = () => recognition.stop();
```
