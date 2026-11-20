import React from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { TemplateService } from '@/services/template.service';
import TemplateCatalogueClient from '@/components/admin/TemplateCatalogueClient';

export const revalidate = 0;

export default async function AdminTemplatesPage() {
  let templates = await TemplateService.getAllTemplates();
  if (!templates || templates.length < 11) {
    await TemplateService.seedDefaultTemplates();
    templates = await TemplateService.getAllTemplates();
  }

  const plainTemplates = JSON.parse(JSON.stringify(templates));

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Reusable Wedding Templates"
        subtitle="Manage 11 unique wedding invitation designs. Filter, search and preview live on sample invitation data."
        actionText="Create Invitation"
        actionHref="/admin/dashboard/invitations/create"
      />

      <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
        <TemplateCatalogueClient templates={plainTemplates} />
      </div>
    </div>
  );
}
