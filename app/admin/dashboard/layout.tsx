import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
