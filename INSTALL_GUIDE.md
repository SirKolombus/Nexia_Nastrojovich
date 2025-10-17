# 🚀 Instalační průvodce - Nástrojovič

Tento dokument obsahuje detailní kroky pro nastavení a spuštění projektu **Nástrojovič**.

## 📋 Obsah

1. [Předpoklady](#předpoklady)
2. [Instalace závislostí](#instalace-závislostí)
3. [Generování certifikátů](#generování-certifikátů)
4. [Spuštění projektu](#spuštění-projektu)
5. [Testování v Excelu](#testování-v-excelu)
6. [Řešení problémů](#řešení-problémů)

---

## 1. Předpoklady

Před instalací se ujistěte, že máte nainstalované:

- ✅ **Node.js** (verze 18 nebo novější) - [Stáhnout zde](https://nodejs.org/)
- ✅ **NPM** (obvykle součástí Node.js)
- ✅ **Microsoft Excel** (desktop verze nebo Microsoft 365)
- ✅ **Git** (volitelné, pro klonování repozitáře)

### Ověření instalace

Otevřete terminál a spusťte:

```bash
node --version   # Mělo by zobrazit v18.x.x nebo vyšší
npm --version    # Mělo by zobrazit verzi npm
```

---

## 2. Instalace závislostí

### Krok 1: Přejděte do složky projektu

```bash
cd /Users/kolombus_mac/Documents/GitHub/Nexia_Nastrojovich
```

### Krok 2: Nainstalujte NPM balíčky

```bash
npm install
```

Tento příkaz nainstaluje všechny závislosti uvedené v `package.json`:
- Office.js API
- Webpack a buildovací nástroje
- Babel pro transpilaci
- TypeScript podporu
- A další...

⏱️ **Doba trvání:** Cca 2-5 minut (závisí na rychlosti připojení)

---

## 3. Generování certifikátů

Pro lokální vývoj Office Add-inů potřebujete HTTPS certifikát.

### Krok 1: Generujte a nainstalujte certifikát

```bash
npx office-addin-dev-certs install
```

### Krok 2: Potvrzení

- Na **macOS**: Možná budete muset zadat heslo administrátora
- Na **Windows**: Potvrďte instalaci certifikátu

✅ **Výsledek:** Certifikát je nainstalován a důvěryhodný pro `localhost`

---

## 4. Spuštění projektu

### Krok 1: Spusťte development server

```bash
npm run dev-server
```

✅ **Co se stane:**
- Webpack začne buildovat projekt
- Development server běží na `https://localhost:3000`
- Soubory se automaticky překompilují při změnách

### Krok 2: Otevřete prohlížeč (volitelné)

Můžete zkusit otevřít:
```
https://localhost:3000/launcher.html
```

> **Poznámka:** Pokud vidíte varování ohledně certifikátu, je to normální pro lokální vývoj.

---

## 5. Testování v Excelu

### Metoda A: Automatické načtení (doporučeno)

V **NOVÉM terminálu** (nechte dev-server běžet):

```bash
npm start
```

✅ **Co se stane:**
- Excel se otevře automaticky
- Add-in "Nástrojovič" se načte (sideload)
- V pásu karet Excelu by se měla objevit sekce "Nexia Nástroje"

### Metoda B: Manuální načtení

1. Otevřete Excel
2. Jděte do **Vložit** → **Doplňky** → **Moje doplňky**
3. Klikněte na **Spravovat mé doplňky**
4. Vyberte **Nahrát vlastní doplněk**
5. Najděte a vyberte soubor `manifest.xml` v kořenové složce projektu

---

## 6. Použití Nástrojovič

### Spuštění

1. V Excelu klikněte na **Nexia Nástroje** → **Nástrojovič**
2. Otevře se boční panel s úvodní obrazovkou
3. Vyberte jeden ze tří nástrojů:
   - 📊 **Potřebuji vzorek** - Auditní vzorkovač
   - 📚 **Něco potřebuji zjistit** - Terminologie
   - 🔍 **Prověrka klienta** - (v přípravě)

---

## 7. Řešení problémů

### Problém: "npm install" selhává

**Řešení:**
```bash
# Smažte node_modules a zkuste znovu
rm -rf node_modules
rm package-lock.json
npm install
```

### Problém: Certifikát není důvěryhodný

**Řešení:**
```bash
# Odinstalujte a znovu nainstalujte certifikát
npx office-addin-dev-certs uninstall
npx office-addin-dev-certs install
```

### Problém: Excel nečte add-in

**Řešení:**
1. Zavřete všechny instance Excelu
2. Smažte cache:
   ```bash
   # macOS
   rm -rf ~/Library/Containers/com.microsoft.Excel/Data/Library/Caches/
   
   # Windows
   %LocalAppData%\Microsoft\Office\16.0\Wef
   ```
3. Restartujte Excel a zkuste `npm start` znovu

### Problém: Port 3000 je obsazený

**Řešení:**
```bash
# Najděte proces na portu 3000
lsof -ti:3000

# Zastavte proces (nahraďte PID číslem z předchozího příkazu)
kill -9 <PID>

# Nebo změňte port v package.json:
# "config": { "dev_server_port": 3001 }
```

### Problém: Webpack build selhává

**Řešení:**
```bash
# Zkuste čistý build
npm run build:dev

# Pokud problém přetrvává, zkontrolujte logy
```

---

## 8. Další příkazy

```bash
# Zastavení add-inu v Excelu
npm stop

# Validace manifestu
npm run validate

# Produkční build
npm run build

# Kontrola kódu
npm run lint

# Oprava lint chyb
npm run lint:fix
```

---

## 9. Struktura po instalaci

Po úspěšné instalaci byste měli mít:

```
✅ node_modules/          # Všechny závislosti
✅ dist/                  # Build output (po prvním buildu)
✅ Certifikáty            # Nainstalované v systému
✅ Excel add-in           # Načtený v Excelu
```

---

## 10. Kontakt a podpora

- **Autor:** Tomáš Pavlovič
- **GitHub:** [Nexia_Nastrojovich](https://github.com/SirKolombus/Nexia_Nastrojovich)
- **Issues:** [Nahlásit problém](https://github.com/SirKolombus/Nexia_Nastrojovich/issues)

---

## ✨ Hotovo!

Pokud jste úspěšně dokončili všechny kroky, měl by vám Nástrojovič fungovat v Excelu! 🎉

**Další kroky:**
- Prozkoumejte jednotlivé nástroje
- Upravte kód podle potřeby
- Přidejte vlastní funkce

Hodně štěstí! 🚀
