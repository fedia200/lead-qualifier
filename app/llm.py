def call_llm(system_prompt: str, user_message: str) -> str:
    """Placeholder: returns fixed JSON until we plug in a real provider."""
    return """{
      "details": {"name": "Sara", "email": null, "phone": null,
                  "company": "Acme", "budget": "$5k", "timeline": "next month"},
      "intent": "purchase",
      "priority_score": 85,
      "summary": "Acme wants 3 chatbots with a $5k budget, starting next month.",
      "suggested_reply": "Hi Sara, thanks for reaching out! We'd love to discuss your project."
    }"""