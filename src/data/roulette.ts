import { PROJECTS, type Project } from "./projects";

/**
 * ルーレット設定定数
 */
export const TAWASHI_COUNT = 3; // 盤面内のたわし枠数（固定）

/**
 * ルーレット限定シークレット枠「たわし」
 */
export const TAWASHI_PROJECT: Project = {
  title: "たわし",
  category: "miss",
  date: "",
  url: "",
  imageUrl:
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEitKbOOCsK9ra6qJ3JZHTX7yi8zrvZv4uDb4Y5HdvCnZM5KW0wufBX8oNueWEL4RjYrBBrlVnRtuxXBxrZGIxzqKyd_i_G03KmM5SoDIVu9G-lDI0s-8d471Vabgeg_lJtL-JizEFa9jEp5/s400/goods_tawashi.png",
};

/**
 * 作品リストに対して、たわし（固定枠数）を均等分散挿入したルーレット盤面配列を自動生成する
 *
 * @param projects 対象となる作品配列
 * @param tawashiCount 挿入するたわしの枠数（デフォルト: 3）
 * @returns 均等分散されたルーレット盤面用配列
 */
export function buildRouletteItems(
  projects: Project[] = PROJECTS,
  tawashiCount: number = TAWASHI_COUNT
): Project[] {
  const total = projects.length + tawashiCount;
  if (total === 0) return [];

  // たわしを均等間隔に配置するインデックスを算出
  const tawashiIndices = new Set(
    Array.from({ length: tawashiCount }, (_, i) =>
      Math.round(((i + 1) * total) / (tawashiCount + 1)) - 1
    )
  );

  const result: Project[] = [];
  let projIndex = 0;

  for (let i = 0; i < total; i++) {
    if (tawashiIndices.has(i)) {
      result.push(TAWASHI_PROJECT);
    } else if (projIndex < projects.length) {
      result.push(projects[projIndex++]);
    }
  }

  return result;
}

/**
 * 盤面用アイテムマスター（自動生成済み）
 */
export const ROULETTE_ITEMS: Project[] = buildRouletteItems(PROJECTS);
