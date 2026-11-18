from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .analyzer import analyze_lead
from .schemas import LeadAnalysis, LeadRequest

app = FastAPI(title="Lead Qualifier")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/qualify", response_model=LeadAnalysis)
def qualify(request: LeadRequest) -> LeadAnalysis:
    try:
        return analyze_lead(request.message)
    except ValueError as error:
        raise HTTPException(status_code=502, detail=str(error))
