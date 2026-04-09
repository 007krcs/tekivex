## What is MVVM?

**Model-View-ViewModel (MVVM)** separates the UI (*View*) from business logic (*Model*) using a *ViewModel* that exposes data and commands via data binding. The View automatically updates when the ViewModel changes, and user interactions flow back through bindings.

> **NOTE:** MVVM was introduced by Microsoft architect John Gossman in 2005 for WPF and Silverlight. It is the foundation of modern frameworks like Angular, Vue, and SwiftUI.

### MVVM Flow

**Flow:**

1. **View** — Declarative template binds to ViewModel properties
2. **ViewModel** — Exposes observable state and commands
3. **Model** — Domain logic and data access
4. **Data Binding** — Automatic two-way sync between View and ViewModel


### MVC vs MVVM

| MVC | MVVM |
| --- | --- |
| Controller manually updates the View | Data binding auto-syncs View and ViewModel |
| One-way data flow (request/response) | Two-way reactive data flow |
| Imperative UI updates | Declarative UI templates |
| Better for server-rendered apps | Better for rich client-side apps |
| Simple to understand and debug | More infrastructure (observables, bindings) |

### ViewModel Example (React-like)

<!-- title: useUserViewModel.ts -->
```typescript
// ViewModel as a custom React hook
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
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    setUsers(prev => prev.filter(u => u.id !== id));
  }, []);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  // Expose ViewModel contract
  return { filteredUsers, loading, error, filter, setFilter, deleteUser, refresh: loadUsers };
}
```

<!-- title: UserListView.tsx -->
```typescript
// View — purely declarative, binds to ViewModel
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
}
```

### Key Benefits of MVVM

- **Testable:** ViewModel can be tested without any UI framework
- **Declarative:** Views describe what to render, not how
- **Reusable:** Same ViewModel can drive different Views
- **Maintainable:** Clear separation between UI and logic

> **TIP:** **Key takeaway:** MVVM replaces imperative UI updates with declarative data binding. The ViewModel holds all presentation state and commands, while the View simply binds to it.
