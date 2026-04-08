import React from 'react';
import type { FlowStep, ComparisonSide } from './types';

// ─── Horizontal Flow Diagram (HTML/CSS — auto word-wrap) ───────────────────

export function FlowDiagram({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="flow-diagram-wrap">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          {/* Step card */}
          <div
            className="flow-step"
            style={{
              borderColor: step.color,
              background: step.color + '18',
            }}
          >
            <span
              className="flow-step-label"
              style={{ color: step.color }}
            >
              {step.label}
            </span>
            {step.desc && (
              <span className="flow-step-desc">{step.desc}</span>
            )}
          </div>

          {/* Arrow connector */}
          {i < steps.length - 1 && (
            <div className="flow-arrow" aria-hidden="true">
              <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
                <line
                  x1="0" y1="8" x2="22" y2="8"
                  stroke="var(--hub-text-muted, #94a3b8)"
                  strokeWidth="2"
                />
                <polygon
                  points="18,4 28,8 18,12"
                  fill="var(--hub-text-muted, #94a3b8)"
                />
              </svg>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Vertical Flow (Mobile-friendly) ───────────────────────────────────────

export function FlowDiagramVertical({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="flow-diagram-vertical-wrap">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          {/* Step card */}
          <div
            className="flow-step-vertical"
            style={{
              borderColor: step.color,
              background: step.color + '18',
            }}
          >
            <span
              className="flow-step-label"
              style={{ color: step.color }}
            >
              {step.label}
            </span>
            {step.desc && (
              <span className="flow-step-desc">{step.desc}</span>
            )}
          </div>

          {/* Down arrow */}
          {i < steps.length - 1 && (
            <div className="flow-arrow-down" aria-hidden="true">
              <svg width="16" height="28" viewBox="0 0 16 28" fill="none">
                <line
                  x1="8" y1="0" x2="8" y2="22"
                  stroke="var(--hub-text-muted, #94a3b8)"
                  strokeWidth="2"
                />
                <polygon
                  points="4,18 8,28 12,18"
                  fill="var(--hub-text-muted, #94a3b8)"
                />
              </svg>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Comparison Card ────────────────────────────────────────────────────────

export function ComparisonCard({ left, right }: { left: ComparisonSide; right: ComparisonSide }) {
  return (
    <div className="tutorial-comparison">
      <div className="tutorial-comparison-side" style={{ borderColor: left.color }}>
        <h4 style={{ color: left.color }}>{left.title}</h4>
        <ul>
          {left.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      </div>
      <div className="tutorial-comparison-vs">VS</div>
      <div className="tutorial-comparison-side" style={{ borderColor: right.color }}>
        <h4 style={{ color: right.color }}>{right.title}</h4>
        <ul>
          {right.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      </div>
    </div>
  );
}
