# Contributing to Clrposture App

Thank you for your interest in contributing. This document covers everything you need to get started.

---

## Before you begin

- Check [open issues](https://github.com/clrposture/clrposture-app/issues) before opening a new one
- For significant changes, open an issue first to discuss the approach
- This repo is the **web app** (`clrposture-app`). For changes to the scoring engine, question bank, or CLI, see [`clrposture-core`](https://github.com/clrposture/clrposture-core)

---

## Development setup

**Prerequisites:** Node 22+, pnpm 9+

```bash
git clone https://github.com/clrposture/clrposture-app.git
cd clrposture-app
pnpm install
pnpm dev
```

---

## Engineering standards

These standards are enforced in code review:

### TDD — tests first

Every change must be driven by a failing test. Write the test, see it fail, then write the implementation. No implementation code without a failing test.

### Design patterns

Apply patterns (Strategy, Repository, Factory, Builder, etc.) where they improve clarity. Name the pattern explicitly in a comment when used.

### Latest packages only

Always use the latest stable versions of every dependency. Never use deprecated APIs, options, or patterns — check the changelog before upgrading.

### Quality over speed

Prefer clean, well-structured code. Refactor as you go. Leave the codebase better than you found it. Avoid over-engineering: the right amount of complexity is the minimum needed for the current task.

---

## Workflow

```bash
# 1. Always pull main before branching
git checkout main && git pull --rebase

# 2. Create a feature branch
git checkout -b feat/your-feature-name

# 3. Make changes — tests first
pnpm test:watch

# 4. Verify everything passes before pushing
pnpm test && pnpm lint && pnpm build

# 5. Push and open a PR against main
git push -u origin feat/your-feature-name
```

---

## Pull request checklist

Before submitting a PR:

- [ ] All tests pass (`pnpm test`)
- [ ] No lint errors (`pnpm lint`)
- [ ] Build succeeds (`pnpm build`)
- [ ] New behaviour is covered by tests
- [ ] No `console.log` statements left in source
- [ ] PR description explains **what** changed and **why**

---

## Commit messages

Use concise imperative present tense:

```
Add ProgressBar component for wizard navigation
Fix localStorage hydration error during SSR
Refactor TierRadio to accept generic subcategoryId
```

Do not include `Co-Authored-By` or AI attribution lines.

---

## Reporting bugs

Open a [GitHub issue](https://github.com/clrposture/clrposture-app/issues/new) with:

1. A clear title
2. Steps to reproduce
3. Expected vs. actual behaviour
4. Browser and OS version

---

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
