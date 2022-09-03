const loadData = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category)
}

const displayCategory = (categories) => {
    // console.log(categories)

    categories.forEach(category => {
        // console.log(category)
        const {category_name, category_id} = category;
        const categoryContainer = document.getElementById('category_container');
        const li = document.createElement('li');
        li.classList.add('category_li')
   
        li.innerHTML=`
        <li onclick="loadCategories('${category_id}')">${category_name}</li>
        `
        categoryContainer.appendChild(li)
    })
}

const loadCategories = async(categoriId) => {

    const url = `https://openapi.programming-hero.com/api/news/category/${categoriId}`
    const res = await fetch(url);
    const data = await res.json();
    showCategory(data.data)
}
const showCategory = (items) => {
// console.log(items);
items.forEach(item => {
    console.log(item)
    const categoriesItemsContainer = document.getElementById('categories_items_container');
    const {image_url, title,details,thumbnail_url} = item;
    const categorisItems = document.createElement('div');
    categorisItems.classList.add('col');
    categorisItems.innerHTML=`
    <div class="card">
    <img src="${image_url}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    </div>
  </div>
    `
    categoriesItemsContainer.appendChild(categorisItems)
})
}

loadData();
