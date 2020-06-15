import requests
from bs4 import BeautifulSoup

FOOD_DICT = {
  'VEGAN_TEMPEH_CHILI': 'http://menu.dining.ucla.edu/Recipes/027109/5',
  'SUNDRIED_TOMATO _&_ROASTED_GARLIC_PIZZA': 'http://menu.dining.ucla.edu/Recipes/141906/1',
  'GRILLED_FLANK_STEAK': 'http://menu.dining.ucla.edu/Recipes/400051/3'
}

def scrape(url):
  dataToReturn = []

  src = requests.get(url).content
  soup = BeautifulSoup(src, "lxml")

  recipeContainer = soup.find('div', {'class': 'recipecontainer'})

  foodName = recipeContainer.h2.text.strip()
  description = recipeContainer.div.div.text.strip()

  prodWebCodeContainer = recipeContainer.div.findAll('div', {'class': 'prodwebcode'})
  prodWebCodes = [item.text.strip() for item in prodWebCodeContainer]

  nfBoxContainer = recipeContainer.find('div', {'class' : 'nfbox'})

  servingSize = nfBoxContainer.find('p', {'class' : 'nfserv'}).text[13:].strip()

  caloriesContainer = nfBoxContainer.find('p', {'class' : 'nfcal'}).text.split(' ')

  calories, fatCalories = getCalories(caloriesContainer)

  nfNutrientContainer = nfBoxContainer.findAll('p', {'class' : 'nfnutrient'})
  nfIndentContainer = nfBoxContainer.findAll('div', {'class' : 'nfindent'})

  totalFat = {
    'val': nfNutrientContainer[0].text.split(' ')[2].strip(),
    'dailyVal': nfNutrientContainer[0].text.split(' ')[3].strip()
  }
  saturatedFat = {
    'val': nfIndentContainer[0].p.text.split(' ')[2].strip(),
    'dailyVal': nfIndentContainer[0].p.span.text.strip()
  }
  transFat = nfIndentContainer[0].findAll('p')[1].text.split(' ')[2].strip()
  cholesterol = {
    'val': nfNutrientContainer[3].text.split(' ')[1].strip(),
    'dailyVal': nfNutrientContainer[3].text.split(' ')[2].strip()
  }
  sodium = {
    'val': nfNutrientContainer[4].text.split(' ')[1].strip(),
    'dailyVal': nfNutrientContainer[4].text.split(' ')[2].strip()
  }
  totalCarbohydrate = {
    'val': nfNutrientContainer[5].text.split(' ')[2].strip(),
    'dailyVal': nfNutrientContainer[5].findAll('span')[1].text.strip()
  }
  dietaryFiber = {
    'val': nfIndentContainer[1].text.split(' ')[2].strip(),
    'dailyVal': nfIndentContainer[1].p.text.split(' ')[3].strip()
  }
  sugars = nfIndentContainer[1].text.split(' ')[4].strip()
  protein = nfNutrientContainer[8].text.split(' ')[1].strip()

  nfVitContainer = nfBoxContainer.findAll('div', {'class': 'nfvit'})

  vitaminA = nfVitContainer[0].find('span', {'class': 'nfvitleft'}).find('span', {'class': 'nfvitpct'}).text.strip()
  vitaminC = nfVitContainer[0].find('span', {'class': 'nfvitright'}).find('span', {'class': 'nfvitpct'}).text.strip()
  calcium = nfVitContainer[1].find('span', {'class': 'nfvitleft'}).find('span', {'class': 'nfvitpct'}).text.strip()
  iron = nfVitContainer[1].find('span', {'class': 'nfvitright'}).find('span', {'class': 'nfvitpct'}).text.strip()

  ingredientsAllergensItems = recipeContainer.find('div', {'class': 'ingred_allergen'}).findAll('p')

  ingredients = ingredientsAllergensItems[0].text.strip('INGREDIENTS:').strip()
  allergens = ingredientsAllergensItems[1].text.strip('ALLERGENS*:').strip()

  dataToReturn.append({
    'foodName': foodName,
    'description': description,
    'prodWebCodes': prodWebCodes,
    'servingSize': servingSize,
    'calories': calories,
    'fatCalories': fatCalories,
    'totalFat': totalFat,
    'saturatedFat': saturatedFat,
    'transFat': transFat,
    'cholesterol': cholesterol,
    'sodium': sodium,
    'totalCarbohydrate': totalCarbohydrate,
    'dietaryFiber': dietaryFiber,
    'sugars': sugars,
    'protein': protein,
    'vitaminA': vitaminA,
    'vitaminC': vitaminC,
    'calcium': calcium,
    'iron': iron,
    'ingredients': ingredients,
    'allergens': allergens
  })

  return dataToReturn

def getCalories(caloriesContainer):
  i = 0

  for item in caloriesContainer:
    try:
      int(item)
      if i == 0:
        calories = item
        i+=1
      else:
        fatCalories = item
    except ValueError:
      pass

  return calories, fatCalories

def scrapeAll():
  data = [scrape(item) for item in FOOD_DICT.values()]

  return data

def scrapeById(id):
  return scrape(FOOD_DICT[id])

#scrapeAll()

