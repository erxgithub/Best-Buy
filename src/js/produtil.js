import $ from "jquery";

export class ProdUtil {
	constructor () {
		this.target = "";
		this.sku = "";
		this.price = "";
		this.quantity = 1;
		this.setItemCount();
	}
	
	showCart () {
		console.log("cart click");

		let skuKey = "";
		let item = null;
		let cartObj = null;
		let lineNo = "";
		let totalItems = 0;
		let totalAmount = 0;

		$('.modal-item').remove();

		totalItems = sessionStorage.length;

		for (let i = 0; i < totalItems; i++)
		{
			skuKey = sessionStorage.key(i);

			item = sessionStorage.getItem(skuKey);
			cartObj = JSON.parse(item);

	  		lineNo = 'line' + (i+1).toString();

			$('.modal-body').append('<div id="' + lineNo + '" class="modal-item flex">'
				+ '<div>SKU : ' + skuKey + '</div>'
				+ '<div>QUANTITY : <input type="text" class="cart-quantity" value="' + cartObj.quantity + '"></div>'
				+ '<div>TOTAL : $' + cartObj.total + '</div>'
				+ '<div><button type="button" class="update-button" data-sku="' + skuKey + '" data-quantity="' + cartObj.quantity + '">UPDATE</button>'
				+ '<button type="button" class="remove-button" data-sku="' + skuKey + '" data-quantity="' + cartObj.quantity + '">REMOVE</button></div>'
				+ '</div>');

			$('.modal-body').append('<hr class="modal-item">');

			totalAmount += cartObj.total;

			console.log("sku: " + skuKey + ", price: " + cartObj.price + ", quantity: " + cartObj.quantity + ", total: " + cartObj.total);
		}

		$('.modal-header').append('<div id="cart-total" class="modal-item">'
			+ '<p>YOUR ITEMS : ' + totalItems + ' | ' + 'CART TOTAL : <span>$' + totalAmount.toFixed(2) + '</span></p>'
			+ '</div>');

		// Get the modal
		let modal = document.getElementById('myModal');

		// Get the <span> element that closes the modal
		let span = document.getElementsByClassName("close")[0];

		modal.style.display = "block";

		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
		    modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		}
	}

	addCartItem () {
		this.sku = $(this.target).data('sku');
		this.price = $(this.target).data('price');

		let cart = {
			price: 0,
			quantity: 0,
			total: 0
		}

		let item = sessionStorage.getItem(this.sku);
		let cartObj = null;

		if (item == null) {
			cart.price = this.price;
			cart.quantity = 1;
			cart.total = cart.price * cart.quantity;
		}
		else {
			cartObj = JSON.parse(item);

			cart.price = cartObj.price;
			cart.quantity = cartObj.quantity + this.quantity;
			cart.total = cart.price * cart.quantity;
		}

		item = JSON.stringify(cart);
		sessionStorage.setItem(this.sku, item);

		item = sessionStorage.getItem(this.sku);
		cartObj = JSON.parse(item);

		console.log("sku: " + this.sku + ", price: " + cartObj.price + ", quantity: " + cartObj.quantity + ", total: " + cartObj.total);

		this.setItemCount();
	}

	updateCartItem () {
		let skuKey = $(this.target).data('sku');
		let quantity = $(this.target).data('quantity');

		let item = sessionStorage.getItem(skuKey);

		if (item != null) {
			let cartObj = JSON.parse(item);

			cartObj.quantity = quantity;
			cartObj.total = cartObj.price * quantity;

			item = JSON.stringify(cartObj);
			sessionStorage.setItem(skuKey, item);

			//console.log(this.target);
		}

		this.setItemCount();
	}

	removeCartItem () {
		//console.log($(this.target.prev()));
	}

	setItemCount () {
		let itemCount = sessionStorage.length;

		if (itemCount > 0) {
			let x = document.getElementById("itemCount");

			if (x.style.display != "block") {
				x.style.display = "block";
			}

			x.textContent = itemCount.toString();
		}
		else
		{
			x.style.display = "none";
		}
	}
};
