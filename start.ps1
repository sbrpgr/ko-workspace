$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$htmlPath = Join-Path $root "index.html"
$profilePath = Join-Path $root ".browser-profile"

if (-not (Test-Path $htmlPath)) {
  Write-Host "index.html 파일을 찾을 수 없습니다."
  Read-Host "Enter 키를 누르면 닫힙니다"
  exit 1
}

$browserCandidates = @(
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
)

$browser = $browserCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1

if ($browser) {
  if (-not (Test-Path $profilePath)) {
    New-Item -ItemType Directory -Path $profilePath | Out-Null
  }

  Start-Process -FilePath $browser -ArgumentList @(
    "--user-data-dir=$profilePath",
    "--no-first-run",
    "--use-fake-ui-for-media-stream",
    $htmlPath
  )
} else {
  Start-Process -FilePath $htmlPath
}
