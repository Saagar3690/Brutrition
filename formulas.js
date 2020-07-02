function calculator(){
  var height = prompt("Enter your height in centimeters: ")
  var weight = prompt("Enter your weight in kilograms: ")
  var gender = prompt("Enter your gender (m for male and f for female): ")
  var age = prompt("Enter your age in years: ")
  var activityLevel = prompt("Enter your activity level (1.2 for sedentary, 1.375 for light activity, 1.55 for moderate activity, and 1.725 for very active: ")
  var weightStatus = prompt("Enter weight status (g for gain weight, l for lose weight, and n for keeping current weight): ")

  var ree = 10 * weight + 6.25 * height - 5 * age
  if (gender === "m") {
    ree += 5
    console.log("Resting Energy Expenditure: " + ree.toFixed(0))
  } else if (gender === "f") {
    ree -= 161
    console.log("Resting Energy Expenditure: " + ree.toFixed(0))
  } else {
    console.log("Please select male or female")
    return
  }

  var tee = ree * activityLevel
  console.log("Total Energy Expenditures (w/ current weight): " + tee.toFixed(0))

  printWeightStatus(tee, weightStatus)
  if(gender === "m")
    printCarbs(tee, 36)
  else
    printCarbs(tee, 25)
  printFats(tee)
  printProteins(tee)

  console.log("Sodium: 2300 mg")
}

function printWeightStatus(tee, weightStatus) {
  if(weightStatus === "g") {
    tee *= 1.2
    console.log("Total Energy Expenditures (w/ gain weight): " + tee.toFixed(0))
  } else if(weightStatus === "l") {
    tee *= 0.8
    console.log("Total Energy Expenditures (w/ lose weight): " + tee.toFixed(0))
  }
}

function printCarbs(tee, sugar) {
  var carbsLow = 0.45 * tee
  var carbsHigh = 0.65 * tee
  console.log("Carbs (45-65% = 4 cal/gram): " + carbsLow.toFixed(0) + " - " + carbsHigh.toFixed(0) + " g")
  console.log("\tSugar: " + sugar + " g")
}

function printFats(tee) {
  var fatsLow = 0.2 * tee
  var fatsHigh = 0.35 * tee
  console.log("Fats (20-35% = 9 cal/gram): " + fatsLow.toFixed(0) + " - " + fatsHigh.toFixed(0) + " g")
  var transFat = 0.01 * tee
  console.log("\tTrans Fat (1%): " + transFat.toFixed(0) + " g")
  var saturatedFatLow = 0.07 * tee
  var saturatedFatHigh = 0.1 * tee
  console.log("\tSaturated Fat (7-10%): " + saturatedFatLow.toFixed(0) + " - " + saturatedFatHigh.toFixed(0) + " g")
}

function printProteins(tee) {
  var proteinsLow = 0.1 * tee
  var proteinsHigh = 0.35 * tee
  console.log("Proteins (10-35% = 4 cal/gram): " + proteinsLow.toFixed(0) + " - " + proteinsHigh.toFixed(0) + " g")
}

calculator()
