from flask import Flask, request
from database import database_setup
from endpoints import get_influencer_graph, get_influencer_map, get_chat_bot_info
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# database_setup()


@app.route("/getInfluencerGraph")
def _get_influencer_graph():
    graph_type = request.args.get("graphType")
    limit = request.args.get("limit")
    test_event = {
        "graph_type": graph_type,
        "limit": limit,
    }
    return get_influencer_graph.lambda_handler(test_event)


@app.route("/getInfluencerMap")
def _get_influencer_map():
    graph_type = request.args.get("graphType")
    limit = request.args.get("limit")
    test_event = {
        "graph_type": graph_type,
        "limit": limit,
    }
    return get_influencer_map.lambda_handler(test_event)


@app.route("/getChatBotInfo")
def _get_chat_bot_info():
    category = request.args.get("category")
    region = request.args.get("region")
    test_event = {
        "category": category,
        "region": region,
    }
    return get_chat_bot_info.lambda_handler(test_event)


if __name__ == "__main__":
    live_host = "0.0.0.0"
    app.run(host=live_host, port=5000, debug=True, threaded=True)
