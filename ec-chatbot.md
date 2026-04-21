# EC Chatbot — Implementation Plan

## Context

While browsing the bug-i-dex page, users can click a small square chat box in the bottom-right corner and ask questions about their caught species (e.g., "what's the difference between my two butterflies?", "which of my bugs are pollinators?"). The implementation matches the existing codebase style: vanilla JS, native `fetch`, Handlebars templates, per-page CSS under `src/resources/css/`, and routes appended directly to `src/index.js`. No new dependencies beyond what's already in `package.json` — `axios` (already listed) handles the outbound Anthropic API call.

The user's caught species are fetched server-side and injected into the Anthropic system prompt, so the assistant always has up-to-date context about what the user has collected.

## Files Modified / Created

| File | Action |
|---|---|
| `.env` | Appended `ANTHROPIC_API_KEY=""` placeholder |
| `src/index.js` | Added `axios` import, `express.json()` middleware, and `POST /api/chat` route |
| `src/views/pages/bug-i-dex.hbs` | Embedded the chat box markup + `<script src="/js/bug-i-dex.js">` |
| `src/resources/css/bug-i-dex.css` | Appended chatbot styles (fixed bottom-right square, green theme) |
| `src/resources/js/bug-i-dex.js` | **New file** — vanilla JS: send/receive messages, maintain conversation history client-side |

No changes to `docker-compose.yaml` were needed — the `web` service already loads `env_file: .env`, so `process.env.ANTHROPIC_API_KEY` becomes available inside the container after a restart.

## Implementation Details

### 1. `.env`
Appended:
```
# Anthropic API
ANTHROPIC_API_KEY=""
```
User pastes their key between the quotes.

### 2. `src/index.js` — new route

`axios` is required at the top of the file. `express.json()` is registered globally (previously only `urlencoded` was registered, which couldn't parse the JSON payload the chat client sends).

The route fetches the logged-in user's caught bugs from the existing `bug_info` / `posts` / `user_to_post` schema, turns the list into a short string, and passes it as the `system` prompt to Anthropic's Messages API. The client sends the full message history each turn, so the server is stateless.

Model used: `claude-haiku-4-5-20251001` (cheap, fast — fine for short Q&A).

### 3. `src/views/pages/bug-i-dex.hbs`

Chat markup appended after the bug grid:

```hbs
<div id="chatbot" class="chatbot">
  <div class="chatbot__header">Ask about your bugs</div>
  <div id="chatbot-messages" class="chatbot__messages"></div>
  <form id="chatbot-form" class="chatbot__form">
    <input id="chatbot-input" type="text" placeholder="Ask a question..." autocomplete="off" required>
    <button type="submit">Send</button>
  </form>
</div>
<script src="/js/bug-i-dex.js"></script>
```

### 4. `src/resources/css/bug-i-dex.css`

A fixed-position 300x300 square pinned to the bottom-right corner, using the existing green theme (`rgb(72, 133, 72)`) to match the rest of the dex.

### 5. `src/resources/js/bug-i-dex.js`

An IIFE that:
- Holds a `history` array of `{ role, content }` messages in memory.
- On form submit, appends the user message, POSTs `{ messages: history }` to `/api/chat`, and appends the assistant reply when it returns.
- Uses `textContent` (not `innerHTML`) when rendering messages to avoid XSS.

## How to Run / Verify

1. Paste your Anthropic API key into `.env`:
   ```
   ANTHROPIC_API_KEY="sk-ant-..."
   ```
2. Restart the stack so the `web` container picks up the new env var:
   ```
   docker compose up --build
   ```
3. Log in, navigate to `http://localhost:3000/bug-i-dex`.
4. Confirm the green-bordered chat box appears in the bottom-right corner.
5. Type "what bugs have I caught?" — expect a reply that mentions your caught species.
6. Ask a follow-up ("tell me more about the first one") — confirm conversation history carries over.
7. On failures, check `docker compose logs web` for lines starting with `Chat error:`.
