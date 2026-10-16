from pydantic import ValidationError

from .llm import call_llm
from .prompts import SYSTEM_PROMPT
from .schemas import LeadAnalysis

MAX_ATTEMPTS = 2


def analyze_lead(message: str) -> LeadAnalysis:
    user_message = message
    last_error = None
    for _ in range(MAX_ATTEMPTS):
        raw = call_llm(SYSTEM_PROMPT, user_message)
        try:
            return LeadAnalysis.model_validate_json(raw)
        except ValidationError as error:
            last_error = error
            user_message = (
                f"{message}\n\nYour previous answer was invalid: {error}. "
                "Return only valid JSON in the required shape."
            )
    raise ValueError(f"LLM output invalid after {MAX_ATTEMPTS} attempts: {last_error}")