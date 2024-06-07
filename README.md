# Fullstack Assessment

This project was developed for number8's selective process

## Technologies used

**Monorepo manager:** Nx

**Front-end:** React, Styled-components, React-hook-forms

**Back-end:** Node, Express, Prisma, PostgreSQL

## Row to install and run the project

**Install dependencies:**

```console
npm install
```

**Setup prisma:**

```console
npx prisma generate && npx prisma migrate dev
```

**Init both repos:**

```console
npm start
```

**Init a repo separately:**

```console
npm run [repo_name]
```

## About the project architecture

**Backend**

In backend was used clean architecture with SOLID design pattern for escalability and better maintainability. I didn't prefer hexagonal architecture, because the project just serves one adapter, and it is a small project.(that is, the frontend)
If it had some queue or extra adapter, i probably would use hexagonal.

**Frontend**

For this project in personal, i preferred to venture into styled-components to show that i have no problem with which tech i might use, so, that's a technology that i have never used before.
I didn't use any design pattern, because i think the React meant to be purely functional. Didn't used componentization, because it's better when handling with classes, and SOLID, the same.
Used just ContextAPI to handle global states.
Used typescript to type some API returnings, for we to don't get any troubles :).

---

## Nx readme

If you get some problems with instalation, please read the md readme:

-   [Nx doc](./nx.md)
