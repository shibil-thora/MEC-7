from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from models import TestModel 
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI() 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/get_data")
async def get_data():
    return {
        "data": f"{'helo guys'}",
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)