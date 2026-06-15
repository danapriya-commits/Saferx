from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(
    title="SafeRx API",
    description="Backend API for SafeRx Medical Supplies",
    version="0.1.0",
)

# Configure CORS to allow the Next.js frontend to communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Welcome to the SafeRx API!"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    # To run this script locally:
    # uvicorn main:app --reload --port 8000
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
