let rechercheInput = document.querySelector("#foodInput");
let rechercheBouton = document.querySelector("#boutonRecherche");
let petitText = document.querySelector("#petitText");
let resultatContainer = document.querySelector(".resultatContainer");
let overlay = document.getElementById('overlay');

rechercheBouton.addEventListener("click",function() {
    let rechercheValue = rechercheInput.value;
    petitText.innerHTML = `Résultat pour : "${rechercheValue}"`;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${rechercheValue}`, {
        headers: { 'Accept': 'application/json' } 
    })
        .then(response => response.json())
        .then(data => {
            resultatContainer.innerHTML = "";

            if (data.meals) {
                data.meals.forEach(function (meal) {
                    const mealDiv = document.createElement("div");
                    mealDiv.classList.add("meal");
                    mealDiv.innerHTML =
                    `<h2>${meal.strMeal}</h2>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">`;
                    resultatContainer.appendChild(mealDiv);

                        mealDiv.addEventListener("click",function() {
                            
                            let mealModal = document.querySelector(".mealModal");
                            mealModal.style.display = "grid";
                            overlay.style.display="block";
                            

                            let image = document.getElementById('imageCover');
                            image.innerHTML = `<img src="${meal.strMealThumb}" alt="${meal.strMeal}"></img>`;
                            

                            let titre = document.getElementById('title');
                            titre.innerHTML = `<h2>${meal.strMeal}</h2>`;

                            let ingredients = document.getElementById('ingredients');
                            ingredients.innerHTML = "";
                            let ingredientsArray = [];
                            for(let i=1; i<=20;i++) {
                                const ingredient = meal[`strIngredient${i}`];
                                const measure = meal[`strMeasure${i}`];
                                if(ingredient && ingredient !== "") {
                                    ingredientsArray.push(`${ingredient}: ${measure}`);
                                }
                            }
                            ingredientsArray.forEach(function(ingredient) {
                                const pElement = document.createElement('p');
                                pElement.textContent = ingredient;
                                ingredients.appendChild(pElement);
                            })

                            let description = document.getElementById('description');
                            description.innerHTML = `<p>${meal.strInstructions}</p>`;
                        })
                    
                })
            }
            else {
                resultatContainer.innerHTML = "<p>Aucun plat trouvé pour cette recherche.</p>";
            }
        })
        .catch(error => {
            console.error('Erreur de requête:', error); // Gère les erreurs
        })
        
})

overlay.addEventListener("click", function () {
    let mealModal = document.querySelector(".mealModal");
    mealModal.style.display = "none";
    overlay.style.display = "none"; // Cacher le fond gris
});


