# Logopedski centar SANO

Statična web stranica (HTML + JS, bez buildanja). Hostanje na GitHub Pages: Settings → Pages → Branch `main`, folder `/ (root)`.

## Upload preko GitHub weba (limit 100 datoteka po commitu)

1. **Root** — prevuci 17 datoteka iz korijena zipa (svi `.html`, `support.js`, `image-slot.js`, `README.md`, `.nojekyll`).
2. **uploads** — otvori upload ponovno i prevuci samo folder `uploads` (88 datoteka: 79 + 9 u `ikone3`).

Ako Windows skriva `.nojekyll`, napravi je u GitHubu: Add file → Create new file → naziv `.nojekyll` → Commit.

## Stranice

| Datoteka | Sadržaj |
| --- | --- |
| `index.html` | Naslovnica (hero, signali, usluge, cjenik, Jezična penjalica, tim, blog, recenzije, kontakt) |
| `logopedska-dijagnostika.html` | Usluga · logopedska dijagnostika |
| `logopedska-terapija.html` | Usluga · logopedska terapija |
| `logopedsko-savjetovanje.html` | Usluga · logopedsko savjetovanje |
| `ana-bilic-topic.html` | Profil · Ana Bilić Topić |
| `zrinka-vrljic.html` | Profil · Zrinka Vrljić |
| `lana-rozic.html` | Profil · Lana Rozić |
| `materijali.html` | Web trgovina · tiskani i digitalni materijali |
| `blog.html` – `blog4.html` | Blog članci |
| `recenzije.html` | Recenzije roditelja |

`support.js`, `image-slot.js` i folder `uploads/` moraju ostati uz HTML datoteke.

## Napomene o slikama

Sve slike imaju ASCII nazive (bez razmaka i dijakritika) jer GitHub Pages ne servira pouzdano ostale. Veće fotografije su konvertirane u WebP (max 1400px) radi brzine i limita uploada.

## Kontakt u kodu

- Obrazac i FAB šalju mail na `udruga.prosano@gmail.com`
- Obavijest o slanju tiskanih materijala prikazuje se pri prvom otvaranju; zatvaranje se pamti pod ključem `sano-notice-tisak-2026-08` u `localStorage`. Za novu sezonu promijenite tekst i ključ.
