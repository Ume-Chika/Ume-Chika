/**
 * ==========================================================================
 * プロジェクト一覧マスターデータ
 * ==========================================================================
 *
 * 全てのプロジェクトデータはここで一元管理されます。
 * 新しい作品を作った時は、この配列に1オブジェクト追加するだけで
 * サイト全体に自動で反映されます。
 */

/**
 * カテゴリ定義マスター（単一の情報源）
 */
export const CATEGORY_MAP = {
  personal: { filterLabel: "個人開発", badgeLabel: "個人", isFilterTab: true },
  team: { filterLabel: "チーム・イベント", badgeLabel: "チーム", isFilterTab: true },
  miss: { filterLabel: "はずれ", badgeLabel: "ハズレ", isFilterTab: false },
} as const;

export type CategoryKey = keyof typeof CATEGORY_MAP; // "personal" | "team"

export interface Project {
  title: string;
  category: CategoryKey;         // カテゴリマスターのキーに連動
  date: string;                  // YYYY.MM 形式（辞書順ソートが可能）
  url: string;                   // GitHub Pages, GitHub Repo, または ProtoPedia
  imageUrl: string;              // OGP画像または作品写真のURL
}

export const PROJECTS: Project[] = [
  {
    title: "Barless",
    category: "personal",
    date: "2026.11",
    url: "https://github.com/Ume-Chika/barless",
    imageUrl: "https://opengraph.githubassets.com/1/Ume-Chika/barless",
  },
  {
    title: "WriteToFire",
    category: "personal",
    date: "2026.09",
    url: "https://ume-chika.github.io/WriteToFire/",
    imageUrl: "https://opengraph.githubassets.com/1/Ume-Chika/WriteToFire",
  },
  {
    title: "Longstep",
    category: "personal",
    date: "2026.11",
    url: "https://ume-chika.github.io/longstep/",
    imageUrl: "https://opengraph.githubassets.com/1/Ume-Chika/longstep",
  },
  {
    title: "CafeLimit",
    category: "personal",
    date: "2026.11",
    url: "https://ume-chika.github.io/CafeLimit/",
    imageUrl: "https://ume-chika.github.io/CafeLimit/og-image.png",
  },
  {
    title: "pref_quiz_withGeoJson",
    category: "personal",
    date: "2026.11",
    url: "https://ume-chika.github.io/pref_quiz_withGeoJson/",
    imageUrl: "https://ume-chika.github.io/pref_quiz_withGeoJson/static/social-card.png",
  },
  {
    title: "pref_quiz",
    category: "personal",
    date: "2025.06",
    url: "https://github.com/Ume-Chika/pref_quiz",
    imageUrl: "https://opengraph.githubassets.com/1/Ume-Chika/pref_quiz",
  },
  {
    title: "The Ghost in the Camera",
    category: "team",
    date: "2025.08",
    url: "https://protopedia.net/prototype/7102",
    imageUrl: "https://protopedia.net/pic/f44a1197-ead6-4947-a94d-797e330bb51e.png",
  },
  {
    title: "PyTorch_POKE",
    category: "personal",
    date: "2025.06",
    url: "https://github.com/Ume-Chika/PyTorch_POKE",
    imageUrl: "https://opengraph.githubassets.com/1/Ume-Chika/PyTorch_POKE",
  },
  {
    title: "learning_cpp",
    category: "personal",
    date: "2025.08",
    url: "https://github.com/Ume-Chika/learning_cpp",
    imageUrl: "https://opengraph.githubassets.com/1/Ume-Chika/learning_cpp",
  },
  {
    title: "電脳カチューシャ",
    category: "team",
    date: "2024.07",
    url: "https://protopedia.net/prototype/5395",
    imageUrl: `${import.meta.env.BASE_URL}cyber_katyusha_ogp.png`,
  },
  {
    title: "電脳ネコの手",
    category: "team",
    date: "2024.07",
    url: "https://protopedia.net/prototype/5563",
    imageUrl: "https://protopedia.net/pic/fd434854-92b9-46bc-a74e-c5f5c4b38114.png",
  },
];
