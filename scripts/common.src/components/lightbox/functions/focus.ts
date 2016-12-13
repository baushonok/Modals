import {buttonPrevClickHandler, buttonNextClickHandler} from './handlers';
import {getPrevIndex, getNextIndex} from './getters';



export function setFocusedPreviewByIndex( index: number ): void
{
	if ( this.currentFocused )
	{
		this.currentFocused.classList.remove( 'focused' );
	}

	this.currentFocusedIndex = index;
	this.currentFocused = <HTMLLIElement>this.previewsList.children[this.currentFocusedIndex];
	this.currentFocused.classList.add( 'focused' );
}

export function switchFocusPrev(): void
{
	if ( this.isShown )
	{
		( buttonPrevClickHandler.bind( this ) )();
		return;
	}

	if ( !this.currentFocused )
	{
		this.setFocusedPreviewByIndex( 0 );
		return;
	}

	this.setFocusedPreviewByIndex(
		getPrevIndex( this.currentFocusedIndex, this.amountOfSlides )
	);
}

export function switchFocusNext(): void
{
	if ( this.isShown ) {
		( buttonNextClickHandler.bind( this ) )();
		return;
	}

	if ( !this.currentFocused )
	{
		this.setFocusedPreviewByIndex( 0 );
		return;
	}

	this.setFocusedPreviewByIndex(
		getNextIndex( this.currentFocusedIndex, this.amountOfSlides )
	);
}
