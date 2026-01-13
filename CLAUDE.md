# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OAuth 1.0a client library for Edge Runtimes (Vercel Edge Functions, Cloudflare Workers, Deno Deploy) and Node.js. Uses Web Crypto API - no Node.js built-ins required.

## Commands

```bash
# Run all tests
deno test --allow-all

# Run a single test file
deno test --allow-all client.test.ts

# Format code
deno fmt

# Check formatting (CI)
deno fmt --check

# Lint
deno lint
```

## Architecture

**Entry point:** `mod.ts` - re-exports the public API

**Core modules:**
- `client.ts` - `OAuthClient` class for signing requests, plus `toAuthHeader()` and `toQueryParams()` helpers. Contains signature base string generation per RFC 3849.
- `sign.ts` - Signature method implementations: `PLAINTEXT`, `HMAC_SHA1`, `HMAC_SHA256`. Uses Web Crypto API.

**Test files:** `*.test.ts` files use Deno's built-in test framework. `test_deps.ts` re-exports `@std/assert`.

## Pre-push Hooks

Run `sh setup-git-hooks.sh` to install hooks that enforce formatting, linting, and tests before each push.

## Release

Update version in `deno.json`, then push a matching git tag (e.g., `git tag v1.2.3 && git push origin v1.2.3`). The workflow publishes to JSR automatically.
