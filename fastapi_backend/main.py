from fastapi import FastAPI, Form, File, UploadFile
from models import TestModel 
from fastapi.middleware.cors import CORSMiddleware 
import os 
from fastapi.staticfiles import StaticFiles 
from database import engine, entries, areas  
from sqlalchemy import select


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

app.mount("/uploads", StaticFiles(directory="/home/ubuntu/MEC-7/fastapi_backend/uploads"), name="uploads")


@app.get("/api/get_data")
async def get_data():
    with engine.connect() as conn: 
        related = areas.join(entries) 
        select_all = select(
            areas.c.area_name, 
            entries.c.image,
            entries.c.video, 
            entries.c.gents_count, 
            entries.c.ladies_count, 
            entries.c.gents_lead_by, 
            entries.c.ladies_lead_by,
        ).select_from(related) 
        result = conn.execute(select_all).fetchall() 
        data = [{
            "heading": entry[0],
            "photo": entry[1],
            "video": entry[2],
            "gentsCount": entry[3],
            "ladiesCount": entry[4], 
            "gentsLeadBy": entry[5], 
            "ladiesLeadBy": entry[6],    
        } for entry in result]
    return data 


@app.get("/api/get_areas")
async def get_data(): 
    with engine.connect() as conn: 
        result = conn.execute(areas.select()).fetchall() 

        data = [{"id": area[0], "area_name": area[1]} for area in result]

    return data


@app.post("/api/add_entry")
async def submit_form(
    date: str = Form(...),
    gentsLead: str = Form(...),
    ladiesLead: str = Form(...),
    gentsCount: int = Form(...),
    ladiesCount: int = Form(...), 
    area: str = Form(...),
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
            "gents_lead_by": gentsLead,
            "ladies_lead_by": ladiesLead,
            "gents_count": gentsCount,
            "ladies_count": ladiesCount,
            "video": video, 
            "image": file_path[8:],
        } 

        with engine.connect() as conn:  
            print('coming inside with')
            foreign_key_result = conn.execute(areas.select().where(areas.c.area_name == area)).fetchall() 
            foreign_key_id = foreign_key_result[0][0] 
            form_data["area_id"] = foreign_key_id

            conn.execute(entries.insert(), [form_data]) 
            conn.commit()
            

        print(form_data, type(form_data))
        return {"message": "Form submitted successfully", "data": form_data}

    except Exception as e:
        return {"data": "error"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)