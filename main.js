let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let createBtn = document.getElementById('createBtn');
let searchInput = document.getElementById('search');

let idx = -1;
function getTotalPrice() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = 'green';
    }else {
        total.innerHTML = '';
        total.style.backgroundColor = '#b02a2a';
    }
}

let savedData = localStorage.product ? JSON.parse(localStorage.product) : [];   

createBtn.onclick = function () {
    let product = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    };
    
    if (idx === -1) {
        /* Must check if the field is not empty , to avoid unneccessary storage in local storage */
        if ((product.title != '' || product.price != '' || product.taxes != '' || product.ads != '' || product.discount != '' || product.total != '' || product.count != '' || product.category != '') && product.count >= 1) {
            savedData.push(product);
            localStorage.setItem('product' , JSON.stringify(savedData));
        }
    }else {
        savedData[idx].title = product.title;
        savedData[idx].price = product.price;
        savedData[idx].taxes = product.taxes;
        savedData[idx].ads = product.ads;
        savedData[idx].discount = product.discount;
        savedData[idx].total = product.total;
        savedData[idx].count = product.count;
        savedData[idx].category = product.category;
        savedData[idx].total = product.total;
        idx = -1;
        createBtn.innerHTML = 'Create';
        localStorage.clear();
        localStorage.setItem('product' , JSON.stringify(savedData));
    }
    clearData();
    showData();
}

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
    searchInput.placeholder = 'Search';
    total.style.backgroundColor = '#b02a2a';
}

function showData() {
    let table = '';
    for (let i = 0; i < savedData.length; ++i) {
        table += `
            <tr>
                <td>${i}</td>
                <td>${savedData[i].title}</td>
                <td>${savedData[i].price}</td>
                <td>${savedData[i].taxes}</td>
                <td>${savedData[i].ads}</td>
                <td>${savedData[i].discount}</td>
                <td>${savedData[i].total}</td>
                <td>${savedData[i].category}</td>
                <td>${savedData[i].count}</td>
                <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
                <td id="deleteBtns">
                    <button onclick="deleteOneProduct(${i})" id="delete">Delete</button>
                    <button onclick="deleteAllCountProduct(${i})" id="deleteAll">Delete All</button>
                </td>
            </tr>
        `
    }

    document.getElementById('contentTable').innerHTML = table;
    let deleteAllBtn = document.getElementById('deleteAllData');
    deleteAllBtn.innerHTML = savedData.length > 0 ? `<button onclick="deleteAllSavedData()">Delete All (${savedData.length})</button>` : ``;
}

function deleteOneProduct(i) {
    if (savedData[i].count > 1){
        savedData[i].count--;
    }else {
        savedData.splice(i, 1);
    }

    localStorage.product = JSON.stringify(savedData);
    showData();
}

function deleteAllCountProduct(i) {
    savedData.splice(i, 1);
    localStorage.product = JSON.stringify(savedData);
    showData();
}

function deleteAllSavedData() {
    localStorage.clear();
    savedData.splice(0);
    showData();
}

function updateProduct(i) {
    title.value = savedData[i].title;
    price.value = savedData[i].price;
    taxes.value = savedData[i].taxes;
    ads.value = savedData[i].ads;
    discount.value = savedData[i].discount;
    count.value = savedData[i].count;
    category.value = savedData[i].category;
    getTotalPrice();
    createBtn.innerHTML = 'Update';
    idx = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}


let searchMode = 'title';
function searchCheck(id) {
    searchMode = id === 'searchByTitle' ? 'title' : 'category';
    searchInput.placeholder = `Search By ${searchMode}`;
    searchInput.focus();
    searchInput.value = '';
    showData();
}

function searchProduct(value) {
    let table = '';
    if (searchMode === 'title') {
        for (let i = 0; i < savedData.length; ++i) {
            if (savedData[i].title.toLowerCase() === value.toLowerCase()) {
                table += `
                            <tr>
                                <td>${i}</td>
                                <td>${savedData[i].title}</td>
                                <td>${savedData[i].price}</td>
                                <td>${savedData[i].taxes}</td>
                                <td>${savedData[i].ads}</td>
                                <td>${savedData[i].discount}</td>
                                <td>${savedData[i].total}</td>
                                <td>${savedData[i].category}</td>
                                <td>${savedData[i].count}</td>
                                <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
                                <td id="deleteBtns">
                                    <button onclick="deleteOneProduct(${i})" id="delete">Delete</button>
                                    <button onclick="deleteAllCountProduct(${i})" id="deleteAll">Delete All</button>
                                </td>
                            </tr>
                        `
            }
        }
    }else {
        for (let i = 0; i < savedData.length; ++i) {
            if (savedData[i].category.toLowerCase() === value.toLowerCase()) {
                table += `
                            <tr>
                                <td>${i}</td>
                                <td>${savedData[i].title}</td>
                                <td>${savedData[i].price}</td>
                                <td>${savedData[i].taxes}</td>
                                <td>${savedData[i].ads}</td>
                                <td>${savedData[i].discount}</td>
                                <td>${savedData[i].total}</td>
                                <td>${savedData[i].category}</td>
                                <td>${savedData[i].count}</td>
                                <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
                                <td id="deleteBtns">
                                    <button onclick="deleteOneProduct(${i})" id="delete">Delete</button>
                                    <button onclick="deleteAllCountProduct(${i})" id="deleteAll">Delete All</button>
                                </td>
                            </tr>
                        `
            }
        }
    }
    document.getElementById('contentTable').innerHTML = table;
}