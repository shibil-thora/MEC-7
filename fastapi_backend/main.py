from fastapi import FastAPI, Form, File, UploadFile, HTTPException
from models import GetTodayDataModel, LoginModel, UserSignUpMode, VerifyToken 
from fastapi.middleware.cors import CORSMiddleware 
import os 
from fastapi.staticfiles import StaticFiles 
from database import engine, entries, areas  
from sqlalchemy import select 
from dotenv import load_dotenv  
from utils import hash_password, verify_pass, create_token, decode_token
from database import users 



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

app.mount("/uploads", StaticFiles(directory=os.environ.get('UPLOADS_DIR')), name="uploads")


@app.post("/api/get_data")
async def get_data(data: GetTodayDataModel): 
    print(data)
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
            entries.c.date
        ).select_from(related).where(entries.c.date == data.date) 
        result = conn.execute(select_all).fetchall() 
        data = [{
            "heading": entry[0],
            "photo": entry[1],
            "video": entry[2],
            "gentsCount": entry[3],
            "ladiesCount": entry[4], 
            "gentsLeadBy": entry[5], 
            "ladiesLeadBy": entry[6],  
            "date": entry[7],  
        } for entry in result]
    return data 


@app.get("/api/get_areas")
async def get_data(): 
    with engine.connect() as conn: 
        result = conn.execute(areas.select()).fetchall() 

        data = [{"id": area[0], "area_name": area[1]} for area in result]

    return data 



@app.post("/api/verify_token")
async def verify_token(data: VerifyToken):  
    mobile_number = decode_token(data.token)  
    if mobile_number:
        with engine.connect() as conn: 
            related = users.join(areas)
            result = conn.execute(select(
                    users.c.username,
                    users.c.mobile_number,
                    users.c.password, 
                    users.c.is_superuser, 
                    users.c.is_area_admin, 
                    areas.c.id
                ).select_from(related).where(users.c.mobile_number == mobile_number)).fetchall()
            return {
                'mobile_number': mobile_number, 
                'area_id': result[0][5], 
                'access_token': create_token(mobile_number),
                'is_superuser': result[0][3], 
                'is_area_admin': result[0][4],
            }   
    else: 
        raise HTTPException(status_code=400, detail="invalid token!")
     


@app.post("/api/signup")
async def signup_user(data: UserSignUpMode): 
    username = data.username
    mobile_number = data.mobile_number
    password = data.password
    area_id = data.area_id

    hashed_pass = hash_password(password) 

    with engine.connect() as conn: 
        query = users.insert().values(
            username=username, 
            mobile_number=mobile_number, 
            password=hashed_pass, 
            is_superuser=False, 
            is_area_admin=False, 
            area_id=area_id
        ) 
        conn.execute(query) 
        conn.commit()
    return {'status': 'ok!'} 


@app.post("/api/login")
async def login_user(data: LoginModel): 
    mobile_number = data.mobile_number
    password = data.password  
    with engine.connect() as conn: 
        result = conn.execute(select(
                users.c.username,
                users.c.mobile_number,
                users.c.password, 
                users.c.is_superuser, 
                users.c.is_area_admin,
            ).where(users.c.mobile_number == mobile_number)).fetchall()
        if not result: 
            raise HTTPException(status_code=400, detail="Wrong username!")
        else: 
            if verify_pass(password, result[0][2]): 
                return {
                    'mobile_number': mobile_number, 
                    'area_id': 'area_id', 
                    'access_token': create_token(mobile_number),
                    'is_superuser': result[0][3], 
                    'is_area_admin': result[0][4],
                }   
            else: 
                raise HTTPException(status_code=400, detail="Wrong password!")



@app.post("/api/add_entry")
async def submit_form(
    date: str = Form(...),
    gentsLead: str = Form(None),
    ladiesLead: str = Form(None),
    gentsCount: int = Form(None),
    ladiesCount: int = Form(None), 
    area_id: str = Form(...),
    video: str = Form(None),
    image: UploadFile = File(None),
):
    # try:
        form_data = {
            "date": date,
            "gents_lead_by": gentsLead,
            "ladies_lead_by": ladiesLead,
            "gents_count": gentsCount,
            "ladies_count": ladiesCount,
            "video": video, 
            "image": None,
        }
        
        # Handle image upload
        if image:
            file_path = os.path.join(UPLOAD_FOLDER, image.filename)
            with open(file_path, "wb") as f:
                content = await image.read()  
                f.write(content)  
            form_data["image"] = file_path[8:]

        with engine.connect() as conn:  
            foreign_key_id = area_id
            form_data["area_id"] = foreign_key_id

            conn.execute(entries.insert(), [form_data]) 
            conn.commit()
            
        return {"message": "Form submitted successfully", "data": form_data}

    # except Exception as e:
    #     return {"message": "Failed to submit the form.", "error": str(e)}


if __name__ == "__main__": 
    import uvicorn 
    load_dotenv()
    uvicorn.run(app, host="0.0.0.0", port=8000)