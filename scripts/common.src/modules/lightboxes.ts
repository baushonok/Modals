import Lightbox from '../classes/Lightbox';

/**
 * Инициализация
 */
export default function init(): void
{
	let lightboxesContainer: HTMLElement;
	let images: HTMLOListElement;

	lightboxesContainer = <HTMLElement>document.querySelector( '.lightboxes' );
	images = <HTMLOListElement>document.querySelector( '.previews' );

	new Lightbox( lightboxesContainer, images );
}
