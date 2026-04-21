# Contributing to Buff-Bugger

This document describes how the BUGMASTERS team collaborates on the Buff-Bugger codebase. It is maintained as part of the project's professional documentation practices.

## Branching

We use a **feature branch** workflow. The `main` branch is always kept in a working, deployable state.

- **Never commit directly to `main`.** All changes go through a feature branch and a pull request.
- Create a new branch for every user story or issue on the project board.

### Branch naming

Branches are named using the following pattern:

```
<type>/<short-description>
```

Where `<type>` is one of:

| Type | Use for |
|------|---------|
| `feat` | New features or user stories |
| `fix` | Bug fixes |
| `docs` | Documentation-only changes |
| `refactor` | Code restructuring that doesn't change behavior |
| `test` | Adding or modifying tests |
| `chore` | Tooling, config, or maintenance |

**Examples:**

```
feat/map-marker-popup
fix/registration-email-validation
docs/readme-run-instructions
refactor/extract-bug-routes
```

## Commit Messages

Commits follow a lightweight version of the [Conventional Commits](https://www.conventionalcommits.org/) convention:

```
<type>: <short summary in the imperative mood>

<optional longer description if needed>
```

**Guidelines:**

- Use the imperative mood: "add map markers," not "added map markers" or "adds map markers"
- Keep the summary under 72 characters
- Use the same `<type>` values as branch names
- If the commit closes an issue, reference it in the body: `Closes #12`

**Examples:**

```
feat: add clickable markers to Boulder map
fix: reject registration with malformed email
docs: expand run instructions in README
test: cover /api/bugs endpoint response shape
```

## Pull Requests

Every feature branch is merged into `main` via a pull request. PRs should:

1. **Target `main`** and have a descriptive title (same conventions as commit messages)
2. **Link to the related issue** on the project board
3. **Describe what changed and why** — even a couple of sentences is enough
4. **Include at least one teammate as a reviewer** before merge
5. **Pass all tests** before merge (`docker compose run web npm run test`)

A teammate reviewing a PR should verify:

- The code runs locally without errors
- Any new functionality has corresponding tests (where applicable)
- The app still works end-to-end after the change (quick smoke test)

## Issues and the Project Board

Work is tracked on our [GitHub Projects board](https://github.com/bug-masters/Buff-Bugger). Each user story is a GitHub issue with:

- A clear title describing the user-visible outcome
- An assignee (a single team member who owns it)
- A status column reflecting current state (Backlog, In Progress, In Review, Done)
- A link back to the feature branch and PR where the work lives

**Before starting work**, move the issue to "In Progress" and assign yourself. **After merging**, move it to "Done."

## Weekly Cadence

The team follows a weekly sprint cadence anchored to the course's weekly TA meeting:

- **Sunday evening** — review the board, plan the week's issues
- **Monday TA meeting** — status update, blockers, plan for the week
- **Mid-week** — feature work on branches, PR reviews
- **End of week** — merge completed work into `main`, update release notes

Release notes for each sprint live in [`MilestoneSubmissions/`](./MilestoneSubmissions). Meeting minutes live in [`TeamMeetingLogs/`](./TeamMeetingLogs), with the scribe role rotating weekly.

## Code Style

- **JavaScript**: follow existing patterns in the codebase. Use `const` and `let`; avoid `var`. Prefer arrow functions for callbacks.
- **SQL**: keep queries readable. Use parameterized queries via `pg-promise` — never string-concatenate user input into SQL.
- **Handlebars templates**: keep business logic out of templates. If you need complex formatting, do it in the route handler and pass clean values.
- **CSS**: keep styles consistent with the project's design tokens. See [`DESIGN.md`](./DESIGN.md) if present.

## Security

- **Never commit secrets.** API keys, database passwords, and session secrets live in `.env` — which is gitignored.
- **Always use `.env.example`** as the template when adding a new environment variable. Commit the example, not your actual `.env`.
- **Hash passwords** with `bcryptjs` before storing. Never store plaintext passwords.
- **Parameterize SQL** to prevent injection. `pg-promise` supports this via `$1`, `$2`, etc. or named parameters.

## Communication

- **Discord** — technical discussion, code questions, PR reviews
- **Text** — scheduling, quick logistics
- **TA meetings** — weekly status and blockers

If a PR has been open for more than 24 hours without review, ping the assigned reviewer on Discord.

---

*Questions about these guidelines? Open an issue or ask on Discord.*
