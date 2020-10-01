from flask import Flask, request, render_template, url_for


from clickhouse_pool import ChPool



app = Flask(__name__)

pool = ChPool()

with pool.get_client() as client:
    # execute sql and print the result
    result = client.execute("SELECT * FROM system.numbers LIMIT 5")
    print(result)

# always close all connections in the pool once you're done with it
pool.cleanup()

@app.route('/', methods= ['GET','POST'])
def login():
    return render_template("first.html")

@app.route('/dima')
def dima():
    return render_template("dima.html")

@app.route('/Tang')
def tang():
    return "this is the tang my guy"

@app.route('/Tong')
def tong():
    return "what the fuck are you honestly hoping is going to happen by clicking this you retard?"

@app.route('/gj')
def gj():
    return render_template("gj.html")

if (__name__ == "__main__"):
    app.run(debug = True)
