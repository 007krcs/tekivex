// ─── Tutorial Content Types ───

export type ContentBlock =
  | { type: 'heading'; level: 2 | 3 | 4; text: string; id?: string }
  | { type: 'paragraph'; html: string }
  | { type: 'code'; language: string; code: string; title?: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'callout'; variant: 'note' | 'tip' | 'caution'; html: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'diagram'; svg: string; caption: string }
  | { type: 'flow'; steps: FlowStep[] }
  | { type: 'comparison'; left: ComparisonSide; right: ComparisonSide }
  | { type: 'divider' };

export interface FlowStep {
  label: string;
  desc: string;
  color: string;
}

export interface ComparisonSide {
  title: string;
  color: string;
  items: string[];
}

export interface TutorialTopic {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  prerequisites?: string[];
  content: ContentBlock[];
}

export interface TutorialSection {
  title: string;
  topics: TutorialTopic[];
}

export interface TutorialCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  sections: TutorialSection[];
}

export interface CategoryMeta {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  topicCount: number;
}
