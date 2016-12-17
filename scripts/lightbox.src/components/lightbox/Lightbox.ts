import {elementPreviewClickHandler, buttonPrevClickHandler, buttonNextClickHandler, keyEnterClickHandler, documentKeyupHandler, buttonCloseClickHandler} from './functions/handlers';
import {getPrevIndex, getNextIndex} from './functions/getters';
import {setFocusedPreviewByIndex, switchFocusPrev, switchFocusNext} from './functions/focus';
import {createLightbox, createPrevSlide, createNextSlide} from './functions/createSlides';
import {createElements} from './functions/createElements';
import {show, hide} from './functions/behaviour';



export default class Lightbox
{
    private isShown: boolean;

    /**
    * Main element
    * @type {HTMLElement}
    */
    private container: HTMLElement;
    /**
     * Array of lightboxes
     * @type {HTMLLIElement[]}
     */
    private slides: HTMLLIElement[];

    private previewsList: HTMLOListElement;
    private lightboxesList: HTMLOListElement;

    private currentIndex: number;
    private currentSlide: HTMLLIElement;

    private currentFocused: HTMLLIElement;
    private currentFocusedIndex: number;
    private amountOfSlides: number;
    private srcMap: any;

    /**
     * Constructor
     * @param {HTMLElement} container - wrapper for list of lightboxes
     * @param {HTMLOListElement} previewsList - list of previews
     * @param {any} srcMap - config for comparison of srcs
     */
    public constructor(
        container: HTMLElement,
        previewsList: HTMLOListElement,
        srcMap: any
    )
    {
        let buttonClose: HTMLElement;
        let controls: HTMLElement;

        this.isShown = false;
        this.container = container;
        this.previewsList = previewsList;
        this.slides = [];
        this.currentIndex = -1;
        this.currentSlide = null;
        this.currentFocused = null;
        this.currentFocusedIndex = 0;
        this.amountOfSlides = previewsList.childElementCount - 1;
        this.srcMap = srcMap;

        createElements( container, this.amountOfSlides + 1 );

        this.lightboxesList = <HTMLOListElement>container.querySelector( 'ol' );

        Array.prototype.forEach.call(
            previewsList.querySelectorAll( 'li' ),
            ( item: HTMLLIElement, index: number ) =>
            {
                item.addEventListener(
                    'click',
                    elementPreviewClickHandler.bind(
                        this,
                        index
                    ),
                    false );
            }
        );

        buttonClose = <HTMLButtonElement>container.querySelector( 'button.close' );

        if ( buttonClose )
        {
            buttonClose.addEventListener( 'click', buttonCloseClickHandler.bind( this ), false );
        }

        controls = <HTMLElement>container.querySelector( '.controls' );

        if ( controls )
        {
            let buttonPrev: HTMLButtonElement;
            let buttonNext: HTMLButtonElement;

            buttonPrev = <HTMLButtonElement>controls.querySelector( 'button.prev' );

            if ( buttonPrev )
            {
                buttonPrev.addEventListener( 'click', buttonPrevClickHandler.bind( this ), false );
            }

            buttonNext = <HTMLButtonElement>controls.querySelector( 'button.next' );

            if ( buttonNext )
            {
                buttonNext.addEventListener( 'click', buttonNextClickHandler.bind( this ), false );
            }
        }

        document.addEventListener( 'keyup', documentKeyupHandler.bind( this ) );
    }



    /**
     * Create lightbox for current preview
     * @param {number} index - number of creating lightbox
     * @param {HTMLLIElement} previewElement - current preview element
     * @param {Function} callback
     * @returns {HTMLLIElement} - created lightbox
     */
    private createLightbox(
        index: number,
        previewElement: HTMLLIElement,
        callback?: Function ): HTMLLIElement
    {
        return createLightbox.bind( this )( index, previewElement, callback );
    }

    /**
     * Create next lightbox if it doesn't exist
     * @param {number} index - number of current lightbox
     * @returns {HTMLLIElement} - created lightbox
     */
    private createNextSlide( index: number ): HTMLLIElement
    {
        return createNextSlide.bind( this )( index );
    }

    /**
     * Create previous lightbox if it doesn't exist
     * @param {number} index - number of current lightbox
     * @returns {HTMLLIElement} - created lightbox
     */
    private createPrevSlide( index: number ): HTMLLIElement
    {
        return createPrevSlide.bind( this )( index );
    }

    /**
     * Create previous and next lightbox if they don't exist
     * @param {number} index - number of current lightbox
     */
    private createNextAndPrevSlides( index: number ): void
    {
        this.createNextSlide( index );
        this.createPrevSlide( index );
    }



    private setFocusedPreviewByIndex( index: number ): void
    {
        setFocusedPreviewByIndex.bind( this )( index );
    }

    private switchFocusPrev(): void
    {
        switchFocusPrev.bind( this )();
    }

    private switchFocusNext(): void
    {
        switchFocusNext.bind( this )();
    }



    /**
     * Open lightbox
     */
    public show(): void
    {
        show.bind( this )();
    }

    /**
     * Close lightbox
     */
    public hide(): void
    {
        hide.bind( this )();
    }
}
