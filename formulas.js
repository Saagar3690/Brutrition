function getFiber(tee, gender, weightStatus) {
  if (gender === "m" && weightStatus === "g") return (tee * 0.019).toFixed(1)
  if (gender === "m" && weightStatus === "l") return (tee * 0.015).toFixed(1)
  if (gender === "m" && weightStatus === "c") return (tee * 0.017).toFixed(1)
  if (gender === "f" && weightStatus === "g") return (tee * 0.0125).toFixed(1)
  if (gender === "f" && weightStatus === "l") return (tee * 0.0105).toFixed(1)
  if (gender === "f" && weightStatus === "c") return (tee * 0.0115).toFixed(1)
}

function getSugar(gender) {
  if (gender === "m") return 36
  return 25
}

function getCalories(tee, weightStatus) {
  if(weightStatus === "g") {
    tee *= 1.2
    return tee.toFixed(1)
  } else if(weightStatus === "l") {
    tee *= 0.8
    return tee.toFixed(1)
  }
}

function getCarbs(tee, gender, weightStatus) {
  var carbsLow = 0.45 * tee * 0.25
  var carbsHigh = 0.65 * tee * 0.25
  if(weightStatus === "g") {
    return carbsHigh.toFixed(1)
  } else if(weightStatus === "l") {
    return carbsLow.toFixed(1)
  }
  return (0.55 * tee).toFixed(1)
}

function getFats(tee, weightStatus) {
  var fatsLow = 0.2 * tee / 9
  var fatsHigh = 0.35 * tee / 9
  if(weightStatus === "g") {
    return fatsHigh.toFixed(1)
  } else if(weightStatus === "l") {
    return fatsLow.toFixed(1)
  }
  return (0.275 * tee).toFixed(1)
}

function getProteins(tee, weightStatus) {
  var proteinsLow = 0.1 * tee * 0.25
  var proteinsHigh = 0.35 * tee * 0.25
  if(weightStatus === "g") {
    return proteinsHigh.toFixed(1)
  } else if(weightStatus === "l") {
    return proteinsLow.toFixed(1)
  }
  return (0.225 * tee).toFixed(1)
}

export default function calculator(height, weight, gender, age, activity, weightStatus){
  let activityLevel = 0.0
  switch(activity) {
    case "none":
      activityLevel = 1.2
      break
    case "light":
      activityLevel = 1.375
      break
    case "moderate":
      activityLevel = 1.55
      break
    case "heavy":
      activityLevel = 1.725
      break
  }
  /*var height = prompt("Enter your height in centimeters: ")
  var weight = prompt("Enter your weight in kilograms: ")
  var gender = prompt("Enter your gender (m for male and f for female): ")
  var age = prompt("Enter your age in years: ")
  var activityLevel = prompt("Enter your activity level (1.2 for sedentary, 1.375 for light activity, 1.55 for moderate activity, and 1.725 for very active: ")
  var weightStatus = prompt("Enter weight status (g for gain weight, l for lose weight, and n for keeping current weight): ")
*/
  var ree = 10 * weight + 6.25 * height - 5 * age
  /*if (gender === "m") {
    ree += 5
    console.log("Resting Energy Expenditure: " + ree.toFixed(0))
  } else if (gender === "f") {
    ree -= 161
    console.log("Resting Energy Expenditure: " + ree.toFixed(0))
  } else {
    console.log("Please select male or female")
    return
  }*/

  var tee = ree * activityLevel
  //console.log("Total Energy Expenditures (w/ current weight): " + tee.toFixed(0))

  let calories = getCalories(tee, weightStatus)
  let carbs = getCarbs(tee, gender, weightStatus)
  let sugar = getSugar(gender)
  let fats = getFats(tee, weightStatus)
  let proteins = getProteins(tee, weightStatus)
  let fiber = getFiber(tee, gender, weightStatus)
  let sodium = 2300

  let goals = {
    calories: calories,
    carbs: carbs,
    fats: fats,
    proteins: proteins,
    fiber: fiber,
    sodium: sodium,
    sugar: sugar
  }

  return goals
}
//calculator()
