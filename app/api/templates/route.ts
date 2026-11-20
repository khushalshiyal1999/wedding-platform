import { NextResponse } from 'next/server';
import { TemplateService } from '@/services/template.service';

export async function GET() {
  try {
    let templates = await TemplateService.getAllTemplates();
    if (!templates || templates.length === 0) {
      await TemplateService.seedDefaultTemplates();
      templates = await TemplateService.getAllTemplates();
    }
    return NextResponse.json({ success: true, data: templates });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch templates';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
