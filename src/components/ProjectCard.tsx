import { useState } from "react";
import { CATEGORY_MAP, type Project } from "../data/projects";

/**
 * プロジェクトカードの引数（props）型定義
 */
interface ProjectCardProps {
  project: Project;
}

/**
 * 単一のプロジェクトカードを描画するReactコンポーネント（金型）
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const [hasError, setHasError] = useState(false);

  const cardInner = (
    <>
      <div className="card-thumbnail">
        {hasError || !project.imageUrl ? (
          <div className="card-thumbnail-fallback">
            <span className="fallback-badge">
              {CATEGORY_MAP[project.category].badgeLabel}
            </span>
            <span className="fallback-title">{project.title}</span>
          </div>
        ) : (
          <img
            src={project.imageUrl}
            alt={project.title}
            loading="lazy"
            onError={() => setHasError(true)}
          />
        )}
      </div>
      <div className="card-body">
        <h2 className="card-title">{project.title}</h2>
        <div className="card-meta">
          <span className="card-date">{project.date}</span>
          <span className="category-badge">
            {CATEGORY_MAP[project.category].badgeLabel}
          </span>
        </div>
      </div>
    </>
  );

  return (
    <article className="project-card" data-category={project.category}>
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="card-link"
        >
          {cardInner}
        </a>
      ) : (
        <div className="card-link no-link">{cardInner}</div>
      )}
    </article>
  );
}
