import time
from flask import Flask
from models.database import DataBasa
from markupsafe import escape


app = Flask(__name__)


@app.route('/test')
def get_cur_time():
    return {'time': time.time()}


@app.route('/create/<int:id>+<int:views>')
def create(id,views):
    db = DataBasa()
    db.add_shit(views,id)
    return {'time': time.time()}

@app.route('/request/<int:id>')
def request(id):
    db = DataBasa()
    res = db.get_by_id(id)
    message = ""

    if(res==0):
        message = "Новый клиент <3"
    elif(res<25):
         message = "Делай оспрос сука"
    else:
         message = "Красава"

    return {'Ты: ': message}