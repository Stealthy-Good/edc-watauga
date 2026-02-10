# Directive: Debug and Logging Standards

## Purpose

Define structured logging and diagnostic patterns so the AI (and humans) can quickly understand application state, trace problems, and verify behavior without ad-hoc debugging.

> **Note:** This directive covers *application runtime* logging — what the running app outputs. For *agent development error tracking* (the self-annealing loop), see `directives/error-logging.md`.

## Trigger

- [x] Manual (when building features that need observability)
- [x] Manual (when diagnosing a bug or unexpected behavior)

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| Feature or module being built | string | Yes | What area of the app needs logging |

## Log Levels

Use these consistently across the application. Every log call must include a level.

| Level | When to Use | Example |
|-------|-------------|---------|
| `error` | Something failed and needs attention | Database connection lost, payment API returned 500 |
| `warn` | Something unexpected but non-fatal | Retry attempt, deprecated API usage, slow query |
| `info` | Key business events and state transitions | User signed up, order placed, job completed |
| `debug` | Detailed context useful during development | Request payload, query parameters, cache hit/miss |

**Rules:**
- `error` and `warn` are always on in production
- `info` is on by default in production, can be toggled
- `debug` is off in production, on in development
- Never log sensitive data (passwords, tokens, PII) at any level

## Structured Log Format

Logs must be structured (key-value), not free-form strings. This makes them parseable by both humans and AI.

```typescript
// Good — structured, parseable, has context
logger.info("order.placed", {
  orderId: order.id,
  userId: user.id,
  total: order.total,
  itemCount: order.items.length,
});

// Bad — free-form string, no structured context
console.log(`Order ${order.id} placed by user ${user.id} for $${order.total}`);
```

### Required Fields

Every log entry should include:

| Field | Description |
|-------|-------------|
| `level` | error, warn, info, debug |
| `event` | Dot-notation event name (e.g., `user.signup`, `payment.failed`) |
| `timestamp` | ISO 8601 (usually handled by the logging library) |

### Contextual Fields

Add these when relevant:

| Field | When |
|-------|------|
| `userId` | Any user-initiated action |
| `requestId` | API requests (for tracing a request across functions) |
| `duration` | Any operation you want to measure performance on |
| `error` | When logging an error — include message and stack |

## Steps

### When building a new feature

1. Identify the key state transitions and decision points in the feature
2. Add `info` logs at each state transition (e.g., "job started", "job completed")
3. Add `debug` logs at decision points (e.g., "cache hit, skipping fetch")
4. Add `error` logs in catch blocks with full error context
5. Add `warn` logs for recoverable issues (e.g., retry, fallback used)

### When diagnosing a bug

1. Check existing logs first — read the structured output before adding new logging
2. If logs are insufficient, add targeted `debug` logs around the suspected area
3. Include the inputs, outputs, and intermediate state of the failing operation
4. After fixing the bug, keep useful `debug` logs and remove any that were purely investigative

### Request Tracing

For API routes and multi-step operations, pass a `requestId` through the call chain so you can correlate logs from a single request:

```typescript
// In your API route or middleware
const requestId = crypto.randomUUID();

// Pass it through to lib/ functions
const result = await processOrder(orderData, { requestId });

// Every log in the chain includes it
logger.info("order.validated", { requestId, orderId });
logger.info("payment.charged", { requestId, amount });
logger.info("order.confirmed", { requestId, orderId });
```

This lets you filter all logs for a single request when debugging.

## Logger Setup

When scaffolding a new project, create a minimal logger utility at `lib/utils/logger.ts`:

```typescript
// lib/utils/logger.ts
type LogLevel = "debug" | "info" | "warn" | "error";

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const currentLevel: LogLevel =
  (process.env.LOG_LEVEL as LogLevel) || (process.env.NODE_ENV === "production" ? "info" : "debug");

export function log(level: LogLevel, event: string, data?: Record<string, unknown>) {
  if (LOG_LEVELS[level] < LOG_LEVELS[currentLevel]) return;

  const entry = {
    level,
    event,
    timestamp: new Date().toISOString(),
    ...data,
  };

  if (level === "error") {
    console.error(JSON.stringify(entry));
  } else if (level === "warn") {
    console.warn(JSON.stringify(entry));
  } else {
    console.log(JSON.stringify(entry));
  }
}

export const logger = {
  debug: (event: string, data?: Record<string, unknown>) => log("debug", event, data),
  info: (event: string, data?: Record<string, unknown>) => log("info", event, data),
  warn: (event: string, data?: Record<string, unknown>) => log("warn", event, data),
  error: (event: string, data?: Record<string, unknown>) => log("error", event, data),
};
```

This is intentionally minimal. Replace with a production logging library (e.g., pino, winston) when the project needs it. The interface stays the same.

## Outputs

- Structured, parseable log output at all application layers
- A `lib/utils/logger.ts` utility ready for use across the project
- Request tracing via `requestId` for multi-step operations

## Tools Used

- `lib/utils/logger.ts` — the logging utility created by this directive

## Error Handling

| Error | Recovery |
|-------|----------|
| Logs contain sensitive data (PII, tokens) | Remove immediately, add the field to a deny-list in the logger, log the incident via `directives/error-logging.md` |
| Logs are too noisy in production | Raise the `LOG_LEVEL` env var, review and remove excessive `info` logs |
| AI adds `console.log` instead of using the logger | Replace with `logger.*` calls during review — the linter can enforce this (see `directives/coding-standards.md`) |

## Learned Constraints

<!--
  Updated by the agent during self-annealing.
  Each entry must include a date and be appended, never overwritten.
  Format: - YYYY-MM-DD: What was learned
-->
