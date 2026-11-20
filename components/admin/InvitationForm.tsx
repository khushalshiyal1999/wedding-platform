'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { IInvitation, IWeddingEvent, IGalleryItem } from '@/types';
import {
  Heart,
  Calendar,
  Clock,
  MapPin,
  Image as ImageIcon,
  Palette,
  CheckCircle,
  Plus,
  Trash2,
  Upload,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Sparkles,
  Music,
} from 'lucide-react';

interface InvitationFormProps {
  initialData?: Partial<IInvitation>;
  isEditing?: boolean;
  invitationId?: string;
}

export default function InvitationForm({
  initialData,
  isEditing = false,
  invitationId,
}: InvitationFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<IInvitation>>({
    groomName: initialData?.groomName || '',
    brideName: initialData?.brideName || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    status: initialData?.status || 'draft',
    templateId: initialData?.templateId || 'royal',

    weddingDate: initialData?.weddingDate || '2027-02-14',
    weddingTime: initialData?.weddingTime || '18:00',
    timezone: initialData?.timezone || 'Asia/Kolkata',

    groomImage: initialData?.groomImage || '',
    groomDescription: initialData?.groomDescription || '',
    groomParents: initialData?.groomParents || '',

    brideImage: initialData?.brideImage || '',
    brideDescription: initialData?.brideDescription || '',
    brideParents: initialData?.brideParents || '',

    venueName: initialData?.venueName || '',
    venueAddress: initialData?.venueAddress || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    country: initialData?.country || 'India',
    googleMapsUrl: initialData?.googleMapsUrl || '',

    events: initialData?.events || [
      {
        eventName: 'Wedding Ceremony',
        eventDate: initialData?.weddingDate || '2027-02-14',
        eventTime: '06:00 PM',
        eventVenue: initialData?.venueName || '',
        eventDescription: 'The sacred holy union and pheras.',
        eventImage: '',
      },
    ],

    gallery: initialData?.gallery || [],

    musicUrl:
      initialData?.musicUrl ||
      'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=indian-wedding-flute-112194.mp3',
    musicTitle: initialData?.musicTitle || 'Auspicious Indian Wedding Shehnai & Flute',

    primaryColor: initialData?.primaryColor || '#800020',
    secondaryColor: initialData?.secondaryColor || '#D4AF37',
    backgroundColor: initialData?.backgroundColor || '#FFFDF9',
    fontFamily: initialData?.fontFamily || 'Playfair Display',

    contactNumber: initialData?.contactNumber || '',
    whatsappNumber: initialData?.whatsappNumber || '',
  });

  // Slug auto-generator
  const generateSlug = () => {
    if (formData.groomName && formData.brideName) {
      const g = formData.groomName.toLowerCase().replace(/[^a-z0-9]/g, '');
      const b = formData.brideName.toLowerCase().replace(/[^a-z0-9]/g, '');
      setFormData((prev) => ({ ...prev, slug: `${g}-weds-${b}` }));
    }
  };

  // Upload file helper
  const handleFileUpload = async (file: File, targetField: 'groomImage' | 'brideImage' | 'musicUrl') => {
    setUploadingField(targetField);
    try {
      const form = new FormData();
      form.append('file', file);
      if (invitationId) form.append('invitationId', invitationId);

      const res = await fetch('/api/uploads', {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      setFormData((prev) => ({ ...prev, [targetField]: data.data.url }));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploadingField(null);
    }
  };

  // Events handler
  const addEvent = () => {
    setFormData((prev) => ({
      ...prev,
      events: [
        ...(prev.events || []),
        {
          eventName: 'New Celebration',
          eventDate: prev.weddingDate || '',
          eventTime: '10:00 AM',
          eventVenue: prev.venueName || '',
          eventDescription: '',
          eventImage: '',
        },
      ],
    }));
  };

  const updateEvent = (index: number, field: keyof IWeddingEvent, value: string) => {
    setFormData((prev) => {
      const updated = [...(prev.events || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, events: updated };
    });
  };

  const removeEvent = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      events: prev.events?.filter((_, i) => i !== index),
    }));
  };

  // Gallery handler
  const addGalleryImage = () => {
    setFormData((prev) => ({
      ...prev,
      gallery: [
        ...(prev.gallery || []),
        {
          imageUrl: '',
          altText: 'Wedding moment',
          displayOrder: (prev.gallery?.length || 0) + 1,
        },
      ],
    }));
  };

  const updateGalleryItem = (index: number, field: keyof IGalleryItem, value: unknown) => {
    setFormData((prev) => {
      const updated = [...(prev.gallery || [])];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updated[index] = { ...updated[index], [field]: value } as any;
      return { ...prev, gallery: updated };
    });
  };

  const removeGalleryItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery?.filter((_, i) => i !== index),
    }));
  };

  // Submit Handler
  const handleSubmit = async (targetStatus?: 'draft' | 'published') => {
    setError(null);
    setLoading(true);

    try {
      const payload = {
        ...formData,
        status: targetStatus || formData.status || 'draft',
      };

      const url = isEditing ? `/api/invitations/${invitationId}` : '/api/invitations';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save invitation');
      }

      router.push('/admin/dashboard/invitations');
      router.refresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error submitting form');
      setLoading(false);
    }
  };

  const steps = [
    { num: 1, label: 'Basic Info', icon: Calendar },
    { num: 2, label: 'Couple Info', icon: Heart },
    { num: 3, label: 'Events', icon: Clock },
    { num: 4, label: 'Venue', icon: MapPin },
    { num: 5, label: 'Media', icon: ImageIcon },
    { num: 6, label: 'Design', icon: Palette },
    { num: 7, label: 'Review & Publish', icon: CheckCircle },
  ];

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
      {/* Wizard Step Progress Header */}
      <div className="p-6 border-b border-stone-200 bg-stone-50/50">
        <div className="flex items-center justify-between overflow-x-auto gap-2 pb-2">
          {steps.map((s) => {
            const Icon = s.icon;
            const isDone = currentStep > s.num;
            const isCurrent = currentStep === s.num;

            return (
              <button
                key={s.num}
                type="button"
                onClick={() => setCurrentStep(s.num)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-600 text-white shadow-md'
                    : isDone
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>
                  {s.num}. {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <div className="m-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Content Steps */}
      <div className="p-6 sm:p-10">
        {/* STEP 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-xl font-serif font-bold text-stone-900">Step 1: Basic Information</h2>
            <p className="text-xs text-stone-500">Provide the couple’s names, wedding date, and unique public slug.</p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Groom Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.groomName || ''}
                  onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Bride Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.brideName || ''}
                  onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                  placeholder="e.g. Priya Patel"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                  Unique URL Slug *
                </label>
                <button
                  type="button"
                  onClick={generateSlug}
                  className="text-xs text-amber-600 hover:text-amber-700 font-semibold cursor-pointer"
                >
                  Generate from names
                </button>
              </div>
              <div className="flex items-center rounded-xl border border-stone-300 overflow-hidden bg-stone-50">
                <span className="px-3.5 py-2.5 text-xs text-stone-500 font-mono border-r border-stone-200">
                  /wedding/
                </span>
                <input
                  type="text"
                  required
                  value={formData.slug || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
                    })
                  }
                  placeholder="aarav-weds-priya"
                  className="flex-1 px-4 py-2.5 bg-white text-sm font-mono focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-stone-500 mt-1">
                Only lowercase letters, numbers and hyphens are allowed. Must be globally unique.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Wedding Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.weddingDate || ''}
                  onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Wedding Time
                </label>
                <input
                  type="time"
                  value={formData.weddingTime || '18:00'}
                  onChange={(e) => setFormData({ ...formData, weddingTime: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Invitation Description / Message
              </label>
              <textarea
                rows={3}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Together with their families, joyfully invite you..."
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>
        )}

        {/* STEP 2: Couple Information */}
        {currentStep === 2 && (
          <div className="space-y-8 max-w-3xl">
            <h2 className="text-xl font-serif font-bold text-stone-900">Step 2: Couple Information</h2>
            <p className="text-xs text-stone-500">Provide photographs, introductions, and parents’ names.</p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Groom Details */}
              <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-4">
                <h3 className="font-serif font-bold text-base text-stone-900">Groom Information</h3>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Groom Photo URL
                  </label>
                  <input
                    type="url"
                    value={formData.groomImage || ''}
                    onChange={(e) => setFormData({ ...formData, groomImage: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:border-amber-600 mb-2"
                  />
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingField === 'groomImage' ? 'Uploading...' : 'Upload Image File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, 'groomImage');
                      }}
                    />
                  </label>
                </div>

                {formData.groomImage && (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-amber-400">
                    <Image src={formData.groomImage} alt="Groom" fill className="object-cover" />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Parents’ Names
                  </label>
                  <input
                    type="text"
                    value={formData.groomParents || ''}
                    onChange={(e) => setFormData({ ...formData, groomParents: e.target.value })}
                    placeholder="Son of Smt. Sunita & Shri Rajesh Sharma"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Short Introduction
                  </label>
                  <textarea
                    rows={3}
                    value={formData.groomDescription || ''}
                    onChange={(e) => setFormData({ ...formData, groomDescription: e.target.value })}
                    placeholder="A few words about the groom..."
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              {/* Bride Details */}
              <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-4">
                <h3 className="font-serif font-bold text-base text-stone-900">Bride Information</h3>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Bride Photo URL
                  </label>
                  <input
                    type="url"
                    value={formData.brideImage || ''}
                    onChange={(e) => setFormData({ ...formData, brideImage: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:border-amber-600 mb-2"
                  />
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingField === 'brideImage' ? 'Uploading...' : 'Upload Image File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, 'brideImage');
                      }}
                    />
                  </label>
                </div>

                {formData.brideImage && (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-amber-400">
                    <Image src={formData.brideImage} alt="Bride" fill className="object-cover" />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Parents’ Names
                  </label>
                  <input
                    type="text"
                    value={formData.brideParents || ''}
                    onChange={(e) => setFormData({ ...formData, brideParents: e.target.value })}
                    placeholder="Daughter of Smt. Meena & Shri Dinesh Patel"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Short Introduction
                  </label>
                  <textarea
                    rows={3}
                    value={formData.brideDescription || ''}
                    onChange={(e) => setFormData({ ...formData, brideDescription: e.target.value })}
                    placeholder="A few words about the bride..."
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Wedding Events */}
        {currentStep === 3 && (
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-serif font-bold text-stone-900">Step 3: Wedding Events &amp; Ceremonies</h2>
                <p className="text-xs text-stone-500">Add, edit, and organize events like Haldi, Mehndi, Sangeet, and Reception.</p>
              </div>
              <button
                type="button"
                onClick={addEvent}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold shadow hover:bg-amber-700 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Event</span>
              </button>
            </div>

            <div className="space-y-4">
              {formData.events?.map((evt, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-stone-200 bg-stone-50/60 relative space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                      Event #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeEvent(idx)}
                      className="text-stone-400 hover:text-rose-600 cursor-pointer p-1"
                      title="Remove Event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                        Event Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={evt.eventName}
                        onChange={(e) => updateEvent(idx, 'eventName', e.target.value)}
                        placeholder="Haldi / Mehndi / Wedding"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                        Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={evt.eventDate}
                        onChange={(e) => updateEvent(idx, 'eventDate', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                        Time *
                      </label>
                      <input
                        type="text"
                        required
                        value={evt.eventTime}
                        onChange={(e) => updateEvent(idx, 'eventTime', e.target.value)}
                        placeholder="10:00 AM / 06:00 PM"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                        Venue &amp; Hall *
                      </label>
                      <input
                        type="text"
                        required
                        value={evt.eventVenue}
                        onChange={(e) => updateEvent(idx, 'eventVenue', e.target.value)}
                        placeholder="Courtyard Lawn / Royal Orchid Palace"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                        Event Photo URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={evt.eventImage || ''}
                        onChange={(e) => updateEvent(idx, 'eventImage', e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                      Event Description
                    </label>
                    <input
                      type="text"
                      value={evt.eventDescription || ''}
                      onChange={(e) => updateEvent(idx, 'eventDescription', e.target.value)}
                      placeholder="A short note about the ceremony..."
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Venue */}
        {currentStep === 4 && (
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-xl font-serif font-bold text-stone-900">Step 4: Main Venue &amp; Destination</h2>
            <p className="text-xs text-stone-500">Specify the location details and Google Maps URL for easy guest navigation.</p>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Venue Name *
              </label>
              <input
                type="text"
                required
                value={formData.venueName || ''}
                onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                placeholder="Royal Orchid Palace"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Address Line *
              </label>
              <input
                type="text"
                required
                value={formData.venueAddress || ''}
                onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
                placeholder="Near SG Highway, Bodakdev"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-amber-600"
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city || ''}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Ahmedabad"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  State *
                </label>
                <input
                  type="text"
                  required
                  value={formData.state || ''}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="Gujarat"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Country
                </label>
                <input
                  type="text"
                  value={formData.country || 'India'}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Google Maps Directions URL
              </label>
              <input
                type="url"
                value={formData.googleMapsUrl || ''}
                onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                placeholder="https://maps.google.com/?q=..."
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>
        )}

        {/* STEP 5: Media & Music */}
        {currentStep === 5 && (
          <div className="space-y-8 max-w-3xl">
            <h2 className="text-xl font-serif font-bold text-stone-900">Step 5: Photo Gallery &amp; Background Music</h2>
            <p className="text-xs text-stone-500">Upload wedding photographs, pre-wedding memories, and ceremonial audio.</p>

            {/* Background Music */}
            <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-4">
              <div className="flex items-center gap-2 text-amber-700 font-serif font-bold">
                <Music className="w-5 h-5" />
                <span>Background Music Settings</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                    Music Track Title
                  </label>
                  <input
                    type="text"
                    value={formData.musicTitle || ''}
                    onChange={(e) => setFormData({ ...formData, musicTitle: e.target.value })}
                    placeholder="Indian Wedding Shehnai & Flute"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                    Audio File URL (.mp3)
                  </label>
                  <input
                    type="url"
                    value={formData.musicUrl || ''}
                    onChange={(e) => setFormData({ ...formData, musicUrl: e.target.value })}
                    placeholder="https://.../music.mp3"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-white mb-2"
                  />
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingField === 'musicUrl' ? 'Uploading...' : 'Upload MP3'}</span>
                    <input
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, 'musicUrl');
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Gallery Images */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-base text-stone-900">Gallery Photographs</h3>
                <button
                  type="button"
                  onClick={addGalleryImage}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Image</span>
                </button>
              </div>

              {formData.gallery?.map((img, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 flex flex-col sm:flex-row items-center gap-4">
                  {img.imageUrl ? (
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-stone-300">
                      <Image src={img.imageUrl} alt="preview" fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-stone-200 flex items-center justify-center text-stone-400 flex-shrink-0">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}

                  <div className="flex-1 grid sm:grid-cols-2 gap-3 w-full">
                    <input
                      type="url"
                      value={img.imageUrl}
                      onChange={(e) => updateGalleryItem(idx, 'imageUrl', e.target.value)}
                      placeholder="Image URL (https://...)"
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs bg-white"
                    />
                    <input
                      type="text"
                      value={img.altText || ''}
                      onChange={(e) => updateGalleryItem(idx, 'altText', e.target.value)}
                      placeholder="Alt description / caption"
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs bg-white"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeGalleryItem(idx)}
                    className="text-stone-400 hover:text-rose-600 cursor-pointer p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 6: Design & Template */}
        {currentStep === 6 && (
          <div className="space-y-8 max-w-3xl">
            <h2 className="text-xl font-serif font-bold text-stone-900">Step 6: Invitation Template &amp; Styling</h2>
            <p className="text-xs text-stone-500">Choose from 3 reusable wedding templates and fine-tune accent colors.</p>

            {/* Template Selector */}
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  id: 'royal',
                  name: 'Royal Indian Wedding',
                  desc: 'Traditional maroon & gold palette, auspicious Sanskrit shloks, and majestic mandap vibes.',
                  image:
                    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
                },
                {
                  id: 'floral',
                  name: 'Floral Elegant Wedding',
                  desc: 'Soft romantic pastels, blush roses, delicate sage foliage, and charming gentle curves.',
                  image:
                    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80',
                },
                {
                  id: 'modern',
                  name: 'Modern Minimal Wedding',
                  desc: 'Contemporary slate and champagne gold tones, clean typography, and sleek modern aesthetic.',
                  image:
                    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
                },
              ].map((tmpl) => (
                <div
                  key={tmpl.id}
                  onClick={() => setFormData({ ...formData, templateId: tmpl.id })}
                  className={`rounded-2xl border-2 overflow-hidden cursor-pointer transition-all ${
                    formData.templateId === tmpl.id
                      ? 'border-amber-600 ring-4 ring-amber-100 shadow-md scale-102'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="relative h-32 w-full">
                    <Image src={tmpl.image} alt={tmpl.name} fill className="object-cover" />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-serif font-bold text-sm text-stone-900">{tmpl.name}</h3>
                    <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">{tmpl.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Color Customizations */}
            <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-4">
              <h3 className="font-serif font-bold text-base text-stone-900">Color Palette</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                    Primary Accent Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.primaryColor || '#800020'}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      className="w-10 h-10 rounded-lg cursor-pointer border border-stone-300 p-0.5"
                    />
                    <input
                      type="text"
                      value={formData.primaryColor || '#800020'}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-lg border border-stone-300 text-xs font-mono uppercase bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                    Secondary Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.secondaryColor || '#D4AF37'}
                      onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                      className="w-10 h-10 rounded-lg cursor-pointer border border-stone-300 p-0.5"
                    />
                    <input
                      type="text"
                      value={formData.secondaryColor || '#D4AF37'}
                      onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-lg border border-stone-300 text-xs font-mono uppercase bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                    Background Tint
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.backgroundColor || '#FFFDF9'}
                      onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                      className="w-10 h-10 rounded-lg cursor-pointer border border-stone-300 p-0.5"
                    />
                    <input
                      type="text"
                      value={formData.backgroundColor || '#FFFDF9'}
                      onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-lg border border-stone-300 text-xs font-mono uppercase bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: Review & Publish */}
        {currentStep === 7 && (
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-xl font-serif font-bold text-stone-900">Step 7: Review &amp; Publish</h2>
            <p className="text-xs text-stone-500">
              Review your invitation details before saving as draft or publishing live.
            </p>

            <div className="p-6 rounded-3xl border-2 border-amber-300 bg-amber-50/40 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-amber-700">
                    Template: {formData.templateId?.toUpperCase()}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                    {formData.groomName || 'Groom'} &amp; {formData.brideName || 'Bride'}
                  </h3>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                    formData.status === 'published'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {formData.status}
                </span>
              </div>

              <div className="border-t border-amber-200/60 pt-3 text-xs space-y-1.5 text-stone-600">
                <p>
                  <strong>Slug:</strong> /wedding/{formData.slug}
                </p>
                <p>
                  <strong>Wedding Date:</strong> {formData.weddingDate} at {formData.weddingTime}
                </p>
                <p>
                  <strong>Venue:</strong> {formData.venueName}, {formData.city}, {formData.state}
                </p>
                <p>
                  <strong>Events Scheduled:</strong> {formData.events?.length || 0} ceremonies
                </p>
                <p>
                  <strong>Gallery Photos:</strong> {formData.gallery?.length || 0} photos
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                disabled={loading}
                onClick={() => handleSubmit('draft')}
                className="flex-1 py-3.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold shadow-sm cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save as Draft'}
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => handleSubmit('published')}
                className="flex-1 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{loading ? 'Publishing...' : 'Publish Invitation Live'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Wizard Footer Navigation Controls */}
        <div className="mt-10 pt-6 border-t border-stone-200 flex items-center justify-between">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50 disabled:opacity-30 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentStep < 7 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.min(7, prev + 1))}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow cursor-pointer"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
