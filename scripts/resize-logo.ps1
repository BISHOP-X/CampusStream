# Logo Resizer Script for CampusStream (PowerShell)
# This script uses Windows built-in image tools to resize your logo

Write-Host "🎨 CampusStream Logo Resizer" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

$inputLogo = ".\public\logo-original.png"
$outputDir = ".\public"

# Check if logo exists
if (-not (Test-Path $inputLogo)) {
    Write-Host "❌ Error: logo-original.png not found!" -ForegroundColor Red
    Write-Host "📁 Please place your 1024x1024 logo at: public\logo-original.png`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Found logo-original.png`n" -ForegroundColor Green

# Note: This script requires ImageMagick or manual resizing
Write-Host "⚠️  To resize your logo, you have 3 options:`n" -ForegroundColor Yellow

Write-Host "OPTION 1: Use Online Tool (Easiest)" -ForegroundColor Cyan
Write-Host "   1. Go to: https://www.iloveimg.com/resize-image" -ForegroundColor White
Write-Host "   2. Upload your logo-original.png" -ForegroundColor White
Write-Host "   3. Resize to these sizes and save in public/ folder:" -ForegroundColor White
Write-Host "      - logo-16.png (16x16)" -ForegroundColor Gray
Write-Host "      - logo-32.png (32x32)" -ForegroundColor Gray
Write-Host "      - logo-192.png (192x192)" -ForegroundColor Gray
Write-Host "      - logo-512.png (512x512)" -ForegroundColor Gray
Write-Host "      - apple-touch-icon.png (180x180)" -ForegroundColor Gray
Write-Host "      - favicon.ico (32x32, ICO format)`n" -ForegroundColor Gray

Write-Host "OPTION 2: Use npm script (if you have Node.js)" -ForegroundColor Cyan
Write-Host "   1. Run: npm install sharp --save-dev" -ForegroundColor White
Write-Host "   2. Run: npm run resize-logo`n" -ForegroundColor White

Write-Host "OPTION 3: Install ImageMagick" -ForegroundColor Cyan
Write-Host "   1. Download from: https://imagemagick.org/script/download.php" -ForegroundColor White
Write-Host "   2. Run this script again after installation`n" -ForegroundColor White

# Try ImageMagick if available
$magickCmd = Get-Command magick -ErrorAction SilentlyContinue

if ($magickCmd) {
    Write-Host "✅ ImageMagick detected! Resizing logos...`n" -ForegroundColor Green
    
    $sizes = @(
        @{name="logo-16.png"; size=16},
        @{name="logo-32.png"; size=32},
        @{name="logo-192.png"; size=192},
        @{name="logo-512.png"; size=512},
        @{name="apple-touch-icon.png"; size=180},
        @{name="favicon.ico"; size=32}
    )
    
    foreach ($img in $sizes) {
        $output = Join-Path $outputDir $img.name
        magick convert $inputLogo -resize "$($img.size)x$($img.size)" $output
        Write-Host "✅ Created: $($img.name) ($($img.size)x$($img.size))" -ForegroundColor Green
    }
    
    Write-Host "`n🎉 Logo resizing complete!" -ForegroundColor Green
} else {
    Write-Host "📝 After resizing, run the update script to apply logos to all pages.`n" -ForegroundColor Yellow
}

Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
