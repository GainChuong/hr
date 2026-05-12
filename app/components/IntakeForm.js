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
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 20px" }}>
      <div style={{ width: "100%", maxWidth: 640, display: "flex", flexDirection: "column", maxHeight: "100%" }}>
        {/* Compact Header */}
        <div style={{ textAlign: "center", marginBottom: 16, flexShrink: 0 }}>
          <div style={{ 
            display: "inline-flex", alignItems: "center", justifyContent: "center", 
            width: 44, height: 44, borderRadius: "50%", 
            background: "linear-gradient(135deg, var(--color-primary), var(--color-cta))", 
            marginBottom: 8, boxShadow: "0 4px 15px rgba(79, 70, 229, 0.3)",
            border: "2px solid rgba(255,255,255,0.4)"
          }}>
            <IconShield size={22} style={{ color: "white" }} />
          </div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 800, color: "var(--color-text)", margin: "0 0 4px", letterSpacing: "-0.01em" }}>
            Hệ thống Đánh giá Hiệu suất Nhân sự
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-text-secondary)", margin: 0 }}>
            Cung cấp thông tin cơ bản để khởi tạo hồ sơ và tải mô hình phân tích AI.
          </p>
        </div>

        {/* Highly Condensed Form Card */}
        <form onSubmit={handleSubmit} className="glass-card" style={{ padding: "20px 28px", display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 8, borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
            <div style={{ padding: 6, borderRadius: "50%", background: "rgba(79, 70, 229, 0.12)" }}>
              <IconUser size={16} style={{ color: "var(--color-primary)" }} />
            </div>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 700, color: "var(--color-text)" }}>Thông tin hồ sơ</span>
          </div>

          {/* Name row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
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

          <div style={{ height: 1, background: "rgba(255,255,255,0.15)", margin: "2px -28px" }} />

          {/* Side-by-side Sliders row to save vertical space */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, paddingTop: 2 }}>
            {/* Age slider */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <label style={labelStyle}>Độ tuổi</label>
                <span style={{ fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 700, color: "var(--color-primary)" }}>{form.age} tuổi</span>
              </div>
              <input type="range" min={20} max={60} value={form.age} onChange={(e) => updateField("age", +e.target.value)} style={{ width: "100%", cursor: "pointer", accentColor: "var(--color-primary)" }} />
            </div>

            {/* Training courses slider */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <label style={labelStyle}>Khóa đào tạo</label>
                <span style={{ fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 700, color: "var(--color-primary)" }}>{form.training_courses} khóa</span>
              </div>
              <input type="range" min={0} max={10} value={form.training_courses} onChange={(e) => updateField("training_courses", +e.target.value)} style={{ width: "100%", cursor: "pointer", accentColor: "var(--color-primary)" }} />
            </div>
          </div>

          {/* Submit */}
          <button type="submit" style={{
            width: "100%", padding: "10px 20px", marginTop: 4,
            background: "linear-gradient(135deg, var(--color-primary), var(--color-cta))", color: "white",
            border: "none", borderRadius: "var(--radius-full)",
            fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 700,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            transition: "all 200ms ease",
            boxShadow: "0 4px 12px rgba(79, 70, 229, 0.25)"
          }}>
            Bắt đầu phân tích AI
            <IconChevronRight size={16} />
          </button>

          <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", textAlign: "center", margin: 0 }}>
            <IconShield size={11} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
            Dữ liệu được mã hóa bảo mật tuyệt đối cho mục đích đánh giá nội bộ.
          </p>
        </form>
      </div>
    </div>
  );
}

function FieldGroup({ label, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={labelStyle}>{label}</label>
      {children}
      {error && <span style={{ fontSize: 11, color: "var(--color-danger)", marginTop: 2 }}>{error}</span>}
    </div>
  );
}

const labelStyle = {
  fontFamily: "var(--font-body)",
  fontSize: 12,
  fontWeight: 600,
  color: "var(--color-text)",
  marginBottom: 4,
};

const inputStyle = (hasError) => ({
  width: "100%",
  padding: "7px 12px",
  border: `1px solid ${hasError ? "var(--color-danger)" : "var(--color-border)"}`,
  borderRadius: "var(--radius-sm)",
  fontSize: 13,
  fontFamily: "var(--font-body)",
  color: "var(--color-text)",
  background: "var(--color-surface)",
  outline: "none",
  cursor: "pointer",
});
