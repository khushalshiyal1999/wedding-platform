import { NextRequest, NextResponse } from 'next/server';
import { TemplateService } from '@/services/template.service';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const template = await TemplateService.getTemplateBySlug(slug);

    if (!template) {
      return NextResponse.json({ success: false, error: 'Template not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: template });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error retrieving template';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
