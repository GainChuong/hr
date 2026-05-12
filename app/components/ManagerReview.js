"use client";

import { IconMessageSquare, IconStar } from "./Icons";

export default function ManagerReview({ managerComment, managerRating }) {
  if (!managerComment) return null;

  const ratingLabel = managerRating >= 4.5 ? "Xuất sắc" : managerRating >= 3.5 ? "Tốt" : managerRating >= 2.5 ? "Đạt yêu cầu" : "Cần cải thiện";
  const ratingColor = managerRating >= 4.5 ? "#10B981" : managerRating >= 3.5 ? "#F59E0B" : managerRating >= 2.5 ? "#F97316" : "#EF4444";

  return (
    <div className="animate-fade-in-up" style={{ marginTop: 4, animationDelay: "400ms" }}>
      {/* Section header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8, marginBottom: 6,
        paddingBottom: 4, borderBottom: "1px solid rgba(255,255,255,0.3)",
      }}>
        <div style={{ padding: 6, borderRadius: "50%", background: "linear-gradient(135deg, var(--color-cta), #EC4899)", boxShadow: "0 2px 8px rgba(236, 72, 153, 0.4)" }}>
          <IconMessageSquare size={16} style={{ color: "white" }} />
        </div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 700, color: "var(--color-text)", margin: 0, letterSpacing: "-0.01em" }}>
          Đánh giá từ Quản lý trực tiếp
        </h2>
      </div>

      <div className="glass-card" style={{ padding: "10px 12px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 3, background: ratingColor, boxShadow: `0 0 12px ${ratingColor}` }} />
        
        {/* Manager info */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6, paddingBottom: 6, borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: `linear-gradient(135deg, ${ratingColor}20, ${ratingColor}40)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `1px solid ${ratingColor}40`, boxShadow: `0 2px 8px ${ratingColor}20`
            }}>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 800, color: ratingColor }}>QT</span>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, color: "var(--color-text)", margin: 0 }}>Quản lý Trực tiếp</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--color-text-secondary)", margin: 0, marginTop: 1 }}>Kỳ đánh giá Q4/2025</p>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2, justifyContent: "flex-end" }}>
              {Array.from({ length: 5 }).map((_, i) => {
                const fillPct = Math.min(Math.max(managerRating - i, 0), 1) * 100;
                return (
                  <IconStar key={i} size={13} fillPct={fillPct} color="#F59E0B" style={{ filter: fillPct > 0 ? "drop-shadow(0 0 2px rgba(245, 158, 11, 0.5))" : "none" }} />
                );
              })}
            </div>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700, color: ratingColor, padding: "2px 8px", borderRadius: "var(--radius-full)", background: `${ratingColor}15`, display: "inline-block" }}>
              {managerRating.toFixed(1)} — {ratingLabel}
            </span>
          </div>
        </div>

        {/* Comment body */}
        <div style={{ position: "relative", padding: "6px 10px", background: "rgba(255,255,255,0.2)", borderRadius: "var(--radius-md)", borderLeft: `3px solid ${ratingColor}` }}>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 11, color: "var(--color-text-secondary)",
            lineHeight: 1.4, margin: 0, fontStyle: "italic",
          }}>
            "{managerComment}"
          </p>
        </div>

        {/* Timestamp */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "var(--color-text-tertiary)", fontWeight: 500 }}>
            Cập nhật lần cuối: 06/01/2026
          </span>
        </div>
      </div>
    </div>
  );
}
