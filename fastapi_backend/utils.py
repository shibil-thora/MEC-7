import bcrypt

def hash_password(password): 
    salt = bcrypt.gensalt() 
    return str(bcrypt.hashpw(password.encode('utf-8'), salt))[2:-1] 

def verify_pass(password, hashed_password): 
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))