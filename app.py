from flask import Flask, request, jsonify, render_template, send_from_directory

app = Flask(__name__, template_folder='templates', static_folder='static')

# Hardcoded credentials
VALID_USERNAME = "user"
VALID_PASSWORD = "password"

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "message": "Invalid input"}), 400

    username = data.get('username')
    password = data.get('password')

    if username == VALID_USERNAME and password == VALID_PASSWORD:
        return jsonify({"success": True})
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401

@app.route('/welcome.html')
def welcome():
    # This will render a welcome.html file from the templates folder
    return render_template('welcome.html')

# Route to serve static files (CSS, JS) - useful if not using template_folder/static_folder config correctly
# or for specific needs, though Flask serves from `static_folder` by default if `url_for` is used.
# For this setup, `url_for` in templates is preferred.
# However, ensuring login.js can find welcome.html without full templating for welcome.html yet:
# This route is more for direct access if needed, but welcome page is better served via template.

if __name__ == '__main__':
    # Note: For development, debug=True is fine. For production, use a proper WSGI server.
    app.run(debug=True, port=5000)
