import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#242424] flex flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen transition-all duration-300">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
