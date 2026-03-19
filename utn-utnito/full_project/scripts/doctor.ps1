$ErrorActionPreference = "Stop"

param(
  [ValidateSet("n8n", "full", "ollama")]
  [string]$Mode = "n8n"
)

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectDir = Resolve-Path (Join-Path $ScriptDir "..")
$DockerDir = Join-Path $ProjectDir "chat-docker"
$ComposeFile = Join-Path $DockerDir "docker-compose.yml"

$frontendPort = 4300
$coreServicePort = 4012
$n8nPort = 5690
$ollamaPort = 8300

function Write-Info($Message) {
  Write-Host "[INFO] $Message"
}

function Write-WarnMessage($Message) {
  Write-Host "[WARN] $Message"
}

function Write-ErrorMessage($Message) {
  Write-Host "[ERROR] $Message"
}

function Check-Command($CommandName) {
  if (Get-Command $CommandName -ErrorAction SilentlyContinue) {
    Write-Info "Found $CommandName."
    return $true
  }

  Write-ErrorMessage "Missing required command: $CommandName"
  return $false
}

function Check-DockerCompose {
  try {
    docker compose version | Out-Null
    Write-Info "Docker Compose v2 is available."
    return $true
  } catch {
    Write-ErrorMessage "Docker Compose v2 is not available (docker compose)."
    return $false
  }
}

function Test-PortAvailable($Port) {
  try {
    $existing = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
    return ($null -eq $existing)
  } catch {
    Write-WarnMessage "Could not test port $Port on this host. Skipping."
    return $true
  }
}

function Validate-Compose {
  try {
    docker compose -f $ComposeFile config -q
    Write-Info "docker-compose.yml is valid."
    return $true
  } catch {
    Write-ErrorMessage "docker-compose.yml validation failed."
    return $false
  }
}

Write-Info "Running utn-utnito doctor (mode: $Mode)."

$statusOk = $true
$statusOk = (Check-Command git) -and $statusOk
$statusOk = (Check-Command node) -and $statusOk
$statusOk = (Check-Command npm) -and $statusOk
$statusOk = (Check-Command docker) -and $statusOk
$statusOk = (Check-DockerCompose) -and $statusOk

if (-not $statusOk) {
  exit 1
}

Write-Info ("node version: " + (node -v))
Write-Info ("npm version: " + (npm -v))
Write-Info ("docker version: " + (docker --version))
Write-Info ("docker compose version: " + (docker compose version))
Write-Info ("git version: " + (git --version))

if (-not (Validate-Compose)) {
  exit 1
}

if ($Mode -eq "full") {
  $ports = @($frontendPort, $coreServicePort, $n8nPort)
} elseif ($Mode -eq "ollama") {
  $ports = @($ollamaPort)
} else {
  $ports = @($n8nPort)
}
$collisions = 0

foreach ($port in $ports) {
  if (Test-PortAvailable $port) {
    Write-Info "Port $port is available."
  } else {
    Write-ErrorMessage "Port $port is already in use."
    $collisions++
  }
}

if ($collisions -gt 0) {
  Write-ErrorMessage "Detected $collisions port collision(s)."
  exit 1
}

Write-Info "Doctor finished successfully."
