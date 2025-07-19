from flask import Flask, request, jsonify
from sorting_algorithms import get_sorting_steps
from recommendation_logic import recommend_sorting
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/ping", methods=["GET"])
def ping():
    return "pong", 200

@app.route("/", methods=["GET"])
def home():
    return "<h1>Welcome to the Sorting Visualizer API</h1><p>Use /sort and /recommend endpoints with POST requests.</p>"

@app.route("/sort", methods=["POST"])
def sort_array():
    data = request.get_json()
    array = data.get("array", [])
    method = data.get("method", "bubble")
    steps = get_sorting_steps(method, array)
    return jsonify({"steps": [{"step": s, "code": ""} for s in steps]})

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    array = data.get("array")
    method = recommend_sorting(array)
    return jsonify({"recommended": method})

if __name__ == "__main__":
        app.run(host="127.0.0.1", port=5000, debug=True)

