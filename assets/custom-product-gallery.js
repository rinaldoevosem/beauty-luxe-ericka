import { Component } from '@theme/component';

/**
 * @typedef {Object} CustomProductGalleryRefs
 * @property {HTMLElement} thumbsList
 * @property {HTMLButtonElement[]} thumbs
 * @property {HTMLElement} slidesList
 * @property {HTMLElement[]} slides
 * @property {HTMLButtonElement[]} [dots]
 * @property {HTMLButtonElement} [prevButton]
 * @property {HTMLButtonElement} [nextButton]
 * @property {HTMLElement} [counterCurrent]
 */

/** @extends {Component<CustomProductGalleryRefs>} */
class CustomProductGallery extends Component {
  #mediaCount = 0;
  #currentIndex = 0;
  #isMobile = false;
  #scrollListener = null;

  connectedCallback() {
    super.connectedCallback();
    this.#mediaCount = parseInt(this.dataset.mediaCount || '0', 10);
    this.#currentIndex = parseInt(this.dataset.currentIndex || '0', 10);
    this.#isMobile = window.matchMedia('(max-width: 749px)').matches;

    if (this.#isMobile && this.refs.slidesList) {
      this.#scrollListener = this.#handleScroll.bind(this);
      this.refs.slidesList.addEventListener('scroll', this.#scrollListener, { passive: true });
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.#scrollListener && this.refs.slidesList) {
      this.refs.slidesList.removeEventListener('scroll', this.#scrollListener);
    }
  }

  handleThumbClick(event, index) {
    const target = parseInt(index, 10);
    if (Number.isNaN(target)) return;
    this.#goTo(target);
  }

  handleDotClick(event, index) {
    const target = parseInt(index, 10);
    if (Number.isNaN(target)) return;
    this.#goTo(target);
  }

  handlePrev() {
    const next = (this.#currentIndex - 1 + this.#mediaCount) % this.#mediaCount;
    this.#goTo(next);
  }

  handleNext() {
    const next = (this.#currentIndex + 1) % this.#mediaCount;
    this.#goTo(next);
  }

  #goTo(index) {
    if (index < 0 || index >= this.#mediaCount) return;
    this.#currentIndex = index;
    this.dataset.currentIndex = String(index);

    this.#updateActiveSlide();
    this.#updateActiveThumb();
    this.#updateActiveDot();
    this.#updateCounter();

    if (this.#isMobile && this.refs.slides && this.refs.slides[index]) {
      this.refs.slides[index].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    }
  }

  #updateActiveSlide() {
    if (!this.refs.slides) return;
    this.refs.slides.forEach((slide, i) => {
      const isActive = i === this.#currentIndex;
      slide.classList.toggle('is-active', isActive);
      if (isActive) {
        slide.removeAttribute('aria-hidden');
      } else {
        slide.setAttribute('aria-hidden', 'true');
      }
    });
  }

  #updateActiveThumb() {
    if (!this.refs.thumbs) return;
    this.refs.thumbs.forEach((thumb, i) => {
      const isActive = i === this.#currentIndex;
      thumb.classList.toggle('is-active', isActive);
      if (isActive) {
        thumb.setAttribute('aria-current', 'true');
      } else {
        thumb.removeAttribute('aria-current');
      }
    });
  }

  #updateActiveDot() {
    if (!this.refs.dots) return;
    this.refs.dots.forEach((dot, i) => {
      const isActive = i === this.#currentIndex;
      dot.classList.toggle('is-active', isActive);
      if (isActive) {
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.removeAttribute('aria-current');
      }
    });
  }

  #updateCounter() {
    if (this.refs.counterCurrent) {
      this.refs.counterCurrent.textContent = String(this.#currentIndex + 1);
    }
  }

  #handleScroll() {
    if (!this.refs.slidesList) return;
    const list = this.refs.slidesList;
    /* Mobile slides are 80% width (peek of next slide visible). Use the actual
       slide element width so the index calculation matches the snap point. */
    const slide = this.refs.slides && this.refs.slides[0];
    const slideWidth = slide ? slide.getBoundingClientRect().width : list.clientWidth;
    if (slideWidth === 0) return;
    const newIndex = Math.round(list.scrollLeft / slideWidth);
    if (newIndex !== this.#currentIndex && newIndex >= 0 && newIndex < this.#mediaCount) {
      this.#currentIndex = newIndex;
      this.dataset.currentIndex = String(newIndex);
      this.#updateActiveThumb();
      this.#updateActiveDot();
      this.#updateCounter();
    }
  }
}

if (!customElements.get('custom-product-gallery')) {
  customElements.define('custom-product-gallery', CustomProductGallery);
}
