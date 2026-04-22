# Buff-Bugger

> A location-based, gamified platform for discovering, documenting, and sharing bug finds in Boulder.

## Why Buff-Bugger

Existing biodiversity tools like iNaturalist and Seek are built for rigorous scientific data logging. They do that job well — but the experience is closer to filling out a form than going on an expedition. For a casual observer, that friction is where motivation dies.

Buff-Bugger takes the same underlying activity — documenting what you find outside — and frames it as a game. Finds appear on a shared map, users build a collection over time, and a leaderboard rewards friendly competition within a local community. The project is deliberately hyper-local (Boulder only) rather than global, because the social loop of "who in my circle is finding more cool bugs than me" is the thing that makes people actually go outside and look. This sits in an underserved niche: citizen-science projects that use serious gamification to drive engagement. Most biodiversity apps treat gamification as a light decoration — Buff-Bugger treats it as the product.

---

# CSCI 3308 — Lab 8: Project Proposal

**Spring 2026**

---

## 1. Team Number

011-5

## 2. Team Name

BUGMASTERS

## 3. Team Members

| Name | GitHub Username | Email |
|------|----------------|-------|
| Molly Dembo | PigeonTheSloth | Mode7025@colorado.edu |
| Trent Clatanoff | trentclat | trcl4564@colorado.edu |
| Ben (Benjamin) Davison | Ben-Dav | beda7834@colorado.edu |
| Amrit Hari | Amrit-Hari | amha5274@colorado.edu |

## 4. Application Name

Buff-Bugger

## 5. Application Description

### Overview

BuffBug is a location-based social platform for discovering, documenting, and sharing insect and arthropod finds across Boulder, Colorado. Users submit catches by uploading a photo which is automatically classified using an image recognition model to identify the species, approximate size, color, and other traits. Each catch is geotagged and displayed on an interactive map where users can explore their own finds alongside those of their friends, filtered by species, location, or time period.

The app features a Pokedex-style encyclopedia of known local species, where entries unlock as users log new catches. Species are assigned dynamic rarity tiers based on how frequently they appear across the platform, giving users clear targets to pursue. A leaderboard system ranks users across multiple dimensions including total catches, unique species count, and a rarity-weighted score, with friend-specific and global views. Users can track their progress through an achievement system that rewards milestones like catching rare species, maintaining daily streaks, or completing habitat-specific collections.

BuffBug turns casual insect observation into a social, gamified experience. It gives hobbyists, students, and outdoor enthusiasts a reason to pay closer attention to the biodiversity around them while building a community-driven dataset of insect activity in the Boulder area.

### Key Features and Functionality

**Feature 1: Home Interface**
- Map
- Nav bar (for other interfaces)
- Sidebar (friendslist, latest bug catches)

**Feature 2: Leaderboard / User Ranking**
- Displays friends metadata about bug catches
- Number of catches
- Number of unique species
- Various leaderboard metrics
- Friend leaderboard
- Global user ranking

**Feature 3: Bug Encyclopedia / Pokedex**
- Browse by species
- Unlock new species as user submits

**Feature 4: Image Classification on Bug**
- Imports data to leaderboard, encyclopedia/pokedex, map preview, etc.
- Classifies the following:
  - Species
  - Approx size
  - Colors
  - Flight or non-flight

### Value Proposition

This would appeal to bug fanatics who would like to document their bug findings and share with their friends. This application will unite the bug community by making the process of bug finding more enjoyable and also able to extensively and comprehensively document bug species and findings.

## 6. Audience

Our target audience is bug enthusiasts who want to share their love for bug finding and bug identification. The UX will serve them by providing a way to share their bug finds and also compete to be the ultimate bugmaster.

## 7. Vision Statement

For lovers of bugs of all kinds, who have been looking for a way to share and compete in the craft of bug finding. Buff Bugger is a Website that lets you upload bug finds and compete on a leaderboard to be the ultimate bug master. Unlike sites like iNaturalist, our product gamifies the act of bug finding, introducing a competitive and fun element to finding bugs.

## 8. Version Control

**GitHub Repository:** https://github.com/bug-masters/Buff-Bugger

Required repository structure:
- `TeamMeetingLogs/` — weekly TA meeting minutes
- `MilestoneSubmissions/` — all course deliverables including this document
- `ProjectSourceCode/` — source code and project documentation
- `README.md` — project overview (see project guide)
- `.gitignore` — in ProjectSourceCode/

## 9. Development Methodology

Agile + Lean methodology

We will track progress via Kanban project board. Sprint cadence = 1 feature every 2 weeks, approximately.

## 10. Communication Plan

We plan to coordinate work and stay in sync through a hybrid of Discord and Text.

- **Text** = generic communications + meeting / planning logistics
- **Discord** = technical communications, dev notes, etc.

## 11. Meeting Plan

**When2Meet:** https://www.when2meet.com/?35785701-vZmrU

### Team Meetings

| Day | Time | Mode | Location |
|-----|------|------|----------|
| Saturday | Noon | In person | TBD |

### Weekly TA Meeting

| Day | Time | Mode | Location |
|-----|------|------|----------|
| Monday | 12:10 | Zoom | Zoom |

## 12. Use Case Diagram

*(Hand-drawn diagram showing user actor interacting with: Home/Login, Leaderboard, Submission Photo, Map, and List use cases)*

## 13. Wireframes

*(Hand-drawn wireframes for the following pages:)*

- **Page 1 — Home:** Nav bar (Home, Map, Leaderboard, Submit, List, Login), welcome message, logo, map preview, recent submissions
- **Page 2 — Map:** Interactive map with bug location pins, sidebar showing selected bug details (species, location, scientific name, submitted by)
- **Leaderboard:** Ranked list with columns for # of bugs, # of unique bugs, username, and submission count
- **Submit a Bug:** Form with required fields — image upload, bug location (choose location), and scientific name; submit button
- **List:** Grid layout of bug catch cards showing bug name, image, location, and username

## Extra Credit — Risk Analysis

| # | Risk | Severity | Mitigation Strategy |
|---|------|----------|---------------------|
| 1 | Issues in scope | Medium | Finalize key features before moving on to extras |
| 2 | Issues in uploading technology | Low | Make sure to control inputs in a way that won't mess with the website |
| 3 | Lack of bug species | Low | Increase range for map to cover |
| 4 | Poor communication | Medium-High | Set serious consequences for those who don't pull their weight or ignore messages. The final consequence should be escalating to professor/TA. This has already been a problem for us thus far so we definitely need to work on it. |
| 5 | Mapping location to image | Low | Manually putting location |

---

# Running the Application

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | Handlebars, vanilla JavaScript, Google Maps JS API |
| Application | Node.js, Express, express-session, bcryptjs, multer |
| Data | PostgreSQL, pg-promise |
| AI | OpenAI API |
| Testing | Mocha, Chai, chai-http |
| Infrastructure | Docker Compose, GitHub, Render |

## Prerequisites

- **Docker Desktop** (or Docker Engine + Docker Compose on Linux)
- **Git** for cloning the repository
- A modern browser (Chrome, Firefox, Safari, or Edge)
- A **Google Maps JavaScript API key** (see Environment Variables below)
- An **OpenAI API key** (required for the AI classification feature)

No local Node.js or PostgreSQL installation is needed — everything runs in containers.

## Running Locally

**1. Clone the repository**

```bash
git clone https://github.com/bug-masters/Buff-Bugger.git
cd Buff-Bugger/ProjectSourceCode
```

**2. Create your environment file**

```bash
cp .env.example .env
```

Open `.env` and fill in the required variables listed below.

**3. Start the containers**

```bash
docker compose up
```

On first run, this pulls the Postgres 14 and Node LTS images, installs dependencies, initializes the database from `src/init_data/create.sql` and `src/init_data/insert.sql`, and starts the Express server on port 3000.

**4. Open the app**

Visit https://buff-bugger.onrender.com/ 

**5. Stop the containers**

```bash
docker compose down
```

To also remove the database volume (wiping all local data):

```bash
docker compose down -v
```

## Environment Variables

All environment variables live in `ProjectSourceCode/.env`. Copy `.env.example` as a starting point. Never commit `.env` — it is gitignored.

| Variable | Purpose |
|----------|---------|
| `POSTGRES_USER` | Database username |
| `POSTGRES_PASSWORD` | Database password |
| `POSTGRES_DB` | Database name |
| `HOST` | DB host (`db` in Docker Compose, `localhost` standalone) |
| `SESSION_SECRET` | Signing secret for `express-session` cookies |
| `GOOGLE_MAPS_API_KEY` | Google Maps JavaScript API key |
| `OPENAI_API_KEY` | OpenAI API key for the AI classification feature |

## Running Tests

```bash
# With containers running:
docker compose run web npm run test

# Or run the full cycle (install, migrate, test, then start):
docker compose run web npm run testandrun
```

The test suite covers:
- `GET /welcome` — server reachability
- `POST /register` — positive case (valid registration succeeds)
- `POST /register` — negative case (invalid email rejected)
- `GET /api/bugs` — returns the bug records used for map markers

## Deployed Application

The application is deployed on **Render** with a managed PostgreSQL instance.

**Live URL:** ` https://buff-bugger.onrender.com`

On cold start, Render free-tier instances may take 30–60 seconds to wake. If the map appears empty on first load, give it a moment and refresh.
