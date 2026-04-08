import React from 'react';
import type { FlowStep, ComparisonSide } from './types';

// ─── Auto-Rendered Flow Diagrams ───

const BOX_W = 160;
const BOX_H = 70;
const GAP = 48;
const ARROW_W = 32;
const PAD = 16;

export function FlowDiagram({ steps }: { steps: FlowStep[] }) {
  const n = steps.length;
  const totalW = n * BOX_W + (n - 1) * GAP + PAD * 2;
  const totalH = BOX_H + PAD * 2 + 24;

  return (
    <div className="tutorial-diagram-wrap">
      <svg viewBox={`0 0 ${totalW} ${totalH}`} width="100%" style={{ maxWidth: totalW, display: 'block', margin: '0 auto' }}>
        {steps.map((step, i) => {
          const x = PAD + i * (BOX_W + GAP);
          const y = PAD;
          return (
            <g key={i}>
              {/* Box */}
              <rect x={x} y={y} width={BOX_W} height={BOX_H} rx={10} ry={10}
                fill={step.color + '1a'} stroke={step.color} strokeWidth={2} />
              {/* Label */}
              <text x={x + BOX_W / 2} y={y + 26} textAnchor="middle"
                fontSize={14} fontWeight={700} fill={step.color}>{step.label}</text>
              {/* Description */}
              <text x={x + BOX_W / 2} y={y + 48} textAnchor="middle"
                fontSize={11} fill="var(--hub-text-muted)">{step.desc}</text>
              {/* Arrow to next */}
              {i < n - 1 && (
                <g>
                  <line x1={x + BOX_W + 4} y1={y + BOX_H / 2}
                        x2={x + BOX_W + GAP - 4} y2={y + BOX_H / 2}
                        stroke="var(--hub-text-muted)" strokeWidth={2} markerEnd="url(#arrowhead)" />
                </g>
              )}
            </g>
          );
        })}
        <defs>
          <marker id="arrowhead" markerWidth={10} markerHeight={7} refX={9} refY={3.5} orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="var(--hub-text-muted)" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

// ─── Vertical Flow (Mobile-friendly) ───
export function FlowDiagramVertical({ steps }: { steps: FlowStep[] }) {
  const n = steps.length;
  const bw = 220;
  const bh = 60;
  const gap = 36;
  const pad = 16;
  const totalH = n * bh + (n - 1) * gap + pad * 2;
  const totalW = bw + pad * 2;

  return (
    <div className="tutorial-diagram-wrap">
      <svg viewBox={`0 0 ${totalW} ${totalH}`} width="100%" style={{ maxWidth: totalW, display: 'block', margin: '0 auto' }}>
        {steps.map((step, i) => {
          const x = pad;
          const y = pad + i * (bh + gap);
          return (
            <g key={i}>
              <rect x={x} y={y} width={bw} height={bh} rx={10} ry={10}
                fill={step.color + '1a'} stroke={step.color} strokeWidth={2} />
              <text x={x + bw / 2} y={y + 24} textAnchor="middle"
                fontSize={13} fontWeight={700} fill={step.color}>{step.label}</text>
              <text x={x + bw / 2} y={y + 44} textAnchor="middle"
                fontSize={11} fill="var(--hub-text-muted)">{step.desc}</text>
              {i < n - 1 && (
                <line x1={x + bw / 2} y1={y + bh + 4}
                      x2={x + bw / 2} y2={y + bh + gap - 4}
                      stroke="var(--hub-text-muted)" strokeWidth={2} markerEnd="url(#arrowV)" />
              )}
            </g>
          );
        })}
        <defs>
          <marker id="arrowV" markerWidth={10} markerHeight={7} refX={5} refY={3.5} orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="var(--hub-text-muted)" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

// ─── Comparison Card ───
export function ComparisonCard({ left, right }: { left: ComparisonSide; right: ComparisonSide }) {
  return (
    <div className="tutorial-comparison">
      <div className="tutorial-comparison-side" style={{ borderColor: left.color }}>
        <h4 style={{ color: left.color }}>{left.title}</h4>
        <ul>
          {left.items.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
        </ul>
      </div>
      <div className="tutorial-comparison-vs">VS</div>
      <div className="tutorial-comparison-side" style={{ borderColor: right.color }}>
        <h4 style={{ color: right.color }}>{right.title}</h4>
        <ul>
          {right.items.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
        </ul>
      </div>
    </div>
  );
}
