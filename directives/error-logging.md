# Directive: Error Logging

## Purpose

Capture structured error data during development so the agent can learn from failures across sessions.

## Trigger

- [x] On event (when an error occurs during any directive execution)

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| error | Error/string | Yes | The error message and stack trace |
| directive | string | Yes | Which directive was being executed |
| function | string | Yes | Which `lib/` function failed |
| context | string | No | Additional context (inputs, state) |

## Steps

1. When an error occurs, append an entry to `.tmp/error-log.json`
2. Check the log for previous occurrences of the same error pattern
3. If a known resolution exists, apply it
4. If this is a new error, resolve it via the self-annealing loop, then log the resolution

## Log Format

Each entry in `.tmp/error-log.json`:

```json
{
  "errors": [
    {
      "timestamp": "2025-01-15T10:30:00Z",
      "directive": "directives/fetch-user-data.md",
      "function": "lib/api/users.ts:getUser",
      "error": "Error: 429 Too Many Requests",
      "resolution": "Added exponential backoff with max 3 retries",
      "preventionAdded": true
    }
  ]
}
```

## Outputs

- Updated `.tmp/error-log.json` with the new entry
- If a new pattern is discovered, the originating directive's `## Learned Constraints` section is updated

## Tools Used

- File system (read/write `.tmp/error-log.json`)
- The originating directive (for updating learned constraints)

## Error Handling

| Error | Recovery |
|-------|----------|
| `.tmp/error-log.json` doesn't exist | Create it with `{ "errors": [] }` |
| Log file is corrupted | Rename to `.tmp/error-log.backup.json`, create fresh log |

## Learned Constraints

<!--
  Updated by the agent during self-annealing.
  Format: - YYYY-MM-DD: What was learned
-->
