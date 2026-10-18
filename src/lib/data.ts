export type CharacterId =
  | "ichigo"
  | "rukia"
  | "byakuya"
  | "kenpachi"
  | "urahara"
  | "aizen"
  | "orihime"
  | "grimmjow";

export type Character = {
  id: CharacterId;
  name: string;
  kanji: string;
  title: string;
  color: string;
  ink: string;
  attack: string;
  tagline: string;
  description: string;
  stats: { label: string; value: number }[];
};

export const CHARACTERS: Record<CharacterId, Character> = {
  ichigo: {
    id: "ichigo",
    name: "ICHIGO",
    kanji: "一護",
    title: "Shinigami sustituto",
    color: "#ff6a00",
    ink: "#0a0a0a",
    attack: "GETSUGA TENSHŌ!",
    tagline: "Proteger primero. Preguntar después.",
    description:
      "Impulsivo, terco y con un corazón enorme. No buscás la pelea, pero si alguien toca a los tuyos aparece una energía que ni vos sabías que tenías. Mejorás bajo presión y nunca, nunca te rendís.",
    stats: [
      { label: "Coraje", value: 98 },
      { label: "Paciencia", value: 22 },
      { label: "Lealtad", value: 95 },
      { label: "Estrategia", value: 40 },
    ],
  },
  rukia: {
    id: "rukia",
    name: "RUKIA",
    kanji: "ルキア",
    title: "Teniente de la 13ª división",
    color: "#8ecbff",
    ink: "#0a0a0a",
    attack: "SODE NO SHIRAYUKI!",
    tagline: "Fría por fuera, firme por dentro.",
    description:
      "Disciplinada, directa y con un sentido del deber de hierro. Sos la que pone los pies en la tierra al grupo y la que da el consejo que nadie quiere escuchar pero todos necesitan. Tus dibujos son… únicos.",
    stats: [
      { label: "Disciplina", value: 90 },
      { label: "Empatía", value: 80 },
      { label: "Dibujo", value: 7 },
      { label: "Kidō", value: 88 },
    ],
  },
  byakuya: {
    id: "byakuya",
    name: "BYAKUYA",
    kanji: "白哉",
    title: "Capitán de la 6ª división",
    color: "#ff8fc7",
    ink: "#0a0a0a",
    attack: "SENBONZAKURA KAGEYOSHI.",
    tagline: "Las reglas existen por una razón.",
    description:
      "Elegante, orgulloso y absolutamente imperturbable. Tenés estándares altísimos y los cumplís sin despeinarte. Parecés distante, pero tu lealtad, cuando la das, es para siempre.",
    stats: [
      { label: "Elegancia", value: 100 },
      { label: "Orgullo", value: 96 },
      { label: "Calma", value: 94 },
      { label: "Humor", value: 5 },
    ],
  },
  kenpachi: {
    id: "kenpachi",
    name: "KENPACHI",
    kanji: "剣八",
    title: "Capitán de la 11ª división",
    color: "#ffe500",
    ink: "#0a0a0a",
    attack: "¡MÁS FUERTE! ¡MÁS!",
    tagline: "Si no hay pelea, no hay diversión.",
    description:
      "Puro instinto y adrenalina. No te interesan los planes ni las reglas: te interesa el desafío. Te perdés siempre (literal), pero cuando llegás, llegás con todo.",
    stats: [
      { label: "Fuerza", value: 100 },
      { label: "Orientación", value: 3 },
      { label: "Sed de pelea", value: 100 },
      { label: "Sutileza", value: 8 },
    ],
  },
  urahara: {
    id: "urahara",
    name: "URAHARA",
    kanji: "喜助",
    title: "Tendero / genio científico",
    color: "#1ce783",
    ink: "#0a0a0a",
    attack: "BENIHIME, DESPERTÁ.",
    tagline: "Siempre tres pasos adelante (y en ojotas).",
    description:
      "Parecés relajado y medio payaso, pero en tu cabeza ya resolviste el problema hace tres días. Inventor, estratega y maestro de esconder lo serio detrás de un abanico.",
    stats: [
      { label: "Ingenio", value: 99 },
      { label: "Misterio", value: 92 },
      { label: "Seriedad", value: 15 },
      { label: "Planes B", value: 100 },
    ],
  },
  aizen: {
    id: "aizen",
    name: "AIZEN",
    kanji: "惣右介",
    title: "Ex capitán de la 5ª división",
    color: "#b26bff",
    ink: "#0a0a0a",
    attack: "TODO SALIÓ SEGÚN LO PLANEADO.",
    tagline: "¿Desde cuándo creíste que no lo había previsto?",
    description:
      "Visionario, calculador y con un carisma peligroso. Ves el tablero completo mientras los demás miran una sola pieza. Ambición nivel cielo… literalmente.",
    stats: [
      { label: "Carisma", value: 97 },
      { label: "Ambición", value: 100 },
      { label: "Ilusiones", value: 99 },
      { label: "Humildad", value: 1 },
    ],
  },
  orihime: {
    id: "orihime",
    name: "ORIHIME",
    kanji: "織姫",
    title: "Sanadora de Karakura",
    color: "#ff5f6d",
    ink: "#0a0a0a",
    attack: "SŌTEN KISSHUN, ¡LO RECHAZO!",
    tagline: "La amabilidad también es un superpoder.",
    description:
      "Dulce, creativa y mucho más fuerte de lo que todos creen. Curás heridas (y días feos) con solo estar. Tus recetas son un experimento científico, pero tu corazón es oro puro.",
    stats: [
      { label: "Bondad", value: 100 },
      { label: "Imaginación", value: 95 },
      { label: "Cocina rara", value: 99 },
      { label: "Resiliencia", value: 85 },
    ],
  },
  grimmjow: {
    id: "grimmjow",
    name: "GRIMMJOW",
    kanji: "グリムジョー",
    title: "Sexto Espada",
    color: "#00e0ff",
    ink: "#0a0a0a",
    attack: "¡DESGARRÁ, PANTERA!",
    tagline: "El rey soy yo.",
    description:
      "Salvaje, rebelde y competitivo hasta los huesos. No aceptás que nadie esté por encima tuyo y vivís cada desafío como una revancha. Sos fuego puro con sonrisa de tiburón.",
    stats: [
      { label: "Ego", value: 98 },
      { label: "Velocidad", value: 93 },
      { label: "Obediencia", value: 4 },
      { label: "Rivalidad", value: 100 },
    ],
  },
};

export type Option = { text: string; sfx: string; points: Partial<Record<CharacterId, number>> };
export type Question = { id: number; question: string; kicker: string; options: Option[] };

export const QUESTIONS: Question[] = [
  {
    id: 1,
    kicker: "Lunes, 7:00 AM",
    question: "Suena la alarma. ¿Qué hacés?",
    options: [
      { text: "Me levanto al toque. Rutina impecable.", sfx: "ピシッ", points: { byakuya: 2, rukia: 1 } },
      { text: "Snooze x5. El mundo puede esperar.", sfx: "ZZZ", points: { urahara: 2, ichigo: 1 } },
      { text: "Ya estaba despierto planeando el día.", sfx: "ニヤ", points: { aizen: 2, urahara: 1 } },
      { text: "Salgo a buscar con quién medirme.", sfx: "ゴゴゴ", points: { kenpachi: 2, grimmjow: 1 } },
    ],
  },
  {
    id: 2,
    kicker: "Emergencia",
    question: "Un amigo está en problemas serios.",
    options: [
      { text: "Voy de cabeza, aunque sea suicida.", sfx: "ダッ", points: { ichigo: 3 } },
      { text: "Armo un plan con el equipo y vamos.", sfx: "よし", points: { rukia: 2, urahara: 1 } },
      { text: "Lo curo y lo abrazo. Todo va a estar bien.", sfx: "ぎゅっ", points: { orihime: 3 } },
      { text: "Si se metió solo, que salga solo.", sfx: "フン", points: { grimmjow: 2, byakuya: 1 } },
    ],
  },
  {
    id: 3,
    kicker: "Arsenal",
    question: "Elegí tu arma.",
    options: [
      { text: "Una espada gigante. Sin vueltas.", sfx: "ズバッ", points: { ichigo: 2, kenpachi: 1 } },
      { text: "Mil pétalos afilados. Con estilo.", sfx: "ヒラヒラ", points: { byakuya: 3 } },
      { text: "Un bastón con secretos… y un plan.", sfx: "カチッ", points: { urahara: 3 } },
      { text: "Mis propias garras.", sfx: "ガルル", points: { grimmjow: 3 } },
    ],
  },
  {
    id: 4,
    kicker: "Confesión",
    question: "Tu mayor defecto es…",
    options: [
      { text: "Soy demasiado impulsivo.", sfx: "ドカン", points: { ichigo: 2, grimmjow: 1 } },
      { text: "Me cuesta mostrar lo que siento.", sfx: "…", points: { byakuya: 2, rukia: 1 } },
      { text: "Confío demasiado en la gente.", sfx: "えへ", points: { orihime: 2, ichigo: 1 } },
      { text: "¿Defectos? Eso es para los demás.", sfx: "フッ", points: { aizen: 3 } },
    ],
  },
  {
    id: 5,
    kicker: "Poder",
    question: "Si pudieras tener un solo poder…",
    options: [
      { text: "Controlar lo que todos perciben.", sfx: "ゾク", points: { aizen: 3 } },
      { text: "Congelar todo a mi alrededor.", sfx: "パキン", points: { rukia: 3 } },
      { text: "Deshacer cualquier daño.", sfx: "キラン", points: { orihime: 3 } },
      { text: "Fuerza bruta infinita.", sfx: "ドゴォ", points: { kenpachi: 3 } },
    ],
  },
  {
    id: 6,
    kicker: "Viernes noche",
    question: "Plan ideal:",
    options: [
      { text: "Torneo hasta que alguien caiga.", sfx: "ワーッ", points: { kenpachi: 2, grimmjow: 1 } },
      { text: "Laboratorio, mate y un invento nuevo.", sfx: "ピコン", points: { urahara: 2, aizen: 1 } },
      { text: "Cocinar algo raro para mis amigos.", sfx: "ジュー", points: { orihime: 2, rukia: 1 } },
      { text: "Té, silencio y un jardín zen.", sfx: "シーン", points: { byakuya: 2, aizen: 1 } },
    ],
  },
  {
    id: 7,
    kicker: "Combate",
    question: "¿Cómo ganás una pelea?",
    options: [
      { text: "Me levanto una y otra vez.", sfx: "まだだ", points: { ichigo: 3 } },
      { text: "La gané antes de que empezara.", sfx: "計画通り", points: { aizen: 2, urahara: 1 } },
      { text: "Con técnica precisa y sangre fría.", sfx: "スッ", points: { rukia: 2, byakuya: 1 } },
      { text: "No me importa ganar. Me importa pelear.", sfx: "ハハハ", points: { kenpachi: 2, grimmjow: 1 } },
    ],
  },
  {
    id: 8,
    kicker: "Última",
    question: "La frase que te define:",
    options: [
      { text: "“A los míos no los toca nadie.”", sfx: "ドン!", points: { ichigo: 2, orihime: 1 } },
      { text: "“Yo soy el rey.”", sfx: "ドン!", points: { grimmjow: 3 } },
      { text: "“Nada es imposible con el plan correcto.”", sfx: "ドン!", points: { urahara: 2, rukia: 1 } },
      { text: "“Todo es parte de algo más grande.”", sfx: "ドン!", points: { aizen: 2, byakuya: 1 } },
    ],
  },
];

export function computeResult(scores: Partial<Record<CharacterId, number>>): CharacterId {
  const entries = Object.entries(scores) as [CharacterId, number][];
  if (!entries.length) return "ichigo";
  const max = Math.max(...entries.map(([, v]) => v));
  const top = entries.filter(([, v]) => v === max).map(([k]) => k);
  return top[Math.floor(Math.random() * top.length)];
}
