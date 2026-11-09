import React, { useEffect, useRef } from "react";
import { useRoulette } from "../hooks/useRoulette";
import { ProjectCard } from "./ProjectCard";
import { RouletteBoard } from "./RouletteBoard";
import { Dart } from "./Dart";
import "../roulette.css";

interface ControlsProps {
  status: string;
  isDartFlying: boolean;
  onStartSpin: () => void;
  onShootDart: () => void;
  onClose: () => void;
  spinBtnRef: React.RefObject<HTMLButtonElement | null>;
  dartBtnRef: React.RefObject<HTMLButtonElement | null>;
}

const RouletteControls = React.memo(function RouletteControls({
  status,
  isDartFlying,
  onStartSpin,
  onShootDart,
  onClose,
  spinBtnRef,
  dartBtnRef,
}: ControlsProps) {
  const isSpinning = status === "spinning";
  const isStopping = status === "stopping";

  return (
    <div className="roulette-controls" role="group" aria-label="ルーレット操作">
      <button
        ref={spinBtnRef}
        type="button"
        className={`roulette-btn ${!isSpinning && !isStopping ? "primary" : ""}`}
        onClick={onStartSpin}
        disabled={isSpinning || isStopping}
        title="スピン (Space)"
      >
        スピン
      </button>
      <button
        ref={dartBtnRef}
        type="button"
        className={`roulette-btn ${isSpinning ? "primary" : ""}`}
        onClick={onShootDart}
        disabled={!isSpinning || isDartFlying}
        title="ダーツを投げる (Space)"
      >
        ダーツ
      </button>
      <button
        type="button"
        className="roulette-btn"
        onClick={onClose}
        disabled={isStopping}
        title="ルーレットを終了 (Esc)"
      >
        終了
      </button>
    </div>
  );
});

export function RouletteView({ onClose }: { onClose: () => void }) {
  const {
    status,
    rotation,
    selectedProject,
    isDartFlying,
    dartHit,
    flightTarget,
    startSpin,
    shootDart,
    reset,
  } = useRoulette();

  const spinBtnRef = useRef<HTMLButtonElement | null>(null);
  const dartBtnRef = useRef<HTMLButtonElement | null>(null);
  const modalPrimaryBtnRef = useRef<HTMLButtonElement | null>(null);

  // フォーカス制御: 状態遷移時に操作可能なボタンへ自動誘導
  useEffect(() => {
    if (status === "spinning") dartBtnRef.current?.focus();
    else if (status === "result") modalPrimaryBtnRef.current?.focus();
    else if (status === "idle") spinBtnRef.current?.focus();
  }, [status]);

  // キーボードショートカット: Spaceで進行, Escでモーダル閉じる/終了
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "Escape") {
        e.preventDefault();
        if (status === "result") reset();
        else if (status !== "stopping") onClose();
      } else if (e.key === " " || e.key === "Spacebar") {
        if (document.activeElement?.tagName === "A") return;
        e.preventDefault();
        if (status === "idle" || status === "result") startSpin();
        else if (status === "spinning" && !isDartFlying) shootDart();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [status, isDartFlying, startSpin, shootDart, reset, onClose]);

  const liveAnnouncement =
    status === "spinning"
      ? "ルーレット回転中。スペースキーまたはダーツボタンで投げてください。"
      : status === "stopping"
      ? "ダーツが刺さりました。ルーレット減速中..."
      : status === "result" && selectedProject
      ? `「${selectedProject.title}」が当たりました！`
      : "";

  return (
    <div className="roulette-container">
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {liveAnnouncement}
      </div>

      <RouletteControls
        status={status}
        isDartFlying={isDartFlying}
        onStartSpin={startSpin}
        onShootDart={shootDart}
        onClose={onClose}
        spinBtnRef={spinBtnRef}
        dartBtnRef={dartBtnRef}
      />

      <div className="roulette-wheel-wrapper">
        <RouletteBoard
          rotation={rotation}
          dartHit={dartHit}
          isDartFlying={isDartFlying}
          flightTarget={flightTarget}
        />
      </div>

      {status === "result" && selectedProject && (
        <div
          className="roulette-modal-overlay"
          onClick={reset}
          role="dialog"
          aria-modal="true"
          aria-label={`ルーレット結果: ${selectedProject.title}`}
        >
          <div className="roulette-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-card-container">
              <ProjectCard project={selectedProject} />
            </div>
            <div className="modal-actions">
              <button
                ref={modalPrimaryBtnRef}
                type="button"
                className="roulette-btn primary"
                onClick={startSpin}
              >
                もう1回
              </button>
              <button type="button" className="roulette-btn" onClick={reset}>
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
