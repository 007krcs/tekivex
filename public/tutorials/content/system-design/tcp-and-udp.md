## The Transport Layer

TCP and UDP are **Layer 4 protocols** in the OSI model — they sit above IP (which provides addressing) and below application protocols like HTTP. Your choice between them is one of the most consequential decisions in system design.

## TCP: Reliability First

**TCP** (Transmission Control Protocol) guarantees delivery, ordering, and error checking. Before any data flows, TCP performs a **three-way handshake** to establish a connection.

**Flow:**

1. **SYN** — Client sends SYN (synchronize) with initial sequence number
2. **SYN-ACK** — Server acknowledges and sends its own SYN
3. **ACK** — Client acknowledges — connection established, data can flow


- **Guaranteed delivery** — lost packets are retransmitted automatically
- **Ordered delivery** — packets arrive in the order sent
- **Flow control** — receiver advertises window size; sender won't overwhelm it
- **Congestion control** — TCP backs off when the network is congested (AIMD)
- **Error detection** — checksum on every segment

## UDP: Speed First

**UDP** (User Datagram Protocol) is connectionless and fire-and-forget. There is no handshake, no retransmission, no ordering guarantee — just fast delivery. This makes it ideal when **low latency matters more than perfect reliability**.

- **No connection overhead** — send immediately, no handshake
- **No retransmission** — lost packets are gone (application handles it if needed)
- **No ordering** — packets may arrive out of sequence
- **Lower latency** — no congestion control delays
- **Broadcast/multicast** — one packet to many receivers

| Use TCP when… | Use UDP when… |
| --- | --- |
| Data integrity is critical | Latency beats reliability |
| File transfers (HTTP, FTP) | Live video / audio streaming |
| Database connections | Online gaming (position updates) |
| Email (SMTP, IMAP) | DNS queries (quick, retried by app) |
| Order matters (e.g. messages) | IoT sensor data (stale = useless) |

> **NOTE:** **QUIC** (used by HTTP/3) is built on UDP but implements its own reliability and multiplexing in user space. It gets UDP's speed benefits while supporting ordered, reliable streams — eliminating TCP's head-of-line blocking.

| Property | TCP | UDP |
| --- | --- | --- |
| Connection | Connection-oriented (3-way handshake) | Connectionless |
| Reliability | Guaranteed delivery + retransmit | Best-effort, no retransmit |
| Ordering | In-order delivery guaranteed | No ordering guarantee |
| Speed | Slower (overhead) | Faster (no overhead) |
| Header size | 20–60 bytes | 8 bytes |
| Flow control | Yes (window size) | No |
| Congestion control | Yes (AIMD) | No (application responsibility) |
| Use cases | HTTP, SSH, DB, SMTP | DNS, Video, Gaming, QUIC |
