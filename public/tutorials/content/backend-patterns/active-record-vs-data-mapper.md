## Active Record vs Data Mapper

When working with databases through an ORM, two dominant patterns emerge: **Active Record** and **Data Mapper**. They differ in where persistence logic lives — inside the model or in a separate layer.

### Active Record

In the Active Record pattern, the model object itself contains methods for saving, updating, and querying the database. The entity *is* the query builder.

<!-- title: active-record-example.ts -->
```typescript
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;
}

// Usage — the model IS the query
const user = new User();
user.name = 'Alice';
user.email = 'alice@example.com';
await user.save();                       // instance method

const found = await User.findOneBy({     // static method
  email: 'alice@example.com'
});
await found?.remove();
```

### Data Mapper

In the Data Mapper pattern, entities are plain objects with no knowledge of the database. A separate repository or mapper handles all persistence operations.

<!-- title: data-mapper-example.ts -->
```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AppDataSource } from './data-source';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;
}

// Usage — a separate repository handles persistence
const userRepo = AppDataSource.getRepository(User);

const user = userRepo.create({ name: 'Alice', email: 'alice@example.com' });
await userRepo.save(user);

const found = await userRepo.findOneBy({ email: 'alice@example.com' });
if (found) await userRepo.remove(found);
```

### Comparison

| Active Record | Data Mapper |
| --- | --- |
| Model contains persistence methods | Models are plain objects (POJOs) |
| Quick to set up for simple CRUD | Separation of concerns |
| Less boilerplate code | More boilerplate but cleaner architecture |
| Tighter coupling to ORM framework | Loosely coupled — easier to swap ORMs |
| Harder to unit test in isolation | Easy to mock repositories in tests |
| Great for small-to-medium apps | Best for large, domain-rich applications |

### When to Use Which?

| Criterion | Active Record | Data Mapper |
| --- | --- | --- |
| Project size | Small / prototypes | Medium to large |
| Team size | Solo / small team | Larger teams |
| Domain complexity | Simple CRUD | Complex business logic |
| Testability need | Moderate | High |
| ORM examples | Sequelize, TypeORM (AR mode) | TypeORM (DM mode), Prisma, MikroORM |

> **TIP:** **Prisma** takes the Data Mapper idea further — your models are defined in a schema file, and the generated client acts as the mapper. You never extend a base class.

> **CAUTION:** Mixing both patterns in the same project creates confusion. Pick one and stay consistent across your codebase.
