from dotenv import load_dotenv 
import sys 
from fastapi_backend.database import meta, engine


if __name__ == '__main__': 
    load_dotenv()
    # try:
    if sys.argv[1] == 'create': 
        meta.create_all(engine)   
        print('[x] Tables have been created successfully [x]')
    # except: 
    #     pass 