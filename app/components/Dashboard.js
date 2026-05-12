"use client";

import { useEmployee } from "../context/EmployeeContext";
import MetricCards from "./MetricCards";
import XaiExplanation from "./XaiExplanation";
import ManagerReview from "./ManagerReview";
import { IconUser, IconLogOut, IconShield, IconBarChart, IconTarget, IconInfo, IconChevronRight } from "./Icons";

const VIEW_LABELS = {
  1: "Báo cáo Hiệu suất",
  2: "Phân tích XAI",
  3: "Đánh giá Tổng hợp",
};

export default function Dashboard() {
  const { formData, profile, xaiData, managerComment, currentView, setCurrentView, resetAll } = useEmployee();

  if (!profile || !formData) return null;

  const fullName = `${formData.last_name} ${formData.first_name}`.trim();

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Top navigation bar - Frosted Glass */}
      <header style={{
        background: "rgba(255, 255, 255, 0.4)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.05)", flexShrink: 0, zIndex: 50,
      }}>
        <div style={{ maxWidth: 1600, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: "var(--radius-sm)", background: "linear-gradient(135deg, var(--color-primary), var(--color-cta))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 10px rgba(79, 70, 229, 0.3)" }}>
              <IconShield size={16} style={{ color: "white" }} />
            </div>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 700, color: "var(--color-text)", letterSpacing: "-0.01em" }}>HR Analytics XAI</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255, 255, 255, 0.5)", padding: "3px 10px 3px 3px", borderRadius: "var(--radius-full)", border: "1px solid rgba(255, 255, 255, 0.6)" }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconUser size={12} style={{ color: "white" }} />
              </div>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--color-text)", fontWeight: 600 }}>{fullName}</span>
            </div>
            <button onClick={resetAll} style={{
              background: "rgba(255, 255, 255, 0.6)", border: "1px solid rgba(255, 255, 255, 0.8)", borderRadius: "var(--radius-sm)",
              padding: "6px 12px", display: "flex", alignItems: "center", gap: 6, cursor: "pointer",
              fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "var(--color-text-secondary)",
              transition: "all 200ms ease"
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-danger)"; e.currentTarget.style.color = "var(--color-danger)"; e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.8)"; e.currentTarget.style.color = "var(--color-text-secondary)"; e.currentTarget.style.background = "rgba(255, 255, 255, 0.6)"; }}
            >
              <IconLogOut size={14} />
              Thoát
            </button>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main style={{ 
        maxWidth: 1600, width: "100%", margin: "0 auto", padding: "8px 20px", 
        flexGrow: 1, display: "flex", flexDirection: "column", overflow: "hidden", gap: 8 
      }}>
        {/* Top Header Strip: Inline title + view switcher */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 800, color: "var(--color-text)", margin: 0, letterSpacing: "-0.01em" }}>
              {VIEW_LABELS[currentView]}
            </h1>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-text-secondary)" }}>
              Q4/2025 &bull; Phòng <strong style={{ color: "var(--color-primary)" }}>{formData.department}</strong>
            </span>
          </div>

          {/* Narrative Stepper / Guided View Switcher */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Dynamic lead-in prompt bubble */}
            <div style={{
              background: "rgba(79, 70, 229, 0.08)", border: "1px solid rgba(79, 70, 229, 0.2)",
              padding: "5px 12px", borderRadius: "var(--radius-full)", display: "flex", alignItems: "center", gap: 6,
              color: "var(--color-primary)", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600,
              boxShadow: "0 2px 4px rgba(79, 70, 229, 0.05)"
            }}>
              <IconInfo size={13} style={{ flexShrink: 0 }} />
              {currentView === 1 && <span>Chưa hiểu rõ kết quả? Khám phá XAI</span>}
              {currentView === 2 && <span>Cần đối chiếu? Xem đánh giá từ Quản lý</span>}
              {currentView === 3 && <span>Góc nhìn toàn diện 360&deg; đã hoàn tất</span>}
            </div>

            {/* View Switcher Tabs */}
            <div style={{
              display: "flex", background: "rgba(255, 255, 255, 0.6)", borderRadius: "var(--radius-full)",
              border: "1px solid rgba(255, 255, 255, 0.8)", padding: "2px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
            }}>
              {[1, 2, 3].map((v) => {
                const isActive = currentView === v;
                const isRecommendedNext = (currentView === 1 && v === 2) || (currentView === 2 && v === 3);
                
                return (
                  <button key={v} onClick={() => setCurrentView(v)} style={{
                    padding: "6px 14px", border: "none", cursor: "pointer", borderRadius: "var(--radius-full)",
                    fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 600,
                    background: isActive 
                      ? "linear-gradient(135deg, var(--color-primary), var(--color-cta))" 
                      : isRecommendedNext ? "rgba(79, 70, 229, 0.1)" : "transparent",
                    color: isActive ? "white" : isRecommendedNext ? "var(--color-primary)" : "var(--color-text-secondary)",
                    boxShadow: isRecommendedNext && !isActive ? "0 0 0 1px rgba(79, 70, 229, 0.25) inset" : "none",
                    transition: "all 200ms ease",
                    display: "flex", alignItems: "center", gap: 4
                  }}>
                    {v === 1 && <IconBarChart size={12} />}
                    {v === 2 && <IconTarget size={12} />}
                    {v === 3 && <IconUser size={12} />}
                    <span>{v === 1 ? "Số liệu" : v === 2 ? "XAI" : "Tổng hợp"}</span>
                    {isRecommendedNext && <IconChevronRight size={12} style={{ marginLeft: -2 }} />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* High-density layout grid */}
        <div style={{ 
          flexGrow: 1, display: "grid", 
          gridTemplateColumns: currentView === 1 ? "1fr" : "300px 1fr", 
          gap: 12, overflow: "hidden" 
        }}>
          {/* Left Sidebar (Only visible in View 2 and 3) */}
          {currentView >= 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, overflowY: "auto", paddingRight: 4 }}>
              {/* Ultra compact Membership Profile block */}
              <div className="glass-card animate-fade-in-up" style={{ padding: "12px", flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "var(--radius-sm)",
                    background: "linear-gradient(135deg, var(--color-primary), var(--color-cta))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 800,
                    flexShrink: 0
                  }}>
                    {formData.first_name?.charAt(0)?.toUpperCase() || "N"}
                  </div>
                  <div style={{ overflow: "hidden" }}>
                    <p style={{ fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 700, color: "var(--color-text)", margin: "0 0 2px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{fullName}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--color-text-secondary)", margin: 0 }}>
                      {formData.education_level} &bull; {formData.age} tuổi
                    </p>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, background: "rgba(255,255,255,0.4)", padding: "8px 10px", borderRadius: "var(--radius-sm)" }}>
                  <div>
                    <span style={{ fontSize: 9, color: "var(--color-text-tertiary)", display: "block", fontWeight: 600 }}>KHU VỰC</span>
                    <strong style={{ fontSize: 12, color: "var(--color-text)" }}>{formData.city_tier}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: 9, color: "var(--color-text-tertiary)", display: "block", fontWeight: 600 }}>ĐÀO TẠO</span>
                    <strong style={{ fontSize: 12, color: "var(--color-text)" }}>{formData.training_courses} khóa</strong>
                  </div>
                </div>

                <div style={{ marginTop: 10, textAlign: "center" }}>
                  <span style={{ 
                    display: "block", background: profile.promoted ? "rgba(16, 185, 129, 0.15)" : "rgba(79, 70, 229, 0.15)", 
                    color: profile.promoted ? "var(--color-success)" : "var(--color-primary)", 
                    padding: "3px 8px", borderRadius: "var(--radius-full)", fontSize: 11, fontWeight: 700 
                  }}>
                    {profile.promoted ? "Promoted" : "On Track"}
                  </span>
                </div>
              </div>

              {/* Manager Review inside Sidebar for View 3 */}
              {currentView === 3 && (
                <div style={{ flexShrink: 0 }}>
                  <ManagerReview managerComment={managerComment} managerRating={profile.manager_rating} />
                </div>
              )}
            </div>
          )}

          {/* Right Main Panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, overflowY: "auto", paddingRight: 4 }}>
            {/* View 1 fallback profile strip */}
            {currentView === 1 && (
              <div className="glass-card animate-fade-in-up" style={{ padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "var(--radius-sm)", background: "var(--color-primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800 }}>
                    {formData.first_name?.charAt(0)?.toUpperCase() || "N"}
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 16 }}>{fullName}</h3>
                    <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{formData.department} &bull; {formData.education_level} &bull; {formData.age} tuổi</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 20 }}>
                  <div>
                    <span style={{ fontSize: 10, color: "var(--color-text-tertiary)", display: "block" }}>KHU VỰC</span>
                    <strong style={{ fontSize: 13 }}>{formData.city_tier}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: 10, color: "var(--color-text-tertiary)", display: "block" }}>TRẠNG THÁI</span>
                    <strong style={{ fontSize: 13, color: profile.promoted ? "var(--color-success)" : "var(--color-primary)" }}>{profile.promoted ? "Promoted" : "On Track"}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Metrics block */}
            <div style={{ flexShrink: 0 }}>
              <MetricCards profile={profile} showManagerRating={currentView === 3} />
            </div>

            {/* XAI component wrapper */}
            {currentView >= 2 && (
              <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", minHeight: 200 }}>
                <XaiExplanation xaiData={xaiData} />
              </div>
            )}
          </div>
        </div>

        {/* Condensed Footer strip */}
        <footer style={{ flexShrink: 0, textAlign: "center", paddingTop: 4, borderTop: "1px solid rgba(255,255,255,0.2)" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--color-text-tertiary)", margin: 0 }}>
            HR Analytics XAI v2.2 &bull; Trình bày tối ưu 1 giao diện (Single screen optimized)
          </p>
        </footer>
      </main>
    </div>
  );
}
