# Cjenik i sidrene cijene

## Promjena cijene
1. U `cjenik/cjenik.json` promijenite samo `"cijena"`. `"sidrena"` ostaje cijena s 10. 9. 2026.
2. Istu cijenu promijenite i na stranici (početna: cjenik usluga; Materijali: popis proizvoda). Redak „Cijena na 10. 9. 2026.“ ostaje isti.
3. Spremite na GitHub. Nova objava CSV/XML pokreće se sama i dobiva novi broj pohrane.

## Automatska objava
- `.github/workflows/cjenik.yml` svako jutro oko 6 h pokreće `cjenik/generiraj.mjs`.
- Proizvodi se objavljuju svaki dan, usluge samo kad se promijene.
- Stalne adrese: `cjenik/usluge.csv|xml`, `cjenik/proizvodi.csv|xml`. Arhiva: `cjenik/arhiva/` (31 dan).
- Na GitHubu: Settings → Actions → General → Workflow permissions → „Read and write“.

## Prije 17. 11. 2026. provjeriti
- `objekti.*.oznaka` (sada PP1 i WEB1) zamijeniti stvarnom oznakom poslovnog prostora / prodajnog mjesta.

## Tekst za Payhip (u opis svakog proizvoda)
Cijena na 10. 9. 2026.: XX,XX €
