from pydantic import BaseModel 


class TestModel(BaseModel): 
    name: str 
    age: int 


class UserSignUpMode(BaseModel):
    username: str 
    mobile_number: str 
    password: str 
    area_id: int  
    branch_id: int 
    zone_id: int


class LoginModel(BaseModel): 
    mobile_number: str 
    password: str  


class VerifyToken(BaseModel): 
    token: str


class GetTodayDataModel(BaseModel): 
    date: str