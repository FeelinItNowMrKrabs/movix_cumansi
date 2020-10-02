import time
from flask import Flask
from models.movies import Movies
from markupsafe import escape
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/test')
def get_cur_time():
    return {'time': time.time()}


@app.route('/create/<int:id>+<int:views>')
def create(id,views):
    db = DataBasa()
    db.add_shit(id,views)
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

@app.route('/add_like/<int:movie_id>')
def create_add_like(movie_id):
    return {'time': time.time()}

@app.route('/get_movie/<int:id>')
def get_movie(id):
    db = Movies()
    movi = db.get_by_id(id)

    return {'time': movi}