import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { InvitationService } from '../services/invitation.service';
import { TemplateService } from '../services/template.service';
import { Admin } from '../models/Admin';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/wedding-platform';

async function runTests() {
  console.log('--- STARTING PLATFORM VERIFICATION TEST SUITE ---');

  // Test 1: Connect to Database
  console.log('\n[1/10] Testing MongoDB Connection...');
  await mongoose.connect(MONGODB_URI);
  console.log('✓ MongoDB connection established successfully.');

  // Test 2: Admin Authentication Verification
  console.log('\n[2/10] Testing Admin Authentication & Password Hashing...');
  const admin = await Admin.findOne({ email: 'admin@wedding.com' }).select('+passwordHash');
  if (!admin || !admin.passwordHash) {
    throw new Error('Admin user not found. Did you run the seed script?');
  }
  const isMatch = await bcrypt.compare('Admin@123456', admin.passwordHash);
  if (!isMatch) {
    throw new Error('Admin password hash mismatch.');
  }
  console.log('✓ Admin user verified with secure bcrypt hash matching.');

  // Test 3: Template Service & All 3 Templates Verification
  console.log('\n[3/10] Verifying 3 Reusable Wedding Templates...');
  const templates = await TemplateService.getAllTemplates();
  const slugs = templates.map((t) => t.slug);
  console.log('Found templates:', slugs.join(', '));
  if (!slugs.includes('royal') || !slugs.includes('floral') || !slugs.includes('modern')) {
    throw new Error('One or more required templates are missing (royal, floral, modern).');
  }
  console.log('✓ All 3 templates verified (Royal Indian Wedding, Floral Elegant Wedding, Modern Minimal Wedding).');

  // Test 4: Seed Dummy Invitation Verification
  console.log('\n[4/10] Verifying Seed Invitation (aarav-weds-priya)...');
  const demoInv = await InvitationService.getInvitationBySlug('aarav-weds-priya', true);
  if (!demoInv) {
    throw new Error('Demo invitation "aarav-weds-priya" not found or not published.');
  }
  if (demoInv.groomName !== 'Aarav Sharma' || demoInv.brideName !== 'Priya Patel') {
    throw new Error(`Demo invitation couple mismatch: ${demoInv.groomName} & ${demoInv.brideName}`);
  }
  console.log(`✓ Seed invitation verified: ${demoInv.groomName} & ${demoInv.brideName} (${demoInv.events.length} events, ${demoInv.gallery.length} photos)`);

  // Test 5: Dynamic Creation of New Invitation
  console.log('\n[5/10] Testing New Invitation Creation...');
  const testSlug = `test-couple-${Date.now()}`;
  const created = await InvitationService.createInvitation({
    groomName: 'Rohan Mehta',
    brideName: 'Ananya Verma',
    slug: testSlug,
    description: 'Celebrating the union of Rohan and Ananya.',
    status: 'draft',
    templateId: 'floral',
    weddingDate: '2027-03-20',
    weddingTime: '19:00',
    timezone: 'Asia/Kolkata',
    venueName: 'The Leela Palace',
    venueAddress: 'Chanakyapuri',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    events: [
      {
        eventName: 'Sangeet Night',
        eventDate: '2027-03-19',
        eventTime: '07:00 PM',
        eventVenue: 'Grand Ballroom',
        eventDescription: 'Music and dance extravaganza',
      },
    ],
    gallery: [
      {
        imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
        altText: 'Couple portrait',
        displayOrder: 1,
      },
    ],
  });
  console.log(`✓ Invitation created successfully with ID: ${created._id}`);

  // Test 6: Unique Slug Enforcement
  console.log('\n[6/10] Testing Unique Slug Enforcement...');
  let duplicateRejected = false;
  try {
    await InvitationService.createInvitation({
      groomName: 'Duplicate Test',
      brideName: 'Duplicate Test',
      slug: testSlug,
      venueName: 'Test Venue',
      venueAddress: 'Test Address',
      city: 'Mumbai',
      state: 'Maharashtra',
      weddingDate: '2027-04-01',
    });
  } catch (err: unknown) {
    duplicateRejected = true;
    console.log(`✓ Correctly rejected duplicate slug: ${(err as Error).message}`);
  }
  if (!duplicateRejected) {
    throw new Error('Duplicate slug was NOT rejected! Unique constraint failed.');
  }

  // Test 7: Public Access Restriction for Draft Invitations
  console.log('\n[7/10] Testing Draft vs Published Public Access...');
  const publicDraftFetch = await InvitationService.getInvitationBySlug(testSlug, true);
  if (publicDraftFetch !== null) {
    throw new Error('Draft invitation was accessible to public! Security vulnerability.');
  }
  console.log('✓ Draft invitation correctly hidden from public access.');

  // Test 8: Publishing Invitation
  console.log('\n[8/10] Testing Invitation Publishing...');
  const published = await InvitationService.updateInvitationStatus(created._id.toString(), 'published');
  if (published?.status !== 'published') {
    throw new Error('Failed to update status to published.');
  }
  const publicPublishedFetch = await InvitationService.getInvitationBySlug(testSlug, true);
  if (!publicPublishedFetch) {
    throw new Error('Published invitation is NOT accessible publicly.');
  }
  console.log('✓ Published invitation is now publicly accessible.');

  // Test 9: Editing Invitation
  console.log('\n[9/10] Testing Invitation Updating & Customizations...');
  const updated = await InvitationService.updateInvitation(created._id.toString(), {
    venueName: 'The Leela Palace Diplomatic Enclave',
    primaryColor: '#C96574',
    secondaryColor: '#4A7C59',
  });
  if (updated?.venueName !== 'The Leela Palace Diplomatic Enclave') {
    throw new Error('Venue name was not updated correctly.');
  }
  console.log('✓ Invitation successfully updated with custom styling.');

  // Test 10: Deletion & Cleanup
  console.log('\n[10/10] Testing Invitation Deletion...');
  const deleted = await InvitationService.deleteInvitation(created._id.toString());
  if (!deleted) {
    throw new Error('Invitation deletion returned false.');
  }
  const postDeleteCheck = await InvitationService.getInvitationById(created._id.toString());
  if (postDeleteCheck !== null) {
    throw new Error('Deleted invitation is still found in database.');
  }
  console.log('✓ Invitation deleted and cleaned up successfully.');

  console.log('\n======================================================');
  console.log('🎉 ALL 10 TESTS PASSED SUCCESSFULLY! ZERO ERRORS.');
  console.log('======================================================\n');

  await mongoose.disconnect();
  process.exit(0);
}

runTests().catch((err) => {
  console.error('\n❌ Test suite failed:', err);
  process.exit(1);
});
