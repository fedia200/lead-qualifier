from .schemas import ExtractedDetails, Intent, LeadAnalysis

def analyze_lead(message: str) -> LeadAnalysis:
  """Fake analyzer for now. the body becomes an LLM call later."""
  return LeadAnalysis(
    details=ExtractedDetails(),
    intent=Intent.OTHER,
    priority_score=50,
    summary=message[:100],
    suggested_reply="Thanks for reaching out! We'll get back to you soon.",
    
    
    
  )