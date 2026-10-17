# Lead Qualifier
A small FastAPI service that takes a raw message from a potential customer and returns structured JSON: extracted details, intent, priority score (0-100), a one-line summary and a suggested reply.

## Status

Work in progress. The API, input/output validation, retry logic, prompt and Docker setup are done. The LLM call in `app/llm.py` is currently a placeholder returning fixed JSON, and the real provider integration is next.

## Run locally 
    uv sync
    uv run uvicorn app.main:app --reload

Then open http://127.0.0.1:8000/docs and try `POST /qualify`.

## Example

Request:

  {"message": "Hi, I'm Sara from Acme. We need a quote for 3 chatbots, budget around $5k, start next month."}

Response (current placeholder output):

    {
      "details": {"name": "Sara", "company": "Acme", "budget": "$5k", "timeline": "next month"},
      "intent": "purchase",
      "priority_score": 85,
      "summary": "Acme wants 3 chatbots with $5k budget, startign next month."
      "suggested_reply": "Hi Sara, thanks for reaching out!"
    }

## How it works

- `app/schemas.py` defines the input and output contract with Pydantic.
- `app/analyzer.py` validates the model's output and retries once with the error message if it is invalid.
- `app/llm.py` is the only file that talks to the LLM provider, so the provider can be swapped easily.
- `app/prompts.py` holds the system prompt. which treats the lead message as data only.

## Docker 

    docker build -t lead-qualifier .
    docker run -p 8000:8000 lead-qualifier

## Test cases

`tests/test_leads.json` contains sample leads (purchase, pricing, support, spam, prompt injection, French) that will be used to evaluate prompt changes.