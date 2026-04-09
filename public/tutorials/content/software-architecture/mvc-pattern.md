## What is MVC?

The **Model-View-Controller (MVC)** pattern divides an application into three interconnected components. This separation helps manage complexity, allows parallel development, and promotes code reuse.

> **NOTE:** MVC was first described by Trygve Reenskaug in 1979 for Smalltalk-80. It remains one of the most widely used architectural patterns today.

### The Three Components

- **Model** — Manages data, business logic, and rules. Notifies observers when state changes.
- **View** — Renders the model data for the user. Sends user actions to the controller.
- **Controller** — Accepts input, converts it to commands for the model or view.

### MVC Request Flow

**Flow:**

1. **User** — Interacts with the UI (click, form submit)
2. **Controller** — Receives request, validates input, calls model
3. **Model** — Processes business logic, updates data
4. **View** — Reads updated model, renders response
5. **User** — Sees the updated UI


### MVC in Express.js

<!-- title: model/User.ts -->
```typescript
// Model — pure data + business logic
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

export const userModel = new UserModel();
```

<!-- title: controller/UserController.ts -->
```typescript
// Controller — handles requests, calls model
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
}
```

<!-- title: routes.ts -->
```typescript
// Routes wire Controller to HTTP endpoints
import { Router } from 'express';
import { UserController } from './controller/UserController';

const router = Router();
const ctrl = new UserController();

router.get('/users', ctrl.getAll);
router.get('/users/:id', ctrl.getById);
router.post('/users', ctrl.create);

export default router;
```

### When to Use MVC

| Use MVC When | Avoid MVC When |
| --- | --- |
| You need clear separation of concerns | The application is extremely simple (a few scripts) |
| Multiple views display the same data | Real-time streaming is the primary concern |
| Team members work on UI and logic separately | You need fine-grained reactive data binding |
| You want testable business logic | The app is purely event-driven with no request/response cycle |

> **TIP:** **Key takeaway:** MVC excels when you need a clear separation between data, presentation, and control flow. It is the foundation that many other patterns build upon.
