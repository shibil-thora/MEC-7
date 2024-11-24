import bcrypt 
import jwt 
import os 
from dotenv import load_dotenv 

load_dotenv()

SECRET_KEY = os.environ.get("SECRET_KEY")


def hash_password(password): 
    salt = bcrypt.gensalt() 
    return str(bcrypt.hashpw(password.encode('utf-8'), salt))[2:-1] 


def verify_pass(password, hashed_password): 
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8')) 


def create_token(mobile_number):
    payload = {
        "mobile_number": mobile_number, 
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token 


def decode_token(token):
    try:
        decoded_payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        mobile_number = decoded_payload.get("mobile_number")
        return mobile_number
    except jwt.InvalidTokenError:
        print("Invalid token")
        return None