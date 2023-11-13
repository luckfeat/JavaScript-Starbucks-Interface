const searchEl = document.querySelector('.sub-menu__search');
const searchInputEl = searchEl.querySelector('input');
const menuEls = document.querySelectorAll('.main-menu__item');
const navEl = document.querySelector('.main-menu');

let clicked;
let timeoutId;
let isHidden = true;

function toggleContent(container) {
  if (isHidden) {
    requestAnimationFrame(() => {
      container.style.maxHeight = container.scrollHeight + 'px';
      isHidden = false;
    });
  } else {
    requestAnimationFrame(() => {
      container.style.maxHeight = '0';
      isHidden = true;
    });
  }
}

menuEls.forEach((menuEl) => {
  menuEl.addEventListener('mouseenter', () => {
    const contentsMenu = menuEl.querySelector('.contents__menu');
    contentsMenu.style.display = 'block';
    contentsMenu.style.maxHeight = contentsMenu.scrollHeight + 'px';
  });

  menuEl.addEventListener('mouseleave', () => {
    const contentsMenu = menuEl.querySelector('.contents__menu');
    contentsMenu.style.display = 'none';
    contentsMenu.style.maxHeight = '0';
  });
});

navEl.addEventListener('mouseleave', () => {
  menuEls.forEach((menuEl) => {
    const contentsMenu = menuEl.querySelector('.contents__menu');
    contentsMenu.style.display = 'block';
    contentsMenu.style.maxHeight = '0';
  });
});

/* Fix Search */

searchEl.addEventListener('click', () => {
  clicked ? searchInputEl.focus() : searchInputEl.blur();
  clicked = !clicked;
});

searchInputEl.addEventListener('focus', () => {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});

searchInputEl.addEventListener('blur', () => {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

const badgeEl = document.querySelector('header .badges');

let timerId;

window.addEventListener('scroll', () => {
  if (timerId) return;
  timerId = setTimeout(() => {
    if (window.scrollY > 400) {
      badgeEl.style.opacity = 0;
      setTimeout(() => {
        badgeEl.classList.add('badges-off');
      }, 400);
    } else {
      badgeEl.classList.remove('badges-off');
      setTimeout(() => {
        badgeEl.style.opacity = 1;
      }, 400);
    }
    timerId = !timerId;
  }, 400);
});

/* Scroll Event */
/* windown.scrollY 값을 계산하려고 했으나 디바이스의 크키마다 다르게 동작해 다른 방안을 찾음.... */

let favorite = document.querySelector('.favorite');

window.addEventListener('scroll', function () {});

/* End Here */

const fadeEls = document.querySelectorAll('.visual .fade-in');

fadeEls.forEach((el, index) => {
  const intervalID = setInterval(() => {
    el.style.opacity = '1';
    clearInterval(intervalID);
  }, index * 400);
});

const sliderContainer = document.querySelector('.swiper-container');
const slider = document.querySelector('.swiper-wrapper');
const firstChild = slider.firstElementChild;
const slides = document.querySelectorAll('.swiper-slide');

class Carousel {
  constructor(carouselElement) {
    this.carouselElement = carouselElement;
    this.slides = this.carouselElement.querySelectorAll('.swiper-wrapper a');
    this.slidesLength = this.slides.length;
    this.duplicate = this.slides[this.slidesLength - 1].cloneNode(true);
    this.current = 0;
    this.prev;
    this.init();
  }

  init() {
    slider.style.transform = `translate3d(0px, -62px, 0px)`;
    this.current = 0;
    this.prev = undefined;
    this.slides[this.current].classList.add('active');
    this.duplicate.style.opacity = '1';
    slider.prepend(this.duplicate);
  }

  slideUp() {
    const allUp = this.current >= this.slidesLength;
    const prevNotDefined = typeof this.prev !== 'undefined';

    if (prevNotDefined) {
      this.slides[this.prev].style.transform = ``;
    }

    if (allUp) {
      slider.style.transition = 'none';
      slider.style.transform = `translate3d(0px, 0px, 0px)`;
      this.current = 0;
      this.prev = undefined;
      setTimeout(() => {
        slider.style.transition = 'transform 0.3s ease';
      }, 0);
    }

    setTimeout(() => {
      this.slides[this.current].classList.add('active');
      slider.style.transform = `translate3d(0px, -${
        this.current * 62 + 62
      }px, 0px)`;
      this.prev = this.current;
      this.current++;
    }, 300);
  }
}

let verticalSlides = new Carousel(sliderContainer);

setInterval(() => {
  verticalSlides.slideUp();
}, 2000);

/* PROMOTION */

class PromotionCarousel {
  constructor() {
    this.init();
  }

  init() {
    this.carouselWrappper = document.querySelector(
      '.notice .promotion .carousel-wrapper'
    );
    this.carouselSlides =
      this.carouselWrappper.querySelectorAll('.carousel-slide');
    this.bullets = document.querySelectorAll('.carousel-pagination__bullets');
    this.previousCarouselLength = this.carouselSlides.length;
    this.carouselLength = this.carouselSlides.length;
    this.previousCount = 0;
    this.countMove = 0;
    this.delay = 5000;
    this.startSlide = 6;
    this.translateX;
    this.previousSlide = this.startSlide - 1;
    this.currentSlide = this.startSlide;

    for (let i = 0; i < 3; i++) {
      let duplicateSlide = this.carouselSlides[i].cloneNode(true);
      this.carouselWrappper.appendChild(duplicateSlide);
      this.carouselLength++;
    }

    for (let i = 4; i >= 0; i--) {
      let duplicateSlide = this.carouselSlides[i].cloneNode(true);
      this.carouselWrappper.prepend(duplicateSlide);
      this.carouselLength++;
    }

    /**
     * Carousel Slide 초기화
     */
    this.carouselSlides =
      this.carouselWrappper.querySelectorAll('.carousel-slide');
    this.carouselSlides[this.currentSlide].classList.add(
      'carousel-slide--active'
    );
    this.setFirst(this.startSlide);
  }

  resetTransition() {
    this.carouselWrappper.style.transition = 'none';
    this.carouselWrappper.style.transitionProperty = 'opacity';
    this.carouselWrappper.style.transitionDuration = '0.4s';
  }

  setFirst(startSlide) {
    this.carouselWrappper.style.transform = `translateX(${
      -829 * (this.startSlide - 1)
    }px)`;
    this.translateX = -829 * (this.startSlide - 1);
  }

  slideNext() {
    this.carouselWrappper.style.transition = 'transform 0.3s ease';

    if (this.countMove < this.previousCarouselLength) {
      this.translateX = this.translateX - 829;
      this.carouselWrappper.style.transform = `translateX(${this.translateX}px)`;
      this.bullets[
        this.countMove < 0 ? 5 + this.countMove : this.countMove
      ]?.classList.remove('carousel-pagination__bullets--active');
      this.countMove++;
      this.bullets[
        this.countMove < 0 ? 5 + this.countMove : this.countMove
      ]?.classList.add('carousel-pagination__bullets--active');
      this.previousSlide = this.currentSlide;
      this.currentSlide++;
      this.previousCount = this.countMove;
    }

    this.carouselSlides[this.previousSlide]?.classList.remove(
      'carousel-slide--active'
    );

    this.carouselSlides[this.currentSlide]?.classList.add(
      'carousel-slide--active'
    );

    if (this.countMove == this.previousCarouselLength) {
      this.carouselSlides[this.startSlide].classList.add(
        'carousel-slide--active'
      );
      this.remover = this.currentSlide;
      this.bullets[0]?.classList.add('carousel-pagination__bullets--active');
      setTimeout(() => {
        this.resetTransition();
        this.setFirst(this.startSlide);
        this.carouselSlides[this.remover].classList.remove(
          'carousel-slide--active'
        );
      }, 400);
      this.countMove = 0;
      this.previousCount = 0;
      this.previousSlide = this.startSlide - 1;
      this.currentSlide = this.startSlide;
    }
  }

  slidePrev() {
    this.carouselWrappper.style.transition = 'transform 0.3s ease';

    if (this.countMove < this.previousCarouselLength) {
      this.translateX = this.translateX + 829;
      this.carouselWrappper.style.transform = `translateX(${this.translateX}px)`;
      this.bullets[
        this.countMove < 0 ? 5 + this.countMove : this.countMove
      ]?.classList.remove('carousel-pagination__bullets--active');
      this.countMove--;
      console.log(this.countMove < 0 ? 5 + this.countMove : this.countMove);
      this.bullets[
        this.countMove < 0 ? 5 + this.countMove : this.countMove
      ]?.classList.add('carousel-pagination__bullets--active');
      this.previousSlide = this.currentSlide;
      this.currentSlide--;
    }

    this.carouselSlides[this.previousSlide]?.classList.remove(
      'carousel-slide--active'
    );

    this.carouselSlides[this.currentSlide]?.classList.add(
      'carousel-slide--active'
    );

    if (this.countMove == -this.previousCarouselLength) {
      this.carouselSlides[this.startSlide]?.classList.add(
        'carousel-slide--active'
      );
      this.remover = this.currentSlide;
      this.bullets[0]?.classList.add('carousel-pagination__bullets--active');
      setTimeout(() => {
        this.resetTransition();
        this.setFirst(this.startSlide);
        this.carouselSlides[this.remover].classList.remove(
          'carousel-slide--active'
        );
      }, 400);
      this.countMove = 0;
      this.previousSlide = this.startSlide - 1;
      this.currentSlide = this.startSlide;
      // this.previousBullet = 0;
      // this.currentBullet = 1;
    }
  }

  clickNext() {
    this.slideNext();
  }

  clickPrev() {
    this.slidePrev();
  }
}

const promoCarousel = new PromotionCarousel();
const nextBtn = document.querySelector('.carousel-next');
const prevBtn = document.querySelector('.carousel-prev');

nextBtn.addEventListener('click', () => {
  setTimeout(() => {
    promoCarousel.clickNext();
  }, 100);
});

prevBtn.addEventListener('click', () => {
  setTimeout(() => {
    promoCarousel.clickPrev();
  }, 100);
});

setInterval(() => {
  promoCarousel.slideNext();
  // promoCarousel.slidePrev();
}, promoCarousel.delay);

const promotionToggleBtn = document.querySelector('.toggle-promotion');
const promotionEl = document.querySelector('.promotion');
const paginationEl = document.querySelector('.carousel-pagination');
const expandBtn = document.querySelector('.toggle-promotion .material-icons');

let isHidePromotion = true;

promotionToggleBtn.addEventListener('click', () => {
  isHidePromotion = !isHidePromotion;
  if (isHidePromotion) {
    expandBtn.textContent = 'expand_more';
    promotionEl.style.height = '0';
    paginationEl.style.display = 'none';
  } else {
    expandBtn.textContent = 'expand_less';
    promotionEl.style.display = 'block';
    setTimeout(() => {
      promotionEl.style.height = '693px';
      setTimeout(() => {
        paginationEl.style.display = 'block';
      }, 400);
    }, 0);
  }
});

document.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});

const favText1 = document.querySelector('.favorite__text1');
const favText2 = document.querySelector('.favorite__text2');
const favBtn = document.querySelector('.favorite__btn a');

function callback(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      favText1.classList.add('show1');
      favText2.classList.add('show2');
      favBtn.classList.add('show');
    } else {
      favText1.classList.remove('show1');
      favText2.classList.remove('show2');
      favBtn.classList.remove('show');
    }
  });
}

let favoriteObserver = new IntersectionObserver(callback, {
  threshold: 0.2,
});

favoriteObserver.observe(favorite);

const season = document.querySelector('.season-product');
const seasonProduct = document.querySelector('.season-product__image');
const seasonText = document.querySelector('.season-product__text');

let seasonObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      seasonProduct.classList.add('show');
      seasonText.classList.add('show');
    }
  });
});

seasonObserver.observe(season);

const reserve = document.querySelector('.reserve');
const reserveImage = reserve.querySelector('.reserve-visual img');

let reserveObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      reserveImage.classList.add('show');
    }
  });
});

reserveObserver.observe(reserve);

const find = document.querySelector('.find-store');
const findImg1 = document.querySelector('.find-store__image1');
const findImg2 = document.querySelector('.find-store__image2');
const findTxt1 = document.querySelector('.find-store__text1');
const findTxt2 = document.querySelector('.find-store__text2');
const findBtn = document.querySelector('.find-store__btn');

let findObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      findImg1.classList.add('show');
      findImg2.classList.add('show');
      findTxt1.classList.add('show');
      findTxt2.classList.add('show');
      findBtn.classList.add('show');
    } else {
      findImg1.classList.remove('show');
      findImg2.classList.remove('show');
      findTxt1.classList.remove('show');
      findTxt2.classList.remove('show');
      findBtn.classList.remove('show');
    }
  });
});

findObserver.observe(find);
