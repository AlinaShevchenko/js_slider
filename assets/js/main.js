(function (time) {

  const container = document.querySelector('#carousel');
  const slides = document.querySelectorAll('.slide');
  const indicatorsContainer = document.querySelector('#indicators-container');
  const indicators = document.querySelectorAll('.indicator');
  const pauseButton = document.querySelector('#pause-btn');
  const prevButton = document.querySelector('#prev-btn');
  const nextButton = document.querySelector('#next-btn');

  let currentSlide = 0;
  let slidesCount = slides.length;
  let interval = time;
  let timerID = null;
  let isPlaying = true;
  let swipeStartX = null;
  let swipeEndX = null;

  const CODE_SPACE = 'Space';
  const CODE_LEFT_ARROW = 'ArrowLeft';
  const CODE_RIGHT_ARROW = 'ArrowRight';
  const FA_PAUSE = '<i class="far fa-pause-circle"></i>';
  const FA_PLAY = '<i class="far fa-play-circle"></i>';

  function gotoSlide(n) {
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
    currentSlide = (n + slidesCount) % slidesCount ;
    indicators[currentSlide].classList.toggle('active');
    slides[currentSlide].classList.toggle('active');
  }

  function nextSlide() {
    gotoSlide(currentSlide + 1)
  }

  function prevSlide() {
    gotoSlide(currentSlide - 1)
  }

  function pause() {
    if (isPlaying) {
      clearInterval(timerID);
      isPlaying = false;
      pauseButton.innerHTML = FA_PLAY;
    }
  }

  function play () {
    timerID = setInterval(nextSlide, interval);
    isPlaying = true;
    pauseButton.innerHTML = FA_PAUSE;
  }

  function pausePlay() {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  function next() {
    pause();
    nextSlide();
  }

  function prev() {
    pause();
    prevSlide();
  }

  function indicate(e) {
    const target = e.target;
    if (target && target.classList.contains('indicator')) {
      pause();
      gotoSlide(+target.dataset.slideTo);
    }
  }

  function pressKey(e) {
    if (e.code === CODE_LEFT_ARROW) prev();
    if (e.code === CODE_RIGHT_ARROW) next();
    if (e.code === CODE_SPACE) pausePlay();
  }

  function swipeStart(e) {
    swipeStartX = e.changedTouches[0].pageX;
  }

  function swipeEnd(e) {
    swipeEndX = e.changedTouches[0].pageX;
    if (swipeStartX - swipeEndX > 100) next();
    if (swipeStartX - swipeEndX < -100) prev();
  }

  function initListeners() {
    pauseButton.addEventListener('click', pausePlay);
    prevButton.addEventListener('click', prev);
    nextButton.addEventListener('click', next);
    indicatorsContainer.addEventListener('click', indicate);
    document.addEventListener('keydown', pressKey);
    container.addEventListener('touchstart', swipeStart);
    container.addEventListener('touchend', swipeEnd);
  }

  function init() {
    initListeners()
    timerID = setInterval(nextSlide, interval);
  }

  init();

}(3000));