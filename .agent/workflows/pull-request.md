---
description: Guide for creating pull requests with proper review and documentation
---

# Pull Request Creation Workflow

Follow these steps when creating a pull request:

## 1. Review Current Branch Changes

```bash
# Check current branch
git branch --show-current

# View all commits on this branch (compared to main)
git log main..HEAD --oneline

# View summary of changed files
git diff main --stat

# View full diff for detailed review
git diff main
```

## 2. Analyze the Changes

Review all changes and categorize them:

- **New Features**: New functionality added
- **Bug Fixes**: Issues that were resolved
- **Refactoring**: Code improvements without functional changes
- **Breaking Changes**: Changes that affect existing behavior

## 3. Generate PR Title

Format: `<type>: <concise description>`

Types:

- `feat` - New feature
- `fix` - Bug fix
- `refactor` - Code refactoring
- `docs` - Documentation changes
- `style` - Formatting, styling changes
- `chore` - Maintenance tasks

Example: `feat: Add admin users and subscriptions pages`

## 4. Generate PR Description

Use this markdown template:

```markdown
## Summary

Brief overview of what this PR accomplishes.

## Changes

- List of specific changes made
- Grouped by file or component when helpful

## Screenshots (if applicable)

Include screenshots for UI changes.

## Testing

- [ ] Manual testing completed
- [ ] All existing tests pass

## Notes

Any additional context, known issues, or follow-up tasks.
```

## 5. Create the Pull Request

```bash
# Push branch if not already pushed
git push origin <branch-name>

# Use GitHub CLI to create PR (if available)
gh pr create --title "<title>" --body "<description>"
```

Or create via GitHub web interface using the generated title and description.
