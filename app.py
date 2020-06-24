from flask import Flask
from flask import request, jsonify
from webscraper import scrape, scrapeAll, scrapeById, scrapeForFoods
import os

app = Flask(__name__)

FOOD_DICT = {}

@app.route('/', methods=['GET'])
def home():
  FOOD_DICT = scrapeForFoods()
  return "<h1>Brutrition Web Scraped Nutrition Data</h1>"

@app.route('/foods/all', methods=['GET'])
def all():
  return jsonify(Data=scrapeAll(FOOD_DICT))

@app.route('/foods', methods=['GET'])
def id():
  if 'id' in request.args:
    id=request.args['id']
    if(FOOD_DICT.get(id) != None):
      return jsonify(Data=scrapeById(FOOD_DICT, id))
    else:
      return "<h1>Food Item not found</h1>"
  else:
    return "<h1>Error: No id field provided. Please specify an id.</h1>"

@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404

port = int(os.environ.get("PORT", 5000))

if __name__ == "__main__":
  app.run(threaded=True, port=port)
