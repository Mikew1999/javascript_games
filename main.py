from flask import Flask, render_template

app = Flask(__name__, static_url_path='/root', static_folder='static')
app.debug = True


@app.route("/")
def index():
    return render_template('index.html')

@app.route("/snake")
def snake():
    return render_template('snake.html')

@app.route("/pong")
def pong():
    return render_template('pong.html')

@app.route("/space_invaders")
def space_invaders():
    return render_template('space_invaders.html')

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)