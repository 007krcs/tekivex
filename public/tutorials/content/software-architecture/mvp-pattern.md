## What is MVP?

The **Model-View-Presenter (MVP)** pattern is a derivative of MVC where the *Presenter* takes over the role of the Controller but with a key difference: the View is completely passive. It has no knowledge of the Model and delegates all decisions to the Presenter.

> **NOTE:** MVP became popular in the 1990s with frameworks like Taligent and later with Android development before MVVM took over.

### MVP Flow

**Flow:**

1. **User** — Interacts with the passive View
2. **View** — Delegates event to Presenter via interface
3. **Presenter** — Fetches/updates Model, formats data
4. **Model** — Performs business logic, returns result
5. **Presenter** — Calls View interface methods to update UI
6. **View** — Renders the data it receives


### MVC vs MVP

| MVC | MVP |
| --- | --- |
| View can read Model directly | View never accesses Model |
| Controller does not update View directly | Presenter pushes data to View |
| View is active — observes Model changes | View is passive — just renders |
| Harder to unit-test Views | Easy to unit-test with mock Views |

### Code Example

<!-- title: interfaces.ts -->
```typescript
// View interface — the contract the Presenter uses
interface IUserListView {
  showUsers(users: Array<{ name: string; email: string }>): void;
  showError(message: string): void;
  showLoading(loading: boolean): void;
}

// Model interface
interface IUserRepository {
  getAll(): Promise<User[]>;
  delete(id: string): Promise<void>;
}
```

<!-- title: UserListPresenter.ts -->
```typescript
class UserListPresenter {
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
}
```

<!-- title: UserListPresenter.test.ts -->
```typescript
// Unit testing is trivial — just mock the View
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
]);
```

### When to Use MVP

- Platform views are hard to instantiate in tests (Android Activities, WinForms)
- You want maximum testability of presentation logic
- Views are simple and should not contain any logic
- You have a clear one-to-one relationship between View and Presenter

> **TIP:** **Key takeaway:** MVP makes the View completely dumb. All logic lives in the Presenter, which is easily unit-tested with mock View interfaces.
