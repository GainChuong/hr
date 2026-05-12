"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { IconInfo } from "./Icons";

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#06B6D4", "#F97316", "#8B5CF6", "#14B8A6"];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{
      background: "rgba(15, 23, 42, 0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)",
      borderRadius: "var(--radius-md)", padding: "10px 14px", boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
    }}>
      <p style={{ fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 700, margin: "0 0 4px", color: "white" }}>{d.label}</p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.8)", margin: 0 }}>
        Trọng số: <strong style={{ color: "white" }}>{d.weight}%</strong> | Đóng góp: <strong style={{ color: "white" }}>{d.contribution}%</strong>
      </p>
    </div>
  );
}

export default function XaiExplanation({ xaiData }) {
  if (!xaiData) return null;

  const barData = xaiData.factors
    .sort((a, b) => b.contribution - a.contribution)
    .map((f) => ({
      label: f.label,
      contribution: f.contribution,
      weight: (f.weight * 100).toFixed(0),
      normalized: f.normalized,
    }));

  const prob = xaiData.promotionProbability;
  const probColor = prob >= 65 ? "#10B981" : prob >= 40 ? "#F59E0B" : "#EF4444";
  const probLabel = prob >= 65 ? "Khả năng cao" : prob >= 40 ? "Trung bình" : "Khả năng thấp";

  return (
    <div className="animate-fade-in-up" style={{ marginTop: 2, animationDelay: "300ms", display: "flex", flexDirection: "column", gap: 8 }}>
      {/* Section header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        paddingBottom: 2, borderBottom: "1px solid rgba(255,255,255,0.3)",
      }}>
        <div style={{ padding: 6, borderRadius: "50%", background: "linear-gradient(135deg, var(--color-primary), var(--color-cta))", boxShadow: "0 2px 8px rgba(79, 70, 229, 0.4)" }}>
          <IconInfo size={16} style={{ color: "white" }} />
        </div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 700, color: "var(--color-text)", margin: 0, letterSpacing: "-0.01em" }}>
          Phân tích XAI — Yếu tố ảnh hưởng đến cơ hội thăng tiến
        </h2>
      </div>

      {/* Side-by-side info strip: Probability Prediction (Left) & Explanation Text (Right) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 8 }}>
        {/* Promotion probability card */}
        <div className="glass-card" style={{ padding: "6px 12px", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 4, background: probColor, boxShadow: `0 0 12px ${probColor}` }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, color: "var(--color-text-secondary)", margin: "0 0 2px" }}>Xác suất dự đoán thăng tiến</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 800, color: probColor, textShadow: `0 0 12px ${probColor}50` }}>{prob}%</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700, color: probColor, padding: "2px 8px", borderRadius: "var(--radius-full)", background: `${probColor}15` }}>{probLabel}</span>
              </div>
            </div>
            <div style={{ width: "100%", maxWidth: 100, height: 4, background: "rgba(0,0,0,0.05)", borderRadius: "var(--radius-full)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.4)" }}>
              <div style={{ 
                width: `${prob}%`, height: "100%", 
                background: `linear-gradient(90deg, ${probColor}, ${probColor}DD)`, 
                borderRadius: "var(--radius-full)",
                boxShadow: `0 0 8px ${probColor}80`,
                transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)"
              }} />
            </div>
          </div>
        </div>

        {/* Explanation text */}
        <div className="glass-card" style={{ padding: "6px 12px", position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}>
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 3, background: "var(--color-primary)" }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(79, 70, 229, 0.05)", zIndex: -1 }} />
          <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.4 }}>
            <strong style={{ color: "var(--color-primary)", fontWeight: 700, marginRight: 4 }}>Giải thích:</strong> Hệ thống phân tích mức độ đóng góp và trọng số ảnh hưởng của từng yếu tố đến cơ hội thăng tiến. KPI Achievement và Performance Score chiếm tỷ trọng cao nhất.
          </p>
        </div>
      </div>

      {/* Single Full-width Horizontal Bar Chart */}
      <div className="glass-card" style={{ padding: "8px 12px" }}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, color: "var(--color-text)", margin: "0 0 4px" }}>
          Mức đóng góp vào dự đoán (XAI)
        </h3>
        <div style={{ width: "100%", height: 150 }}>
          <ResponsiveContainer>
            <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 15, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "var(--color-text-tertiary)", fontWeight: 500 }} />
              <YAxis 
                dataKey="label" 
                type="category" 
                width={140} 
                interval={0}
                tick={{ fontSize: 11, fill: "var(--color-text-secondary)", fontWeight: 600 }} 
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
              <Bar dataKey="contribution" radius={[0, 4, 4, 0]} barSize={10}>
                {barData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
