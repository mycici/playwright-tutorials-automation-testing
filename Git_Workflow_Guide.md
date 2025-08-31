# Git Workflow Guide

## Basic Git Commands

### Starting Work
```bash
# Clone a repository
git clone <repository-url>

# Check current status
git status

# Check current branch
git branch

# Switch to existing branch
git checkout <branch-name>

# Create and switch to new branch
git checkout -b <new-branch-name>
```

### Making Changes
```bash
# Add specific files
git add <file-name>

# Add all changes
git add .

# Commit changes
git commit -m "Clear description of what changed"

# Push to remote
git push origin <branch-name>
```

### Staying Updated
```bash
# Fetch latest changes
git fetch

# Pull latest changes from current branch
git pull

# Pull latest changes from main/master
git pull origin main
```

## Branch Workflow Rules

### 1. Always Work on Feature Branches
- Never work directly on `main` or `master`
- Create descriptive branch names: `feature/login-page`, `bugfix/navigation-issue`

### 2. Keep Branches Updated
```bash
# Before starting work
git checkout main
git pull origin main
git checkout <your-branch>
git merge main
```

### 3. Small, Frequent Commits
- Commit early and often
- Use clear, descriptive commit messages
- One logical change per commit

## Conflict Resolution Guide

### Understanding Conflicts
Conflicts occur when:
- Two branches modify the same lines in a file
- One branch deletes a file while another modifies it
- Merging branches with divergent histories

### Step-by-Step Conflict Resolution

#### 1. Identify Conflicts
```bash
git status
# Look for "both modified" files
```

#### 2. Open Conflicted Files
Look for conflict markers:
```
<<<<<<< HEAD
Your current branch changes
=======
Incoming changes from other branch
>>>>>>> branch-name
```

#### 3. Resolve Conflicts
- **Keep your changes**: Delete conflict markers and incoming changes
- **Keep incoming changes**: Delete conflict markers and your changes
- **Combine both**: Merge both sets of changes logically
- **Rewrite completely**: Create new solution incorporating both

#### 4. Complete the Resolution
```bash
# After editing files
git add <resolved-file>

# Continue merge
git commit -m "Resolve merge conflicts"

# Or if rebasing
git rebase --continue
```

### Conflict Resolution Strategies

#### Prevention is Best
```bash
# Pull frequently to minimize conflicts
git pull origin main

# Communicate with team about overlapping work
# Use small, focused branches
```

#### Tools to Help
```bash
# Use merge tool
git mergetool

# View conflict history
git log --oneline --graph

# See what changed
git diff
```

## Common Scenarios

### Scenario 1: Pull Request Conflicts
```bash
# Update your branch with latest main
git checkout main
git pull origin main
git checkout <your-branch>
git merge main
# Resolve conflicts, commit, and push
```

### Scenario 2: Merge Conflicts During Pull
```bash
git pull origin main
# Conflicts appear
# Edit files to resolve
git add .
git commit -m "Resolve merge conflicts with main"
```

### Scenario 3: Rebase Conflicts
```bash
git rebase main
# Conflicts appear
# Edit files to resolve
git add .
git rebase --continue
```

## Best Practices

### Do's ✅
- Pull before starting work
- Commit frequently with clear messages
- Test before pushing
- Review your changes: `git diff --cached`
- Use descriptive branch names
- Communicate with team about conflicts

### Don'ts ❌
- Don't force push to shared branches: `git push --force`
- Don't commit broken code
- Don't ignore conflicts (they won't go away)
- Don't work on multiple unrelated features in one branch
- Don't commit sensitive information

## Emergency Commands

### Undo Last Commit (Not Pushed)
```bash
git reset --soft HEAD~1
```

### Undo Changes to File
```bash
git checkout -- <file-name>
```

### Stash Work in Progress
```bash
# Save work temporarily
git stash

# Apply stashed work later
git stash pop
```

### Reset to Remote State
```bash
# Dangerous: loses all local changes
git reset --hard origin/<branch-name>
```

## Conflict Resolution Workflow Summary

1. **Don't Panic** - Conflicts are normal and fixable
2. **Understand the Changes** - Review what each side modified
3. **Choose the Best Solution** - Keep, combine, or rewrite
4. **Test the Resolution** - Ensure code still works
5. **Complete the Merge** - Add, commit, and push
6. **Communicate** - Let team know about significant resolutions

Remember: When in doubt, ask for help! It's better to get assistance than to make the conflict worse.
