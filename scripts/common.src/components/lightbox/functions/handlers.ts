declare var require: any;
var constants = require('../lightbox.constants');

import {getPrevIndex, getNextIndex} from './getters';



/* index - number of current preview element */
export function elementPreviewClickHandler( index: number, event: Event ): void
{
	let previewElement: HTMLLIElement;

	previewElement = <HTMLLIElement>event.currentTarget;

	if ( !this.slides[index] ) {
		this.slides[index] = this.createLightbox( index, previewElement, this.createNextAndPrevSlides.bind(this) );
	}

	this.currentSlide = this.slides[index];
	this.currentIndex = index;
	this.show();
}

export function buttonPrevClickHandler( event?: Event ): void
{
	let prev: HTMLLIElement;

	prev = this.createPrevSlide( this.currentIndex );

	this.currentSlide.classList.remove( constants.CLASS_SLIDE_CURRENT );
	this.currentSlide = prev;
	this.currentSlide.classList.add( constants.CLASS_SLIDE_CURRENT );
	this.currentIndex = getPrevIndex( this.currentIndex, this.amountOfSlides );

	// preload
	this.createPrevSlide( this.currentIndex );
}

export function buttonNextClickHandler( event?: Event ): void
{
	let next: HTMLLIElement;

	next = this.createNextSlide( this.currentIndex );

	this.currentSlide.classList.remove( constants.CLASS_SLIDE_CURRENT );
	this.currentSlide = next;
	this.currentSlide.classList.add( constants.CLASS_SLIDE_CURRENT );
	this.currentIndex = getNextIndex( this.currentIndex, this.amountOfSlides );

	// preload
	this.createNextSlide( this.currentIndex );
}

export function keyEnterClickHandler( event: KeyboardEvent ): void
{
	if ( !this.isShown )
	{
		this.currentFocused.click();
	}
}

export function documentKeyupHandler( event: KeyboardEvent ): void
{
	switch ( event.keyCode ) {
		case constants.KEY_ESC:
			this.hide();
			break;
		case constants.KEY_LEFT_ARROW:
			this.switchFocusPrev();
			break;
		case constants.KEY_RIGHT_ARROW:
			this.switchFocusNext();
			break;
		case constants.KEY_ENTER:
			( keyEnterClickHandler.bind( this, event ) )();
			break;
		default:
			break;
	}
}
