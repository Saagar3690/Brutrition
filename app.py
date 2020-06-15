from flask import Flask
from flask import request, jsonify
from webscraper import scrape, scrapeAll, scrapeById

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
  return '''<h1>Brutrition Web Scraped Nutrition Data</h1>'''

@app.route('/foods/all', methods=['GET'])
def all():
  return jsonify(Data=scrapeAll())

@app.route('/foods', methods=['GET'])
def id():
  if 'id' in request.args:
    id=request.args['id']
  else:
    return "Error: No id field provided. Please specify an id."

  return jsonify(Data=scrapeById(id))

@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404
