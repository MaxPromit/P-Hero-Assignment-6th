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
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoriId}`
    const res = await fetch(url);
    const data = await res.json();
    showCategory(data.data)
}
const showCategory = (items) => {
    // found start
    const foundSpan = document.getElementById('found_span');
    const foundSpanString = foundSpan.innerText;
    foundSpan.innerText = items.length;
    // found end

const categoriesItemsContainer = document.getElementById('categories_items_container');
categoriesItemsContainer.innerHTML= '';
items.forEach(item => {
    // console.log(item)

    const {image_url, title,details,_id,total_view} = item;
    const categorisItems = document.createElement('div');
    categorisItems.classList.add('col');
    categorisItems.innerHTML=`
    <div class="card">
    <img src="${image_url}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p>${details.length > 500 ? details.slice(0, 500) + '...' : details  }</p>
      <div id="details_btn">
      <div class="d-flex" id="author_img_div">
      <img id="author_image" src="${item.author.img}" />
      <p class="ms-2 mt-2">Name: ${item.author.name ? item.author.name : "Not Found"}</p>
     
      </div>
      <h3>View: ${total_view}</h3>
      <button onclick="showModal('${_id}')" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Details</button>
      </div>
    </div>
  </div>
    `
    categoriesItemsContainer.appendChild(categorisItems);
    toggleSpinner(false);
})
}

const showModal = async(news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayShowModal(data.data)
}

const displayShowModal = (modal) => {
    modal.forEach(item =>{
        console.log(item)
        const modalTitle = document.getElementById('phoneDetailsModalLabel');

    const modalPhoneDetails = document.getElementById('phone_modal_details');
    modalPhoneDetails.innerHTML= `
        <img src="${item.thumbnail_url}" />
        <h3>${item.title}</h3>
    `
    })
}
// spinner
const toggleSpinner = (isSpinning) =>{
    const spinner = document.getElementById('loader');
    if(isSpinning){
        spinner.classList.remove('d-none')
    }
    else{
        spinner.classList.add('d-none')
    }
    }
    

loadData();
