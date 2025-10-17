/**
 * Terminology data structure for financial audit add-in
 */

export interface TerminologyEntry {
  id: string;
  term: string;
  definition: string;
  description?: string;
  examples?: string[];
  relatedTerms?: string[];
  category: string;
  subcategory?: string;
}

export interface TerminologyCategory {
  id: string;
  name: string;
  subcategories?: TerminologySubcategory[];
  entries?: TerminologyEntry[];
}

export interface TerminologySubcategory {
  id: string;
  name: string;
  entries: TerminologyEntry[];
}

export interface TerminologyTree {
  categories: TerminologyCategory[];
}

// Sample terminology data for financial auditing
export const terminologyData: TerminologyTree = {
  categories: [
    { //důlezžité odkazy na firmě - cca hotovo
      id: "basic-links",
      name: "Důležité odkazy",
      entries: [
        {
          id: "webs",
          term: "Důležité weby",
          definition: "Nejsvatější weby co můžou být",
          examples: [
            "Nexia - https://nexiaap.cz/",
            "KAČR - https://www.kacr.cz/",
            "Kočkopes - https://www.youtube.com/watch?v=xsQo9Z1V8L8",
            "Pondělní nálady - https://www.facebook.com/reel/1199968667695826",
          ],
          category: "basic-links"
        },
        {
          id: "metodika",
          term: "Metodika 2025-2026",
          definition: "Uložiště všech důležitých podkladů co máme -od interní metodiky, přes šablony až po návody s nástroji.",
          examples: [
              "Odkaz na sharepoint: https://nexiaprague.sharepoint.com/:f:/s/SHP_D1/EidzB_6faIxPnQi6FDX8lzcBKCcv1uw_I39cSACuOBNXOA?e=sXfqpS"
            ],
            category: "basic-links"
        },
        {
          id:"nastroje",
          term: "Kontrolní weby",
          definition: "Základní weby které používáme při kontrole",
          examples: [
            "Kontrola subjektů: https://ares.gov.cz/",
            "Kontrola právnických osob: https://or.justice.cz/ias/ui/rejstrik",
            "Kontrola katastru nemovitostí: https://nahlizenidokn.cuzk.gov.cz/",
            "Kontrola skutečných majitelů: https://esm.justice.cz/ias/issm/rejstrik" 
          ],
          category: "basic-links"
        },
        {
          id: "law",
          term: "Zákony a vyhlášky",
          definition: "Odkazy na nejčastější zákony a vyhlášky používané při auditech",
          examples: [
            "Zákon o auditorech: https://www.zakonyprolidi.cz/cs/2009-93",
            "Zákon o účetnictví: https://www.zakonyprolidi.cz/cs/1991-563",
            "Občanský zákoník: https://www.zakonyprolidi.cz/cs/2012-89",
            "Zákon o daních z příjmů: https://www.zakonyprolidi.cz/cs/1992-586",
            "Zákon o DPH: https://www.zakonyprolidi.cz/cs/2004-235",
            "Zákon o rezervách pro zjištění základu daně z příjmů: https://www.zakonyprolidi.cz/cs/1992-593",
            "Vyhláška č. 500/2002 Sb.: https://www.zakonyprolidi.cz/cs/2002-500",
            "Vyhláška č. 501/2002 Sb.: https://www.zakonyprolidi.cz/cs/2002-501",
            "Vyhláška č. 410/2009 Sb.: https://www.zakonyprolidi.cz/cs/2009-410",
          ],
          category: "basic-links"
        },
      ],
    },
    { //doplnit definice doplnit ISAE 3000 atd.
      id: "contract",
      name: "Zakázky",
      subcategories: [
        {
          id: "contract-types",
          name: "Typy zakázek",
          entries: [
            {
              id: "basic-audit",
              term: "Audit",
              definition: "Povinným auditem se rozumí ověření účetní závěrky (konsolidované účetní závěrky), zda podává věrný a poctivý obraz předmětu účetnictví podle příslušného rámce účetního výkaznictví.” (§ 2 pís. a) Zákon o auditorech - 93/2009 Sb.).",
              description: "Typicky jej vyžaduje zákon o účetnictví, zákon o obchodních korporacích nebo stanovy společnosti. Auditem se rozumí i ověření konsolidované účetní závěrky. Audit může být také na základě smlouvy (tzv. dobrovolný audit).",
              category: "contracts",
              subcategory: "contract-types"
            },
            {
              id: "prezkum",
              term: "Přezkum hospodaření",
              definition: "Přezkoumávání hospodaření územních samosprávných celků a dobrovolných svazků obcí (dále jen územní celek) či jejich zřízených příspěvkových organizací zahrnuje zkoumání ročního hospodaření uvedeného v závěrečném účtu a dalších vyjmenovaných oblastí.” (§ 1-2 Zákon č. 420/2004 Sb.)",
              description: "Přezkum hospodaření se zaměřuje na posouzení, zda územní celek hospodaří v souladu s právními předpisy a zda jsou jeho výdaje a příjmy v souladu s rozpočtem. Činnost provádí buď vládní orgán kontroly či externí auditor.",
              category: "contracts",
              subcategory: "contract-types"
            },
          ],
        },
      ],
    },
    { //Účetní minimum -za mě hotovo
      id: "basic-acc",
      name: "Účetní minimum", // t
      subcategories: [
        {
          id: "basic-acc-basics",
          name: "Základní terminologie",
          entries: [
            {
              id: "basic-acc-basics-akt",
              term: "Aktiva",
              definition: "Všechna aktiva, která společnost vlastní. Suma aktiv je rovna součtu vlastního kapitálu a pasiv ÚJ.",
              description: "Aktiva zahrnují hotovost, pohledávky, zásoby, nemovitosti a další majetek.",
              category: "basic-acc",
              subcategory: "basic-acc-basics"
            },
            {
              id: "basic-acc-basics-pas",
              term: "Pasiva",
              definition: "Všechny závazky a dluhy společnosti.",
              description: "Pasiva zahrnují půjčky, závazky vůči dodavatelům, daně a další finanční povinnosti. Nedílnou součástí pasiv je i vlastní kapitál.",
              category: "basic-acc",
              subcategory: "basic-acc-basics"
            },
            {
              id: "basic-acc-basics-vk",
              term: "Vlastní kapitál",
              definition: "Částka, kterou vlastníci investovali do společnosti, plus zisky, které společnost reinvestovala.",
              description: "Vlastní kapitál zahrnuje základní kapitál, emisní ážio a nerozdělený zisk.",
              category: "basic-acc",
              subcategory: "basic-acc-basics"
            },
            {
              id: "basic-acc-basics-zk",
              term: "Základní kapitál",
              definition: "Počáteční investice vlastníků do společnosti.",
              description: "Základní kapitál je uveden v zakladatelské smlouvě nebo stanovách společnosti.",
              category: "basic-acc",
              subcategory: "basic-acc-basics"
            },
            {
              id: "basic-acc-basics-vn",
              term: "Výnosy a náklady",
              definition: "Výnosy představují příjmy společnosti z její hlavní činnosti, zatímco náklady jsou výdaje spojené s provozem společnosti.",
              description: "Výnosy zahrnují tržby z prodeje zboží nebo služeb, zatímco náklady zahrnují náklady na materiál, mzdy, nájem a další provozní výdaje.",
              category: "basic-acc",
              subcategory: "basic-acc-basics"
            },
            {
              id: "basic-acc-basics-bl",
              term: "Bilanční suma",
              definition: "Celková hodnota aktiv nebo pasiv společnosti.",
              description: "Bilanční suma je vždy stejná na straně aktiv i pasiv, což odráží základní účetní rovnost: Aktiva = Pasiva + Vlastní kapitál.",
              category: "basic-acc",
              subcategory: "basic-acc-basics"
            },
            {
              id: "basic-acc-basics-uj",
              term: "Účetní jednotka",
              definition: "Subjekt, pro který jsou vedeny účetní záznamy - mnohdy používáme při popisování transakce auditované osoby.",
              description: "Účetní jednotkou může být fyzická osoba, právnická osoba nebo jiný subjekt, který má povinnost vést účetnictví podle zákona.",
              category: "basic-acc",
              subcategory: "basic-acc-basics"
            },
            {
              id: "basic-acc-basics-uo",
              term: "Účetní období",
              definition: "Časové období, za které jsou sestavovány účetní závěrky.",
              description: "Účetní období je obvykle jeden rok, ale může být i kratší (např. čtvrtletí nebo pololetí) v závislosti na potřebách účetní jednotky. Účetní období nemusí nutně souhlasit na kalendářní období - v tomto případě hovoříme o hospodářském roce.",
              category: "basic-acc",
              subcategory: "basic-acc-basics",
              examples: [
                "Kalendářní rok - účetní období od 1. ledna do 31. prosince",
                "Hospodářský rok - účetní období, které nezačíná 1. ledna a nekončí 31. prosince (např. od 1. dubna do 31. března následujícího roku)",
                "Účetní období v závislosti na přeměně společnosti - může být kratší či delší než 12 měsíců"
              ],
            },
            {
              id: "basic-acc-basics-ud",
              term: "Účetní doklad",
              definition: "Dokument, který zaznamenává finanční transakci.",
              description: "Účetní doklad je základním prvkem účetnictví a slouží jako důkaz o provedení transakce. Dělíme na vnitřní (účetní jednotkou vystavené) a vnější (doklady přijaté od jiných ekonomických subjektů).",
              category: "basic-acc",
              subcategory: "basic-acc-basics",
              examples: [
                "Faktura - doklad o prodeji zboží nebo služeb; dělíme na přijaté a vydané",
                "Pokladní doklad - doklad o hotovostní transakci; příjmový nebo výdajový",
                "Bankovní výpis - doklad o transakcích na bankovním účtu ekonomického subjektu",
                "Interní doklad - doklad vystavený účetní jednotkou pro interní potřeby (např. převod mezi účty, zařazení či vyřazení majetku či oprava účetních zápisů)",
                "Mzdový list - doklad o mzdových nákladech a odvodech zaměstnanců",
                "Skladový doklad - doklad o pohybu zásob na skladě (příjem, výdej, převod)"
              ],
            },
          ],
        },
        {  
          id: "basic-acc-vykaz",
          name: "Výkazy a zprávy",
          entries: [
            {
              id: "basic-acc-vykaz-vykaznictvi",
              term: "Výkaznictví",
              definition: "Proces sestavování a prezentace finančních výkazů.",
              description: "Výkaznictví zahrnuje přípravu rozvahy, výkazu zisku a ztráty, přehledu o peněžních tocích a dalších finančních zpráv podle platných účetních standardů které poskytují informace o finanční situaci a výkonnosti společnosti - k vybranému datu nebo za určité období.",
              category: "basic-acc",
              subcategory: "basic-acc-vykaz"
            },
            {
              id: "basic-acc-vykaz-roz",
              term: "Rozvaha",
              definition: "Finanční výkaz, který poskytuje přehled o aktivech, pasivech a vlastním kapitálu společnosti k určitému datu.",
              description: "Rozvaha je rozdělena na dvě části: aktiva na jedné straně a pasiva plus vlastní kapitál na druhé straně. Celková hodnota aktiv musí být vždy rovna součtu pasiv a vlastního kapitálu. Vykazované hodnoty nemusí nutně být v účetním formátu, účetní jednotka si stanoví jednotku výkaznictví - v tis. Kč, set tisíc Kč atd.",
              category: "basic-acc",
              subcategory: "basic-acc-vykaz"
            },
            {
              id: "basic-acc-vykaz-vzz",
              term: "Výkaz zisku a ztráty",
              definition: "Finanční výkaz, který shrnuje výnosy, náklady a zisk nebo ztrátu společnosti za určité období.",
              description: "Výkaz zisku a ztráty poskytuje informace o tom, jak efektivně společnost generuje zisk ze svých operací. Výkaz může být sestaven ve formátu přehledném nebo kalkulačním.",
              category: "basic-acc",
              subcategory: "basic-acc-vykaz"
            },
            {
              id: "basic-acc-vykaz-cf",
              term: "Přehled o peněžních tocích",
              definition: "Finanční výkaz, který ukazuje příjmy a výdaje peněžních prostředků společnosti za určité období.",
              description: "Přehled o peněžních tocích je rozdělen do tří částí: provozní činnost, investiční činnost a finanční činnost. Tento výkaz pomáhá porozumět, jak společnost generuje a využívá peněžní prostředky.",
              examples: [
                "Přímá metoda - prostředky jsou sestaveny podle pohybů na bankovních účtech",
                "Nepřímá metoda - prostředky jsou sestaveny podle zisku a ztráty a úprav o nepeněžní operace"
              ],
              category: "basic-acc",
              subcategory: "basic-acc-vykaz"
            },
            {
              id: "basic-acc-vykaz-att",
              term: "Příloha účetní závěrky",
              definition: "Doplňující informace k účetní závěrce, které poskytují podrobnosti o jednotlivých položkách ve výkazech.",
              description: "Příloha účetní závěrky obsahuje informace o účetních metodách, významných událostech po datu účetní závěrky, podrobnosti o dlouhodobém majetku, závazcích, vlastním kapitálu a další relevantní informace.",
              category: "basic-acc",
              subcategory: "basic-acc-vykaz"
            },
            {
              id: "basic-acc-vykaz-vz",
              term: "Výroční zpráva",
              definition: "Komplexní zpráva, která shrnuje finanční a provozní výsledky společnosti za uplynulý rok.",
              description: "Výroční zpráva obvykle obsahuje finanční výkazy, zprávu o činnosti, zprávu auditora a další informace o strategii a plánech společnosti.",
              category: "basic-acc",
              subcategory: "basic-acc-vykaz"
            },
            {
              id: "basic-acc-vykaz-ud",
              term: "Účetní závěrka",
              definition: "Souhrn finančních výkazů společnosti, který poskytuje přehled o její finanční situaci a výkonnosti za určité období.",
              description: "Účetní závěrka zahrnuje rozvahu, výkaz zisku a ztráty, přehled o peněžních tocích a přílohu účetní závěrky. Účetní závěrka musí být sestavena v souladu s platnými účetními standardy a předpisy.",
              category: "basic-acc",
              subcategory: "basic-acc-vykaz"
            },
            {
              id: "basic-acc-vykaz-za",
              term: "Zpráva auditora",
              definition: "Oficiální dokument vydaný auditorem, který obsahuje jeho názor na účetní závěrku společnosti.",
              description: "Zpráva auditora může být bez výhrad, s výhradou, negativní nebo odmítavá, v závislosti na výsledcích auditu a souladu účetní závěrky s platnými účetními standardy.",
              category: "basic-acc",
              subcategory: "basic-acc-vykaz",
              examples: [
                "Dělíme na modifikované a nemodifikovanou",
                "Bez výhrad, nemodifikovaná - účetní závěrka poskytuje věrný a poctivý obraz finanční situace společnosti.",
                "S výhradou - existují určité oblasti, kde auditor nemůže potvrdit úplnou správnost účetní závěrky.",
                "Negativní - účetní závěrka neodráží věrně a poctivě finanční situaci společnosti.",
                "Odmítavá - auditor nebyl schopen získat dostatečné důkazy k vydání názoru na účetní závěrku."
              ],
            },
            {
              id: "basic-acc-vykaz-zv",
              term: "Zpráva o vztazích",
              definition: "Zpráva, která poskytuje informace o vztazích mezi společností a jejími spřízněnými stranami.",
              description: "Zpráva o vztazích zahrnuje informace o transakcích se spřízněnými stranami, jejich povaze a finančním dopadu na společnost.",
              category: "basic-acc",
              subcategory: "basic-acc-vykaz",
              examples: [
                "Spřízněné strany mohou zahrnovat mateřskou společnost, dceřiné společnosti, přidružené společnosti, klíčové manažery a jejich rodinné příslušníky.",
                "Kontrolujeme na registr skutečných majitelů (https://esm.justice.cz/ias/issm/rejstrik) i jiné veřejné zdroje."
              ],
            },
          ],
        },
        {
          id: "basic-acc-docs",
          name: "Účetní podklady",
          entries: [
            {
              id: "basic-acc-docs-ÚK",
              term: "Účetní kniha",
              definition: "Hlavní kniha, kde jsou zaznamenány všechny účetní transakce společnosti.",
              description: "Účetní kniha slouží jako základní zdroj informací pro sestavení účetní závěrky a dalších finančních výkazů.",
              category: "basic-acc",
              subcategory: "basic-acc-docs",
              examples: [
              "Účetní deník - chronologický záznam všech účetních transakcí",
              "Hlavní kniha - systematický záznam všech účetních transakcí podle jednotlivých účtů",
              "Analytické a syntetické evidence - podrobné záznamy o jednotlivých položkách aktiv, pasiv, nákladů a výnosů",
              "Kniha podrozvahových účtů - záznamy o položkách, které nejsou zahrnuty v hlavní knize, ale jsou důležité pro finanční řízení společnosti"
            ],
            },
            {
            id: "basic-acc-docs-kf",
            term: "Kniha faktur",
            definition: "Záznam všech přijatých a vydaných faktur společnosti.",
            description: "Kniha faktur slouží k evidenci pohledávek a závazků společnosti a je důležitým podkladem pro účetní záznamy.",
            category: "basic-acc",
            subcategory: "basic-acc-docs",
            examples: [
              "Přijaté faktury - faktury, které společnost obdržela od svých dodavatelů za zboží nebo služby",
              "Vydané faktury - faktury, které společnost vystavila svým zákazníkům za zboží nebo služby"
            ],
            },
            {
              id: "basic-acc-docs-km",
              term: "Kniha majetku",
              definition: "Záznam o veškerém dlouhodobém majetku společnosti.",
              description: "Kniha majetku obsahuje informace o pořízení, odpisování a vyřazování dlouhodobého majetku.",
              category: "basic-acc",
              subcategory: "basic-acc-docs",
              examples: [
                "Dlouhodobý hmotný majetek - budovy, stroje, zařízení",
                "Dlouhodobý nehmotný majetek - software, patenty, licence",
                "Dlouhodobý finanční majetek - investice do jiných společností, cenné papíry",
                "Dlouhodobý drobný majetek - menší položky dlouhodobého majetku, které jsou evidovány samostatně"
              ],
            },
            {
              id: "basic-acc-docs-ks",
              term: "Kniha skladu",
              definition: "Záznam o veškerém zboží a materiálu na skladě společnosti.",
              description: "Kniha skladu obsahuje informace o pohybu zboží a materiálu, jejich množství a hodnotě.",
              category: "basic-acc",
              subcategory: "basic-acc-docs",
              examples: [
                "Příjem zboží - záznam o přijatém zboží na sklad",
                "Výdej zboží - záznam o vydaném zboží ze skladu"
              ],
            },
            {
              id: "basic-acc-docs-kp",
              term: "Kniha pohledávek a závazků",
              definition: "Záznam o všech pohledávkách a závazcích společnosti.",
              description: "Kniha pohledávek a závazků slouží k evidenci finančních vztahů společnosti s jejími zákazníky a dodavateli.",
              category: "basic-acc",
              subcategory: "basic-acc-docs",
              examples: [
                "Pohledávky - částky, které jsou dluženy společnosti jejími zákazníky",
                "Závazky - částky, které společnost dluží svým dodavatelům"
              ]
            },
            {
              id: "basic-acc-docs-pod",
              term: "Podrozvaha",
              definition: "Záznam o položkách, které nejsou zahrnuty v hlavní knize, ale jsou důležité pro finanční řízení společnosti.",
              description: "Podrozvaha slouží k evidenci mimořádných a dočasných položek, které mohou ovlivnit finanční situaci společnosti.",
              category: "basic-acc",
              subcategory: "basic-acc-docs",
              examples: [
                "Mimořádné položky - jednorázové transakce, které nejsou součástí běžného hospodaření",
                "Dočasné položky - transakce, které budou v budoucnu přeřazeny do hlavní knihy"
              ],
            },
          ],
        },
      ],
    },
    { // into audit; není hotové
      id: "intro-audit",
      name: "Standardy (ISA) auditu a jeho zásady",
      subcategories: [
        {
          id: "intro-audit-rules",
          name: "Auditní standardy (ISA)",
          entries: [
            {
              id: "intro-audit-rules-ISA",
              term: "Mezinárodní auditorské standardy (ISA)",
              definition: "Soubor standardů pro provádění auditů finančních výkazů.",
              description: "ISA poskytují rámec pro plánování, provádění a dokumentaci auditu, aby bylo zajištěno, že audit je proveden v souladu s nejlepšími praktikami a etickými normami. https://www.kacr.cz/aktualni-auditorske-standardy",
              category: "intro-audit",
              subcategory: "intro-audit-rules"
            },

            {
              id: "intro-audit-rules-isa200",
              term: "ISA 200 - Cíle a zásady auditu finančních výkazů",
              definition: "Stanovuje cíle a obecné zásady nezávislého auditora při provádění auditu účetní závěrky.",
              description: "Určuje celkový cíl auditora: získat přiměřenou jistotu, že účetní závěrka neobsahuje významné nesprávnosti, a vydat výrok. Popisuje etické požadavky, profesní skepticismus a úsudek, dostatečné a vhodné důkazní informace a celkový rámec auditu.",
              examples: [
                "využití profesního úsudku",
                "uplatnění skepticismu při analýze neobvyklých transakcí",
                "zajištění souladu s etickým kodexem",
                "https://www.kacr.cz/file/5315/isa-200.pdf"
              ],
              category: "intro-audit",
              subcategory: "intro-audit-rules"
            },
            {
              id: "intro-audit-rules-isa230",
              term: "ISA 230 - Dokumentace auditu",
              definition: "Stanovuje požadavky na dokumentaci auditu a poskytuje pokyny pro její přípravu.",
              description: "Požaduje, aby auditor vyhotovil včasnou, úplnou a dostatečnou dokumentaci o provedených postupech, získaných důkazech a dosažených závěrech. Dokumentace musí umožnit zkušenému auditorovi porozumět průběhu auditu a odůvodnění auditorových úsudků.",
              examples: [
                "dokumentace plánování auditu",
                "záznamy o provedených testech",
                "komunikace se zaměstnanci",
                "poznámky k nápravě chyb ze strany klienta",
                "zpráva o zjištěních auditu",
                "https://www.kacr.cz/file/5653/isa-230.pdf"
              ],
              category: "intro-audit",
              subcategory: "intro-audit-rules"
            },
            {
              id: "intro-audit-rules-isa240",
              term: "ISA 240 - Postupy auditorů související s podvody při auditu účetní závěrky",
              definition: "Řeší odpovědnost auditora při zohlednění podvodu.",
              description: "Stanovuje, že auditor musí zvažovat riziko podvodu při auditu, zejména u výnosů a řízení vedením. Vyžaduje postupy k odhalení podvodu, včetně analytických testů, rozhovorů s vedením a hodnocení neobvyklých transakcí. Auditor musí reagovat profesionálním skepticismem.",
              examples: [
                "Testování výnosů na konci období",
                "Analýza neobvyklých převodů",
                "Rozhovory o kontrolách proti podvodu",
                "https://www.kacr.cz/file/3970/isa-240.pdf"
              ],
              category: "intro-audit",
              subcategory: "intro-audit-rules"
            },
            {
              id: "intro-audit-rules-315",
              term: "ISA 315 - Identifikace a posouzení rizik významné nesprávnosti prostřednictvím pochopení účetní jednotky a jejího prostředí",
              definition: "ISA 315 ukládá auditorovi povinnost porozumět účetní jednotce, jejímu prostředí a systému vnitřní kontroly. Cílem je identifikovat a vyhodnotit rizika významných nesprávností v účetní závěrce na úrovni celku i jednotlivých tvrzení a tím zaměřit audit na nejrizikovější oblasti.",
              description: "Standard vytváří základ pro plánování postupů podle ISA 330. Auditor získává přehled o odvětví, povaze a strategii jednotky, rizicích podnikání, účetních procesech a IT prostředí. Posuzuje pět složek vnitřní kontroly: kontrolní prostředí, řízení rizik, informační systém, kontrolní činnosti a monitoring. K tomu využívá dotazy, analytické postupy, pozorování a inspekci dokumentů. Výsledkem je identifikace a vyhodnocení rizik, včetně určení významných rizik, a jejich propojení na konkrétní tvrzení v účetní závěrce. Auditor tato zjištění dokumentuje jako podklad pro další auditní kroky.",
              examples: [
                "regulatorní změna → riziko chybné klasifikace aktiv",
                "expanze na nový trh → riziko podhodnocení rezerv",
                "nový ERP systém → riziko neúplného přenosu dat",
                "slabé oddělení povinností → riziko neoprávněných transakcí",
                "odhad impairmentu goodwillu → významné riziko",
                "https://www.kacr.cz/file/6637/isa-315r-cz-final-20102021.pdf"
              ],
              category: "intro-audit",
              subcategory: "intro-audit-rules"            
            },
            {
              id: "intro-audit-rules-ISA330",
              term: "ISA 330 - Reakce auditora na posouzená rizika",
              definition: "ISA 330 ukládá auditorovi povinnost navrhnout a provést vhodné postupy v reakci na rizika významných nesprávností identifikovaná podle ISA 315. Cílem je získat dostatečné a vhodné důkazní informace, že účetní závěrka neobsahuje významné nesprávnosti.",
              description: "Na základě vyhodnocených rizik auditor určuje povahu, načasování a rozsah svých postupů. Musí reagovat na rizika na úrovni účetní závěrky i na úrovni tvrzení. U významných rizik provádí specifické a často rozsáhlejší testy. Pokud chce spoléhat na účinnost vnitřních kontrol, musí testovat jejich fungování. Vždy provádí také postupy podrobného testování nebo analytické postupy, aby získal dostatečné důkazy. Auditor následně vyhodnocuje, zda získané důkazy odpovídají zjištěným rizikům a zda je potřeba rozšířit testování.",
              examples: [
                "riziko manipulace s výnosy → detailní testy transakcí a cut-off testy",
                "riziko podhodnocení rezerv → přezkum výpočtů, potvrzení od třetích stran",
                "spoléhání na IT kontroly → testování přístupových práv a logů systému",
                "významná rizika (např. goodwill) → použití experta, ověřování vstupních dat a modelů",
                "https://www.kacr.cz/file/3973/isa-330.pdf"
              ],
              category: "intro-audit",
              subcategory: "intro-audit-rules"
            },
            {
              id: "intro-audit-rules-isa500",
              term: "ISA 500 - Důkazní informace",
              definition: "Řeší povahu a zdroje důkazů a jejich dostatečnost a vhodnost.",
              description: "Požaduje, aby auditor získal dostatečné a vhodné důkazní informace podporující jeho závěr. Rozlišuje mezi spolehlivostí a relevancí důkazů a zdůrazňuje význam kombinace různých zdrojů důkazů.",
              examples: [
                "Externí potvrzení z banky",
                "Fyzická inventura",
                "Přezkum smluv",
                "https://www.kacr.cz/file/3975/isa-500.pdf"
              ],
              category: "intro-audit",
              subcategory: "intro-audit-rules"
            },
            {
              id: "intro-audit-rules-isa520",
              term: "ISA 520 - Analytické postupy",
              definition: "Stanovuje použití analytických postupů při auditu",
              description: "Vyžaduje využití analytických postupů při plánování a při celkovém vyhodnocení závěrky. Popisuje, jak porovnání dat, trendů a poměrů pomáhá identifikovat rizikové oblasti nebo potvrdit jiné důkazy.",
              examples: [
                "Porovnání marží meziroční",
                "Analýza trendu pohledávek",
                "Poměrová analýza likvidity",
                "https://www.kacr.cz/data/Metodika/Auditing/ISA/ISA520.pdf"
              ],
              category: "intro-audit",
              subcategory: "intro-audit-rules"
            },
            {
              id: "intro-audit-rules-isa540",
              term: "ISA 540 - Audit účetních odhadů",
              definition: "Řeší audit účetních odhadů a souvisejících zveřejnění.",
              description: "Požaduje, aby auditor vyhodnotil rizika u účetních odhadů, včetně odhadů fair value a rezerv. Musí prověřit metody, data a předpoklady použité vedením a v případě složitých odhadů zvážit využití experta.",
              examples: [
                "Testování rezerv na soudní spory",
                "Ověřování modelu pro impairment goodwillu",
                "Přezkum předpokladů při ocenění derivátů",
                "https://www.kacr.cz/file/5660/isa-540.pdf"
              ],
              category: "intro-audit",
              subcategory: "intro-audit-rules"
            },
            {
              id: "intro-audit-rules-isa570",
              term: "ISA 570 - Going concern",
              definition: "Řeší odpovědnost auditora při posuzování schopnosti jednotky pokračovat jako going concern.",
              description: "Auditor musí vyhodnotit, zda existují významné nejistoty ohledně schopnosti účetní jednotky pokračovat v činnosti. Pokud ano, musí posoudit adekvátnost zveřejnění a zvážit úpravu výroku.",
              examples: [
                "Analýza cash flow",
                "Hodnocení refinancování úvěrů",
                "Hodnocení obchodního plánu",
                "Hodnocení přehledu zakázek/uhrazenost vydaných zálohových faktur",
                "Hodnocení knihy závazků s důraz na potencionální soudní spory",
                "Zkoumání plánů vedení na řešení ztrát",
                "https://www.kacr.cz/file/3983/isa-570.pdf"
              ],
              category: "intro-audit",
              subcategory: "intro-audit-rules"
            },
            {
              id: "intro-audit-rules-isa700",
              term: "ISA 700 - Utvoření názoru na účetní závěrku a sestavení zprávy nezávislého auditora",
              definition: "Řeší tvorbu výroku auditora k účetní závěrce.",
              description: "Popisuje, jak auditor formuluje výrok, zda účetní závěrka podává věrný a poctivý obraz. Stanovuje strukturu zprávy auditora, včetně povinných částí (základ pro výrok, odpovědnosti vedení, odpovědnosti auditora).",
              examples: [
                "Nemodifikovaný výrok - tj. nebyla zjištěna závažnost zpochybňující správnost výkaznictví",
                "Modifikovaný výrok - výrok s výhradou - auditor došel k závěru, že účetní závěrka jako celek obsahuje určité závažné nedostatky, které však nejsou natolik závažné, aby ovlivnily věrný a poctivý obraz.",
                "Modifikovaný výrok - záporný výrok - auditor došel k závěru, že účetní závěrka jako celek obsahuje natolik závažné nedostatky, že neposkytuje věrný a poctivý obraz.",
                "Odmítnutí výroku - služba auditu na účetní jednotce je vnímána natolik rizikově, že auditor nemůže získat dostatečné a vhodné důkazní informace. Auditor může odmítnout výrok i v případě nesoučinosti auditované osoby.",
                "https://www.kacr.cz/file/5151/isa-700-revised.pdf"
              ],
              category: "intro-audit",
              subcategory: "intro-audit-rules"
            }
          ],
        },
        {
          id: "intro-audit-principles",
          name: "Zásady auditu",
          entries: [
            {
              id: "intro-audit-principles-independence",
              term: "Nezávislost",
              definition: "Schopnost auditora jednat objektivně a nestranně bez vlivu vnějších tlaků.",
              description: "Nezávislost je klíčová pro důvěryhodnost auditu. Auditor musí být nezávislý jak ve skutečnosti, tak i ve vnímání třetích stran. To zahrnuje vyhýbání se konfliktům zájmů a dodržování etických standardů.",
              category: "intro-audit",
              subcategory: "intro-audit-principles"
            },
            {
              id: "intro-audit-principles-professional-skepticism",
              term: "Profesní skepticismus",
              definition: "Postoj, který zahrnuje kritické myšlení a neustálé zpochybňování důkazů.",
              description: "Auditor by měl vždy přistupovat k auditu s otevřenou myslí, být ostražitý vůči možným nesrovnalostem a nepřijímat informace bez dostatečného ověření. Profesní skepticismus pomáhá odhalit potenciální podvody nebo chyby.",
              category: "intro-audit",
              subcategory: "intro-audit-principles"
            },
            {
              id: "intro-audit-principles-professional-judgment",
              term: "Profesní úsudek",
              definition: "Schopnost auditora aplikovat své znalosti, zkušenosti a dovednosti při rozhodování během auditu.",
              description: "Profesní úsudek je nezbytný pro posouzení rizik, výběr auditních postupů a interpretaci důkazů. Auditor musí být schopen zvážit různé faktory a učinit informovaná rozhodnutí, která ovlivní kvalitu auditu.",
              category: "intro-audit",
              subcategory: "intro-audit-principles"
            }
          ],
        },
      ],
    },
    { //zásadní postupy na zakázce = není hotové
      id: "basics-audit",
      name: "Základní postupy na zakázce",
    },
    { //druhy rizik, standardy a postoj k rizikům - není hotové
      id: "risks-audit",
      name: "Rizika",
      subcategories: [
        {
          id: "risks-audit-types",
          name: "Druhy rizik",
          entries:[
            {
              id: "risks-audit-types-audit",
              term: "Auditorské riziko",
              definition: "Riziko, že auditor vydá k účetní závěrce, která je významně (materiálně) zkreslená, nesprávný výrok.",
              description: "Auditorské riziko je funkcí rizika materiální nesprávnosti (RMM = PR x KR) a zjišťovacího rizika (ZR)",
              category: "risks-audit",
              subcategory: "risks-audit-types"
            },
            {
              id: "risks-audit-types-pr",
              term: "Přirozené riziko (PR)",
              definition: "Náchylnost určitého tvrzení týkajícího se skupiny transakcí, zůstatku účtu nebo zveřejněného údaje k nesprávnosti, která by při nezohlednění souvisejících kontrol mohla být buď sama o sobě, nebo spolu s jinými nesprávnostmi významná (materiální)",
              description: "Při určování významného rizika se nepřihlíží k souvisejícim kontrolám, tj. vychází se pouze z přirozeného rizika (nezohledňujícího související vnitřní kontroly).  Pro účely posouzení významného rizika je nutné oddělit přirozené riziko od zavedených vnitřních kontrol.",
              category: "risks-audit",
              subcategory: "risks-audit-types"
            },
            {
              id: "risks-audit-types-kr",
              term: "Kontrolní riziko (KR)",
              definition: "Riziko, že vnitřní kontrolní systém účetní jednotky včas nezabrání nesprávnosti, která by se mohla vyskytnout u tvrzení týkajícího se skupiny transakcí, zůstatku účtů nebo zveřejněného údaje a která by mohla být buď sama o sobě, nebo spolu s jinými nesprávnostmi významná , resp. že vnitřní kontrolní sstém takovou nesprávnost včas neodhalí  neopraví.",
              description: "Pravděpodobnost, že vnitřní kontroly účetní jednotky nezabrání nebo neodhalí a neopraví významnou nesprávnost na úrovni tvrzení.",
              examples: [
                "Pokud má účetní jednotka sice zavedené kontroly, ale auditor je nepovažuje za relevantní, KR se stanoví jako vysoké.",
                "Každá kontrola by měla reagovat na konkrétní riziko. Pokud riziko nesnižuje, je z hlediska auditu neúčinná a nezohledňuje se."
              ],
              category: "risks-audit",
              subcategory: "risks-audit-types-kr"
            },
            {
              id: "risks-audit-types-zr",
              term: "Zjišťovací riziko (ZR)",
              definition: "Riziko, že auditorské postupy neodhalí existující významnou nesprávnost, a to ani jednotlivě, ani v souhrnu s jinými nesprávnostmi. Zjišťovací riziko je inverzní k riziku významné nesprávnosti (RMM = PR × KR).",
              description: "Zjišťovací riziko představuje pravděpodobnost selhání auditorských postupů při odhalení významné nesprávnosti. Čím nižší je RMM (kombinace přirozeného a kontrolního rizika), tím vyšší úroveň ZR si může auditor dovolit. Naopak, vyšší RMM znamená, že ZR musí být nízké, a tedy je třeba získat přesvědčivější důkazní informace. V kontextu výběru vzorků pro testy věcné správnosti platí, že nižší ZR (tj. vyšší RMM) vede k vyššímu faktoru spolehlivosti a tím i k větší velikosti vzorku. Zjišťovací riziko se také označuje jako detekční riziko a může zahrnovat i riziko chybně navrženého auditu, nesprávného porozumění podnikání klienta nebo nevhodně zvolených testovacích postupů",
              category: "risks-audit",
              subcategory: "risks-audit-types"
            },
            {
              id: "risks-audit-types-rmm",
              term: "Riziko materiální nesprávnosti (RMM)",
              definition: "Riziko významné nesprávnosti je kombinací přirozeného rizika a kontrolního rizika (PRxKR). (Jestliže se nechystáme testovat provozní účinnost kontrol, je kontrolní riziko vyhodnoceno tak, že riziko materiální nesprávnosti je stejné jako přirozené riziko.)",
              examples: [
                "KR vysoké x PR vysoké = RMM vysoké | KR vysoké x PR střední = RMM střední | KR vysoké x PR nízké = RMM střední",
                "KR střední x PR vysoké = RMM střední | KR střední x PR střední = RMM střední | KR střední x PR nízké = RMM nízké",
                "KR nízké x PR vysoké = RMM střední | KR nízké x PR střední = RMM nízké | KR nízké x PR nízké = RMM nízké"
              ],
              category: "risks-audit",
              subcategory: "risks-audit-types"
            }
          ],
        },
        {
          id: "risks-audit-standards",
          name: "Auditní standardy a přístup k rizikům",
          entries: [
            {
              id: "risks-audit-standards-ISA315",
              term: "ISA 315 - Identifikace a posouzení rizik významné nesprávnosti prostřednictvím pochopení účetní jednotky a jejího prostředí",
              definition: "ISA 315 ukládá auditorovi povinnost porozumět účetní jednotce, jejímu prostředí a systému vnitřní kontroly. Cílem je identifikovat a vyhodnotit rizika významných nesprávností v účetní závěrce na úrovni celku i jednotlivých tvrzení a tím zaměřit audit na nejrizikovější oblasti.",
              description: "Standard vytváří základ pro plánování postupů podle ISA 330. Auditor získává přehled o odvětví, povaze a strategii jednotky, rizicích podnikání, účetních procesech a IT prostředí. Posuzuje pět složek vnitřní kontroly: kontrolní prostředí, řízení rizik, informační systém, kontrolní činnosti a monitoring. K tomu využívá dotazy, analytické postupy, pozorování a inspekci dokumentů. Výsledkem je identifikace a vyhodnocení rizik, včetně určení významných rizik, a jejich propojení na konkrétní tvrzení v účetní závěrce. Auditor tato zjištění dokumentuje jako podklad pro další auditní kroky.",
              examples: [
                "regulatorní změna → riziko chybné klasifikace aktiv",
                "expanze na nový trh → riziko podhodnocení rezerv",
                "nový ERP systém → riziko neúplného přenosu dat",
                "slabé oddělení povinností → riziko neoprávněných transakcí",
                "odhad impairmentu goodwillu → významné riziko",
                "https://www.kacr.cz/file/6637/isa-315r-cz-final-20102021.pdf"
              ],
              category: "risks-audit",
              subcategory: "risks-audit-standards"
            },
            {
              id: "risks-audit-standards-ISA330",
              term: "ISA 330 - Reakce auditora na posouzená rizika",
              definition: "ISA 330 ukládá auditorovi povinnost navrhnout a provést vhodné postupy v reakci na rizika významných nesprávností identifikovaná podle ISA 315. Cílem je získat dostatečné a vhodné důkazní informace, že účetní závěrka neobsahuje významné nesprávnosti.",
              description: "Na základě vyhodnocených rizik auditor určuje povahu, načasování a rozsah svých postupů. Musí reagovat na rizika na úrovni účetní závěrky i na úrovni tvrzení. U významných rizik provádí specifické a často rozsáhlejší testy. Pokud chce spoléhat na účinnost vnitřních kontrol, musí testovat jejich fungování. Vždy provádí také postupy podrobného testování nebo analytické postupy, aby získal dostatečné důkazy. Auditor následně vyhodnocuje, zda získané důkazy odpovídají zjištěným rizikům a zda je potřeba rozšířit testování.",
              examples: [
                "riziko manipulace s výnosy → detailní testy transakcí a cut-off testy",
                "riziko podhodnocení rezerv → přezkum výpočtů, potvrzení od třetích stran",
                "spoléhání na IT kontroly → testování přístupových práv a logů systému",
                "významná rizika (např. goodwill) → použití experta, ověřování vstupních dat a modelů",
                "https://www.kacr.cz/file/3973/isa-330.pdf"
              ],
              category: "risks-audit",
              subcategory: "risks-audit-standards"
            }
          ]
        }
      ]
    },
    { //důkaznictví v auditu - není hotové
      id: "proof-audit",
      name: "Důkaznictví v auditu",
    },
    { //shromažďování auditních důkazů - chybí sepsat definice a popisy
      id: "gather-audit",
      name: "Auditní nástroje a techniky",
      subcategories: [
        {
          id: "gather-audit-tech",
          name: "Techniky zjišťování",
          entries: [
            {
              id: "gather-audit-tech-ask",
              term: "Dotazování",
              definition: "N/A",
              description: "N/A",
              subcategory: "gather-audit-tech",
              category: "gather-audit",
            },
            {
              id: "gather-audit-tech-see",
              term: "Pozorování",
              definition: "N/A",
              description: "N/A",
              subcategory: "gather-audit-tech",
              category: "gather-audit",
            },
            {
              id: "gather-audit-tech-inspect",
              term: "Inspekce",
              definition: "N/A",
              description: "N/A",
              subcategory: "gather-audit-tech",
              category: "gather-audit",
            },
            {
              id: "gather-audit-tech-rep",
              term: "Reperformance",
              definition: "N/A",
              description: "N/A",
              subcategory: "gather-audit-tech",
              category: "gather-audit", 
            },
            {
              id: "gather-audit-tech-det",
              term: "Detialní testování účetních případů",
              definition: "N/A",
              description: "N/A",
              subcategory: "gather-audit-tech",
              category: "gather-audit",
            },
          ],
        },
        {
          id: "gather-audit-sample",
          name: "Metodika výběru vzorku",
          entries: [
            {
              id: "gather-audit-sample-process",
              term: "Postup výběru",
              definition: "N/A",
              description: "N/A",
              subcategory: "gather-audit-sample",
              category: "gather-audit",
            },
            {
              id: "gather-aduit-sample-mat",
              term: "Stanovení významnosti",
              definition: "N/A",
              description: "N/A",
              subcategory: "gather-audit-sample",
              category: "gather-audit",
            },
            {
              id: "gather-audit-sample-fs",
              term: "Faktor spolehlivosti",
              definition: "N/A",
              description: "N/A",
              subcategory: "gather-audit-sample",
              category: "gather-audit",
            },
            {
              id: "gather-audit-sample-ngc",
              term: "Metoda náhodného generátoru čísel (NGČ)",
              definition: "N/A",
              description: "N/A",
              subcategory: "gather-audit-sample",
              category: "gather-audit",
            },
            {
              id: "gather-audit-sample-npp",
              term: "Metoda náhodné peněžní procházky (NPP)",
              definition: "N/A",
              description: "N/A",
              subcategory: "gather-audit-sample",
              category: "gather-audit",
            },
            {
              id: "gather-audit-sample-ou",
              term: "Odborný úsudek",
              definition: "N/A",
              description: "N/A",
              subcategory: "gather-audit-sample",
              category: "gather-audit",
            },
          ]
        }
      ],
    },
    { //závěr auditu - chybí sepsat definice a popisy
      id: "final-audit",
      name: "Finalizace auditu",
      subcategories: [
        {
          id: "final-audit-report",
          name: "Kontrola výstupů",
          entries: [
            {
              id: "fnal-audit-report-nacitani",
              term: "Načítání výkazů",
              definition: "N/A",
              description: "N/A",
              examples: [
                "N/A - odkaz na Tým_MD :) "
              ],
              subcategory: "final-audit-report",
              category: "final-audit",
            },
            {
              id: "final-audit-report-attvz",
              term: "Sesouhlasení přílohy a výroční zprávy",
              definition: "N/A",
              description: "N/A",
              subcategory: "final-audit-report",
              category: "final-audit",
            },
            {
              id: "final-audit-report-doc",
              term: "Dokumentace kontroly výkazů",
              definition: "N/A",
              description: "N/A",
              subcategory: "final-audit-report",
              category: "final-audit",
            }
          ]
        },
        {
          id: "final-audit-closeup",
          name: "Závěrečné výstupy",
          entries: [
            {
              id: "final-audit-closeup-ml",
              term: "Management Letter",
              definition: "N/A",
              description: "N/A",
              subcategory: "final-audit-closeup",
              category: "final-audit",
            },
            {
              id: "final-audit-closeup-zna",
              term: "Zpráva nezávislého auditora",
              definition: "N/A",
              description: "N/A",
              subcategory: "final-audit-closeup",
              category: "final-audit",
            },
            {
              id: "final-audit-closeup-zpza",
              term: "Zpráva o projednání zprávy auditora",
              definition: "N/A",
              description: "N/A",
              subcategory: "final-audit-closeup",
              category: "final-audit",
            }
          ]
        },
        {
          id: "final-audit-finish",
          name: "Uzavření zakázky",
          entries: [
            {
              id: "final-audit-finish-rule",
              term: "Lhůta pro uzavření spisů",
              definition: "N/A",
              description: "N/A",
              subcategory: "final-audit-finish",
              category: "final-audit",
            },
            {
              id: "final-audit-finish-cwclose",
              term: "Uzavření spisu v CaseWare",
              definition: "N/A",
              description: "N/A",
              subcategory: "final-audit-finish",
              category: "final-audit",
            },
            {
              id: "final-audit-finish-shclose",
              term: "Uzavření spisu na SharePointu",
              definition: "N/A",
              description: "N/A",
              subcategory: "final-audit-finish",
              category: "final-audit",
            }
          ]
        }
      ]
    },
    { //ostatní doplňkové informace - chybí dopsat definice + příkaldy na jednotlivé sekce
      id: "extras-audit",
      name: "Audit - extras",
      subcategories: [
        {
          id: "extra-audit-sekce",
          name: "Sekce - how to?",
          entries: [
            {
              id: "extra-audit-sekce-uvery",
              term: "Přijaté úvěry a půjčky",
              definition: "N/A",
              description: "N/A",
              subcategory: "extra-audit-sekce",
              category: "extras-audit",
            },
          ]
        },
        {
          id: "extra-audit-docs",
          name: "Nezbytné dokumenty pro zakázku",
          entries: [
            {
              id: "extra-audit-docs-rrz",
              term: "Rozhodnutí o rozdělení zisku",
              definition: "N/A",
              description: "N/A",
              subcategory: "extra-audit-docs",
              category: "extras-audit",
            },
            {
              id: "extra-audit-docs-pv",
              term: "Prohlášení vedení",
              definition: "N/A",
              description: "N/A",
              subcategory: "extra-audit-docs",
              category: "extras-audit",
            },
            {
              id: "extra-audit-docs-dp",
              term: "Dopis vedení",
              definition: "N/A",
              description: "N/A",
              subcategory: "extra-audit-docs",
              category: "extras-audit",
            },
            {
              id: "extra-audit-docs-di",
              term: "Dokladová inventura",
              definition: "N/A",
              description: "N/A",
              subcategory: "extra-audit-docs",
              category: "extras-audit",
            }
          ]
        },
        {
          id: "extra-audit-targer",
          name: "Co se zkoumá?",
          entries: [
            {
              id: "extra-audit-target-souladNV",
              term: "Soulad Časový soulad nákladů a výnosů",
              definition: "N/A",
              description: "N/A",
              subcategory: "extra-audit-targer",
              category: "extras-audit",
            },
            {
              id: "extra-audit-target-obraz",
              term: "Věrný a poctivý obraz",
              definition: "N/A",
              description: "N/A",
              subcategory: "extra-audit-targer",
              category: "extras-audit",
            },
            {
              id: "extra-audit-target-prh",
              term: "Péče řádného hospodáře",
              definition: "N/A",
              description: "N/A",
              subcategory: "extra-audit-targer",
              category: "extras-audit",
            }
          ]
        },
        {
          id: "extra-audit-aml",
          name: "AML",
          entries: [
            {
              id: "extra-audit-aml-linkes",
              term: "Odkazy související s AML",
              definition: "N/A",
              description: "N/A",

              examples: [
                "odkaz na někam"
              ],
              subcategory: "extra-audit-aml",
              category: "extras-audit",
            },
            {
              id: "extra-audit-aml-definice",
              term: "AML - definice",
              definition: "N/A",
              description: "N/A",
              subcategory: "extra-audit-aml",
              category: "extras-audit",
            }
          ]
        }
      ]
    }
  ],
};

// Helper functions for searching and filtering
export function searchTerminology(query: string, data: TerminologyTree): TerminologyEntry[] {
  const results: TerminologyEntry[] = [];
  const searchLower = query.toLowerCase();

  data.categories.forEach(category => {
    category.subcategories?.forEach(subcategory => {
      subcategory.entries.forEach(entry => {
        if (
          entry.term.toLowerCase().includes(searchLower) ||
          entry.definition.toLowerCase().includes(searchLower) ||
          entry.description?.toLowerCase().includes(searchLower)
        ) {
          results.push(entry);
        }
      });
    });

    category.entries?.forEach(entry => {
      if (
        entry.term.toLowerCase().includes(searchLower) ||
        entry.definition.toLowerCase().includes(searchLower) ||
        entry.description?.toLowerCase().includes(searchLower)
      ) {
        results.push(entry);
      }
    });
  });

  return results;
}

export function getTerminologyById(id: string, data: TerminologyTree): TerminologyEntry | null {
  for (const category of data.categories) {
    if (category.subcategories) {
      for (const subcategory of category.subcategories) {
        const entry = subcategory.entries.find(e => e.id === id);
        if (entry) return entry;
      }
    }
    if (category.entries) {
      const entry = category.entries.find(e => e.id === id);
      if (entry) return entry;
    }
  }
  return null;
}