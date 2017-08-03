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
		this.cartEventListen();
		this.categoryEventListen();
		this.buttonEventListen();

		this.updateItemCount();
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

	cartEventListen () {
		$(".cart-desktop").on("click", (x) => {
			console.log("cart click");

			let skuKey = "";
			let item = null;
			let cartObj = null;
			let lineNo = "";

			$('.modal-item').remove();

			for (let i = 0; i < sessionStorage.length; i++)
			{
				skuKey = sessionStorage.key(i);

				item = sessionStorage.getItem(skuKey);
				cartObj = JSON.parse(item);

		  		lineNo = 'line' + (i+1).toString();

				$('.modal-body').append('<div id="' + lineNo + '" class="modal-item flex"><div>' + "SKU : " + skuKey + "</div><div>PRICE : $" + cartObj.price + "</div><div>QUANTITY : " + cartObj.qty + "</div><div>TOTAL : $" + cartObj.total + '</div></div>');

				console.log("sku: " + skuKey + ", price: " + cartObj.price + ", qty: " + cartObj.qty + ", total: " + cartObj.total);
			}

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
		});
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

	updateItemCount () {
		let skuKey = "";
		let item = null;
		let cartObj = null;
		let itemCount = 0;

		for (let i = 0; i < sessionStorage.length; i++)
		{
			skuKey = sessionStorage.key(i);

			item = sessionStorage.getItem(skuKey);
			cartObj = JSON.parse(item);

			itemCount += cartObj.qty;
		}

		if (itemCount > 0) {
			let x = document.getElementById("itemCount");

			if (x.style.display != "block") {
				x.style.display = "block";
			}

			x.textContent = itemCount.toString();
		}
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
