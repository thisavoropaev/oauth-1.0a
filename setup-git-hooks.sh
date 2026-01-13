#!/bin/sh
# Install git hooks from .githooks/ directory
HOOKS_DIR=".git/hooks"
SCRIPT_DIR=".githooks"

mkdir -p "$HOOKS_DIR"

# Install pre-commit hook
ln -sf "../../$SCRIPT_DIR/pre-commit" "$HOOKS_DIR/pre-commit"
chmod +x "$HOOKS_DIR/pre-commit"

# Install pre-push hook
ln -sf "../../$SCRIPT_DIR/pre-push" "$HOOKS_DIR/pre-push"
chmod +x "$HOOKS_DIR/pre-push"

echo "Git hooks installed (pre-commit, pre-push)!"
