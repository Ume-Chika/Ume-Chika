import { useState, useRef, useEffect, useCallback } from "react";
import { ROULETTE_ITEMS } from "../data/roulette";
import { type Project } from "../data/projects";

export type RouletteStatus = "idle" | "spinning" | "stopping" | "result";

export interface DartHitInfo {
  localAngle: number;
  radius: number;
}

const SPIN_SPEED = 960; // 定常スピン角速度 (deg/s)
const FLIGHT_TIME = 0.3; // ダーツ飛翔時間 (300ms)
const STOP_DURATION = 4.2; // 減速時間 (4.2秒)
const EASE_POWER = 3; // 3次減速カーブ (Cubic)

/**
 * ルーレット＆ダーツ機能（物理アニメーション・リアルタイム幾何着弾ロジック）
 */
export function useRoulette() {
  const [status, setStatus] = useState<RouletteStatus>("idle");
  const [rotation, setRotation] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDartFlying, setIsDartFlying] = useState(false);
  const [dartHit, setDartHit] = useState<DartHitInfo | null>(null);
  const [flightTarget, setFlightTarget] = useState({ x: 0, y: -95 });

  const currentRotationRef = useRef(0);
  const lastTimeRef = useRef<number>(0);
  const hitTimeoutRef = useRef<number | null>(null);

  const itemCount = ROULETTE_ITEMS.length;
  const stepAngle = 360 / itemCount;

  useEffect(() => {
    let animId: number;

    if (status === "spinning") {
      lastTimeRef.current = performance.now();
      const spinLoop = (now: number) => {
        const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
        lastTimeRef.current = now;
        currentRotationRef.current += SPIN_SPEED * dt;
        setRotation(currentRotationRef.current);
        animId = requestAnimationFrame(spinLoop);
      };
      animId = requestAnimationFrame(spinLoop);
    } else if (status === "stopping") {
      const startAngle = currentRotationRef.current;
      const totalDelta = (SPIN_SPEED * STOP_DURATION) / EASE_POWER;
      const startTime = performance.now();

      const stopLoop = (now: number) => {
        const elapsed = (now - startTime) / 1000;
        const progress = Math.min(elapsed / STOP_DURATION, 1);
        const easeOut = 1 - Math.pow(1 - progress, EASE_POWER);
        const currentAngle = startAngle + totalDelta * easeOut;

        currentRotationRef.current = currentAngle;
        setRotation(currentAngle);

        if (progress < 1) {
          animId = requestAnimationFrame(stopLoop);
        } else {
          setStatus("result");
        }
      };
      animId = requestAnimationFrame(stopLoop);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (hitTimeoutRef.current) clearTimeout(hitTimeoutRef.current);
    };
  }, [status]);

  const startSpin = useCallback(() => {
    setSelectedProject(null);
    setIsDartFlying(false);
    setDartHit(null);
    setStatus("spinning");
  }, []);

  const shootDart = useCallback(() => {
    if (status !== "spinning" || isDartFlying) return;

    // 着弾位置にランダムな振れ幅（手ぶれ）を持たせる
    const jitterAngle = (Math.random() - 0.5) * 32; // ±16度の振れ幅
    const hitRadius = 75 + Math.random() * 45; // 半径 75〜120px の振れ幅

    // 画面上の着弾XY座標（飛翔アニメーション用: SVG viewBox 320基準のpx座標）
    const rad = (jitterAngle - 90) * (Math.PI / 180);
    const targetX = hitRadius * Math.cos(rad);
    const targetY = hitRadius * Math.sin(rad);
    setFlightTarget({ x: targetX, y: targetY });

    setIsDartFlying(true);

    hitTimeoutRef.current = window.setTimeout(() => {
      const rHit = currentRotationRef.current;

      // 振れ幅を持った着弾位置に対応するセグメントを幾何計算
      const normalizedAngle = (((-rHit + jitterAngle) % 360) + 360) % 360;
      const winIndex = Math.min(Math.floor(normalizedAngle / stepAngle), itemCount - 1);
      const winProject = ROULETTE_ITEMS[winIndex];
      setSelectedProject(winProject);

      // 着弾した実位置（ローカル角度と半径）にダーツを突き刺す
      setDartHit({
        localAngle: normalizedAngle - 90,
        radius: hitRadius,
      });
      setIsDartFlying(false);

      setStatus("stopping");
    }, FLIGHT_TIME * 1000);
  }, [status, isDartFlying, stepAngle, itemCount]);

  const reset = useCallback(() => {
    setStatus("idle");
  }, []);

  return {
    status,
    rotation,
    selectedProject,
    isDartFlying,
    dartHit,
    flightTarget,
    startSpin,
    shootDart,
    reset,
  };
}
