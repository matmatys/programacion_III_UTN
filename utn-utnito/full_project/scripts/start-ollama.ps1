$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectDir = Resolve-Path (Join-Path $ScriptDir "..")
$DockerDir = Join-Path $ProjectDir "chat-docker"
$ComposeFile = Join-Path $DockerDir "docker-compose.yml"
$ollamaPort = 8300

function Write-Info($Message) {
  Write-Host "[INFO] $Message"
}

function Write-WarnMessage($Message) {
  Write-Host "[WARN] $Message"
}

function Wait-ForHttp($Url, $Label) {
  $attempts = 30
  $delaySeconds = 2

  for ($i = 1; $i -le $attempts; $i++) {
    try {
      $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 5
      if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
        Write-Info "$Label is reachable at $Url."
        return
      }
    } catch {
      Start-Sleep -Seconds $delaySeconds
    }
  }

  Write-WarnMessage "$Label did not become reachable at $Url after $($attempts * $delaySeconds) seconds."
}

Write-Info "Running diagnostics before startup (ollama mode)."
& (Join-Path $ScriptDir "doctor.ps1") -Mode ollama

Write-Info "Starting optional Ollama service."
docker compose -f $ComposeFile --profile ollama up -d chat-ollama

Write-Info "Current container status:"
docker compose -f $ComposeFile ps

Wait-ForHttp "http://localhost:$ollamaPort/api/tags" "chat-ollama"

Write-Info "Optional Ollama service is running."
