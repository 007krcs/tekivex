## What Is Serialization?

**Serialization** converts in-memory data structures into a format that can be transmitted over a network or persisted to storage. **Deserialization** is the reverse. Your choice of format affects payload size, parsing speed, schema evolution, and human readability.

## Text Formats

- **JSON** — universal, human-readable, no schema required. Verbose. No dates, no bytes, no integers > 2^53. Default choice for REST APIs.
- **XML** — verbose, namespace support, XSLT transforms. Legacy enterprise, SOAP, SVG.
- **YAML** — superset of JSON, human-friendly config. Never use for data interchange (insecure parser, slow).
- **CSV** — flat tabular data, Excel-compatible. No types, no nesting, no schema.
- **TOML** — config files. Better than YAML for simple hierarchies.

## Binary Formats

| Format | Schema? | Size vs JSON | Speed vs JSON | Best For |
| --- | --- | --- | --- | --- |
| MessagePack | No (schema-less) | ~40% smaller | ~2x faster | Drop-in JSON replacement, WebSockets |
| Protocol Buffers | Yes (.proto) | ~70% smaller | ~5–10x faster | gRPC, internal microservices |
| Apache Avro | Yes (JSON schema) | ~60% smaller | ~4x faster | Kafka messages, data pipelines |
| Apache Parquet | Yes | ~90% smaller* | Fast for columns | Analytics, data lake storage (columnar) |
| FlatBuffers | Yes (.fbs) | ~70% smaller | Zero-copy | Games, embedded, mobile |

> **NOTE:** **Parquet** is columnar — it stores all values of a column together. This makes it very fast for analytical queries (read only the columns you need) but slow for row-level inserts. Use it for batch analytics, not OLTP.

## Schema Evolution

Real systems evolve over time. Fields get added, renamed, or removed. Schema evolution rules determine whether old and new versions of code can still communicate.

- **Backward compatible** — new reader can read old data (add optional fields only)
- **Forward compatible** — old reader can read new data (ignore unknown fields)
- **Full compatible** — both directions work simultaneously
- **JSON** — no built-in enforcement; discipline required
- **Protobuf** — field numbers are the contract; never reuse a number
- **Avro** — schema registry enforces compatibility rules (Confluent)

<!-- title: JSON Size vs MessagePack Comparison -->
```typescript
import msgpack from 'msgpackr';

const data = {
  id: 12345,
  name: 'Alice',
  scores: [98.5, 87.2, 92.1],
  active: true,
  meta: { region: 'us-east-1', tier: 2 },
};

const json = JSON.stringify(data);
const packed = msgpack.pack(data);

console.log('JSON bytes:', Buffer.byteLength(json));     // ~105 bytes
console.log('MsgPack bytes:', packed.byteLength);        // ~65 bytes (~38% smaller)
```
