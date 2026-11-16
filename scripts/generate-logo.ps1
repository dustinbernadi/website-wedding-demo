# Generates the demo monogram (public/logo/logo.png, src/app/icon.png,
# src/app/apple-icon.png). Reproducible, no external assets required.
# Run: powershell -ExecutionPolicy Bypass -File scripts/generate-logo.ps1

Add-Type -AssemblyName System.Drawing

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$gold = [System.Drawing.Color]::FromArgb(217, 184, 108)
$goldDim = [System.Drawing.Color]::FromArgb(175, 145, 80)

$bmp = New-Object System.Drawing.Bitmap 500, 500, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.Clear([System.Drawing.Color]::Transparent)

$penOuter = New-Object System.Drawing.Pen $gold, 3
$penInner = New-Object System.Drawing.Pen $goldDim, 1
$g.DrawEllipse($penOuter, 24, 24, 452, 452)
$g.DrawEllipse($penInner, 40, 40, 420, 420)

$fontMonogram = New-Object System.Drawing.Font "Georgia", 108, ([System.Drawing.FontStyle]::Italic)
$fontDate = New-Object System.Drawing.Font "Georgia", 23
$brush = New-Object System.Drawing.SolidBrush $gold

function Draw-Centered([string]$text, $font, [double]$y, [double]$h) {
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = [System.Drawing.StringAlignment]::Center
  $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
  $rect = New-Object System.Drawing.RectangleF 0, $y, 500, $h
  $g.DrawString($text, $font, $brush, $rect, $sf)
  $sf.Dispose()
}

Draw-Centered "R & N" $fontMonogram 125 200

$linePen = New-Object System.Drawing.Pen $goldDim, 1.5
$g.DrawLine($linePen, 160, 350, 232, 350)
$g.DrawLine($linePen, 268, 350, 340, 350)
$points = [System.Drawing.PointF[]]@(
  (New-Object System.Drawing.PointF 250, 341),
  (New-Object System.Drawing.PointF 259, 350),
  (New-Object System.Drawing.PointF 250, 359),
  (New-Object System.Drawing.PointF 241, 350)
)
$g.DrawPolygon($linePen, $points)

Draw-Centered "12 JUNI 2027" $fontDate 372 45

$bmp.Save((Join-Path $root "public\logo\logo.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save((Join-Path $root "src\app\icon.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save((Join-Path $root "src\app\apple-icon.png"), [System.Drawing.Imaging.ImageFormat]::Png)

Write-Host "Generated demo monogram (500x500, transparent)."

$g.Dispose()
$bmp.Dispose()
$penOuter.Dispose()
$penInner.Dispose()
$linePen.Dispose()
$brush.Dispose()
$fontMonogram.Dispose()
$fontDate.Dispose()
