"use client";

import { createContext, useContext, useState, useCallback } from "react";

const DATASET_PROFILES = [
  {
    department: "Finance", city_tier: "Tier1", education_level: "Master",
    performance_score: 100, kpi_achievement: 90.5, manager_rating: 4.0,
    peer_feedback_score: 3.9, meeting_hours_per_month: 24.5, employee_engagement_score: 66.5,
    mentoring_sessions: 3, training_hours_last_year: 25.4, certifications_count: 2, promoted: 0
  },
  {
    department: "Sales", city_tier: "Tier1", education_level: "Bachelor",
    performance_score: 72, kpi_achievement: 58.1, manager_rating: 4.1,
    peer_feedback_score: 3.5, meeting_hours_per_month: 29.6, employee_engagement_score: 82.0,
    mentoring_sessions: 2, training_hours_last_year: 43.8, certifications_count: 4, promoted: 0
  },
  {
    department: "Engineering", city_tier: "Tier2", education_level: "Bachelor",
    performance_score: 77.2, kpi_achievement: 79.3, manager_rating: 3.5,
    peer_feedback_score: 3.2, meeting_hours_per_month: 29.9, employee_engagement_score: 100,
    mentoring_sessions: 4, training_hours_last_year: 25.3, certifications_count: 2, promoted: 0
  },
  {
    department: "Operations", city_tier: "Tier1", education_level: "Bachelor",
    performance_score: 49.1, kpi_achievement: 39.9, manager_rating: 2.4,
    peer_feedback_score: 2.0, meeting_hours_per_month: 27.5, employee_engagement_score: 67.7,
    mentoring_sessions: 2, training_hours_last_year: 33.5, certifications_count: 1, promoted: 0
  },
  {
    department: "HR", city_tier: "Tier1", education_level: "Master",
    performance_score: 88.3, kpi_achievement: 85.2, manager_rating: 4.5,
    peer_feedback_score: 4.2, meeting_hours_per_month: 22.1, employee_engagement_score: 91.3,
    mentoring_sessions: 5, training_hours_last_year: 48.7, certifications_count: 3, promoted: 1
  },
  {
    department: "Engineering", city_tier: "Tier1", education_level: "PhD",
    performance_score: 95.6, kpi_achievement: 92.8, manager_rating: 4.8,
    peer_feedback_score: 4.6, meeting_hours_per_month: 18.4, employee_engagement_score: 88.9,
    mentoring_sessions: 6, training_hours_last_year: 52.1, certifications_count: 5, promoted: 1
  },
  {
    department: "Marketing", city_tier: "Tier2", education_level: "Bachelor",
    performance_score: 63.4, kpi_achievement: 55.7, manager_rating: 3.2,
    peer_feedback_score: 3.0, meeting_hours_per_month: 31.2, employee_engagement_score: 72.4,
    mentoring_sessions: 1, training_hours_last_year: 18.9, certifications_count: 1, promoted: 0
  },
  {
    department: "Finance", city_tier: "Tier2", education_level: "Master",
    performance_score: 81.7, kpi_achievement: 78.4, manager_rating: 3.9,
    peer_feedback_score: 3.7, meeting_hours_per_month: 26.3, employee_engagement_score: 85.1,
    mentoring_sessions: 4, training_hours_last_year: 36.2, certifications_count: 3, promoted: 1
  },
  {
    department: "Sales", city_tier: "Tier3", education_level: "Bachelor",
    performance_score: 55.2, kpi_achievement: 48.3, manager_rating: 2.8,
    peer_feedback_score: 2.5, meeting_hours_per_month: 33.8, employee_engagement_score: 58.6,
    mentoring_sessions: 1, training_hours_last_year: 12.4, certifications_count: 0, promoted: 0
  },
  {
    department: "Operations", city_tier: "Tier1", education_level: "Master",
    performance_score: 91.2, kpi_achievement: 88.9, manager_rating: 4.6,
    peer_feedback_score: 4.3, meeting_hours_per_month: 20.7, employee_engagement_score: 93.5,
    mentoring_sessions: 5, training_hours_last_year: 45.6, certifications_count: 4, promoted: 1
  },
];

function matchProfile(formData) {
  let bestMatch = DATASET_PROFILES[0];
  let bestScore = -1;

  for (const profile of DATASET_PROFILES) {
    let score = 0;
    if (profile.department.toLowerCase() === formData.department.toLowerCase()) score += 3;
    if (profile.city_tier === formData.city_tier) score += 2;
    if (profile.education_level.toLowerCase() === formData.education_level.toLowerCase()) score += 2;

    const ageDiff = Math.abs((formData.age || 30) - 35);
    score += Math.max(0, 5 - ageDiff * 0.2);

    const trainDiff = Math.abs((formData.training_courses || 2) - (profile.certifications_count || 2));
    score += Math.max(0, 3 - trainDiff);

    if (score > bestScore) {
      bestScore = score;
      bestMatch = profile;
    }
  }

  const jitter = (val, range = 3) => {
    const offset = (Math.random() - 0.5) * range * 2;
    return Math.max(0, Math.min(100, +(val + offset).toFixed(1)));
  };

  return {
    ...bestMatch,
    performance_score: jitter(bestMatch.performance_score, 4),
    kpi_achievement: jitter(bestMatch.kpi_achievement, 3),
    peer_feedback_score: +(bestMatch.peer_feedback_score + (Math.random() - 0.5) * 0.4).toFixed(1),
    employee_engagement_score: jitter(bestMatch.employee_engagement_score, 5),
    meeting_hours_per_month: jitter(bestMatch.meeting_hours_per_month, 2),
    training_hours_last_year: jitter(bestMatch.training_hours_last_year, 3),
    mentoring_sessions: Math.max(0, bestMatch.mentoring_sessions + Math.round((Math.random() - 0.5) * 2)),
    certifications_count: Math.max(0, bestMatch.certifications_count + Math.round((Math.random() - 0.5) * 1)),
  };
}

function computeXaiWeights(profile) {
  const factors = [
    { key: "kpi_achievement", label: "KPI Achievement", weight: 0.25, value: profile.kpi_achievement, max: 100 },
    { key: "performance_score", label: "Performance Score", weight: 0.20, value: profile.performance_score, max: 100 },
    { key: "peer_feedback_score", label: "Peer Feedback", weight: 0.12, value: profile.peer_feedback_score, max: 5 },
    { key: "employee_engagement_score", label: "Engagement", weight: 0.10, value: profile.employee_engagement_score, max: 100 },
    { key: "training_hours_last_year", label: "Training Hours", weight: 0.10, value: profile.training_hours_last_year, max: 60 },
    { key: "mentoring_sessions", label: "Mentoring", weight: 0.08, value: profile.mentoring_sessions, max: 8 },
    { key: "certifications_count", label: "Certifications", weight: 0.08, value: profile.certifications_count, max: 6 },
    { key: "meeting_hours_per_month", label: "Meeting Hours", weight: 0.07, value: profile.meeting_hours_per_month, max: 40 },
  ];

  const scored = factors.map((f) => {
    const normalized = Math.min(f.value / f.max, 1);
    const contribution = normalized * f.weight;
    return { ...f, normalized: +(normalized * 100).toFixed(1), contribution: +(contribution * 100).toFixed(1) };
  });

  const totalScore = scored.reduce((sum, f) => sum + f.contribution, 0);
  const promotionProbability = Math.min(Math.max(totalScore * 1.3, 5), 98);

  return { factors: scored, totalScore: +totalScore.toFixed(1), promotionProbability: +promotionProbability.toFixed(1) };
}

function generateManagerComment(rating, profile) {
  if (rating >= 4.5) {
    return `Nhân viên thể hiện năng lực xuất sắc xuyên suốt kỳ đánh giá. KPI đạt ${profile.kpi_achievement.toFixed(0)}% cho thấy sự cam kết mạnh mẽ với mục tiêu tổ chức. Khả năng dẫn dắt đội nhóm và mentoring (${profile.mentoring_sessions} buổi) là điểm sáng nổi bật. Đề xuất xem xét thăng tiến trong chu kỳ tiếp theo.`;
  } else if (rating >= 3.5) {
    return `Nhân viên hoàn thành tốt các nhiệm vụ được giao với mức KPI ${profile.kpi_achievement.toFixed(0)}%. Có tinh thần học hỏi thể hiện qua ${profile.training_hours_last_year.toFixed(0)} giờ đào tạo. Cần cải thiện thêm kỹ năng giao tiếp liên phòng ban và chủ động hơn trong các dự án chiến lược để sẵn sàng cho vị trí cao hơn.`;
  } else if (rating >= 2.5) {
    return `Hiệu suất làm việc ở mức trung bình. KPI đạt ${profile.kpi_achievement.toFixed(0)}% cần được nâng cao đáng kể. Khuyến nghị nhân viên tham gia thêm các chương trình đào tạo nâng cao và tăng cường sự tham gia vào các hoạt động mentoring để phát triển kỹ năng lãnh đạo.`;
  }
  return `Hiệu suất chưa đạt kỳ vọng với KPI ở mức ${profile.kpi_achievement.toFixed(0)}%. Cần thiết lập kế hoạch cải thiện hiệu suất (PIP) rõ ràng trong 90 ngày tới. Đề xuất gặp gỡ trực tiếp hàng tuần để theo dõi tiến độ và hỗ trợ kịp thời.`;
}

const EmployeeContext = createContext(null);

export function EmployeeProvider({ children }) {
  const [formData, setFormData] = useState(null);
  const [profile, setProfile] = useState(null);
  const [xaiData, setXaiData] = useState(null);
  const [managerComment, setManagerComment] = useState("");
  const [currentView, setCurrentView] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = useCallback((data) => {
    setIsLoading(true);
    setFormData(data);

    setTimeout(() => {
      const matched = matchProfile(data);
      const xai = computeXaiWeights(matched);
      const comment = generateManagerComment(matched.manager_rating, matched);
      setProfile(matched);
      setXaiData(xai);
      setManagerComment(comment);
      setIsLoading(false);
    }, 1800);
  }, []);

  const resetAll = useCallback(() => {
    setFormData(null);
    setProfile(null);
    setXaiData(null);
    setManagerComment("");
    setCurrentView(1);
    setIsLoading(false);
  }, []);

  return (
    <EmployeeContext.Provider
      value={{
        formData, profile, xaiData, managerComment,
        currentView, setCurrentView, isLoading,
        submitForm, resetAll,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployee() {
  const ctx = useContext(EmployeeContext);
  if (!ctx) throw new Error("useEmployee must be used within EmployeeProvider");
  return ctx;
}
