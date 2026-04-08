import React, { useState, useMemo } from 'react';
import type { TutorialCategory, TutorialTopic } from './types';

interface TutorialSidebarProps {
  category: TutorialCategory;
  activeSlug: string;
  onNavigate: (slug: string) => void;
  visited: Set<string>;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: '#22c55e',
  intermediate: '#f59e0b',
  advanced: '#ef4444',
};

export function TutorialSidebar({ category, activeSlug, onNavigate, visited }: TutorialSidebarProps) {
  const [search, setSearch] = useState('');
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggle = (title: string) => {
    setCollapsed(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const filteredSections = useMemo(() => {
    if (!search.trim()) return category.sections;
    const q = search.toLowerCase();
    return category.sections
      .map(s => ({
        ...s,
        topics: s.topics.filter(t => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)),
      }))
      .filter(s => s.topics.length > 0);
  }, [category.sections, search]);

  const allTopics = category.sections.flatMap(s => s.topics);
  const visitedCount = allTopics.filter(t => visited.has(`${category.id}/${t.slug}`)).length;

  return (
    <aside className="docs-sidebar">
      {/* Category header */}
      <div className="tutorial-sidebar-header">
        <span className="tutorial-sidebar-dot" style={{ background: category.color }} />
        <span className="tutorial-sidebar-title">{category.title}</span>
      </div>

      {/* Progress */}
      <div className="tutorial-progress">
        <div className="tutorial-progress-bar">
          <div className="tutorial-progress-fill"
               style={{ width: `${(visitedCount / allTopics.length) * 100}%`, background: category.color }} />
        </div>
        <span className="tutorial-progress-text">{visitedCount} / {allTopics.length} completed</span>
      </div>

      {/* Search */}
      <div className="docs-sidebar-search-wrap">
        <span className="docs-sidebar-search-icon">&#x1F50D;</span>
        <input
          className="docs-sidebar-search"
          type="text"
          placeholder="Search topics..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Sections */}
      {filteredSections.map(section => {
        const isCollapsed = collapsed[section.title] ?? false;
        return (
          <div key={section.title} className="docs-section">
            <button className="docs-section-header" onClick={() => toggle(section.title)}>
              <span className={`docs-section-chevron${isCollapsed ? ' collapsed' : ''}`}>&#x25BE;</span>
              {section.title}
            </button>
            {!isCollapsed && (
              <ul className="docs-section-items">
                {section.topics.map(topic => {
                  const isActive = topic.slug === activeSlug;
                  const isVisited = visited.has(`${category.id}/${topic.slug}`);
                  return (
                    <li key={topic.slug}>
                      <button
                        className={`docs-item${isActive ? ' active' : ''}`}
                        onClick={() => onNavigate(topic.slug)}
                      >
                        <span className="tutorial-item-check" style={{ color: isVisited ? category.color : 'transparent' }}>
                          &#x2713;
                        </span>
                        <span className="tutorial-item-title">{topic.title}</span>
                        <span className="tutorial-item-dot" style={{ background: DIFFICULTY_COLORS[topic.difficulty] }}
                              title={topic.difficulty} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </aside>
  );
}
