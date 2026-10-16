from enum import Enum

from pydantic import BaseModel, Field

class Intent(str, Enum):
  PRICING = "pricing"
  SUPPORT = "support"
  PARTNERSHIP = "partnership"
  PURCHASE = "purchase"
  SPAM = "spam"
  OTHER = "other"
  
class LeadRequest(BaseModel):
  message: str = Field(min_length=5, max_length=5000)
  
  
class ExtractedDetails(BaseModel):
  name: str | None = None
  email: str | None = None
  company: str | None = None
  budget: str | None = None
  timeline: str | None = None
  
class LeadAnalysis(BaseModel):
  details: ExtractedDetails
  intent: Intent
  priority_score: int = Field(ge=0, le=100)
  summary: str
  suggested_reply: str
  