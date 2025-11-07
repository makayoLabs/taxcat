# 🔧 TECHNICAL IMPLEMENTATION GUIDE
## Architecture, Frameworks, APIs & Database Structure

---

## PART 1: SYSTEM ARCHITECTURE

### 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                       │
├──────────────────┬──────────────────┬──────────────────────┤
│   TaxCat Web     │   EKBooks Web    │   Mobile App (PWA)   │
│   (Next.js 14)   │   (Next.js 14)   │   (React Native/PWA) │
└──────────────────┴──────────────────┴──────────────────────┘
                            │
┌───────────────────────────┼───────────────────────────────┐
│                     API GATEWAY LAYER                      │
│                  (Next.js API Routes)                      │
│  ┌──────────┬──────────┬──────────┬──────────────────┐  │
│  │   Auth   │   Tax    │ Payment  │    Education     │  │
│  │ /api/auth│/api/tax  │/api/pay  │  /api/education  │  │
│  └──────────┴──────────┴──────────┴──────────────────┘  │
└────────────────────────────────────────────────────────────┘
                            │
┌───────────────────────────┼───────────────────────────────┐
│                   BUSINESS LOGIC LAYER                     │
│  ┌───────────────────────────────────────────────────┐   │
│  │  Tax Calculation Engine  │  Education Engine      │   │
│  │  Document Management     │  Gamification Engine   │   │
│  │  CRA Integration        │  Analytics Engine      │   │
│  │  Payment Processing     │  Notification Service  │   │
│  └───────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
                            │
┌───────────────────────────┼───────────────────────────────┐
│                      DATA LAYER                            │
│  ┌─────────────┬─────────────┬────────────┬────────────┐ │
│  │ PostgreSQL  │   Redis     │   AWS S3   │  Firebase  │ │
│  │ (Primary)   │  (Cache)    │  (Docs)    │  (Push)    │ │
│  └─────────────┴─────────────┴────────────┴────────────┘ │
└────────────────────────────────────────────────────────────┘
```

### 🎨 Frontend Architecture

**Current Stack:**
- Next.js 14 (App Router)
- React 18.2
- TypeScript 5.3
- Tailwind CSS 3.4
- Framer Motion (animations)
- Lucide React (icons)

**Educational Frontend Additions:**
```
/src/app/
├── learn/                          # NEW - Educational portal
│   ├── modules/                    # Learning modules
│   │   ├── [moduleId]/
│   │   │   ├── page.tsx           # Module home
│   │   │   ├── lesson/[id]/page.tsx
│   │   │   └── quiz/[id]/page.tsx
│   ├── dashboard/page.tsx          # Student learning dashboard
│   ├── achievements/page.tsx       # Badges and certificates
│   ├── leaderboard/page.tsx       # Gamification leaderboard
│   └── community/page.tsx          # Discussion forums
├── teacher/                        # NEW - Teacher portal
│   ├── dashboard/page.tsx
│   ├── classes/[id]/page.tsx
│   ├── assignments/page.tsx
│   └── reports/page.tsx
└── parent/                         # NEW - Parent portal
    ├── dashboard/page.tsx
    └── progress/[studentId]/page.tsx

/src/components/
├── education/                      # NEW - Educational components
│   ├── ModuleCard.tsx
│   ├── LessonViewer.tsx
│   ├── QuizEngine.tsx
│   ├── ProgressTracker.tsx
│   ├── BadgeDisplay.tsx
│   ├── LeaderboardTable.tsx
│   └── ScenarioSimulator.tsx
├── gamification/                   # NEW - Game elements
│   ├── PointsDisplay.tsx
│   ├── LevelIndicator.tsx
│   ├── AchievementPopup.tsx
│   └── StreakCounter.tsx
└── interactive/                    # NEW - Interactive learning
    ├── InteractiveChart.tsx
    ├── DragDropExercise.tsx
    ├── MultipleChoice.tsx
    ├── FillInBlank.tsx
    └── MatchingGame.tsx
```

**Frontend Libraries to Add:**
```bash
# Educational & Interactive
npm install react-d3-graph d3 @visx/visx  # Data visualization
npm install react-joyride  # Interactive tours
npm install react-confetti  # Celebration animations
npm install react-markdown remark-gfm  # Markdown content
npm install react-player  # Video player
npm install @dnd-kit/core @dnd-kit/sortable  # Drag and drop

# Gamification
npm install react-spring  # Smooth animations
npm install react-chartjs-2 chart.js  # Charts for progress

# Communication
npm install socket.io-client  # Real-time chat/forums
npm install @uiw/react-md-editor  # Rich text editor

# Accessibility
npm install react-aria  # Accessible components
npm install focus-trap-react  # Keyboard navigation
```

---

### ⚙️ Backend Architecture

**Current Stack:**
- Next.js 14 API Routes
- Prisma 6.8 ORM
- PostgreSQL database
- AWS S3 for storage
- Stripe for payments

**Backend Additions:**

```
/src/app/api/
├── education/                      # NEW - Educational API
│   ├── modules/
│   │   ├── route.ts               # GET all modules, POST new
│   │   └── [id]/
│   │       ├── route.ts           # GET, PUT, DELETE module
│   │       ├── lessons/route.ts   # Module lessons
│   │       └── enroll/route.ts    # Enroll student
│   ├── progress/
│   │   ├── route.ts               # Student progress
│   │   └── [userId]/route.ts      # User-specific progress
│   ├── quizzes/
│   │   ├── route.ts               # GET all quizzes
│   │   ├── [id]/route.ts          # Specific quiz
│   │   ├── submit/route.ts        # Submit answers
│   │   └── results/[id]/route.ts  # Quiz results
│   ├── achievements/
│   │   ├── route.ts               # User achievements
│   │   ├── badges/route.ts        # Badge definitions
│   │   └── award/route.ts         # Award badge
│   ├── leaderboard/route.ts       # Points leaderboard
│   └── certificates/
│       ├── route.ts               # Generate certificate
│       └── verify/[code]/route.ts # Verify certificate
├── gamification/                   # NEW - Game mechanics
│   ├── points/
│   │   ├── award/route.ts         # Award points
│   │   └── balance/route.ts       # Check balance
│   ├── challenges/
│   │   ├── route.ts               # Active challenges
│   │   ├── complete/route.ts      # Complete challenge
│   │   └── [id]/route.ts          # Challenge details
│   └── streaks/route.ts           # Learning streaks
├── community/                      # NEW - Social features
│   ├── forums/
│   │   ├── route.ts               # List forums
│   │   └── [forumId]/
│   │       ├── route.ts           # Forum details
│   │       ├── posts/route.ts     # Forum posts
│   │       └── post/[id]/route.ts # Specific post
│   ├── study-groups/
│   │   ├── route.ts               # List/create groups
│   │   ├── [id]/
│   │   │   ├── route.ts           # Group details
│   │   │   ├── members/route.ts   # Manage members
│   │   │   └── chat/route.ts      # Group chat
│   └── mentorship/
│       ├── route.ts               # Match mentor
│       └── sessions/route.ts      # Schedule sessions
├── teacher/                        # NEW - Teacher APIs
│   ├── classes/
│   │   ├── route.ts               # Manage classes
│   │   └── [id]/
│   │       ├── students/route.ts  # Class roster
│   │       ├── assignments/route.ts
│   │       └── progress/route.ts  # Class progress
│   └── reports/
│       ├── class/[id]/route.ts    # Class report
│       └── student/[id]/route.ts  # Student report
└── parent/                         # NEW - Parent APIs
    ├── children/route.ts           # Linked children
    └── progress/[childId]/route.ts # Child progress
```

**Backend Services to Add:**
```bash
# Real-time communication
npm install socket.io  # WebSocket server

# Email & notifications
npm install @sendgrid/mail  # Email service
npm install firebase-admin  # Push notifications

# PDF generation (certificates)
npm install pdfkit @react-pdf/renderer

# Video processing (if hosting videos)
npm install @mux/mux-node  # Or use Vimeo/YouTube API

# Content management
npm install gray-matter  # Markdown frontmatter
npm install marked  # Markdown parser

# Analytics
npm install mixpanel  # User analytics
npm install posthog-node  # Product analytics

# Background jobs
npm install bull  # Job queue (Redis-based)
npm install node-cron  # Scheduled tasks
```

---

## PART 2: DATABASE SCHEMA

### 📊 Educational Tables (Add to Prisma Schema)

```prisma
// ============================================
// EDUCATIONAL MODULE SYSTEM
// ============================================

model EducationalModule {
  id              String   @id @default(cuid())
  title           String
  description     String
  category        ModuleCategory
  difficulty      DifficultyLevel
  estimatedTime   Int      // minutes
  order           Int      // sequence in curriculum
  prerequisites   String[] // Array of prerequisite module IDs
  published       Boolean  @default(false)
  thumbnail       String?
  videoUrl        String?
  content         Json     // Structured content
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  lessons         Lesson[]
  quizzes         Quiz[]
  enrollments     ModuleEnrollment[]

  @@index([category, published])
  @@index([difficulty])
}

enum ModuleCategory {
  TAX_BASICS
  INCOME_TYPES
  DEDUCTIONS
  CREDITS
  FILING
  INVESTMENTS
  BUSINESS
  ADVANCED
}

enum DifficultyLevel {
  BEGINNER
  INTERMEDIATE
  ADVANCED
  EXPERT
}

model Lesson {
  id              String   @id @default(cuid())
  moduleId        String
  module          EducationalModule @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  title           String
  order           Int
  content         Json     // Rich content: text, images, videos, exercises
  duration        Int      // minutes
  interactiveElements Json? // Interactive components
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  progress        LessonProgress[]

  @@index([moduleId, order])
}

model ModuleEnrollment {
  id              String   @id @default(cuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  moduleId        String
  module          EducationalModule @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  enrolledAt      DateTime @default(now())
  startedAt       DateTime?
  completedAt     DateTime?
  currentLessonId String?
  progress        Int      @default(0) // 0-100
  timeSpent       Int      @default(0) // seconds
  score           Int?     // Final quiz score

  @@unique([userId, moduleId])
  @@index([userId])
  @@index([moduleId])
}

model LessonProgress {
  id              String   @id @default(cuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  lessonId        String
  lesson          Lesson   @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  completed       Boolean  @default(false)
  completedAt     DateTime?
  timeSpent       Int      @default(0) // seconds
  interactions    Json?    // User interactions with lesson

  @@unique([userId, lessonId])
  @@index([userId])
}

// ============================================
// QUIZ & ASSESSMENT SYSTEM
// ============================================

model Quiz {
  id              String   @id @default(cuid())
  moduleId        String
  module          EducationalModule @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  title           String
  description     String?
  timeLimit       Int?     // minutes (null = no limit)
  passingScore    Int      @default(80) // percentage
  attempts        Int      @default(3) // max attempts allowed
  questions       Json     // Array of questions with options
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  submissions     QuizSubmission[]

  @@index([moduleId])
}

model QuizSubmission {
  id              String   @id @default(cuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  quizId          String
  quiz            Quiz     @relation(fields: [quizId], references: [id], onDelete: Cascade)
  answers         Json     // User's answers
  score           Int      // percentage
  passed          Boolean
  attemptNumber   Int
  timeSpent       Int      // seconds
  submittedAt     DateTime @default(now())

  @@index([userId, quizId])
  @@index([userId])
}

// ============================================
// GAMIFICATION SYSTEM
// ============================================

model UserPoints {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  totalPoints     Int      @default(0)
  level           Int      @default(1)
  currentStreak   Int      @default(0) // consecutive days
  longestStreak   Int      @default(0)
  lastActivity    DateTime @default(now())
  updatedAt       DateTime @updatedAt

  history         PointTransaction[]

  @@index([totalPoints]) // For leaderboard
  @@index([level])
}

model PointTransaction {
  id              String   @id @default(cuid())
  userPointsId    String
  userPoints      UserPoints @relation(fields: [userPointsId], references: [id], onDelete: Cascade)
  points          Int      // Can be negative for spending
  reason          String
  category        PointCategory
  metadata        Json?    // Additional context
  createdAt       DateTime @default(now())

  @@index([userPointsId, createdAt])
}

enum PointCategory {
  MODULE_COMPLETE
  QUIZ_PASSED
  CALCULATOR_USED
  DOCUMENT_UPLOADED
  DAILY_LOGIN
  STREAK_BONUS
  CHALLENGE_COMPLETE
  REFERRAL
  SOCIAL_SHARE
  COMMUNITY_CONTRIBUTION
}

model Badge {
  id              String   @id @default(cuid())
  name            String   @unique
  description     String
  icon            String   // Icon identifier
  category        BadgeCategory
  criteria        Json     // Earning criteria
  rarity          BadgeRarity
  points          Int      // Points awarded when earned
  createdAt       DateTime @default(now())

  earnedBadges    UserBadge[]
}

enum BadgeCategory {
  ACHIEVEMENT
  MASTERY
  MILESTONE
  SOCIAL
  SPECIAL
}

enum BadgeRarity {
  COMMON
  UNCOMMON
  RARE
  EPIC
  LEGENDARY
}

model UserBadge {
  id              String   @id @default(cuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  badgeId         String
  badge           Badge    @relation(fields: [badgeId], references: [id], onDelete: Cascade)
  earnedAt        DateTime @default(now())
  displayed       Boolean  @default(true) // Show on profile?

  @@unique([userId, badgeId])
  @@index([userId])
}

model Challenge {
  id              String   @id @default(cuid())
  title           String
  description     String
  type            ChallengeType
  startDate       DateTime
  endDate         DateTime
  criteria        Json     // Completion criteria
  reward          Int      // Points reward
  badgeId         String?  // Optional badge reward
  active          Boolean  @default(true)

  completions     ChallengeCompletion[]

  @@index([active, startDate, endDate])
}

enum ChallengeType {
  DAILY
  WEEKLY
  MONTHLY
  SPECIAL_EVENT
}

model ChallengeCompletion {
  id              String   @id @default(cuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  challengeId     String
  challenge       Challenge @relation(fields: [challengeId], references: [id], onDelete: Cascade)
  completedAt     DateTime @default(now())
  progress        Json?    // Tracking progress

  @@unique([userId, challengeId])
  @@index([userId])
}

// ============================================
// COMMUNITY & SOCIAL FEATURES
// ============================================

model Forum {
  id              String   @id @default(cuid())
  name            String
  description     String
  category        String
  icon            String?
  moderatorIds    String[] // User IDs of moderators
  postCount       Int      @default(0)
  memberCount     Int      @default(0)
  createdAt       DateTime @default(now())

  posts           ForumPost[]

  @@index([category])
}

model ForumPost {
  id              String   @id @default(cuid())
  forumId         String
  forum           Forum    @relation(fields: [forumId], references: [id], onDelete: Cascade)
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  title           String
  content         String   @db.Text
  isPinned        Boolean  @default(false)
  isLocked        Boolean  @default(false)
  views           Int      @default(0)
  likes           Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  replies         ForumReply[]

  @@index([forumId, createdAt])
  @@index([userId])
}

model ForumReply {
  id              String   @id @default(cuid())
  postId          String
  post            ForumPost @relation(fields: [postId], references: [id], onDelete: Cascade)
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  content         String   @db.Text
  likes           Int      @default(0)
  isAcceptedAnswer Boolean @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([postId, createdAt])
  @@index([userId])
}

model StudyGroup {
  id              String   @id @default(cuid())
  name            String
  description     String?
  ownerId         String
  owner           User     @relation("StudyGroupOwner", fields: [ownerId], references: [id], onDelete: Cascade)
  isPublic        Boolean  @default(false)
  maxMembers      Int      @default(20)
  inviteCode      String   @unique
  createdAt       DateTime @default(now())

  members         StudyGroupMember[]
  messages        StudyGroupMessage[]

  @@index([isPublic])
  @@index([ownerId])
}

model StudyGroupMember {
  id              String   @id @default(cuid())
  groupId         String
  group           StudyGroup @relation(fields: [groupId], references: [id], onDelete: Cascade)
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  role            GroupRole @default(MEMBER)
  joinedAt        DateTime @default(now())

  @@unique([groupId, userId])
  @@index([userId])
}

enum GroupRole {
  OWNER
  MODERATOR
  MEMBER
}

model StudyGroupMessage {
  id              String   @id @default(cuid())
  groupId         String
  group           StudyGroup @relation(fields: [groupId], references: [id], onDelete: Cascade)
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  content         String   @db.Text
  attachments     Json?
  createdAt       DateTime @default(now())

  @@index([groupId, createdAt])
}

// ============================================
// TEACHER & CLASSROOM MANAGEMENT
// ============================================

model Classroom {
  id              String   @id @default(cuid())
  teacherId       String
  teacher         User     @relation("ClassroomTeacher", fields: [teacherId], references: [id], onDelete: Cascade)
  name            String
  description     String?
  subject         String?
  grade           String?
  schoolYear      String
  inviteCode      String   @unique
  maxStudents     Int      @default(35)
  isActive        Boolean  @default(true)
  createdAt       DateTime @default(now())

  students        ClassroomStudent[]
  assignments     Assignment[]

  @@index([teacherId, isActive])
  @@index([inviteCode])
}

model ClassroomStudent {
  id              String   @id @default(cuid())
  classroomId     String
  classroom       Classroom @relation(fields: [classroomId], references: [id], onDelete: Cascade)
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  enrolledAt      DateTime @default(now())
  status          StudentStatus @default(ACTIVE)

  @@unique([classroomId, userId])
  @@index([userId])
}

enum StudentStatus {
  ACTIVE
  INACTIVE
  WITHDRAWN
}

model Assignment {
  id              String   @id @default(cuid())
  classroomId     String
  classroom       Classroom @relation(fields: [classroomId], references: [id], onDelete: Cascade)
  moduleId        String?  // Optional: link to module
  title           String
  description     String   @db.Text
  dueDate         DateTime
  points          Int      @default(100)
  createdAt       DateTime @default(now())

  submissions     AssignmentSubmission[]

  @@index([classroomId, dueDate])
}

model AssignmentSubmission {
  id              String   @id @default(cuid())
  assignmentId    String
  assignment      Assignment @relation(fields: [assignmentId], references: [id], onDelete: Cascade)
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  content         Json?    // Submission content
  status          SubmissionStatus @default(PENDING)
  score           Int?
  feedback        String?  @db.Text
  submittedAt     DateTime @default(now())
  gradedAt        DateTime?

  @@unique([assignmentId, userId])
  @@index([userId])
  @@index([status])
}

enum SubmissionStatus {
  PENDING
  SUBMITTED
  GRADED
  LATE
}

// ============================================
// PARENT PORTAL
// ============================================

model ParentChildLink {
  id              String   @id @default(cuid())
  parentId        String
  parent          User     @relation("ParentLink", fields: [parentId], references: [id], onDelete: Cascade)
  childId         String
  child           User     @relation("ChildLink", fields: [childId], references: [id], onDelete: Cascade)
  relationship    String   @default("parent") // parent, guardian, etc.
  verified        Boolean  @default(false)
  linkedAt        DateTime @default(now())

  @@unique([parentId, childId])
  @@index([parentId])
  @@index([childId])
}

// ============================================
// CERTIFICATE SYSTEM
// ============================================

model Certificate {
  id              String   @id @default(cuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  moduleId        String?
  certificateType CertificateType
  title           String
  description     String
  verificationCode String  @unique
  pdfUrl          String?
  issuedAt        DateTime @default(now())
  expiresAt       DateTime?

  @@index([userId])
  @@index([verificationCode])
}

enum CertificateType {
  MODULE_COMPLETION
  LEVEL_COMPLETION
  SPECIAL_ACHIEVEMENT
  COURSE_COMPLETION
}

// ============================================
// ANALYTICS & TRACKING
// ============================================

model UserActivity {
  id              String   @id @default(cuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  activityType    String
  metadata        Json?
  timestamp       DateTime @default(now())

  @@index([userId, timestamp])
  @@index([activityType])
}

model EngagementMetric {
  id              String   @id @default(cuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  date            DateTime
  sessionDuration Int      // seconds
  pageViews       Int      @default(0)
  calculatorUses  Int      @default(0)
  modulesStarted  Int      @default(0)
  modulesCompleted Int     @default(0)
  quizzesTaken    Int      @default(0)
  forumPosts      Int      @default(0)

  @@unique([userId, date])
  @@index([userId, date])
}

// ============================================
// UPDATE EXISTING USER MODEL
// ============================================

model User {
  // ... existing fields ...

  // Educational additions
  accountType        AccountType       @default(STUDENT)
  gradeLevel         String?           // For students
  schoolName         String?
  parentEmail        String?           // For student accounts
  teacherVerified    Boolean           @default(false)

  // Relations - Educational
  moduleEnrollments  ModuleEnrollment[]
  lessonProgress     LessonProgress[]
  quizSubmissions    QuizSubmission[]
  userPoints         UserPoints?
  badges             UserBadge[]
  challenges         ChallengeCompletion[]
  forumPosts         ForumPost[]
  forumReplies       ForumReply[]
  studyGroupsOwned   StudyGroup[]      @relation("StudyGroupOwner")
  studyGroups        StudyGroupMember[]
  groupMessages      StudyGroupMessage[]
  classroomsTeaching Classroom[]       @relation("ClassroomTeacher")
  classroomsAttending ClassroomStudent[]
  assignments        AssignmentSubmission[]
  parentLinks        ParentChildLink[] @relation("ParentLink")
  childLinks         ParentChildLink[] @relation("ChildLink")
  certificates       Certificate[]
  activities         UserActivity[]
  engagement         EngagementMetric[]
}

enum AccountType {
  STUDENT
  TEACHER
  PARENT
  PROFESSIONAL
  ADMIN
}
```

### 🔄 Migration Strategy

```bash
# 1. Add new models to schema.prisma
# 2. Generate migration
npx prisma migrate dev --name add_educational_features

# 3. Generate Prisma Client
npx prisma generate

# 4. Seed initial data
npx prisma db seed
```

**Seed Script** (`prisma/seed.ts`):
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed badges
  await prisma.badge.createMany({
    data: [
      {
        name: 'Tax Graduate',
        description: 'Complete all educational modules',
        icon: 'graduation-cap',
        category: 'ACHIEVEMENT',
        rarity: 'EPIC',
        points: 1000,
        criteria: { modules: 'all' }
      },
      {
        name: 'Calculator Pro',
        description: 'Use all tax calculators',
        icon: 'calculator',
        category: 'MASTERY',
        rarity: 'RARE',
        points: 500,
        criteria: { calculators: 10 }
      },
      // ... more badges
    ]
  });

  // Seed educational modules
  await prisma.educationalModule.createMany({
    data: [
      {
        title: 'Tax Basics for Teens',
        description: 'Learn the fundamentals of Canadian taxation',
        category: 'TAX_BASICS',
        difficulty: 'BEGINNER',
        estimatedTime: 45,
        order: 1,
        published: true,
        content: { /* module content */ }
      },
      // ... more modules
    ]
  });

  // Seed forums
  await prisma.forum.createMany({
    data: [
      {
        name: 'General Tax Questions',
        description: 'Ask any tax-related question',
        category: 'general',
        icon: 'help-circle'
      },
      {
        name: 'Help With Homework',
        description: 'Get help with school assignments',
        category: 'homework',
        icon: 'book-open'
      },
      // ... more forums
    ]
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

---

## PART 3: API IMPLEMENTATION EXAMPLES

### Example 1: Award Points API

```typescript
// /src/app/api/gamification/points/award/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/core/security/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { points, reason, category } = await req.json();

    // Validate
    if (!points || !reason || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get or create user points record
    let userPoints = await prisma.userPoints.findUnique({
      where: { userId: session.userId }
    });

    if (!userPoints) {
      userPoints = await prisma.userPoints.create({
        data: { userId: session.userId, totalPoints: 0, level: 1 }
      });
    }

    // Calculate new total and level
    const newTotal = userPoints.totalPoints + points;
    const newLevel = Math.floor(newTotal / 500) + 1; // Level up every 500 points

    // Update in transaction
    const [updated, transaction] = await prisma.$transaction([
      prisma.userPoints.update({
        where: { id: userPoints.id },
        data: {
          totalPoints: newTotal,
          level: newLevel,
          lastActivity: new Date()
        }
      }),
      prisma.pointTransaction.create({
        data: {
          userPointsId: userPoints.id,
          points,
          reason,
          category,
          metadata: { timestamp: new Date() }
        }
      })
    ]);

    // Check if level changed
    const leveledUp = newLevel > userPoints.level;

    // Check for badge eligibility
    await checkBadgeEligibility(session.userId, newTotal, newLevel);

    return NextResponse.json({
      success: true,
      points: updated.totalPoints,
      level: updated.level,
      leveledUp,
      pointsEarned: points
    });

  } catch (error) {
    console.error('Award points error:', error);
    return NextResponse.json(
      { error: 'Failed to award points' },
      { status: 500 }
    );
  }
}

async function checkBadgeEligibility(userId: string, points: number, level: number) {
  // Check various badge criteria
  // Award badges automatically when criteria met

  // Example: Award "1000 Points" badge
  if (points >= 1000) {
    const badge = await prisma.badge.findFirst({
      where: { name: '1000 Points Club' }
    });

    if (badge) {
      const existing = await prisma.userBadge.findUnique({
        where: { userId_badgeId: { userId, badgeId: badge.id } }
      });

      if (!existing) {
        await prisma.userBadge.create({
          data: { userId, badgeId: badge.id }
        });

        // Send notification (implement separately)
        // await sendBadgeNotification(userId, badge);
      }
    }
  }
}
```

### Example 2: Module Progress Tracking

```typescript
// /src/app/api/education/progress/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/core/security/auth';

export async function GET(req: NextRequest) {
  const session = await getSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const enrollments = await prisma.moduleEnrollment.findMany({
    where: { userId: session.userId },
    include: {
      module: {
        select: {
          id: true,
          title: true,
          category: true,
          difficulty: true,
          estimatedTime: true,
          thumbnail: true
        }
      }
    },
    orderBy: { enrolledAt: 'desc' }
  });

  const progress = enrollments.map(enrollment => ({
    moduleId: enrollment.moduleId,
    module: enrollment.module,
    progress: enrollment.progress,
    completed: enrollment.completedAt !== null,
    timeSpent: enrollment.timeSpent,
    score: enrollment.score,
    enrolledAt: enrollment.enrolledAt,
    completedAt: enrollment.completedAt
  }));

  // Calculate overall stats
  const stats = {
    totalEnrolled: enrollments.length,
    completed: enrollments.filter(e => e.completedAt !== null).length,
    inProgress: enrollments.filter(e => e.startedAt && !e.completedAt).length,
    totalTimeSpent: enrollments.reduce((sum, e) => sum + e.timeSpent, 0),
    averageScore: enrollments
      .filter(e => e.score !== null)
      .reduce((sum, e, _, arr) => sum + (e.score || 0) / arr.length, 0)
  };

  return NextResponse.json({ progress, stats });
}

export async function POST(req: NextRequest) {
  const session = await getSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { lessonId, completed, timeSpent, interactions } = await req.json();

  // Update lesson progress
  const lessonProgress = await prisma.lessonProgress.upsert({
    where: {
      userId_lessonId: {
        userId: session.userId,
        lessonId
      }
    },
    update: {
      completed,
      completedAt: completed ? new Date() : undefined,
      timeSpent: { increment: timeSpent },
      interactions
    },
    create: {
      userId: session.userId,
      lessonId,
      completed,
      completedAt: completed ? new Date() : undefined,
      timeSpent,
      interactions
    }
  });

  // Update module enrollment progress
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      module: {
        include: {
          lessons: true
        }
      }
    }
  });

  if (lesson) {
    const totalLessons = lesson.module.lessons.length;
    const completedLessons = await prisma.lessonProgress.count({
      where: {
        userId: session.userId,
        lesson: { moduleId: lesson.moduleId },
        completed: true
      }
    });

    const progress = Math.round((completedLessons / totalLessons) * 100);

    await prisma.moduleEnrollment.update({
      where: {
        userId_moduleId: {
          userId: session.userId,
          moduleId: lesson.moduleId
        }
      },
      data: {
        progress,
        startedAt: { set: new Date() }, // Set only if null
        completedAt: progress === 100 ? new Date() : null
      }
    });

    // Award points for lesson completion
    if (completed) {
      await fetch('/api/gamification/points/award', {
        method: 'POST',
        body: JSON.stringify({
          points: 25,
          reason: `Completed lesson: ${lesson.title}`,
          category: 'MODULE_COMPLETE'
        })
      });
    }
  }

  return NextResponse.json({ success: true, lessonProgress });
}
```

### Example 3: Quiz Submission & Grading

```typescript
// /src/app/api/education/quizzes/submit/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/core/security/auth';

export async function POST(req: NextRequest) {
  const session = await getSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { quizId, answers, timeSpent } = await req.json();

  // Get quiz with questions
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId }
  });

  if (!quiz) {
    return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
  }

  // Check attempt limit
  const previousAttempts = await prisma.quizSubmission.count({
    where: { userId: session.userId, quizId }
  });

  if (previousAttempts >= quiz.attempts) {
    return NextResponse.json(
      { error: 'Maximum attempts reached' },
      { status: 400 }
    );
  }

  // Grade the quiz
  const questions = quiz.questions as any[];
  let correctCount = 0;
  const gradedAnswers = questions.map((question, index) => {
    const userAnswer = answers[index];
    const isCorrect = userAnswer === question.correctAnswer;
    if (isCorrect) correctCount++;

    return {
      questionId: question.id,
      userAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect
    };
  });

  const score = Math.round((correctCount / questions.length) * 100);
  const passed = score >= quiz.passingScore;

  // Save submission
  const submission = await prisma.quizSubmission.create({
    data: {
      userId: session.userId,
      quizId,
      answers: gradedAnswers,
      score,
      passed,
      attemptNumber: previousAttempts + 1,
      timeSpent
    }
  });

  // Award points if passed
  if (passed) {
    await fetch('/api/gamification/points/award', {
      method: 'POST',
      body: JSON.stringify({
        points: 50,
        reason: `Passed quiz: ${quiz.title}`,
        category: 'QUIZ_PASSED'
      })
    });
  }

  return NextResponse.json({
    success: true,
    submission: {
      id: submission.id,
      score,
      passed,
      attemptNumber: submission.attemptNumber,
      attemptsRemaining: quiz.attempts - submission.attemptNumber
    },
    answers: gradedAnswers
  });
}
```

---

## PART 4: REAL-TIME FEATURES (WebSocket)

### Socket.IO Implementation

```typescript
// /src/server/socket.ts

import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { prisma } from '@/lib/prisma';

export function initializeSocket(httpServer: HTTPServer) {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL,
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join study group room
    socket.on('join-study-group', async (groupId: string) => {
      socket.join(`group-${groupId}`);

      // Load recent messages
      const messages = await prisma.studyGroupMessage.findMany({
        where: { groupId },
        include: {
          user: {
            select: { id: true, name: true, image: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 50
      });

      socket.emit('messages-history', messages.reverse());
    });

    // Send message to study group
    socket.on('send-message', async (data: {
      groupId: string;
      userId: string;
      content: string;
    }) => {
      const message = await prisma.studyGroupMessage.create({
        data: {
          groupId: data.groupId,
          userId: data.userId,
          content: data.content
        },
        include: {
          user: {
            select: { id: true, name: true, image: true }
          }
        }
      });

      // Broadcast to all in room
      io.to(`group-${data.groupId}`).emit('new-message', message);
    });

    // Typing indicator
    socket.on('typing', (data: { groupId: string; userName: string }) => {
      socket.to(`group-${data.groupId}`).emit('user-typing', data.userName);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
}
```

**Usage in Next.js:**

```typescript
// /src/pages/api/socket.ts (Pages Router for Socket.IO)

import { Server } from 'socket.io';
import type { NextApiRequest } from 'next';
import type { NextApiResponseServerIO } from '@/types/socket';

export default function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (!res.socket.server.io) {
    console.log('Starting Socket.IO server');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    // Initialize socket handlers
    initializeSocket(res.socket.server);
  }

  res.end();
}
```

---

## PART 5: CACHING STRATEGY

### Redis Caching for Performance

```typescript
// /src/lib/redis.ts

import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export class CacheService {
  // Cache educational module
  static async cacheModule(moduleId: string, data: any, ttl = 3600) {
    await redis.setex(`module:${moduleId}`, ttl, JSON.stringify(data));
  }

  static async getModule(moduleId: string) {
    const cached = await redis.get(`module:${moduleId}`);
    return cached ? JSON.parse(cached) : null;
  }

  // Cache user progress
  static async cacheUserProgress(userId: string, data: any) {
    await redis.setex(`progress:${userId}`, 300, JSON.stringify(data)); // 5 min
  }

  static async getUserProgress(userId: string) {
    const cached = await redis.get(`progress:${userId}`);
    return cached ? JSON.parse(cached) : null;
  }

  // Cache leaderboard
  static async cacheLeaderboard(data: any) {
    await redis.setex('leaderboard:top100', 600, JSON.stringify(data)); // 10 min
  }

  static async getLeaderboard() {
    const cached = await redis.get('leaderboard:top100');
    return cached ? JSON.parse(cached) : null;
  }

  // Invalidate cache
  static async invalidateModule(moduleId: string) {
    await redis.del(`module:${moduleId}`);
  }

  static async invalidateUserProgress(userId: string) {
    await redis.del(`progress:${userId}`);
  }
}
```

---

This is Part 1 of the Technical Implementation. Next documents will cover:
- External API integrations
- Mobile app architecture
- DevOps & deployment
- Security & compliance
- Performance optimization
- Monitoring & analytics
