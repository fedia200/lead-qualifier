# Lead Qualifier: Frontend

React interface for the Lead Qualifier API. Paste an incoming message from a lead and get back the extracted details, the detected intent, a priority score and a suggested reply.

Built with React, Vite and Tailwind CSS. Talks to `POST /qualify` of the FastAPI backend.

## Features

- Form to paste a lead message (5 to 5000 characters, same limits as the API)
- Ready-made examples (hot lead, support request, spam)
- Result card: intent badge, priority score bar, summary, extracted details, suggested reply with a copy button
- History of qualified leads, saved in the browser (localStorage), click one to view it again
- Readable error messages (API offline, validation errors, LLM errors)

## Run it

1. Start the backend (from the project root):

   ```bash
   uv run uvicorn app.main:app --reload
   ```

2. Start the frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Open http://localhost:5173

The API URL defaults to `http://127.0.0.1:8000`. To change it, copy `.env.example` to `.env` and edit `VITE_API_URL`.

## API contract

Request:

```json
{ "message": "..." }
```

Response:

```json
{
  "details": { "name": null, "email": null, "company": null, "budget": null, "timeline": null },
  "intent": "pricing | support | partnership | purchase | spam | other",
  "priority_score": 0,
  "summary": "...",
  "suggested_reply": "..."
}
```

The backend must allow the frontend origin through CORS (see the main README).
