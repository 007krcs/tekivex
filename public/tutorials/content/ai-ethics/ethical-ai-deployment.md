## Responsible Deployment Practices

| Practice | Description | Implementation |
| --- | --- | --- |
| Human-in-the-loop | High-stakes decisions reviewed by humans | Flag low-confidence predictions |
| Explainability | Users understand why a decision was made | SHAP values, natural language explanations |
| Contestability | Users can appeal AI decisions | Appeals process, human review panel |
| Monitoring | Detect when model performance degrades | Track accuracy/fairness KPIs, data drift alerts |
| Incident Response | Plan for when AI causes harm | Rollback procedure, escalation path |

<!-- title: fairness_monitor.py -->
```python
class FairnessMonitor:
    def __init__(self, baseline: dict):
        self.baseline = baseline  # {"group_A": 0.42, "group_B": 0.41}

    def check(self, current: dict, window: str = "weekly") -> list[str]:
        alerts = []
        for group, rate in current.items():
            drift = abs(rate - self.baseline.get(group, 0))
            if drift > 0.05:
                alerts.append(f"⚠️ [{window}] {group} drifted {drift:.1%}")
        parity_gap = max(current.values()) - min(current.values())
        if parity_gap > 0.10:
            alerts.append(f"⚠️ Demographic parity violation: gap={parity_gap:.1%}")
        for a in alerts:
            print(a)
        return alerts

monitor = FairnessMonitor({"group_A": 0.42, "group_B": 0.41})
monitor.check({"group_A": 0.44, "group_B": 0.29})
```
