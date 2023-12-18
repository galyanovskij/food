"use strict"
window.addEventListener('DOMContentLoaded', () => {
  // Tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

// приховаємо всі зайві таби
  function hideTabContent() {
    tabsContent.forEach(item =>{
      // item.style.display = 'none'; // перепишемо на класи
      item.classList.add('hide', 'fade_off');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(item =>{
      item.classList.remove('tabheader__item_active');
    });
  }
// функція яка показує птрібний таб, номер якого ми її передамо в змінній i
  function showTabContent(i = 0) { //якщо в функцію не прийде аргумент то за замовчуванням буде 0
      // tabsContent[i].style.display = 'block'; // і тут перепишемо гап класи
      tabsContent[i].classList.add('show', 'fade'); 
      tabsContent[i].classList.remove('hide', 'fade_off'); 
      tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();
// навішуємо обробник подій
  tabsParent.addEventListener('click', (event) =>{
    const target = event.target; // створюємо змінну для зручного користування
    if (target && target.classList.contains('tabheader__item')){ //визначаємо що ми точно клікнули в таб
      tabs.forEach((item, i) => {
        
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
      // Timer
    const deadline = '2023-12-30';
    // функція, що визначає різницю між дедлайном і актуальною датою
    function getTimeRemaining(endtime) {
      let days, hours, minutes, seconds;
      const t = Date.parse(endtime) - Date.parse(new Date());
      // якщо дата пройшла - виведемо "00"
      if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
      // можемо сховати бок з таймером
        // const delTimer = document.querySelector('.promotion__timer');
        //       delTimer.classList.add('hide');
      } else {
            days = Math.floor(t / (1000 * 60 * 60 *24));
            hours = Math.floor((t / (1000 * 60 *60) % 24));
            minutes = Math.floor((t/1000/60) % 60);
            seconds = Math.floor((t/1000) % 60);
      }
          return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
          }; 
    }

    // функція помічниз, для підстановки "0" перед одинарними цифрами
    function setZero(num) {
      if (num >=0 && num < 10) {
        return `0${num}`;
      } else {
        return num;
      }
    }
    // функція, що встановлює часи на сторінку
    function setClock(selector, endtime) {
      const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            // запускаємо функцію updateClock кожну секунду
            timeInterval = setInterval(updateClock, 1000);
      // функція для оновлення таймера
        //ініціюємо функцію, щоб не було зависання даних лічильника з верстки
        updateClock();
      function updateClock() {
        const t = getTimeRemaining(endtime);
        // записуємо дані в код html
        days.innerHTML = setZero(t.days);
        hours.innerHTML = setZero(t.hours);
        minutes.innerHTML = setZero(t.minutes);
        seconds.innerHTML = setZero(t.seconds);
        // функціонал зупинки таймера
        if (t.total <= 0) {
          clearInterval(timeInterval);
        }
      }
    }
    //запуск таймера
    setClock('.timer', deadline);










});