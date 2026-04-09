## RPO and RTO

| RPO — Recovery Point Objective | RTO — Recovery Time Objective |
| --- | --- |
| How much data can we afford to lose? | How long can the system be down? |
| Measured in time: "max 1 hour of data loss" | Measured in time: "restore within 4 hours" |
| Determines backup frequency | Determines recovery infrastructure |
| Lower RPO = more frequent backups = higher cost | Lower RTO = warm standby = higher cost |
| Banking: RPO = 0 (no data loss) | E-commerce: RTO = 15 min |

## Backup Types

| Type | What It Copies | Speed | Restore Speed | Storage |
| --- | --- | --- | --- | --- |
| Full | Everything | Slow | Fast (single set) | Large |
| Incremental | Changes since last backup (any type) | Fast | Slow (chain required) | Smallest |
| Differential | Changes since last FULL backup | Medium | Medium (full + diff) | Medium |
| Continuous (PITR) | WAL stream / transaction log | Continuous | Exact point in time | Moderate |

## The 3-2-1 Rule

1. **3 copies** of your data (1 primary + 2 backups)
2. **2 different storage media** (e.g. local SSD + cloud object storage)
3. **1 offsite copy** (different geographic region — survives fire, flood, datacenter failure)

> **CAUTION:** **A backup you've never tested is not a backup.** Run restore drills quarterly. The worst time to discover your backup is corrupt or your restore procedure is broken is during an actual incident at 3 AM.
