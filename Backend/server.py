from flask import Flask, request, jsonify
from .sorting_algorithms import get_sorting_steps
from .recommendation_logic import recommend_sorting
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

    try:
        steps = get_sorting_steps(method, array)

        # ✅ Confirm structure
        print("✅ Final steps being returned:")
        for i, step in enumerate(steps):
            print(f"{i+1}. {step}")

        return jsonify({ "steps": steps })  # ✅ THIS LINE IS CRITICAL
    except Exception as e:
        return jsonify({ "error": str(e) }), 400


@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    recommendation = recommend_sorting(
        data.get('data_type'),
        data.get('data_size'),
        data.get('real_time')
    )
    return jsonify({"recommended": recommendation})


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
