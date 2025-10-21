# Deployment na GitHub Pages

## ✅ Co jsem udělal:

1. **Vytvořil GitHub Actions workflow** (`.github/workflows/deploy.yml`)
   - Automaticky builduje projekt při push do main
   - Nahrává výsledek na GitHub Pages

2. **Upravil `manifest.xml`** pro produkční použití
   - Všechny URL změněny z `https://localhost:3000` na `https://sirkolombus.github.io/Nexia_Nastrojovich`

3. **Vytvořil `manifest-localhost.xml`** pro lokální vývoj
   - Zachovává původní localhost URL
   - Přidán název "(LOCAL)" pro rozlišení

## 🚀 Jak nasadit:

### 1. Povolte GitHub Pages v repozitáři:
1. Jdi na GitHub: https://github.com/SirKolombus/Nexia_Nastrojovich
2. **Settings** → **Pages**
3. V **Source** vyber: **Deploy from a branch**
4. V **Branch** vyber: **gh-pages** a **/ (root)**
5. Klikni **Save**

### 2. Pushni změny:
```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

### 3. Počkej na deploy:
- Jdi na **Actions** tab na GitHubu
- Uvidíš workflow "Deploy to GitHub Pages"
- Po dokončení bude add-in dostupný na: `https://sirkolombus.github.io/Nexia_Nastrojovich/`

### 4. Nainstaluj produkční verzi do Excelu:
1. V Excelu: **Insert** → **Add-ins** → **My Add-ins** → **Upload My Add-in**
2. Vyber soubor `manifest.xml` (ne localhost verzi!)
3. Add-in se bude načítat z GitHub Pages

## 🛠️ Pro lokální vývoj:

Pokud chceš vyvíjet lokálně, použij:
```bash
npm run start
```
A nahraj `manifest-localhost.xml` do Excelu (místo `manifest.xml`).

## 📝 Poznámky:
- GitHub Pages se aktualizuje automaticky při každém push do main
- První build může trvat pár minut
- URL projektu: `https://sirkolombus.github.io/Nexia_Nastrojovich/`
