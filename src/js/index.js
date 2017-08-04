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
		this.productUtilListen();
	}

	productUtilListen () {
		let listen = [
			{className: ".header-desktop", subClass: ".cart-desktop", functionName: "showCart"},
			{className: ".carousel", subClass: ".cart-button", functionName: "addCartItem"},
			{className: ".modal", subClass: ".update-button", functionName: "updateCartItem"},
			{className: ".modal", subClass: ".remove-button", functionName: "removeCartItem"}
		];

		let productUtil = new ProdUtil;
		//productUtil.quantity = 5;

		for (let i = 0; i < listen.length; i++)
		{
			//console.log(listen[i] == "")
			$(listen[i].className).on("click", listen[i].subClass, (x) => {
				//let newQnt = $(x.target).parent().parent().find("input").val();
				productUtil.target = x.target;
				productUtil[listen[i].functionName]();
				console.log($(x.target).parent().parent().find("input").val());
			});
		}
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
		$(".nav-menu").on("click", ".nav-item", (x) => {
			console.log($(x.target).text());
			console.log("category click");
			this.category = $(x.target).text();
			this.initBBCall();
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
