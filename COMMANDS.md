# TimeTree MCP Commands

Quick reference for using TimeTree MCP Server with AI assistants.

## Available Tools

| Tool | Description |
|------|-------------|
| **list_calendars** | List all active calendars with participating users |
| **get_events** | Get events from a calendar (with date filtering) |
| **get_updated_events** | Get recently modified events (efficient sync) |
| **create_event** | Create a new event |
| **update_event** | Update an existing event |
| **delete_event** | Delete an event |

## Tool Details

### list_calendars

Returns all active calendars with IDs, names, and participant info.

| Parameter | Required | Description |
|-----------|----------|-------------|
| *(none)* | — | No input needed |

**Example prompts:**
- "List my TimeTree calendars"
- "Who's in my Work calendar?"

---

### get_events

Fetches all events from a calendar with optional client-side filtering.

| Parameter | Required | Description |
|-----------|----------|-------------|
| `calendar_id` | Yes | Calendar ID (from `list_calendars`) |
| `start_after` | No | Unix timestamp (ms) — only return events starting after this time |
| `limit` | No | Maximum number of events to return |

**Example prompts:**
- "Show events from my Personal calendar"
- "What's on my schedule after June 1st?"
- "Show me the next 5 events"

---

### get_updated_events

Fetches only events modified after a timestamp. More efficient than `get_events` for checking recent changes.

| Parameter | Required | Description |
|-----------|----------|-------------|
| `calendar_id` | Yes | Calendar ID |
| `updated_after` | Yes | Unix timestamp (ms) — only return events updated after this time |
| `limit` | No | Maximum number of events to return |

**Example prompts:**
- "What changed in my calendar this week?"
- "Show events updated in the last 24 hours"

---

### create_event

Creates a new event in a calendar.

| Parameter | Required | Description |
|-----------|----------|-------------|
| `calendar_id` | Yes | Calendar ID |
| `title` | Yes | Event title |
| `start_at` | Yes | Start time (Unix timestamp in ms) |
| `end_at` | Yes | End time (Unix timestamp in ms) |
| `all_day` | No | All-day event (default: false) |
| `start_timezone` | No | e.g., "Asia/Seoul" (default: UTC) |
| `end_timezone` | No | e.g., "Asia/Seoul" (default: UTC) |
| `label_id` | No | Color 1-10 (see [Label Colors](#label-colors)) |
| `note` | No | Event description |
| `location` | No | Event location |
| `url` | No | Related URL |

**Example prompts:**
- "Create a meeting tomorrow at 2pm called 'Team Sync'"
- "Add an all-day event on March 15 called 'Holiday'"
- "Schedule a red-colored event for dentist appointment next Monday 10am-11am"

---

### update_event

Updates an existing event. Only provide fields you want to change.

| Parameter | Required | Description |
|-----------|----------|-------------|
| `calendar_id` | Yes | Calendar ID |
| `event_uuid` | Yes | Event UUID (from `get_events`) |
| `title` | No | New title |
| `start_at` | No | New start time |
| `end_at` | No | New end time |
| `all_day` | No | Change all-day status |
| `label_id` | No | New color |
| `note` | No | New description |
| `location` | No | New location |
| `url` | No | New URL |

**Example prompts:**
- "Move my dentist appointment to 3pm"
- "Change the Team Sync title to 'Sprint Planning'"
- "Add a location to tomorrow's meeting"

---

### delete_event

Permanently deletes an event. Cannot be undone.

| Parameter | Required | Description |
|-----------|----------|-------------|
| `calendar_id` | Yes | Calendar ID |
| `event_uuid` | Yes | Event UUID (from `get_events`) |

**Example prompts:**
- "Delete the cancelled meeting on Friday"
- "Remove the 'Dentist' event"

---

## Label Colors

Events can be color-coded with `label_id` 1-10:

| ID | Color | Hex |
|----|-------|-----|
| 1 | Emerald green | #2ecc87 |
| 2 | Modern cyan | #3dc2c8 |
| 3 | Deep sky blue | #47b2f7 |
| 4 | Pastel brown | #948078 |
| 5 | Midnight black | #212121 |
| 6 | Apple red | #e73b3b |
| 7 | French rose | #f35f8c |
| 8 | Coral pink | #fb7f77 |
| 9 | Bright orange | #fdc02d |
| 10 | Soft violet | #b38bdc |

## Common Workflows

```
# Daily check
"What's on my schedule today?"

# Weekly planning
"Show me all events for next week"

# Find events with someone
"What do I have with Sarah?" → AI finds the shared calendar and shows events

# Quick event creation
"Add lunch with Tom on Thursday at noon, mark it orange"

# Reschedule
"Move the Friday standup to Monday same time"

# Sync check
"What changed in my Work calendar since yesterday?"
```

## Notes

- **All-day events**: TimeTree uses inclusive end dates. A Feb 15-16 event sets `end_at` to Feb 16 00:00, not Feb 17.
- **Timezones**: Default is UTC. Specify timezone for accurate local times.
- **Write operations** (create/update/delete) require a CSRF token, which is managed automatically.
