import data from './data.js'


const itemsContainer = document.querySelector('#items');
const itemList = document.getElementById('item-list');
const cartQty = document.getElementById ('cart-qty');
const cartTotal = document.getElementById ('cart-total'); 
// const about = document.getElementById('about');


const cart = [ ]

// //about
// about.innerHTML = <p >Welcome to Mood Shop</p>


//itemList.innerHTML = '<li> Hello World</li>'

//console.log(itemList)

for (let i = 0; i < data.length; i += 1) {
	// create a new div element and give it a class name
	const newDiv = document.createElement('div');
	newDiv.className = 'item'
	// create an image element
	const img = document.createElement('img');
	// this will change each time we go through the loop. Can you explain why?
	img.src = data[i].image
	img.width = 300
	img.height = 300
	// Add the image to the div
	newDiv.appendChild(img)
	// put new div inside items container
	itemsContainer.appendChild(newDiv)

	// create a paragraph element for a description
	const desc = document.createElement('P')
	// give the paragraph text from the data
	desc.innerText = data[i].desc
	// append the paragraph to the div
	newDiv.appendChild(desc)

	// do the same thing for price
	const price = document.createElement('P')
	price.innerText = data[i].price
	newDiv.appendChild(price)

	// Make a button 
	const button = document.createElement('button')
	// add an  id name to the button
	button.id = data[i].name
	// creates a custom attribute called data-price. That will hold price for each element in the button
	button.dataset.price = data[i].price
	button.innerHTML = "Add to Cart"
	newDiv.appendChild(button)
}


//Add Items ----------------------------------------
function addItem(name, price){
	for (let i =0; i < cart.length; i +=1 ){
		if (cart[i].name === name) {
			cart[i].qty += 1
			return
		}
	}
	const item = {name, price, qty:1}
	cart.push(item); 
}

//Show Items -------------------------------------------------------------
function showItems(){

	const qty = getQty()
	const total = getTotal ()
	cartQty.innerHTML = `You have ${qty} items in your cart`
	//console.log(`You have ${qty} items in your cart`)

	let itemStr = ''
	for (let i = 0; i < cart.length; i+=1){
		//console.log(`${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
		
		
		const { name, price, qty } = cart[i]
		const totalPrice = price * qty
		
		itemStr += `<li> 
		${name} $${price} x ${qty} = $ ${totalPrice.toFixed(2)}
		<button class="remove" data-name ="${name}">Remove</button>
		<button class="add-one" data-name ="${name}"> + </button>
		<button class="remove-one" data-name ="${name}"> - </button>
		<input class ="update" type="number"> 
		</li>`  
	}

	
	itemList.innerHTML = itemStr

	cartTotal.innerHTML = `Total in cart: $${total}`
	//console.log(`Total in cart: $${total}`)

// Get Total -------------------------------------------------
	function getTotal(){
		let total = 0 
		for (let i =0;  i < cart.length; i +=1) {
			total += cart[i].price * cart[i].qty
		}
		return total.toFixed(2)
    }

}

//Get Qty ------------------------------------------------------

function getQty() {
	let qty = 0
	for (let i =0 ; i < cart.length; i += 1) {
		qty += cart[i].qty 
	}
	return qty 
}

//Remove Item -------------------
function removeItem(name, qty = 0){
	for (let i = 0; i < cart.length; i += 1 ){
		if (cart[i].name === name) {
			if (qty > 0 ){
				cart[i].qty -= 1
			}
			if (cart[i].qty < 1 || qty === 0) {
				cart.splice(i, 1)
			
			}
			showItems()
			return
		}
	}

}

//select and connect button to cart
const all_items_button = Array.from(document.querySelectorAll("button"))

console.log(all_items_button)

all_items_button.forEach(elt => elt.addEventListener('click', () => {
	addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
	showItems()
  }));

  //update cart ---------------------------------

  function updateCart(name, qty) {
	for (let i = 0; i < cart.length; i += 1) {
	  if (cart[i].name === name) {
		if (qty < 1) {
		  removeItem(name);
		  return;
		}
		cart[i].qty = qty;
		showItems();
		return;
	  }
	}
  }


  //Handle Change events on update ----------------------------
  itemList.onchange = function (e) {
	if (e.target && e.target.classList.contains("update")) {
	  const name = e.target.dataset.name;
	  const qty = parseInt(e.target.value);
	  updateCart(name, qty);
	}
  };



//Handle clicks on list -----------------------------------
itemList.onclick = function (e) {

    if (e.target && e.target.classList.contains('remove')) {
        const name = e.target.dataset.name;
        console.log(name);
        removeItem(name);

    } else if (e.target && e.target.classList.contains('add-one')) {
        // const name = e.target.dataset.name;
		// const price = e.target.dataset.price;

        // addItem(name, price);
		// console.log('+ clicked')
        // // showCart();
		const name = e.target.dataset.name;
        addItem(name);
        showItems();

    } else if (e.target && e.target.classList.contains('remove-one')) {
        const name = e.target.dataset.name;
        removeItem(name, 1);
    }

}







//Test code ----------------------------------
// addItem('Sad', 0.99);
// addItem('Happy', 1.99);
// addItem('Angry', 3.99);
// addItem('Tired', 4.59); 
// addItem('Angry', 3.99); 
// addItem('Moody', 2.23); 
// addItem('Angry', 3.99); 


//Calling Items ------------------------------

// showItems(); 

// removeItem('Angry', 1); 
// removeItem('Tired'); 


// showItems(); 














