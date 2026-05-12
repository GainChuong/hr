"use client";

import { useEmployee } from "./context/EmployeeContext";
import IntakeForm from "./components/IntakeForm";
import LoadingScreen from "./components/LoadingScreen";
import Dashboard from "./components/Dashboard";

export default function Home() {
  const { profile, isLoading } = useEmployee();

  if (isLoading) return <LoadingScreen />;
  if (!profile) return <IntakeForm />;
  return <Dashboard />;
}
