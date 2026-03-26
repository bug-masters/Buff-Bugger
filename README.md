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
