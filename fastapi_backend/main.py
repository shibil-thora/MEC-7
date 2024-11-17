from fastapi import FastAPI, Form, File, UploadFile
from models import TestModel 
from fastapi.middleware.cors import CORSMiddleware 
import os 
from fastapi.staticfiles import StaticFiles 
from database import engine, entries, areas 


app = FastAPI() 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads" 
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


@app.get("/api/get_data")
async def get_data():
    return {
        "data": f"{'helo guys'}",
    }   


@app.get("/api/get_areas")
async def get_data(): 
    with engine.connect() as conn: 
        result = conn.execute(areas.select()).fetchall() 

        data = [{"id": area[0], "area_name": area[1]} for area in result]

    return data


@app.post("/add_entry")
async def submit_form(
    date: str = Form(...),
    gentsLead: str = Form(...),
    ladiesLead: str = Form(...),
    gentsCount: int = Form(...),
    ladiesCount: int = Form(...),
    video: str = Form(...),
    image: UploadFile = File(...),
):
    try:
        
        file_path = os.path.join(UPLOAD_FOLDER, image.filename)
        with open(file_path, "wb") as f:
            content = await image.read()  
            f.write(content)  

        
        form_data = {
            "date": date,
            "gentsLead": gentsLead,
            "ladiesLead": ladiesLead,
            "gentsCount": gentsCount,
            "ladiesCount": ladiesCount,
            "video": video,
            "image_path": file_path,
        } 

        with engine.connect() as conn: 
            pass

        print(form_data, type(form_data))
        return {"message": "Form submitted successfully", "data": form_data}

    except Exception as e:
        return {"data": "error"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)