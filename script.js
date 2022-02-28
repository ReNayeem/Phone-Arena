const allMeal = () => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=a`;
    fetch(url)
        .then(res => res.json())
        .then(data => showMeals(data.meals))
}


//loading part start
const loadingSpinner = loadingId => {
    document.getElementById('loading').style.display = loadingId
}
const detailLoading = loadingId => {
    document.getElementById('meal-details').style.display = loadingId
}
//loading part end


const showMeals = meals => {
    const emptyInput = document.getElementById('empty-input')
    const searchResult = document.getElementById('search-result');
    //previous meals on site none
    document.getElementById('meal-details').innerHTML = ''
    if (meals.length == 0) {
        //if nothing found or not available
        emptyInput.style.display = 'block'
    }
    //for adding meals on site
    meals.forEach(meal => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col', 'g-5');
        div.innerHTML = `
            <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                </div>
            </div>
            `;
        //searched meals on site
        searchResult.appendChild(div);
    })
    loadingSpinner('none')
}
//all meals on home page
loadingSpinner('block')
allMeal()



//search meals start
const searchFood = async () => {
    const emptyInput = document.getElementById('empty-input')
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    loadingSpinner('block')
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (searchText == '') {
        document.getElementById('search-result').innerHTML = ''
        emptyInput.style.display = 'block'
        loadingSpinner('none')
    }
    else {
        // load data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        emptyInput.style.display = 'none'

        //if everything fine then it will execute
        try {
            const res = await fetch(url);
            const data = await res.json();
            showMeals(data.meals)
            console.log(data)
        }
        //wrong input or error catch
        catch (error) {
            emptyInput.style.display = 'block'
            loadingSpinner('none')
        }
    }
}
//search meal end

const loadMealDetail = async mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    const res = await fetch(url);
    const data = await res.json();
    displayMealDetail(data.meals[0]);
}

const displayMealDetail = meal => {
    console.log(meal);
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('g-5');
    div.innerHTML = `
    <div class = 'card'>
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
            <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
    `;
    mealDetails.appendChild(div);
}