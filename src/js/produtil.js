//import $ from "jquery";

export class ProdUtil {
	constructor () {
		this.sku = "";
		this.price = "";
	}

	addToCart () {
		console.log("sku: " + this.sku + ", price: " + this.price);

		let cart = {
			price: this.price,
			qty: 1
		}

		let cartValue = sessionStorage.getItem(this.sku);
		let item = null;
		let cartObj = null;

		if (cartValue == null) {
			item = JSON.stringify(cart);
			sessionStorage.setItem(this.sku, item);
		} else {
			cartObj = JSON.parse(cartValue);
			cartObj.qty += 1;
			item = JSON.stringify(cartObj);
			sessionStorage.setItem(this.sku, item);
		}

		cartValue = sessionStorage.getItem(this.sku);
		cartObj = JSON.parse(cartValue);

		console.log(cartObj.price + " " + cartObj.qty);
	}
};
