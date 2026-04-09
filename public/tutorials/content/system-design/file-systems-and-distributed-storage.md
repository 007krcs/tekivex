## Storage Hierarchy

| Layer | Latency | Size | Examples |
| --- | --- | --- | --- |
| CPU registers | <1 ns | Bytes | In-chip |
| L1/L2/L3 Cache | 1–30 ns | KB–MB | In-chip SRAM |
| RAM | 100 ns | GB | DDR5 |
| NVMe SSD | 100 µs | TB | Local SSD, AWS GP3 |
| SATA SSD / HDD | 1–10 ms | TB–PB | Object storage backends |
| Distributed storage | 1–100 ms | Exabytes | HDFS, Ceph, S3 |
| Tape / Archive | Hours | Unlimited | Glacier, LTO tape |

## HDFS (Hadoop Distributed File System)

HDFS stores very large files across many commodity machines by splitting them into 128 MB blocks. A **NameNode** (metadata) tracks where each block lives. Multiple **DataNodes** store the actual blocks with a 3x replication factor.

- Designed for **write-once, read-many** access patterns
- **Data locality** — MapReduce/Spark moves computation to the data node, not vice versa
- **Rack awareness** — replicas placed across racks for fault tolerance
- NameNode is a SPOF — use High-Availability NameNode with Zookeeper in production

## Ceph

**Ceph** is an open-source, unified distributed storage system that provides **object storage** (compatible with S3), **block storage** (RBD for VMs), and **file storage** (CephFS). Used by OpenStack, Kubernetes, and many cloud providers.

> **NOTE:** Ceph's CRUSH algorithm maps data to storage devices deterministically without a central lookup table — removing the single-point-of-failure bottleneck that plagues other distributed filesystems.
