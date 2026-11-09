import React from "react";
import { ROULETTE_ITEMS } from "../data/roulette";
import { type DartHitInfo } from "../hooks/useRoulette";
import { Dart } from "./Dart";

interface RouletteBoardProps {
  rotation: number;
  dartHit: DartHitInfo | null;
  isDartFlying?: boolean;
  flightTarget?: { x: number; y: number };
}

const SECTOR_COLORS = [
  "#be123c", "#1d4ed8", "#047857", "#b45309",
  "#6d28d9", "#be185d", "#0e7490", "#c2410c",
];

// たわし専用の温かみのあるブラウンカラー
const TAWASHI_COLOR = "#854d0e";

function getSectorLabel(title: string): string {
  if (title === "pref_quiz_withGeoJson") return "pref_quiz (Geo)";
  if (title === "The Ghost in the Camera") return "The Ghost…";
  if (title.length <= 12) return title;
  return `${title.slice(0, 11)}…`;
}

export const RouletteBoard = React.memo(function RouletteBoard({
  rotation,
  dartHit,
  isDartFlying,
  flightTarget,
}: RouletteBoardProps) {
  const itemCount = ROULETTE_ITEMS.length;
  const stepAngle = 360 / itemCount;

  return (
    <svg
      className="roulette-svg"
      viewBox="-160 -160 320 320"
      role="img"
      aria-label="ルーレット盤面"
    >
      {/* 回転する円盤グループ（SVG要素自体を回さないことでバウンディングボックスの飛び出しを防止） */}
      <g transform={`rotate(${rotation})`}>
        {/* セグメント一覧 */}
        {ROULETTE_ITEMS.map((item, idx) => {
          const a1 = (idx * stepAngle - 90) * (Math.PI / 180);
          const a2 = ((idx + 1) * stepAngle - 90) * (Math.PI / 180);
          const pathData = `M 0 0 L ${148 * Math.cos(a1)} ${148 * Math.sin(a1)} A 148 148 0 0 1 ${148 * Math.cos(a2)} ${148 * Math.sin(a2)} Z`;
          const isTawashi = item.category === "miss";
          const fill = isTawashi ? TAWASHI_COLOR : SECTOR_COLORS[idx % SECTOR_COLORS.length];
          const label = getSectorLabel(item.title);

          return (
            <g key={`${item.title}-${idx}`}>
              <path d={pathData} fill={fill} stroke="#ffffff" strokeWidth="1.5" />
              {/* エリアの幾何学的中心に文字を完全配置 */}
              <text
                transform={`rotate(${idx * stepAngle + stepAngle / 2}) translate(0, -95) rotate(90)`}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#ffffff"
                fontSize={isTawashi ? "11" : label.length > 11 ? "8" : "9.5"}
                fontWeight="700"
                style={{ userSelect: "none" }}
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* 外周リング（セグメント境界の微小隙間を防ぎ輪郭を強調） */}
        <circle cx="0" cy="0" r="148" fill="none" stroke="#ffffff" strokeWidth="1.5" />

        {/* 盤面に垂直に突き刺さり、回転に追従するダーツ（後方リアビューSVG） */}
        {dartHit && (
          <g transform={`rotate(${dartHit.localAngle + 90}) translate(0, -${dartHit.radius})`}>
            <Dart size={32} />
          </g>
        )}
      </g>

      {/* 飛翔中のダーツ（盤面と同じSVG座標系・着弾点へ正確に飛翔） */}
      {isDartFlying && flightTarget && (
        <g
          className="flying-dart"
          style={
            {
              "--target-x": `${flightTarget.x}px`,
              "--target-y": `${flightTarget.y}px`,
            } as React.CSSProperties
          }
        >
          <Dart size={32} />
        </g>
      )}

      {/* センターピン（白・細枠） */}
      <circle cx="0" cy="0" r="8" fill="#1e1b18" stroke="#ffffff" strokeWidth="1.5" />
      <circle cx="0" cy="0" r="5" fill="#ffffff" />
    </svg>
  );
});
