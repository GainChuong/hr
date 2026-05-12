import "./globals.css";
import { EmployeeProvider } from "./context/EmployeeContext";

export const metadata = {
  title: "HR Performance Review | Hệ thống Đánh giá Hiệu suất Nhân sự",
  description:
    "Hệ thống đánh giá hiệu suất nhân sự nội bộ - Theo dõi và phân tích kết quả làm việc của bạn.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <EmployeeProvider>{children}</EmployeeProvider>
      </body>
    </html>
  );
}
