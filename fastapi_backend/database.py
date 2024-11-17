from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, ForeignKey, Boolean  
from sqlalchemy import UniqueConstraint
import os 
from dotenv import load_dotenv 


load_dotenv()

engine = create_engine(os.environ.get('SQL_CONNECT_URL')) 
meta = MetaData()

areas = Table(
    'areas', meta, 
    Column('id', Integer, primary_key=True, autoincrement=True),
    Column('area_name', String(255)),
)  

entries = Table(
    'entries', meta, 
    Column('id', Integer, primary_key=True, autoincrement=True),
    Column('date', String(255), index=True), 
    Column('area_id', Integer, ForeignKey('areas.id'), index=True), 
    Column('image', String(255)), 
    Column('video', String(255)), 
    Column('gents_lead_by', String(255)), 
    Column('ladies_lead_by', String(255)), 
    Column('gents_count', String(255)), 
    Column('ladies_count', String(255)), 
)  

users = Table(
    'users', meta, 
    Column('id', Integer, primary_key=True, autoincrement=True),
    Column('username', String(255)), 
    Column('mobile_number', String(255), index=True), 
    Column('password', String(255), index=True),
    Column('is_superuser', Boolean),
    Column('is_area_admin', Boolean), 
    Column('area_id', Integer, ForeignKey('areas.id'), index=True), 
)
