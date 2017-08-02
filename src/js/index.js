/*import Cart from "./cart";*/
import $ from "jquery";

import request from "./bestbuy";
import {Carousel} from "./carousel";

export default class App {
	constructor(){
		this.baseUrl = 'https://api.bestbuy.com/v1/products';
		this.apiKey = '8ccddf4rtjz5k5btqam84qak';

		//this.initBBCall();
		//let x = this.initBBCall();

		$(".nav-item").on("click", (x) => {
			this.initBBCall();
			console.log("click");
		});
	}

	getUrl (category) {
		let categoryId = 'abcat0502000';
		let url = `${this.baseUrl}((categoryPath.id=${categoryId}))`;

		return url;
	}
	
	initBBCall () {
		//console.log(this.getUrl("laptop"));

		request({url: this.getUrl('laptop'), api: this.apiKey})
			.then(data => {
				/* fill carousel with products */
				//console.log(data);
				//let y = new Carousel;
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
