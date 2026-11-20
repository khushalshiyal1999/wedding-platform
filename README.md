# VivaahInvites — Dynamic Wedding Invitation Management Platform

A production-ready, full-stack Wedding Invitation Management Platform built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **MongoDB (Mongoose ODM)**.

Allows administrators to design and manage multiple customized wedding invitations using reusable, elegant templates, while couples and guests experience personalized invitations through their own unique public URLs (e.g. `/wedding/aarav-weds-priya`).

---

## 🌟 Key Features

### 1. Dynamic Public Invitations (`/wedding/[slug]`)
- **Unique Public URLs**: Dynamically served from MongoDB by slug (e.g., `/wedding/aarav-weds-priya`).
- **Dynamic SEO & Open Graph Metadata**: Social sharing previews with couple names, wedding dates, and cover images.
- **Access Control**: Only published invitations are publicly accessible; draft invitations return a 404 page unless viewed in admin preview mode.
- **Rich Interactive Experience**:
  - Animated welcome screen / envelope reveal with celebration confetti.
  - Auspicious Sanskrit Shloks & traditional blessings.
  - Live wedding countdown timer.
  - Comprehensive wedding itinerary cards (Haldi, Mehndi, Sangeet, Pheras, Reception).
  - Venue location with one-click Google Maps navigation.
  - Photo gallery with full-screen Lightbox modal.
  - Floating background music player with play/pause and audio wave visualization.
  - Direct WhatsApp wishes link and phone RSVP button.

### 2. Three Reusable Wedding Templates
1. **Royal Indian Wedding (`royal`)**: Traditional burgundy/maroon (`#800020`), royal gold (`#D4AF37`), ivory motifs, sacred Sanskrit verses, and ceremonial grandeur.
2. **Floral Elegant Wedding (`floral`)**: Soft blush rose (`#9C4153`), olive/sage greenery (`#6B8E23`), romantic botanical accents, and delicate typography.
3. **Modern Minimal Wedding (`modern`)**: Contemporary deep slate (`#0F172A`), warm bronze/champagne highlights (`#B45309`), clean lines, and editorial aesthetic.

### 3. Professional Admin Studio (`/admin/dashboard`)
- **Secure Authentication**: Password hashing using `bcryptjs` (salt rounds: 12), HTTP-only cookies, session verification with `jose` (JWT), and route-level authorization.
- **Dashboard Overview**: Key metrics (Total, Published, Draft, Archived invitations) and recently created weddings.
- **Invitation Management**:
  - Full-text search by couple names or slug.
  - Filter by status (`all`, `published`, `draft`, `archived`).
  - One-click copy public URL.
  - Live preview mode for draft and published invitations.
  - Instant publish / unpublish toggle.
  - Safe delete confirmation modal.
- **7-Step Creation Wizard**:
  - **Step 1: Basic Info** (Couple names, slug generator, wedding date & time, description)
  - **Step 2: Couple Info** (Groom & Bride photos, introductions, parents' blessing names)
  - **Step 3: Events** (Add, edit, remove ceremony timeline events with dates, times, venues, and photos)
  - **Step 4: Venue** (Venue name, address, city, state, country, Google Maps URL)
  - **Step 5: Media** (Couple photos, gallery images with reordering and alt text, background MP3 music track)
  - **Step 6: Design** (Template selector, primary color, secondary color, background tint)
  - **Step 7: Review & Publish** (Summary inspection, Save as Draft, or Publish Live)

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Canvas Confetti |
| **Backend** | Next.js Route Handlers (Node.js runtime), REST APIs, Zod Schema Validation |
| **Database** | MongoDB Atlas / Local MongoDB, Mongoose ODM |
| **Authentication** | HTTP-Only Cookies, JWT (`jose`), Password Hashing (`bcryptjs`) |
| **Media Storage** | Cloudinary SDK (with local dev fallback to `/public/uploads`) |
| **Hosting** | Vercel (Node.js Serverless runtime) |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** >= 18.17 (Node.js 20 or 22 recommended)
- **npm** or **pnpm**
- **MongoDB** (Local MongoDB instance or MongoDB Atlas cluster)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/wedding-platform.git
cd wedding-platform
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your variables in `.env.local`:
```env
# MongoDB Connection (Local or Atlas)
MONGODB_URI=mongodb://127.0.0.1:27017/wedding-platform
# Or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/wedding-platform?retryWrites=true&w=majority

# JWT Auth Secret (At least 32 characters)
AUTH_SECRET=wedding_super_secret_jwt_auth_key_2026_xyz123!@#_wedding_platform

# Cloudinary Configuration (Optional for production media uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Seed the Database
Run the idempotent database seed script to populate templates, default admin user, and the sample Indian wedding invitation:
```bash
npm run seed
```

**Default Admin Credentials:**
- **URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@wedding.com`
- **Password**: `Admin@123456`

**Demo Wedding Invitation:**
- **URL**: `http://localhost:3000/wedding/aarav-weds-priya`

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing

Run the automated workflow test suite to verify database connection, authentication, CRUD operations, slug uniqueness, and access control:
```bash
npm run test:workflows
```

Run production build verification:
```bash
npm run build
```

---

## ☁️ Deployment

### 1. MongoDB Atlas Configuration
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free M0 cluster or production cluster.
3. In **Database Access**, create a user with read and write privileges.
4. In **Network Access**, add an IP Access List entry:
   - For Vercel: allow `0.0.0.0/0` (Allow access from anywhere).
5. In **Database Deployment**, click **Connect** > **Drivers** > copy the connection string.
6. Replace `<password>` with your database user password and specify the database name `/wedding-platform`.

### 2. Cloudinary Setup
1. Sign up at [Cloudinary](https://cloudinary.com/).
2. From the Dashboard, copy **Cloud Name**, **API Key**, and **API Secret**.
3. Set these in your environment variables. If omitted, the platform uses local upload fallback in development.

### 3. Vercel Deployment
1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project** > **Import Git Repository**.
3. In **Environment Variables**, add:
   - `MONGODB_URI`
   - `AUTH_SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `NEXT_PUBLIC_APP_URL` (set to your Vercel deployment URL, e.g. `https://your-domain.vercel.app`)
4. Click **Deploy**.
5. Once deployed, run the seed script once against your MongoDB Atlas database:
   ```bash
   MONGODB_URI="your_atlas_connection_string" npm run seed
   ```

*Note: This platform uses dynamic server-side rendering and Node.js Route Handlers. Do not enable static export (`output: 'export'`).*

---

## 📂 Project Architecture

```
wedding-platform/
│
├── app/
│   ├── (public)/
│   │   ├── page.tsx                     # Landing & platform showcase page
│   │   └── wedding/
│   │       └── [slug]/
│   │           └── page.tsx             # Dynamic public wedding invitation
│   │
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx                 # Secure administrator login
│   │   └── dashboard/
│   │       ├── layout.tsx               # Admin studio layout with navigation
│   │       ├── page.tsx                 # Overview metrics & recent invitations
│   │       ├── invitations/
│   │       │   ├── page.tsx             # Full invitation management table & filters
│   │       │   ├── create/
│   │       │   │   └── page.tsx         # 7-step invitation builder
│   │       │   └── [id]/
│   │       │       ├── page.tsx         # Invitation detail view
│   │       │       └── edit/
│   │       │           └── page.tsx     # Invitation edit wizard
│   │       ├── templates/
│   │       │   └── page.tsx             # Template catalogue & previews
│   │       └── settings/
│   │           └── page.tsx             # Infrastructure & profile settings
│   │
│   ├── api/
│   │   ├── admin/
│   │   │   └── stats/                   # Dashboard metrics API
│   │   ├── auth/
│   │   │   ├── login/                   # Admin authentication endpoint
│   │   │   ├── logout/                  # Clear auth cookies
│   │   │   └── me/                      # Current session endpoint
│   │   ├── invitations/
│   │   │   ├── route.ts                 # List & Create invitations
│   │   │   └── [id]/
│   │   │       ├── route.ts             # Get, Update, Delete invitation
│   │   │       └── status/              # Publish/Unpublish status patch
│   │   ├── public/
│   │   │   └── invitations/[slug]/      # Public published invitation API
│   │   ├── templates/                   # Reusable template catalogue API
│   │   └── uploads/                     # Cloudinary & media storage API
│   │
│   ├── layout.tsx                       # Root layout with Google Fonts
│   └── not-found.tsx                    # Custom 404 handler
│
├── components/
│   ├── admin/                           # AdminSidebar, AdminHeader, InvitationForm
│   ├── wedding/                         # Countdown, MusicPlayer, GalleryLightbox, WelcomeScreen
│   └── ui/                              # Reusable UI primitives
│
├── templates/
│   ├── royal/RoyalTemplate.tsx          # Royal Indian Wedding template
│   ├── floral/FloralTemplate.tsx        # Floral Elegant Wedding template
│   ├── modern/ModernTemplate.tsx        # Modern Minimal Wedding template
│   └── index.tsx                        # Dynamic template renderer
│
├── lib/
│   ├── mongodb.ts                       # Cached Mongoose connection
│   ├── auth.ts                          # JWT sign/verify, bcrypt hashing
│   ├── cloudinary.ts                    # Cloudinary upload/delete integration
│   └── validations/
│       ├── auth.ts                      # Zod authentication schema
│       └── invitation.ts                # Zod invitation & event schemas
│
├── models/
│   ├── Admin.ts                         # Administrator model
│   ├── Invitation.ts                    # Wedding invitation model with subschemas
│   ├── Template.ts                      # Reusable templates model
│   └── Media.ts                         # Media asset records
│
├── services/
│   ├── invitation.service.ts            # Invitation business logic
│   ├── template.service.ts              # Template management logic
│   └── media.service.ts                 # Media handling logic
│
├── types/
│   └── index.ts                         # Full TypeScript type definitions
│
├── scripts/
│   ├── seed.ts                          # Idempotent database seeder
│   └── test-workflows.ts                # Automated test verification suite
│
├── middleware.ts                        # Protected route middleware
├── .env.example                         # Environment variable template
└── package.json
```

---

## 🔒 Security Best Practices Implemented
- **Password Protection**: Passwords salted and hashed with `bcryptjs` (never stored in plain text).
- **HTTP-Only Cookies**: Protected tokens stored in secure, `SameSite=lax` HTTP-only cookies.
- **Route Authorization**: Protected APIs verify admin session independently of middleware.
- **Input Sanitization**: Incoming request payloads strictly parsed with Zod schemas.
- **Access Control**: Draft and archived invitations are shielded from unauthorized public endpoints.
- **MongoDB Security**: Connection caching, parameter binding, and strict ObjectId validation prevent injection vulnerabilities.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
