## Prisma

Handle multiple database [https://github.com/prisma/prisma/issues/2443]
Generators/Packages: https://www.prisma.io/docs/concepts/components/prisma-schema/generators

Cascading
https://www.prisma.io/docs/guides/database/advanced-database-tasks/cascading-deletes

Relations
https://www.prisma.io/docs/concepts/components/prisma-schema/relations

```bash
# generate prisma database document, DBML, JSON schema
$ npx prisma generate

# start server to access the document
$ npx prisma-docs-generator serve
```

Copy the generated DBML and use it to view DBML in this URL
https://dbdiagram.io/

```bash
# create migrations
$ npx prisma migrate dev

# Initialize migration history
$ npx prisma migrate dev --name first-migration

# create new change migration
$ npx prisma migrate dev --name add-fields/change-fields

# Go into your schema and make the change:
NormalizedName  String            @unique @db.VarChar(64)
NormalizedName  String?            @unique @db.VarChar(64)

# Then create a draft migration:
$ npx prisma migrate dev --name migration-name --create-only

# Then edit the migration in SQL (this allow null values ie optional)
ALTER TABLE myTable ALTER COLUMN myColumn DROP NOT NULL;

# Then apply the modified SQL:
$ npx prisma migrate dev

# explore and manipulate your data
$ npx prisma studio

```

Find More at:
https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate

https://www.prisma.io/docs/concepts/components/prisma-migrate

MongoDb

```bash
# use this URI to connect to mongodb in docker
mongodb://{username}:{password}@{ip_address}:{port}/?authSource=admin
```

https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/use-custom-model-and-field-names

DBDocs

```bash
https://dbdocs.io/hafiz-softic/BitDeposit
npm install -g dbdocs
dbdocs login
dbdocs build prisma/dbml/schema.dbml -p softic.ai --project BitDeposit
```

Run `npx prisma generate` to trigger the generator. This will create a docs folder in prisma/docs
Serve the docs using `npx prisma-docs-generator serve`

# https://www.prisma.io/docs/guides/database/seed-database

```
npx prisma db seed
```

```
seeders

AUTH

$ ts-node prisma/seeds/permissions/auth-content-type.seeder.ts
$ ts-node prisma/seeds/permissions/auth-permission.seeder.ts
$ ts-node prisma/seeds/permissions/auth-group.seeder.ts
$ ts-node prisma/seeds/permissions/auth-group-permission.seeder.ts
$ ts-node prisma/seeds/permissions/auth-user-group.seeder.ts
$ ts-node prisma/seeds/permissions/auth-user-permission.seeder.ts

$ ts-node prisma/seeds/transactions/transaction-methods.seeder.ts
$ ts-node prisma/seeds/transactions/transaction-types.seeder.ts
$ ts-node prisma/seeds/transactions/transaction-type-accounts.seeder.ts
$ ts-node prisma/seeds/transactions/transactions.seeder.ts
$ ts-node prisma/seeds/transactions/transactions-json.seeder.ts
$ ts-node prisma/seeds/users/user-transaction-accounts.seeder.ts
$ ts-node prisma/seeds/notifications/notifications-notification.seeder.ts

$ ts-node prisma/seeds/bets/bet-type.seeder.ts
$ ts-node prisma/seeds/sports/sport-types.seeder.ts
$ ts-node prisma/seeds/sports/sport-categories.seeder.ts
$ ts-node prisma/seeds/bets/bet-type-sport-type.seeder.ts
$ ts-node prisma/seeds/sports/sport-teams.seeder.ts
$ ts-node prisma/seeds/sports/sport-leagues.seeder.ts
$ ts-node prisma/seeds/sports/sport-matches.seeder.ts
$ ts-node prisma/seeds/bets/bet-type-sport-match.seeder.ts

new for betting :
$ ts-node prisma/seeds/bets/bet-criteria.seeder.ts
$ ts-node prisma/seeds/bets/bet-condition.seeder.ts
$ ts-node prisma/seeds/bets/bet-criteria-bet-condition.seeder.ts
$ ts-node prisma/seeds/sports/sport-match-bet-condition.seeder.ts
$ ts-node prisma/seeds/sports/sport-ui-conditions.seeder.ts
$ ts-node prisma/seeds/sports/sport-type-ui-condition.seeder.ts

# new for affiliate :
$ ts-node prisma/seeds/affiliates/commission-group.seeder.ts
$ ts-node prisma/seeds/affiliates/commission-type.seeder.ts
$ ts-node prisma/seeds/affiliates/group-owner-group-types.seeder.ts
$ ts-node prisma/seeds/permissions/auth-group.seeder.ts
$ ts-node prisma/seeds/users/users-users.seeder.ts
$ ts-node prisma/seeds/affiliates/group-owner.seeder.ts
$ ts-node prisma/seeds/affiliates/group-owner-user.seeder.ts
$ ts-node prisma/seeds/affiliates/group-owner-affiliate.seeder.ts
$ ts-node prisma/seeds/affiliates/group-owner-commission-structure.seeder.ts
$ ts-node prisma/seeds/affiliates/group-type-commission-structures.seeder.ts
```

```
* Prisma Generated Models are used for basic validation examples which we can extend/copy and create new model to give extra validations
* Prisma DTO gives us insights of class properties.
* Prisma prisma-class gives us api documentation decorators example for swagger
```
