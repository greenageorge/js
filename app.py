# We need to import __version__, as it contains the Flask version installed
from flask import Flask, __version__

# Initialize the Flask application
app = Flask(__name__)

# Route that will return the version installed on the server
@app.route('/')
def version():
  # Print the __version__ attribute that we previously imported
  # Note: This attribute is available since Flash 0.7 (Mid 2011), olders versions
  # won't return the desired information on this step. That said, you shouldn't
  # be running a Flask installation that old, update it! :)
  return "Flask version: %s" % __version__

if __name__ == '__main__':
	app.run( 
        host="0.0.0.0",
        port=int("80")
  )