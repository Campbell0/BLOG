param(
    [string]$Message = "Update blog notes: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

if (-not (Test-Path -LiteralPath ".git")) {
    throw "This folder is not a Git repository yet. Run git init first."
}

$remote = git remote
if ($remote -contains "origin") {
    git pull --rebase origin main
}

git add -A

$pending = git status --porcelain
if (-not $pending) {
    Write-Host "No BLOG changes to sync."
    exit 0
}

git commit -m $Message

if ($remote -contains "origin") {
    git push
} else {
    Write-Host "Committed locally. Add a GitHub remote, then run: git push -u origin main"
}
