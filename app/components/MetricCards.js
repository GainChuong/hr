"use client";

import { IconTarget, IconTrendUp, IconHeart, IconBookOpen, IconAward, IconUsers, IconStar, IconCalendar } from "./Icons";

const METRIC_CONFIG = [
  { key: "performance_score", label: "Performance Score", sublabel: "Điểm hiệu suất", icon: IconTarget, max: 100, unit: "/100", color: "#4F46E5" },
  { key: "kpi_achievement", label: "KPI Achievement", sublabel: "Tỷ lệ hoàn thành", icon: IconTrendUp, max: 100, unit: "%", color: "#10B981" },
  { key: "peer_feedback_score", label: "Peer Feedback", sublabel: "Đánh giá đồng nghiệp", icon: IconUsers, max: 5, unit: "/5.0", color: "#8B5CF6" },
  { key: "employee_engagement_score", label: "Engagement", sublabel: "Mức độ gắn kết", icon: IconHeart, max: 100, unit: "/100", color: "#EC4899" },
  { key: "mentoring_sessions", label: "Mentoring", sublabel: "Số buổi hướng dẫn", icon: IconCalendar, max: 8, unit: " buổi", color: "#06B6D4" },
  { key: "training_hours_last_year", label: "Training Hours", sublabel: "Số giờ đào tạo", icon: IconBookOpen, max: 60, unit: " giờ", color: "#F97316" },
  { key: "certifications_count", label: "Certifications", sublabel: "Chứng chỉ đạt được", icon: IconAward, max: 6, unit: " chứng chỉ", color: "#14B8A6" },
];

const MANAGER_METRIC = { key: "manager_rating", label: "Manager Rating", sublabel: "Đánh giá từ quản lý", icon: IconStar, max: 5, unit: "/5.0", color: "#F97316" };

function getScoreLevel(value, max) {
  const pct = (value / max) * 100;
  if (pct >= 80) return { label: "Xuất sắc", color: "#10B981", bg: "rgba(16, 185, 129, 0.15)" };
  if (pct >= 60) return { label: "Tốt", color: "#4F46E5", bg: "rgba(79, 70, 229, 0.15)" };
  if (pct >= 40) return { label: "Trung bình", color: "#F59E0B", bg: "rgba(245, 158, 11, 0.15)" };
  return { label: "Cần cải thiện", color: "#EF4444", bg: "rgba(239, 68, 68, 0.15)" };
}

function formatValue(value, key) {
  if (key === "peer_feedback_score" || key === "manager_rating") return value.toFixed(1);
  if (key === "mentoring_sessions" || key === "certifications_count") return Math.round(value);
  return value.toFixed(1);
}

export default function MetricCards({ profile, showManagerRating = false }) {
  const metrics = showManagerRating ? [...METRIC_CONFIG, MANAGER_METRIC] : METRIC_CONFIG;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
      {metrics.map((metric, idx) => {
        const value = profile[metric.key];
        if (value === undefined || value === null) return null;
        const pct = Math.min((value / metric.max) * 100, 100);
        const level = getScoreLevel(value, metric.max);
        const Icon = metric.icon;
        const delay = (idx % 4) * 50;

        return (
          <div key={metric.key} className="glass-card animate-fade-in-up" style={{ padding: "8px 12px", animationDelay: `${delay}ms` }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ 
                  width: 30, height: 30, borderRadius: "var(--radius-sm)", 
                  background: `linear-gradient(135deg, ${metric.color}20, ${metric.color}40)`, 
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 2px 8px ${metric.color}20`, border: `1px solid ${metric.color}40`,
                  flexShrink: 0
                }}>
                  <Icon size={16} style={{ color: metric.color }} />
                </div>
                <div style={{ overflow: "hidden" }}>
                  <p style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, color: "var(--color-text)", margin: 0, letterSpacing: "-0.01em", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{metric.label}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--color-text-secondary)", margin: 0, marginTop: 1 }}>{metric.sublabel}</p>
                </div>
              </div>
              <span style={{
                fontSize: 10, fontWeight: 700, padding: "2px 6px",
                borderRadius: "var(--radius-full)", color: level.color, background: level.bg,
                fontFamily: "var(--font-body)", flexShrink: 0
              }}>
                {level.label}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 800, color: "var(--color-text)", lineHeight: 1 }}>
                {formatValue(value, metric.key)}
              </span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "var(--color-text-tertiary)" }}>{metric.unit}</span>
            </div>
            <div style={{ width: "100%", height: 4, background: "rgba(0,0,0,0.05)", borderRadius: "var(--radius-full)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.4)" }}>
              <div style={{
                width: `${pct}%`, height: "100%", borderRadius: "var(--radius-full)",
                background: `linear-gradient(90deg, ${metric.color}, ${metric.color}DD)`,
                boxShadow: `0 0 8px ${metric.color}80`,
                transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)",
              }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
