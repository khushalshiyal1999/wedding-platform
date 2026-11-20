import React from 'react';
import { IInvitation } from '@/types';
import RoyalTemplate from './royal/RoyalTemplate';
import FloralTemplate from './floral/FloralTemplate';
import ModernTemplate from './modern/ModernTemplate';

interface InvitationRendererProps {
  invitation: IInvitation;
}

export default function InvitationRenderer({ invitation }: InvitationRendererProps) {
  const templateSlug = invitation.templateId?.toLowerCase() || 'royal';

  switch (templateSlug) {
    case 'floral':
      return <FloralTemplate invitation={invitation} />;
    case 'modern':
      return <ModernTemplate invitation={invitation} />;
    case 'royal':
    default:
      return <RoyalTemplate invitation={invitation} />;
  }
}
