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
    <div>
      <AdminHeader
        title="System Settings &amp; Configuration"
        subtitle="Overview of database connections, authentication, and media storage."
      />

      <div className="p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
        {/* Administrator Profile */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg">
            <Shield className="w-5 h-5 text-amber-600" />
            <span>Administrator Profile</span>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-stone-50">
              <span className="text-stone-400 block mb-1">Name</span>
              <span className="font-semibold text-stone-800 text-sm">{session?.name || 'Administrator'}</span>
            </div>
            <div className="p-4 rounded-xl bg-stone-50">
              <span className="text-stone-400 block mb-1">Email</span>
              <span className="font-semibold text-stone-800 text-sm">{session?.email || 'admin@wedding.com'}</span>
            </div>
            <div className="p-4 rounded-xl bg-stone-50">
              <span className="text-stone-400 block mb-1">Role</span>
              <span className="font-semibold text-stone-800 text-sm uppercase">{session?.role || 'admin'}</span>
            </div>
          </div>
        </div>

        {/* Database & Cloud Integrations */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg">
            <Server className="w-5 h-5 text-emerald-600" />
            <span>Infrastructure Status</span>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-sm font-semibold text-stone-900">MongoDB Database</p>
                  <p className="text-xs text-stone-500">Mongoose ODM connection pool active</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Connected</span>
              </span>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Cloud className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-stone-900">Cloudinary Media Storage</p>
                  <p className="text-xs text-stone-500">
                    {isCloudinaryActive ? 'Cloudinary SDK active' : 'Local uploads fallback active (/public/uploads)'}
                  </p>
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  isCloudinaryActive
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
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
