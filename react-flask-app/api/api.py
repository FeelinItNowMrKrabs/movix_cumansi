import time
from flask import Flask
from models.movies import Movies
from markupsafe import escape
from flask_cors import CORS
from clickhouse_driver.client import Client

app = Flask(__name__)
CORS(app)

@app.route('/test')
def get_cur_time():
    client = Client('127.0.0.1')
    data = client.execute('select 1')
    return {'databasa': data}


@app.route('/top25')
def top25():
    client = Client('127.0.0.1')
    data = client.execute('SELECT assetid, count() AS cnt_watch FROM events WHERE eventtype = 31 GROUP BY assetid ORDER BY cnt_watch DESC LIMIT 25')
    return {'top25': data}

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

@app.route('/get_boeviks')
def get_boevik():
    db = Movies()

    boeviks = db.get_first_five()

    return {'boeviks': boeviks}