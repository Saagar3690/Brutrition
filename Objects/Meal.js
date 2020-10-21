import moment from 'moment'

export default class Meal {
  constructor(type='Lunch', foods=[]) {
      this.type = type
      this.foods = foods
      this.items = {}
      for(let food of foods) {
        //console.log(food)
        this.items[food.foodName] = food.quantity
      }
      this.timestamp = moment()
  }
  get calories() {
    return this.foods.reduce((accum, food) => accum + parseInt(food.calories) * food.quantity, 0)
  }
  get protein() {
    return this.foods.reduce((accum, food) => accum + parseInt(food.protein) * food.quantity, 0)
  }
  get carbs() {
    return this.foods.reduce((accum, food) => accum + parseInt(food.totalCarbohydrate.val) * food.quantity, 0)
  }
  get fat() {
    return this.foods.reduce((accum, food) => accum + parseInt(food.totalFat.val) * food.quantity, 0)
  }
}
