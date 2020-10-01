from flask import Flask, request, render_template, url_for

app = Flask(__name__)

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
