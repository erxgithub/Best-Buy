//import $ from "jquery";

export class ProdUtil {
	constructor () {
		this.sku = "";
		this.price = "";
	}

	addToCart () {
		let cart = {
			price: 0,
			qty: 0,
			total: 0
		}

		let item = sessionStorage.getItem(this.sku);
		let cartObj = null;

		if (item == null) {
			cart.price = this.price;
			cart.qty = 1;
			cart.total = cart.price * cart.qty;
		}
		else {
			cartObj = JSON.parse(item);

			cart.price = cartObj.price;
			cart.qty = cartObj.qty + 1;
			cart.total = cart.price * cart.qty;
		}

		item = JSON.stringify(cart);
		sessionStorage.setItem(this.sku, item);

		item = sessionStorage.getItem(this.sku);
		cartObj = JSON.parse(item);

		let x = document.getElementById("itemCount");

		if (x.style.display != "block") {
			x.style.display = "block";
		}

		let itemCount = parseInt(x.textContent);
		itemCount += 1;

		x.textContent = itemCount.toString();

		console.log("sku: " + this.sku + ", price: " + cartObj.price + ", qty: " + cartObj.qty + ", total: " + cartObj.total);
	}
};
