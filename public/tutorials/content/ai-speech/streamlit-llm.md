## LLM Chat App with Streamlit

<!-- title: llm_chatbot.py -->
```python
import streamlit as st
from openai import OpenAI

st.set_page_config(page_title="AI Assistant", page_icon="🤖")
st.title("🤖 AI Assistant")
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
                placeholder.markdown(full + "▌")
        placeholder.markdown(full)
    st.session_state.messages.append({"role": "assistant", "content": full})
```

<!-- title: run.sh -->
```bash
pip install streamlit openai
streamlit run llm_chatbot.py  # opens http://localhost:8501
```
