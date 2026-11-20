import React from 'react';
import { notFound } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import InvitationForm from '@/components/admin/InvitationForm';
import { InvitationService } from '@/services/invitation.service';

export const revalidate = 0;

export default async function EditInvitationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const invitation = await InvitationService.getInvitationById(id);

  if (!invitation) {
    notFound();
  }

  return (
    <div>
      <AdminHeader
        title={`Edit: ${invitation.groomName} & ${invitation.brideName}`}
        subtitle={`Update wedding details, media, schedule and design for /wedding/${invitation.slug}`}
      />
      <div className="p-6 sm:p-8 max-w-5xl mx-auto">
        <InvitationForm
          initialData={JSON.parse(JSON.stringify(invitation))}
          isEditing={true}
          invitationId={id}
        />
      </div>
    </div>
  );
}
