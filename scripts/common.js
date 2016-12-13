!function e(t,i,s){function n(c,o){if(!i[c]){if(!t[c]){var u="function"==typeof require&&require;if(!o&&u)return u(c,!0);if(r)return r(c,!0);var d=new Error("Cannot find module '"+c+"'");throw d.code="MODULE_NOT_FOUND",d}var a=i[c]={exports:{}};t[c][0].call(a.exports,function(e){var i=t[c][1][e];return n(i?i:e)},a,a.exports,e,t,i,s)}return i[c].exports}for(var r="function"==typeof require&&require,c=0;c<s.length;c++)n(s[c]);return n}({1:[function(e,t,i){"use strict";var s=e("./functions/handlers"),n=e("./functions/focus"),r=e("./functions/creates"),c=e("./functions/main"),o=function(){function e(e,t,i){var n,r,c=this;if(this.isShown=!1,this.container=e,this.previewsList=t,this.lightboxesList=e.querySelector("ol"),this.slides=[],this.currentIndex=-1,this.currentSlide=null,this.currentFocused=null,this.currentFocusedIndex=0,this.amountOfSlides=t.childElementCount-1,this.srcMap=i,Array.prototype.forEach.call(t.querySelectorAll("li"),function(e,t){e.addEventListener("click",s.elementPreviewClickHandler.bind(c,t),!1)}),n=e.querySelector("button.close"),n&&n.addEventListener("click",s.buttonCloseClickHandler.bind(this),!1),r=e.querySelector(".controls")){var o=void 0,u=void 0;o=r.querySelector("button.prev"),o&&o.addEventListener("click",s.buttonPrevClickHandler.bind(this),!1),u=r.querySelector("button.next"),u&&u.addEventListener("click",s.buttonNextClickHandler.bind(this),!1)}document.addEventListener("keyup",s.documentKeyupHandler.bind(this))}return e.prototype.createLightbox=function(e,t,i){return r.createLightbox.bind(this)(e,t,i)},e.prototype.createNextSlide=function(e){return r.createNextSlide.bind(this)(e)},e.prototype.createPrevSlide=function(e){return r.createPrevSlide.bind(this)(e)},e.prototype.createNextAndPrevSlides=function(e){this.createNextSlide(e),this.createPrevSlide(e)},e.prototype.setFocusedPreviewByIndex=function(e){n.setFocusedPreviewByIndex.bind(this)(e)},e.prototype.switchFocusPrev=function(){n.switchFocusPrev.bind(this)()},e.prototype.switchFocusNext=function(){n.switchFocusNext.bind(this)()},e.prototype.show=function(){c.show.bind(this)()},e.prototype.hide=function(){c.hide.bind(this)()},e}();Object.defineProperty(i,"__esModule",{value:!0}),i.default=o},{"./functions/creates":2,"./functions/focus":3,"./functions/handlers":5,"./functions/main":6}],2:[function(e,t,i){"use strict";function s(e,t,i){var s,n,r,c,o,u;return s=t.querySelector("img"),n=t.querySelector("span"),r=s.getAttribute("src"),c=this.lightboxesList.children[e],o=document.createElement("IMG"),o.setAttribute("src",this.srcMap[r]),o.setAttribute("alt",""),u=document.createElement("SPAN"),u.textContent=n.textContent,c.appendChild(o),c.appendChild(u),i&&"function"==typeof i&&i(e,t),c}function n(e){var t;return t=c.getPrevIndex(e,this.amountOfSlides),this.slides[t]||(this.slides[t]=this.createLightbox(t,this.previewsList.children[t])),this.slides[t]}function r(e){var t;return t=c.getNextIndex(e,this.amountOfSlides),this.slides[t]||(this.slides[t]=this.createLightbox(t,this.previewsList.children[t])),this.slides[t]}var c=e("./getters");i.createLightbox=s,i.createPrevSlide=n,i.createNextSlide=r},{"./getters":4}],3:[function(e,t,i){"use strict";function s(e){this.currentFocused&&this.currentFocused.classList.remove(c.CLASS_PREVIEW_FOCUSED),this.currentFocusedIndex=e,this.currentFocused=this.previewsList.children[this.currentFocusedIndex],this.currentFocused.classList.add(c.CLASS_PREVIEW_FOCUSED)}function n(){return this.isShown?void o.buttonPrevClickHandler.bind(this)():this.currentFocused?void this.setFocusedPreviewByIndex(u.getPrevIndex(this.currentFocusedIndex,this.amountOfSlides)):void this.setFocusedPreviewByIndex(0)}function r(){return this.isShown?void o.buttonNextClickHandler.bind(this)():this.currentFocused?void this.setFocusedPreviewByIndex(u.getNextIndex(this.currentFocusedIndex,this.amountOfSlides)):void this.setFocusedPreviewByIndex(0)}var c=e("../lightbox.constants"),o=e("./handlers"),u=e("./getters");i.setFocusedPreviewByIndex=s,i.switchFocusPrev=n,i.switchFocusNext=r},{"../lightbox.constants":7,"./getters":4,"./handlers":5}],4:[function(e,t,i){"use strict";function s(e,t){return e?e-1:t}function n(e,t){return e===t?0:e+1}function r(e){var t;return t=e.previousElementSibling,t||(t=e.parentElement.lastElementChild),t}function c(e){var t;return t=e.nextElementSibling,t||(t=e.parentElement.firstElementChild),t}i.getPrevIndex=s,i.getNextIndex=n,i.getPrevSlide=r,i.getNextSlide=c},{}],5:[function(e,t,i){"use strict";function s(e,t){var i;i=t.currentTarget,this.slides[e]||(this.slides[e]=this.createLightbox(e,i,this.createNextAndPrevSlides.bind(this))),this.currentSlide=this.slides[e],this.currentIndex=e,this.show()}function n(e){var t;t=this.createPrevSlide(this.currentIndex),this.currentSlide.classList.remove(d.CLASS_SLIDE_CURRENT),this.currentSlide=t,this.currentSlide.classList.add(d.CLASS_SLIDE_CURRENT),this.currentIndex=a.getPrevIndex(this.currentIndex,this.amountOfSlides),this.createPrevSlide(this.currentIndex)}function r(e){var t;t=this.createNextSlide(this.currentIndex),this.currentSlide.classList.remove(d.CLASS_SLIDE_CURRENT),this.currentSlide=t,this.currentSlide.classList.add(d.CLASS_SLIDE_CURRENT),this.currentIndex=a.getNextIndex(this.currentIndex,this.amountOfSlides),this.createNextSlide(this.currentIndex)}function c(e){this.isShown||this.currentFocused.click()}function o(e){switch(e.keyCode){case d.KEY_ESC:this.hide();break;case d.KEY_LEFT_ARROW:this.switchFocusPrev();break;case d.KEY_RIGHT_ARROW:this.switchFocusNext();break;case d.KEY_ENTER:c.bind(this,e)()}}function u(e){this.hide()}var d=e("../lightbox.constants"),a=e("./getters");i.elementPreviewClickHandler=s,i.buttonPrevClickHandler=n,i.buttonNextClickHandler=r,i.keyEnterClickHandler=c,i.documentKeyupHandler=o,i.buttonCloseClickHandler=u},{"../lightbox.constants":7,"./getters":4}],6:[function(e,t,i){"use strict";function s(){this.container.classList.add(r.CLASS_LIGHTBOX_ACTIVE),this.currentSlide&&this.currentSlide.classList.add(r.CLASS_SLIDE_CURRENT),this.isShown=!0,document.documentElement.style.overflow="hidden"}function n(){this.container.classList.remove(r.CLASS_LIGHTBOX_ACTIVE),document.documentElement.style.overflow="",this.currentSlide&&(this.currentSlide.classList.remove(r.CLASS_SLIDE_CURRENT),this.currentSlide=null),this.isShown=!1,this.setFocusedPreviewByIndex(this.currentIndex)}var r=e("../lightbox.constants");i.show=s,i.hide=n},{"../lightbox.constants":7}],7:[function(e,t,i){"use strict";i.CLASS_LIGHTBOX_ACTIVE="active",i.CLASS_SLIDE_CURRENT="current",i.CLASS_PREVIEW_FOCUSED="focused",i.KEY_ESC=27,i.KEY_RIGHT_ARROW=39,i.KEY_LEFT_ARROW=37,i.KEY_ENTER=13},{}],8:[function(e,t,i){"use strict";function s(){var e,t;e=document.querySelector(".lightboxes"),t=document.querySelector(".previews"),new r.default(e,t,n)}var n=e("./srcMap"),r=e("./Lightbox");Object.defineProperty(i,"__esModule",{value:!0}),i.default=s},{"./Lightbox":1,"./srcMap":9}],9:[function(e,t,i){t.exports={"images/preview/image1_150.jpg":"images/image1.jpg","images/preview/image2_150.jpg":"images/image2.jpg","images/preview/image3_150.jpg":"images/image3.jpg","images/preview/image4_150.jpg":"images/image4.jpg","images/preview/image5_150.jpg":"images/image5.jpg","images/preview/image6_150.jpg":"images/image6.jpg","images/preview/image7_150.jpg":"images/image7.jpg","images/preview/image8_150.jpg":"images/image8.jpg","images/preview/image9_150.jpg":"images/image9.jpg","images/preview/image10_150.jpg":"images/image10.jpg","images/preview/image11_150.jpg":"images/image11.jpg","images/preview/image12_150.jpg":"images/image12.jpg","images/preview/image13_150.jpg":"images/image13.jpg","images/preview/image14_150.jpg":"images/image14.jpg","images/preview/image15_150.jpg":"images/image15.jpg","images/preview/image16_150.jpg":"images/image16.jpg"}},{}],10:[function(e,t,i){"use strict";var s=e("./components/lightbox/lightbox.init");s.default()},{"./components/lightbox/lightbox.init":8}]},{},[10]);
//# sourceMappingURL=common.js.map
