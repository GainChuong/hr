"use client";

import { IconBarChart } from "./Icons";

export default function LoadingScreen() {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative" // Inherits body mesh gradient
    }}>
      <div className="glass-card animate-fade-in-up" style={{ textAlign: "center", padding: "40px 60px", maxWidth: 400 }}>
        <div style={{ position: "relative", display: "inline-block", marginBottom: 24 }}>
          {/* Glowing ring */}
          <div style={{
            position: "absolute", top: -8, left: -8, right: -8, bottom: -8,
            borderRadius: "50%", background: "conic-gradient(var(--color-primary), var(--color-cta), var(--color-primary))",
            animation: "spin 2s linear infinite", zIndex: 0, filter: "blur(8px)", opacity: 0.6
          }} />
          <div style={{
            position: "relative", zIndex: 1,
            width: 72, height: 72, borderRadius: "50%",
            background: "linear-gradient(135deg, var(--color-primary), var(--color-cta))", 
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 20px rgba(79, 70, 229, 0.4)", border: "2px solid rgba(255,255,255,0.3)"
          }}>
            <IconBarChart size={32} style={{ color: "white" }} />
          </div>
        </div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 700, color: "var(--color-text)", marginBottom: 12 }}>
          Đang tổng hợp dữ liệu...
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-text-secondary)", marginBottom: 32, lineHeight: 1.5 }}>
          Hệ thống XAI đang phân tích các trọng số hiệu suất nội bộ của bạn.
        </p>
        <div style={{ width: "100%", height: 6, background: "rgba(0,0,0,0.05)", borderRadius: "var(--radius-full)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.4)" }}>
          <div style={{
            height: "100%", background: "linear-gradient(90deg, var(--color-primary), var(--color-cta))", borderRadius: "var(--radius-full)",
            animation: "loadBar 1.8s ease-in-out infinite", boxShadow: "0 0 10px rgba(6, 182, 212, 0.5)"
          }} />
        </div>
        <style>{`
          @keyframes loadBar {
            0% { width: 0%; margin-left: 0; }
            50% { width: 60%; margin-left: 20%; }
            100% { width: 0%; margin-left: 100%; }
          }
          @keyframes spin {
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}
