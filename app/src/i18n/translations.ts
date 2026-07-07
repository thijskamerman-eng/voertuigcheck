export type Lang = 'nl' | 'en' | 'pl' | 'ro';

export const LANGS: { code: Lang }[] = [{ code: 'nl' }, { code: 'en' }, { code: 'pl' }, { code: 'ro' }];

export interface UiDict {
  algemene: string;
  vlootTruck: string;
  vlootTrailer: string;
  nvt: string;
  zonderTrailer: string;
  zonderTruck: string;
  uitgevoerd: string;
  naam: string;
  allesOk: string;
  ok: string;
  niet: string;
  nietPl: string;
  foto: string;
  verstuur: string;
  overzicht: string;
  verzonden: string;
  okWoord: string;
  nietWoord: string;
  nieuwe: string;
  meldingen: string;
  schade: string;
  schadeAdd: string;
  schadeplek: string;
  schadeplekPl: string;
  toelichting: string;
  verwijderen: string;
  ext: string;
  int: string;
  klein: string;
  truck: string;
  trailer: string;
}

export const UI: Record<Lang, UiDict> = {
  nl: {
    algemene: 'Algemene gegevens',
    vlootTruck: 'Vlootnr truck',
    vlootTrailer: 'Vlootnr trailer',
    nvt: 'n.v.t.',
    zonderTrailer: 'Zonder trailer — trailer-checks overgeslagen',
    zonderTruck: 'Zonder truck — truck-checks overgeslagen',
    uitgevoerd: 'Uitgevoerd door',
    naam: 'Naam chauffeur',
    allesOk: 'Alles OK',
    ok: 'OK',
    niet: 'Niet OK',
    nietPl: 'Wat is er niet OK? Beschrijf de klacht…',
    foto: 'foto',
    verstuur: 'Verstuur controle',
    overzicht: 'Overzicht meldingen (beheer) →',
    verzonden: 'Verzonden naar planning',
    okWoord: 'OK',
    nietWoord: 'niet OK',
    nieuwe: 'Nieuwe check',
    meldingen: 'Meldingen',
    schade: 'SCHADE',
    schadeAdd: '+ Schade toevoegen',
    schadeplek: 'Schadeplek',
    schadeplekPl: 'bv. linker spatbord',
    toelichting: 'Toelichting',
    verwijderen: 'Verwijderen',
    ext: 'BUITENKANT',
    int: 'BINNENKANT',
    klein: 'KLEIN MATERIAAL',
    truck: 'TRUCK',
    trailer: 'TRAILER',
  },
  en: {
    algemene: 'General details',
    vlootTruck: 'Fleet no. truck',
    vlootTrailer: 'Fleet no. trailer',
    nvt: 'n/a',
    zonderTrailer: 'No trailer — trailer checks skipped',
    zonderTruck: 'No truck — truck checks skipped',
    uitgevoerd: 'Carried out by',
    naam: 'Driver name',
    allesOk: 'All OK',
    ok: 'OK',
    niet: 'Not OK',
    nietPl: 'What is not OK? Describe the issue…',
    foto: 'photo',
    verstuur: 'Submit check',
    overzicht: 'Reports overview (admin) →',
    verzonden: 'Sent to planning',
    okWoord: 'OK',
    nietWoord: 'not OK',
    nieuwe: 'New check',
    meldingen: 'Reports',
    schade: 'DAMAGE',
    schadeAdd: '+ Add damage',
    schadeplek: 'Damage location',
    schadeplekPl: 'e.g. left mudguard',
    toelichting: 'Description',
    verwijderen: 'Remove',
    ext: 'EXTERIOR',
    int: 'INTERIOR',
    klein: 'SMALL EQUIPMENT',
    truck: 'TRUCK',
    trailer: 'TRAILER',
  },
  pl: {
    algemene: 'Dane ogólne',
    vlootTruck: 'Nr floty ciągnik',
    vlootTrailer: 'Nr floty naczepa',
    nvt: 'nd.',
    zonderTrailer: 'Bez naczepy — kontrole pominięte',
    zonderTruck: 'Bez ciągnika — kontrole pominięte',
    uitgevoerd: 'Wykonane przez',
    naam: 'Imię kierowcy',
    allesOk: 'Wszystko OK',
    ok: 'OK',
    niet: 'Nie OK',
    nietPl: 'Co jest nie tak? Opisz usterkę…',
    foto: 'zdjęcie',
    verstuur: 'Wyślij kontrolę',
    overzicht: 'Przegląd zgłoszeń (admin) →',
    verzonden: 'Wysłano do planowania',
    okWoord: 'OK',
    nietWoord: 'nie OK',
    nieuwe: 'Nowa kontrola',
    meldingen: 'Zgłoszenia',
    schade: 'USZKODZENIA',
    schadeAdd: '+ Dodaj uszkodzenie',
    schadeplek: 'Miejsce uszkodzenia',
    schadeplekPl: 'np. lewy błotnik',
    toelichting: 'Opis',
    verwijderen: 'Usuń',
    ext: 'ZEWNĄTRZ',
    int: 'WNĘTRZE',
    klein: 'DROBNY SPRZĘT',
    truck: 'CIĄGNIK',
    trailer: 'NACZEPA',
  },
  ro: {
    algemene: 'Date generale',
    vlootTruck: 'Nr. flotă cap tractor',
    vlootTrailer: 'Nr. flotă remorcă',
    nvt: 'n/a',
    zonderTrailer: 'Fără remorcă — verificări omise',
    zonderTruck: 'Fără cap tractor — verificări omise',
    uitgevoerd: 'Efectuat de',
    naam: 'Nume șofer',
    allesOk: 'Totul OK',
    ok: 'OK',
    niet: 'Nu e OK',
    nietPl: 'Ce nu este în regulă? Descrieți problema…',
    foto: 'foto',
    verstuur: 'Trimite controlul',
    overzicht: 'Prezentare generală (admin) →',
    verzonden: 'Trimis către planificare',
    okWoord: 'OK',
    nietWoord: 'nu OK',
    nieuwe: 'Control nou',
    meldingen: 'Raportări',
    schade: 'DAUNE',
    schadeAdd: '+ Adaugă daună',
    schadeplek: 'Locul daunei',
    schadeplekPl: 'ex. aripa stângă',
    toelichting: 'Descriere',
    verwijderen: 'Șterge',
    ext: 'EXTERIOR',
    int: 'INTERIOR',
    klein: 'ECHIPAMENT MIC',
    truck: 'CAP TRACTOR',
    trailer: 'REMORCĂ',
  },
};

/** Per-checkpoint translations: [label, subtext] */
export const CHECKPOINT_I18N: Record<string, Record<Lang, [string, string]>> = {
  banden: {
    nl: ['Banden', 'profiel, beschadigingen, spanning'],
    en: ['Tyres', 'tread, damage, pressure'],
    pl: ['Opony', 'bieżnik, uszkodzenia, ciśnienie'],
    ro: ['Anvelope', 'profil, deteriorări, presiune'],
  },
  verlichting: {
    nl: ['Verlichting', 'koplampen, achterlichten, richtingaanwijzers'],
    en: ['Lighting', 'headlights, tail lights, indicators'],
    pl: ['Oświetlenie', 'reflektory, tylne światła, kierunkowskazy'],
    ro: ['Iluminare', 'faruri, stopuri, semnalizatoare'],
  },
  schoon: {
    nl: ['Schoon', ''],
    en: ['Clean', ''],
    pl: ['Czysty', ''],
    ro: ['Curat', ''],
  },
  trailer: {
    nl: ['Schade trailer', ''],
    en: ['Trailer damage', ''],
    pl: ['Uszkodzenie naczepy', ''],
    ro: ['Daune remorcă', ''],
  },
  balken: {
    nl: ['Werkende balken in oplegger', 'minimaal 2 aanwezig'],
    en: ['Load bars in trailer', 'min. 2 present'],
    pl: ['Belki rozporowe w naczepie', 'min. 2 sztuki'],
    ro: ['Bare de blocare în remorcă', 'min. 2 prezente'],
  },
  spanband: {
    nl: ['Spanband', '1× aanwezig'],
    en: ['Lashing strap', '1× present'],
    pl: ['Pas mocujący', '1× sztuka'],
    ro: ['Chingă de ancorare', '1× prezentă'],
  },
  afstandsbed: {
    nl: ['Afstandsbediening laadklep', 'aanwezig in oplegger'],
    en: ['Tail lift remote', 'present in trailer'],
    pl: ['Pilot windy', 'w naczepie'],
    ro: ['Telecomandă lift', 'în remorcă'],
  },
  klep: {
    nl: ['Werkende klep', ''],
    en: ['Working tail lift', ''],
    pl: ['Sprawna winda', ''],
    ro: ['Lift funcțional', ''],
  },
  binnenkant: {
    nl: ['Binnenkant schoon', ''],
    en: ['Interior clean', ''],
    pl: ['Wnętrze czyste', ''],
    ro: ['Interior curat', ''],
  },
  koelmotor: {
    nl: ['Tank koelmotor gevuld', ''],
    en: ['Reefer fuel tank filled', ''],
    pl: ['Zbiornik agregatu napełniony', ''],
    ro: ['Rezervor agregat frig umplut', ''],
  },
  ordelijk: {
    nl: ['Interieur ordelijk', 'netjes, vlekvrij, rookvrij'],
    en: ['Cabin tidy', 'neat, stain-free, smoke-free'],
    pl: ['Kabina uporządkowana', 'schludna, bez plam, bez dymu'],
    ro: ['Cabină ordonată', 'curată, fără pete, fără fum'],
  },
  dashboard: {
    nl: ['Dashboardlampjes / storingen', ''],
    en: ['Dashboard lights / faults', ''],
    pl: ['Kontrolki / usterki', ''],
    ro: ['Martori bord / defecte', ''],
  },
  brandstof: {
    nl: ['Brandstofniveau', ''],
    en: ['Fuel level', ''],
    pl: ['Poziom paliwa', ''],
    ro: ['Nivel combustibil', ''],
  },
  zekeringen: {
    nl: ['Reserve (hoofd)zekeringen', 'voor truck en oplegger'],
    en: ['Spare (main) fuses', 'for truck and trailer'],
    pl: ['Zapasowe bezpieczniki', 'do ciągnika i naczepy'],
    ro: ['Siguranțe de rezervă', 'pentru cap tractor și remorcă'],
  },
  schadeform: {
    nl: ['Schadeformulier aanwezig', 'in truck'],
    en: ['Damage form present', 'in truck'],
    pl: ['Formularz szkód', 'w ciągniku'],
    ro: ['Formular daune', 'în cap tractor'],
  },
  tankpas: {
    nl: ['Tankpas / Tag', ''],
    en: ['Fuel card / Tag', ''],
    pl: ['Karta paliwowa / Tag', ''],
    ro: ['Card carburant / Tag', ''],
  },
  tussenschot: {
    nl: ['Tussenschot werkend', ''],
    en: ['Bulkhead working', ''],
    pl: ['Ścianka działowa sprawna', ''],
    ro: ['Perete despărțitor funcțional', ''],
  },
};
