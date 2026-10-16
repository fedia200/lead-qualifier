from fastapi import FastAPI, HTTPException

from .analyzer import analyze_lead
from .schemas import LeadAnalysis, LeadRequest

app = FastAPI(title="Lead Qualifier")


@app.post("/qualify", response_model=LeadAnalysis)
def qualify(request: LeadRequest) -> LeadAnalysis:
    try:
        return analyze_lead(request.message)
    except ValueError as error:
        raise HTTPException(status_code=502, detail=str(error))