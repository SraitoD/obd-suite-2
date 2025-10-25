from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="OBD Suite 2 API")

# CORS pour le développement
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class HealthCheck(BaseModel):
    status: str = "ok"
    version: str = "0.1.0"

@app.get("/", response_model=HealthCheck)
async def root():
    """Endpoint de santé"""
    return {"status": "ok", "version": "0.1.0"}

@app.get("/api/hello")
async def hello():
    """Endpoint de test"""
    return {"message": "Hello from OBD Suite 2!"}

# Exemple d'endpoint pour les codes DTC
@app.get("/api/dtc/{code}")
async def get_dtc_explanation(code: str):
    """Explication d'un code DTC (simulé)"""
    # En production, cela appellerait l'API Mistral
    explanations = {
        "P0300": "Ratés d'allumage détectés dans plusieurs cylindres. Vérifiez les bougies et les bobines.",
        "P0171": "Mélange trop pauvre (banque 1). Peut être dû à une fuite de vide ou un capteur défectueux.",
    }
    return {
        "code": code,
        "explanation": explanations.get(code, f"Explication non disponible pour {code} (appel à l'IA en cours...)"),
        "severity": "medium",
        "possible_causes": ["Sensor failure", "Wiring issue", "Mechanical problem"]
    }
