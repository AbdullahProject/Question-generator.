let mainSliderSelector = '.main-slider',
    navSliderSelector = '.nav-slider',
    interleaveOffset = 0.5;

let mainSliderOptions = {
  loop: true,
  speed: 1000,
  autoplay: { delay: 3000 },
  loopAdditionalSlides: 10,
  grabCursor: true,
  watchSlidesProgress: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  on: {
    init: function() {
      this.autoplay.stop();
    },
    imagesReady: function() {
      this.el.classList.remove('loading');
      this.autoplay.start();
    },
    slideChangeTransitionEnd: function() {
      let swiper = this;
      let captions = swiper.el.querySelectorAll('.caption');
      captions.forEach(caption => caption.classList.remove('show'));
      swiper.slides[swiper.activeIndex].querySelector('.caption').classList.add('show');
    },
    progress: function() {
      let swiper = this;
      swiper.slides.forEach((slide) => {
        let slideProgress = slide.progress;
        let innerOffset = swiper.width * interleaveOffset;
        let innerTranslate = slideProgress * innerOffset;
        slide.querySelector(".slide-bgimg").style.transform = `translateX(${innerTranslate}px)`;
      });
    },
    touchStart: function() {
      this.slides.forEach((slide) => {
        slide.style.transition = "";
      });
    },
    setTransition: function(speed) {
      this.slides.forEach((slide) => {
        slide.style.transition = `${speed}ms`;
        slide.querySelector(".slide-bgimg").style.transition = `${speed}ms`;
      });
    }
  }
};
let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);

let navSliderOptions = {
  loop: true,
  loopAdditionalSlides: 10,
  speed: 1000,
  spaceBetween: 5,
  slidesPerView: 5,
  centeredSlides: true,
  touchRatio: 0.2,
  slideToClickedSlide: true,
  direction: 'vertical',
  on: {
    imagesReady: function() {
      this.el.classList.remove('loading');
    },
    click: function() {
      mainSlider.autoplay.stop();
    }
  }
};
let navSlider = new Swiper(navSliderSelector, navSliderOptions);

mainSlider.controller.control = navSlider;
navSlider.controller.control = mainSlider;
