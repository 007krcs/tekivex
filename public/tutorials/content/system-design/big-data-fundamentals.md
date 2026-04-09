## The 5 Vs of Big Data

| V | Meaning | Example Challenge |
| --- | --- | --- |
| Volume | Terabytes to petabytes | Can't fit in a single machine's RAM or disk |
| Velocity | High rate of data arrival | Millions of events/second from IoT sensors |
| Variety | Structured, semi-structured, unstructured | JSON logs + CSV exports + video files |
| Veracity | Data quality and accuracy | Missing values, duplicate events, schema drift |
| Value | Business insight from data | Actionable analytics that justify storage costs |

## Batch vs Stream Processing

| Batch Processing | Stream Processing |
| --- | --- |
| Process a finite dataset all at once | Process events as they arrive |
| High throughput, high latency (hours) | Low latency (ms to seconds) |
| Apache Spark, Hadoop MapReduce | Apache Kafka + Flink, Spark Streaming |
| ETL jobs, ML training, monthly reports | Real-time dashboards, fraud detection |
| Cheaper to run, simpler to debug | More complex, more infrastructure |

## Lambda Architecture

Lambda architecture runs **two processing paths**: a **batch layer** (accurate, slow) and a **speed layer** (approximate, fast). A **serving layer** merges results. The downside: you maintain two codebases.

## Modern Data Lakehouse

The **Data Lakehouse** (Databricks Delta Lake, Apache Iceberg, Apache Hudi) unifies the cheap storage of a data lake (S3/GCS) with the ACID transactions and schema enforcement of a data warehouse. One system, one codebase, one truth.

| Layer | Technology | Role |
| --- | --- | --- |
| Ingestion | Kafka, Kinesis, Firehose | Stream events from services |
| Storage | S3 + Iceberg/Delta | Cheap, durable, queryable |
| Processing | Spark, Flink, dbt | Transform raw → curated → aggregated |
| Query | Trino, Athena, BigQuery | Ad-hoc SQL on PB-scale data |
| BI / ML | Tableau, Looker, SageMaker | Consume insights |
