class Carousel {
  constructor(containerID = '#carousel', slideID = '.slide') {
    this.container = document.querySelector(containerID);
    this.slides = document.querySelectorAll(slideID);
  
    this.interval = 2000;
  }

  _initProps() { 
    this.currentSlide = 0;
    this.slidesCount = this.slides.length;
    this.isPlaying = true;
  
    this.CODE_SPACE = 'Space';
    this.CODE_LEFT_ARROW = 'ArrowLeft';
    this.CODE_RIGHT_ARROW = 'ArrowRight';
    this.FA_PAUSE = '<i class="far fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="far fa-play-circle"></i>';
    this.FA_PREV = '<i class="fas fa-angle-left"></i>';
    this.FA_NEXT = '<i class="fas fa-angle-right"></i>';
    }
  
  _initControls() {
    const controls = document.createElement('div');
    const PAUSE =`<span id="pause-btn" class="control control-pause">${this.FA_PAUSE}</span>`;
    const PREV =`<span id="prev-btn" class="control control-prev">${this.FA_PREV}</span>`;
    const NEXT =`<span id="next-btn" class="control control-next">${this.FA_NEXT}</span>`;

    controls.setAttribute('class', 'controls');
    controls.innerHTML = PAUSE + PREV + NEXT;

    this.container.appendChild(controls);


    this.pauseButton = document.querySelector('#pause-btn');
    this.prevButton = document.querySelector('#prev-btn');
    this.nextButton = document.querySelector('#next-btn');
  }

  _initIndicators() {
    const indicators = document.createElement('ol');

    indicators.setAttribute('class', 'indicators');

    for(let i = 0, n = this.slidesCount; i < n; i++) {
      const indicator = document.createElement('li');

      indicator.setAttribute('class', 'indicator');
      indicator.dataset.slideTo = `${i}`;
      if (i === 0) indicator.classList.add('active');
      indicators.appendChild(indicator);
    }

    this.container.appendChild(indicators);

    this.indContainer = this.container.querySelector('.indicators');
    this.indItems = this.container.querySelectorAll('.indicator');
  }

  _initListeners() {
    this.pauseButton.addEventListener('click', this.pausePlay.bind(this));
    this.prevButton.addEventListener('click', this.prev.bind(this));
    this.nextButton.addEventListener('click', this.next.bind(this));
    this.indContainer.addEventListener('click', this._indicate.bind(this));
    document.addEventListener('keydown', this.pressKey.bind(this));
  }

  _gotoSlide(n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indItems[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.slidesCount) % this.slidesCount ;
    this.indItems[this.currentSlide].classList.toggle('active');
    this.slides[this.currentSlide].classList.toggle('active');
  }

  _gotoNext() {
    this._gotoSlide(this.currentSlide + 1);
  }

  _gotoPrev() {
    this._gotoSlide(this.currentSlide - 1);
  }

  _indicate(e) {
    const target = e.target;
    if (target && target.classList.contains('indicator')) {
      this._pause();
      this._gotoSlide(+target.dataset.slideTo);
    }
  }

  _pause() {
    if (this.isPlaying) {
      clearInterval(this.timerID);
      this.isPlaying = false;
      this.pauseButton.innerHTML = this.FA_PLAY;
    }
  }

  _play () {
    this.timerID = setInterval(() => this._gotoNext(), this.interval);
    this.isPlaying = true;
    this.pauseButton.innerHTML = this.FA_PAUSE;
  }

  pausePlay() {
    if (this.isPlaying) this._pause();
    else this._play();
  }

  next() {
    this._pause();
    this._gotoNext();
  }

  prev() {
    this._pause();
    this._gotoPrev();
  }

  pressKey(e) {
    if (e.code === this.CODE_LEFT_ARROW) this.prev();
    if (e.code === this.CODE_RIGHT_ARROW) this.next();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  }

  init() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this.timerID = setInterval(() => this._gotoNext(), this.interval);
  }
}



