# Nástrojovič - Nexia

Univerzální Office Add-in pro Nexia nástroje - **Vzorkovač**, **Terminologie** a **Prověrka klienta**.

## 🎯 Co je Nástrojovič?

Nástrojovič je integrovaný Excel Add-in, který spojuje tři samostatné auditní nástroje pod jednu střechu. Po spuštění se zobrazí úvodní obrazovka s otázkou **"Co potřebuji?"** a třemi možnostmi:

### 🔧 Nástroje

1. **Potřebuji vzorek** (Auditní vzorkovač)
   - Náhodný výběr vzorků pro TVS a testy kontrol
   - Podpora různých metod vzorkování
   - Automatické výpočty velikosti vzorku

2. **Něco potřebuji zjistit** (Auditní terminologie)
   - Vyhledávání auditních pojmů a definic
   - Procházení terminologie podle kategorií
   - Související termíny a příklady

3. **Prověrka klienta** (Prověrka požadavků)
   - Nástroj pro prověření požadavků klienta
   - *(v přípravě)*

## 📁 Struktura projektu

```
Nexia_Nastrojovich/
├── src/
│   ├── launcher/          # Úvodní obrazovka s výběrem nástroje
│   ├── sampler/           # Auditní vzorkovač
│   ├── terminologie/      # Terminologie
│   ├── klient/            # Prověrka klienta
│   ├── shared/            # Společné utility a styly
│   └── commands/          # Office commands
├── assets/                # Obrázky a ikony
├── Nástroje/              # Původní samostatné nástroje (archiv)
├── manifest.xml           # Office Add-in manifest
├── package.json           # NPM závislosti
└── webpack.config.js      # Build konfigurace
```

## 🚀 Instalace a spuštění

### Předpoklady
- Node.js (doporučeno v18+)
- NPM nebo Yarn
- Microsoft Excel (desktop nebo online)

### Postup

1. **Nainstalujte závislosti:**
   ```bash
   npm install
   ```

2. **Vygenerujte certifikáty pro lokální vývoj:**
   ```bash
   npx office-addin-dev-certs install
   ```

3. **Spusťte development server:**
   ```bash
   npm run dev-server
   ```

4. **Načtěte add-in do Excelu:**
   ```bash
   npm start
   ```

## 🛠️ Dostupné skripty

- `npm run build` - Produkční build
- `npm run build:dev` - Development build
- `npm run dev-server` - Spustí webpack dev server
- `npm start` - Načte add-in do Excelu (sideload)
- `npm stop` - Odebere add-in z Excelu
- `npm run validate` - Validuje manifest.xml
- `npm run lint` - Kontrola kódu
- `npm run lint:fix` - Oprava lint chyb

## 📝 Vývoj

### Přidání nové funkce

1. Upravte příslušný nástroj v `src/[nazev-nastroje]/`
2. Pro sdílené funkce použijte `src/shared/`
3. Otestujte změny přes `npm run dev-server`
4. Vytvořte produkční build přes `npm run build`

### Struktura jednotlivých nástrojů

Každý nástroj obsahuje:
- `*.html` - HTML šablona
- `*.js` - JavaScript logika
- `*.css` - Styly (volitelně)

## 🎨 Launcher

Launcher je vstupní bod aplikace. Zobrazuje tři hlavní tlačítka pro výběr nástroje a zajišťuje navigaci mezi jednotlivými moduly.

## 📦 Build a deployment

### Lokální build
```bash
npm run build
```

Build vytvoří `dist/` složku s produkčními soubory.

### GitHub Pages deployment
1. Aktualizujte `urlProd` v `webpack.config.js`
2. Spusťte `npm run build`
3. Nahrajte obsah `dist/` na GitHub Pages

## 🔧 Technologie

- **Office.js** - Office JavaScript API
- **Webpack 5** - Bundling a build
- **Babel** - Transpilace ES6+
- **Fluent UI** - Microsoft design system
- **TypeScript** - Volitelná podpora

## 👨‍💻 Autor

**Tomáš Pavlovič**  
Vyvinuto pomocí AI (GPT-5)

## 📄 Licence

MIT License - viz [LICENSE](LICENSE)

## 🐛 Problémy a podpora

Pro hlášení chyb nebo návrhy použijte [GitHub Issues](https://github.com/SirKolombus/Nexia_Nastrojovich/issues).

---

© 2025 Nexia | Všechna práva vyhrazena
