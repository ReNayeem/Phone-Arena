//loading part start
const loadingSpinner = loadOrNot => {
    document.getElementById('loading').style.display = loadOrNot
}
//loading part end


//clear phone detail start
const clearPhoneDetail = () => {
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
}
//clear phone detail end


//clear phone more detail start
const clearPhoneMoreDetail = () => {
    const phoneMoreDetails = document.getElementById('phone-more-details');
    phoneMoreDetails.innerHTML = '';
}
//clear phone more detail end


//show phones start
const showPhones = phones => {
    const errorOrNot = document.getElementById('error-or-not')
    const searchResult = document.getElementById('search-result');
    // clear previous phone detail
    document.getElementById('phone-details').innerHTML = ''
    if (phones.length == 0) {
        //if nothing found or not available
        errorOrNot.style.display = 'block'
    }
    //for adding phones on site
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col', 'g-5');
        div.innerHTML = `
            <div class="card h-100 rounded p-4">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                    <a href="#phone-details" onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-success">Details</a>
                </div>
            </div>
            `;
        //searched phones on site
        searchResult.appendChild(div);
    })
    loadingSpinner('none')
}
//show phones end


//search phones start
const searchPhone = async () => {
    // clear more details for new search
    clearPhoneMoreDetail()
    const errorOrNot = document.getElementById('error-or-not')
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear input field
    searchField.value = '';
    // load spinner
    loadingSpinner('block')
    // clear previous phone detail
    clearPhoneDetail()
    const searchResult = document.getElementById('search-result');
    // previous search result remove
    searchResult.textContent = '';
    if (searchText == '') {
        document.getElementById('search-result').innerHTML = ''
        errorOrNot.style.display = 'block'
        loadingSpinner('none')
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        errorOrNot.style.display = 'none'

        //if everything fine then it will execute
        try {
            const res = await fetch(url);
            const data = await res.json();
            showPhones(data.data.slice(0, 20))
        }
        //wrong input or error catch
        catch (error) {
            errorOrNot.style.display = 'block'
            loadingSpinner('none')
        }
    }
}
//search phone end


//load phone detail start
const loadPhoneDetail = async phoneId => {
    //clear previous phone more detail
    clearPhoneMoreDetail()
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetail(data.data);
}

const displayPhoneDetail = phone => {
    const phoneDetails = document.getElementById('phone-details');
    // clear previous phone detail
    clearPhoneDetail()
    const div = document.createElement('div');
    const releaseDate = phone.releaseDate
    //check if release date available or not
    if (releaseDate.toString().length == 0) {
        div.innerHTML = `
    <div class = 'card border-0 mt-5'>
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.name}</h5>
            <p class="card-text">Release date not found</p>
            <p class="card-text">Storage: ${phone.mainFeatures.storage}</p>
            <p class="card-text">Display: ${phone.mainFeatures.displaySize}</p>
            <p class="card-text">Processor: ${phone.mainFeatures.chipSet}</p>
            <a id='more-detail-button' onclick="loadMorePhoneDetails('${phone.slug}')" class="btn btn-success">More Details</a>
        </div>
    </div>
    `;
    }
    else {
        div.innerHTML = ` 
    <div class = 'card border-0 mt-5'>
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.name}</h5>
            <p class="card-text">${phone.releaseDate}</p>
            <p class="card-text">Storage: ${phone.mainFeatures.storage}</p>
            <p class="card-text">Display: ${phone.mainFeatures.displaySize}</p>
            <p class="card-text">Processor: ${phone.mainFeatures.chipSet}</p>
            <a id='more-detail-button' onclick="loadMorePhoneDetails('${phone.slug}')" class="btn btn-success">More Details</a>
        </div>
    </div>
    `;
    }
    phoneDetails.appendChild(div);
}
//load phone detail end


//load phone more detail start
const loadMorePhoneDetails = async (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;

    const res = await fetch(url);
    const data = await res.json();
    displayMoreDetails(data.data);
}

const displayMoreDetails = (phone) => {
    const phoneMoreDetails = document.getElementById('phone-more-details');
    clearPhoneMoreDetail()
    const div = document.createElement('div');
    //check if more details available or not
    try {
        div.innerHTML = `
        <div class = 'card border-0'>
        <div class="card-body">
            <p class="card-text">Sensors : ${phone.mainFeatures.sensors}</p>   
            <p class="card-text">Bluetooth: ${phone.others.Bluetooth}</p>
            <p class="card-text">GPS: ${phone.others.GPS}</p>
            <p class="card-text">NFC: ${phone.others.NFC}</p>
            <p class="card-text">Radio: ${phone.others.Radio}</p>
            <p class="card-text">USB: ${phone.others.USB}</p>
            <p class="card-text">WLAN: ${phone.others.WLAN}</p>
        </div>
        </div>
        `
    }
    catch {
        div.innerHTML = `  
        <div class = 'card border-0'>
        <div class="card-body">
            <p class="card-text">Sensors: ${phone.mainFeatures.sensors}</p>   
            <p class="card-text">Others specification not found</p>
        </div>
        </div>
        `
    }
    phoneMoreDetails.appendChild(div);
    document.getElementById('more-detail-button').style.display = 'none'
};
//load phone more detail end