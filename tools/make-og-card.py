"""Render the social preview cards (public/brand/og-cover{,-ru}.png).

Fonts are not vendored. Drop the TTFs under tools/fonts (or set ORDO_FONTS):
  Inter    -> https://github.com/rsms/inter/releases  (extras/ttf/Inter-*.ttf)
  JB Mono  -> https://github.com/JetBrains/JetBrainsMono/releases (fonts/ttf/*.ttf)

    python3 tools/make-og-card.py
"""
import os

from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = os.environ.get('ORDO_FONTS', os.path.join(ROOT, 'tools', 'fonts'))
OUT = os.path.join(ROOT, 'public', 'brand')

W, H = 1200, 630
BG = (8, 9, 12)
GRID = (18, 21, 30)
CYAN = (34, 211, 238)
EMERALD = (16, 185, 129)
VIOLET = (167, 139, 250)
TEXT = (241, 245, 249)
MUTED = (138, 148, 166)
DIM = (90, 100, 118)

inter = lambda w, s: ImageFont.truetype(f'{FONTS}/Inter-{w}.ttf', s)
mono = lambda w, s: ImageFont.truetype(f'{FONTS}/JetBrainsMono-{w}.ttf', s)


def glow(size, center, radius, color, peak):
    """Soft radial light, so the flat background has some depth behind the mark.
    Built from concentric ellipses on a mask and blurred, to stay dependency-free."""
    w, h = size
    mask = Image.new('L', (w, h), 0)
    md = ImageDraw.Draw(mask)
    steps = 48
    for i in range(steps, 0, -1):
        r = radius * i / steps
        a = int(255 * peak * (1 - i / steps) ** 2)
        md.ellipse([center[0] - r, center[1] - r, center[0] + r, center[1] + r], fill=a)
    mask = mask.filter(ImageFilter.GaussianBlur(radius / 6))
    layer = Image.new('RGBA', (w, h), (*color, 0))
    layer.putalpha(mask)
    return layer


def card(lang):
    img = Image.new('RGB', (W, H), BG)
    d = ImageDraw.Draw(img)

    for x in range(0, W, 48):
        d.line([(x, 0), (x, H)], fill=GRID)
    for y in range(0, H, 48):
        d.line([(0, y), (W, y)], fill=GRID)

    img = img.convert('RGBA')
    img.alpha_composite(glow((W, H), (150, 110), 420, CYAN, 0.16))
    img.alpha_composite(glow((W, H), (1080, 560), 380, VIOLET, 0.10))
    d = ImageDraw.Draw(img)

    d.rectangle([0, 0, W - 1, H - 1], outline=(30, 35, 48))
    d.rectangle([0, 0, W, 5], fill=CYAN)

    mark = Image.open(f'{OUT}/ordo-mark.png').resize((104, 104), Image.LANCZOS)
    img.alpha_composite(mark, (72, 64))

    d.text((196, 78), 'ORDO', font=inter('ExtraBold', 42), fill=TEXT)
    d.text((196, 128), 'RESEARCH  LAB', font=mono('Medium', 19), fill=CYAN)

    t = COPY[lang]
    # Headline is auto-fitted: Russian runs longer than English at the same point size.
    size = 54
    while size > 34 and max(d.textlength(l, font=inter('ExtraBold', size)) for l in t['head']) > W - 144:
        size -= 2
    y = 232
    for line in t['head']:
        d.text((72, y), line, font=inter('ExtraBold', size), fill=TEXT)
        y += size + 10

    y += 18
    for line in t['goal']:
        d.text((72, y), line, font=inter('Light', 25), fill=MUTED)
        y += 36

    # Measured results, because the claim above should arrive with evidence attached.
    bx, by, bw = 72, 468, 344
    for i, (val, lab, col) in enumerate(t['stats']):
        x = bx + i * (bw + 12)
        d.rounded_rectangle([x, by, x + bw, by + 84], 12, fill=(13, 15, 21), outline=(30, 35, 48))
        d.text((x + 18, by + 14), val, font=inter('Bold', 30), fill=col)
        d.text((x + 18, by + 54), lab, font=mono('Regular', 14), fill=DIM)

    d.text((72, 586), 'ordo-project.com', font=mono('Medium', 17), fill=MUTED)
    w = d.textlength('@ordoproject', font=mono('Medium', 17))
    d.text((W - 72 - w, 586), '@ordoproject', font=mono('Medium', 17), fill=CYAN)

    return img.convert('RGB')


COPY = {
    'en': {
        'head': ['Rewritable memory for frozen LLMs,', 'and the limit of long context.'],
        'goal': [
            'Making a local assistant that learns new documentation by diff instead of',
            'retraining — and knows which part of its context window actually works.',
        ],
        'stats': [
            ('0.0%', 'collateral damage, point edit', EMERALD),
            ('68.1%', 'memory over the retrieval bar', CYAN),
            ('3 heads', 'cause of context collapse', VIOLET),
        ],
    },
    'ru': {
        'head': ['Перезаписываемая память модели', 'и предел длинного контекста.'],
        'goal': [
            'Локальный ассистент, который принимает новую документацию дельтой,',
            'а не переобучением, и знает, какая часть окна контекста работает.',
        ],
        'stats': [
            ('0.0%', 'ущерба при точечной правке', EMERALD),
            ('68.1%', 'память выше планки поиска', CYAN),
            ('3 головы', 'причина обвала контекста', VIOLET),
        ],
    },
}

for lang in ('en', 'ru'):
    name = 'og-cover.png' if lang == 'en' else 'og-cover-ru.png'
    card(lang).save(f'{OUT}/{name}', optimize=True)
    print(name, 'ok')
