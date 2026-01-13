# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project Overview

OAuth 1.0a client library for Edge Runtimes (Vercel Edge Functions, Cloudflare
Workers, Deno Deploy) and Node.js. Uses Web Crypto API - no Node.js built-ins
required.

## Commands

```bash
# Run all tests
deno task test

# Format code
deno task fmt

# Lint
deno task lint

# Run all checks (format, lint, test)
deno task check
```

## Architecture

**Entry point:** `mod.ts` - re-exports the public API

**Core modules:**

- `client.ts` - `OAuthClient` class for signing requests, plus `toAuthHeader()`
  and `toQueryParams()` helpers. Contains signature base string generation per
  RFC 3849.
- `sign.ts` - Signature method implementations: `PLAINTEXT`, `HMAC_SHA1`,
  `HMAC_SHA256`. Uses Web Crypto API.

**Test files:** `*.test.ts` files use Deno's built-in test framework.
`test_deps.ts` re-exports `@std/assert`.

## Git Hooks

Run `sh setup-git-hooks.sh` to install hooks:

- **pre-commit**: auto-formats, lints, and runs tests before each commit
- **pre-push**: final verification before pushing

## Git Workflow

**IMPORTANT:** Pushes to `main` branch automatically trigger a release to JSR.
Always work in feature branches.

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes and commit using conventional commits
3. Push feature branch and create PR
4. After PR merge to `main`, release happens automatically

## Conventional Commits

Version bumping is automatic based on commit messages:

- `feat:` or `feat(scope):` → **minor** version bump (new features)
- `fix:`, `perf:`, `refactor:` → **patch** version bump (bug fixes,
  improvements)
- `BREAKING CHANGE:` or `feat!:` → **major** version bump (breaking changes)
- `chore:`, `docs:`, `ci:`, `test:` → no version bump (maintenance)

Examples:

```
feat: add HMAC-SHA512 signature method
fix: handle empty query parameters correctly
feat!: change OAuthClient constructor signature
```

## Release Process

Releases are fully automated via GitHub Actions when code is pushed to `main`:

1. Runs formatting, linting, and tests
2. Determines version bump from commit messages
3. Updates version in `deno.json`
4. Generates `CHANGELOG.md` entry
5. Creates git tag and GitHub Release
6. Publishes to JSR
