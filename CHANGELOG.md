# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-05-10

### Added
- CI workflow for automated build verification on PRs
- CODEOWNERS for auto-reviewer assignment
- Pre-flight checks in install script (git, Node.js 18+, npm)

### Changed
- Replaced `node-fetch` with native `fetch` (Node.js 18+)
- Improved `deleteEvent` error handling
- Updated all documentation (COMMANDS.md, CONTRIBUTING.md) for current state

### Removed
- `node-fetch` dependency

## [0.1.0] - 2026-02-15

### Added
- `list_calendars` tool - List all active TimeTree calendars
- `get_events` tool - Get events with automatic pagination and date filtering
- `get_updated_events` tool - Efficient incremental sync
- `create_event` / `update_event` / `delete_event` tools - Full CRUD
- Label color support (label_id 1-10)
- TimeTree authentication via email/password with CSRF token management
- Rate limiting (10 req/sec) with exponential backoff
- Structured logging with sensitive data masking
- Interactive install script with multi-client configuration guide

### Security
- Session cookies in memory only, never persisted
- Password and session ID masking in logs
