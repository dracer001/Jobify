# Jobify: Product Spec

Last updated: 2026-11-16

## Problem

Skilled people and companies struggle to find clients, and clients struggle to find the right provider. Jobify connects the two. It is free to use and open to anyone, whether freelancer, individual or company.

## Accounts and roles

- There is one kind of account. Its profile is either an **individual** or an **organization**. This only changes which profile fields are shown, not what the account can do.
- **Client** and **provider** are roles on a job, not account types. The same account can be the client on one job and the provider on another.
- Offering services is **opt-in**. Everyone has a basic profile. An optional "provider profile" (skills, rates, portfolio) makes someone appear in provider search and eligible for direct requests. A user who only wants to hire never needs it.
- Later, organizations can gain team members with roles, a verified badge and business features (invoices, hiring several providers). None of this is in v1, but the design must not block it.

## v1 user stories

### Accounts and profiles
1. A visitor can sign up as an individual or an organization, then sign in and out.
2. Every user has a basic profile (name, photo, location, short bio).
3. A user can optionally turn on a provider profile with skills, rates and portfolio links.
4. A signed-in user can view other people's profiles.

### Jobs
5. A client can post a job with a title, description, category, tags, budget and deadline.
6. A signed-in user can browse and search jobs, filtering by category, tags and budget, with pagination.
7. A client can edit, close or cancel their own job before it is awarded.

### Proposals
8. A provider can send a proposal on an open job (price, timeline, message) and can withdraw it.
9. A client can review the proposals on their job and accept one. The others are declined automatically.

### Delivery and completion
10. A provider can mark work as delivered, with a note and files.
11. A client can accept the delivery, which completes the job, or request changes.
12. After a job is completed, both sides can leave a rating and a short review.

### Everyday use
13. A user can see "my jobs" in both roles, as client and as provider, with each job's status.
14. Sample policy pages (terms, privacy, refunds and disputes) are linked in the footer.

## Job lifecycle

open -> in progress -> delivered -> completed

Exit: cancelled (only before work starts). A "disputed" state is added later.

Payment is modelled as a separate state machine (unfunded -> funded and held -> released or refunded) so escrow can be added in Section 9 without redesigning jobs. Until then, jobs move through their lifecycle without real money.

## Out of v1

- Real payments and escrow (Section 9)
- Direct requests to a specific provider (v1.1, built on the same job lifecycle)
- Notifications (Section 8)
- Chat (Section 10). Rule when built: a conversation can only exist around a job or proposal, with no cold messages.
- Multi-member organizations
- Admin moderation panel and a formal dispute process
- Password reset and email verification

## AI features (Section 12, after the core flow works)

1. **Job drafting:** a client describes the job in a sentence or two and gets a drafted post (title, description, category, tags, suggested budget and deadline) to review and edit. Nothing is published automatically.
2. **Suggested providers:** for a job post, show a ranked list of matching providers, each with a short reason.
3. **Recommended jobs:** providers see open jobs that suit their skills.

Design notes:
- Ask the model for structured output and validate it on the server. Treat it as a draft that the user confirms.
- API keys stay on the server and never go in a `VITE_*` variable.
- Rate-limit and cache requests, because every call costs money on a free platform.
- Send only job text, never personal details.
- Keep the AI provider swappable behind one service class.
- Start matching with a non-AI baseline (category, tags, keywords), then add semantic matching with embeddings and compare.

## Glossary

- **Account:** one login. Its profile is an individual or an organization.
- **Provider profile:** the optional section of a profile that offers services.
- **Job:** what the old code called a "work."
- **Proposal:** a provider's bid on a job.
- **Client / provider:** roles on a job, not account types.
- **Delivery:** the provider's submitted work.
- **Review:** a rating plus a short comment after completion.

## Open decisions

- Which AI provider and model to use, and how to store embeddings. As far as I know, MariaDB 10.11 has no native vector type, so we may compute similarity in application code at this scale.
- Whether password reset and email verification join v1.
