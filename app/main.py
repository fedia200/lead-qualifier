from fastapi import FastAPI

from .analyzer import analyze_lead
from .schemas import LeadAnalysis, LeadRequest

app = FastAPI(title="lead Qualifier")

@app.post("/qualify", response_model=LeadAnalysis)
def quality(request: LeadRequest) -> LeadAnalysis:
  return analyze_lead(request.message)