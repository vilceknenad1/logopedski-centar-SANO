// Generator strojno čitljivog cjenika (CSV + XML) – pokreće ga GitHub Actions svako jutro.
// Ručno: node cjenik/generiraj.mjs [--prisili]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const DIR = path.dirname(fileURLToPath(import.meta.url));

function izgradi(cfg, st, datum, vrijeme, prisili) {
  const slug = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, m => m === 'đ' ? 'd' : 'D').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const cs = n => Number(n).toFixed(2).replace('.', ',');
  const xs = n => Number(n).toFixed(2);
  const q = v => { v = String(v ?? ''); return /[;"\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
  const esc = v => String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const da = b => b ? 'da' : 'ne';
  const vrste = {
    usluge: {
      zag: ['naziv', 'maloprodajna_cijena', 'posebni_oblik_prodaje', 'naziv_posebnog_oblika_prodaje', 'sidrena_cijena'],
      red: u => [u.naziv, cs(u.cijena), da(u.posebni_oblik_prodaje), u.naziv_posebnog_oblika_prodaje || '', cs(u.sidrena)],
      xml: u => '  <usluga>\n    <naziv>' + esc(u.naziv) + '</naziv>\n    <maloprodajna_cijena>' + xs(u.cijena) + '</maloprodajna_cijena>\n    <posebni_oblik_prodaje>' + da(u.posebni_oblik_prodaje) + '</posebni_oblik_prodaje>\n    <naziv_posebnog_oblika_prodaje>' + esc(u.naziv_posebnog_oblika_prodaje || '') + '</naziv_posebnog_oblika_prodaje>\n    <sidrena_cijena>' + xs(u.sidrena) + '</sidrena_cijena>\n  </usluga>'
    },
    proizvodi: {
      zag: ['naziv', 'sifra', 'marka', 'jedinica_mjere', 'cijena_za_jedinicu_mjere', 'maloprodajna_cijena', 'posebni_oblik_prodaje', 'naziv_posebnog_oblika_prodaje', 'sidrena_cijena', 'barkod', 'dostupnost'],
      red: p => [p.naziv + ' (' + p.izdanje + ')', p.sifra, p.marka, p.jedinica_mjere, cs(p.cijena), cs(p.cijena), da(p.posebni_oblik_prodaje), p.naziv_posebnog_oblika_prodaje || '', cs(p.sidrena), p.barkod || '', p.dostupnost],
      xml: p => '  <proizvod>\n    <naziv>' + esc(p.naziv + ' (' + p.izdanje + ')') + '</naziv>\n    <sifra>' + esc(p.sifra) + '</sifra>\n    <marka>' + esc(p.marka) + '</marka>\n    <jedinica_mjere>' + esc(p.jedinica_mjere) + '</jedinica_mjere>\n    <cijena_za_jedinicu_mjere>' + xs(p.cijena) + '</cijena_za_jedinicu_mjere>\n    <maloprodajna_cijena>' + xs(p.cijena) + '</maloprodajna_cijena>\n    <posebni_oblik_prodaje>' + da(p.posebni_oblik_prodaje) + '</posebni_oblik_prodaje>\n    <naziv_posebnog_oblika_prodaje>' + esc(p.naziv_posebnog_oblika_prodaje || '') + '</naziv_posebnog_oblika_prodaje>\n    <sidrena_cijena>' + xs(p.sidrena) + '</sidrena_cijena>\n    <barkod>' + esc(p.barkod || '') + '</barkod>\n    <dostupnost>' + esc(p.dostupnost) + '</dostupnost>\n  </proizvod>'
    }
  };
  st = Object.assign({ broj: 0, otisak: {}, arhiva: [] }, st);
  const datoteke = {};
  for (const vrsta of ['usluge', 'proizvodi']) {
    const v = vrste[vrsta], o = cfg.objekti[vrsta], stavke = cfg[vrsta];
    const otisak = JSON.stringify(stavke.map(v.red));
    // proizvodi: svaki dan; usluge: samo kod promjene (ili prve objave)
    if (vrsta === 'usluge' && !prisili && st.otisak.usluge === otisak) continue;
    st.broj += 1; st.otisak[vrsta] = otisak;
    const ime = [o.oblik, o.adresa, o.oznaka, String(st.broj).padStart(4, '0'), datum, vrijeme].map(slug).join('_');
    const csv = '\ufeff' + [v.zag.join(';')].concat(stavke.map(s => v.red(s).map(q).join(';'))).join('\r\n') + '\r\n';
    const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<cjenik vrsta="' + vrsta + '" oblik_objekta="' + esc(o.oblik) + '" adresa_objekta="' + esc(o.adresa) + '" oznaka_objekta="' + esc(o.oznaka) + '" broj_pohrane="' + st.broj + '" datum="' + datum + '" vrijeme="' + vrijeme.replace('-', ':') + '" datum_sidrene_cijene="' + cfg.datum_sidrene_cijene + '" valuta="EUR">\n' + stavke.map(v.xml).join('\n') + '\n</cjenik>\n';
    datoteke['arhiva/' + ime + '.csv'] = csv; datoteke['arhiva/' + ime + '.xml'] = xml;
    datoteke[vrsta + '.csv'] = csv; datoteke[vrsta + '.xml'] = xml;
    st.arhiva.unshift({ vrsta, broj: st.broj, datum, vrijeme, csv: ime + '.csv', xml: ime + '.xml' });
  }
  // arhiva: zadnja objava svake vrste ostaje uvijek; ostalo 31 dan
  const granica = new Date(Date.parse(datum + 'T00:00:00Z') - 31 * 864e5).toISOString().slice(0, 10);
  const zadnje = new Set(['usluge', 'proizvodi'].map(v => (st.arhiva.find(a => a.vrsta === v) || {}).csv));
  const obrisi = st.arhiva.filter(a => a.datum < granica && !zadnje.has(a.csv));
  st.arhiva = st.arhiva.filter(a => !obrisi.includes(a));
  datoteke['arhiva.json'] = JSON.stringify(st.arhiva, null, 1) + '\n';
  return { datoteke, st, obrisi: obrisi.flatMap(a => ['arhiva/' + a.csv, 'arhiva/' + a.xml]) };
}

const cfg = JSON.parse(fs.readFileSync(path.join(DIR, 'cjenik.json'), 'utf8'));
const stPut = path.join(DIR, 'stanje.json');
const st = fs.existsSync(stPut) ? JSON.parse(fs.readFileSync(stPut, 'utf8')) : {};
const d = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Zagreb', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).map(x => [x.type, x.value]));
const r = izgradi(cfg, st, d.year + '-' + d.month + '-' + d.day, d.hour + '-' + d.minute, process.argv.includes('--prisili'));
fs.mkdirSync(path.join(DIR, 'arhiva'), { recursive: true });
for (const [f, c] of Object.entries(r.datoteke)) fs.writeFileSync(path.join(DIR, f), c);
for (const f of r.obrisi) fs.rmSync(path.join(DIR, f), { force: true });
fs.writeFileSync(stPut, JSON.stringify(r.st, null, 1) + '\n');
console.log('Objavljeno:', Object.keys(r.datoteke).filter(f => f.startsWith('arhiva/')).join(', ') || 'nema promjena');
