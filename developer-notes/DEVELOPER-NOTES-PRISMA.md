## Prisma Developer Notes

### Overview
Prisma is an ORM (Object-Relational Mapping) tool that simplifies database management and provides a type-safe query builder. This document outlines best practices, commands, and resources for working with Prisma in the BitDeposit Backend Application.

---

### Key Resources
- [Prisma Official Documentation](https://www.prisma.io/docs/)
- [Handling Multiple Databases](https://github.com/prisma/prisma/issues/2443)
- [Generators and Packages](https://www.prisma.io/docs/concepts/components/prisma-schema/generators)
- [Cascading Deletes](https://www.prisma.io/docs/guides/database/advanced-database-tasks/cascading-deletes)
- [Relations in Prisma](https://www.prisma.io/docs/concepts/components/prisma-schema/relations)

---

### Common Commands

#### Generate Prisma Artifacts
```bash
npx prisma generate
```
- Generates Prisma Client and other artifacts defined in the `prisma.schema` file.

#### Start Prisma Docs Server
```bash
npx prisma-docs-generator serve
```
- Starts a local server to view Prisma documentation.

#### Create Migrations
```bash
npx prisma migrate dev --name <migration-name>
```
- Creates a new migration based on schema changes.

#### Apply Draft Migrations
```bash
npx prisma migrate dev --create-only
```
- Creates a draft migration for manual SQL editing.

#### Seed Database
```bash
npx prisma db seed
```
- Runs the seed scripts to populate the database with initial data.

#### Explore Data
```bash
npx prisma studio
```
- Opens Prisma Studio for data exploration and manipulation.

---

### DBML and Visualization
1. Generate DBML:
   ```bash
   npx prisma generate
   ```
2. Copy the generated DBML and visualize it at [dbdiagram.io](https://dbdiagram.io/).

---

### MongoDB Connection
Use the following URI format to connect to MongoDB in Docker:
```bash
mongodb://<username>:<password>@<ip_address>:<port>/?authSource=admin
```

---

### DBDocs
1. Install DBDocs globally:
   ```bash
   npm install -g dbdocs
   ```
2. Log in to DBDocs:
   ```bash
   dbdocs login
   ```
3. Build documentation:
   ```bash
   dbdocs build prisma/dbml/schema.dbml -p softic.ai --project BitDeposit
   ```

---

### Seeding Scripts
Run the following commands to seed specific data:

#### Permissions
```bash
$ ts-node prisma/seeds/permissions/auth-content-type.seeder.ts
$ ts-node prisma/seeds/permissions/auth-permission.seeder.ts
$ ts-node prisma/seeds/permissions/auth-group.seeder.ts
$ ts-node prisma/seeds/permissions/auth-group-permission.seeder.ts
$ ts-node prisma/seeds/permissions/auth-user-group.seeder.ts
$ ts-node prisma/seeds/permissions/auth-user-permission.seeder.ts
```

#### Transactions
```bash
$ ts-node prisma/seeds/transactions/transaction-methods.seeder.ts
$ ts-node prisma/seeds/transactions/transaction-types.seeder.ts
$ ts-node prisma/seeds/transactions/transaction-type-accounts.seeder.ts
$ ts-node prisma/seeds/transactions/transactions.seeder.ts
$ ts-node prisma/seeds/transactions/transactions-json.seeder.ts
$ ts-node prisma/seeds/users/user-transaction-accounts.seeder.ts
```

#### Notifications
```bash
$ ts-node prisma/seeds/notifications/notifications-notification.seeder.ts
```

#### Sports and Bets
```bash
$ ts-node prisma/seeds/bets/bet-type.seeder.ts
$ ts-node prisma/seeds/sports/sport-types.seeder.ts
$ ts-node prisma/seeds/sports/sport-categories.seeder.ts
$ ts-node prisma/seeds/bets/bet-type-sport-type.seeder.ts
$ ts-node prisma/seeds/sports/sport-teams.seeder.ts
$ ts-node prisma/seeds/sports/sport-leagues.seeder.ts
$ ts-node prisma/seeds/sports/sport-matches.seeder.ts
$ ts-node prisma/seeds/bets/bet-type-sport-match.seeder.ts
```

#### Affiliates
```bash
$ ts-node prisma/seeds/affiliates/commission-group.seeder.ts
$ ts-node prisma/seeds/affiliates/commission-type.seeder.ts
$ ts-node prisma/seeds/affiliates/group-owner-group-types.seeder.ts
$ ts-node prisma/seeds/affiliates/group-owner.seeder.ts
$ ts-node prisma/seeds/affiliates/group-owner-user.seeder.ts
$ ts-node prisma/seeds/affiliates/group-owner-affiliate.seeder.ts
$ ts-node prisma/seeds/affiliates/group-owner-commission-structure.seeder.ts
$ ts-node prisma/seeds/affiliates/group-type-commission-structures.seeder.ts
```

---

### Notes
- Prisma-generated models are used for basic validation. Extend or copy these models for additional validations.
- Prisma DTOs provide insights into class properties.
- Prisma classes include API documentation decorators for Swagger.
