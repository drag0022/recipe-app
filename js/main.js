document.addEventListener('DOMContentLoaded', ()=>{
    let searchButton = document.querySelector('button');
    let searchField = document.querySelector('input');
    searchButton.addEventListener('click', ()=>{
        let searchText = searchField.value;
        let URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        fetch(URL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            let recipes = document.querySelector('.recipes');
            let df = new DocumentFragment();
            data.meals.forEach(item=>{
                recipes.innerHTML = "";
                let recipe = document.createElement('li');
                recipe.classList.add('recipe');
                recipes.appendChild(recipe);
                recipe.addEventListener('click', recipeClicked);
                let title = document.createElement('p');
                title.classList.add('recipeTitle');
                recipe.appendChild(title);
                let a = document.createElement('a');
                title.appendChild(a);
                let subTitle = document.createElement('ul');
                subTitle.classList.add('subTitle');
                recipe.appendChild(subTitle);
                for (let index = 0; index < 2; index++) {
                    let highlight = document.createElement('li');
                    highlight.classList.add('highlight');
                    subTitle.appendChild(highlight);
                }
                let highlight = document.querySelectorAll('.highlight');
                highlight[0].innerHTML = `Region: ${item.strArea}`;
                highlight[1].innerHTML = `Category: ${item.strCategory}`;
                a.href = item.strSource;
                a.innerHTML = item.strMeal;
                df.appendChild(recipe);

            })
        recipes.appendChild(df);
        function recipeClicked(ev){
            let recipe = ev.currentTarget;
            if (recipe.classList.contains('recipeClicked')){
                recipe.classList.remove('recipeClicked');
            } else if (document.querySelectorAll('.recipeClicked').length < 1){
                recipe.classList.add('recipeClicked');
            }
            
        }
        })
        .catch(function(err) {
            console.log(err);
        });
    })
    

});

