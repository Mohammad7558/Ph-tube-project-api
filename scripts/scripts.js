const loadCategoryButton = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => displayDataButton(data.categories))
}


const displayDataButton = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    for(const categoryName of categories){
        const {category} = categoryName;
        const categoryButton = document.createElement('button');
        categoryButton.classList.add('btn', 'btn-sm');
        categoryButton.innerText = category;
        categoryContainer.appendChild(categoryButton);
    }
}
loadCategoryButton();