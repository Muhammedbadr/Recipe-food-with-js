let inp = document.getElementById("inp");
let icon = document.getElementById("icon")
let result = document.querySelector(".result");
let text_info = document.querySelector(".text-info") 

inp.addEventListener("keyup", (event)=> {
result.addEventListener("click", getResibiDetels)
result.addEventListener("click", closetext)


    if(event.keyCode === 13)
    {
        let searchTerm = inp.value.trim(); 

        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`)// Include protocol (https://
        .then((response) => {
            if(response.ok) return response.json();   
        })
        .then((data) =>{
            displayRecipes(data);
        })


        function displayRecipes(recipes){
            result.innerHTML = ""
            if(recipes.meals == null){
            result.innerHTML = "No recipes found";

            return }
            recipes.meals.forEach((recipe) => {
            result.innerHTML += 
            `<div class="card">
                    <div class="card-img">
                        <img src="${recipe.strMealThumb}" >
                    </div>
                    <div class="card-info">
                        <h2>${recipe.strMeal}</h2>
                        <a href="#" class="repipe-btn" data-id=${recipe.idMeal}>Get Recjpe</a>
                    </div>
                </div>`
        });
        

    }}

    function getResibiDetels(e){
        if(e.target.classList.contains("repipe-btn")){
            let id = e.target.getAttribute("data-id")
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)// Include protocol (https://
            .then((response) => {
                if(response.ok) return response.json();   
            })
            .then((data) =>{
                displayRecipesData(data);
            })
        };
    }

    function displayRecipesData(resipe){
        text_info.classList.remove("show-info")
        let item = resipe.meals[0]
        console.log(item)
        text_info.innerHTML = ""
        text_info.innerHTML = `
        <h2>${item.strMeal}</h2>
        <p class="one">Information : </p>
        <a href="" class="material-symbols-outlined">cancel </a>
        <p>${item.strInstructions}</p>
            
        <a href="${item.strYoutube}" class="last">Waching Video</a>
        `

    }

    function closetext(e)
    {
        if(e.target.classList.contains("material-symbols-outlined")){
            e.target.classList.add("show-info")
        }
            displayRecipes()

    }
})

