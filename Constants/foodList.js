async function getFoodList() {
  await fetch('https://brutrition.herokuapp.com/')

  await fetch('https://brutrition.herokuapp.com/foods/all')
  .then((response) => response.json())
  .then((responseJSON) => {
    console.log(responseJSON.Data)
    return responseJSON.Data[0];
  })
  .catch((error) => {
    console.error(error)
  })
}

export default getFoodList;
