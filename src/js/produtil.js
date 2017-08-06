import $ from "jquery";

export class ProdUtil {
	constructor () {
		this.x = "";

		this.setItemCount();
	}
	
	showCart () {
		let skuKey = "";
		let item = null;
		let cartObj = null;
		let lineNo = "";
		let dividerLineNo = "";
		let totalItems = 0;

		$('.modal-item').remove();

		totalItems = sessionStorage.length;

		if (totalItems > 0) {
			for (let i = 0; i < totalItems; i++)
			{
				skuKey = sessionStorage.key(i);

				item = sessionStorage.getItem(skuKey);
				cartObj = JSON.parse(item);

		  		lineNo = 'line' + (i+1).toString();
		  		dividerLineNo = lineNo + '-hr';

		  		if (i > 0) {
					$('.modal-body').append('<hr id="' + dividerLineNo + '" class="modal-item">');
		  		}

				$('.modal-body').append('<div id="' + lineNo + '" class="modal-item flex">'
					+ '<div>SKU : ' + skuKey + '</div>'
					+ '<div>QUANTITY : <input type="text" class="cart-quantity" maxlength="2" value="' + cartObj.quantity + '"></div>'
					+ '<div>TOTAL : $<span>' + cartObj.total + '</span></div>'
					+ '<div><button type="button" class="update-button" data-sku="' + skuKey + '">UPDATE</button>'
					+ '<button type="button" class="remove-button" data-sku="' + skuKey + '">REMOVE</button></div>'
					+ '</div>');

				console.log("sku: " + skuKey + ", price: " + cartObj.price + ", quantity: " + cartObj.quantity + ", total: " + cartObj.total);
			}			
		}
		else
		{
			this.setEmptyCart();
		}

		this.setCartTotal();

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
		let skuKey = $(this.x.target).data('sku');
		let price = $(this.x.target).data('price');

		let cart = {
			price: 0,
			quantity: 0,
			total: 0
		}

		let item = sessionStorage.getItem(skuKey);
		let cartObj = null;

		if (item == null) {
			cart.price = price;
			cart.quantity = 1;
			cart.total = cart.price * cart.quantity;
		}
		else {
			cartObj = JSON.parse(item);

			cart.price = cartObj.price;
			cart.quantity = cartObj.quantity + 1;
			cart.total = cart.price * cart.quantity;
		}

		item = JSON.stringify(cart);
		sessionStorage.setItem(skuKey, item);

		item = sessionStorage.getItem(skuKey);
		cartObj = JSON.parse(item);

		console.log("sku: " + skuKey + ", price: " + cartObj.price + ", quantity: " + cartObj.quantity + ", total: " + cartObj.total);

		this.setItemCount();
	}

	updateCartItem () {
		let lineNo = $(this.x.target).parent().parent().attr("id");
		let skuKey = $(this.x.target).data('sku');
		let quantity = $(this.x.target).parent().parent().find("input").val();

		if (quantity == 0) {
			this.removeCartItem()
			return;
		}

		let item = sessionStorage.getItem(skuKey);

		if (item != null) {
			let cartObj = JSON.parse(item);

			cartObj.quantity = quantity;
			cartObj.total = cartObj.price * quantity;

			$('#' + lineNo).find("span").text(cartObj.total);

			item = JSON.stringify(cartObj);
			sessionStorage.setItem(skuKey, item);
		}

		this.setItemCount();
		this.setCartTotal();

		alert("The quantity has been updated.")
	}

	removeCartItem () {
		let lineNo = $(this.x.target).parent().parent().attr("id");
		let skuKey = $(this.x.target).data('sku');

		let response = confirm("Please confirm the removal of the following cart item: SKU " + skuKey);
		
		if (response != true) {
			return;
		}

		// remove cart item from session storage

		sessionStorage.removeItem(skuKey);

		// remove cart item and horizontal divider line (if needed) from model cart window

		let dividerLineNo = null;

		dividerLineNo = $(this.x.target).parent().parent().prev().attr("id");
		if (!dividerLineNo) {
			dividerLineNo = $(this.x.target).parent().parent().next().attr("id");
		}

		$('#' + lineNo).remove();

		if (dividerLineNo) {
			$('#' + dividerLineNo).remove();
		}

		if (sessionStorage.length == 0) {
			this.setEmptyCart();
		}

		this.setItemCount();
		this.setCartTotal();

		alert("The item has been removed from the cart.")
	}

	setItemCount () {
		let x = document.getElementById("itemCount");
		let itemCount = sessionStorage.length;

		if (itemCount > 0) {
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

	setCartTotal () {
		let skuKey = "";
		let item = null;
		let cartObj = null;
		let totalItems = 0;
		let totalAmount = 0;

		$('#cart-total').remove();

		totalItems = sessionStorage.length;

		for (let i = 0; i < totalItems; i++)
		{
			skuKey = sessionStorage.key(i);

			item = sessionStorage.getItem(skuKey);
			cartObj = JSON.parse(item);

			totalAmount += cartObj.total;
		}

		$('.modal-header').append('<div id="cart-total" class="modal-item">'
			+ '<p>YOUR ITEMS : <span>' + totalItems + '</span> | ' + 'CART TOTAL : <span>$' + totalAmount.toFixed(2) + '</span></p>'
			+ '</div>');
	}

	setEmptyCart () {
		$('.modal-body').append('<p class="modal-item">YOUR CART IS EMPTY.</p>');
	}

	validateQuantity () {
		let keyCode = this.x.keyCode;
		let ctrlCode = this.x.ctrlCode;
		let metaKey = this.x.metaKey;
		let shiftKey = this.x.shiftKey;

        // Allow: backspace, delete, tab, escape, ansd enter
        if ($.inArray(keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
             // Allow: Ctrl/cmd+A
            (keyCode == 65 && (ctrlKey === true || metaKey === true)) ||
             // Allow: Ctrl/cmd+C
            (keyCode == 67 && (ctrlKey === true || metaKey === true)) ||
             // Allow: Ctrl/cmd+X
            (keyCode == 88 && (ctrlKey === true || metaKey === true)) ||
             // Allow: home, end, left, right
            (keyCode >= 35 && keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((shiftKey || (keyCode < 48 || keyCode > 57)) && (keyCode < 96 || keyCode > 105)) {
            this.x.preventDefault();
        }		
	}
};
