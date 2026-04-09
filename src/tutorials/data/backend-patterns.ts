// ─── Backend Patterns Tutorial Data ───
import type { TutorialCategory } from '../types';

const category: TutorialCategory = {
  id: 'backend-patterns',
  title: 'Backend Patterns',
  icon: 'database',
  color: '#10b981',
  description: 'Repository pattern, middleware, dependency injection, auth flows, and API design.',
  sections: [
    // ═══════════════════════════════════════════
    // SECTION: Data Access
    // ═══════════════════════════════════════════
    {
      title: 'Data Access',
      topics: [
        // ─── 1. Repository Pattern ───
        {
          slug: 'repository-pattern',
          title: 'Repository Pattern',
          description: 'Abstracting data access behind a clean interface for testability and flexibility.',
          keywords: ['repository', 'data access', 'abstraction', 'persistence', 'database'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          contentFile: 'backend-patterns/repository-pattern.md',
        },

        // ─── 2. Active Record vs Data Mapper ───
        {
          slug: 'active-record-vs-data-mapper',
          title: 'Active Record vs Data Mapper',
          description: 'Two fundamental ORM strategies — when the model IS the query versus a separate mapping layer.',
          keywords: ['active record', 'data mapper', 'ORM', 'typeorm', 'sequelize', 'prisma'],
          difficulty: 'intermediate',
          estimatedMinutes: 12,
          contentFile: 'backend-patterns/active-record-vs-data-mapper.md',
        },

        // ─── 3. Unit of Work ───
        {
          slug: 'unit-of-work',
          title: 'Unit of Work',
          description: 'Managing transactions across multiple repository operations as a single atomic unit.',
          keywords: ['unit of work', 'transaction', 'atomicity', 'commit', 'rollback', 'database'],
          difficulty: 'advanced',
          estimatedMinutes: 14,
          prerequisites: ['repository-pattern'],
          contentFile: 'backend-patterns/unit-of-work.md',
        },
      ],
    },

    // ═══════════════════════════════════════════
    // SECTION: Service Layer
    // ═══════════════════════════════════════════
    {
      title: 'Service Layer',
      topics: [
        // ─── 4. Service Layer ───
        {
          slug: 'service-layer',
          title: 'Service Layer',
          description: 'Orchestrating business logic in a dedicated layer between controllers and repositories.',
          keywords: ['service layer', 'business logic', 'orchestration', 'controllers', 'separation of concerns'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          prerequisites: ['repository-pattern'],
          contentFile: 'backend-patterns/service-layer.md',
        },

        // ─── 5. Middleware Pipeline ───
        {
          slug: 'middleware-pipeline',
          title: 'Middleware Pipeline',
          description: 'Building composable request processing pipelines in Express and Koa.',
          keywords: ['middleware', 'pipeline', 'express', 'koa', 'request processing', 'chain of responsibility'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          contentFile: 'backend-patterns/middleware-pipeline.md',
        },
      ],
    },

    // ═══════════════════════════════════════════
    // SECTION: Infrastructure
    // ═══════════════════════════════════════════
    {
      title: 'Infrastructure',
      topics: [
        // ─── 6. Dependency Injection ───
        {
          slug: 'dependency-injection',
          title: 'Dependency Injection',
          description: 'Decoupling components through constructor injection and DI containers for testable code.',
          keywords: ['dependency injection', 'DI', 'IoC', 'inversion of control', 'container', 'testing'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          contentFile: 'backend-patterns/dependency-injection.md',
        },

        // ─── 7. Auth Patterns ───
        {
          slug: 'auth-patterns',
          title: 'Authentication Patterns',
          description: 'JWT, OAuth 2.0, and session-based authentication flows with practical implementation.',
          keywords: ['authentication', 'JWT', 'OAuth', 'session', 'token', 'security', 'authorization'],
          difficulty: 'intermediate',
          estimatedMinutes: 20,
          contentFile: 'backend-patterns/auth-patterns.md',
        },
      ],
    },

    // ═══════════════════════════════════════════
    // SECTION: API & Error Handling
    // ═══════════════════════════════════════════
    {
      title: 'API & Error Handling',
      topics: [
        // ─── 8. API Versioning ───
        {
          slug: 'api-versioning',
          title: 'API Versioning',
          description: 'Strategies for evolving APIs without breaking existing clients.',
          keywords: ['API versioning', 'REST', 'URL versioning', 'header versioning', 'backward compatibility'],
          difficulty: 'intermediate',
          estimatedMinutes: 12,
          contentFile: 'backend-patterns/api-versioning.md',
        },

        // ─── 9. Error Handling Patterns ───
        {
          slug: 'error-handling-patterns',
          title: 'Error Handling Patterns',
          description: 'Building a robust error hierarchy, global error handlers, and consistent error responses.',
          keywords: ['error handling', 'error codes', 'global handler', 'error hierarchy', 'Express', 'middleware'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          contentFile: 'backend-patterns/error-handling-patterns.md',
        },

        // ─── 10. Logging & Observability ───
        {
          slug: 'logging-observability',
          title: 'Logging & Observability',
          description: 'Structured logging, log levels, and distributed tracing with correlation IDs.',
          keywords: ['logging', 'observability', 'tracing', 'correlation ID', 'Winston', 'structured logging'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          contentFile: 'backend-patterns/logging-observability.md',
        },
      ],
    },
  ],
};

export default category;
