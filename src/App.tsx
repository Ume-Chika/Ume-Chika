import { useState } from "react";
import { PROJECTS, CATEGORY_MAP, type CategoryKey } from "./data/projects";
import { ProjectCard } from "./components/ProjectCard";
import { RouletteTrigger } from "./components/RouletteTrigger";
import { RouletteView } from "./components/RouletteView";

/** UI固有のフィルター状態型（"all" ＋ データ層のカテゴリ一覧） */
type FilterType = "all" | CategoryKey;

/**
 * サイト全体のルートコンポーネント（司令塔）
 */
export function App() {
  // 1. フィルター状態（all または 各カテゴリ）を管理。初期値は "all"
  const [filter, setFilter] = useState<FilterType>("all");
  // 2. ルーレットモードフラグ（true でルーレット画面に切り替え）
  const [isRouletteMode, setIsRouletteMode] = useState(false);

  // 3. 現在のフィルターに応じて表示するプロジェクトを抽出
  const filteredProjects = PROJECTS.filter((project) => {
    if (filter === "all") return true;
    return project.category === filter;
  });

  const handleLaunchRoulette = () => {
    setIsRouletteMode(true);
    // メインコンテンツ領域（ルーレット盤面）へスムーズスクロール
    const mainEl = document.querySelector(".main-content");
    if (mainEl) {
      mainEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCloseRoulette = () => {
    setIsRouletteMode(false);
  };

  return (
    <>
      {/* ① ヘッダー：導入・ステートメント */}
      <header className="site-header">
        <div className="header-inner">
          <h1 className="site-title">
            Chikara Umeda
            <span className="site-subtitle">Ume-Chika</span>
          </h1>
          <p className="statement">
            興味を持ったことから少しずつ勉強中。<br />
            思いついたものを自分の手で実現できるエンジニアを目指しています。<br />
            100歳まで挑戦を続けたいです。
          </p>
        </div>
      </header>

      {/* ② ルーレットモード または 通常一覧モードの切り替え */}
      {isRouletteMode ? (
        <main className="main-content">
          <RouletteView onClose={handleCloseRoulette} />
        </main>
      ) : (
        <div className="portfolio-view">
          {/* フィルターバー */}
          <nav className="filter-nav" aria-label="プロジェクトの絞り込み">
            <div className="filter-group" role="tablist">
              <button
                type="button"
                className={`filter-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                すべて
              </button>
              {(Object.keys(CATEGORY_MAP) as CategoryKey[])
                .filter((key) => CATEGORY_MAP[key].isFilterTab)
                .map((key) => (
                  <button
                    key={key}
                    type="button"
                    className={`filter-btn ${filter === key ? "active" : ""}`}
                    onClick={() => setFilter(key)}
                  >
                    {CATEGORY_MAP[key].filterLabel}
                  </button>
                ))}
            </div>
          </nav>

          {/* プロジェクトグリッド */}
          <main className="main-content">
            <section className="project-grid" id="project-grid">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </section>
          </main>
        </div>
      )}

      {/* ③ フッター */}
      <footer className="site-footer">
        {filter === "all" && !isRouletteMode && (
          <RouletteTrigger onLaunch={handleLaunchRoulette} />
        )}
        <div className="footer-inner">
          <ul className="social-links">
            <li>
              <a
                href="https://github.com/Ume-Chika"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
          <p className="copyright">&copy; 2026 Chikara Umeda</p>
        </div>
      </footer>
    </>
  );
}
