const foodList = getFoodList();

function getFoodList() {
  fetch('https://brutrition.herokuapp.com/')

  fetch('https://brutrition.herokuapp.com/foods/all')
  .then((response) => response.json())
  .then((responseJSON) => {
    return responseJSON.Data[0];
  })
  .catch((error) => {
    console.error(error)
  })
}

export default foodList;
