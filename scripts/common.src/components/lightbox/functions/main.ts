declare var require: any;
var constants = require('../lightbox.constants');



/**
 * Open lightbox
 */
export function show(): void
{
	this.container.classList.add( constants.CLASS_LIGHTBOX_ACTIVE );

	if ( this.currentSlide )
	{
		this.currentSlide.classList.add( constants.CLASS_SLIDE_CURRENT );
	}

	this.isShown = true;

	document.documentElement.style.overflow = 'hidden';
}

/**
 * Close lightbox
 */
export function hide(): void
{
	this.container.classList.remove( constants.CLASS_LIGHTBOX_ACTIVE );

	document.documentElement.style.overflow = '';

	if ( this.currentSlide )
	{
		this.currentSlide.classList.remove( constants.CLASS_SLIDE_CURRENT );
		this.currentSlide = null;
	}

	this.isShown = false;
	this.setFocusedPreviewByIndex( this.currentIndex );
}
