## AI Regulatory Landscape

| GDPR Article | Relevance to AI | Practical Implication |
| --- | --- | --- |
| Art. 5 — Data minimization | Only process data needed for the AI task | Don't collect 50 features when 5 will do |
| Art. 17 — Right to erasure | Delete user data + retrain/update model | Machine unlearning is now a compliance requirement |
| Art. 22 — Automated decisions | Right to human review of automated decisions | Credit, hiring, medical AI must have human oversight |
| Art. 35 — DPIA | High-risk AI requires Data Protection Impact Assessment | Mandatory for systematic profiling |

### EU AI Act Summary

- **Prohibited AI (immediate ban):** Social credit scoring, real-time biometric surveillance in public, subliminal manipulation
- **High-risk AI (strictest requirements):** Medical devices, employment decisions, credit scoring, law enforcement
- **GPAI (GPT-4, Claude, etc.):** Transparency requirements, copyright compliance, systemic risk assessment
- **Penalties:** Up to €35M or 7% of global annual revenue for prohibited AI violations

### Compliance Checklist

1. Classify your AI system's risk level under the EU AI Act
2. Document training data sources, licenses, and PII handling
3. Implement and document human oversight mechanisms
4. Write a Data Protection Impact Assessment (DPIA) if high-risk
5. Create model cards with performance metrics by demographic group
6. Build an audit trail for every automated decision affecting individuals
7. Establish a process for users to contest automated decisions
8. Test for bias and document results before deployment
9. Assign a responsible AI officer / Data Protection Officer

> **CAUTION:** **For developers:** If you deploy AI in the EU (even as a non-EU company serving EU users), the EU AI Act applies. The grace periods for high-risk AI end in 2026.
