/**
 * ==========================================================================
 * ダーツの矢 コンポーネント（盤面に垂直に刺さるリアビュー / 後方視点）
 * ==========================================================================
 * 盤面に手前から垂直に突き刺さっているため、ダーツの後端（十字フライトとシャフト）が見える。
 */

interface DartProps {
  className?: string;
  size?: number;
  x?: number | string;
  y?: number | string;
}

export function Dart({
  className = "",
  size = 32,
  x = -size / 2,
  y = -size / 2,
}: DartProps) {
  return (
    <svg
      className={`dart-svg ${className}`}
      width={size}
      height={size}
      x={x}
      y={y}
      viewBox="-24 -24 48 48"
      aria-hidden="true"
    >
      {/* 刺さった箇所の影 */}
      <circle cx="1.5" cy="1.5" r="5" fill="rgba(0, 0, 0, 0.35)" />

      {/* フライト（直線的でシャープな十字羽根・スタンダード形状） */}
      {/* 上フライト */}
      <polygon
        points="-1.8,-3 -2.2,-17 0,-19 2.2,-17 1.8,-3"
        fill="#ef4444"
        stroke="#b91c1c"
        strokeWidth="0.5"
      />
      {/* 下フライト */}
      <polygon
        points="-1.8,3 -2.2,17 0,19 2.2,17 1.8,3"
        fill="#dc2626"
        stroke="#991b1b"
        strokeWidth="0.5"
      />
      {/* 左フライト */}
      <polygon
        points="-3,-1.8 -17,-2.2 -19,0 -17,2.2 -3,1.8"
        fill="#b91c1c"
        stroke="#7f1d1d"
        strokeWidth="0.5"
      />
      {/* 右フライト */}
      <polygon
        points="3,-1.8 17,-2.2 19,0 17,2.2 3,1.8"
        fill="#f87171"
        stroke="#b91c1c"
        strokeWidth="0.5"
      />

      {/* 十字スリットの溝 */}
      <line x1="0" y1="-18" x2="0" y2="18" stroke="#ffffff" strokeWidth="0.6" opacity="0.6" />
      <line x1="-18" y1="0" x2="18" y2="0" stroke="#ffffff" strokeWidth="0.6" opacity="0.6" />

      {/* シャフト（十字羽根の付け根スリット） */}
      <circle cx="0" cy="0" r="3.5" fill="#334155" stroke="#0f172a" strokeWidth="0.8" />

      {/* バレル後端（金属キャップ） */}
      <circle cx="0" cy="0" r="2" fill="#f59e0b" stroke="#b45309" strokeWidth="0.6" />
      <circle cx="0" cy="0" r="0.8" fill="#fef3c7" />
    </svg>
  );
}
