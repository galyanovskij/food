function slider() {
    // Slider

    const slides = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slidesWrapper).width; // знаходимо значення ширини блока слайдера
    let slideIndex = 1;
    let offset = 0; //параметр зміщеннян слайдера

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
      } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
      }

    slidesField.style.width = 100 * slides.length + '%'; // ширина всіх фото
    slidesField.style.display = 'flex' ;
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';
    // робимо всі слайди однакової ширини
    slides.forEach(slide =>{
    slide.style.width = width;
    });

    slider.style.position = 'relative';
    // створюємо індикатори стайдів
    const indicators = document.createElement('ol'), //створюємо список
        dots = []; // масив для індикаторів
    indicators.classList.add('carousel-indicators');
      indicators.style.cssText = ` 
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
        `;  
    // вставляємо індикатори в низ слайдера
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i +  1);
    dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
    `;
    if (i == 0) {
        dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot); // записуємо в масив dots 
    }
    // створимо функцію для переведення чиста з символами в число 500px => 500
    function deleteNotDigits(str) {
    return +str.replace(/|D/g, '');
    }

    next.addEventListener('click', () => {
    // if (offset == +width.slice(0, width.length - 2)*(slides.length - 1)){ // перетворюємо 500px в 500
    // if (offset == +width.replace(/|D/g, '')*(slides.length - 1)){ // перетворюємо 500px в 500
    if (offset == deleteNotDigits(width)*(slides.length - 1)){ // перетворюємо 500px в 500
        offset = 0;
    } else {
        // offset += +width.slice(0, width.length - 2);
        offset += deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }

    dots.forEach(dot => dot.style.opacity = '.5'); // переключаємо прозорість у індикаторів
    dots[slideIndex -1].style.opacity = 1;

    });

    prev.addEventListener('click', () => {
    if (offset == 0){ 
        offset = deleteNotDigits(width)*(slides.length - 1);
    } else {
        offset -= deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1 ) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex -1].style.opacity = 1;
    });
    // управління слайдером через індикатори
    dots.forEach(dot => {
    dot.addEventListener('click', (e) =>{
        const slideTo = e.target.getAttribute('data-slide-to');
        slideIndex = slideTo;
        offset = +width.slice(0, width.length - 2)*(slideTo - 1);

        slidesField.style.transform = `translateX(-${offset}px)`;
            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex -1].style.opacity = 1;
    });
    }); 
}

module.exports = slider;