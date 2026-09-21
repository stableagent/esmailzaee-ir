# Content Model

## Source of truth

Canonical content is stored as JSON under content/canonical/.

TOON files under content/toon/ are generated projections and should not be edited as an independent source of truth.

## Localization

Stable IDs are language-neutral.

Example:

profile.id = "profile"

Localized presentation data is stored separately or grouped under locale-aware fields, depending on the final schema.

## Core entities

### Profile

- id
- name
- display_name
- title
- bio
- location
- links
- contact

### About

- id
- title
- summary
- sections

### Project

- id
- slug
- name
- description
- status
- technologies
- repository
- website
- started_at
- updated_at
- highlights

### Skill

- id
- name
- category
- description
- related_projects

### Activity

- id
- date
- type
- title
- description
- related_project

### Contact

- id
- email
- social_links
- preferred_channels

## TOON projection

TOON is generated from canonical JSON using a pinned TOON v4.1-compatible encoder.

The generated representation must preserve:

- IDs
- relationships
- names
- descriptions
- dates
- URLs
- ordering where semantically relevant

Generated TOON must be validated before it is committed.

## Content workflow

1. Edit canonical JSON.
2. Validate schema.
3. Generate TOON.
4. Validate TOON in strict mode.
5. Build the static site.
6. Run tests.
7. Deploy.
