# Repository Guidelines

## Project Structure & Module Organization
This repository is currently in an initial state. Use the structure below as the default layout for new contributions:

- `src/`: application source code, organized by feature or domain.
- `tests/`: automated tests mirroring `src/` paths.
- `scripts/`: repeatable local/CI helper scripts.
- `docs/`: design notes, architecture decisions, and onboarding docs.
- `assets/`: static files (sample data, images, fixtures).

Example:
`src/data/fetcher.py` -> `tests/data/test_fetcher.py`

## Build, Test, and Development Commands
Add commands to this section as tooling is introduced. Recommended baseline:

- `python -m venv .venv` and `.venv\Scripts\Activate.ps1`: create and activate local environment.
- `pip install -r requirements.txt`: install dependencies.
- `pytest -q`: run test suite.
- `ruff check .`: run lint checks.
- `ruff format .`: apply formatting.

If your change adds a new tool, update this guide with the exact command.

## Coding Style & Naming Conventions
- Use 4-space indentation and UTF-8 text files.
- Prefer small, single-purpose modules.
- Python naming: `snake_case` for files/functions, `PascalCase` for classes, `UPPER_SNAKE_CASE` for constants.
- Keep functions focused and side effects explicit.
- Run formatter and linter before opening a PR.

## Testing Guidelines
- Place tests in `tests/` with names `test_*.py`.
- Mirror source layout to keep ownership clear.
- Include at least one happy-path test and relevant edge-case tests for each new feature.
- For bug fixes, add a regression test that fails before the fix.

## Commit & Pull Request Guidelines
This directory is not yet a Git repository, so use the following convention going forward:

- Commit style: `<type>: <short summary>` (for example, `feat: add price parser`).
- Keep commits small and logically grouped.
- PRs should include:
  - a concise description of what changed and why,
  - testing evidence (command + result),
  - linked issue/task ID when available.
- Include screenshots or sample output when behavior changes are user-visible.

## Security & Configuration Tips
- Do not commit secrets, tokens, or local `.env` files.
- Provide `.env.example` for required variables.
- Pin dependency versions where possible to improve reproducibility.
