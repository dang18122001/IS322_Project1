const database = [
    { image: 'https://m.media-amazon.com/images/I/71i7OhA-pRL._AC_UL320_.jpg', 
      name: 'Teskyer Large Print Playing Cards, Poker Size Jumbo Index Deck of Cards, Linen Finish Surface, 2 Pack(Blue and Red)', 
      price: 6.88,
      freeshiping: true },
    { image: 'https://m.media-amazon.com/images/I/71ggaIDV52L._AC_UL320_.jpg', 
      name: 'ACELION Waterproof Playing Cards, Plastic Playing Cards, Deck of Cards, Gift Poker Cards (Black)', 
      price: 7.99,
      freeshiping: false },
    { image: 'https://m.media-amazon.com/images/I/81xItjxJNLL._AC_UL320_.jpg',
      name: 'LotFancy Playing Cards, Poker Size Standard Index, 12 Decks of Cards, for Blackjack, Euchre, Canasta Card Game',
      price: 10.19,
      freeshiping: true },
    { image: 'https://m.media-amazon.com/images/I/61BBbJ3Z-2L._AC_UL320_.jpg', 
      name: 'KEM Arrow Jumbo Index Playing Cards',
      price: 33.41,
      freeshiping: false },
    { image: 'https://m.media-amazon.com/images/I/614c70N0OgS._AC_UL320_.jpg', 
      name: 'Bicycle Standard Jumbo Playing Cards - Poker, Rummy, Euchre, Pinochle, Card Games',
      price: 5.99,
      freeshiping: true },
    { image: 'https://m.media-amazon.com/images/I/61-xZjxhl0L._AC_UL320_.jpg',
      name: 'Maverick Standard Playing Cards 12 Pack, Poker Size Standard Index, 12 Decks of Cards (6 Blue and 6 Red)',
      price: 11.99,
      freeshiping: false },
    { image: 'https://m.media-amazon.com/images/I/819v2dhmKwL._AC_UL320_.jpg',
      name: 'Bicycle Sea King Playing Cards Blue',
      price: 6.99,
      freeshiping: true },
    { image: 'https://m.media-amazon.com/images/I/91zs9KJt-QL._AC_UL320_.jpg',
      name: 'Joker and the Thief Playing Cards - Seafarers Nautical Custom Deck',
      price: 14.97,
      freeshiping: false },
    { image: 'https://m.media-amazon.com/images/I/81YxA07JjiL._AC_UL320_.jpg',
      name: 'Cyberpunk Purple Playing Cards, Cardistry Decks, Black Deck of Playing Cards for Kids & Adults, Cool Playing Cards',
      price: 11.97,
      freeshiping: true }
]



// Renders current selection of products into DOM
function renderList(result) {
    const productDiv = document.querySelector('#products');

    // Clear out inner HTML to get rid of any older results
    productDiv.innerHTML = '';
    // Map each database record to a string containing the HTML for its record
    const products = result.map((result, index) => {
        return '<div class="product">' + 
                    '<img src=' + result.image + '>' +
                    '<h5>' + result.name + '</h5>' +
                    'Price: ' + result.price +
               '</div>';
    });
    // Set the contents of the list to the new set of render HTML products
    products.forEach((item) => {
        productDiv.innerHTML += item;
    });
}

// Call RenderList with initial database for initial list of products
renderList(database);

// Function to filter out none-freeshiping results
function toggleFreeshiping(showFreeshiping) {
    // If showFreeshiping is TRUE, only display freeshiping results
	// Filter will only inclue objects that return TRUE from it's query
    var filteredResults = database.filter(function (result) {
        // If showFreeshiping is FALSE, always show.
        // Otherweise only show if freeshiping is TRUE
        return !showFreeshiping || result.freeshiping;
    });
    renderList(filteredResults);
}

// Change events trigger after the value of a form input changes
document.querySelector('#freeshiping').addEventListener('change', (event) => {
    // event.target.value contains current value of the form input
    const value = event.target.value === 'true';
    toggleFreeshiping(value);
});

// Function to filter out results by price
function togglePrice(priceSelection) {
    // Create and Initialize priceRange
    priceRange = [0, 10000];
    if (priceSelection == 'under10') {
        priceRange = [0, 10];
    } else if (priceSelection == '10to20') {
        priceRange = [10, 20];
    } else if (priceSelection == '20+') {
        priceRange = [20, 10000];
    }

	// Filter will only inclue objects that return TRUE from it's query
    var filteredResults = database.filter(function (result) {
        if (result.price > priceRange[0] && result.price < priceRange[1])
            return true;
        return false;
    });
    renderList(filteredResults);
}

// Change events trigger after the value of a form input changes
document.querySelector('#pricefilter').addEventListener('change', (event) => {
    // event.target.value contains current value of the form input
    const value = event.target.value;
    togglePrice(value);
});

// Function to Order results list 
function orderBy(sortValue) {
    // Sort method varies based on what type of value we're sorting 
    var sortedResults = (sortValue === 'name') ? 
        database.sort(function (a, b) { // Strings need to be sorted in a slightly more compldex way
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            // Sorts alphabetically.  -1 puts it before. 1 puts it after
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
        }) : 
        database.sort(function (a, b) { // Numbers a booleans are much simpler. 
                                            // Just need postive or negative number 
            // Object properties can be accessed through a string representing their name
            return a[sortValue] - b[sortValue];
        });
    renderList(sortedResults);
}

// Change events trigger after the value of a form input changes
document.querySelector('#orderBy').addEventListener('change', function(event){
    // Event is the JavaScript event that transpired, in our change a CHANGE event.
    // Target is the element it was performed on, useful for when the event targets 
    // multiple elements.
    // Value has the name implies is the current value of the input element, if there is one
    if (event.target.value != 'none')
        orderBy(event.target.value);
});
