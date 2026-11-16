# Generates an Open Graph banner (1200x630) in public/og for social link previews.
# Run: powershell -ExecutionPolicy Bypass -File scripts/generate-og-banner.ps1
#
# Untuk wedding lain, lewatkan -Names/-Date/-Venue agar tidak perlu edit file:
#   powershell -ExecutionPolicy Bypass -File scripts/generate-og-banner.ps1 `
#     -Names "A & B" -Date "Senin, 1 Juni 2027" -Venue "Gereja X · Kota Y"
#
# WAJIB naikkan -Out (mis. banner-v3.png) setiap isi banner berubah, lalu samakan
# `path` di src/lib/og.ts. WhatsApp/Instagram/X meng-cache gambar OG berdasarkan
# URL, jadi nama file yang sama akan tetap menampilkan preview versi lama.
param(
  [string]$Out = "banner-v3.png",
  [string]$Names = "Raka Pratama & Nadia Putri",
  [string]$Date = "Sabtu, 12 Juni 2027",
  [string]$Venue = "The Lumina Hall, Jakarta Selatan"
)

Add-Type -AssemblyName System.Drawing

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$outDir = Join-Path $root "public\og"
$outPath = Join-Path $outDir $Out
$logoPath = Join-Path $root "public\logo\logo.png"
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

$W = 1200
$H = 630

$paperTop = [System.Drawing.Color]::FromArgb(253, 251, 247)    # #FDFBF7
$paperBottom = [System.Drawing.Color]::FromArgb(250, 243, 226) # softer cream
$ink = [System.Drawing.Color]::FromArgb(32, 24, 16)            # #201810
$muted = [System.Drawing.Color]::FromArgb(104, 92, 80)         # #685C50
$accent = [System.Drawing.Color]::FromArgb(184, 112, 24)       # #B87018
$accentSoft = [System.Drawing.Color]::FromArgb(40, 243, 234, 211) # soft glow
$accentLine = [System.Drawing.Color]::FromArgb(120, 184, 112, 24) # thin line

$bmp = New-Object System.Drawing.Bitmap $W, $H
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias

try {
  # background gradient
  $bgRect = New-Object System.Drawing.Rectangle 0, 0, $W, $H
  $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $bgRect, $paperTop, $paperBottom, 90
  $g.FillRectangle($bgBrush, $bgRect)

  # soft glow behind content
  $glow = New-Object System.Drawing.SolidBrush $accentSoft
  $g.FillEllipse($glow, 300, 90, 600, 420)
  $glow.Dispose()

  # inner border
  $border = New-Object System.Drawing.Pen $accentLine, 2
  $g.DrawRectangle($border, 34, 34, $W - 68, $H - 68)
  $border.Dispose()

  # logo
  if (Test-Path $logoPath) {
    $logo = [System.Drawing.Image]::FromFile($logoPath)
    $logoW = 120
    $logoX = [math]::Round(($W - $logoW) / 2)
    $g.DrawImage($logo, $logoX, 48, $logoW, $logoW)
    $logo.Dispose()
  }

  $serif = "Georgia"
  try {
    $fontEyebrow = New-Object System.Drawing.Font $serif, 21
    $fontNames = New-Object System.Drawing.Font $serif, 52, ([System.Drawing.FontStyle]::Italic)
    $fontDate = New-Object System.Drawing.Font $serif, 27
  } catch {
    $serif = "Times New Roman"
    $fontEyebrow = New-Object System.Drawing.Font $serif, 21
    $fontNames = New-Object System.Drawing.Font $serif, 52, ([System.Drawing.FontStyle]::Italic)
    $fontDate = New-Object System.Drawing.Font $serif, 27
  }
  $fontVenue = New-Object System.Drawing.Font "Segoe UI", 19

  $brushAccent = New-Object System.Drawing.SolidBrush $accent
  $brushInk = New-Object System.Drawing.SolidBrush $ink
  $brushMuted = New-Object System.Drawing.SolidBrush $muted

  function Draw-Centered([System.Drawing.Graphics]$g2, [string]$text, $font, $brush, [double]$y) {
    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = [System.Drawing.StringAlignment]::Center
    $sf.LineAlignment = [System.Drawing.StringAlignment]::Near
    $rect = New-Object System.Drawing.RectangleF 0, $y, $W, 120
    $g2.DrawString($text, $font, $brush, $rect, $sf)
    $sf.Dispose()
  }

  # eyebrow
  Draw-Centered $g "THE WEDDING OF" $fontEyebrow $brushAccent 212

  # ornament: lines + diamond
  $linePen = New-Object System.Drawing.Pen $accentLine, 1.5
  $oy = 272
  $g.DrawLine($linePen, 330, $oy, 545, $oy)
  $g.DrawLine($linePen, 655, $oy, 870, $oy)
  $linePen.Dispose()
  $diamond = New-Object System.Drawing.Pen $accent, 1.8
  $pts = [System.Drawing.PointF[]]@(
    (New-Object System.Drawing.PointF 600, 263),
    (New-Object System.Drawing.PointF 611, 272),
    (New-Object System.Drawing.PointF 600, 281),
    (New-Object System.Drawing.PointF 589, 272)
  )
  $g.DrawPolygon($diamond, $pts)
  $diamond.Dispose()

  # names (one line)
  Draw-Centered $g $Names $fontNames $brushInk 322

  # date
  Draw-Centered $g $Date $fontDate $brushAccent 408

  # venue
  Draw-Centered $g $Venue $fontVenue $brushMuted 456

  $brushAccent.Dispose()
  $brushInk.Dispose()
  $brushMuted.Dispose()
  $fontEyebrow.Dispose()
  $fontNames.Dispose()
  $fontDate.Dispose()
  $fontVenue.Dispose()

  $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
  Write-Host "Generated $outPath ($($bmp.Width)x$($bmp.Height))"
} finally {
  $bgBrush.Dispose()
  $g.Dispose()
  $bmp.Dispose()
}
