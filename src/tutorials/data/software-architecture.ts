import type { TutorialCategory } from '../types';

const category: TutorialCategory = {
  id: 'software-architecture',
  title: 'Software Architecture',
  icon: 'layers',
  color: '#8b5cf6',
  description: 'MVC, Clean Architecture, SOLID principles, DDD, CQRS, and GoF design patterns.',
  sections: [
    // ═══════════════════════════════════════════
    // SECTION: Architecture Patterns
    // ═══════════════════════════════════════════
    {
      title: 'Architecture Patterns',
      topics: [
        // ── 1. MVC Pattern ──
        {
          slug: 'mvc-pattern',
          title: 'Model-View-Controller (MVC)',
          description: 'Understand the classic MVC pattern that separates data, UI, and control logic into three interconnected components.',
          keywords: ['mvc', 'model', 'view', 'controller', 'architecture', 'separation of concerns'],
          difficulty: 'beginner',
          estimatedMinutes: 12,
          contentFile: 'software-architecture/mvc-pattern.md',
        },

        // ── 2. MVP Pattern ──
        {
          slug: 'mvp-pattern',
          title: 'Model-View-Presenter (MVP)',
          description: 'Learn the MVP pattern where the Presenter acts as a middleman between the View and Model, making views passive and testable.',
          keywords: ['mvp', 'model', 'view', 'presenter', 'passive view', 'testability'],
          difficulty: 'beginner',
          estimatedMinutes: 10,
          prerequisites: ['mvc-pattern'],
          contentFile: 'software-architecture/mvp-pattern.md',
        },

        // ── 3. MVVM Pattern ──
        {
          slug: 'mvvm-pattern',
          title: 'Model-View-ViewModel (MVVM)',
          description: 'Master MVVM with two-way data binding, making UI development declarative and reactive.',
          keywords: ['mvvm', 'viewmodel', 'data binding', 'reactive', 'wpf', 'angular', 'vue'],
          difficulty: 'intermediate',
          estimatedMinutes: 12,
          prerequisites: ['mvc-pattern'],
          contentFile: 'software-architecture/mvvm-pattern.md',
        },

        // ── 4. Clean Architecture ──
        {
          slug: 'clean-architecture',
          title: 'Clean Architecture',
          description: 'Learn Uncle Bob\'s Clean Architecture with concentric dependency circles and the Dependency Rule.',
          keywords: ['clean architecture', 'uncle bob', 'dependency rule', 'layers', 'use cases', 'entities'],
          difficulty: 'advanced',
          estimatedMinutes: 18,
          prerequisites: ['mvc-pattern'],
          contentFile: 'software-architecture/clean-architecture.md',
        },

        // ── 5. Hexagonal Architecture ──
        {
          slug: 'hexagonal-architecture',
          title: 'Hexagonal Architecture (Ports & Adapters)',
          description: 'Explore the Ports & Adapters pattern that isolates your application core from external systems using explicit interfaces.',
          keywords: ['hexagonal', 'ports and adapters', 'alistair cockburn', 'boundaries', 'adapters'],
          difficulty: 'advanced',
          estimatedMinutes: 16,
          prerequisites: ['clean-architecture'],
          contentFile: 'software-architecture/hexagonal-architecture.md',
        },
      ],
    },

    // ═══════════════════════════════════════════
    // SECTION: SOLID Principles
    // ═══════════════════════════════════════════
    {
      title: 'SOLID Principles',
      topics: [
        // ── 6. Single Responsibility ──
        {
          slug: 'single-responsibility',
          title: 'Single Responsibility Principle (SRP)',
          description: 'A class should have only one reason to change. Learn to identify and extract responsibilities.',
          keywords: ['solid', 'srp', 'single responsibility', 'cohesion', 'separation'],
          difficulty: 'beginner',
          estimatedMinutes: 10,
          contentFile: 'software-architecture/single-responsibility.md',
        },

        // ── 7. Open/Closed Principle ──
        {
          slug: 'open-closed',
          title: 'Open/Closed Principle (OCP)',
          description: 'Software entities should be open for extension but closed for modification. Use the Strategy pattern to add behavior without changing existing code.',
          keywords: ['solid', 'ocp', 'open closed', 'extension', 'strategy pattern'],
          difficulty: 'intermediate',
          estimatedMinutes: 12,
          prerequisites: ['single-responsibility'],
          contentFile: 'software-architecture/open-closed.md',
        },

        // ── 8. Liskov Substitution ──
        {
          slug: 'liskov-substitution',
          title: 'Liskov Substitution Principle (LSP)',
          description: 'Subtypes must be substitutable for their base types without altering program correctness. Explore the classic Rectangle/Square problem.',
          keywords: ['solid', 'lsp', 'liskov', 'substitution', 'inheritance', 'subtype'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          prerequisites: ['single-responsibility'],
          contentFile: 'software-architecture/liskov-substitution.md',
        },

        // ── 9. Interface Segregation ──
        {
          slug: 'interface-segregation',
          title: 'Interface Segregation Principle (ISP)',
          description: 'No client should be forced to depend on methods it does not use. Learn to design small, focused interfaces.',
          keywords: ['solid', 'isp', 'interface segregation', 'fat interface', 'role interface'],
          difficulty: 'intermediate',
          estimatedMinutes: 10,
          prerequisites: ['single-responsibility'],
          contentFile: 'software-architecture/interface-segregation.md',
        },

        // ── 10. Dependency Inversion ──
        {
          slug: 'dependency-inversion',
          title: 'Dependency Inversion Principle (DIP)',
          description: 'High-level modules should depend on abstractions, not low-level details. Learn to invert dependencies with interfaces and injection.',
          keywords: ['solid', 'dip', 'dependency inversion', 'dependency injection', 'abstractions'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          prerequisites: ['single-responsibility', 'interface-segregation'],
          contentFile: 'software-architecture/dependency-inversion.md',
        },
      ],
    },

    // ═══════════════════════════════════════════
    // SECTION: Domain-Driven Design
    // ═══════════════════════════════════════════
    {
      title: 'Domain-Driven Design',
      topics: [
        // ── 11. DDD Fundamentals ──
        {
          slug: 'ddd-fundamentals',
          title: 'Domain-Driven Design Fundamentals',
          description: 'Master the building blocks of DDD: Entities, Value Objects, Aggregates, Repositories, and Bounded Contexts.',
          keywords: ['ddd', 'domain driven design', 'entity', 'value object', 'aggregate', 'bounded context', 'repository'],
          difficulty: 'advanced',
          estimatedMinutes: 20,
          prerequisites: ['clean-architecture', 'single-responsibility'],
          contentFile: 'software-architecture/ddd-fundamentals.md',
        },
      ],
    },

    // ═══════════════════════════════════════════
    // SECTION: Advanced Patterns
    // ═══════════════════════════════════════════
    {
      title: 'Advanced Patterns',
      topics: [
        // ── 12. CQRS ──
        {
          slug: 'cqrs',
          title: 'Command Query Responsibility Segregation (CQRS)',
          description: 'Separate read and write models for scalability and flexibility. Learn when CQRS adds value and when it adds unnecessary complexity.',
          keywords: ['cqrs', 'command', 'query', 'read model', 'write model', 'segregation'],
          difficulty: 'advanced',
          estimatedMinutes: 16,
          prerequisites: ['ddd-fundamentals', 'single-responsibility'],
          contentFile: 'software-architecture/cqrs.md',
        },

        // ── 13. Event Sourcing ──
        {
          slug: 'event-sourcing',
          title: 'Event Sourcing',
          description: 'Store state as a sequence of events instead of current snapshots. Learn event stores, replay, projections, and when event sourcing is worth the trade-offs.',
          keywords: ['event sourcing', 'event store', 'replay', 'projection', 'append-only', 'audit'],
          difficulty: 'advanced',
          estimatedMinutes: 18,
          prerequisites: ['cqrs', 'ddd-fundamentals'],
          contentFile: 'software-architecture/event-sourcing.md',
        },
      ],
    },

    // ═══════════════════════════════════════════
    // SECTION: GoF Design Patterns
    // ═══════════════════════════════════════════
    {
      title: 'GoF Design Patterns',
      topics: [
        // ── 14. Creational Patterns ──
        {
          slug: 'creational-patterns',
          title: 'Creational Design Patterns',
          description: 'Master the five GoF creational patterns: Factory Method, Abstract Factory, Builder, Singleton, and Prototype. Each with when-to-use guidance and TypeScript examples.',
          keywords: ['gof', 'creational', 'factory', 'builder', 'singleton', 'prototype', 'design patterns'],
          difficulty: 'intermediate',
          estimatedMinutes: 20,
          contentFile: 'software-architecture/creational-patterns.md',
        },

        // ── 15. Structural & Behavioral Patterns ──
        {
          slug: 'structural-behavioral',
          title: 'Structural & Behavioral Patterns',
          description: 'Learn key GoF structural patterns (Adapter, Facade, Decorator) and behavioral patterns (Observer, Strategy, Command, Chain of Responsibility) with practical TypeScript examples.',
          keywords: ['gof', 'structural', 'behavioral', 'adapter', 'facade', 'decorator', 'observer', 'strategy', 'command', 'chain of responsibility'],
          difficulty: 'intermediate',
          estimatedMinutes: 22,
          prerequisites: ['creational-patterns'],
          contentFile: 'software-architecture/structural-behavioral.md',
        },
      ],
    },
  ],
};

export default category;
