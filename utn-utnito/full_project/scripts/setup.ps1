$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectDir = Resolve-Path (Join-Path $ScriptDir "..")

function Write-Info($Message) {
  Write-Host "[INFO] $Message"
}

function Write-WarnMessage($Message) {
  Write-Host "[WARN] $Message"
}

function Require-Command($CommandName) {
  if (-not (Get-Command $CommandName -ErrorAction SilentlyContinue)) {
    throw "Missing required command: $CommandName"
  }
}

function Require-DockerCompose {
  try {
    docker compose version | Out-Null
  } catch {
    throw "Docker Compose v2 is not available (docker compose)."
  }
}

function Install-NodeDependencies($AppDir, $AppName) {
  if (-not (Test-Path $AppDir)) {
    Write-WarnMessage "Directory not found for $AppName: $AppDir. Skipping."
    return
  }

  $PackageLock = Join-Path $AppDir "package-lock.json"
  $PackageJson = Join-Path $AppDir "package.json"

  if (Test-Path $PackageLock) {
    Write-Info "Running npm ci in $AppName."
    Push-Location $AppDir
    npm ci
    Pop-Location
    return
  }

  if (Test-Path $PackageJson) {
    Write-Info "Running npm install in $AppName."
    Push-Location $AppDir
    npm install
    Pop-Location
    return
  }

  Write-Info "No package.json found in $AppName. Skipping dependency install."
}

Write-Info "Starting setup for utn-utnito."

Require-Command git
Require-Command node
Require-Command npm
Require-Command docker
Require-DockerCompose

Write-Info "Manual tools reminder: install Docker Desktop, Visual Studio Code, and DBeaver manually."

Install-NodeDependencies (Join-Path $ProjectDir "backend/chat-core-service") "chat-core-service"
Install-NodeDependencies (Join-Path $ProjectDir "frontend/chat-app") "chat-app"

Write-Info "Running environment diagnostics."
& (Join-Path $ScriptDir "doctor.ps1") -Mode n8n

Write-Info "Setup completed."
