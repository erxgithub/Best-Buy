import $ from "jquery";
import Wallop from 'Wallop';

export class Carousel {
	constructor (result) {
		this.product = [];
		this.result = result;

		console.log(this.result);
	}

	getProducts () {

		// remove any previously inserted content to make sure that it doesn't interfere with new content

		//let wallopCount = $('.Wallop-item').length;

		$('.Wallop-item').remove();

		// insert new content

		for (let i = 0; i < this.result.products.length; i++)
		{
	  			this.product["productId"] = 'product' + (i+1).toString();
				this.product["item"] = this.result.products[i];

				$('.Wallop-list').append('<div id="' + this.product["productId"] + '" class="Wallop-item"></div>');

				this.updateProduct();
		}
		
		//if (wallopCount == 0) {
			let wallopEl = document.querySelector('.Wallop');
			let wallop = new Wallop(wallopEl);
		//}

		//console.log(result);
	}

	updateProduct () {
		//$('#' + productId).addClass('product-box'); // add class to help identify inserted content
		$('#' + this.product["productId"]).append('<p></p>');
		$('#' + this.product["productId"] + ' p:eq(0)').html(this.product["item"].manufacturer);
		$('#' + this.product["productId"]).append('<p></p>');
		$('#' + this.product["productId"] + ' p:eq(1)').html(this.product["item"].includedItemList[0].includedItem);
		$('#' + this.product["productId"]).append('<img />');
		$('#' + this.product["productId"] + ' img').attr("src", this.product["item"].largeImage);
		$('#' + this.product["productId"]).append('<p></p>');
		$('#' + this.product["productId"] + ' p:eq(2)').html('$' + this.product["item"].regularPrice);
		$('#' + this.product["productId"]).append('<button type="button">Add to Cart</button>');
	}
};

