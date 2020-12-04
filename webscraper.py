import requests
from bs4 import BeautifulSoup
from datetime import datetime
import unidecode
import unicodedata

def scrape(url):
  dataToReturn = []
  description, allergens = 'No Description', ''

  src = requests.get(url).content
  soup = BeautifulSoup(src, "lxml")

  recipeContainer = soup.find('div', {'class': 'recipecontainer'})

  try:
    foodName = recipeContainer.h2.text.strip()
    description = recipeContainer.div.div.text.strip()
  except:
    pass

  try:
    prodWebCodeContainer = recipeContainer.div.findAll('div', {'class': 'prodwebcode'})
    prodWebCodes = [item.text.strip() for item in prodWebCodeContainer]
  except:
    pass

  try:
    nfBoxContainer = recipeContainer.find('div', {'class' : 'nfbox'})
    servingSize = nfBoxContainer.find('p', {'class' : 'nfserv'}).text[13:].strip()
    caloriesContainer = nfBoxContainer.find('p', {'class' : 'nfcal'}).text.split(' ')
  except:
    pass

  calories, fatCalories = getCalories(caloriesContainer)

  try:
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
  except:
    pass

  try:
    nfVitContainer = nfBoxContainer.findAll('div', {'class': 'nfvit'})
    vitaminA = nfVitContainer[0].find('span', {'class': 'nfvitleft'}).find('span', {'class': 'nfvitpct'}).text.strip()
    vitaminC = nfVitContainer[0].find('span', {'class': 'nfvitright'}).find('span', {'class': 'nfvitpct'}).text.strip()
    calcium = nfVitContainer[1].find('span', {'class': 'nfvitleft'}).find('span', {'class': 'nfvitpct'}).text.strip()
    iron = nfVitContainer[1].find('span', {'class': 'nfvitright'}).find('span', {'class': 'nfvitpct'}).text.strip()
  except:
    pass

  try:
    ingredientsAllergensItems = recipeContainer.find('div', {'class': 'ingred_allergen'}).findAll('p')
    ingredients = ingredientsAllergensItems[0].text.strip('INGREDIENTS:').strip()
    allergens = ingredientsAllergensItems[1].text.strip('ALLERGENS*:').strip()
  except:
    pass



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

def scrapeForFoods():
  baseUrl = 'http://menu.dining.ucla.edu/Menus/' + str(datetime.date(datetime.now()))
  urls = [baseUrl + '/Breakfast', baseUrl + '/Lunch', baseUrl + '/Dinner']

  DINING_HALLS = {}
  FOOD_DICT = {}

  for url in urls:
    src = requests.get(url).content
    soup = BeautifulSoup(src, "lxml")

    diningHalls = soup.findAll('div', {'class': 'menu-block'})
    for diningHall in diningHalls:
      diningHallName = diningHall.h3.text.strip()
      nutritiveAnalysisLink = diningHall.div.findAll('a')[1]['href']
      nutritionSrc = requests.get('http://menu.dining.ucla.edu' + str(nutritiveAnalysisLink)).content
      soup2 = BeautifulSoup(nutritionSrc, "lxml")

      menuSections = soup2.findAll('div', {'class': 'menu-section'})

      MENU_SECTIONS = {}

      for menuSection in menuSections:
        menuSectionName = menuSection.h3.text.strip(',.* ')
        menuItems = menuSection.findAll('tr', {'class': 'item-row'})

        MENU_SECTIONS_ITEMS = {}

        for item in menuItems:
          itemAttributes = item.findAll('td')
          itemName = itemAttributes[0].span.a.span.text.strip()
          itemLink = itemAttributes[0].span.a['href']
          portion = itemAttributes[1].span.text.strip()
          itemInfo = {
            'portion': portion,
            'link': itemLink
          }
          MENU_SECTIONS_ITEMS[cleanUpFoodName(itemName)] = itemInfo
          FOOD_DICT[cleanUpFoodName(itemName)] = itemLink

        MENU_SECTIONS[menuSectionName] = MENU_SECTIONS_ITEMS

      if diningHallName not in DINING_HALLS:
        DINING_HALLS[diningHallName] = MENU_SECTIONS
      elif type(DINING_HALLS[diningHallName]) == list:
        DINING_HALLS[diningHallName].append(MENU_SECTIONS)
      else:
        DINING_HALLS[diningHallName] = [DINING_HALLS[diningHallName], MENU_SECTIONS]

  return DINING_HALLS, FOOD_DICT

def cleanUpFoodName(foodName):
  foodName.lower()

  foodName = foodName.replace('&', 'and')
  foodName = foodName.replace('w/', 'with')
  foodName = foodName.replace(' ', '_')
  foodName = foodName.replace('\'', '')
  foodName = foodName.replace('-', '_')

  foodName = foodName.replace('\u00ae', '')
  foodName = foodName.replace('\u00cd', '')
  foodName = foodName.replace('\u00c7', '')

  return foodName.upper()



def getCalories(caloriesContainer):
  i = 0
  calories = 0
  fatCalories = 0
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

def scrapeAll(FOOD_DICT):
  data = [scrape(item) for item in FOOD_DICT.values()]

  return data

def scrapeById(FOOD_DICT, id):
  return scrape(FOOD_DICT[id])

#scrapeAll()
#scrapeForFoods()
#cleanUpFoodName('hi & this w/ this')
#scrapeForMenu()
