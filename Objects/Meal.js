export default class Meal {
  constructor(type='Lunch', foods=[]) {
      this.type = type
      this.foods = foods
      this.items = {}
      for(let food of foods) {
        this.items[food.foodName] = food.quantity
      }
  }
  get calories() {
    return 1000
  }
  get protein() {
    return 20
  }
  get carbs() {
    return 50
  }
}
