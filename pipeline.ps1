[CmdletBinding()]
param (
    [Parameter()]
    [switch]
    $Deploy = $false,

    [Parameter()]
    [string]
    $CommitMessage
)

$devDir = 'C:\dev'
$reactDir = Join-Path $devDir 'react'
$frontendDir = Join-Path $reactDir 'bloglist-frontend'
$frontendBuild = Join-Path $frontendDir 'dist'
$backendDir = Join-Path $reactDir 'blog-list'
$frontendDist = Join-Path $backendDir 'frontend'

if(Test-Path $frontendDist) { 
    Remove-Item $frontendDist -Recurse -Force
}
Set-Location $frontendDir
& npm run build
Copy-Item $frontendBuild $frontendDist -Container -Recurse -Force

if($Deploy){
    Set-Location $backendDir
    & git add .
    & git commit -m $CommitMessage
    & git push
}