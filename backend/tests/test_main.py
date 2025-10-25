import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_root_endpoint():
    """Test l'endpoint racine /"""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "version": "0.1.0"}

def test_status_endpoint():
    """Test l'endpoint /status"""
    response = client.get("/status")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "version": "0.1.0"}

def test_hello_endpoint():
    """Test l'endpoint /api/hello"""
    response = client.get("/api/hello")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello from OBD Suite 2!"}

def test_dtc_endpoint():
    """Test l'endpoint /api/dtc/{code}"""
    # Test avec un code connu
    response = client.get("/api/dtc/P0300")
    assert response.status_code == 200
    assert "Ratés d'allumage" in response.json()["explanation"]

    # Test avec un code inconnu
    response = client.get("/api/dtc/UNKNOWN")
    assert response.status_code == 200
    assert "Explication non disponible" in response.json()["explanation"]
