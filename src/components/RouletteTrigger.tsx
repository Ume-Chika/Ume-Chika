/**
 * ==========================================================================
 * ルーレット起動トリガーアイコン（ミニルーレット）
 * ==========================================================================
 *
 * フッターの境界線に2/3潜んでおり、ホバーするとひょっこり顔を出す
 * 遊び心の入り口となるコンポーネント。
 */

interface RouletteTriggerProps {
  onLaunch: () => void;
}

export function RouletteTrigger({ onLaunch }: RouletteTriggerProps) {
  return (
    <button
      type="button"
      className="roulette-trigger-btn"
      onClick={onLaunch}
      aria-label="ルーレットで作品を選ぶ"
      title="ルーレットで作品を選ぶ"
    >
      <div className="trigger-icon-wrapper">
        <svg
          className="trigger-roulette-wheel"
          viewBox="0 0 40 40"
          width="42"
          height="42"
          aria-hidden="true"
        >
          {/* 外枠リム（細く上品な半透明の白） */}
          <circle
            cx="20"
            cy="20"
            r="19"
            fill="#1a1d27"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="1"
          />
          
          {/* 扇形セグメント（8分割のミニルーレット） */}
          <path d="M20,20 L20,3 A17,17 0 0,1 32,8 Z" fill="#3b82f6" opacity="0.9" />
          <path d="M20,20 L32,8 A17,17 0 0,1 37,20 Z" fill="#8b5cf6" opacity="0.9" />
          <path d="M20,20 L37,20 A17,17 0 0,1 32,32 Z" fill="#ec4899" opacity="0.9" />
          <path d="M20,20 L32,32 A17,17 0 0,1 20,37 Z" fill="#f59e0b" opacity="0.9" />
          <path d="M20,20 L20,37 A17,17 0 0,1 8,32 Z" fill="#10b981" opacity="0.9" />
          <path d="M20,20 L8,32 A17,17 0 0,1 3,20 Z" fill="#06b6d4" opacity="0.9" />
          <path d="M20,20 L3,20 A17,17 0 0,1 8,8 Z" fill="#f97316" opacity="0.9" />
          <path d="M20,20 L8,8 A17,17 0 0,1 20,3 Z" fill="#6366f1" opacity="0.9" />

          {/* 中心ピン */}
          <circle cx="20" cy="20" r="4" fill="#f0f2f5" stroke="#1a1d27" strokeWidth="1.5" />
          {/* 上部ポインター（ダーツの目印） */}
          <polygon points="20,1 17,6 23,6" fill="#ef4444" />
        </svg>
      </div>
    </button>
  );
}
