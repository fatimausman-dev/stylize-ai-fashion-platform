# Imagine Backend

## Setup

```console
$ npm install
```

## Lint

```console
$ npm run lint
```

## Development

```console
$ npm run dev
```

## Prisma Development Scripts

For running new/pending migrations, run the following command:

```console
$ npm run db:migrate
```

For generating a new migration, run the following command:

```console
$ npm run migration:create
```

For generating a new migration and running it, run the following command:

```console
$ npm run migration:auto
```

For sync of migration

```console
$ npx prisma migrate dev
```

### Caution

After making changes to the `prisma/schema.prisma` file, `migration:auto` script should only be used if you are sure that the new changes will not conflict with existing data in database else it may cause data loss. It is recommended to use `migration:create` and then inspect the generated migration file. If you are sure that the new changes will not conflict with existing data in database, then run `db:migrate` to run the newly created migration.

## Steps For Adding An Absolute Import Path

1. Add the path to `tsconfig.json` under `compilerOptions.paths`
2. Add the path to `src/paths.ts`
