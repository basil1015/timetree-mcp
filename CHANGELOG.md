# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-05-10

### Added
- `create_event` tool - Create new events in calendars
- `update_event` tool - Update existing events (partial updates supported)
- `delete_event` tool - Delete events from calendars
- `get_updated_events` tool - Efficient incremental sync for recently modified events
- Label color support (label_id 1-10) with human-readable color names in output
- CSRF token management for write operations
- CI workflow for automated build verification on PRs
- Auto-reviewer assignment on pull requests

### Changed
- Replaced `node-fetch` with native `fetch` (Node.js 18+)
- Improved `deleteEvent` to avoid fetching all events unnecessarily
- Updated COMMANDS.md with full tool documentation
- Updated CONTRIBUTING.md project structure to reflect current codebase
- Clarified that the documented `npx timetree-mcp` setup depends on a local `npm link` step rather than npm publish

### Removed
- `node-fetch` dependency (native fetch used instead)

## [0.1.0] - 2026-02-15

### Added
- Initial release of TimeTree MCP Server
- `list_calendars` tool - List all active TimeTree calendars
- `get_events` tool - Get events from a specific calendar with automatic pagination
- TimeTree authentication via email/password
- Rate limiting (10 requests/second with token bucket algorithm)
- Exponential backoff for 429 (rate limit) errors
- Automatic pagination for event sync API
- Structured logging with sensitive data masking
- Comprehensive error handling
- TypeScript support with full type definitions
- Zod schema validation for API responses

### Security
- Session cookie management (memory only, never persisted)
- Password and session ID masking in logs
- Environment variable validation
