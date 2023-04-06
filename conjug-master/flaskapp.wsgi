#!/usr/bin/python 
import sys import logging 
logging.basicConfig(stream=sys.stderr) 
sys.path.insert(0,"/var/www/FlaskApp/") 
from FlaskApp import app as application 
application.secret_key = '4e074c033785b0ec6cc2ce3a7b4efc1a2796090ac4de3f9eb123af0adafb7387'
