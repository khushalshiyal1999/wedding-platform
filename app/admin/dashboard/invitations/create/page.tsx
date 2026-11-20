import React, { Suspense } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import InvitationForm from '@/components/admin/InvitationForm';

export default function CreateInvitationPage() {
  return (
    <div>
      <AdminHeader
        title="Create Wedding Invitation"
        subtitle="Step-by-step invitation builder for couples."
      />
      <div className="p-6 sm:p-8 max-w-5xl mx-auto">
        <Suspense fallback={<div className="p-8 text-center text-xs text-stone-500">Loading builder...</div>}>
          <InvitationForm isEditing={false} />
        </Suspense>
      </div>
    </div>
  );
}
