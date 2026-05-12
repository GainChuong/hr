"use client";

import { useState } from "react";
import { useEmployee } from "../context/EmployeeContext";
import { IconChevronRight, IconShield, IconUser } from "./Icons";

const DEPARTMENTS = ["Finance", "Sales", "Engineering", "Operations", "HR", "Marketing", "Legal", "IT"];
const CITY_TIERS = [
  { value: "Tier1", label: "Thành phố lớn (Tier 1)" },
  { value: "Tier2", label: "Thành phố vừa (Tier 2)" },
  { value: "Tier3", label: "Khu vực khác (Tier 3)" },
];
const EDUCATION_LEVELS = [
  { value: "Bachelor", label: "Cử nhân" },
  { value: "Master", label: "Thạc sĩ" },
  { value: "PhD", label: "Tiến sĩ" },
  { value: "High School", label: "Trung học" },
];
const RECRUITMENT_CHANNELS = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "referral", label: "Giới thiệu nội bộ" },
  { value: "job_portal", label: "Trang tuyển dụng" },
  { value: "campus", label: "Tuyển dụng từ trường" },
  { value: "other", label: "Khác" },
];

export default function IntakeForm() {
  const { submitForm } = useEmployee();
  const [form, setForm] = useState({
    last_name: "",
    first_name: "",
    department: "",
    city_tier: "",
    education_level: "",
    recruitment_channel: "",
    age: 30,
    training_courses: 2,
  });
  const [errors, setErrors] = useState({});

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
    }
  };

  const validate = () => {
    const e = {};
    if (!form.last_name.trim()) e.last_name = "Vui lòng nhập họ";
    if (!form.first_name.trim()) e.first_name = "Vui lòng nhập tên";
    if (!form.department) e.department = "Vui lòng chọn phòng ban";
    if (!form.city_tier) e.city_tier = "Vui lòng chọn khu vực";
    if (!form.education_level) e.education_level = "Vui lòng chọn trình độ";
    if (!form.recruitment_channel) e.recruitment_channel = "Vui lòng chọn kênh";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    submitForm(form);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", position: "relative" }}>
      <div style={{ width: "100%", maxWidth: 640 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }} className="animate-fade-in-up">
          <div style={{ 
            display: "inline-flex", alignItems: "center", justifyContent: "center", 
            width: 64, height: 64, borderRadius: "50%", 
            background: "linear-gradient(135deg, var(--color-primary), var(--color-cta))", 
            marginBottom: 20, boxShadow: "0 8px 30px rgba(79, 70, 229, 0.4)",
            border: "2px solid rgba(255,255,255,0.3)"
          }}>
            <IconShield size={32} style={{ color: "white" }} />
          </div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: 28, fontWeight: 800, color: "var(--color-text)", marginBottom: 12, letterSpacing: "-0.02em" }}>
            Hệ thống Đánh giá Hiệu suất Nhân sự
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--color-text-secondary)", lineHeight: 1.6, maxWidth: 480, margin: "0 auto" }}>
            Vui lòng cung cấp thông tin cá nhân để hệ thống khởi tạo hồ sơ và tải các mô hình đánh giá AI phù hợp.
          </p>
        </div>

        {/* Form card */}
        <form onSubmit={handleSubmit} className="glass-card animate-fade-in-up" style={{ padding: "40px", animationDelay: "100ms" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
            <div style={{ padding: 8, borderRadius: "50%", background: "rgba(79, 70, 229, 0.15)" }}>
              <IconUser size={20} style={{ color: "var(--color-primary)" }} />
            </div>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 700, color: "var(--color-text)" }}>Thông tin cơ bản</span>
          </div>

          {/* Name row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
            <FieldGroup label="Họ" error={errors.last_name}>
              <input type="text" placeholder="Nhập họ..." value={form.last_name} onChange={(e) => updateField("last_name", e.target.value)}
                style={inputStyle(errors.last_name)} />
            </FieldGroup>
            <FieldGroup label="Tên" error={errors.first_name}>
              <input type="text" placeholder="Nhập tên..." value={form.first_name} onChange={(e) => updateField("first_name", e.target.value)}
                style={inputStyle(errors.first_name)} />
            </FieldGroup>
          </div>

          {/* Department & City */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
            <FieldGroup label="Phòng ban" error={errors.department}>
              <select value={form.department} onChange={(e) => updateField("department", e.target.value)} style={inputStyle(errors.department)}>
                <option value="">Chọn phòng ban</option>
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </FieldGroup>
            <FieldGroup label="Khu vực làm việc" error={errors.city_tier}>
              <select value={form.city_tier} onChange={(e) => updateField("city_tier", e.target.value)} style={inputStyle(errors.city_tier)}>
                <option value="">Chọn khu vực</option>
                {CITY_TIERS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </FieldGroup>
          </div>

          {/* Education & Recruitment */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
            <FieldGroup label="Trình độ học vấn" error={errors.education_level}>
              <select value={form.education_level} onChange={(e) => updateField("education_level", e.target.value)} style={inputStyle(errors.education_level)}>
                <option value="">Chọn trình độ</option>
                {EDUCATION_LEVELS.map((e) => <option key={e.value} value={e.value}>{e.label}</option>)}
              </select>
            </FieldGroup>
            <FieldGroup label="Kênh tuyển dụng" error={errors.recruitment_channel}>
              <select value={form.recruitment_channel} onChange={(e) => updateField("recruitment_channel", e.target.value)} style={inputStyle(errors.recruitment_channel)}>
                <option value="">Chọn kênh</option>
                {RECRUITMENT_CHANNELS.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </FieldGroup>
          </div>

          <div style={{ height: 1, background: "rgba(255,255,255,0.2)", margin: "0 -40px 32px -40px" }} />

          {/* Age slider */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <label style={labelStyle}>Độ tuổi</label>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 700, color: "var(--color-primary)" }}>{form.age} tuổi</span>
            </div>
            <input type="range" min={20} max={60} value={form.age} onChange={(e) => updateField("age", +e.target.value)} style={{ width: "100%", cursor: "pointer", accentColor: "var(--color-primary)" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 8 }}>
              <span>20</span><span>60</span>
            </div>
          </div>

          {/* Training courses slider */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <label style={labelStyle}>Số lượng khóa đào tạo đã hoàn thành</label>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 700, color: "var(--color-primary)" }}>{form.training_courses} khóa</span>
            </div>
            <input type="range" min={0} max={10} value={form.training_courses} onChange={(e) => updateField("training_courses", +e.target.value)} style={{ width: "100%", cursor: "pointer", accentColor: "var(--color-primary)" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 8 }}>
              <span>0</span><span>10</span>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" style={{
            width: "100%", padding: "16px 24px",
            background: "linear-gradient(135deg, var(--color-primary), var(--color-cta))", color: "white",
            border: "none", borderRadius: "var(--radius-full)",
            fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 700,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 8px 20px rgba(79, 70, 229, 0.3)"
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 24px rgba(79, 70, 229, 0.4)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(79, 70, 229, 0.3)"; }}
          >
            Bắt đầu đánh giá hồ sơ
            <IconChevronRight size={20} />
          </button>

          <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", textAlign: "center", marginTop: 20, lineHeight: 1.5 }}>
            <IconShield size={12} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
            Thông tin được xử lý bảo mật theo chính sách nội bộ. Dữ liệu chỉ dùng cho mục đích đánh giá.
          </p>
        </form>
      </div>
    </div>
  );
}

function FieldGroup({ label, error, children }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
      {error && <span style={{ fontSize: 12, color: "var(--color-danger)", marginTop: 4, display: "block" }}>{error}</span>}
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontFamily: "var(--font-body)",
  fontSize: 13,
  fontWeight: 500,
  color: "var(--color-text)",
  marginBottom: 6,
};

const inputStyle = (hasError) => ({
  width: "100%",
  padding: "10px 14px",
  border: `1px solid ${hasError ? "var(--color-danger)" : "var(--color-border)"}`,
  borderRadius: "var(--radius-sm)",
  fontSize: 14,
  fontFamily: "var(--font-body)",
  color: "var(--color-text)",
  background: "var(--color-surface)",
  transition: "border-color 200ms ease, box-shadow 200ms ease",
  outline: "none",
  cursor: "pointer",
});
