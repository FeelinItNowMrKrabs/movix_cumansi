import time
from flask import Flask, jsonify, request
from models.movies import Movies
from markupsafe import escape
from flask_cors import CORS
from clickhouse_driver.client import Client
import json
from models.database import DataBasa

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
    data = client.execute('SELECT assetid, arrayElement(groupArray(title), 1) as title, count() AS cnt_watch FROM events WHERE eventtype = 31 GROUP BY assetid ORDER BY cnt_watch DESC LIMIT 25')
    return {'top25': data}

@app.route('/boevik')
def boevik():
    client = Client('127.0.0.1')
    settt = {}
    genres = ['Боевики', 'Вестерны', "Детективы", "Для детей", 'Комедии', "Мелодрамы", "Мультфильмы", "Приключения", "Спорт", "Триллеры", "Ужасы", "Фантастика"]
    for i in genres:
        data = client.execute(f"""SELECT assetid, arrayElement(groupArray(title), 1), count() as cnt FROM events WHERE has(splitByChar(',', genretitles), '{i}') = 1 and (eventtype = 31 or eventtype = 15) GROUP BY assetid ORDER BY cnt DESC LIMIT 5""")
        settt[i] = data
    return {'fuckinAll': settt}


@app.route('/similar/<int:id>')
def similar(id):
    client = Client('127.0.0.1')
    settt = []
    
    data = client.execute(f"""SELECT similar_assetids FROM similarfilms WHERE assetid = {id}""")[0][0]
    
    splitted = data.split(',')

    for i in splitted:
        hold_bitch = client.execute(f"""select assetid, arrayElement(groupArray(title), 1) from events where assetid = {i} group by assetid""")
        try:
            tit_id = hold_bitch[0]
        except IndexError:
            continue
        settt.append(tit_id)
        if len(settt) == 5:
            break

    return  {'Fuckinall': settt}


@app.route('/create/<int:id>+<int:views>')
def create(id,views):
    db = DataBasa()
    db.add_shit(id,views)
    return {'time': time.time()}

@app.route('/request/<int:id>')
def request(id):
    db = DataBasa()
    res = db.get_by_id(id)
    if(isinstance(res,type(None))):
        db.add_shit(id,0)
        res =0
    message = ""
    if(res==0):
        message = 0
    elif(res<25):
         message = 1
    else:
         message = 2

    return {'res': message}

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



@app.route('/send_likes/<string:likes>')
def add_message(likes):
    list_like = likes
    client = Client('127.0.0.1')
    settt = []
    hold_me = client.execute(f"""SELECT topK(25)(arrayJoin(sim)) from (select d, arrayFlatten(groupArray(sim)) as sim from (select splitByChar(',', similar_assetids) as sim, today() as d from similarfilms where assetid in ({list_like})) group by d)""")
    
    for i in hold_me[0][0]:
        hold_bitch = client.execute(f"""select assetid, arrayElement(groupArray(title), 1) from events where assetid = {i} group by assetid""")
        try:
            tit_id = hold_bitch[0]
        except IndexError:
            continue
        settt.append(tit_id)
        if len(settt) == 25:
            break
    
    return {'custoized' : settt}

