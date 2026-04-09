## Why Sequences Need Special Networks

Standard neural networks process each input independently — they have no memory. But many real-world problems involve **sequences** where order matters: text (word order), time series (temporal patterns), audio (sound over time), and video (frames over time). **Recurrent Neural Networks (RNNs)** solve this by maintaining a hidden state that acts as memory.

> **TIP:** **Analogy:** Reading a sentence word by word. When you reach the word "bank," you need context from earlier words to know if it means a river bank or a financial bank. RNNs keep a running summary of everything they've seen so far.

### How RNNs Work

At each time step, the RNN takes two inputs: the current data point `x(t)` and the previous hidden state `h(t-1)`. It produces a new hidden state `h(t)` and optionally an output. The hidden state carries information forward through the sequence.

**Flow:**

1. **x(t)** — Current input (e.g., word embedding)
2. **h(t-1)** — Previous hidden state (memory)
3. **RNN Cell** — h(t) = tanh(W_h · h(t-1) + W_x · x(t) + b)
4. **h(t)** — New hidden state → next step
5. **Output** — Optional: y(t) = W_y · h(t)


### The Vanishing Gradient Problem

When sequences are long, gradients must flow backward through many time steps during backpropagation. With each step, gradients get multiplied by the same weight matrix — if values are small, gradients **vanish** (approach zero), and the network can't learn long-range dependencies.

> **CAUTION:** A vanilla RNN struggles to connect information more than ~10-20 time steps apart. If a sentence starts with "The cat, which ate the fish that was caught by the fisherman who lived near the..." — by the time the verb arrives, the RNN has forgotten the subject.

### LSTM — Long Short-Term Memory

LSTMs solve the vanishing gradient problem with a clever architecture: they add a **cell state** (long-term memory highway) and three **gates** that control what to remember, what to forget, and what to output.

- **Forget Gate:** Decides what to remove from cell state ("forget this old info")
- **Input Gate:** Decides what new info to store ("remember this")
- **Output Gate:** Decides what part of cell state to output ("share this")
- **Cell State:** Highway that carries info across many time steps with minimal modification

### RNN vs LSTM vs GRU

| Feature | Vanilla RNN | LSTM | GRU |
| --- | --- | --- | --- |
| Memory mechanism | Single hidden state | Cell state + hidden state | Combined hidden state |
| Gates | None | 3 (forget, input, output) | 2 (reset, update) |
| Long-range dependencies | Poor (vanishing gradient) | Good (cell state highway) | Good (simpler than LSTM) |
| Parameters | Fewest | Most (3 gates × weights) | Fewer than LSTM |
| Training speed | Fast but unstable | Slower but stable | Middle ground |
| Use when | Short sequences only | Default choice, long sequences | Want LSTM-like perf, fewer params |

| RNN / LSTM / GRU | Transformers |
| --- | --- |
| Process sequences one step at a time | Process entire sequence at once (parallel) |
| Inherently sequential — hard to parallelize | Highly parallelizable — faster training |
| Good for short-to-medium sequences | Handle very long sequences with attention |
| Established, well-understood | State of the art for NLP, vision, audio |
| Largely replaced by Transformers for NLP | Require more data and compute |

### When to Use Sequence Models

- **Time series forecasting** — Stock prices, weather, sensor data
- **Text generation** — Character or word-level language models
- **Speech recognition** — Converting audio waveforms to text
- **Machine translation** — Sequence-to-sequence (now mostly Transformers)
- **Music generation** — Creating melodies note by note

> **NOTE:** While Transformers have largely replaced RNNs for NLP tasks, LSTMs and GRUs remain useful for time-series data, on-device ML (smaller models), and situations where you need to process data one step at a time.

### Key Takeaways

1. RNNs process sequences by maintaining a hidden state (memory) across time steps
2. Vanilla RNNs suffer from vanishing gradients — they forget long-range context
3. LSTMs add cell state + gates to carry information across long sequences
4. GRUs are a simpler, often equally effective alternative to LSTMs
5. Transformers have largely replaced RNNs for most modern NLP tasks
