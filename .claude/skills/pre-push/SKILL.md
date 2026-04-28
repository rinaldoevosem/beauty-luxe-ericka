---
name: pre-push
description: Full review of all changes before pushing to remote — validates all team rules across modified files
allowed-tools: Read, Grep, Glob, Bash(git diff*, git log*, git status)
---

## Pre-Push Review

Run a complete review of ALL modified files before pushing.

### Steps

1. **Get all changed files**:
   ```
   git diff --name-only origin/main...HEAD
   ```

2. **For each modified file**, run the full checklist:

   **Liquid files (.liquid)**:
   - Uses render, not include
   - Snippets have `{% doc %}` tags with @param documentation
   - No hardcoded text (uses translation keys)
   - User content escaped with `| escape`
   - CSS in `{% stylesheet %}` tags
   - Dynamic values via inline CSS custom properties

   **CSS (inside {% stylesheet %} or .css files)**:
   - BEM naming correct
   - No !important without documented exception
   - No ID selectors
   - Mobile first
   - Uses theme CSS custom properties
   - 2-space indentation

   **JS files (.js)**:
   - Uses Horizon Component framework
   - Uses refs and declarative events
   - No jQuery, no var
   - No console.log / debugger
   - disconnectedCallback cleans up listeners
   - Scripts loaded with type="module"
   - JSON.parse wrapped in try/catch

   **All files**:
   - Images use srcset, lazy loading, alt text, width/height
   - Forms have labels
   - Semantic HTML
   - ARIA attributes correct
   - No secrets or .env values

3. **Check commit messages**:
   - Verify all commits follow Conventional Commits: `type(scope): description`

4. **Generate report**:
   - List all issues with file, line, rule violated, and fix
   - Severity: HIGH (blocks push), MEDIUM (should fix), LOW (nice to have)
   - Final verdict: READY TO PUSH / NEEDS FIXES
