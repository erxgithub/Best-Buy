// carousel.js (Eric Gregor)

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

		$('.carousel-cell').remove();

		// insert new content

		for (let i = 0; i < this.result.products.length; i++)
		{
	  			this.product["productId"] = 'product' + (i+1).toString();
				this.product["item"] = this.result.products[i];

				$('.carousel').append('<div id="' + this.product["productId"] + '" class="carousel-cell"></div>');

				this.addProduct();
		}

		let elem = document.querySelector('.carousel');
		let flkty = new Flickity( elem, {
		  // options
		  cellAlign: 'left',
		  contain: true,
		  groupCells: 2
		});
	}

	addProduct () {
		// add product to carousel

		$('#' + this.product["productId"]).append('<p></p>');
		$('#' + this.product["productId"] + ' p:eq(0)').html(this.product["item"].manufacturer);
		$('#' + this.product["productId"]).append('<p></p>');
		$('#' + this.product["productId"] + ' p:eq(1)').html(this.product["item"].includedItemList[0].includedItem);
		$('#' + this.product["productId"]).append('<img />');
		$('#' + this.product["productId"] + ' img').attr("src", this.product["item"].largeImage);
		$('#' + this.product["productId"]).append('<p></p>');
		$('#' + this.product["productId"] + ' p:eq(2)').html('$' + this.product["item"].regularPrice);
		$('#' + this.product["productId"]).append('<button type="button" class="add-button" data-sku="'
			+ this.product["item"].sku + '" data-price="' + this.product["item"].regularPrice + '">ADD TO CART</button>');
	}
};

