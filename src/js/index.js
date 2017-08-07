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
			{className: "header", subClass: ".shopping-cart", eventName: "click", functionName: "showCart"},
			{className: ".carousel", subClass: ".add-button", eventName: "click", functionName: "addCartItem"},
			{className: ".modal", subClass: ".update-button", eventName: "click", functionName: "updateCartItem"},
			{className: ".modal", subClass: ".remove-button", eventName: "click", functionName: "removeCartItem"},
			{className: ".modal", subClass: ".cart-quantity", eventName: "keydown", functionName: "validateQuantity"}
		];

		let productUtil = new ProdUtil;
		//productUtil.quantity = 5;

		for (let i = 0; i < listen.length; i++)
		{
			//console.log(listen[i] == "")
			$(listen[i].className).on(listen[i].eventName, listen[i].subClass, (x) => {
				//let newQnt = $(x.target).parent().parent().find("input").val();
				productUtil.x = x;
				productUtil[listen[i].functionName]();
				/*console.log(x.target);
				console.log($(x.target));
				console.log($(x.target).parent());
				console.log($(x.target).parent().parent());
				console.log($(x.target).parent().parent().find("input"));
				console.log($(x.target).parent().parent().find("input").val());*/
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
