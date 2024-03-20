# Innovation week

## Introduction

This is a project for FCC's innovation week. It is a webapp that assists users in keeping track of their meetings. There is also some AI integration to generate todos and topic suggestions for the meetings.

## Team Members

- Kyle Stein
- Naizhao Tan
- Matthew Ruttan
- Connor Kleisinger

## Technologies

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tanstack Query](https://tanstack.com/)
- [React Hook Form](https://react-hook-form.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Drizzle ORM](https://orm.drizzle.team/docs/overview)

## Project Structure

This project follows a specific structure:

- `src/`: This is where all the source code of the application lives.
  - `app/`: Contains the main layout and page files of the application.
  - `atoms/`: Contains atomic components used across the application.
  - `components/`: Contains all the React components, organized by their functionality.
  - `hooks/`: Contains custom React hooks.
  - `lib/`: Contains utility functions and libraries.
  - `server/`: Contains server-side code.
  - `styles/`: Contains all the styles for the application.
- `public/`: Contains static files like images.
- `components.json`: A JSON file containing component metadata.
- `.env.example`: An example file showing what environment variables are needed.

## Installation

To install the project, clone the repository and run the following commands:

```bash
pnpm i
pnpm db:push
pnpm dev
```

You will also need these environment variables:

```bash
DATABASE_URL=db.sqlite
OPENAI_API_KEY=your-openai-api-key
```

Save them in a `.env` file in the root of the project.
