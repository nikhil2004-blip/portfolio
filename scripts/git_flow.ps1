$ErrorActionPreference = "Continue"

$commits = @(
    # Already pushed: @{ "msg" = "Initial project setup and configuration"; ... }
    @{ "msg" = "Add base library utilities and collision math"; "paths" = @("lib", "types") },
    @{ "msg" = "Implement global state management with Zustand"; "paths" = @("store") },
    @{ "msg" = "Define portfolio content and building metadata"; "paths" = @("content") },
    @{ "msg" = "Basic terrain and atmospheric lighting setup"; "paths" = @("components/immersive/scene") },
    @{ "msg" = "Add first-person player controller and movement physics"; "paths" = @("components/immersive/player/Player.tsx", "components/immersive/player/useMovement.ts") },
    @{ "msg" = "Implement procedural building generation logic"; "paths" = @("components/immersive/buildings/Building.tsx") },
    @{ "msg" = "Add cinematic UI overlays and HUD system"; "paths" = @("components/immersive/ui") },
    @{ "msg" = "Setup main application routing and layout"; "paths" = @("app") },
    @{ "msg" = "Document project requirements in PRD"; "paths" = @("PRD_Minecraft_Portfolio.md") },
    @{ "msg" = "Refine crosshair and visual feedback"; "paths" = @("components/immersive/ui/Crosshair.tsx") },
    @{ "msg" = "Implement proximity-based building interaction"; "paths" = @("components/immersive/player/useProximity.ts") },
    @{ "msg" = "Optimize building entrances for accessibility"; "paths" = @("components/immersive/buildings/Building.tsx") },
    @{ "msg" = "Update building collision boundaries"; "paths" = @("components/immersive/buildings/buildings.data.ts") },
    @{ "msg" = "Add cinematic fade-to-black entry effect"; "paths" = @("components/immersive/ui/OverlayPanel.tsx") },
    @{ "msg" = "Implement solid collision for central monument"; "paths" = @("components/immersive/buildings/buildings.data.ts", "components/immersive/player/useMovement.ts") },
    @{ "msg" = "Enhance night cycle visibility and starbox"; "paths" = @("components/immersive/scene/Lighting.tsx") },
    @{ "msg" = "Add project README and MIT License"; "paths" = @("README.md", "LICENSE") },
    @{ "msg" = "Final polish on project metadata"; "paths" = @("package.json") },
    @{ "msg" = "Final commit: Repository ready for public launch"; "paths" = @(".") }
)

# Ensure we are in the right directory
cd "C:\Users\Nikhil Kumar Yadav\Desktop\projects\portfolio"

# Set branch to main
git branch -M main

foreach ($c in $commits) {
    Write-Host "Processing: $($c.msg)" -ForegroundColor Cyan
    foreach ($p in $c.paths) {
        git add $p
    }
    git commit -m $c.msg
    Write-Host "Pushing to origin main..." -ForegroundColor Yellow
    git push origin main
    
    if ($c.msg -ne "Final commit: Repository ready for public launch") {
        Write-Host "Waiting 2 minutes before next commit..." -ForegroundColor Gray
        Start-Sleep -Seconds 120
    }
}

Write-Host "All 20 commits completed successfully!" -ForegroundColor Green
