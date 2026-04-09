import React, { useState, useEffect } from 'react';
import type { TutorialCategory } from './types';
import { loadCategory, findTopic, getFirstTopic, getAdjacentTopics } from './registry';
import { TutorialSidebar } from './TutorialSidebar';
import { TutorialContent } from './TutorialContent';
import { useProgress } from './useProgress';

interface TutorialLayoutProps {
  categoryId: string;
  topicSlug: string | null;
}

export function TutorialLayout({ categoryId, topicSlug }: TutorialLayoutProps) {
  const [category, setCategory] = useState<TutorialCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { visited, markVisited } = useProgress();

  useEffect(() => {
    setLoading(true);
    setError(null);
    loadCategory(categoryId).then(cat => {
      if (cat) {
        setCategory(cat);
      } else {
        setError(`Category "${categoryId}" not found.`);
      }
      setLoading(false);
    }).catch((err: unknown) => {
      setError(`Failed to load category "${categoryId}": ${err instanceof Error ? err.message : String(err)}`);
      setLoading(false);
    });
  }, [categoryId]);

  // Resolve the active topic
  const activeTopic = category
    ? (topicSlug ? findTopic(category, topicSlug) : getFirstTopic(category))
    : null;

  const activeSlug = activeTopic?.slug ?? '';

  // Mark as visited when topic changes
  useEffect(() => {
    if (activeTopic && category) {
      markVisited(category.id, activeTopic.slug);
    }
  }, [activeTopic?.slug, category?.id]);

  const navigate = (slug: string) => {
    window.location.hash = `/tutorials/${categoryId}/${slug}`;
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="docs-page">
        <div className="docs-loading">
          <div className="docs-loading-spinner" />
          <span>Loading tutorials...</span>
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="docs-page">
        <div className="docs-error">
          <h2>Tutorial Not Found</h2>
          <p>{error || 'Could not load this tutorial category.'}</p>
          <a href="#/tutorials" className="btn-primary" style={{ marginTop: 16 }}>Back to Tutorials</a>
        </div>
      </div>
    );
  }

  if (!activeTopic) {
    return (
      <div className="docs-page">
        <div className="docs-error">
          <h2>Topic Not Found</h2>
          <p>The topic <code>{topicSlug}</code> does not exist in {category.title}.</p>
          <a href={`#/tutorials/${categoryId}`} className="btn-primary" style={{ marginTop: 16 }}>
            Go to {category.title}
          </a>
        </div>
      </div>
    );
  }

  const { prev, next } = getAdjacentTopics(category, activeSlug);

  return (
    <div className="docs-page">
      <TutorialSidebar
        category={category}
        activeSlug={activeSlug}
        onNavigate={navigate}
        visited={visited}
      />
      <TutorialContent
        topic={activeTopic}
        category={category}
        onNavigate={navigate}
        prev={prev}
        next={next}
      />
    </div>
  );
}
