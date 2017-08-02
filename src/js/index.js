/*import Cart from "./cart";*/
import $ from "jquery";

import request from "./bestbuy";
import {Carousel} from "./carousel";
import {ProdUtil} from "./produtil";

export default class App {
	constructor(){
		this.baseUrl = 'https://api.bestbuy.com/v1/products';
		this.apiKey = '8ccddf4rtjz5k5btqam84qak';
		this.category = "";
		this.categoryId = "";

		//this.initBBCall();
		//let x = this.initBBCall();
		//this.initBBCall();
		this.categoryEventListen();
		this.buttonEventListen();
	}

	getUrl () {
		switch (this.category) {
			case "LAPTOPS":
				this.categoryId = 'abcat0502000';
				break;
			case "CELL PHONES":
				this.categoryId = 'pcmcat209400050001';
				break;
			case "TELEVISION":
				this.categoryId = 'abcat0101000';
				break;
			case "HEADPHONES":
				this.categoryId = 'abcat0204000';
				break;
			default:
				this.categoryId = 'abcat0502000';
		}

		let url = `${this.baseUrl}((categoryPath.id=${this.categoryId}))`;

		return url;
	}

	categoryEventListen () {
		$(".nav-item").on("click", (x) => {
			console.log($(x.target).text());
			console.log("category click");
			this.category = $(x.target).text();
			this.initBBCall();
		});
	}

	buttonEventListen () {
		$(".carousel").on("click", ".cart-button", (x) => {
			//console.log($(x.target).data('sku'));
			//console.log($(x.target).data('price'));
			console.log("button click");

			let prod = new ProdUtil
			prod.sku = $(x.target).data('sku');
			prod.price = $(x.target).data('price');
			prod.addToCart();
		});
	}

	initBBCall () {
		//console.log(this.getUrl("laptop"));

		request({url: this.getUrl(), api: this.apiKey})
			.then(data => {
				/* fill carousel with products */
				let cara = new Carousel(data);
				cara.getProducts();
			})
			.catch(error => {
				console.log("warning Christopher Robins... Error");
				console.log(error);
			});
	}
}

let x = new App;
