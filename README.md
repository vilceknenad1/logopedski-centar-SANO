# Logopedski centar SANO

Statična web stranica (HTML + JS, bez buildanja). Verzija v4.

## GitHub Pages

1. Napravi repozitorij i prenesi **sav sadržaj ovog foldera u korijen repozitorija** (ne sam folder).
2. Settings → Pages → Source: `Deploy from a branch`, Branch `main`, folder `/ (root)`.
3. Datoteka `.nojekyll` mora biti u korijenu — bez nje Jekyll ignorira neke datoteke.

Ako uploadaš preko GitHub weba, limit je 100 datoteka po commitu:

- **1. commit** — 15 datoteka iz korijena (svi `.html`, `support.js`, `image-slot.js`, `README.md`, `robots.txt`, `sitemap.xml`, `.nojekyll`).
- **2. commit** — folder `uploads` (85 datoteka, uključujući 9 u `uploads/ikone3`).

Ako Windows skriva `.nojekyll`, napravi je u GitHubu: Add file → Create new file → naziv `.nojekyll` → Commit.

## Stranice

| Datoteka | Sadržaj |
| --- | --- |
| `index.html` | Naslovnica |
| `logopedska-dijagnostika.html` | Usluga · dijagnostika |
| `logopedska-terapija.html` | Usluga · terapija |
| `logopedsko-savjetovanje.html` | Usluga · savjetovanje |
| `ana-bilic-topic.html` | Profil · Ana Bilić Topić |
| `zrinka-vrljic.html` | Profil · Zrinka Vrljić |
| `lana-rozic.html` | Profil · Lana Rozić |
| `materijali.html` | Materijali i Jezična penjalica |
| `recenzije.html` | Recenzije roditelja |
| `404.html` | GitHub Pages je servira automatski |

`support.js`, `image-slot.js` i folder `uploads/` moraju ostati uz HTML datoteke.

## Slike

Sve slike imaju ASCII nazive (bez razmaka, dijakritika i ćirilice) jer GitHub Pages ne servira pouzdano ostale. Fotografije veće od 200 KB konvertirane su u WebP (max 1600 px, kvaliteta 82), pa je najveća datoteka ~300 KB — daleko ispod GitHub limita (50 MB upozorenje, 100 MB zabrana). Ukupno ~5 MB.

## Blog

Blog stranice su uklonjene iz ove verzije. Ako se vrate, dodaj `blog*.html` i nove `<url>` unose u `sitemap.xml`.

## Produkcijska domena

Kanonske adrese, Open Graph poveznice, `sitemap.xml` i `robots.txt` koriste `https://www.logopedski-centar-sano.hr`. Kad domena bude potvrđena, napravi globalni find & replace tog niza u svim `.html` datotekama te u `robots.txt` i `sitemap.xml`. Za custom domenu dodaj i datoteku `CNAME` sa samom domenom u prvom redu.

## Analitika

GA4 i Google Search Console nisu postavljeni. U `<head>` svake stranice stoji `TODO(analitika)` komentar na mjestu gdje skripta i verifikacijska meta oznaka idu.

## Kontakt u kodu

- Obrazac i FAB šalju mail na `udruga.prosano@gmail.com`
- Obavijest o tiskanim materijalima prikazuje se pri prvom otvaranju; zatvaranje se pamti pod ključem `sano-notice-tisak-2026-08` u `localStorage`. Za novu sezonu promijeni tekst i ključ.
