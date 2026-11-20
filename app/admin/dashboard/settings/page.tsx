import React from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { getSession } from '@/lib/auth';
import { Database, Cloud, Shield, Server, CheckCircle2 } from 'lucide-react';

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const session = await getSession();

  const isCloudinaryActive =
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET &&
    process.env.CLOUDINARY_CLOUD_NAME !== 'demo_cloud';

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Settings &amp; Infrastructure"
        subtitle="Overview of database connections, authentication, and media storage."
      />

      <div className="p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
        {/* Administrator Profile Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE4DC] shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#242424] font-serif font-bold text-lg">
            <Shield className="w-5 h-5 text-[#800020]" />
            <span>Administrator Profile</span>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DC]">
              <span className="text-[#777777] block mb-1">Name</span>
              <span className="font-semibold text-[#242424] text-sm">{session?.name || 'Administrator'}</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DC]">
              <span className="text-[#777777] block mb-1">Email</span>
              <span className="font-semibold text-[#242424] text-sm">{session?.email || 'admin@wedding.com'}</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DC]">
              <span className="text-[#777777] block mb-1">Role</span>
              <span className="font-semibold text-[#800020] text-sm uppercase">{session?.role || 'admin'}</span>
            </div>
          </div>
        </div>

        {/* Database & Cloud Integrations */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE4DC] shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#242424] font-serif font-bold text-lg">
            <Server className="w-5 h-5 text-emerald-700" />
            <span>Infrastructure Status</span>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl border border-[#EAE4DC] bg-[#FAF8F5]/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-emerald-700" />
                <div>
                  <p className="text-sm font-semibold text-[#242424]">MongoDB Database</p>
                  <p className="text-xs text-[#777777]">Mongoose ODM connection pool active</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Connected</span>
              </span>
            </div>

            <div className="p-4 rounded-2xl border border-[#EAE4DC] bg-[#FAF8F5]/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Cloud className="w-5 h-5 text-blue-700" />
                <div>
                  <p className="text-sm font-semibold text-[#242424]">Cloudinary Media Storage</p>
                  <p className="text-xs text-[#777777]">
                    {isCloudinaryActive ? 'Cloudinary SDK active' : 'Local uploads fallback active (/public/uploads)'}
                  </p>
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  isCloudinaryActive
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isCloudinaryActive ? 'Configured' : 'Local Fallback'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
