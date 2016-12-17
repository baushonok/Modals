declare var require: any;
var constants = require('../lightbox.constants');



function createLightboxesContainer( mainElement: HTMLElement ): HTMLOListElement
{
	let container: HTMLOListElement;

	container = <HTMLOListElement>document.createElement( 'ol' );
	mainElement.appendChild( container );

	return container;
}

function createLightboxesWrappers(
	container: HTMLOListElement,
 	amountOfElements: number ): void
{
	let index: number = 0;

	for ( index; index < amountOfElements; index++ )
	{
		let wrapper: HTMLLIElement;

		wrapper = <HTMLLIElement>document.createElement( 'li' );
		container.appendChild( wrapper );
	}
}

function createControls( mainElement: HTMLElement ): void
{
	let container: HTMLElement;
	let btnPrev: HTMLButtonElement;
	let btnNext: HTMLButtonElement;
	let btnClose: HTMLButtonElement;

	container = <HTMLElement>document.createElement( 'div' );
	container.classList.add( constants.CLASS_CONTROLS );
	mainElement.appendChild( container );

	btnPrev = <HTMLButtonElement>document.createElement( 'button' );
	btnPrev.setAttribute( 'type', 'button' );
	btnPrev.className = constants.CLASSNAME_BTN_PREV;
	btnPrev.textContent = 'Go to back';
	container.appendChild( btnPrev );

	btnNext = <HTMLButtonElement>document.createElement( 'button' );
	btnNext.setAttribute( 'type', 'button' );
	btnNext.className = constants.CLASSNAME_BTN_NEXT;
	btnNext.textContent = 'Go to next';
	container.appendChild( btnNext );

	btnClose = <HTMLButtonElement>document.createElement( 'button' );
	btnClose.setAttribute( 'type', 'button' );
	btnClose.className = constants.CLASSNAME_BTN_CLOSE;
	btnClose.textContent = 'Close';
	mainElement.appendChild( btnClose );
}

export function createElements(  mainElement: HTMLElement, amount: number ): void
{
	let container: HTMLOListElement;

	container = createLightboxesContainer( mainElement );
	createLightboxesWrappers( container, amount );
	createControls( mainElement );
}
