import jwt 
from dotenv import load_dotenv 
import os

load_dotenv()

# Secret key for encoding and decoding JWT
SECRET_KEY = os.environ.get("SECRET_KEY")

# Function to create a JWT token without expiration
def create_token(mobile_number):
    payload = {
        "mobile_number": mobile_number
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token

# Function to decode a JWT token and extract the username
def decode_token(token):
    try:
        decoded_payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        username = decoded_payload.get("mobile_number")
        return username
    except jwt.InvalidTokenError:
        print("Invalid token")
        return None

# Example usage
if __name__ == '__main__':
    username = "6238748856"
    token = create_token(username)
    print("Generated Token:", token)
    
    # Decode the token to extract the username
    extracted_username = decode_token(token)
    print("Extracted Username:", extracted_username)
