const loadData = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category)
}

const displayCategory = (categories) => {
    // console.log(categories)

    categories.forEach(category => {
        const {category_name, category_id} = category;
        const categoryContainer = document.getElementById('category_container');
        const li = document.createElement('li');
        li.classList.add('category_li')
   
        li.innerText=`
        ${category_name}
        `
        categoryContainer.appendChild(li)
    })
}

loadData();
