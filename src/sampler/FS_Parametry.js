// FS_Parametry — seznam všech kombinací pro druhou úlohu
// Každý záznam má tvar: { controlRisk, inherentRisk, analyticalTests, controlTests, factor }
// Pole "factor" je zde vyplněno textem "DOPLŇ" - doplň prosím požadované číslo pro každou kombinaci.

const rows = [
  { controlRisk: 'Nízké', inherentRisk: 'Nízké', rmmLevel: 'Nízké', analyticalTests: 'Ano', controlTests: 'Ano', factor: '0' },
  { controlRisk: 'Nízké', inherentRisk: 'Nízké', rmmLevel: 'Nízké', analyticalTests: 'Ano', controlTests: 'Ne', factor: 'Test kontrol Error' },
  { controlRisk: 'Nízké', inherentRisk: 'Nízké', rmmLevel: 'Nízké', analyticalTests: 'Ne', controlTests: 'Ano', factor: '0.7' },
  { controlRisk: 'Nízké', inherentRisk: 'Nízké', rmmLevel: 'Nízké', analyticalTests: 'Ne', controlTests: 'Ne', factor: 'Test kontrol Error' },

  { controlRisk: 'Nízké', inherentRisk: 'Střední', rmmLevel: 'Nízké', analyticalTests: 'Ano', controlTests: 'Ano', factor: '0' },
  { controlRisk: 'Nízké', inherentRisk: 'Střední', rmmLevel: 'Nízké', analyticalTests: 'Ano', controlTests: 'Ne', factor: 'Test kontrol Error' },
  { controlRisk: 'Nízké', inherentRisk: 'Střední', rmmLevel: 'Nízké', analyticalTests: 'Ne', controlTests: 'Ano', factor: '1.1' },
  { controlRisk: 'Nízké', inherentRisk: 'Střední', rmmLevel: 'Nízké', analyticalTests: 'Ne', controlTests: 'Ne', factor: 'Test kontrol Error' },

  { controlRisk: 'Nízké', inherentRisk: 'Vysoké', rmmLevel: 'Střední', analyticalTests: 'Ano', controlTests: 'Ano', factor: '0.7' },
  { controlRisk: 'Nízké', inherentRisk: 'Vysoké', rmmLevel: 'Střední', analyticalTests: 'Ano', controlTests: 'Ne', factor: 'Test kontrol Error' },
  { controlRisk: 'Nízké', inherentRisk: 'Vysoké', rmmLevel: 'Střední', analyticalTests: 'Ne', controlTests: 'Ano', factor: '1.6' },
  { controlRisk: 'Nízké', inherentRisk: 'Vysoké', rmmLevel: 'Střední', analyticalTests: 'Ne', controlTests: 'Ne', factor: 'Test kontrol Error' },

  { controlRisk: 'Střední', inherentRisk: 'Nízké', rmmLevel: 'Nízké', analyticalTests: 'Ano', controlTests: 'Ano', factor: '0.7' },
  { controlRisk: 'Střední', inherentRisk: 'Nízké', rmmLevel: 'Nízké', analyticalTests: 'Ano', controlTests: 'Ne', factor: 'Test kontrol Error' },
  { controlRisk: 'Střední', inherentRisk: 'Nízké', rmmLevel: 'Nízké', analyticalTests: 'Ne', controlTests: 'Ano', factor: '1.4' },
  { controlRisk: 'Střední', inherentRisk: 'Nízké', rmmLevel: 'Nízké', analyticalTests: 'Ne', controlTests: 'Ne', factor: 'Test kontrol Error' },

  { controlRisk: 'Střední', inherentRisk: 'Střední', rmmLevel: 'Střední', analyticalTests: 'Ano', controlTests: 'Ano', factor: '1.1' },
  { controlRisk: 'Střední', inherentRisk: 'Střední', rmmLevel: 'Střední', analyticalTests: 'Ano', controlTests: 'Ne', factor: 'Test kontrol Error' },
  { controlRisk: 'Střední', inherentRisk: 'Střední', rmmLevel: 'Střední', analyticalTests: 'Ne', controlTests: 'Ano', factor: '1.8' },
  { controlRisk: 'Střední', inherentRisk: 'Střední', rmmLevel: 'Střední', analyticalTests: 'Ne', controlTests: 'Ne', factor: 'Test kontrol Error' },

  { controlRisk: 'Střední', inherentRisk: 'Vysoké', rmmLevel: 'Střední', analyticalTests: 'Ano', controlTests: 'Ano', factor: '1.4' },
  { controlRisk: 'Střední', inherentRisk: 'Vysoké', rmmLevel: 'Střední', analyticalTests: 'Ano', controlTests: 'Ne', factor: 'Test kontrol Error' },
  { controlRisk: 'Střední', inherentRisk: 'Vysoké', rmmLevel: 'Střední', analyticalTests: 'Ne', controlTests: 'Ano', factor: '2.3' },
  { controlRisk: 'Střední', inherentRisk: 'Vysoké', rmmLevel: 'Střední', analyticalTests: 'Ne', controlTests: 'Ne', factor: 'Test kontrol Error' },

  { controlRisk: 'Vysoké', inherentRisk: 'Nízké', rmmLevel: 'Nízké', analyticalTests: 'Ano', controlTests: 'Ano', factor: 'Test kontrol Error' },
  { controlRisk: 'Vysoké', inherentRisk: 'Nízké', rmmLevel: 'Nízké', analyticalTests: 'Ano', controlTests: 'Ne', factor: '1.1' },
  { controlRisk: 'Vysoké', inherentRisk: 'Nízké', rmmLevel: 'Nízké', analyticalTests: 'Ne', controlTests: 'Ano', factor: 'Test kontrol Error' },
  { controlRisk: 'Vysoké', inherentRisk: 'Nízké', rmmLevel: 'Nízké', analyticalTests: 'Ne', controlTests: 'Ne', factor: '1.9' },

  { controlRisk: 'Vysoké', inherentRisk: 'Střední', rmmLevel: 'Střední', analyticalTests: 'Ano', controlTests: 'Ano', factor: 'Test kontrol Error' },
  { controlRisk: 'Vysoké', inherentRisk: 'Střední', rmmLevel: 'Střední', analyticalTests: 'Ano', controlTests: 'Ne', factor: '1.4' },
  { controlRisk: 'Vysoké', inherentRisk: 'Střední', rmmLevel: 'Střední', analyticalTests: 'Ne', controlTests: 'Ano', factor: 'Test kontrol Error' },
  { controlRisk: 'Vysoké', inherentRisk: 'Střední', rmmLevel: 'Střední', analyticalTests: 'Ne', controlTests: 'Ne', factor: '2.3' },

  { controlRisk: 'Vysoké', inherentRisk: 'Vysoké', rmmLevel: 'Vysoké', analyticalTests: 'Ano', controlTests: 'Ano', factor: 'Test kontrol Error' },
  { controlRisk: 'Vysoké', inherentRisk: 'Vysoké', rmmLevel: 'Vysoké', analyticalTests: 'Ano', controlTests: 'Ne', factor: '1.9' },
  { controlRisk: 'Vysoké', inherentRisk: 'Vysoké', rmmLevel: 'Vysoké', analyticalTests: 'Ne', controlTests: 'Ano', factor: 'Test kontrol Error' },
  { controlRisk: 'Vysoké', inherentRisk: 'Vysoké', rmmLevel: 'Vysoké', analyticalTests: 'Ne', controlTests: 'Ne', factor: '3' }
];

// ---------------- New structured exports (V2) ----------------
// Keep legacy default export below for backward compatibility

// Činnosti (engagementType) pro UI a V2 tabulku
export const ENGAGEMENT_TYPES = ['Audit', 'Přezkum hospodaření'];

// Mapování: volba testů kontrol -> odvozené kontrolní riziko
export const CONTROL_TESTING_TO_RISK = {
  'Ne': 'Vysoké',
  'Ano-8': 'Střední',
  'Ano-23': 'Nízké',
};

// Matice pro odvození RMM z kontrolního a přirozeného rizika
export const RMM_MATRIX = {
  'Vysoké': { 'Vysoké': 'Vysoké', 'Střední': 'Střední', 'Nízké': 'Nízké' },
  'Střední': { 'Vysoké': 'Střední', 'Střední': 'Střední', 'Nízké': 'Nízké' },
  'Nízké': { 'Vysoké': 'Střední', 'Střední': 'Nízké', 'Nízké': 'Nízké' },
};

// Nová tabulka faktorů: engagementType -> controlRisk -> inherentRisk -> rmmLevel -> analyticalTests -> factor
export const FACTOR_TABLE_V2 = {
  'Audit': {
    'Vysoké': {
      'Vysoké': { 'Vysoké': { 'Ano': 1.9, 'Ne': 3.0 } },
      'Střední': { 'Střední': { 'Ano': 1.4, 'Ne': 2.3 } },
      'Nízké': { 'Nízké': { 'Ano': 1.1, 'Ne': 1.9 } },
    },
    'Střední': {
      'Vysoké': { 'Střední': { 'Ano': 1.4, 'Ne': 2.3 } },
      'Střední': { 'Střední': { 'Ano': 1.1, 'Ne': 1.9 } },
      'Nízké': { 'Nízké': { 'Ano': 0.7, 'Ne': 1.4 } },
    },
    'Nízké': {
      'Vysoké': { 'Střední': { 'Ano': 0.7, 'Ne': 1.6 } },
      'Střední': { 'Nízké': { 'Ano': "Vzorek není potřeba, podle metodiky je FS nulové", 'Ne': 1.1 } },
      'Nízké': { 'Nízké': { 'Ano': "Vzorek není potřeba, podle metodiky je FS nulové", 'Ne': 0.7 } },
    },
  },

  'Přezkum hospodaření': {
    'Vysoké': {
      'Vysoké': { 'Vysoké': { 'Ano': 1.1, 'Ne': 1.7 } },
      'Střední': { 'Střední': { 'Ano': 0.8, 'Ne': 1.3 } },
      'Nízké': { 'Nízké': { 'Ano': 0.6, 'Ne': 1.1 } },
    },
    'Střední': {
      'Vysoké': { 'Střední': { 'Ano': 0.8, 'Ne': 1.3 } },
      'Střední': { 'Střední': { 'Ano': 0.6, 'Ne': 1.1 } },
      'Nízké': { 'Nízké': { 'Ano': 0.4, 'Ne': 0.8 } },
    },
    'Nízké': {
      'Vysoké': { 'Střední': { 'Ano': 0.4, 'Ne': 0.9 } },
      'Střední': { 'Nízké': { 'Ano': "Vzorek není potřeba, podle metodiky je FS nulové", 'Ne': 0.6 } },
      'Nízké': { 'Nízké': { 'Ano': "Vzorek není potřeba, podle metodiky je FS nulové", 'Ne': 0.4 } },
    },
  },
};

// Helpery pro V2
export function resolveRmmLevel(controlRisk, inherentRisk) {
  try {
    return RMM_MATRIX?.[controlRisk]?.[inherentRisk] || null;
  } catch (_) {
    return null;
  }
}

export function resolveFactorV2(cfg) {
  if (!cfg || !cfg.engagementType || !cfg.controlRisk || !cfg.inherentRisk || !cfg.analyticalTests) return null;
  const rmm = cfg.rmmLevel || resolveRmmLevel(cfg.controlRisk, cfg.inherentRisk);
  if (!rmm) return null;
  try {
    const f = FACTOR_TABLE_V2?.[cfg.engagementType]?.['' + cfg.controlRisk]?.['' + cfg.inherentRisk]?.['' + rmm]?.['' + cfg.analyticalTests];
    if (typeof f === 'number' && Number.isFinite(f)) return f;
    if (typeof f === 'string' && f === 'Vzorek není potřeba, podle metodiky je FS nulové') return f;
    return null;
  } catch (_) {
    return null;
  }
}

export function resolveFactorCompat(cfg, legacyRows = rows) {
  const v2 = resolveFactorV2(cfg);
  if (v2 !== null) return v2;
  if (Array.isArray(legacyRows)) {
    const candidates = legacyRows.filter(r =>
      r.controlRisk === cfg.controlRisk &&
      r.inherentRisk === cfg.inherentRisk &&
      r.rmmLevel === (cfg.rmmLevel || resolveRmmLevel(cfg.controlRisk, cfg.inherentRisk)) &&
      r.analyticalTests === cfg.analyticalTests
    );
    for (const r of candidates) {
      const n = Number(String(r.factor).replace(',', '.'));
      if (Number.isFinite(n)) return n;
    }
  }
  return null;
}

export default rows;
