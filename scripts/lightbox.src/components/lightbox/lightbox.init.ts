declare var require: any;
var srcMap = require('./srcMap');

import Lightbox from './Lightbox';



export default function init(): void
{
	let lightboxesContainer: HTMLElement;
	let images: HTMLOListElement;

	lightboxesContainer = <HTMLElement>document.querySelector( '.lightboxes' );
	images = <HTMLOListElement>document.querySelector( '.previews' );

	new Lightbox( lightboxesContainer, images, srcMap );
}
