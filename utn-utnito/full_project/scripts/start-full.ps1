$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectDir = Resolve-Path (Join-Path $ScriptDir "..")
$DockerDir = Join-Path $ProjectDir "chat-docker"
$ComposeFile = Join-Path $DockerDir "docker-compose.yml"

$frontendPort = 4300
$coreServicePort = 4012
$n8nPort = 5690

function Write-Info($Message) {
  Write-Host "[INFO] $Message"
}

function Write-WarnMessage($Message) {
  Write-Host "[WARN] $Message"
}

function Wait-ForHttp($Url, $Label) {
  $attempts = 20
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

Write-Info "Running diagnostics before startup (full mode)."
& (Join-Path $ScriptDir "doctor.ps1") -Mode full

Write-Info "Starting full project stack (chat-frontend, chat-core-service, chat-n8n)."
docker compose -f $ComposeFile --profile full up -d

Write-Info "Current container status:"
docker compose -f $ComposeFile ps

Wait-ForHttp "http://localhost:$coreServicePort/health" "chat-core-service health endpoint"
Wait-ForHttp "http://localhost:$frontendPort" "chat-frontend"
Wait-ForHttp "http://localhost:$n8nPort" "chat-n8n"

Write-Info "utn-utnito full stack is running."
