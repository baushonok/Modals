declare var require: any;
var constants = require('./lightbox.constants');

import {elementPreviewClickHandler, buttonPrevClickHandler, buttonNextClickHandler, keyEnterClickHandler, documentKeyupHandler} from './functions/handlers';
import {getPrevIndex, getNextIndex} from './functions/getters';
import {setFocusedPreviewByIndex, switchFocusPrev, switchFocusNext} from './functions/focus';


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
        this.lightboxesList = <HTMLOListElement>container.querySelector( 'ol' );
        this.slides = [];
        this.currentIndex = -1;
        this.currentSlide = null;
        this.currentFocused = null;
        this.currentFocusedIndex = 0;
        this.amountOfSlides = previewsList.childElementCount - 1;
        this.srcMap = srcMap;

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
            buttonClose.addEventListener( 'click', this.buttonCloseClickHandler.bind( this ), false );
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
    private createLightbox( index: number, previewElement: HTMLLIElement, callback?: Function ): HTMLLIElement
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
     * Create next lightbox if it doesn't exist
     * @param {number} index - number of current lightbox
     * @returns {HTMLLIElement} - created lightbox
     */
    private createNextSlide( index: number ): HTMLLIElement
    {
        let nextIndex: number;

        nextIndex = getNextIndex( index, this.amountOfSlides );

        if ( !this.slides[nextIndex] )
        {
            this.slides[nextIndex] = this.createLightbox( nextIndex, <HTMLLIElement>this.previewsList.children[nextIndex] );
        }

        return this.slides[nextIndex];
    }

    /**
     * Create previous lightbox if it doesn't exist
     * @param {number} index - number of current lightbox
     * @returns {HTMLLIElement} - created lightbox
     */
    private createPrevSlide( index: number ): HTMLLIElement
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
    public hide(): void
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

    private buttonCloseClickHandler( event: Event ): void
    {
        this.hide()
    }
}
