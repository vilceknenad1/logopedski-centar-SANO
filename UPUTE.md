# Ažuriranje "brzina" – što učitati na GitHub

Učitaj SADRŽAJ ove mape u korijen repozitorija (prepiši postojeće datoteke).
Najlakše: na GitHubu otvori repozitorij → Add file → Upload files → povuci sve mape
i datoteke iz ove mape odjednom → Commit changes.

Što je promijenjeno:
- 11 HTML stranica: fontovi i skripte se učitavaju ranije i ne blokiraju prikaz
- index.html: responzivne slike (srcset) za hero, "O nama", "Metode", "Recenzije"
- images/: ~50 slika smanjeno na stvarnu prikazanu veličinu (izgled isti)
- NOVO vendor/: React se sada učitava s vlastite domene umjesto s unpkg.com
- NOVE slike: *-640, *-800, *-1080 verzije velikih fotografija

Nakon objave pričekaj ~10 minuta (GitHub keš) i ponovno pokreni PageSpeed.
