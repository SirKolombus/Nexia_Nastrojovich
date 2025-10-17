# 📝 Další kroky pro dokončení migrace

## ✅ Co je hotovo

1. ✅ Základní struktura projektu vytvořena
2. ✅ Package.json a závislosti sloučeny
3. ✅ Manifest.xml pro Nástrojovič vytvořen
4. ✅ Launcher obrazovka s výběrem nástrojů
5. ✅ Webpack konfigurace připravena
6. ✅ Soubory vzorkovače zkopírovány do src/sampler/
7. ✅ Soubory terminologie zkopírovány do src/terminologie/
8. ✅ Placeholder pro klientReq vytvořen
9. ✅ Sdílené utility a styly
10. ✅ README a instalační průvodce

## 🔧 Co je potřeba dodělat

### 1. Testování a první build

```bash
# Nainstalujte závislosti
npm install

# Vygenerujte certifikáty
npx office-addin-dev-certs install

# Spusťte dev server
npm run dev-server

# V novém terminálu - načtěte do Excelu
npm start
```

### 2. Opravy v kódu nástrojů

#### Sampler (src/sampler/sampler.js)
- [ ] Zkontrolujte cesty k assets (../../assets/ → ../assets/)
- [ ] Ověřte, že všechny funkce fungují
- [ ] Přidejte tlačítko "Zpět na launcher"

#### Terminologie (src/terminologie/terminologie.ts)
- [ ] Zkontrolujte import CSS souborů
- [ ] Ověřte cesty k datům (pokud jsou v samostatném souboru)
- [ ] Přidejte tlačítko "Zpět na launcher"

### 3. Navigace mezi nástroji

V každém nástroji (sampler, terminologie) přidejte tlačítko zpět:

```html
<button class="back-button" onclick="window.location.href='../launcher.html'">
    ← Zpět
</button>
```

A přidejte CSS:
```css
.back-button {
  position: fixed;
  top: 10px;
  left: 10px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  z-index: 1000;
}
```

### 4. Assets a ikony

Vytvořte nebo zkopírujte ikony do `assets/`:
- [ ] icon-16.png
- [ ] icon-32.png
- [ ] icon-64.png
- [ ] icon-80.png
- [ ] logo.png (pro launcher)

Můžete použít existující ikony z původních nástrojů nebo vytvořit nové.

### 5. Data pro terminologii

Pokud terminologie používá externí JSON soubor s daty:
```bash
cp Nástroje/nexia-terminologie/src/data/* src/terminologie/data/
```

A aktualizujte cesty v `terminologie.ts`.

### 6. Testování jednotlivých nástrojů

Po spuštění zkontrolujte:
- [ ] Launcher se správně zobrazuje
- [ ] Všechna tři tlačítka fungují
- [ ] Vzorkovač se načte a funguje
- [ ] Terminologie se načte a funguje
- [ ] Zpětná navigace funguje

### 7. Styling a UX vylepšení

- [ ] Sjednoťte barvy a styl napříč nástroji
- [ ] Přidejte loading stavy
- [ ] Přidejte error handling
- [ ] Přidejte notifikace pro uživatele

### 8. TypeScript konverze (volitelné)

Pokud chcete používat TypeScript všude:
```bash
# Přejmenujte .js soubory na .ts
mv src/sampler/sampler.js src/sampler/sampler.ts
mv src/klient/klient.js src/klient/klient.ts
mv src/launcher/launcher.js src/launcher/launcher.ts
```

A aktualizujte webpack entry points.

### 9. Produkční build a deployment

```bash
# Vytvořte produkční build
npm run build

# Výsledek bude v dist/ složce
```

Pro GitHub Pages deployment:
1. Aktualizujte `urlProd` v webpack.config.js
2. Spusťte build
3. Nahrajte dist/ na gh-pages branch

### 10. Dokumentace

- [ ] Přidejte komentáře do kódu
- [ ] Vytvořte uživatelskou příručku
- [ ] Zdokumentujte API funkcí
- [ ] Přidejte changelog

## 🐛 Známé problémy k vyřešení

1. **Cesty k assets:** Upravte z `../../assets/` na správnou relativní cestu
2. **Import shared utils:** V sampler.js a terminologie.ts přidejte:
   ```javascript
   import { showNotification } from '../shared/utils.js';
   ```
3. **CSS imports:** Ujistěte se, že webpack správně načítá CSS

## 📚 Užitečné příkazy

```bash
# Watch mode - automatické překompilování
npm run watch

# Kontrola manifestu
npm run validate

# Lint check
npm run lint

# Formátování kódu
npm run prettier
```

## 💡 Tipy

- **Vývoj:** Používejte `npm run dev-server` a `npm start` pro rychlé testování
- **Debugging:** Otevřete Developer Tools v Excel (F12) pro debug konzoli
- **Hot reload:** Změny v kódu vyžadují refresh add-inu v Excelu

## 🎯 Priorita úkolů

### Vysoká priorita
1. První build a testování
2. Oprava cest k assets
3. Testování navigace mezi nástroji

### Střední priorita
4. Přidání zpětných tlačítek
5. Sjednocení stylů
6. Error handling

### Nízká priorita
7. TypeScript konverze
8. Produkční deployment
9. Rozšířená dokumentace

---

## 🚀 Začněte zde

```bash
# 1. Nainstalujte závislosti
npm install

# 2. Certifikáty
npx office-addin-dev-certs install

# 3. Spusťte projekt
npm run dev-server

# 4. V novém terminálu
npm start
```

**Hodně štěstí s dokončením! 🎉**
