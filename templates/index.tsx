import React from 'react';
import { IInvitation } from '@/types';
import RoyalTemplate from './royal/RoyalTemplate';
import FloralTemplate from './floral/FloralTemplate';
import ModernTemplate from './modern/ModernTemplate';
import RoyalPalaceTemplate from './royal-palace/RoyalPalaceTemplate';
import PastelGardenTemplate from './pastel-garden/PastelGardenTemplate';
import GujaratiTemplate from './gujarati/GujaratiTemplate';
import MinimalLuxuryTemplate from './minimal-luxury/MinimalLuxuryTemplate';
import PeacockTemplate from './peacock/PeacockTemplate';
import BohemianTemplate from './bohemian/BohemianTemplate';
import MughalTemplate from './mughal/MughalTemplate';
import CinematicTemplate from './cinematic/CinematicTemplate';

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
    case 'royal-palace':
      return <RoyalPalaceTemplate invitation={invitation} />;
    case 'pastel-garden':
      return <PastelGardenTemplate invitation={invitation} />;
    case 'gujarati':
      return <GujaratiTemplate invitation={invitation} />;
    case 'minimal-luxury':
      return <MinimalLuxuryTemplate invitation={invitation} />;
    case 'peacock':
      return <PeacockTemplate invitation={invitation} />;
    case 'bohemian':
      return <BohemianTemplate invitation={invitation} />;
    case 'mughal':
      return <MughalTemplate invitation={invitation} />;
    case 'cinematic':
      return <CinematicTemplate invitation={invitation} />;
    case 'royal':
    default:
      return <RoyalTemplate invitation={invitation} />;
  }
}
