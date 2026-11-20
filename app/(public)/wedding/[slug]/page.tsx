import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { InvitationService } from '@/services/invitation.service';
import InvitationRenderer from '@/templates';
import { getSession } from '@/lib/auth';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string; template?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const invitation = await InvitationService.getInvitationBySlug(slug, false);

  if (!invitation) {
    return {
      title: 'Invitation Not Found | Wedding Platform',
      description: 'The requested wedding invitation could not be found.',
    };
  }

  const title = `${invitation.groomName} & ${invitation.brideName} | Wedding Invitation`;
  const description =
    invitation.description ||
    `Join us in celebrating the wedding of ${invitation.groomName} and ${invitation.brideName} on ${invitation.weddingDate}.`;

  const coverImage =
    invitation.groomImage ||
    invitation.brideImage ||
    (invitation.gallery && invitation.gallery[0]?.imageUrl) ||
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80';

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const url = `${appUrl}/wedding/${invitation.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Wedding Platform',
      images: [
        {
          url: coverImage,
          width: 1200,
          height: 630,
          alt: `${invitation.groomName} and ${invitation.brideName} Wedding`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [coverImage],
    },
  };
}

export default async function WeddingPublicPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { preview, template } = await searchParams;

  const session = await getSession();
  const isPreview = preview === 'true' && !!session;

  // If not admin preview, require status === 'published'
  const invitation = await InvitationService.getInvitationBySlug(slug, !isPreview);

  if (!invitation) {
    notFound();
  }

  const invitationData = JSON.parse(JSON.stringify(invitation));
  if (template) {
    invitationData.templateId = template;
  }

  return (
    <main className="relative min-h-screen">
      {isPreview && (
        <div className="sticky top-0 z-50 bg-amber-500 text-stone-900 text-xs font-semibold px-4 py-2 text-center shadow-md flex items-center justify-center gap-2">
          <span>⚠️ Admin Preview Mode — This invitation is currently {invitation.status}.</span>
        </div>
      )}
      <InvitationRenderer invitation={invitationData} />
    </main>
  );
}
