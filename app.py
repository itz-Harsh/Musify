from flask import Flask, jsonify
from flask_cors import CORS
from fetch import get_access_token, fetch_data, fetch_album_details

app = Flask(__name__)
CORS(app)  # Allow all origins by default

@app.route('/api/new-releases', methods=['GET'])
def new_releases():
    try:
        token = get_access_token()
        data = fetch_data(token, "browse/new-releases")
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/albums/<id>', methods=['GET'])
def album_details(id):
    try:
        token = get_access_token()
        # Use the album_id from the URL parameter
        data = fetch_album_details(token, id)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
