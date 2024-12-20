from fastapi import FastAPI, Form, File, UploadFile, HTTPException
from models import GetTodayDataModel, LoginModel, UserSignUpMode, VerifyToken, ToggleUser 
from fastapi.middleware.cors import CORSMiddleware 
import os 
from fastapi.staticfiles import StaticFiles 
from database import engine, entries, areas  
from sqlalchemy import select 
from dotenv import load_dotenv  
from utils import hash_password, verify_pass, create_token, decode_token
from database import users  
from database import zone, main_areas



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
async def get_all_data():
    with engine.connect() as conn:
        # Fetch data for areas
        areas_result = conn.execute(areas.select()).fetchall()
        areas_data = [{"id": area[0], "area_name": area[1]} for area in areas_result]

        # Fetch data for main_areas
        main_areas_result = conn.execute(main_areas.select()).fetchall()
        main_areas_data = [{"id": main_area[0], "main_area_name": main_area[1]} for main_area in main_areas_result]

        # Fetch data for zones
        zones_result = conn.execute(zone.select()).fetchall()
        zones_data = [{"id": zone[0], "zone_name": zone[1]} for zone in zones_result]

    # Combine all data into a single dictionary
    data = {
        "areas": areas_data,
        "main_areas": main_areas_data,
        "zones": zones_data
    }

    return data 



@app.get("/api/get_users")
async def get_all_users():
    with engine.connect() as conn:
        rows = conn.execute(users.select()) 
        user_list = [{
            'id': row.id,
            'username': row.username, 
            'is_superuser': row.is_superuser, 
            'is_area_admin': row.is_area_admin, 
            'area_id': row.area_id, 
            'mobile_number': row.mobile_number,
        } for row in rows]

    return user_list


@app.post("/api/make_him_admin")
async def make_him_admin(data: ToggleUser):  
    with engine.connect() as conn: 
        print(data.user_id, type(data.user_id), data.is_area_admin, type(data.is_area_admin))
        update_user = users.update().where(users.c.id == data.user_id).values(is_area_admin = not data.is_area_admin)
        conn.execute(update_user) 
        conn.commit()
    return {'hi': 'helo'}


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
    branch_id = data.branch_id 
    zone_id = data.zone_id

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