/**
 * Get previous index for list of previews
 * and for list of lightboxes as well
 * @param {number} current - current index
 * @param {number} amountOfSlides - amount of slides
 */
export function getPrevIndex( current: number, amountOfSlides: number ): number
{
	return current ? ( current - 1 ) : amountOfSlides;
}

/**
 * Get next index for list of previews
 * and for list of lightboxes as well
 * @param {number} current - current index
 * @param {number} amountOfSlides - amount of slides
 */
export function getNextIndex( current: number, amountOfSlides: number ): number
{
	return current === amountOfSlides ? 0 : ( current + 1 );
}

/**
 * Get previous lightbox
 * @param {HTMLLIElement} current - current lightbox
 * @returns {HTMLLIElement} - previous lightbox
 */
export function getPrevSlide( current: HTMLLIElement ): HTMLLIElement
{
	let prev: HTMLLIElement;

	prev = <HTMLLIElement>current.previousElementSibling;

	if( !prev )
	{
		prev = <HTMLLIElement>current.parentElement.lastElementChild;
	}

	return prev;
}

/**
 * Get next lightbox
 * @param {HTMLLIElement} current - current lightbox
 * @returns {HTMLLIElement} - next lightbox
 */
export function getNextSlide( current: HTMLLIElement ): HTMLLIElement
{
	let next: HTMLLIElement;

	next = <HTMLLIElement>current.nextElementSibling;

	if ( !next )
	{
		next = <HTMLLIElement>current.parentElement.firstElementChild;
	}

	return next;
}
