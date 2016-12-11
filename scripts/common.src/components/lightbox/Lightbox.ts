/* Classes for states */
const CLASS_LIGHTBOX_ACTIVE: string = 'active';
const CLASS_SLIDE_CURRENT: string = 'current';

/* Key codes */
const KEY_ESC: number = 27;
const KEY_RIGHT_ARROW: number = 39;
const KEY_LEFT_ARROW: number = 37;
const KEY_ENTER: number = 13;



export default class Lightbox
{
    private boundDocumentKeyupHandler: ( event: KeyboardEvent ) => void;
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
        this.boundDocumentKeyupHandler = ( this.documentKeyupHandler.bind( this ) );
        this.amountOfSlides = previewsList.childElementCount - 1;
        this.srcMap = srcMap;

        Array.prototype.forEach.call(
            previewsList.querySelectorAll( 'li' ),
            ( item: HTMLLIElement, index: number ) =>
            {
                item.addEventListener(
                    'click',
                    this.elementPreviewClickHandler.bind(
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
                buttonPrev.addEventListener( 'click', this.buttonPrevClickHandler.bind( this ), false );
            }

            buttonNext = <HTMLButtonElement>controls.querySelector( 'button.next' );

            if ( buttonNext )
            {
                buttonNext.addEventListener( 'click', this.buttonNextClickHandler.bind( this ), false );
            }
        }

        document.addEventListener( 'keyup', this.boundDocumentKeyupHandler );
    }

    /**
     * Get next index for list of previews
     * and for list of lightboxes as well
     * @param {number} current - current index
     */
    private getNextIndex( current: number ): number
    {
        return current === this.amountOfSlides ? 0 : ( current + 1 );
    }

    /**
     * Get previous index for list of previews
     * and for list of lightboxes as well
     * @param {number} current - current index
     */
    private getPrevIndex( current: number ): number
    {
        return current ? ( current - 1 ) : this.amountOfSlides;
    }

    /**
     * Get previous lightbox
     * @param {HTMLLIElement} current - current lightbox
     * @returns {HTMLLIElement} - previous lightbox
     */
    private getPrevSlide( current: HTMLLIElement ): HTMLLIElement
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
    private getNextSlide( current: HTMLLIElement ): HTMLLIElement
    {
        let next: HTMLLIElement;

        next = <HTMLLIElement>current.nextElementSibling;

        if ( !next )
        {
            next = <HTMLLIElement>current.parentElement.firstElementChild;
        }

        return next;
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

        nextIndex = this.getNextIndex( index );

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

        prevIndex = this.getPrevIndex( index );

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
        if ( this.currentFocused )
        {
            this.currentFocused.classList.remove( 'focused' );
        }

        this.currentFocusedIndex = index;
        this.currentFocused = <HTMLLIElement>this.previewsList.children[this.currentFocusedIndex];
        this.currentFocused.classList.add( 'focused' );
    }

    private switchFocusPrev(): void
    {
        if ( this.isShown )
        {
            this.buttonPrevClickHandler();
            return;
        }

        if ( !this.currentFocused )
        {
            this.setFocusedPreviewByIndex( 0 );
            return;
        }

        this.setFocusedPreviewByIndex(
            this.getPrevIndex( this.currentFocusedIndex )
        );
    }

    private switchFocusNext(): void
    {
        if ( this.isShown ) {
            this.buttonNextClickHandler();
            return;
        }

        if ( !this.currentFocused )
        {
            this.setFocusedPreviewByIndex( 0 );
            return;
        }

        this.setFocusedPreviewByIndex(
            this.getNextIndex( this.currentFocusedIndex )
        );
    }



	/**
     *
     * @param {number} index - number of current preview element
     * @param {Event} event
     */
    private elementPreviewClickHandler( index: number, event: Event ): void
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

    private buttonPrevClickHandler( event?: Event ): void
    {
        let prev: HTMLLIElement;

        prev = this.createPrevSlide( this.currentIndex );

        this.currentSlide.classList.remove( CLASS_SLIDE_CURRENT );
        this.currentSlide = prev;
        this.currentSlide.classList.add( CLASS_SLIDE_CURRENT );
        this.currentIndex = this.getPrevIndex( this.currentIndex );

        // preload
        this.createPrevSlide( this.currentIndex );
    }

    private buttonNextClickHandler( event?: Event ): void
    {
        let next: HTMLLIElement;

        next = this.createNextSlide( this.currentIndex );

        this.currentSlide.classList.remove( CLASS_SLIDE_CURRENT );
        this.currentSlide = next;
        this.currentSlide.classList.add( CLASS_SLIDE_CURRENT );
        this.currentIndex = this.getNextIndex( this.currentIndex );

        // preload
        this.createNextSlide( this.currentIndex );
    }

    private keyEnterClickHandler( event: KeyboardEvent ): void
    {
        if ( !this.isShown )
        {
            this.currentFocused.click();
        }
    }



    /**
     * Open lightbox
     */
    public show(): void
    {
        this.container.classList.add( CLASS_LIGHTBOX_ACTIVE );

        if ( this.currentSlide )
        {
            this.currentSlide.classList.add( CLASS_SLIDE_CURRENT );
        }

        this.isShown = true;

        document.documentElement.style.overflow = 'hidden';
    }

    /**
     * Close lightbox
     */
    public hide(): void
    {
        this.container.classList.remove( CLASS_LIGHTBOX_ACTIVE );

        document.documentElement.style.overflow = '';

        if ( this.currentSlide )
        {
            this.currentSlide.classList.remove( CLASS_SLIDE_CURRENT );
            this.currentSlide = null;
        }

        this.isShown = false;
        this.setFocusedPreviewByIndex( this.currentIndex );
        //document.removeEventListener( 'keyup', this.boundDocumentKeyupHandler );
    }

    private buttonCloseClickHandler( event: Event ): void
    {
        this.hide()
    }

    private documentKeyupHandler( event: KeyboardEvent ): void
    {
        switch (event.keyCode) {
            case KEY_ESC:
                this.hide();
                break;
            case KEY_LEFT_ARROW:
                this.switchFocusPrev();
                break;
            case KEY_RIGHT_ARROW:
                this.switchFocusNext();
                break;
            case KEY_ENTER:
                this.keyEnterClickHandler( event );
                break;
            default:
                break;
        }
    }
}
