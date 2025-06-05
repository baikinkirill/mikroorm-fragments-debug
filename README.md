# MikroORM SQLite3 Project

> An example of our logic is described in the [src/index.ts](./src/index.ts) file. Please take a look. I left comments there.

A TypeScript project configured with MikroORM and SQLite3 database. 

## Getting Started

### 1. Use Correct Node.js Version

If you have nvm installed:
```bash
nvm use
```

Or install and use the specified version:
```bash
nvm install 22.15.0
nvm use 22.15.0
```

### 2. Install Dependencies and Setup

```bash
npm install
npm run build
npm run migration:fresh
npm run seeder:run
npm run dev
```