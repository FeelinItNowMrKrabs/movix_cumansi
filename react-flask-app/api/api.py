import time
from flask import Flask


app = Flask(__name__)

@app.route('/test')
def get_cur_time():
    return {'time': time.time()}
