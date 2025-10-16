# Software Requirements Specification (SRS)

## CampusStream - Smart Campus News & Bulletin System

**Version 1.0**  
**Date:** October 16, 2025  
**Prepared by:** BISHOP-X  
**Organization:** CampusStream Development Team

---

## Table of Contents

1. [Introduction](#1-introduction)
   - 1.1 [Purpose](#11-purpose)
   - 1.2 [Scope](#12-scope)
   - 1.3 [Definitions, Acronyms, and Abbreviations](#13-definitions-acronyms-and-abbreviations)
   - 1.4 [References](#14-references)
   - 1.5 [Overview](#15-overview)
2. [Overall Description](#2-overall-description)
   - 2.1 [Product Perspective](#21-product-perspective)
   - 2.2 [Product Functions](#22-product-functions)
   - 2.3 [User Classes and Characteristics](#23-user-classes-and-characteristics)
   - 2.4 [Operating Environment](#24-operating-environment)
   - 2.5 [Design and Implementation Constraints](#25-design-and-implementation-constraints)
   - 2.6 [Assumptions and Dependencies](#26-assumptions-and-dependencies)
3. [System Features](#3-system-features)
4. [External Interface Requirements](#4-external-interface-requirements)
   - 4.1 [User Interfaces](#41-user-interfaces)
   - 4.2 [Hardware Interfaces](#42-hardware-interfaces)
   - 4.3 [Software Interfaces](#43-software-interfaces)
   - 4.4 [Communication Interfaces](#44-communication-interfaces)
5. [Non-Functional Requirements](#5-non-functional-requirements)
   - 5.1 [Performance Requirements](#51-performance-requirements)
   - 5.2 [Safety Requirements](#52-safety-requirements)
   - 5.3 [Security Requirements](#53-security-requirements)
   - 5.4 [Software Quality Attributes](#54-software-quality-attributes)
6. [Other Requirements](#6-other-requirements)
7. [Appendix](#7-appendix)

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) document provides a comprehensive description of the CampusStream - Smart Campus News & Bulletin System. It details the functional and non-functional requirements for the development team, stakeholders, and end-users. This document serves as the foundation for system design, development, testing, and validation.

**Intended Audience:**
- Software developers and engineers
- Project managers
- Quality assurance teams
- System administrators
- Campus administrators and decision-makers
- End-users (students, faculty, staff)

### 1.2 Scope

**Product Name:** CampusStream

**Product Description:**  
CampusStream is a modern, real-time campus news and bulletin management system designed to streamline communication between campus administration, faculty, and students. The system provides a centralized platform for publishing, discovering, and managing campus-wide announcements, news, and updates.

**Goals:**
- Provide real-time access to campus news and announcements
- Improve communication efficiency across all campus stakeholders
- Reduce information overload through intelligent filtering and categorization
- Enable personalized content delivery based on user preferences
- Create an accessible, mobile-first platform for campus communication

**Benefits:**
- Centralized information hub for all campus news
- Reduced email clutter and notification fatigue
- Improved student engagement with campus activities
- Real-time emergency notifications
- Better content organization and discoverability
- Analytics for content reach and engagement

**Out of Scope:**
- Course management or Learning Management System (LMS) features
- Student grade management
- Financial transactions or fee payment
- Campus facility booking systems
- Direct messaging between users

### 1.3 Definitions, Acronyms, and Abbreviations

| Term | Definition |
|------|------------|
| **SRS** | Software Requirements Specification |
| **UI** | User Interface |
| **UX** | User Experience |
| **API** | Application Programming Interface |
| **PWA** | Progressive Web Application |
| **CRUD** | Create, Read, Update, Delete |
| **RBAC** | Role-Based Access Control |
| **SSL/TLS** | Secure Sockets Layer / Transport Layer Security |
| **REST** | Representational State Transfer |
| **JSON** | JavaScript Object Notation |
| **Announcement** | Official news or information published by authorized users |
| **Bulletin** | Short-form announcement or notice |
| **Feed** | Chronological list of news items |
| **Bookmark** | User-saved news item for later reference |
| **Category** | Classification of news (Academic, Event, Sport, etc.) |
| **Priority Level** | Urgency indicator (Normal, High, Urgent) |

### 1.4 References

- IEEE Std 830-1998: IEEE Recommended Practice for Software Requirements Specifications
- React Documentation: https://react.dev/
- TypeScript Documentation: https://www.typescriptlang.org/
- Supabase Documentation: https://supabase.com/docs
- Web Content Accessibility Guidelines (WCAG) 2.1
- Progressive Web Apps Guidelines by Google

### 1.5 Overview

This SRS document is organized into seven main sections:

- **Section 2** provides an overall description of the system, including product perspective, functions, user characteristics, and constraints.
- **Section 3** details specific system features and functional requirements.
- **Section 4** describes external interface requirements including user, hardware, software, and communication interfaces.
- **Section 5** outlines non-functional requirements such as performance, security, and quality attributes.
- **Section 6** covers additional requirements not covered in previous sections.
- **Section 7** provides appendices with supplementary information.

---

## 2. Overall Description

### 2.1 Product Perspective

CampusStream is a new, self-contained web application designed specifically for campus communication needs. While it operates independently, it is designed to potentially integrate with existing campus systems in future iterations.

**System Context:**

```
┌─────────────────────────────────────────────────────────┐
│                    External Systems                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Email      │  │  Push Notif. │  │  Analytics   │  │
│  │   Service    │  │   Service    │  │   Service    │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
└─────────┼──────────────────┼──────────────────┼──────────┘
          │                  │                  │
          └──────────────────┼──────────────────┘
                             │
          ┌──────────────────┴───────────────────┐
          │      CampusStream Application        │
          │  ┌────────────────────────────────┐  │
          │  │     Frontend (React PWA)       │  │
          │  └────────────┬───────────────────┘  │
          │               │                       │
          │  ┌────────────┴───────────────────┐  │
          │  │    Backend API (Supabase)      │  │
          │  │  ┌──────────────────────────┐  │  │
          │  │  │  PostgreSQL Database     │  │  │
          │  │  └──────────────────────────┘  │  │
          │  │  ┌──────────────────────────┐  │  │
          │  │  │  Authentication Service  │  │  │
          │  │  └──────────────────────────┘  │  │
          │  │  ┌──────────────────────────┐  │  │
          │  │  │  Storage Service         │  │  │
          │  │  └──────────────────────────┘  │  │
          │  └──────────────────────────────┘  │
          └──────────────────────────────────────┘
                             │
          ┌──────────────────┴───────────────────┐
          │           End Users                   │
          │  ┌─────────┐ ┌─────────┐ ┌─────────┐│
          │  │Students │ │ Faculty │ │  Admin  ││
          │  └─────────┘ └─────────┘ └─────────┘│
          └──────────────────────────────────────┘
```

**System Interfaces:**
- Web browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive Web App installation on mobile devices
- RESTful API for backend communication
- Real-time WebSocket connections for live updates

### 2.2 Product Functions

**Major Functions:**

1. **User Authentication & Authorization**
   - Secure user login and registration
   - Role-based access control (Student, Lecturer, Admin)
   - Password recovery mechanism
   - Session management

2. **News & Announcement Management**
   - Create, edit, and delete announcements (authorized users)
   - Categorize content by type and department
   - Set priority levels (Normal, High, Urgent)
   - Rich text editing with media attachments
   - Schedule announcements for future publication

3. **Content Discovery & Consumption**
   - Personalized news feed
   - Category-based filtering
   - Department-specific views
   - Full-text search functionality
   - Detailed news article view

4. **User Engagement Features**
   - Bookmark important announcements
   - Push notifications for new content
   - Real-time updates without page refresh
   - Pull-to-refresh mobile gesture

5. **Administrative Functions**
   - Dashboard with content analytics
   - User management
   - Category and department management
   - Content moderation tools
   - System configuration

6. **Notification System**
   - Real-time notification feed
   - Push notifications for urgent announcements
   - Email notifications (optional)
   - Notification preferences management

### 2.3 User Classes and Characteristics

| User Class | Description | Technical Expertise | Primary Functions | Frequency of Use |
|------------|-------------|---------------------|-------------------|------------------|
| **Students** | Undergraduate and graduate students | Low to Medium | - View news feed<br>- Search content<br>- Bookmark items<br>- Manage notifications | Daily |
| **Faculty/Lecturers** | Teaching staff and professors | Medium | - All student functions<br>- Create announcements<br>- Manage own content<br>- View analytics | Multiple times per week |
| **Administrators** | Campus IT and communication staff | High | - All user functions<br>- User management<br>- System configuration<br>- Content moderation<br>- Full analytics access | Daily |
| **Guest Users** | Visitors without accounts | Low | - View public announcements<br>- Browse categories (limited) | Occasional |

**User Characteristics:**
- Age range: 18-65+
- Education level: High school graduate to postgraduate
- Accessibility needs: Support for users with visual, auditory, or motor impairments
- Device usage: 70% mobile, 30% desktop
- Internet connectivity: Variable (must support offline capabilities)

### 2.4 Operating Environment

**Client-Side Environment:**
- **Web Browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers:** iOS Safari 14+, Chrome Mobile 90+
- **Operating Systems:** Windows 10/11, macOS 11+, iOS 14+, Android 10+
- **Screen Resolutions:** 320px minimum width to 4K displays
- **PWA Support:** Service workers, Web App Manifest

**Server-Side Environment:**
- **Hosting Platform:** Vercel (Frontend), Supabase (Backend)
- **Database:** PostgreSQL 14+
- **Runtime:** Node.js 18+ (for build processes)
- **CDN:** Global content delivery network
- **SSL/TLS:** Required for all communications

**Network Requirements:**
- Minimum 2G connection for basic functionality
- 4G/WiFi recommended for optimal experience
- Offline mode support for cached content

### 2.5 Design and Implementation Constraints

**Technical Constraints:**
- Must be built as a Progressive Web App (PWA)
- Frontend must use React 18+ with TypeScript
- Must support offline functionality for cached content
- Real-time updates required (latency < 2 seconds)
- Must be mobile-first responsive design
- Backend API must be RESTful
- Database must use PostgreSQL

**Regulatory Constraints:**
- Must comply with data protection regulations (GDPR, FERPA)
- Accessibility compliance with WCAG 2.1 Level AA
- Secure storage of personal information
- User consent for data collection

**Business Constraints:**
- Development timeline: 6 months for MVP
- Budget constraints favor open-source technologies
- Must minimize operating costs (serverless architecture preferred)
- Should avoid App Store/Play Store deployment costs initially

**Design Constraints:**
- Must use Tailwind CSS for styling consistency
- Component library: shadcn/ui
- Icon library: Lucide React
- State management: React Query (TanStack)
- Routing: React Router v6

### 2.6 Assumptions and Dependencies

**Assumptions:**
1. Users have access to modern web browsers
2. Campus network provides adequate bandwidth
3. Users have basic computer/smartphone literacy
4. Campus will provide user directory for initial setup
5. Content creators understand basic formatting
6. Users will enable notifications for urgent updates

**Dependencies:**
1. **Supabase Platform Availability**
   - Database uptime and performance
   - Authentication service reliability
   - Real-time subscription service
   - Storage service availability

2. **Third-Party Services**
   - Vercel hosting platform
   - Email service provider (for notifications)
   - Push notification services (FCM, APNs)
   - CDN provider

3. **External Libraries**
   - React ecosystem stability
   - TypeScript compiler compatibility
   - UI component library updates
   - Security patch availability

4. **Network Infrastructure**
   - Campus WiFi availability
   - Internet service provider reliability
   - DNS resolution services

---

## 3. System Features

### 3.1 User Authentication and Authorization

**Priority:** High  
**Risk:** High

#### 3.1.1 Description

The system shall provide secure user authentication and role-based authorization to ensure only authorized users can access appropriate features and content.

#### 3.1.2 Functional Requirements

**REQ-AUTH-001:** The system shall allow users to register with email and password.
- **Input:** Email address, password (minimum 8 characters), full name, department, role
- **Process:** Validate email format, check password strength, verify unique email
- **Output:** User account created, confirmation email sent

**REQ-AUTH-002:** The system shall allow users to log in with email and password.
- **Input:** Email address, password
- **Process:** Verify credentials against database, create session token
- **Output:** JWT token, redirect to dashboard

**REQ-AUTH-003:** The system shall implement password recovery functionality.
- **Input:** Email address
- **Process:** Generate reset token, send email with reset link
- **Output:** Password reset email, temporary access token

**REQ-AUTH-004:** The system shall enforce role-based access control (RBAC).
- **Roles:** Student, Lecturer, Administrator
- **Process:** Check user role against required permissions for each action
- **Output:** Allow or deny access to features

**REQ-AUTH-005:** The system shall maintain user sessions for 7 days or until logout.
- **Process:** Store encrypted session token in localStorage
- **Output:** Persistent login state

**REQ-AUTH-006:** The system shall enforce password complexity requirements.
- **Requirements:** Minimum 8 characters, at least one uppercase, one lowercase, one number
- **Process:** Validate during registration and password change
- **Output:** Accept or reject password with error message

### 3.2 News and Announcement Management

**Priority:** High  
**Risk:** Medium

#### 3.2.1 Description

The system shall provide comprehensive tools for creating, managing, and publishing campus news and announcements.

#### 3.2.2 Functional Requirements

**REQ-NEWS-001:** Authorized users (Lecturers, Admins) shall be able to create announcements.
- **Input:** Title, content, category, department, priority, optional image
- **Process:** Validate inputs, sanitize content, save to database
- **Output:** Announcement published, notifications sent

**REQ-NEWS-002:** The system shall support rich text formatting in announcements.
- **Features:** Bold, italic, lists, headings, links, images
- **Process:** Store as sanitized HTML or Markdown
- **Output:** Formatted content display

**REQ-NEWS-003:** Authors shall be able to edit their own announcements.
- **Input:** Announcement ID, updated fields
- **Process:** Verify ownership, validate changes, update database
- **Output:** Updated announcement, edit timestamp

**REQ-NEWS-004:** Authors and administrators shall be able to delete announcements.
- **Input:** Announcement ID, confirmation
- **Process:** Verify permissions, soft delete (archive)
- **Output:** Announcement removed from public view

**REQ-NEWS-005:** The system shall support announcement categorization.
- **Categories:** Academic, Event, Sport, Student Affairs, Urgent, General, Administrative
- **Process:** Tag announcement with one or more categories
- **Output:** Filtered views by category

**REQ-NEWS-006:** The system shall assign priority levels to announcements.
- **Levels:** Normal, High, Urgent
- **Process:** Set priority during creation, affects notification behavior
- **Output:** Visual indicators, notification preferences

**REQ-NEWS-007:** The system shall support scheduled publication.
- **Input:** Publication date and time
- **Process:** Store as draft, auto-publish at scheduled time
- **Output:** Announcement visible only after scheduled time

**REQ-NEWS-008:** The system shall attach metadata to each announcement.
- **Metadata:** Author, creation timestamp, edit timestamp, view count, department
- **Process:** Automatically capture and store
- **Output:** Available for analytics and display

### 3.3 Content Discovery and Feed

**Priority:** High  
**Risk:** Low

#### 3.3.1 Description

The system shall provide intuitive content discovery mechanisms including personalized feeds, filtering, and search capabilities.

#### 3.3.2 Functional Requirements

**REQ-FEED-001:** The system shall display a personalized news feed on the dashboard.
- **Input:** User preferences, department
- **Process:** Query recent announcements, apply filters, sort by date
- **Output:** Paginated list of news items (20 per page)

**REQ-FEED-002:** The system shall support filtering by category.
- **Input:** Selected category
- **Process:** Filter announcements matching category
- **Output:** Filtered news feed

**REQ-FEED-003:** The system shall support filtering by department.
- **Input:** Selected department
- **Process:** Filter announcements from specific department
- **Output:** Department-specific news feed

**REQ-FEED-004:** The system shall provide full-text search functionality.
- **Input:** Search query (minimum 3 characters)
- **Process:** Search title, excerpt, and content fields
- **Output:** Ranked search results

**REQ-FEED-005:** The system shall implement infinite scroll pagination.
- **Process:** Load next page when user scrolls near bottom
- **Output:** Seamless content loading

**REQ-FEED-006:** The system shall support pull-to-refresh on mobile devices.
- **Input:** Pull-down gesture
- **Process:** Fetch latest announcements
- **Output:** Updated feed with new content

**REQ-FEED-007:** The system shall display announcement details on a dedicated page.
- **Input:** Announcement ID
- **Process:** Fetch full announcement data
- **Output:** Complete article with metadata, author info, related content

**REQ-FEED-008:** The system shall show visual indicators for priority levels.
- **Process:** Display badges or colors based on priority
- **Output:** Normal (blue), High (orange), Urgent (red)

### 3.4 Bookmark and Saved Items

**Priority:** Medium  
**Risk:** Low

#### 3.4.1 Description

The system shall allow users to bookmark important announcements for easy future access.

#### 3.4.2 Functional Requirements

**REQ-BOOK-001:** Users shall be able to bookmark announcements.
- **Input:** Announcement ID, bookmark action
- **Process:** Create bookmark record with user ID and announcement ID
- **Output:** Bookmark saved, visual confirmation

**REQ-BOOK-002:** Users shall be able to remove bookmarks.
- **Input:** Announcement ID, unbookmark action
- **Process:** Delete bookmark record
- **Output:** Bookmark removed, visual confirmation

**REQ-BOOK-003:** The system shall display all bookmarked items on a dedicated page.
- **Input:** User ID
- **Process:** Query all bookmarked announcements for user
- **Output:** List of bookmarked items with full details

**REQ-BOOK-004:** Bookmarked items shall remain accessible even if original announcement is deleted.
- **Process:** Maintain archived copy of bookmarked announcements
- **Output:** Access to bookmarked content

**REQ-BOOK-005:** The system shall show bookmark status on news items.
- **Process:** Visual indicator (filled/unfilled bookmark icon)
- **Output:** Clear bookmark state

### 3.5 Notification System

**Priority:** High  
**Risk:** Medium

#### 3.5.1 Description

The system shall provide real-time notifications to keep users informed of new and urgent announcements.

#### 3.5.2 Functional Requirements

**REQ-NOTIF-001:** The system shall send in-app notifications for new announcements.
- **Trigger:** New announcement published
- **Process:** Create notification record, increment unread count
- **Output:** Notification badge, notification feed entry

**REQ-NOTIF-002:** The system shall send push notifications for urgent announcements.
- **Trigger:** Urgent priority announcement published
- **Process:** Send via Push API to all subscribed users
- **Output:** Device notification

**REQ-NOTIF-003:** The system shall display a notification feed.
- **Input:** User ID
- **Process:** Query notifications for user, sort by timestamp
- **Output:** Chronological list of notifications

**REQ-NOTIF-004:** Users shall be able to mark notifications as read.
- **Input:** Notification ID
- **Process:** Update read status
- **Output:** Notification marked read, badge count updated

**REQ-NOTIF-005:** Users shall be able to mark all notifications as read.
- **Input:** User ID
- **Process:** Update all notifications to read status
- **Output:** All notifications marked read, badge count reset

**REQ-NOTIF-006:** The system shall allow users to configure notification preferences.
- **Settings:** Enable/disable push notifications, email notifications, notification frequency
- **Process:** Store preferences in user profile
- **Output:** Customized notification behavior

**REQ-NOTIF-007:** Notifications shall link to the related announcement.
- **Input:** Notification click
- **Process:** Navigate to announcement detail page
- **Output:** Announcement displayed

### 3.6 Search Functionality

**Priority:** Medium  
**Risk:** Low

#### 3.6.1 Description

The system shall provide comprehensive search capabilities to help users find relevant announcements quickly.

#### 3.6.2 Functional Requirements

**REQ-SEARCH-001:** The system shall provide a search input accessible from all pages.
- **Input:** Search query
- **Process:** Navigate to search results page
- **Output:** Search interface

**REQ-SEARCH-002:** The system shall search across title, excerpt, and content fields.
- **Input:** Search query
- **Process:** Full-text search using PostgreSQL full-text search
- **Output:** Ranked results

**REQ-SEARCH-003:** The system shall highlight search terms in results.
- **Process:** Wrap matching terms in highlight markup
- **Output:** Visual emphasis on matched text

**REQ-SEARCH-004:** The system shall provide search filters.
- **Filters:** Category, department, date range, priority
- **Process:** Apply filters to search query
- **Output:** Refined search results

**REQ-SEARCH-005:** The system shall display "No results" message when appropriate.
- **Condition:** Zero matching announcements
- **Output:** Empty state with helpful message

**REQ-SEARCH-006:** The system shall provide search suggestions.
- **Process:** Show popular searches or recent searches
- **Output:** Suggestion dropdown

### 3.7 User Profile Management

**Priority:** Medium  
**Risk:** Low

#### 3.7.1 Description

The system shall allow users to view and edit their profile information and preferences.

#### 3.7.2 Functional Requirements

**REQ-PROF-001:** Users shall be able to view their profile information.
- **Display:** Name, email, role, department, avatar
- **Output:** Profile page with all user details

**REQ-PROF-002:** Users shall be able to update their profile.
- **Editable Fields:** Name, avatar, notification preferences
- **Process:** Validate changes, update database
- **Output:** Updated profile, confirmation message

**REQ-PROF-003:** Users shall be able to change their password.
- **Input:** Current password, new password, confirmation
- **Process:** Verify current password, validate new password, update
- **Output:** Password changed, session maintained

**REQ-PROF-004:** The system shall display user activity statistics.
- **Statistics:** Announcements created (for lecturers), bookmarks count, notifications count
- **Output:** User dashboard widgets

### 3.8 Administrative Dashboard

**Priority:** Medium  
**Risk:** Medium

#### 3.8.1 Description

The system shall provide administrators with tools for managing users, content, and system configuration.

#### 3.8.2 Functional Requirements

**REQ-ADMIN-001:** Administrators shall access a dedicated admin dashboard.
- **Access Control:** Admin role required
- **Output:** Dashboard with management tools

**REQ-ADMIN-002:** Administrators shall be able to manage user accounts.
- **Actions:** View all users, edit user roles, activate/deactivate accounts
- **Process:** CRUD operations on user table
- **Output:** Updated user records

**REQ-ADMIN-003:** Administrators shall be able to moderate all content.
- **Actions:** Edit any announcement, delete any announcement, feature announcements
- **Process:** Full permissions override
- **Output:** Content moderation actions applied

**REQ-ADMIN-004:** Administrators shall view system analytics.
- **Metrics:** Total users, total announcements, daily active users, popular categories, engagement rates
- **Output:** Dashboard with charts and statistics

**REQ-ADMIN-005:** Administrators shall be able to manage categories and departments.
- **Actions:** Create, edit, delete categories/departments
- **Process:** CRUD operations on categories/departments tables
- **Output:** Updated taxonomy

**REQ-ADMIN-006:** Administrators shall receive error logs and system alerts.
- **Process:** Capture application errors, send admin notifications
- **Output:** Error dashboard, alert emails

### 3.9 Real-Time Updates

**Priority:** High  
**Risk:** Medium

#### 3.9.1 Description

The system shall provide real-time updates to ensure users always see the latest content without manual refresh.

#### 3.9.2 Functional Requirements

**REQ-REAL-001:** The system shall update the news feed in real-time when new announcements are published.
- **Technology:** WebSocket subscription via Supabase Realtime
- **Process:** Listen for INSERT events on announcements table
- **Output:** New announcement appears in feed without refresh

**REQ-REAL-002:** The system shall update notification badge in real-time.
- **Process:** Listen for notification events
- **Output:** Badge count updates immediately

**REQ-REAL-003:** The system shall show live editing indicators.
- **Process:** Broadcast when announcement is being edited
- **Output:** Lock indicator or warning message

**REQ-REAL-004:** The system shall handle connection loss gracefully.
- **Process:** Detect disconnection, show offline indicator, queue updates
- **Output:** User notification, automatic reconnection

---

## 4. External Interface Requirements

### 4.1 User Interfaces

#### 4.1.1 General UI Requirements

**REQ-UI-001:** The user interface shall be responsive and adapt to screen sizes from 320px to 4K.

**REQ-UI-002:** The user interface shall support both light and dark themes.

**REQ-UI-003:** The user interface shall follow Material Design or similar modern design principles.

**REQ-UI-004:** The user interface shall provide visual feedback for all user actions within 100ms.

**REQ-UI-005:** The user interface shall display loading states during asynchronous operations.

**REQ-UI-006:** The user interface shall show error messages in a user-friendly format.

**REQ-UI-007:** The user interface shall be accessible via keyboard navigation.

**REQ-UI-008:** The user interface shall support touch gestures on mobile devices.

#### 4.1.2 Specific Page Interfaces

**Landing Page:**
- Hero section with product description
- Feature highlights
- Login/Signup call-to-action buttons
- Responsive navigation menu

**Dashboard:**
- Top navigation bar with logo, search, notifications, profile
- Sidebar with category filters
- Main feed area with news cards
- Floating action button (for content creators)
- Bottom navigation (mobile)

**News Detail Page:**
- Full article content with formatting
- Author information and avatar
- Publication date and metadata
- Bookmark button
- Related news section
- Share functionality

**Search Page:**
- Search input with autocomplete
- Filter controls (category, department, date)
- Results grid with relevant snippets
- Empty state for no results

**Profile Page:**
- User avatar and basic information
- Editable fields with save button
- Activity statistics
- Notification preferences
- Password change section

**Admin Dashboard:**
- Metrics overview with charts
- User management table
- Content moderation queue
- System settings panel

**Create/Edit Announcement:**
- Rich text editor
- Category and department selectors
- Priority level selector
- Image upload area
- Preview button
- Publish/Schedule buttons

### 4.2 Hardware Interfaces

**REQ-HW-001:** The system shall not require any specialized hardware beyond standard computing devices.

**REQ-HW-002:** The system shall support camera access for avatar upload (with user permission).

**REQ-HW-003:** The system shall utilize device notification capabilities (iOS/Android notification APIs).

**REQ-HW-004:** The system shall be optimized for touch screens on mobile devices.

**REQ-HW-005:** The system shall support offline storage using device local storage (minimum 50MB).

### 4.3 Software Interfaces

#### 4.3.1 Frontend Framework Interfaces

**Interface:** React 18  
**Purpose:** UI component rendering and state management  
**Data Format:** JSX/TSX, JavaScript objects  
**Communication:** Component props, hooks, context

**Interface:** React Router v6  
**Purpose:** Client-side routing  
**Data Format:** Route configuration objects  
**Communication:** Browser History API

**Interface:** React Query (TanStack Query)  
**Purpose:** Server state management and caching  
**Data Format:** Query keys, fetch functions  
**Communication:** HTTP requests via fetch API

#### 4.3.2 Backend Service Interfaces

**Interface:** Supabase PostgreSQL Database  
**Purpose:** Data persistence  
**Data Format:** JSON via REST API  
**Communication:** HTTPS requests, SQL queries  
**Authentication:** JWT tokens

**Tables:**
- `users` - User account information
- `announcements` - News and bulletin data
- `bookmarks` - User saved items
- `notifications` - Notification records
- `categories` - Category definitions
- `departments` - Department definitions

**Interface:** Supabase Authentication  
**Purpose:** User authentication and session management  
**Data Format:** JSON  
**Communication:** REST API  
**Methods:** signUp, signIn, signOut, resetPassword, getSession

**Interface:** Supabase Storage  
**Purpose:** File and image storage  
**Data Format:** Binary files, multipart/form-data  
**Communication:** REST API  
**Methods:** upload, download, delete, getPublicUrl

**Interface:** Supabase Realtime  
**Purpose:** Real-time subscriptions  
**Data Format:** JSON over WebSocket  
**Communication:** WebSocket connection  
**Events:** INSERT, UPDATE, DELETE on database tables

#### 4.3.3 Third-Party Service Interfaces

**Interface:** Email Service (e.g., SendGrid, AWS SES)  
**Purpose:** Transactional emails  
**Data Format:** SMTP or HTTP/JSON  
**Communication:** API calls  
**Usage:** Password reset, notifications

**Interface:** Push Notification Service (Firebase Cloud Messaging)  
**Purpose:** Mobile push notifications  
**Data Format:** JSON  
**Communication:** HTTPS POST requests  
**Usage:** Urgent announcements, news alerts

**Interface:** CDN (Content Delivery Network)  
**Purpose:** Static asset delivery  
**Data Format:** HTTP/HTTPS  
**Communication:** Standard web protocols  
**Usage:** Images, CSS, JavaScript bundles

### 4.4 Communication Interfaces

**REQ-COMM-001:** All client-server communication shall use HTTPS (TLS 1.2 or higher).

**REQ-COMM-002:** API requests shall use RESTful conventions with JSON payloads.

**REQ-COMM-003:** Real-time communication shall use WebSocket protocol (wss://).

**REQ-COMM-004:** The system shall implement CORS (Cross-Origin Resource Sharing) policies.

**REQ-COMM-005:** API responses shall include appropriate HTTP status codes.

**REQ-COMM-006:** The system shall implement request rate limiting to prevent abuse.

**REQ-COMM-007:** WebSocket connections shall implement automatic reconnection with exponential backoff.

**Standard HTTP Status Codes:**
- 200 OK - Successful request
- 201 Created - Resource created successfully
- 400 Bad Request - Invalid request data
- 401 Unauthorized - Authentication required
- 403 Forbidden - Insufficient permissions
- 404 Not Found - Resource not found
- 500 Internal Server Error - Server-side error
- 503 Service Unavailable - Temporary unavailability

**API Request Format:**
```json
{
  "endpoint": "/api/announcements",
  "method": "POST",
  "headers": {
    "Authorization": "Bearer <JWT_TOKEN>",
    "Content-Type": "application/json"
  },
  "body": {
    "title": "Sample Announcement",
    "content": "...",
    "category": "Academic",
    "priority": "normal"
  }
}
```

**API Response Format:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Sample Announcement",
    "created_at": "2025-10-16T10:00:00Z"
  },
  "error": null
}
```

---

## 5. Non-Functional Requirements

### 5.1 Performance Requirements

**REQ-PERF-001:** The system shall load the initial page within 3 seconds on a 4G connection.

**REQ-PERF-002:** The system shall load the news feed within 2 seconds.

**REQ-PERF-003:** The system shall support at least 10,000 concurrent users.

**REQ-PERF-004:** Search results shall be returned within 1 second for queries up to 1 million records.

**REQ-PERF-005:** The system shall handle at least 100 announcement publications per minute.

**REQ-PERF-006:** Real-time updates shall have a latency of less than 2 seconds.

**REQ-PERF-007:** Database queries shall execute within 500ms for 95% of requests.

**REQ-PERF-008:** Image uploads shall support files up to 10MB with progress indication.

**REQ-PERF-009:** The system shall implement lazy loading for images and components.

**REQ-PERF-010:** The system shall achieve a Lighthouse performance score of 90+ on mobile.

**REQ-PERF-011:** The system shall cache frequently accessed data for offline access.

**REQ-PERF-012:** API responses shall be compressed using gzip or brotli.

### 5.2 Safety Requirements

**REQ-SAFE-001:** The system shall prevent data loss through regular automated backups (daily minimum).

**REQ-SAFE-002:** The system shall implement transaction rollback for failed database operations.

**REQ-SAFE-003:** The system shall validate all user inputs to prevent data corruption.

**REQ-SAFE-004:** The system shall provide confirmation dialogs for destructive actions (delete).

**REQ-SAFE-005:** The system shall maintain audit logs of all administrative actions.

**REQ-SAFE-006:** The system shall implement soft deletes to allow data recovery.

**REQ-SAFE-007:** The system shall have disaster recovery procedures documented.

### 5.3 Security Requirements

**REQ-SEC-001:** All passwords shall be hashed using bcrypt with a minimum cost factor of 10.

**REQ-SEC-002:** The system shall implement JWT-based authentication with token expiration.

**REQ-SEC-003:** The system shall enforce HTTPS for all communications.

**REQ-SEC-004:** The system shall sanitize all user-generated content to prevent XSS attacks.

**REQ-SEC-005:** The system shall implement SQL injection prevention through parameterized queries.

**REQ-SEC-006:** The system shall enforce CSRF (Cross-Site Request Forgery) protection.

**REQ-SEC-007:** The system shall implement rate limiting on authentication endpoints (5 attempts per 15 minutes).

**REQ-SEC-008:** The system shall log all security-relevant events (login attempts, permission changes).

**REQ-SEC-009:** The system shall implement Content Security Policy (CSP) headers.

**REQ-SEC-010:** The system shall encrypt sensitive data at rest in the database.

**REQ-SEC-011:** The system shall implement role-based access control with principle of least privilege.

**REQ-SEC-012:** The system shall require re-authentication for sensitive operations (password change).

**REQ-SEC-013:** The system shall implement session timeout after 30 minutes of inactivity.

**REQ-SEC-014:** User file uploads shall be scanned for malware and restricted to approved file types.

**REQ-SEC-015:** The system shall implement HTTP security headers (HSTS, X-Frame-Options, etc.).

### 5.4 Software Quality Attributes

#### 5.4.1 Reliability

**REQ-REL-001:** The system shall have 99.5% uptime (excluding planned maintenance).

**REQ-REL-002:** The system shall handle errors gracefully with user-friendly error messages.

**REQ-REL-003:** The system shall implement error boundaries to prevent full application crashes.

**REQ-REL-004:** The system shall provide automatic error reporting to administrators.

**REQ-REL-005:** The system shall recover automatically from transient failures.

#### 5.4.2 Availability

**REQ-AVAIL-001:** The system shall be available 24/7 except during scheduled maintenance windows.

**REQ-AVAIL-002:** Scheduled maintenance shall be announced 48 hours in advance.

**REQ-AVAIL-003:** Maintenance windows shall not exceed 4 hours.

**REQ-AVAIL-004:** The system shall implement health check endpoints for monitoring.

#### 5.4.3 Maintainability

**REQ-MAINT-001:** The codebase shall maintain at least 70% test coverage.

**REQ-MAINT-002:** The code shall follow consistent style guidelines (ESLint, Prettier).

**REQ-MAINT-003:** All components shall have TypeScript type definitions.

**REQ-MAINT-004:** The system shall use semantic versioning for releases.

**REQ-MAINT-005:** The codebase shall be modular with clear separation of concerns.

**REQ-MAINT-006:** All public functions shall have JSDoc comments.

**REQ-MAINT-007:** The system shall maintain comprehensive API documentation.

#### 5.4.4 Portability

**REQ-PORT-001:** The system shall run on any platform supporting modern web browsers.

**REQ-PORT-002:** The system shall not depend on platform-specific features.

**REQ-PORT-003:** The PWA shall be installable on iOS, Android, Windows, macOS, and Linux.

**REQ-PORT-004:** The system shall export data in standard formats (JSON, CSV).

#### 5.4.5 Usability

**REQ-USE-001:** The system shall be usable by individuals with no technical training.

**REQ-USE-002:** The system shall provide contextual help and tooltips.

**REQ-USE-003:** The system shall display intuitive error messages with suggested solutions.

**REQ-USE-004:** The system shall maintain consistent UI patterns across all pages.

**REQ-USE-005:** The system shall support keyboard shortcuts for common actions.

**REQ-USE-006:** The system shall provide empty states with guidance when no content is available.

**REQ-USE-007:** The system shall complete user tasks in 3 clicks or less from the dashboard.

#### 5.4.6 Scalability

**REQ-SCALE-001:** The system architecture shall support horizontal scaling.

**REQ-SCALE-002:** The database shall support read replicas for improved performance.

**REQ-SCALE-003:** The system shall implement caching strategies (CDN, application cache).

**REQ-SCALE-004:** The system shall handle growth to 100,000 users without major architectural changes.

**REQ-SCALE-005:** The system shall support multiple deployment regions for global access.

#### 5.4.7 Accessibility

**REQ-ACCESS-001:** The system shall comply with WCAG 2.1 Level AA standards.

**REQ-ACCESS-002:** The system shall be fully navigable via keyboard.

**REQ-ACCESS-003:** The system shall provide alt text for all images.

**REQ-ACCESS-004:** The system shall maintain a minimum contrast ratio of 4.5:1 for text.

**REQ-ACCESS-005:** The system shall support screen readers (NVDA, JAWS, VoiceOver).

**REQ-ACCESS-006:** The system shall provide ARIA labels for interactive elements.

**REQ-ACCESS-007:** The system shall allow text resizing up to 200% without loss of functionality.

**REQ-ACCESS-008:** The system shall provide captions or transcripts for video content.

#### 5.4.8 Compatibility

**REQ-COMPAT-001:** The system shall support browsers released within the last 2 years.

**REQ-COMPAT-002:** The system shall degrade gracefully in older browsers with fallback experiences.

**REQ-COMPAT-003:** The system shall support both portrait and landscape orientations.

**REQ-COMPAT-004:** The system shall work with third-party password managers.

**REQ-COMPAT-005:** The system shall support assistive technologies and browser extensions.

---

## 6. Other Requirements

### 6.1 Database Requirements

**REQ-DB-001:** The database shall use PostgreSQL 14 or higher.

**REQ-DB-002:** The database schema shall be version-controlled using migrations.

**REQ-DB-003:** The database shall implement foreign key constraints for referential integrity.

**REQ-DB-004:** The database shall use indexes on frequently queried columns.

**REQ-DB-005:** The database shall implement row-level security policies.

**REQ-DB-006:** The database shall support full-text search capabilities.

### 6.2 Legal and Compliance Requirements

**REQ-LEGAL-001:** The system shall comply with GDPR for European users.

**REQ-LEGAL-002:** The system shall comply with FERPA for student data protection.

**REQ-LEGAL-003:** The system shall provide a privacy policy accessible from all pages.

**REQ-LEGAL-004:** The system shall provide terms of service during registration.

**REQ-LEGAL-005:** The system shall allow users to export their personal data.

**REQ-LEGAL-006:** The system shall allow users to request account deletion.

**REQ-LEGAL-007:** The system shall obtain user consent for cookies and tracking.

### 6.3 Internationalization Requirements

**REQ-I18N-001:** The system architecture shall support future multi-language capabilities.

**REQ-I18N-002:** All user-facing strings shall be externalized for potential translation.

**REQ-I18N-003:** The system shall display dates and times in user's local timezone.

**REQ-I18N-004:** The system shall support Unicode characters in content.

### 6.4 Documentation Requirements

**REQ-DOC-001:** The system shall provide user documentation (help guide).

**REQ-DOC-002:** The system shall provide administrator documentation.

**REQ-DOC-003:** The system shall provide API documentation for developers.

**REQ-DOC-004:** The system shall provide onboarding tutorials for new users.

**REQ-DOC-005:** The codebase shall include a comprehensive README file.

**REQ-DOC-006:** The system shall provide inline contextual help.

### 6.5 Training Requirements

**REQ-TRAIN-001:** The system shall provide video tutorials for content creators.

**REQ-TRAIN-002:** The system shall provide an FAQ section addressing common questions.

**REQ-TRAIN-003:** Administrators shall receive training materials for system configuration.

### 6.6 Installation and Deployment Requirements

**REQ-INSTALL-001:** The system shall support one-click deployment to Vercel.

**REQ-INSTALL-002:** The system shall include environment configuration templates.

**REQ-INSTALL-003:** The system shall provide database seed scripts for initial setup.

**REQ-INSTALL-004:** The system shall include CI/CD pipeline configuration.

**REQ-INSTALL-005:** The system shall support deployment rollback capabilities.

---

## 7. Appendix

### 7.1 Data Dictionary

#### User Entity
| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| id | UUID | Unique user identifier | Primary Key |
| email | String | User email address | Unique, Not Null |
| name | String | Full name | Not Null |
| role | Enum | User role | student, lecturer, admin |
| department | String | User's department | Not Null |
| level | String | Academic level (students only) | Optional |
| avatar | String | Profile picture URL | Optional |
| created_at | Timestamp | Account creation time | Auto-generated |
| updated_at | Timestamp | Last update time | Auto-updated |

#### Announcement Entity
| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| id | UUID | Unique announcement ID | Primary Key |
| title | String | Announcement title | Not Null, Max 200 chars |
| excerpt | String | Brief summary | Not Null, Max 300 chars |
| content | Text | Full content | Not Null |
| category | Enum | Content category | See category list |
| department | String | Publishing department | Not Null |
| author_id | UUID | Author user ID | Foreign Key to users |
| priority | Enum | Priority level | normal, high, urgent |
| image_url | String | Featured image URL | Optional |
| published_at | Timestamp | Publication time | Not Null |
| scheduled_at | Timestamp | Scheduled publication | Optional |
| view_count | Integer | Number of views | Default 0 |
| is_deleted | Boolean | Soft delete flag | Default false |
| created_at | Timestamp | Creation time | Auto-generated |
| updated_at | Timestamp | Last edit time | Auto-updated |

#### Bookmark Entity
| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| id | UUID | Unique bookmark ID | Primary Key |
| user_id | UUID | User who bookmarked | Foreign Key to users |
| announcement_id | UUID | Bookmarked announcement | Foreign Key to announcements |
| created_at | Timestamp | Bookmark creation time | Auto-generated |

#### Notification Entity
| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| id | UUID | Unique notification ID | Primary Key |
| user_id | UUID | Recipient user | Foreign Key to users |
| type | Enum | Notification type | news, event, urgent, system |
| message | String | Notification text | Not Null |
| related_news_id | UUID | Related announcement | Optional Foreign Key |
| is_read | Boolean | Read status | Default false |
| created_at | Timestamp | Notification time | Auto-generated |

#### Category Entity
| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| id | UUID | Unique category ID | Primary Key |
| name | String | Category name | Unique, Not Null |
| icon | String | Icon identifier | Not Null |
| color | String | Color code (hex) | Not Null |
| description | String | Category description | Optional |

#### Department Entity
| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| id | UUID | Unique department ID | Primary Key |
| name | String | Department name | Unique, Not Null |
| color | String | Color code (hex) | Not Null |
| description | String | Department description | Optional |

### 7.2 Use Case Diagrams

```
┌─────────────────────────────────────────────────────────────┐
│                     CampusStream Use Cases                   │
└─────────────────────────────────────────────────────────────┘

    Student                    Lecturer                Admin
       │                          │                      │
       │                          │                      │
       ├──► View News Feed        │                      │
       │                          │                      │
       ├──► Search Content        │                      │
       │                          │                      │
       ├──► Bookmark Items        │                      │
       │                          │                      │
       ├──► View Notifications    │                      │
       │                          │                      │
       ├──► Filter by Category    │                      │
       │                          │                      │
       ├──► View Profile          │                      │
       │                          │                      │
       │                          ├──► Create Announcement
       │                          │                      │
       │                          ├──► Edit Announcement │
       │                          │                      │
       │                          ├──► Delete Announcement
       │                          │                      │
       │                          ├──► View Analytics    │
       │                          │                      │
       │                          │                      ├──► Manage Users
       │                          │                      │
       │                          │                      ├──► Moderate Content
       │                          │                      │
       │                          │                      ├──► Configure System
       │                          │                      │
       │                          │                      ├──► View All Analytics
```

### 7.3 System Architecture Diagram

```
┌───────────────────────────────────────────────────────────────────┐
│                         Client Layer                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │   Desktop    │  │    Mobile    │  │   Tablet     │            │
│  │   Browser    │  │   Browser    │  │   Browser    │            │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘            │
│         │                  │                  │                    │
│         └──────────────────┴──────────────────┘                    │
│                            │                                       │
└────────────────────────────┼───────────────────────────────────────┘
                             │
                    HTTPS/WSS (TLS 1.2+)
                             │
┌────────────────────────────┼───────────────────────────────────────┐
│                 Presentation Layer (Frontend)                      │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │               React 18 + TypeScript PWA                      │ │
│  │  ┌────────────┐  ┌─────────────┐  ┌─────────────────────┐  │ │
│  │  │   Pages    │  │ Components  │  │  State Management   │  │ │
│  │  │            │  │             │  │   (React Query)     │  │ │
│  │  └────────────┘  └─────────────┘  └─────────────────────┘  │ │
│  │  ┌────────────┐  ┌─────────────┐  ┌─────────────────────┐  │ │
│  │  │   Router   │  │    Hooks    │  │   Service Worker    │  │ │
│  │  └────────────┘  └─────────────┘  └─────────────────────┘  │ │
│  └──────────────────────────────────────────────────────────────┘ │
└────────────────────────────┼───────────────────────────────────────┘
                             │
                    REST API / WebSocket
                             │
┌────────────────────────────┼───────────────────────────────────────┐
│                   Business Logic Layer (Backend)                   │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                    Supabase Platform                         │ │
│  │  ┌────────────────┐  ┌────────────────┐  ┌───────────────┐ │ │
│  │  │ Authentication │  │   REST API     │  │   Realtime    │ │ │
│  │  │    Service     │  │    Gateway     │  │  Subscriptions│ │ │
│  │  └────────────────┘  └────────────────┘  └───────────────┘ │ │
│  │  ┌────────────────┐  ┌────────────────┐  ┌───────────────┐ │ │
│  │  │     Storage    │  │      Edge      │  │   Functions   │ │ │
│  │  │    Service     │  │    Functions   │  │  (Serverless) │ │ │
│  │  └────────────────┘  └────────────────┘  └───────────────┘ │ │
│  └──────────────────────────────────────────────────────────────┘ │
└────────────────────────────┼───────────────────────────────────────┘
                             │
                     Database Protocol
                             │
┌────────────────────────────┼───────────────────────────────────────┐
│                        Data Layer                                  │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                 PostgreSQL 14 Database                       │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │ │
│  │  │  Users   │ │Announcem.│ │Bookmarks │ │Notifications │   │ │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────────┘   │ │
│  │  ┌──────────┐ ┌──────────┐                                  │ │
│  │  │Categories│ │Department│                                  │ │
│  │  └──────────┘ └──────────┘                                  │ │
│  └──────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│                      External Services                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐ │
│  │     CDN      │  │    Email     │  │  Push Notifications      │ │
│  │   (Vercel)   │  │   Service    │  │       (FCM)              │ │
│  └──────────────┘  └──────────────┘  └──────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

### 7.4 Sample Workflows

#### Workflow 1: User Registration and Login

1. User navigates to landing page
2. User clicks "Sign Up" button
3. System displays registration form
4. User enters email, password, name, department, role
5. System validates input data
6. System checks email uniqueness
7. System hashes password
8. System creates user record in database
9. System sends confirmation email
10. User clicks "Login" button
11. User enters credentials
12. System verifies credentials
13. System generates JWT token
14. System redirects to dashboard
15. System loads personalized news feed

#### Workflow 2: Creating an Announcement

1. Lecturer logs into system
2. Lecturer navigates to dashboard
3. Lecturer clicks Floating Action Button (FAB)
4. System displays announcement creation form
5. Lecturer enters title, content, selects category and department
6. Lecturer sets priority level
7. Lecturer uploads optional image
8. Lecturer clicks "Publish" button
9. System validates input data
10. System sanitizes content
11. System saves announcement to database
12. System triggers real-time update to all connected clients
13. System creates notifications for relevant users
14. System sends push notifications for urgent announcements
15. System displays success message
16. System redirects to announcement detail page

#### Workflow 3: Searching and Bookmarking

1. Student views dashboard
2. Student enters search query in search bar
3. System navigates to search page
4. System performs full-text search
5. System displays ranked results
6. Student applies category filter
7. System refines results
8. Student clicks on announcement
9. System displays full announcement
10. Student clicks bookmark icon
11. System creates bookmark record
12. System updates UI to show bookmarked state
13. System displays confirmation toast
14. Student navigates to bookmarks page
15. System displays all bookmarked items

### 7.5 Screen Mockup References

**Note:** Detailed UI mockups and wireframes are maintained separately in the design documentation. Key screens include:

- Landing Page (Desktop & Mobile)
- Dashboard/News Feed (Desktop & Mobile)
- Announcement Detail View
- Search Results Page
- Create/Edit Announcement Form
- User Profile Page
- Notifications Panel
- Admin Dashboard
- Bookmarks Page
- Login/Signup Forms
- Settings Page

### 7.6 Glossary

**Announcement:** An official news item or notice published by authorized users (lecturers or administrators) to inform the campus community.

**Bookmark:** A user-saved reference to an announcement for easy future access.

**Category:** A classification system for organizing announcements (e.g., Academic, Event, Sport).

**Dashboard:** The main landing page showing a personalized feed of announcements.

**Department:** An organizational unit within the campus (e.g., Computer Science, Engineering).

**Feed:** A chronologically ordered list of announcements displayed to users.

**Notification:** An alert sent to users about new or important announcements.

**Priority Level:** An indicator of announcement urgency (Normal, High, Urgent).

**Progressive Web App (PWA):** A web application that can be installed on devices and provides offline functionality.

**Real-time Updates:** Instant synchronization of data across all connected clients without manual refresh.

**Role:** User classification determining access permissions (Student, Lecturer, Administrator).

**Session:** An authenticated user's active period on the system.

**Soft Delete:** A deletion method that marks records as deleted without permanently removing them from the database.

### 7.7 Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-16 | BISHOP-X | Initial SRS document creation |

### 7.8 Approval

**Document Status:** Draft  
**Review Status:** Pending Review

**Stakeholder Approvals:**

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Project Manager | | | |
| Lead Developer | BISHOP-X | | |
| QA Lead | | | |
| Product Owner | | | |
| Technical Architect | | | |

---

**End of Software Requirements Specification Document**

*This document is subject to change and will be updated as the project evolves. All stakeholders will be notified of major revisions.*
