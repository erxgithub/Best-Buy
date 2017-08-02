import $ from "jquery";
import Flickity from 'flickity';

export class Carousel {
	constructor (result) {
		this.product = [];
		this.result = result;

		console.log(this.result);
	}

	getProducts () {

		// remove any previously inserted content to make sure that it doesn't interfere with new content

		//if ($('.carousel-cell').length > 0) {
		//	var $carousel = $('.carousel').flickity();
		//	$carousel.flickity('destroy');
		//}

		//$('.carousel-cell').remove();
		//let y = $('.carousel').flickity();
		//y.flickity('destroy');

		// insert new content

		for (let i = 0; i < this.result.products.length; i++)
		{
	  			this.product["productId"] = 'product' + (i+1).toString();
				this.product["item"] = this.result.products[i];

				$('.carousel').append('<div id="' + this.product["productId"] + '" class="carousel-cell"></div>');

				this.updateProduct();
		}

		let elem = document.querySelector('.carousel');
		//let flkty = new Flickity(elem);
		let flkty = new Flickity( elem, {
		  // options
		  cellAlign: 'left',
		  contain: true
		});

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
		$('#' + this.product["productId"]).append('<button type="button" class="cart-button" data-sku="'
			+ this.product["item"].sku + '" data-price="' + this.product["item"].regularPrice + '">Add to Cart</button>');
	}
};

