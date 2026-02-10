# Directive: [Name]

> Copy this template to create a new directive. Remove this line when done.

## Purpose

One-line description of what this directive accomplishes.

## Trigger

When should this directive be invoked?
- [ ] Manual (user requests it)
- [ ] Scheduled (cron, interval)
- [ ] On event (webhook, file change, etc.)

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
|      |      |          |             |

## Steps

1. Step one
2. Step two
3. Step three

## Outputs

What this directive produces (file, API response, database record, side effect, etc.)

## Tools Used

List the `lib/` modules this directive relies on:
- `lib/api/example.ts` — what it does
- `lib/utils/example.ts` — what it does

## Error Handling

| Error | Recovery |
|-------|----------|
| API returns 429 (rate limited) | Wait and retry with exponential backoff |
| Input validation fails | Return error to user with specific field failures |

## Learned Constraints

<!--
  Updated by the agent during self-annealing.
  Each entry must include a date and be appended, never overwritten.
  Format: - YYYY-MM-DD: What was learned
-->
