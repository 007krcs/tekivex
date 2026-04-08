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
          content: [
            { type: 'heading', level: 2, text: 'What is MVC?', id: 'what-is-mvc' },
            {
              type: 'paragraph',
              html: 'The <strong>Model-View-Controller (MVC)</strong> pattern divides an application into three interconnected components. This separation helps manage complexity, allows parallel development, and promotes code reuse.',
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'MVC was first described by Trygve Reenskaug in 1979 for Smalltalk-80. It remains one of the most widely used architectural patterns today.',
            },
            { type: 'heading', level: 3, text: 'The Three Components', id: 'mvc-components' },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Model</strong> — Manages data, business logic, and rules. Notifies observers when state changes.',
                '<strong>View</strong> — Renders the model data for the user. Sends user actions to the controller.',
                '<strong>Controller</strong> — Accepts input, converts it to commands for the model or view.',
              ],
            },
            { type: 'heading', level: 3, text: 'MVC Request Flow', id: 'mvc-flow' },
            {
              type: 'flow',
              steps: [
                { label: 'User', desc: 'Interacts with the UI (click, form submit)', color: '#6366f1' },
                { label: 'Controller', desc: 'Receives request, validates input, calls model', color: '#f59e0b' },
                { label: 'Model', desc: 'Processes business logic, updates data', color: '#10b981' },
                { label: 'View', desc: 'Reads updated model, renders response', color: '#ef4444' },
                { label: 'User', desc: 'Sees the updated UI', color: '#6366f1' },
              ],
            },
            { type: 'heading', level: 3, text: 'MVC in Express.js', id: 'mvc-express' },
            {
              type: 'code',
              language: 'typescript',
              title: 'model/User.ts',
              code: `// Model — pure data + business logic
interface User {
  id: string;
  name: string;
  email: string;
}

class UserModel {
  private users: Map<string, User> = new Map();

  create(name: string, email: string): User {
    const user: User = { id: crypto.randomUUID(), name, email };
    this.users.set(user.id, user);
    return user;
  }

  findById(id: string): User | undefined {
    return this.users.get(id);
  }

  findAll(): User[] {
    return Array.from(this.users.values());
  }
}

export const userModel = new UserModel();`,
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'controller/UserController.ts',
              code: `// Controller — handles requests, calls model
import { Request, Response } from 'express';
import { userModel } from '../model/User';

export class UserController {
  getAll(req: Request, res: Response) {
    const users = userModel.findAll();
    res.json(users); // View is JSON response
  }

  getById(req: Request, res: Response) {
    const user = userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json(user);
  }

  create(req: Request, res: Response) {
    const { name, email } = req.body;
    const user = userModel.create(name, email);
    res.status(201).json(user);
  }
}`,
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'routes.ts',
              code: `// Routes wire Controller to HTTP endpoints
import { Router } from 'express';
import { UserController } from './controller/UserController';

const router = Router();
const ctrl = new UserController();

router.get('/users', ctrl.getAll);
router.get('/users/:id', ctrl.getById);
router.post('/users', ctrl.create);

export default router;`,
            },
            { type: 'heading', level: 3, text: 'When to Use MVC', id: 'mvc-when' },
            {
              type: 'table',
              headers: ['Use MVC When', 'Avoid MVC When'],
              rows: [
                ['You need clear separation of concerns', 'The application is extremely simple (a few scripts)'],
                ['Multiple views display the same data', 'Real-time streaming is the primary concern'],
                ['Team members work on UI and logic separately', 'You need fine-grained reactive data binding'],
                ['You want testable business logic', 'The app is purely event-driven with no request/response cycle'],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Key takeaway:</strong> MVC excels when you need a clear separation between data, presentation, and control flow. It is the foundation that many other patterns build upon.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'What is MVP?', id: 'what-is-mvp' },
            {
              type: 'paragraph',
              html: 'The <strong>Model-View-Presenter (MVP)</strong> pattern is a derivative of MVC where the <em>Presenter</em> takes over the role of the Controller but with a key difference: the View is completely passive. It has no knowledge of the Model and delegates all decisions to the Presenter.',
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'MVP became popular in the 1990s with frameworks like Taligent and later with Android development before MVVM took over.',
            },
            { type: 'heading', level: 3, text: 'MVP Flow', id: 'mvp-flow' },
            {
              type: 'flow',
              steps: [
                { label: 'User', desc: 'Interacts with the passive View', color: '#6366f1' },
                { label: 'View', desc: 'Delegates event to Presenter via interface', color: '#ef4444' },
                { label: 'Presenter', desc: 'Fetches/updates Model, formats data', color: '#f59e0b' },
                { label: 'Model', desc: 'Performs business logic, returns result', color: '#10b981' },
                { label: 'Presenter', desc: 'Calls View interface methods to update UI', color: '#f59e0b' },
                { label: 'View', desc: 'Renders the data it receives', color: '#ef4444' },
              ],
            },
            { type: 'heading', level: 3, text: 'MVC vs MVP', id: 'mvc-vs-mvp' },
            {
              type: 'comparison',
              left: {
                title: 'MVC',
                color: '#6366f1',
                items: [
                  'View can read Model directly',
                  'Controller does not update View directly',
                  'View is active — observes Model changes',
                  'Harder to unit-test Views',
                ],
              },
              right: {
                title: 'MVP',
                color: '#8b5cf6',
                items: [
                  'View never accesses Model',
                  'Presenter pushes data to View',
                  'View is passive — just renders',
                  'Easy to unit-test with mock Views',
                ],
              },
            },
            { type: 'heading', level: 3, text: 'Code Example', id: 'mvp-code' },
            {
              type: 'code',
              language: 'typescript',
              title: 'interfaces.ts',
              code: `// View interface — the contract the Presenter uses
interface IUserListView {
  showUsers(users: Array<{ name: string; email: string }>): void;
  showError(message: string): void;
  showLoading(loading: boolean): void;
}

// Model interface
interface IUserRepository {
  getAll(): Promise<User[]>;
  delete(id: string): Promise<void>;
}`,
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'UserListPresenter.ts',
              code: `class UserListPresenter {
  constructor(
    private view: IUserListView,
    private repo: IUserRepository
  ) {}

  async loadUsers() {
    this.view.showLoading(true);
    try {
      const users = await this.repo.getAll();
      this.view.showUsers(
        users.map(u => ({ name: u.name, email: u.email }))
      );
    } catch (err) {
      this.view.showError('Failed to load users');
    } finally {
      this.view.showLoading(false);
    }
  }

  async deleteUser(id: string) {
    try {
      await this.repo.delete(id);
      await this.loadUsers(); // refresh
    } catch {
      this.view.showError('Delete failed');
    }
  }
}`,
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'UserListPresenter.test.ts',
              code: `// Unit testing is trivial — just mock the View
const mockView: IUserListView = {
  showUsers: vi.fn(),
  showError: vi.fn(),
  showLoading: vi.fn(),
};
const mockRepo: IUserRepository = {
  getAll: vi.fn().mockResolvedValue([
    { id: '1', name: 'Alice', email: 'a@a.com' },
  ]),
  delete: vi.fn(),
};

const presenter = new UserListPresenter(mockView, mockRepo);
await presenter.loadUsers();

expect(mockView.showLoading).toHaveBeenCalledWith(true);
expect(mockView.showUsers).toHaveBeenCalledWith([
  { name: 'Alice', email: 'a@a.com' },
]);`,
            },
            { type: 'heading', level: 3, text: 'When to Use MVP', id: 'mvp-when' },
            {
              type: 'list',
              ordered: false,
              items: [
                'Platform views are hard to instantiate in tests (Android Activities, WinForms)',
                'You want maximum testability of presentation logic',
                'Views are simple and should not contain any logic',
                'You have a clear one-to-one relationship between View and Presenter',
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Key takeaway:</strong> MVP makes the View completely dumb. All logic lives in the Presenter, which is easily unit-tested with mock View interfaces.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'What is MVVM?', id: 'what-is-mvvm' },
            {
              type: 'paragraph',
              html: '<strong>Model-View-ViewModel (MVVM)</strong> separates the UI (<em>View</em>) from business logic (<em>Model</em>) using a <em>ViewModel</em> that exposes data and commands via data binding. The View automatically updates when the ViewModel changes, and user interactions flow back through bindings.',
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'MVVM was introduced by Microsoft architect John Gossman in 2005 for WPF and Silverlight. It is the foundation of modern frameworks like Angular, Vue, and SwiftUI.',
            },
            { type: 'heading', level: 3, text: 'MVVM Flow', id: 'mvvm-flow' },
            {
              type: 'flow',
              steps: [
                { label: 'View', desc: 'Declarative template binds to ViewModel properties', color: '#ef4444' },
                { label: 'ViewModel', desc: 'Exposes observable state and commands', color: '#f59e0b' },
                { label: 'Model', desc: 'Domain logic and data access', color: '#10b981' },
                { label: 'Data Binding', desc: 'Automatic two-way sync between View and ViewModel', color: '#8b5cf6' },
              ],
            },
            { type: 'heading', level: 3, text: 'MVC vs MVVM', id: 'mvc-vs-mvvm' },
            {
              type: 'comparison',
              left: {
                title: 'MVC',
                color: '#6366f1',
                items: [
                  'Controller manually updates the View',
                  'One-way data flow (request/response)',
                  'Imperative UI updates',
                  'Better for server-rendered apps',
                  'Simple to understand and debug',
                ],
              },
              right: {
                title: 'MVVM',
                color: '#8b5cf6',
                items: [
                  'Data binding auto-syncs View and ViewModel',
                  'Two-way reactive data flow',
                  'Declarative UI templates',
                  'Better for rich client-side apps',
                  'More infrastructure (observables, bindings)',
                ],
              },
            },
            { type: 'heading', level: 3, text: 'ViewModel Example (React-like)', id: 'mvvm-code' },
            {
              type: 'code',
              language: 'typescript',
              title: 'useUserViewModel.ts',
              code: `// ViewModel as a custom React hook
import { useState, useCallback, useEffect } from 'react';

interface User { id: string; name: string; email: string; }

export function useUserViewModel() {
  // Observable state
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('');

  // Derived/computed state
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Commands
  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/users');
      setUsers(await res.json());
    } catch {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async (id: string) => {
    await fetch(\`/api/users/\${id}\`, { method: 'DELETE' });
    setUsers(prev => prev.filter(u => u.id !== id));
  }, []);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  // Expose ViewModel contract
  return { filteredUsers, loading, error, filter, setFilter, deleteUser, refresh: loadUsers };
}`,
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'UserListView.tsx',
              code: `// View — purely declarative, binds to ViewModel
import { useUserViewModel } from './useUserViewModel';

export function UserListView() {
  const vm = useUserViewModel();

  if (vm.loading) return <p>Loading...</p>;
  if (vm.error) return <p className="error">{vm.error}</p>;

  return (
    <div>
      <input
        value={vm.filter}
        onChange={e => vm.setFilter(e.target.value)}
        placeholder="Filter users..."
      />
      <ul>
        {vm.filteredUsers.map(u => (
          <li key={u.id}>
            {u.name} — {u.email}
            <button onClick={() => vm.deleteUser(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
            },
            { type: 'heading', level: 3, text: 'Key Benefits of MVVM', id: 'mvvm-benefits' },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Testable:</strong> ViewModel can be tested without any UI framework',
                '<strong>Declarative:</strong> Views describe what to render, not how',
                '<strong>Reusable:</strong> Same ViewModel can drive different Views',
                '<strong>Maintainable:</strong> Clear separation between UI and logic',
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Key takeaway:</strong> MVVM replaces imperative UI updates with declarative data binding. The ViewModel holds all presentation state and commands, while the View simply binds to it.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'What is Clean Architecture?', id: 'what-is-clean' },
            {
              type: 'paragraph',
              html: '<strong>Clean Architecture</strong>, proposed by Robert C. Martin (Uncle Bob), organizes code into concentric circles where dependencies point <em>inward</em>. Inner circles contain business rules and are completely independent of outer circles (frameworks, databases, UI).',
            },
            { type: 'heading', level: 3, text: 'The Concentric Circles', id: 'clean-circles' },
            {
              type: 'diagram',
              caption: 'Clean Architecture layers — dependencies always point inward',
              svg: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <circle cx="200" cy="200" r="190" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
  <text x="200" y="30" text-anchor="middle" font-size="11" fill="#1e40af" font-weight="bold">Frameworks &amp; Drivers</text>
  <circle cx="200" cy="200" r="145" fill="#e0e7ff" stroke="#6366f1" stroke-width="2"/>
  <text x="200" y="75" text-anchor="middle" font-size="11" fill="#4338ca" font-weight="bold">Interface Adapters</text>
  <circle cx="200" cy="200" r="100" fill="#ede9fe" stroke="#8b5cf6" stroke-width="2"/>
  <text x="200" y="120" text-anchor="middle" font-size="11" fill="#6d28d9" font-weight="bold">Use Cases</text>
  <circle cx="200" cy="200" r="55" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="200" y="193" text-anchor="middle" font-size="13" fill="#92400e" font-weight="bold">Entities</text>
  <text x="200" y="210" text-anchor="middle" font-size="9" fill="#92400e">(Enterprise Rules)</text>
  <!-- Arrows pointing inward -->
  <defs><marker id="ah" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6Z" fill="#64748b"/></marker></defs>
  <line x1="380" y1="200" x2="350" y2="200" stroke="#64748b" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="338" y1="200" x2="310" y2="200" stroke="#64748b" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="295" y1="200" x2="265" y2="200" stroke="#64748b" stroke-width="1.5" marker-end="url(#ah)"/>
</svg>`,
            },
            { type: 'heading', level: 3, text: 'The Dependency Rule', id: 'dependency-rule' },
            {
              type: 'callout',
              variant: 'caution',
              html: '<strong>The Dependency Rule:</strong> Source code dependencies must only point <em>inward</em>. Nothing in an inner circle can know anything about an outer circle. This includes functions, classes, variables, or any named entity.',
            },
            {
              type: 'table',
              headers: ['Layer', 'Contains', 'Depends On'],
              rows: [
                ['Entities', 'Business objects, enterprise rules', 'Nothing'],
                ['Use Cases', 'Application-specific business rules', 'Entities only'],
                ['Interface Adapters', 'Controllers, presenters, gateways', 'Use Cases, Entities'],
                ['Frameworks & Drivers', 'DB, web framework, UI, external services', 'All inner layers'],
              ],
            },
            { type: 'heading', level: 3, text: 'Folder Structure', id: 'clean-folders' },
            {
              type: 'code',
              language: 'text',
              title: 'Project Structure',
              code: `src/
├── domain/                  # Entities (innermost)
│   ├── entities/
│   │   ├── User.ts
│   │   └── Order.ts
│   └── value-objects/
│       ├── Email.ts
│       └── Money.ts
│
├── application/             # Use Cases
│   ├── use-cases/
│   │   ├── CreateUser.ts
│   │   └── PlaceOrder.ts
│   └── ports/               # Interfaces (driven/driving)
│       ├── IUserRepository.ts
│       └── IEmailService.ts
│
├── adapters/                # Interface Adapters
│   ├── controllers/
│   │   └── UserController.ts
│   ├── presenters/
│   │   └── UserPresenter.ts
│   └── repositories/
│       └── PostgresUserRepository.ts
│
└── infrastructure/          # Frameworks & Drivers
    ├── database/
    │   └── prisma.ts
    ├── http/
    │   └── express-app.ts
    └── config/
        └── env.ts`,
            },
            { type: 'heading', level: 3, text: 'Code Example', id: 'clean-code' },
            {
              type: 'code',
              language: 'typescript',
              title: 'domain/entities/User.ts',
              code: `// Entity — no dependencies on frameworks
export class User {
  constructor(
    public readonly id: string,
    public name: string,
    private _email: string,
  ) {}

  get email(): string { return this._email; }

  changeEmail(newEmail: string): void {
    if (!newEmail.includes('@')) throw new Error('Invalid email');
    this._email = newEmail;
  }
}`,
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'application/ports/IUserRepository.ts',
              code: `// Port — interface defined in the USE CASE layer
import { User } from '../../domain/entities/User';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}`,
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'application/use-cases/CreateUser.ts',
              code: `// Use Case — orchestrates entities + ports
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../ports/IUserRepository';

export class CreateUser {
  constructor(private userRepo: IUserRepository) {}

  async execute(name: string, email: string): Promise<User> {
    const user = new User(crypto.randomUUID(), name, email);
    await this.userRepo.save(user);
    return user;
  }
}`,
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'adapters/repositories/PostgresUserRepository.ts',
              code: `// Adapter — implements the port using a specific technology
import { IUserRepository } from '../../application/ports/IUserRepository';
import { User } from '../../domain/entities/User';
import { prisma } from '../../infrastructure/database/prisma';

export class PostgresUserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const row = await prisma.user.findUnique({ where: { id } });
    return row ? new User(row.id, row.name, row.email) : null;
  }

  async save(user: User): Promise<void> {
    await prisma.user.upsert({
      where: { id: user.id },
      create: { id: user.id, name: user.name, email: user.email },
      update: { name: user.name, email: user.email },
    });
  }
}`,
            },
            { type: 'heading', level: 3, text: 'Benefits & Trade-offs', id: 'clean-tradeoffs' },
            {
              type: 'comparison',
              left: {
                title: 'Benefits',
                color: '#10b981',
                items: [
                  'Business logic is framework-independent',
                  'Easy to swap databases, UI, or APIs',
                  'Highly testable — mock ports in use case tests',
                  'Enforces consistent code organization',
                ],
              },
              right: {
                title: 'Trade-offs',
                color: '#ef4444',
                items: [
                  'More boilerplate (interfaces, mappers)',
                  'Overkill for simple CRUD apps',
                  'Steeper learning curve for teams',
                  'Requires discipline to maintain boundaries',
                ],
              },
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Key takeaway:</strong> Clean Architecture protects your business logic from external concerns. The Dependency Rule ensures that changes to frameworks, databases, or UI never ripple into your core domain.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'What is Hexagonal Architecture?', id: 'what-is-hex' },
            {
              type: 'paragraph',
              html: '<strong>Hexagonal Architecture</strong>, proposed by Alistair Cockburn, structures an application around its core domain. External systems (databases, APIs, UIs) connect to the core through <em>Ports</em> (interfaces) and <em>Adapters</em> (implementations). The hexagonal shape is just a visual metaphor meaning "many sides" for different types of external actors.',
            },
            { type: 'heading', level: 3, text: 'Ports & Adapters Diagram', id: 'hex-diagram' },
            {
              type: 'diagram',
              caption: 'Hexagonal Architecture — the application core defines ports, adapters plug in from outside',
              svg: `<svg viewBox="0 0 500 360" xmlns="http://www.w3.org/2000/svg">
  <!-- Hexagon -->
  <polygon points="250,30 430,110 430,250 250,330 70,250 70,110" fill="#ede9fe" stroke="#8b5cf6" stroke-width="3"/>
  <text x="250" y="160" text-anchor="middle" font-size="16" fill="#6d28d9" font-weight="bold">Application Core</text>
  <text x="250" y="180" text-anchor="middle" font-size="11" fill="#7c3aed">(Domain + Use Cases)</text>
  <!-- Left ports (driving) -->
  <rect x="10" y="100" width="60" height="30" rx="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="40" y="120" text-anchor="middle" font-size="9" fill="#1e40af">REST API</text>
  <rect x="10" y="160" width="60" height="30" rx="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="40" y="180" text-anchor="middle" font-size="9" fill="#1e40af">CLI</text>
  <rect x="10" y="220" width="60" height="30" rx="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="40" y="240" text-anchor="middle" font-size="9" fill="#1e40af">gRPC</text>
  <text x="40" y="85" text-anchor="middle" font-size="10" fill="#3b82f6" font-weight="bold">Driving Adapters</text>
  <!-- Right ports (driven) -->
  <rect x="430" y="100" width="60" height="30" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="460" y="120" text-anchor="middle" font-size="9" fill="#92400e">Postgres</text>
  <rect x="430" y="160" width="60" height="30" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="460" y="180" text-anchor="middle" font-size="9" fill="#92400e">Redis</text>
  <rect x="430" y="220" width="60" height="30" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="460" y="240" text-anchor="middle" font-size="9" fill="#92400e">SMTP</text>
  <text x="460" y="85" text-anchor="middle" font-size="10" fill="#f59e0b" font-weight="bold">Driven Adapters</text>
  <!-- Port labels on hexagon edges -->
  <circle cx="70" cy="170" r="10" fill="#fff" stroke="#8b5cf6" stroke-width="2"/>
  <text x="70" y="174" text-anchor="middle" font-size="8" fill="#8b5cf6">P</text>
  <circle cx="430" cy="170" r="10" fill="#fff" stroke="#8b5cf6" stroke-width="2"/>
  <text x="430" y="174" text-anchor="middle" font-size="8" fill="#8b5cf6">P</text>
</svg>`,
            },
            { type: 'heading', level: 3, text: 'Driving vs Driven', id: 'hex-driving' },
            {
              type: 'table',
              headers: ['Driving (Primary)', 'Driven (Secondary)'],
              rows: [
                ['Initiates interaction with the app', 'Called by the app when it needs something'],
                ['Examples: HTTP controller, CLI, tests', 'Examples: database, email service, message queue'],
                ['Calls USE CASE methods', 'Implements PORT interfaces'],
                ['Left side of the hexagon', 'Right side of the hexagon'],
              ],
            },
            { type: 'heading', level: 3, text: 'Port Interface', id: 'hex-port' },
            {
              type: 'code',
              language: 'typescript',
              title: 'ports/NotificationPort.ts',
              code: `// Port — defined INSIDE the application core
// The core does not know how notifications are sent
export interface NotificationPort {
  send(to: string, subject: string, body: string): Promise<void>;
}`,
            },
            { type: 'heading', level: 3, text: 'Adapter Implementations', id: 'hex-adapters' },
            {
              type: 'code',
              language: 'typescript',
              title: 'adapters/EmailNotificationAdapter.ts',
              code: `// Driven adapter — implements the port using SMTP
import { NotificationPort } from '../ports/NotificationPort';
import nodemailer from 'nodemailer';

export class EmailNotificationAdapter implements NotificationPort {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  async send(to: string, subject: string, body: string): Promise<void> {
    await this.transporter.sendMail({
      from: 'noreply@app.com', to, subject, html: body,
    });
  }
}`,
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'adapters/SlackNotificationAdapter.ts',
              code: `// Alternative adapter — same port, different technology
import { NotificationPort } from '../ports/NotificationPort';

export class SlackNotificationAdapter implements NotificationPort {
  constructor(private webhookUrl: string) {}

  async send(to: string, subject: string, body: string): Promise<void> {
    await fetch(this.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: \`*\${subject}*\\n\${body}\\n(to: \${to})\` }),
    });
  }
}`,
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'composition-root.ts',
              code: `// Composition root — wire adapters at startup
import { CreateUser } from './use-cases/CreateUser';
import { PostgresUserRepository } from './adapters/PostgresUserRepository';
import { EmailNotificationAdapter } from './adapters/EmailNotificationAdapter';

const userRepo = new PostgresUserRepository();
const notifier = new EmailNotificationAdapter();
const createUser = new CreateUser(userRepo, notifier);

// In tests, swap with in-memory / mock adapters
// const userRepo = new InMemoryUserRepository();
// const notifier = new FakeNotificationAdapter();`,
            },
            { type: 'heading', level: 3, text: 'Benefits', id: 'hex-benefits' },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Technology independence:</strong> Swap Postgres for MongoDB by writing a new adapter',
                '<strong>Testability:</strong> Test use cases with in-memory adapters',
                '<strong>Flexibility:</strong> Add new entry points (REST, gRPC, CLI) without changing core logic',
                '<strong>Explicit boundaries:</strong> Ports document what the application needs from the outside world',
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Key takeaway:</strong> Hexagonal Architecture makes external dependencies pluggable via Ports (interfaces defined by the core) and Adapters (implementations that live outside the core). This is Clean Architecture\'s practical cousin.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'The Principle', id: 'srp-principle' },
            {
              type: 'paragraph',
              html: '<strong>Single Responsibility Principle:</strong> A module should have one, and only one, reason to change. In other words, a class should be responsible to exactly one actor or stakeholder.',
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'Uncle Bob clarifies: SRP is not about doing one thing. It is about having <em>one reason to change</em> — being responsible to one actor.',
            },
            { type: 'heading', level: 3, text: 'Analogy: Swiss Army Knife vs Specialized Tools', id: 'srp-analogy' },
            {
              type: 'comparison',
              left: {
                title: 'Swiss Army Knife (Violates SRP)',
                color: '#ef4444',
                items: [
                  'One object does cutting, screwing, opening bottles',
                  'Change the blade? Risk breaking the screwdriver',
                  'Hard to optimize any single function',
                  'If one part breaks, you might lose everything',
                ],
              },
              right: {
                title: 'Specialized Tools (Follows SRP)',
                color: '#10b981',
                items: [
                  'Each tool does one thing well',
                  'Replace the knife without affecting the screwdriver',
                  'Each can be optimized independently',
                  'Failure is isolated to one tool',
                ],
              },
            },
            { type: 'heading', level: 3, text: 'Before: Violating SRP', id: 'srp-before' },
            {
              type: 'code',
              language: 'typescript',
              title: 'UserService.ts (BAD)',
              code: `// This class has THREE reasons to change:
// 1. User business rules change
// 2. Email format changes
// 3. Database schema changes
class UserService {
  createUser(name: string, email: string) {
    // Validation (business rules)
    if (name.length < 2) throw new Error('Name too short');
    if (!email.includes('@')) throw new Error('Invalid email');

    // Persistence (database concern)
    const id = db.query(
      'INSERT INTO users (name, email) VALUES (?, ?) RETURNING id',
      [name, email]
    );

    // Notification (email concern)
    const html = \`<h1>Welcome \${name}!</h1><p>Your account is ready.</p>\`;
    smtp.send({ to: email, subject: 'Welcome!', html });

    return { id, name, email };
  }
}`,
            },
            { type: 'heading', level: 3, text: 'After: Following SRP', id: 'srp-after' },
            {
              type: 'code',
              language: 'typescript',
              title: 'Separated Responsibilities',
              code: `// Each class has ONE reason to change

class UserValidator {
  validate(name: string, email: string): void {
    if (name.length < 2) throw new Error('Name too short');
    if (!email.includes('@')) throw new Error('Invalid email');
  }
}

class UserRepository {
  save(name: string, email: string): string {
    return db.query(
      'INSERT INTO users (name, email) VALUES (?, ?) RETURNING id',
      [name, email]
    );
  }
}

class WelcomeEmailSender {
  send(name: string, email: string): void {
    const html = \`<h1>Welcome \${name}!</h1><p>Your account is ready.</p>\`;
    smtp.send({ to: email, subject: 'Welcome!', html });
  }
}

// Orchestrator — its one responsibility is coordination
class CreateUserUseCase {
  constructor(
    private validator: UserValidator,
    private repo: UserRepository,
    private emailSender: WelcomeEmailSender,
  ) {}

  execute(name: string, email: string) {
    this.validator.validate(name, email);
    const id = this.repo.save(name, email);
    this.emailSender.send(name, email);
    return { id, name, email };
  }
}`,
            },
            { type: 'heading', level: 3, text: 'How to Identify SRP Violations', id: 'srp-identify' },
            {
              type: 'list',
              ordered: true,
              items: [
                'Count the <strong>reasons to change</strong>. If more than one, split.',
                'Look at <strong>import statements</strong>. If a class imports DB drivers, HTTP clients, and email libs, it is doing too much.',
                'Check if <strong>different stakeholders</strong> would request changes to the same class.',
                'Apply the <strong>"describe in one sentence" test</strong>. If you use "and" or "or", you likely have multiple responsibilities.',
              ],
            },
            {
              type: 'callout',
              variant: 'caution',
              html: '<strong>Do not over-apply SRP.</strong> Breaking every function into its own class creates a different problem: fragmented code that is hard to follow. The goal is <em>cohesion</em>, not maximum decomposition.',
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Key takeaway:</strong> SRP is about aligning code modules with the people who request changes. When different stakeholders want different changes, those responsibilities belong in separate modules.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'The Principle', id: 'ocp-principle' },
            {
              type: 'paragraph',
              html: '<strong>Open/Closed Principle:</strong> Software entities (classes, modules, functions) should be <em>open for extension</em> (you can add new behavior) but <em>closed for modification</em> (you do not change existing code).',
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'Bertrand Meyer coined OCP in 1988. The modern interpretation (by Uncle Bob) relies on polymorphism and abstractions rather than inheritance.',
            },
            { type: 'heading', level: 3, text: 'Before: Violating OCP', id: 'ocp-before' },
            {
              type: 'code',
              language: 'typescript',
              title: 'DiscountCalculator.ts (BAD)',
              code: `// Every new discount type requires modifying this function
function calculateDiscount(type: string, amount: number): number {
  if (type === 'percentage') {
    return amount * 0.1;
  } else if (type === 'fixed') {
    return 10;
  } else if (type === 'bogo') {
    return amount * 0.5;
  }
  // Adding 'loyalty' discount? Must change this file!
  return 0;
}`,
            },
            { type: 'heading', level: 3, text: 'After: Following OCP with Strategy Pattern', id: 'ocp-after' },
            {
              type: 'code',
              language: 'typescript',
              title: 'DiscountStrategy.ts (GOOD)',
              code: `// Abstraction — open for extension
interface DiscountStrategy {
  calculate(amount: number): number;
}

// Concrete strategies — each is self-contained
class PercentageDiscount implements DiscountStrategy {
  constructor(private rate: number) {}
  calculate(amount: number) { return amount * this.rate; }
}

class FixedDiscount implements DiscountStrategy {
  constructor(private value: number) {}
  calculate(amount: number) { return Math.min(this.value, amount); }
}

class BuyOneGetOneFree implements DiscountStrategy {
  calculate(amount: number) { return amount * 0.5; }
}

// Adding a new discount? Just create a new class!
class LoyaltyDiscount implements DiscountStrategy {
  constructor(private years: number) {}
  calculate(amount: number) { return amount * Math.min(this.years * 0.02, 0.2); }
}

// Calculator is CLOSED for modification
class DiscountCalculator {
  calculate(strategy: DiscountStrategy, amount: number): number {
    return strategy.calculate(amount);
  }
}`,
            },
            { type: 'heading', level: 3, text: 'OCP Flow', id: 'ocp-flow' },
            {
              type: 'flow',
              steps: [
                { label: 'New Requirement', desc: 'Business wants a loyalty discount', color: '#6366f1' },
                { label: 'Create Class', desc: 'Write LoyaltyDiscount implements DiscountStrategy', color: '#10b981' },
                { label: 'Register', desc: 'Add to configuration or DI container', color: '#f59e0b' },
                { label: 'Done', desc: 'No existing code was modified!', color: '#8b5cf6' },
              ],
            },
            { type: 'heading', level: 3, text: 'Techniques for OCP', id: 'ocp-techniques' },
            {
              type: 'table',
              headers: ['Technique', 'When to Use'],
              rows: [
                ['Strategy Pattern', 'Multiple interchangeable algorithms'],
                ['Plugin Architecture', 'System needs to be extended by third parties'],
                ['Decorator Pattern', 'Add behavior to objects without subclassing'],
                ['Event/Observer Pattern', 'React to events without coupling to handlers'],
                ['Generics/Templates', 'Algorithms that work with multiple types'],
              ],
            },
            {
              type: 'callout',
              variant: 'caution',
              html: '<strong>Warning:</strong> Do not pre-emptively abstract everything. Apply OCP at points where you <em>know</em> change is likely. Premature abstraction adds complexity without benefit.',
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Key takeaway:</strong> OCP means you can add new behavior by writing new code, not by modifying existing code. The Strategy pattern, plugins, and decorators are your primary tools.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'The Principle', id: 'lsp-principle' },
            {
              type: 'paragraph',
              html: '<strong>Liskov Substitution Principle:</strong> If <code>S</code> is a subtype of <code>T</code>, then objects of type <code>T</code> may be replaced with objects of type <code>S</code> without altering any of the desirable properties of the program (correctness, task performed, etc.).',
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'Formulated by Barbara Liskov in 1987. In practical terms: a subclass must be usable anywhere its parent class is expected, without surprises.',
            },
            { type: 'heading', level: 3, text: 'The Rectangle/Square Problem', id: 'lsp-rect-square' },
            {
              type: 'paragraph',
              html: 'In geometry, a square <em>is-a</em> rectangle. But in code, making <code>Square extends Rectangle</code> violates LSP because a square\'s <code>setWidth</code> must also change height, breaking the expectation that width and height are independent.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'RectangleSquare.ts (BAD — violates LSP)',
              code: `class Rectangle {
  constructor(protected width: number, protected height: number) {}

  setWidth(w: number) { this.width = w; }
  setHeight(h: number) { this.height = h; }
  area(): number { return this.width * this.height; }
}

class Square extends Rectangle {
  setWidth(w: number) { this.width = w; this.height = w; }  // surprise!
  setHeight(h: number) { this.width = h; this.height = h; } // surprise!
}

// Client code expects Rectangle behavior:
function resize(rect: Rectangle) {
  rect.setWidth(5);
  rect.setHeight(10);
  console.assert(rect.area() === 50); // FAILS for Square (100)!
}`,
            },
            { type: 'heading', level: 3, text: 'The Correct Fix', id: 'lsp-fix' },
            {
              type: 'code',
              language: 'typescript',
              title: 'Shape.ts (GOOD — follows LSP)',
              code: `// Use a common abstraction that does not promise independent width/height
interface Shape {
  area(): number;
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}
  area(): number { return this.width * this.height; }

  withWidth(w: number): Rectangle { return new Rectangle(w, this.height); }
  withHeight(h: number): Rectangle { return new Rectangle(this.width, h); }
}

class Square implements Shape {
  constructor(private side: number) {}
  area(): number { return this.side * this.side; }

  withSide(s: number): Square { return new Square(s); }
}

// Both are Shapes, but neither pretends to be the other
function printArea(shape: Shape) {
  console.log(\`Area: \${shape.area()}\`); // Always correct!
}`,
            },
            { type: 'heading', level: 3, text: 'LSP Violations Checklist', id: 'lsp-checklist' },
            {
              type: 'list',
              ordered: false,
              items: [
                'Subclass <strong>throws unexpected exceptions</strong> not thrown by parent',
                'Subclass <strong>ignores or overrides</strong> parent methods to do nothing',
                'Subclass <strong>strengthens preconditions</strong> (rejects valid inputs)',
                'Subclass <strong>weakens postconditions</strong> (returns weaker guarantees)',
                'Client code uses <code>instanceof</code> checks to handle subtypes differently',
              ],
            },
            { type: 'heading', level: 3, text: 'Real-World Example', id: 'lsp-real-world' },
            {
              type: 'code',
              language: 'typescript',
              title: 'ReadOnlyCollection.ts',
              code: `// BAD: ReadOnlyList extends List but throws on mutation
class List<T> {
  protected items: T[] = [];
  add(item: T) { this.items.push(item); }
  get(index: number) { return this.items[index]; }
}

class ReadOnlyList<T> extends List<T> {
  add(_item: T) { throw new Error('Cannot add to read-only list'); } // LSP violation!
}

// GOOD: Separate interfaces
interface Readable<T> { get(index: number): T | undefined; }
interface Writable<T> { add(item: T): void; }

class MutableList<T> implements Readable<T>, Writable<T> {
  private items: T[] = [];
  add(item: T) { this.items.push(item); }
  get(index: number) { return this.items[index]; }
}

class ImmutableList<T> implements Readable<T> {
  constructor(private items: T[]) {}
  get(index: number) { return this.items[index]; }
  // No add method — no surprise!
}`,
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Key takeaway:</strong> If your subclass has to neuter or fundamentally change a parent method, the inheritance relationship is wrong. Prefer composition or separate interfaces.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'The Principle', id: 'isp-principle' },
            {
              type: 'paragraph',
              html: '<strong>Interface Segregation Principle:</strong> Clients should not be forced to depend on interfaces they do not use. Instead of one large interface, create multiple small, role-specific interfaces.',
            },
            { type: 'heading', level: 3, text: 'Analogy: Restaurant Menu vs Buffet', id: 'isp-analogy' },
            {
              type: 'comparison',
              left: {
                title: 'Fat Interface (Buffet)',
                color: '#ef4444',
                items: [
                  'Every customer gets access to everything',
                  'Pay for items you never eat',
                  'Changes to sushi station affect dessert area',
                  'Overwhelming and wasteful',
                ],
              },
              right: {
                title: 'Segregated Interfaces (Menu)',
                color: '#10b981',
                items: [
                  'Choose exactly what you need',
                  'Only pay for what you order',
                  'Changes to appetizers do not affect entrees',
                  'Focused and efficient',
                ],
              },
            },
            { type: 'heading', level: 3, text: 'Before: Fat Interface', id: 'isp-before' },
            {
              type: 'code',
              language: 'typescript',
              title: 'IWorker.ts (BAD)',
              code: `// Fat interface — every implementation must handle everything
interface IWorker {
  work(): void;
  eat(): void;
  sleep(): void;
  attendMeeting(): void;
  writeReport(): void;
}

// Robot worker must implement eat() and sleep()??
class RobotWorker implements IWorker {
  work() { /* ... */ }
  eat() { throw new Error('Robots do not eat'); }  // Forced!
  sleep() { throw new Error('Robots do not sleep'); }  // Forced!
  attendMeeting() { /* ... */ }
  writeReport() { /* ... */ }
}`,
            },
            { type: 'heading', level: 3, text: 'After: Segregated Interfaces', id: 'isp-after' },
            {
              type: 'code',
              language: 'typescript',
              title: 'SegregatedWorker.ts (GOOD)',
              code: `// Small, role-specific interfaces
interface Workable {
  work(): void;
}

interface Feedable {
  eat(): void;
  sleep(): void;
}

interface Reportable {
  writeReport(): void;
  attendMeeting(): void;
}

// Human implements all relevant interfaces
class HumanWorker implements Workable, Feedable, Reportable {
  work() { console.log('Working...'); }
  eat() { console.log('Eating lunch...'); }
  sleep() { console.log('Sleeping...'); }
  writeReport() { console.log('Writing report...'); }
  attendMeeting() { console.log('In meeting...'); }
}

// Robot only implements what it can do — no dummy methods!
class RobotWorker implements Workable {
  work() { console.log('Processing tasks...'); }
}

// Managers only need the Reportable interface
function scheduleReview(employee: Reportable) {
  employee.attendMeeting();
  employee.writeReport();
}`,
            },
            { type: 'heading', level: 3, text: 'Signs of ISP Violation', id: 'isp-signs' },
            {
              type: 'list',
              ordered: false,
              items: [
                'Implementations throw <code>NotImplementedError</code> for some methods',
                'Methods return <code>null</code> or do nothing in certain subclasses',
                'Clients import an interface but only use 1-2 of its 10 methods',
                'Changing one interface method forces recompilation of unrelated modules',
                'You see many <code>// not applicable</code> comments in implementations',
              ],
            },
            { type: 'heading', level: 3, text: 'ISP in Practice', id: 'isp-practice' },
            {
              type: 'code',
              language: 'typescript',
              title: 'Repository Interfaces',
              code: `// Instead of one massive IRepository<T> with 20 methods:
interface Readable<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
}

interface Writable<T> {
  save(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
}

interface Searchable<T> {
  search(query: string): Promise<T[]>;
}

// Read-only cache only needs Readable
class CachedUserStore implements Readable<User> {
  async findById(id: string) { return this.cache.get(id) ?? null; }
  async findAll() { return Array.from(this.cache.values()); }
}

// Full repository implements what it needs
class UserRepository implements Readable<User>, Writable<User>, Searchable<User> {
  async findById(id: string) { /* ... */ }
  async findAll() { /* ... */ }
  async save(user: User) { /* ... */ }
  async delete(id: string) { /* ... */ }
  async search(query: string) { /* ... */ }
}`,
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Key takeaway:</strong> Prefer many small interfaces over one large one. Clients should depend only on the methods they actually use. This reduces coupling and makes the system easier to change.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'The Principle', id: 'dip-principle' },
            {
              type: 'paragraph',
              html: '<strong>Dependency Inversion Principle:</strong> (A) High-level modules should not depend on low-level modules. Both should depend on abstractions. (B) Abstractions should not depend on details. Details should depend on abstractions.',
            },
            { type: 'heading', level: 3, text: 'Dependency Flow', id: 'dip-flow' },
            {
              type: 'flow',
              steps: [
                { label: 'High-Level Module', desc: 'Business logic (e.g., OrderService)', color: '#8b5cf6' },
                { label: 'Abstraction', desc: 'Interface (e.g., IPaymentGateway)', color: '#f59e0b' },
                { label: 'Low-Level Module', desc: 'Implementation (e.g., StripeGateway)', color: '#10b981' },
              ],
            },
            {
              type: 'paragraph',
              html: 'Both high-level and low-level modules depend on the abstraction. The high-level module <em>defines</em> the interface, and the low-level module <em>implements</em> it. This inverts the traditional dependency direction.',
            },
            { type: 'heading', level: 3, text: 'Without DIP', id: 'dip-without' },
            {
              type: 'code',
              language: 'typescript',
              title: 'OrderService.ts (BAD — tightly coupled)',
              code: `import { StripeClient } from 'stripe'; // Direct dependency on low-level detail!

class OrderService {
  private stripe = new StripeClient('sk_live_...');

  async placeOrder(order: Order) {
    // High-level module depends directly on Stripe
    await this.stripe.charges.create({
      amount: order.total,
      currency: 'usd',
      source: order.paymentToken,
    });
    // Cannot test without Stripe, cannot switch to PayPal
  }
}`,
            },
            { type: 'heading', level: 3, text: 'With DIP', id: 'dip-with' },
            {
              type: 'code',
              language: 'typescript',
              title: 'PaymentGateway.ts (GOOD — depends on abstraction)',
              code: `// Abstraction — defined by the HIGH-LEVEL module
interface PaymentGateway {
  charge(amount: number, currency: string, token: string): Promise<string>;
}

// High-level module depends on abstraction
class OrderService {
  constructor(private gateway: PaymentGateway) {}

  async placeOrder(order: Order): Promise<string> {
    const receiptId = await this.gateway.charge(
      order.total, 'usd', order.paymentToken
    );
    return receiptId;
  }
}

// Low-level module implements abstraction
class StripeGateway implements PaymentGateway {
  async charge(amount: number, currency: string, token: string) {
    const result = await stripe.charges.create({
      amount, currency, source: token,
    });
    return result.id;
  }
}

class PayPalGateway implements PaymentGateway {
  async charge(amount: number, currency: string, token: string) {
    const result = await paypal.payments.create({
      amount: { total: amount / 100, currency },
      payer: { payment_method: token },
    });
    return result.id;
  }
}`,
            },
            { type: 'heading', level: 3, text: 'Dependency Injection in Practice', id: 'dip-injection' },
            {
              type: 'code',
              language: 'typescript',
              title: 'Composition Root',
              code: `// Wire dependencies at the application entry point
function createApp() {
  // Choose implementation based on config
  const gateway: PaymentGateway =
    process.env.PAYMENT_PROVIDER === 'paypal'
      ? new PayPalGateway()
      : new StripeGateway();

  const orderService = new OrderService(gateway);
  return { orderService };
}

// In tests — inject a mock
class MockGateway implements PaymentGateway {
  public lastCharge?: { amount: number; currency: string; token: string };

  async charge(amount: number, currency: string, token: string) {
    this.lastCharge = { amount, currency, token };
    return 'mock-receipt-id';
  }
}

const mock = new MockGateway();
const service = new OrderService(mock);
await service.placeOrder(testOrder);
expect(mock.lastCharge?.amount).toBe(5000);`,
            },
            { type: 'heading', level: 3, text: 'DIP vs Dependency Injection', id: 'dip-vs-di' },
            {
              type: 'table',
              headers: ['Dependency Inversion (Principle)', 'Dependency Injection (Technique)'],
              rows: [
                ['A design guideline about which way dependencies point', 'A mechanism for providing dependencies from outside'],
                ['Says: depend on abstractions, not concretions', 'Says: pass dependencies through constructors/setters'],
                ['Can be achieved without DI (e.g., service locator)', 'DI is the most common way to achieve DIP'],
                ['About architecture direction', 'About wiring at runtime'],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Key takeaway:</strong> DIP inverts the direction of dependencies so that high-level policy does not depend on low-level details. Define interfaces in the high-level module and let low-level modules implement them. Dependency injection is the most common technique to achieve this.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'What is Domain-Driven Design?', id: 'what-is-ddd' },
            {
              type: 'paragraph',
              html: '<strong>Domain-Driven Design (DDD)</strong> is an approach to software development that centers the design on the core business domain. It uses a shared <em>Ubiquitous Language</em> between developers and domain experts, and structures code to reflect the domain model.',
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'DDD was introduced by Eric Evans in his 2003 book. It is most valuable for complex domains where the business logic — not the technology — is the primary challenge.',
            },
            { type: 'heading', level: 3, text: 'Key Building Blocks', id: 'ddd-blocks' },
            {
              type: 'table',
              headers: ['Concept', 'Definition', 'Example'],
              rows: [
                ['Entity', 'Has a unique identity that persists over time', 'User (identified by userId)'],
                ['Value Object', 'Defined by its attributes, no identity, immutable', 'Money(100, "USD"), Email("a@b.com")'],
                ['Aggregate', 'Cluster of entities treated as a single unit', 'Order (with OrderLines, ShippingAddress)'],
                ['Aggregate Root', 'Entry point to the aggregate, ensures consistency', 'Order is the root; OrderLine is accessed through Order'],
                ['Repository', 'Abstracts persistence of aggregates', 'OrderRepository.save(order)'],
                ['Domain Service', 'Logic that does not belong to a single entity', 'PricingService.calculateDiscount()'],
                ['Domain Event', 'Something meaningful that happened in the domain', 'OrderPlaced, PaymentReceived'],
                ['Bounded Context', 'Explicit boundary where a model applies', 'Sales context vs Shipping context'],
              ],
            },
            { type: 'heading', level: 3, text: 'Bounded Contexts', id: 'ddd-bounded-contexts' },
            {
              type: 'diagram',
              caption: 'Bounded Contexts communicate through well-defined interfaces (Anti-Corruption Layers, Events)',
              svg: `<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">
  <!-- Sales Context -->
  <rect x="20" y="40" width="190" height="200" rx="12" fill="#ede9fe" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="115" y="65" text-anchor="middle" font-size="13" fill="#6d28d9" font-weight="bold">Sales Context</text>
  <rect x="40" y="80" width="80" height="30" rx="4" fill="#c4b5fd" stroke="#8b5cf6" stroke-width="1"/>
  <text x="80" y="100" text-anchor="middle" font-size="10" fill="#4c1d95">Customer</text>
  <rect x="40" y="120" width="80" height="30" rx="4" fill="#c4b5fd" stroke="#8b5cf6" stroke-width="1"/>
  <text x="80" y="140" text-anchor="middle" font-size="10" fill="#4c1d95">Order</text>
  <rect x="40" y="160" width="80" height="30" rx="4" fill="#c4b5fd" stroke="#8b5cf6" stroke-width="1"/>
  <text x="80" y="180" text-anchor="middle" font-size="10" fill="#4c1d95">Product</text>
  <!-- Shipping Context -->
  <rect x="290" y="40" width="190" height="200" rx="12" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="385" y="65" text-anchor="middle" font-size="13" fill="#1e40af" font-weight="bold">Shipping Context</text>
  <rect x="310" y="80" width="80" height="30" rx="4" fill="#93c5fd" stroke="#3b82f6" stroke-width="1"/>
  <text x="350" y="100" text-anchor="middle" font-size="10" fill="#1e3a8a">Shipment</text>
  <rect x="310" y="120" width="80" height="30" rx="4" fill="#93c5fd" stroke="#3b82f6" stroke-width="1"/>
  <text x="350" y="140" text-anchor="middle" font-size="10" fill="#1e3a8a">Address</text>
  <rect x="310" y="160" width="80" height="30" rx="4" fill="#93c5fd" stroke="#3b82f6" stroke-width="1"/>
  <text x="350" y="180" text-anchor="middle" font-size="10" fill="#1e3a8a">Carrier</text>
  <!-- Arrow between contexts -->
  <defs><marker id="ar2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6Z" fill="#64748b"/></marker></defs>
  <line x1="215" y1="140" x2="285" y2="140" stroke="#64748b" stroke-width="2" marker-end="url(#ar2)"/>
  <text x="250" y="132" text-anchor="middle" font-size="9" fill="#64748b">Domain Events</text>
  <text x="250" y="155" text-anchor="middle" font-size="8" fill="#94a3b8">OrderPlaced →</text>
</svg>`,
            },
            { type: 'heading', level: 3, text: 'Entity vs Value Object', id: 'ddd-entity-vs-vo' },
            {
              type: 'comparison',
              left: {
                title: 'Entity',
                color: '#8b5cf6',
                items: [
                  'Has a unique identity (ID)',
                  'Mutable — state changes over time',
                  'Equality based on ID',
                  'Example: User, Order, Account',
                  'Tracked in repository by ID',
                ],
              },
              right: {
                title: 'Value Object',
                color: '#10b981',
                items: [
                  'No identity — defined by attributes',
                  'Immutable — create new instead of modify',
                  'Equality based on all attributes',
                  'Example: Money, Email, DateRange',
                  'Embedded inside entities',
                ],
              },
            },
            { type: 'heading', level: 3, text: 'Entity Code Example', id: 'ddd-entity-code' },
            {
              type: 'code',
              language: 'typescript',
              title: 'domain/entities/Order.ts',
              code: `// Entity — identified by orderId, state changes over time
class Order {
  private lines: OrderLine[] = [];
  private status: OrderStatus = 'draft';

  constructor(
    public readonly orderId: string,
    private customerId: string,
  ) {}

  addLine(productId: string, quantity: number, unitPrice: Money): void {
    if (this.status !== 'draft') {
      throw new Error('Cannot modify a placed order');
    }
    this.lines.push(new OrderLine(productId, quantity, unitPrice));
  }

  get total(): Money {
    return this.lines.reduce(
      (sum, line) => sum.add(line.subtotal),
      Money.zero('USD')
    );
  }

  place(): void {
    if (this.lines.length === 0) throw new Error('Cannot place empty order');
    this.status = 'placed';
    // Raise domain event: OrderPlaced
  }

  // Equality by identity
  equals(other: Order): boolean {
    return this.orderId === other.orderId;
  }
}`,
            },
            { type: 'heading', level: 3, text: 'Value Object Code Example', id: 'ddd-vo-code' },
            {
              type: 'code',
              language: 'typescript',
              title: 'domain/value-objects/Money.ts',
              code: `// Value Object — immutable, equality by attributes
class Money {
  constructor(
    public readonly amount: number,
    public readonly currency: string,
  ) {
    if (amount < 0) throw new Error('Amount cannot be negative');
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Cannot add different currencies');
    }
    return new Money(this.amount + other.amount, this.currency);
  }

  multiply(factor: number): Money {
    return new Money(Math.round(this.amount * factor), this.currency);
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  static zero(currency: string): Money {
    return new Money(0, currency);
  }

  toString(): string {
    return \`\${this.currency} \${(this.amount / 100).toFixed(2)}\`;
  }
}`,
            },
            { type: 'heading', level: 3, text: 'Aggregate Rules', id: 'ddd-aggregate-rules' },
            {
              type: 'list',
              ordered: true,
              items: [
                'Only the <strong>Aggregate Root</strong> can be referenced from outside the aggregate',
                'All changes to the aggregate go <strong>through the root</strong>',
                'Aggregates are the <strong>unit of persistence</strong> — save/load the entire aggregate',
                'Keep aggregates <strong>small</strong> — only group things that must be consistent together',
                'Reference other aggregates by <strong>ID</strong>, not by direct object reference',
              ],
            },
            {
              type: 'callout',
              variant: 'caution',
              html: '<strong>Common mistake:</strong> Making aggregates too large. If Order contained the full Customer entity, changing a customer name would lock the order. Reference Customer by <code>customerId</code> instead.',
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Key takeaway:</strong> DDD aligns your code with the business domain using a shared language. Entities have identity; Value Objects are defined by their data. Aggregates enforce consistency boundaries. Bounded Contexts keep different models from conflicting.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'What is CQRS?', id: 'what-is-cqrs' },
            {
              type: 'paragraph',
              html: '<strong>CQRS</strong> separates the responsibility for reading data (Queries) from the responsibility for changing data (Commands). Instead of a single model for both, you maintain separate optimized models for reads and writes.',
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'CQRS was formalized by Greg Young, building on Bertrand Meyer\'s Command-Query Separation (CQS) principle. CQS applies at the method level; CQRS applies at the architectural level.',
            },
            { type: 'heading', level: 3, text: 'CQRS Data Flow', id: 'cqrs-flow' },
            {
              type: 'flow',
              steps: [
                { label: 'Command', desc: 'User action: CreateOrder, UpdateProfile', color: '#ef4444' },
                { label: 'Command Handler', desc: 'Validates, executes business logic', color: '#f59e0b' },
                { label: 'Write Model', desc: 'Domain entities, normalized DB', color: '#8b5cf6' },
                { label: 'Domain Event', desc: 'OrderCreated published to event bus', color: '#10b981' },
                { label: 'Read Model', desc: 'Denormalized projection, optimized for queries', color: '#3b82f6' },
                { label: 'Query', desc: 'Fast read from optimized view', color: '#6366f1' },
              ],
            },
            { type: 'heading', level: 3, text: 'CRUD vs CQRS', id: 'cqrs-comparison' },
            {
              type: 'comparison',
              left: {
                title: 'Traditional CRUD',
                color: '#6366f1',
                items: [
                  'Single model for reads and writes',
                  'Same database schema serves both',
                  'Simple to implement and understand',
                  'Limited scalability — reads and writes compete',
                  'Ideal for simple domains',
                ],
              },
              right: {
                title: 'CQRS',
                color: '#8b5cf6',
                items: [
                  'Separate models for reads and writes',
                  'Different storage optimized for each',
                  'More complex but highly scalable',
                  'Reads and writes scale independently',
                  'Ideal for complex domains with different read/write patterns',
                ],
              },
            },
            { type: 'heading', level: 3, text: 'Command Handler', id: 'cqrs-command' },
            {
              type: 'code',
              language: 'typescript',
              title: 'commands/PlaceOrderCommand.ts',
              code: `// Command — describes intent to change state
interface PlaceOrderCommand {
  type: 'PlaceOrder';
  customerId: string;
  items: Array<{ productId: string; quantity: number }>;
}

// Command Handler — validates and executes
class PlaceOrderHandler {
  constructor(
    private orderRepo: OrderRepository,
    private eventBus: EventBus,
  ) {}

  async handle(cmd: PlaceOrderCommand): Promise<string> {
    // Business validation
    if (cmd.items.length === 0) {
      throw new Error('Order must have at least one item');
    }

    // Create aggregate
    const order = Order.create(cmd.customerId, cmd.items);

    // Persist write model
    await this.orderRepo.save(order);

    // Publish domain event for read model projection
    await this.eventBus.publish({
      type: 'OrderPlaced',
      orderId: order.id,
      customerId: cmd.customerId,
      items: cmd.items,
      total: order.total,
      placedAt: new Date(),
    });

    return order.id;
  }
}`,
            },
            { type: 'heading', level: 3, text: 'Query Handler', id: 'cqrs-query' },
            {
              type: 'code',
              language: 'typescript',
              title: 'queries/GetOrderSummaryQuery.ts',
              code: `// Query — request for data, never modifies state
interface GetOrderSummaryQuery {
  type: 'GetOrderSummary';
  orderId: string;
}

// Read model — denormalized, optimized for display
interface OrderSummaryView {
  orderId: string;
  customerName: string;
  itemCount: number;
  total: number;
  status: string;
  placedAt: Date;
}

// Query Handler — reads from optimized projection
class GetOrderSummaryHandler {
  constructor(private readDb: ReadDatabase) {}

  async handle(query: GetOrderSummaryQuery): Promise<OrderSummaryView | null> {
    // Simple, fast read — no business logic
    return this.readDb.findOne<OrderSummaryView>(
      'order_summaries',
      { orderId: query.orderId }
    );
  }
}`,
            },
            { type: 'heading', level: 3, text: 'Event Projection', id: 'cqrs-projection' },
            {
              type: 'code',
              language: 'typescript',
              title: 'projections/OrderSummaryProjection.ts',
              code: `// Projection — builds read model from domain events
class OrderSummaryProjection {
  constructor(private readDb: ReadDatabase) {}

  async handle(event: DomainEvent) {
    switch (event.type) {
      case 'OrderPlaced':
        await this.readDb.upsert('order_summaries', {
          orderId: event.orderId,
          customerName: event.customerName,
          itemCount: event.items.length,
          total: event.total,
          status: 'placed',
          placedAt: event.placedAt,
        });
        break;

      case 'OrderShipped':
        await this.readDb.update('order_summaries',
          { orderId: event.orderId },
          { status: 'shipped', shippedAt: event.shippedAt }
        );
        break;
    }
  }
}`,
            },
            { type: 'heading', level: 3, text: 'When to Use CQRS', id: 'cqrs-when' },
            {
              type: 'table',
              headers: ['Use CQRS When', 'Avoid CQRS When'],
              rows: [
                ['Read and write patterns differ significantly', 'Simple CRUD with matching read/write shapes'],
                ['Read-heavy systems (100:1 read/write ratio)', 'Equal read and write load'],
                ['Complex domain with rich business rules', 'Straightforward data entry forms'],
                ['You need independent read/write scaling', 'Single database is sufficient'],
                ['Multiple views of the same data', 'One-to-one correspondence between form and storage'],
              ],
            },
            {
              type: 'callout',
              variant: 'caution',
              html: '<strong>Eventual consistency:</strong> With separate read and write stores, the read model may lag behind. Users might submit a command and not see the result immediately. Design your UI to handle this (optimistic updates, loading indicators).',
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Key takeaway:</strong> CQRS splits your application into command (write) and query (read) sides, each optimized independently. It adds complexity but pays off in systems where read and write patterns are fundamentally different.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'What is Event Sourcing?', id: 'what-is-es' },
            {
              type: 'paragraph',
              html: '<strong>Event Sourcing</strong> persists the state of an entity as a sequence of immutable, append-only domain events rather than storing just the current state. To get the current state, you replay all events from the beginning.',
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'Think of it like a bank account: the balance is derived from the sequence of deposits and withdrawals (events), not stored as a standalone number.',
            },
            { type: 'heading', level: 3, text: 'Event Sourcing Flow', id: 'es-flow' },
            {
              type: 'flow',
              steps: [
                { label: 'Command', desc: 'Intent to change state (e.g., WithdrawMoney)', color: '#ef4444' },
                { label: 'Aggregate', desc: 'Validates command, produces event', color: '#f59e0b' },
                { label: 'Event Store', desc: 'Appends event to immutable log', color: '#8b5cf6' },
                { label: 'Projection', desc: 'Consumes events, builds read views', color: '#10b981' },
                { label: 'Read View', desc: 'Optimized query model for the UI', color: '#3b82f6' },
              ],
            },
            { type: 'heading', level: 3, text: 'Event-Sourced Aggregate', id: 'es-aggregate' },
            {
              type: 'code',
              language: 'typescript',
              title: 'domain/BankAccount.ts',
              code: `// Domain events — immutable facts
type AccountEvent =
  | { type: 'AccountOpened'; accountId: string; owner: string; openedAt: Date }
  | { type: 'MoneyDeposited'; amount: number; depositedAt: Date }
  | { type: 'MoneyWithdrawn'; amount: number; withdrawnAt: Date }
  | { type: 'AccountClosed'; closedAt: Date };

class BankAccount {
  private balance = 0;
  private closed = false;
  private uncommitted: AccountEvent[] = [];

  // Apply event to update state (used during replay AND when producing events)
  private apply(event: AccountEvent) {
    switch (event.type) {
      case 'AccountOpened':
        this.balance = 0;
        this.closed = false;
        break;
      case 'MoneyDeposited':
        this.balance += event.amount;
        break;
      case 'MoneyWithdrawn':
        this.balance -= event.amount;
        break;
      case 'AccountClosed':
        this.closed = true;
        break;
    }
  }

  // Raise an event: validate, apply, and record
  private raise(event: AccountEvent) {
    this.apply(event);
    this.uncommitted.push(event);
  }

  // Command methods
  static open(accountId: string, owner: string): BankAccount {
    const account = new BankAccount();
    account.raise({
      type: 'AccountOpened', accountId, owner, openedAt: new Date(),
    });
    return account;
  }

  deposit(amount: number) {
    if (this.closed) throw new Error('Account is closed');
    if (amount <= 0) throw new Error('Amount must be positive');
    this.raise({ type: 'MoneyDeposited', amount, depositedAt: new Date() });
  }

  withdraw(amount: number) {
    if (this.closed) throw new Error('Account is closed');
    if (amount > this.balance) throw new Error('Insufficient funds');
    this.raise({ type: 'MoneyWithdrawn', amount, withdrawnAt: new Date() });
  }

  close() {
    if (this.balance !== 0) throw new Error('Balance must be zero to close');
    this.raise({ type: 'AccountClosed', closedAt: new Date() });
  }

  // Rehydrate from event history
  static fromHistory(events: AccountEvent[]): BankAccount {
    const account = new BankAccount();
    events.forEach(e => account.apply(e));
    return account;
  }

  getUncommittedEvents(): AccountEvent[] { return [...this.uncommitted]; }
  getBalance(): number { return this.balance; }
}`,
            },
            { type: 'heading', level: 3, text: 'Event Store', id: 'es-store' },
            {
              type: 'code',
              language: 'typescript',
              title: 'infrastructure/EventStore.ts',
              code: `// Simplified event store — append-only log
interface StoredEvent {
  streamId: string;
  version: number;
  type: string;
  data: unknown;
  timestamp: Date;
}

class EventStore {
  private streams = new Map<string, StoredEvent[]>();

  append(streamId: string, events: AccountEvent[], expectedVersion: number): void {
    const stream = this.streams.get(streamId) ?? [];

    // Optimistic concurrency check
    if (stream.length !== expectedVersion) {
      throw new Error(\`Concurrency conflict: expected v\${expectedVersion}, got v\${stream.length}\`);
    }

    const stored = events.map((e, i) => ({
      streamId,
      version: expectedVersion + i + 1,
      type: e.type,
      data: e,
      timestamp: new Date(),
    }));

    this.streams.set(streamId, [...stream, ...stored]);
  }

  getStream(streamId: string): StoredEvent[] {
    return this.streams.get(streamId) ?? [];
  }
}`,
            },
            { type: 'heading', level: 3, text: 'Projection Example', id: 'es-projection' },
            {
              type: 'code',
              language: 'typescript',
              title: 'projections/AccountBalanceProjection.ts',
              code: `// Projection builds a denormalized read model from events
class AccountBalanceProjection {
  private balances = new Map<string, { owner: string; balance: number; status: string }>();

  handle(event: StoredEvent) {
    const data = event.data as AccountEvent;
    switch (data.type) {
      case 'AccountOpened':
        this.balances.set(event.streamId, {
          owner: data.owner, balance: 0, status: 'open',
        });
        break;
      case 'MoneyDeposited': {
        const acc = this.balances.get(event.streamId)!;
        acc.balance += data.amount;
        break;
      }
      case 'MoneyWithdrawn': {
        const acc = this.balances.get(event.streamId)!;
        acc.balance -= data.amount;
        break;
      }
      case 'AccountClosed': {
        const acc = this.balances.get(event.streamId)!;
        acc.status = 'closed';
        break;
      }
    }
  }

  getBalance(accountId: string) {
    return this.balances.get(accountId) ?? null;
  }
}`,
            },
            { type: 'heading', level: 3, text: 'Pros vs Cons', id: 'es-pros-cons' },
            {
              type: 'table',
              headers: ['Pros', 'Cons'],
              rows: [
                ['Complete audit trail — every change is recorded', 'Increased complexity in design and ops'],
                ['Temporal queries — state at any point in time', 'Eventual consistency between event store and projections'],
                ['Debug by replaying events', 'Event schema evolution is challenging'],
                ['Build new read models by replaying history', 'Storage grows indefinitely (snapshotting helps)'],
                ['Natural fit with CQRS and DDD', 'Steep learning curve for teams'],
                ['Enables event-driven microservices', 'Harder to do ad-hoc queries on event store'],
              ],
            },
            { type: 'heading', level: 3, text: 'Snapshots', id: 'es-snapshots' },
            {
              type: 'paragraph',
              html: 'For aggregates with many events, replaying from the beginning is slow. <strong>Snapshots</strong> periodically save the current state so you only need to replay events <em>after</em> the snapshot.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'Snapshot Strategy',
              code: `// Save snapshot every N events
async function loadAggregate(accountId: string): Promise<BankAccount> {
  const snapshot = await snapshotStore.getLatest(accountId);
  const fromVersion = snapshot?.version ?? 0;

  const events = await eventStore.getStream(accountId, fromVersion);

  const account = snapshot
    ? BankAccount.fromSnapshot(snapshot.data)
    : new BankAccount();

  events.forEach(e => account.apply(e.data));

  // Save new snapshot if we replayed many events
  if (events.length > 100) {
    await snapshotStore.save(accountId, account.toSnapshot(), account.version);
  }

  return account;
}`,
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Key takeaway:</strong> Event Sourcing stores what happened (events) rather than what is (current state). Combined with CQRS, it provides a powerful architecture for complex domains that need audit trails, temporal queries, and event-driven integration.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'Creational Patterns Overview', id: 'creational-overview' },
            {
              type: 'paragraph',
              html: 'Creational patterns abstract the instantiation process. They help make a system independent of how its objects are created, composed, and represented. The five GoF creational patterns are: <strong>Factory Method</strong>, <strong>Abstract Factory</strong>, <strong>Builder</strong>, <strong>Singleton</strong>, and <strong>Prototype</strong>.',
            },
            {
              type: 'table',
              headers: ['Pattern', 'Purpose', 'Real-World Analogy'],
              rows: [
                ['Factory Method', 'Delegate object creation to subclasses', 'A hiring manager posting jobs for different departments'],
                ['Abstract Factory', 'Create families of related objects', 'A furniture catalog (Modern set vs Victorian set)'],
                ['Builder', 'Construct complex objects step by step', 'Ordering a customized pizza with toppings'],
                ['Singleton', 'Ensure a class has only one instance', 'A country has one president at a time'],
                ['Prototype', 'Clone existing objects instead of creating new', 'Photocopying a document template'],
              ],
            },
            { type: 'divider' },

            // Factory Method
            { type: 'heading', level: 3, text: '1. Factory Method', id: 'factory-method' },
            {
              type: 'paragraph',
              html: 'Define an interface for creating objects, but let subclasses decide which class to instantiate. The Factory Method lets a class defer instantiation to subclasses.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'FactoryMethod.ts',
              code: `// Product interface
interface Notification {
  send(message: string): void;
}

// Concrete products
class EmailNotification implements Notification {
  send(message: string) { console.log(\`Email: \${message}\`); }
}

class SMSNotification implements Notification {
  send(message: string) { console.log(\`SMS: \${message}\`); }
}

class PushNotification implements Notification {
  send(message: string) { console.log(\`Push: \${message}\`); }
}

// Factory Method — subclasses decide which product to create
abstract class NotificationFactory {
  abstract createNotification(): Notification;

  // Template method uses the factory method
  notify(message: string) {
    const notification = this.createNotification();
    notification.send(message);
  }
}

class EmailNotificationFactory extends NotificationFactory {
  createNotification() { return new EmailNotification(); }
}

class SMSNotificationFactory extends NotificationFactory {
  createNotification() { return new SMSNotification(); }
}

// Usage
const factory: NotificationFactory = new SMSNotificationFactory();
factory.notify('Your order has shipped!');`,
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>When to use Factory Method:</strong> When a class cannot anticipate the type of objects it needs to create, or when subclasses should specify what gets created.',
            },
            { type: 'divider' },

            // Abstract Factory
            { type: 'heading', level: 3, text: '2. Abstract Factory', id: 'abstract-factory' },
            {
              type: 'paragraph',
              html: 'Provide an interface for creating <em>families</em> of related objects without specifying their concrete classes. Ensures that products from the same family are used together.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'AbstractFactory.ts',
              code: `// Product interfaces
interface Button { render(): string; }
interface Input { render(): string; }
interface Card { render(): string; }

// Abstract Factory
interface UIFactory {
  createButton(): Button;
  createInput(): Input;
  createCard(): Card;
}

// Dark theme family
class DarkButton implements Button { render() { return '<button class="dark">'; } }
class DarkInput implements Input { render() { return '<input class="dark">'; } }
class DarkCard implements Card { render() { return '<div class="card dark">'; } }

class DarkUIFactory implements UIFactory {
  createButton() { return new DarkButton(); }
  createInput() { return new DarkInput(); }
  createCard() { return new DarkCard(); }
}

// Light theme family
class LightButton implements Button { render() { return '<button class="light">'; } }
class LightInput implements Input { render() { return '<input class="light">'; } }
class LightCard implements Card { render() { return '<div class="card light">'; } }

class LightUIFactory implements UIFactory {
  createButton() { return new LightButton(); }
  createInput() { return new LightInput(); }
  createCard() { return new LightCard(); }
}

// Client — works with any factory, ensuring consistent theme
function renderForm(factory: UIFactory) {
  const card = factory.createCard();
  const input = factory.createInput();
  const button = factory.createButton();
  return \`\${card.render()}\${input.render()}\${button.render()}\`;
}`,
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>When to use Abstract Factory:</strong> When the system must use one of several families of products, and products within a family must be used together (e.g., UI themes, OS-specific widgets).',
            },
            { type: 'divider' },

            // Builder
            { type: 'heading', level: 3, text: '3. Builder', id: 'builder-pattern' },
            {
              type: 'paragraph',
              html: 'Separate the construction of a complex object from its representation. The same construction process can create different representations.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'Builder.ts',
              code: `// Complex object
interface HttpRequest {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: string;
  timeout: number;
  retries: number;
}

// Builder — step-by-step construction with fluent API
class HttpRequestBuilder {
  private request: Partial<HttpRequest> = {
    method: 'GET',
    headers: {},
    timeout: 30000,
    retries: 0,
  };

  url(url: string) { this.request.url = url; return this; }
  method(m: string) { this.request.method = m; return this; }
  header(key: string, value: string) {
    this.request.headers![key] = value;
    return this;
  }
  body(b: string) { this.request.body = b; return this; }
  timeout(ms: number) { this.request.timeout = ms; return this; }
  retries(n: number) { this.request.retries = n; return this; }

  build(): HttpRequest {
    if (!this.request.url) throw new Error('URL is required');
    return this.request as HttpRequest;
  }
}

// Usage — readable, no giant constructor
const req = new HttpRequestBuilder()
  .url('https://api.example.com/users')
  .method('POST')
  .header('Content-Type', 'application/json')
  .header('Authorization', 'Bearer token123')
  .body(JSON.stringify({ name: 'Alice' }))
  .timeout(5000)
  .retries(3)
  .build();`,
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>When to use Builder:</strong> When constructing an object requires many optional parameters, or when the same construction process should create different representations.',
            },
            { type: 'divider' },

            // Singleton
            { type: 'heading', level: 3, text: '4. Singleton', id: 'singleton-pattern' },
            {
              type: 'paragraph',
              html: 'Ensure a class has only one instance and provide a global point of access to it. Use sparingly — singletons are essentially global state.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'Singleton.ts',
              code: `// Classic Singleton
class Logger {
  private static instance: Logger;
  private logs: string[] = [];

  private constructor() {} // Private constructor prevents direct instantiation

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(message: string) {
    const entry = \`[\${new Date().toISOString()}] \${message}\`;
    this.logs.push(entry);
    console.log(entry);
  }

  getHistory(): string[] { return [...this.logs]; }
}

// Modern alternative — module-level singleton (preferred in TypeScript)
// logger.ts
class LoggerService {
  private logs: string[] = [];

  log(message: string) {
    this.logs.push(\`[\${new Date().toISOString()}] \${message}\`);
  }
}

export const logger = new LoggerService(); // Module creates single instance`,
            },
            {
              type: 'callout',
              variant: 'caution',
              html: '<strong>Warning:</strong> Singletons introduce global state, making testing and parallel execution difficult. Prefer dependency injection where possible. In TypeScript/ES modules, a module-level instance is often simpler and equally effective.',
            },
            { type: 'divider' },

            // Prototype
            { type: 'heading', level: 3, text: '5. Prototype', id: 'prototype-pattern' },
            {
              type: 'paragraph',
              html: 'Create new objects by cloning an existing instance (the prototype) rather than constructing from scratch. Useful when object creation is expensive.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'Prototype.ts',
              code: `// Prototype interface
interface Cloneable<T> {
  clone(): T;
}

// Complex object that is expensive to create
class GridConfiguration implements Cloneable<GridConfiguration> {
  columns: Array<{ id: string; width: number; visible: boolean }> = [];
  theme: 'light' | 'dark' = 'light';
  pageSize = 50;
  filters: Map<string, string> = new Map();
  sortOrder: Array<{ column: string; direction: 'asc' | 'desc' }> = [];

  clone(): GridConfiguration {
    const copy = new GridConfiguration();
    copy.columns = this.columns.map(c => ({ ...c }));
    copy.theme = this.theme;
    copy.pageSize = this.pageSize;
    copy.filters = new Map(this.filters);
    copy.sortOrder = this.sortOrder.map(s => ({ ...s }));
    return copy;
  }
}

// Registry of prototypes
class ConfigRegistry {
  private prototypes = new Map<string, GridConfiguration>();

  register(name: string, config: GridConfiguration) {
    this.prototypes.set(name, config);
  }

  create(name: string): GridConfiguration {
    const proto = this.prototypes.get(name);
    if (!proto) throw new Error(\`No prototype: \${name}\`);
    return proto.clone(); // Clone, don't share!
  }
}

// Usage
const registry = new ConfigRegistry();
const defaultConfig = new GridConfiguration();
defaultConfig.columns = [{ id: 'name', width: 200, visible: true }];
defaultConfig.theme = 'dark';
registry.register('default', defaultConfig);

const myConfig = registry.create('default'); // Clone of default
myConfig.pageSize = 100; // Does not affect the prototype`,
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>When to use Prototype:</strong> When creating objects is expensive (complex initialization, DB lookups), or when you need many similar objects that differ slightly from a template.',
            },
            { type: 'divider' },

            // Summary table
            { type: 'heading', level: 3, text: 'Summary', id: 'creational-summary' },
            {
              type: 'table',
              headers: ['Pattern', 'Creates', 'Key Benefit', 'Drawback'],
              rows: [
                ['Factory Method', 'Single product via subclass', 'Decouples client from concrete class', 'Requires subclass per product type'],
                ['Abstract Factory', 'Family of related products', 'Ensures consistent product families', 'Hard to add new product types'],
                ['Builder', 'Complex object step by step', 'Readable construction, optional params', 'More code for the builder class'],
                ['Singleton', 'Exactly one instance', 'Global access, lazy initialization', 'Global state, hard to test'],
                ['Prototype', 'Clone of existing object', 'Avoids expensive construction', 'Deep cloning can be tricky'],
              ],
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'Structural Patterns', id: 'structural-overview' },
            {
              type: 'paragraph',
              html: 'Structural patterns deal with <strong>object composition</strong> — how classes and objects are combined to form larger structures. They ensure that if one part changes, the entire structure does not need to change.',
            },
            { type: 'divider' },

            // Adapter
            { type: 'heading', level: 3, text: '1. Adapter', id: 'adapter-pattern' },
            {
              type: 'paragraph',
              html: 'Convert the interface of a class into another interface clients expect. Adapter lets classes work together that could not otherwise because of incompatible interfaces.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'Adapter.ts',
              code: `// Target interface your code expects
interface PaymentProcessor {
  charge(amount: number, currency: string): Promise<{ id: string; status: string }>;
}

// Third-party library with incompatible interface
class LegacyPaymentSDK {
  makePayment(cents: number, curr: string, callback: (err: Error | null, ref: string) => void) {
    setTimeout(() => callback(null, 'ref_' + Math.random()), 100);
  }
}

// Adapter — bridges the gap
class LegacyPaymentAdapter implements PaymentProcessor {
  constructor(private legacy: LegacyPaymentSDK) {}

  charge(amount: number, currency: string): Promise<{ id: string; status: string }> {
    return new Promise((resolve, reject) => {
      this.legacy.makePayment(amount, currency, (err, ref) => {
        if (err) return reject(err);
        resolve({ id: ref, status: 'success' });
      });
    });
  }
}

// Client code works with the clean interface
async function processPayment(processor: PaymentProcessor) {
  const result = await processor.charge(2500, 'USD');
  console.log(\`Payment \${result.id}: \${result.status}\`);
}`,
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>When to use Adapter:</strong> When you need to integrate a third-party library or legacy system whose interface does not match what your code expects.',
            },
            { type: 'divider' },

            // Facade
            { type: 'heading', level: 3, text: '2. Facade', id: 'facade-pattern' },
            {
              type: 'paragraph',
              html: 'Provide a simplified, unified interface to a complex subsystem. The Facade does not add new functionality; it just makes existing functionality easier to use.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'Facade.ts',
              code: `// Complex subsystem classes
class VideoDecoder { decode(file: string) { return \`decoded:\${file}\`; } }
class AudioDecoder { decode(file: string) { return \`audio:\${file}\`; } }
class SubtitleParser { parse(file: string) { return \`subs:\${file}\`; } }
class Renderer { render(video: string, audio: string, subs: string) {
  return \`Playing \${video} with \${audio} and \${subs}\`;
}}

// Facade — simple API for complex operations
class MediaPlayerFacade {
  private video = new VideoDecoder();
  private audio = new AudioDecoder();
  private subs = new SubtitleParser();
  private renderer = new Renderer();

  play(filePath: string): string {
    const v = this.video.decode(filePath);
    const a = this.audio.decode(filePath);
    const s = this.subs.parse(filePath.replace('.mp4', '.srt'));
    return this.renderer.render(v, a, s);
  }
}

// Client only needs one method
const player = new MediaPlayerFacade();
player.play('movie.mp4');`,
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>When to use Facade:</strong> When a subsystem has many classes and clients only need a simple interface. Common in library/SDK design.',
            },
            { type: 'divider' },

            // Decorator
            { type: 'heading', level: 3, text: '3. Decorator', id: 'decorator-pattern' },
            {
              type: 'paragraph',
              html: 'Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'Decorator.ts',
              code: `// Component interface
interface Logger {
  log(message: string): void;
}

// Base component
class ConsoleLogger implements Logger {
  log(message: string) { console.log(message); }
}

// Decorators — each adds one responsibility
class TimestampDecorator implements Logger {
  constructor(private wrapped: Logger) {}
  log(message: string) {
    this.wrapped.log(\`[\${new Date().toISOString()}] \${message}\`);
  }
}

class UpperCaseDecorator implements Logger {
  constructor(private wrapped: Logger) {}
  log(message: string) {
    this.wrapped.log(message.toUpperCase());
  }
}

class FilterDecorator implements Logger {
  constructor(private wrapped: Logger, private minLevel: string) {}
  log(message: string) {
    if (message.startsWith(\`[\${this.minLevel}]\`) || this.minLevel === 'ALL') {
      this.wrapped.log(message);
    }
  }
}

// Compose decorators like layers
const logger: Logger = new TimestampDecorator(
  new UpperCaseDecorator(
    new ConsoleLogger()
  )
);
logger.log('server started');
// Output: [2024-01-15T10:30:00.000Z] SERVER STARTED`,
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>When to use Decorator:</strong> When you need to add behavior to individual objects without affecting other objects of the same class. Classic example: middleware in Express, Java I/O streams.',
            },

            { type: 'divider' },
            { type: 'heading', level: 2, text: 'Behavioral Patterns', id: 'behavioral-overview' },
            {
              type: 'paragraph',
              html: 'Behavioral patterns focus on <strong>communication between objects</strong> — how objects interact and distribute responsibilities.',
            },
            { type: 'divider' },

            // Observer
            { type: 'heading', level: 3, text: '4. Observer', id: 'observer-pattern' },
            {
              type: 'paragraph',
              html: 'Define a one-to-many dependency between objects. When one object (the Subject) changes state, all its dependents (Observers) are notified and updated automatically.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'Observer.ts',
              code: `// Generic typed event emitter
type Listener<T> = (data: T) => void;

class EventEmitter<Events extends Record<string, unknown>> {
  private listeners = new Map<string, Set<Listener<any>>>();

  on<K extends keyof Events>(event: K, listener: Listener<Events[K]>): () => void {
    const key = event as string;
    if (!this.listeners.has(key)) this.listeners.set(key, new Set());
    this.listeners.get(key)!.add(listener);

    // Return unsubscribe function
    return () => this.listeners.get(key)?.delete(listener);
  }

  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    const key = event as string;
    this.listeners.get(key)?.forEach(fn => fn(data));
  }
}

// Usage — type-safe events
interface StoreEvents {
  'item:added': { id: string; name: string };
  'item:removed': { id: string };
  'cart:cleared': undefined;
}

const store = new EventEmitter<StoreEvents>();

const unsub = store.on('item:added', ({ id, name }) => {
  console.log(\`Added \${name} (\${id}) to cart\`);
});

store.emit('item:added', { id: '1', name: 'Widget' });
unsub(); // Clean up`,
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>When to use Observer:</strong> When changes in one object must be reflected in others, but you do not know how many objects need to update. Used in event systems, reactive state, pub/sub.',
            },
            { type: 'divider' },

            // Strategy
            { type: 'heading', level: 3, text: '5. Strategy', id: 'strategy-pattern' },
            {
              type: 'paragraph',
              html: 'Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'Strategy.ts',
              code: `// Strategy interface
interface SortStrategy<T> {
  sort(data: T[]): T[];
}

// Concrete strategies
class QuickSort<T> implements SortStrategy<T> {
  sort(data: T[]): T[] {
    if (data.length <= 1) return data;
    const pivot = data[0];
    const left = data.slice(1).filter(x => x <= pivot);
    const right = data.slice(1).filter(x => x > pivot);
    return [...this.sort(left), pivot, ...this.sort(right)];
  }
}

class InsertionSort<T> implements SortStrategy<T> {
  sort(data: T[]): T[] {
    const arr = [...data];
    for (let i = 1; i < arr.length; i++) {
      const key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) { arr[j + 1] = arr[j]; j--; }
      arr[j + 1] = key;
    }
    return arr;
  }
}

// Context — delegates to strategy
class DataSorter<T> {
  constructor(private strategy: SortStrategy<T>) {}

  setStrategy(strategy: SortStrategy<T>) { this.strategy = strategy; }

  sort(data: T[]): T[] {
    // Automatically choose based on size
    if (data.length < 20) {
      this.strategy = new InsertionSort();
    }
    return this.strategy.sort(data);
  }
}`,
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>When to use Strategy:</strong> When you have multiple algorithms for the same task and want to switch between them at runtime. Eliminates long <code>if/else</code> or <code>switch</code> chains.',
            },
            { type: 'divider' },

            // Command
            { type: 'heading', level: 3, text: '6. Command', id: 'command-pattern' },
            {
              type: 'paragraph',
              html: 'Encapsulate a request as an object, allowing you to parameterize clients with different requests, queue or log requests, and support undoable operations.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'Command.ts',
              code: `// Command interface
interface Command {
  execute(): void;
  undo(): void;
}

// Concrete commands
class AddTextCommand implements Command {
  constructor(
    private doc: TextDocument,
    private text: string,
    private position: number,
  ) {}

  execute() { this.doc.insert(this.text, this.position); }
  undo() { this.doc.delete(this.position, this.text.length); }
}

class DeleteTextCommand implements Command {
  private deleted = '';
  constructor(
    private doc: TextDocument,
    private position: number,
    private length: number,
  ) {}

  execute() {
    this.deleted = this.doc.getText(this.position, this.length);
    this.doc.delete(this.position, this.length);
  }
  undo() { this.doc.insert(this.deleted, this.position); }
}

// Invoker — manages command history
class CommandHistory {
  private history: Command[] = [];
  private undone: Command[] = [];

  execute(command: Command) {
    command.execute();
    this.history.push(command);
    this.undone = []; // Clear redo stack
  }

  undo() {
    const cmd = this.history.pop();
    if (cmd) { cmd.undo(); this.undone.push(cmd); }
  }

  redo() {
    const cmd = this.undone.pop();
    if (cmd) { cmd.execute(); this.history.push(cmd); }
  }
}`,
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>When to use Command:</strong> When you need undo/redo, command queuing, logging, or macro recording. Essential for text editors, drawing tools, and transaction-based systems.',
            },
            { type: 'divider' },

            // Chain of Responsibility
            { type: 'heading', level: 3, text: '7. Chain of Responsibility', id: 'chain-pattern' },
            {
              type: 'paragraph',
              html: 'Pass a request along a chain of handlers. Each handler decides either to process the request or pass it to the next handler in the chain.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'ChainOfResponsibility.ts',
              code: `// Handler interface
interface Middleware {
  handle(request: HttpRequest, next: () => Response): Response;
}

interface HttpRequest {
  path: string;
  method: string;
  headers: Record<string, string>;
  body?: unknown;
}
interface Response { status: number; body: unknown; }

// Concrete handlers
class AuthMiddleware implements Middleware {
  handle(req: HttpRequest, next: () => Response): Response {
    if (!req.headers['authorization']) {
      return { status: 401, body: { error: 'Unauthorized' } };
    }
    return next(); // Pass to next in chain
  }
}

class RateLimitMiddleware implements Middleware {
  private requests = new Map<string, number>();

  handle(req: HttpRequest, next: () => Response): Response {
    const ip = req.headers['x-forwarded-for'] ?? 'unknown';
    const count = (this.requests.get(ip) ?? 0) + 1;
    this.requests.set(ip, count);

    if (count > 100) {
      return { status: 429, body: { error: 'Too many requests' } };
    }
    return next();
  }
}

class LoggingMiddleware implements Middleware {
  handle(req: HttpRequest, next: () => Response): Response {
    console.log(\`\${req.method} \${req.path}\`);
    const response = next();
    console.log(\`Response: \${response.status}\`);
    return response;
  }
}

// Build the chain
function buildChain(middlewares: Middleware[], finalHandler: (req: HttpRequest) => Response) {
  return (req: HttpRequest): Response => {
    let index = 0;
    const next = (): Response => {
      if (index < middlewares.length) {
        return middlewares[index++].handle(req, next);
      }
      return finalHandler(req);
    };
    return next();
  };
}

// Usage
const handler = buildChain(
  [new LoggingMiddleware(), new AuthMiddleware(), new RateLimitMiddleware()],
  (req) => ({ status: 200, body: { message: 'OK' } })
);`,
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>When to use Chain of Responsibility:</strong> When multiple objects may handle a request and the handler is determined at runtime. Classic example: HTTP middleware pipelines (Express, Koa).',
            },
            { type: 'divider' },

            // Summary
            { type: 'heading', level: 3, text: 'Pattern Summary', id: 'structural-behavioral-summary' },
            {
              type: 'table',
              headers: ['Pattern', 'Category', 'Key Idea', 'Common Use'],
              rows: [
                ['Adapter', 'Structural', 'Convert incompatible interface', 'Third-party library integration'],
                ['Facade', 'Structural', 'Simplify complex subsystem', 'SDK/API wrappers'],
                ['Decorator', 'Structural', 'Add behavior dynamically', 'Middleware, logging, caching'],
                ['Observer', 'Behavioral', 'Notify dependents of changes', 'Event systems, reactive state'],
                ['Strategy', 'Behavioral', 'Swap algorithms at runtime', 'Sorting, validation, pricing'],
                ['Command', 'Behavioral', 'Encapsulate action as object', 'Undo/redo, queuing, macros'],
                ['Chain of Resp.', 'Behavioral', 'Pass along handler chain', 'Middleware, approval workflows'],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Key takeaway:</strong> Structural patterns organize how objects are composed. Behavioral patterns define how objects communicate. Combined with creational patterns, these three categories cover the 23 classic GoF design patterns that form the vocabulary of software design.',
            },
          ],
        },
      ],
    },
  ],
};

export default category;
