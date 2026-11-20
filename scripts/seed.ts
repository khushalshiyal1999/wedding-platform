import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin';
import { Template } from '../models/Template';
import { Invitation } from '../models/Invitation';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/wedding-platform';

async function seed() {
  console.log('Connecting to MongoDB at:', MONGODB_URI);
  await mongoose.connect(MONGODB_URI);
  console.log('MongoDB connected successfully.');

  // 1. Seed Templates
  console.log('Seeding templates...');
  const templates = [
    {
      name: 'Royal Indian Wedding',
      slug: 'royal',
      description:
        'Majestic traditional Indian aesthetic with maroon, gold, floral motifs, shloks, royal mandap vibes, and ceremonial grandeur.',
      previewImage:
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      category: 'royal',
      isActive: true,
    },
    {
      name: 'Floral Elegant Wedding',
      slug: 'floral',
      description:
        'Soft, romantic floral design with pastel accents, blossoming petals, delicate serif typography, and graceful charm.',
      previewImage:
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
      category: 'floral',
      isActive: true,
    },
    {
      name: 'Modern Minimal Wedding',
      slug: 'modern',
      description:
        'Contemporary chic design with clean lines, elegant monochrome and gold highlights, spacious layouts, and stylish typography.',
      previewImage:
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      category: 'modern',
      isActive: true,
    },
    {
      name: 'Royal Palace',
      slug: 'royal-palace',
      description:
        'Imperial palatial grandeur with deep maroon, antique gold filigree, Jharokha arches, and courtly farman styling.',
      previewImage:
        'https://images.unsplash.com/photo-1599818496464-9fc21976a445?auto=format&fit=crop&w=1200&q=80',
      category: 'royal',
      isActive: true,
    },
    {
      name: 'Pastel Garden',
      slug: 'pastel-garden',
      description:
        'Whimsical romantic garden aesthetic with blush pink, sage green, botanical wreaths, and soft watercolor blooms.',
      previewImage:
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
      category: 'floral',
      isActive: true,
    },
    {
      name: 'Traditional Gujarati',
      slug: 'gujarati',
      description:
        'Authentic Gujarati wedding patrika with auspicious red & saffron gold, Toran border, Kalash motifs, and Garba festivity.',
      previewImage:
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
      category: 'traditional',
      isActive: true,
    },
    {
      name: 'Minimal Luxury',
      slug: 'minimal-luxury',
      description:
        'High-fashion editorial elegance featuring spacious ivory whitespace, obsidian typography, and hairline gold rules.',
      previewImage:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      category: 'minimal',
      isActive: true,
    },
    {
      name: 'Peacock Elegance',
      slug: 'peacock',
      description:
        'Opulent jewel tones with royal peacock navy, iridescent turquoise, emerald accents, and Mor-Pankh feather motifs.',
      previewImage:
        'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=80',
      category: 'royal',
      isActive: true,
    },
    {
      name: 'Bohemian Sunset',
      slug: 'bohemian',
      description:
        'Warm terracotta, desert sand, sunburst accents, organic rounded arches, and relaxed golden-hour romance.',
      previewImage:
        'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80',
      category: 'bohemian',
      isActive: true,
    },
    {
      name: 'Mughal Heritage',
      slug: 'mughal',
      description:
        'Imperial emerald and sandstone courtly aesthetics with Persian Mehrab arches, jali tracery, and Shahi Farman grandeur.',
      previewImage:
        'https://images.unsplash.com/photo-1566552881560-0be86c53210f?auto=format&fit=crop&w=1200&q=80',
      category: 'heritage',
      isActive: true,
    },
    {
      name: 'Cinematic Love Story',
      slug: 'cinematic',
      description:
        'Dramatic widescreen movie premiere aesthetic with velvet dark backgrounds, cinema gold, film reels, and VIP ticket passes.',
      previewImage:
        'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
      category: 'cinematic',
      isActive: true,
    },
  ];

  for (const t of templates) {
    await Template.findOneAndUpdate({ slug: t.slug }, { $set: t }, { upsert: true, new: true });
    console.log(` Template ready: ${t.name} (${t.slug})`);
  }

  // 2. Seed Default Admin
  console.log('Seeding default administrator account...');
  const adminEmail = 'admin@wedding.com';
  const adminPassword = 'Admin@123456';
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(adminPassword, salt);

  const admin = await Admin.findOneAndUpdate(
    { email: adminEmail },
    {
      $set: {
        name: 'Wedding Administrator',
        email: adminEmail,
        passwordHash,
        role: 'admin',
      },
    },
    { upsert: true, new: true }
  );
  console.log(` Admin user ready: ${admin.email} (Password: ${adminPassword})`);

  // 3. Seed Demo Wedding Invitation: Aarav & Priya
  console.log('Seeding dummy invitation: aarav-weds-priya...');
  const demoSlug = 'aarav-weds-priya';

  const demoInvitationData = {
    groomName: 'Aarav Sharma',
    brideName: 'Priya Patel',
    slug: demoSlug,
    description:
      'Together with their families, Aarav & Priya joyfully invite you to celebrate their wedding ceremonies and the beginning of their new journey together.',
    status: 'published',
    templateId: 'royal',

    // Wedding details
    weddingDate: '2027-02-14',
    weddingTime: '18:00',
    timezone: 'Asia/Kolkata',

    // Groom info
    groomImage:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    groomDescription:
      'A passionate software architect and avid traveler who loves good conversations, morning runs, and bringing dreams to life.',
    groomParents: 'Son of Smt. Sunita & Shri Rajesh Sharma',

    // Bride info
    brideImage:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    brideDescription:
      'A creative interior designer with an eye for elegance, classical dancer, and believer in mindful living and unconditional love.',
    brideParents: 'Daughter of Smt. Meena & Shri Dinesh Patel',

    // Venue info
    venueName: 'Royal Orchid Palace',
    venueAddress: 'Near SG Highway, Bodakdev',
    city: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    googleMapsUrl:
      'https://maps.google.com/?q=Royal+Orchid+Palace+Ahmedabad+Gujarat',

    // Events
    events: [
      {
        eventName: 'Haldi Ceremony',
        eventDate: '2027-02-12',
        eventTime: '10:00 AM',
        eventVenue: 'Courtyard Lawn, Royal Orchid Palace',
        eventDescription:
          'A splash of sunshine, fragrant turmeric, yellow marigolds, and playful blessings to kick off the wedding festivities.',
        eventImage:
          'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      },
      {
        eventName: 'Mehndi & Sangeet Night',
        eventDate: '2027-02-13',
        eventTime: '04:00 PM',
        eventVenue: 'Grand Ball Room, Royal Orchid Palace',
        eventDescription:
          'Intricate henna designs, foot-tapping beats, lively dance performances, and an evening filled with musical euphoria.',
        eventImage:
          'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      },
      {
        eventName: 'Wedding Ceremony (Pheras)',
        eventDate: '2027-02-14',
        eventTime: '06:00 PM',
        eventVenue: 'Mandap Pavilion, Royal Orchid Palace',
        eventDescription:
          'The auspicious sacred union where two souls unite around the holy Agni amidst Vedic hymns, blessings, and rose petals.',
        eventImage:
          'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      },
      {
        eventName: 'Grand Reception Dinner',
        eventDate: '2027-02-15',
        eventTime: '07:00 PM',
        eventVenue: 'Royal Greens Banquet, Royal Orchid Palace',
        eventDescription:
          'An enchanting evening of fine dining, celebration, and cherished memories as we raise a toast to the newly married couple.',
        eventImage:
          'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
      },
    ],

    // Gallery
    gallery: [
      {
        imageUrl:
          'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80',
        altText: 'Aarav and Priya smiling together in traditional attire',
        displayOrder: 1,
      },
      {
        imageUrl:
          'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
        altText: 'Ceremonial decor with golden lights and flowers',
        displayOrder: 2,
      },
      {
        imageUrl:
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
        altText: 'The couple holding hands during the pre-wedding shoot',
        displayOrder: 3,
      },
      {
        imageUrl:
          'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1000&q=80',
        altText: 'Traditional bridal jewelry and henna artistry',
        displayOrder: 4,
      },
      {
        imageUrl:
          'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1000&q=80',
        altText: 'Celebration fireworks and royal lanterns',
        displayOrder: 5,
      },
      {
        imageUrl:
          'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1000&q=80',
        altText: 'Romantic outdoor portrait at sunset',
        displayOrder: 6,
      },
    ],

    // Background Music
    musicUrl:
      'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=indian-wedding-flute-112194.mp3',
    musicTitle: 'Auspicious Indian Wedding Shehnai & Flute',

    // Design settings
    primaryColor: '#800020',
    secondaryColor: '#D4AF37',
    backgroundColor: '#FFFDF9',
    fontFamily: 'Playfair Display',

    contactNumber: '+91 98765 43210',
    whatsappNumber: '+919876543210',
    publishedAt: new Date(),
  };

  await Invitation.findOneAndUpdate(
    { slug: demoSlug },
    { $set: demoInvitationData },
    { upsert: true, new: true }
  );

  console.log(` Dummy invitation seeded successfully at slug: /wedding/${demoSlug}`);
  console.log('Seeding completed successfully!');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Error during database seeding:', err);
  process.exit(1);
});
