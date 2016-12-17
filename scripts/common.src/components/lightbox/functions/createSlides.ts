import {getPrevIndex, getNextIndex} from './getters';



/**
 * Create lightbox for current preview
 * @param {number} index - number of creating lightbox
 * @param {HTMLLIElement} previewElement - current preview element
 * @param {Function} callback
 * @returns {HTMLLIElement} - created lightbox
 */
export function createLightbox(
	index: number,
	previewElement: HTMLLIElement,
	callback?: Function ): HTMLLIElement
{
	let previewImage: HTMLImageElement;
	let previewContent: HTMLSpanElement;

	let previewSrc: string;
	var wrapper: HTMLLIElement;
	let image: HTMLImageElement;
	let content: HTMLSpanElement;

	previewImage = <HTMLImageElement>previewElement.querySelector( 'img' );
	previewContent = <HTMLSpanElement>previewElement.querySelector( 'span' );

	previewSrc = previewImage.getAttribute( 'src' );
	wrapper = <HTMLLIElement>this.lightboxesList.children[index];

	image = <HTMLImageElement>document.createElement( 'IMG' );
	image.setAttribute( 'src', this.srcMap[previewSrc] );
	image.setAttribute( 'alt', '' );

	content = <HTMLSpanElement>document.createElement( 'SPAN' );
	content.textContent = previewContent.textContent;

	wrapper.appendChild( image );
	wrapper.appendChild( content );

	if ( callback && typeof callback === 'function' )
	{
		callback( index, previewElement );
	}

	return wrapper;
}

/**
 * Create previous lightbox if it doesn't exist
 * @param {number} index - number of current lightbox
 * @returns {HTMLLIElement} - created lightbox
 */
export function createPrevSlide( index: number ): HTMLLIElement
{
	let prevIndex: number;

	prevIndex = getPrevIndex( index, this.amountOfSlides );

	if ( !this.slides[prevIndex] )
	{
		this.slides[prevIndex] = this.createLightbox( prevIndex, <HTMLLIElement>this.previewsList.children[prevIndex] );
	}

	return this.slides[prevIndex];
}

/**
 * Create next lightbox if it doesn't exist
 * @param {number} index - number of current lightbox
 * @returns {HTMLLIElement} - created lightbox
 */
export function createNextSlide( index: number ): HTMLLIElement
{
	let nextIndex: number;

	nextIndex = getNextIndex( index, this.amountOfSlides );

	if ( !this.slides[nextIndex] )
	{
		this.slides[nextIndex] = this.createLightbox( nextIndex, <HTMLLIElement>this.previewsList.children[nextIndex] );
	}

	return this.slides[nextIndex];
}
