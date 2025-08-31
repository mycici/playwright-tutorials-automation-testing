# 🎯 Git Workflow Guide for Playwright Testing Project

**A comprehensive guide for effective Git usage, conflict prevention, and team collaboration.**

---

## 📋 Table of Contents

1. [Daily Workflow](#daily-workflow)
2. [Branch Management](#branch-management)
3. [Commit Best Practices](#commit-best-practices)
4. [Preventing Merge Conflicts](#preventing-merge-conflicts)
5. [Resolving Conflicts](#resolving-conflicts)
6. [Project-Specific Guidelines](#project-specific-guidelines)
7. [Real-World Case Study](#real-world-case-study-github-actions-workflow-conflict)
8. [Quick Reference](#quick-reference)
9. [Emergency Commands](#emergency-commands)

---

## 🚀 Daily Workflow

### **Morning Routine - Always Start Fresh**
```bash
# 1. Switch to main and get latest changes
git checkout main
git pull origin main

# 2. Create or switch to your feature branch
git checkout -b feature/test-user-registration
# OR if branch exists: git checkout your-existing-branch
```

### **During Development**
```bash
# Check what you've changed
git status
git diff

# Stage and commit frequently (every 30-60 minutes)
git add .
git commit -m "Add user registration page object

- Create RegistrationPage.ts with form selectors
- Add validation methods for email and password"

# Push regularly to backup your work
git push origin feature/test-user-registration
```

### **Before Going Home**
```bash
# Make sure all work is saved and pushed
git add .
git commit -m "WIP: working on registration form validation"
git push origin feature/test-user-registration
```

---

## 🌿 Branch Management

### **Branch Naming Convention**
```bash
# Feature branches
feature/add-login-tests
feature/checkout-flow-automation
feature/user-profile-tests

# Bug fixes
fix/login-button-disabled
fix/timeout-issue-chrome
fix/flaky-test-stabilization

# Maintenance
chore/update-playwright-version
chore/cleanup-test-data
docs/update-readme

# CI/CD related
ci/add-test-parallelization
ci/improve-reporting
```

### **Branch Lifecycle**
```bash
# 1. Create branch from latest main
git checkout main
git pull origin main
git checkout -b feature/your-feature

# 2. Work on your feature
# ... make changes ...

# 3. Keep branch updated (daily)
git checkout main
git pull origin main
git checkout feature/your-feature
git merge main

# 4. When feature is complete
git push origin feature/your-feature
# Create Pull Request on GitHub

# 5. After merge, cleanup
git checkout main
git pull origin main
git branch -d feature/your-feature
```

---

## 📝 Commit Best Practices

### **Commit Message Format**
```bash
# Good examples
git commit -m "Add login test for valid user credentials

- Test successful login with valid email/password
- Verify redirect to dashboard after login
- Add assertions for welcome message display"

git commit -m "Fix flaky test in checkout process

- Increase wait time for payment modal
- Add explicit wait for loading spinner
- Update selectors for new UI changes"

git commit -m "Update Playwright configuration

- Increase test timeout from 30s to 45s
- Enable trace collection for failed tests
- Configure Chrome browser for CI environment"
```

### **What Makes a Good Commit**
- **Single purpose**: One logical change per commit
- **Descriptive title**: Clear summary in present tense
- **Detailed body**: Explain what and why, not how
- **Test impact**: Mention if tests are added/modified

### **Commit Size Guidelines**
```bash
# ✅ Good - Small, focused commits
git add tests/Login.spec.ts
git commit -m "Add basic login test cases"

git add pages/LoginPage.ts
git commit -m "Create login page object model"

# ❌ Bad - Everything in one commit
git add .
git commit -m "Fixed everything and added new features"
```

---

## 🛡️ Preventing Merge Conflicts

### **High-Risk Files in Our Project**
These files are commonly edited and cause conflicts:
- `playwright.config.ts` - Test configuration
- `.github/workflows/playwright-chrome-tests.yml` - CI pipeline
- `package.json` - Dependencies
- `test-data/qa/testUser.json` - Test data
- `test-data/dev/testUser.json` - Test data

### **Prevention Strategies**

#### **1. Sync Frequently**
```bash
# Every morning before starting work
git checkout main
git pull origin main
git checkout your-branch
git merge main

# Before making changes to high-risk files
git pull origin main
git merge main
```

#### **2. Communicate with Team**
```bash
# Before editing shared files, announce it
# Slack: "Working on playwright.config.ts for the next hour"
# Or check recent commits: git log --oneline -10
```

#### **3. Small, Focused Changes**
```bash
# ✅ Good - One config change at a time
git commit -m "Increase test timeout to 45 seconds"

# ❌ Bad - Multiple unrelated changes
git commit -m "Update config, add new tests, fix bugs"
```

#### **4. Review Recent Changes**
```bash
# Before editing, see what others changed recently
git log --oneline -10 -- playwright.config.ts
git log --oneline -10 -- .github/workflows/
```

---

## 🔧 Resolving Conflicts

### **When Conflicts Happen**
```bash
# You'll see this message
Auto-merging playwright.config.ts
CONFLICT (content): Merge conflict in playwright.config.ts
Automatic merge failed; fix conflicts and then commit the result.
```

### **Step-by-Step Resolution**

#### **1. Identify Conflicted Files**
```bash
git status
# Shows files with conflicts
```

#### **2. Open Files and Look for Conflict Markers**
```javascript
// playwright.config.ts
export default defineConfig({
  timeout: 30 * 1000,
<<<<<<< HEAD
  retries: 2,  // Your change
=======
  retries: 1,  // Their change
>>>>>>> main
  reporter: 'html',
});
```

#### **3. Decide What to Keep**
```javascript
// Option 1: Keep your change
export default defineConfig({
  timeout: 30 * 1000,
  retries: 2,
  reporter: 'html',
});

// Option 2: Keep their change
export default defineConfig({
  timeout: 30 * 1000,
  retries: 1,
  reporter: 'html',
});

// Option 3: Combine both (if logical)
export default defineConfig({
  timeout: 30 * 1000,
  retries: process.env.CI ? 1 : 2,  // Different for CI vs local
  reporter: 'html',
});
```

#### **4. Remove Conflict Markers and Test**
```bash
# Remove all <<<<<<< ======= >>>>>>> markers
# Save the file
# Test that it works
npm run test

# If tests pass, commit the resolution
git add .
git commit -m "Resolve merge conflict in playwright.config.ts

- Keep increased retry count for local development
- Maintain CI optimization from main branch"
```

### **Using VS Code for Conflicts**
VS Code shows conflicts with helpful buttons:
- **Accept Current Change** (your change)
- **Accept Incoming Change** (their change)
- **Accept Both Changes** (combine them)
- **Compare Changes** (see side-by-side)

---

## 🎯 Project-Specific Guidelines

### **Testing Workflow**
```bash
# When adding new test files
git checkout -b test/add-checkout-tests

# Work on tests
# 1. Create page objects first
git add pages/CheckoutPage.ts
git commit -m "Add checkout page object model"

# 2. Add test data if needed
git add test-data/qa/checkout-user.json
git commit -m "Add test data for checkout scenarios"

# 3. Create actual tests
git add tests/Checkout.spec.ts
git commit -m "Add checkout flow test cases

- Test successful checkout with valid payment
- Test checkout with invalid card details
- Test checkout cancellation flow"

# 4. Update configuration if needed
git add playwright.config.ts
git commit -m "Add checkout project configuration"
```

### **CI/CD Workflow Changes**
```bash
# When modifying GitHub Actions
git checkout -b ci/improve-test-reporting

# Make small, incremental changes
git add .github/workflows/playwright-chrome-tests.yml
git commit -m "Add test result summary to workflow"

# Test the workflow
git push origin ci/improve-test-reporting
# Check GitHub Actions to see if it works

# If it works, continue with more changes
git commit -m "Add artifact upload for failed tests"
```

### **Configuration Changes**
```bash
# Before changing playwright.config.ts
git pull origin main  # Get latest version

# Make focused changes
git add playwright.config.ts
git commit -m "Enable trace collection for failed tests only"

# Test locally
npm run test

# Push immediately to avoid conflicts
git push origin your-branch
```

---

## ⚡ Quick Reference

### **Essential Daily Commands**
```bash
# Morning setup
git checkout main && git pull origin main

# Create new branch
git checkout -b feature/your-feature-name

# Check status
git status

# Stage and commit
git add .
git commit -m "Descriptive commit message"

# Sync with main (daily)
git checkout main && git pull origin main
git checkout your-branch && git merge main

# Push work
git push origin your-branch-name

# Create Pull Request on GitHub
```

### **Information Commands**
```bash
# See recent commits
git log --oneline -10

# See what changed in a file
git log --oneline -5 -- playwright.config.ts

# See current branch
git branch

# See all branches
git branch -a

# See changes since last commit
git diff

# See staged changes
git diff --cached
```

### **Emergency Commands**
```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (lose changes) - BE CAREFUL!
git reset --hard HEAD~1

# Discard local changes in a file
git checkout -- filename.js

# Discard all local changes - BE CAREFUL!
git reset --hard HEAD

# See what would be deleted
git clean -n

# Actually delete untracked files
git clean -f
```

---

## 🚨 Emergency Scenarios

### **"I Committed to Main by Mistake"**
```bash
# If you haven't pushed yet
git reset --soft HEAD~1  # Undo commit, keep changes
git checkout -b feature/my-changes  # Create proper branch
git add .
git commit -m "Move changes to proper branch"

# If you already pushed to main - contact team lead!
```

### **"I Have Conflicts and Don't Know What to Do"**
```bash
# Step 1: Don't panic!
git status  # See which files have conflicts

# Step 2: Open VS Code
code .  # Use VS Code's conflict resolution UI

# Step 3: For each conflicted file:
# - Look for <<<<<<< ======= >>>>>>> markers
# - Decide what to keep
# - Remove the markers
# - Save the file

# Step 4: Test your changes
npm run test

# Step 5: Commit the resolution
git add .
git commit -m "Resolve merge conflicts"
```

### **"I Lost My Changes"**
```bash
# Git rarely loses data - check reflog
git reflog  # Shows all recent actions

# Find your lost commit
git checkout <commit-hash>

# Create a new branch from there
git checkout -b recover-my-work
```

### **"My Branch is Behind and Has Conflicts"**
```bash
# Option 1: Merge (preserves history)
git checkout main
git pull origin main
git checkout your-branch
git merge main
# Resolve conflicts, then commit

# Option 2: Rebase (cleaner history, more advanced)
git checkout your-branch
git rebase main
# Resolve conflicts, then: git rebase --continue
```

---

## 📚 Learning Resources

### **Visual Git Tools**
- **GitHub Desktop**: Beginner-friendly GUI
- **VS Code**: Built-in Git integration
- **Sourcetree**: Free visual Git client

### **Practice Commands Safely**
```bash
# Create a test repository to practice
mkdir git-practice
cd git-practice
git init
echo "Hello" > test.txt
git add test.txt
git commit -m "First commit"

# Practice branching, merging, conflicts safely here
```

### **Useful Aliases** (Optional)
Add to your `~/.gitconfig`:
```ini
[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = !gitk
```

---

## 🎯 Key Takeaways

1. **Sync early, sync often** - Pull from main before starting work and regularly during development
2. **Small commits** - One logical change per commit with descriptive messages
3. **Communicate** - Let team know when editing shared files
4. **Test after conflicts** - Always run tests after resolving merge conflicts
5. **Backup your work** - Push frequently, even work-in-progress
6. **Don't panic** - Git rarely loses data, there's usually a way to recover

**Remember**: The best way to handle conflicts is to prevent them in the first place! 🚀

---

## 📊 Common Workflow Patterns

### **Feature Development Pattern**
```bash
# 1. Start fresh
git checkout main && git pull origin main
git checkout -b feature/new-feature

# 2. Develop iteratively
# Make small changes
git add . && git commit -m "Step 1: Add basic structure"
# More changes
git add . && git commit -m "Step 2: Add validation logic"
# Continue...

# 3. Stay synced
git checkout main && git pull origin main
git checkout feature/new-feature && git merge main

# 4. Push and PR
git push origin feature/new-feature
# Create Pull Request on GitHub
```

### **Bug Fix Pattern**
```bash
# 1. Create fix branch from main
git checkout main && git pull origin main
git checkout -b fix/issue-description

# 2. Make minimal changes
git add specific-files
git commit -m "Fix: description of what was broken and how it's fixed"

# 3. Test thoroughly
npm run test

# 4. Quick merge
git push origin fix/issue-description
# Create PR for quick review
```

### **Configuration Update Pattern**
```bash
# 1. Check what others are doing
git log --oneline -10 -- playwright.config.ts

# 2. Pull latest
git checkout main && git pull origin main
git checkout -b config/update-description

# 3. Make focused change
git add playwright.config.ts
git commit -m "Config: specific change description"

# 4. Test and push immediately
npm run test
git push origin config/update-description
```

---

## 🔄 Conflict Resolution Examples

### **Example 1: Simple Configuration Conflict**
```javascript
// Before resolution (conflict markers visible)
export default defineConfig({
<<<<<<< HEAD
  timeout: 45 * 1000,  // Your change: increased timeout
=======
  timeout: 30 * 1000,  // Their change: kept original
>>>>>>> main
  retries: 1,
});

// After resolution (markers removed, decision made)
export default defineConfig({
  timeout: 45 * 1000,  // Keep the increased timeout
  retries: 1,
});
```

### **Example 2: Test Data Conflict**
```json
// Before resolution
{
  "users": [
<<<<<<< HEAD
    {"email": "test1@example.com", "role": "admin"},
    {"email": "test2@example.com", "role": "user"}
=======
    {"email": "qa-user@example.com", "role": "tester"}
>>>>>>> main
  ]
}

// After resolution (combine both)
{
  "users": [
    {"email": "test1@example.com", "role": "admin"},
    {"email": "test2@example.com", "role": "user"},
    {"email": "qa-user@example.com", "role": "tester"}
  ]
}
```

---

## 🔍 Real-World Case Study: GitHub Actions Workflow Conflict

### **The Problem: CI/CD Pipeline Failure with Merge Conflicts**

**Situation**: A GitHub Actions workflow was failing with the error:
```
cp: cannot stat 'node_modules/@playwright/test/lib/traceViewer/web/*': No such file or directory
```

**Context**: 
- Feature branch `Github` had fixes for a broken Playwright trace viewer setup
- Main branch still contained the old, problematic configuration
- Pull request showed merge conflicts in two critical files

### **Why This Happened**

1. **Outdated File Paths**: The workflow used hardcoded paths to Playwright's internal files that changed between versions
2. **Complex Custom Setup**: Instead of using Playwright's built-in capabilities, the workflow tried to manually copy trace viewer assets
3. **Parallel Development**: Multiple developers working on CI/CD improvements simultaneously
4. **Version Mismatch**: Playwright 1.53.1 had different internal structure than expected

### **The Investigation Process**

#### **Step 1: Identify the Root Cause**
```bash
# First, we examined the failing workflow
cat .github/workflows/playwright-chrome-tests.yml | grep -A 10 "trace"

# Found the problematic line:
# cp -r node_modules/@playwright/test/lib/traceViewer/web/* github-pages-site/viewer/
```

#### **Step 2: Check Playwright Version and Structure**
```bash
# Checked what version we're using
cat package.json | grep playwright
# Result: "@playwright/test": "^1.53.1"

# Tried to locate the actual trace viewer files
find node_modules/@playwright -name "*trace*" -type d
# Result: Path didn't exist in newer Playwright versions
```

#### **Step 3: Analyze the Conflict**
```bash
# Compared the differences between branches
git diff origin/main HEAD -- .github/workflows/playwright-chrome-tests.yml
git diff origin/main HEAD -- playwright.config.ts

# Found that the Github branch had the correct simplified fixes
# Main branch still had the broken complex setup
```

### **The Resolution Strategy**

#### **Option Analysis**
We considered three approaches:
1. **Disable trace viewer** - Quick fix but loses functionality
2. **Fix the file paths** - Fragile, depends on Playwright internals
3. **Simplify using built-in features** ✅ - Robust, future-proof

#### **Implementation Steps**

**Step 1: Simplify Playwright Configuration**
```typescript
// OLD: Complex conditional logic
trace: process.env.CI && process.env.ENABLE_TRACE_VIEWER === 'true' ? 'retain-on-failure' : 'off',

// NEW: Simple, always-on approach
trace: 'retain-on-failure',  // Generate traces on failure
```

**Step 2: Simplify GitHub Actions Workflow**
```yaml
# REMOVED: 80+ lines of complex trace viewer setup
# REPLACED WITH: Simple copy operation
- name: Prepare report for GitHub Pages
  if: always()
  run: |
    mkdir -p github-pages-site
    cp -r playwright-report/* github-pages-site/
```

**Step 3: Resolve Merge Conflicts**
```bash
# Switch to main branch
git checkout main

# Merge the fixes from Github branch
git merge Github

# Resolve conflicts by choosing the fixed versions
git checkout --theirs .github/workflows/playwright-chrome-tests.yml
git checkout --theirs playwright.config.ts

# Commit the resolution
git add .
git commit -m "Resolve merge conflicts: Use simplified Playwright workflow and trace configuration"

# Push the fix
git push origin main
```

### **Key Lessons Learned**

#### **Technical Lessons**
1. **Avoid depending on internal file structures** - They can change between versions
2. **Prefer built-in solutions** over custom implementations
3. **Keep CI/CD configurations simple** - Complexity leads to brittleness
4. **Test configuration changes** in isolation before merging

#### **Workflow Lessons**
1. **Communicate major changes** - CI/CD modifications affect everyone
2. **Use feature flags** for experimental features rather than complex conditionals
3. **Document breaking changes** in commit messages
4. **Review dependencies** when upgrading versions

### **Prevention Strategies**

#### **For Future CI/CD Changes**
```bash
# Before modifying shared workflow files
git pull origin main  # Get latest changes
git log --oneline -10 -- .github/workflows/  # Check recent changes

# Make changes in small, testable increments
git checkout -b ci/improve-trace-handling
# Make one focused change
git commit -m "Simplify trace collection configuration"
# Test in PR before merging
```

#### **For Dependency Updates**
```bash
# When updating Playwright or other tools
# 1. Check changelog for breaking changes
# 2. Test locally first
# 3. Update configuration incrementally
# 4. Document any required workflow changes
```

#### **Team Communication Protocol**
- **Announce CI/CD changes** in team chat before starting
- **Create small, focused PRs** for infrastructure changes
- **Test changes** in feature branches before merging
- **Document** any manual steps required after deployment

### **The Fix in Action**

**Before** (Broken):
- Complex 100+ line workflow with manual file copying
- Dependency on internal Playwright file structure
- Conditional logic based on environment variables
- Fragile and version-dependent

**After** (Working):
- Simple 10-line workflow using built-in capabilities
- No dependency on internal file paths
- Automatic trace generation on test failures
- Robust and future-proof

**Result**: 
- ✅ GitHub Actions workflow runs successfully
- ✅ Test reports include interactive trace viewing
- ✅ No more missing file errors
- ✅ Simpler maintenance going forward

### **Code Snippets for Reference**

**Fixed Playwright Config**:
```typescript
use: {
  trace: 'retain-on-failure',  // Always generate traces on failure
  screenshot: 'only-on-failure',
  video: process.env.CI ? 'off' : 'retain-on-failure',
}
```

**Fixed Workflow Step**:
```yaml
- name: Prepare report for GitHub Pages
  if: always()
  run: |
    mkdir -p github-pages-site
    cp -r playwright-report/* github-pages-site/
```

This case demonstrates how **simplicity beats complexity** in CI/CD workflows and the importance of **using tools as intended** rather than building custom workarounds.

---

## 🛠️ Advanced Git Techniques

### **Interactive Rebase (Advanced)**
```bash
# Clean up commit history before pushing
git rebase -i HEAD~3  # Edit last 3 commits

# In the editor, you can:
# - squash: combine commits
# - reword: change commit message
# - drop: remove commit entirely
```

### **Cherry-picking (Selective Merge)**
```bash
# Apply specific commit from another branch
git checkout target-branch
git cherry-pick <commit-hash>
```

### **Stashing Work**
```bash
# Save work without committing
git stash push -m "Work in progress on feature X"

# List stashes
git stash list

# Apply stash
git stash pop

# Apply specific stash
git stash apply stash@{1}
```

---

*This comprehensive guide covers all aspects of Git workflow specific to our Playwright testing project. Keep it handy and refer to it whenever you're unsure about Git operations. The key to success is consistent application of these practices!*
