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

// Modal
    const modal = document.querySelector('.modal'),
      closeButton = modal.querySelector('[data-close]'),
      openButton = document.querySelectorAll('[data-modal]');
          

      // при повторенні кода виносимо його в функцію
      function openModal() {
          // modal.style.display = 'block'; 
          modal.classList.remove('hide');
          modal.classList.add('show');
          document.body.style.overflow = 'hidden'; //забираємо скрол //повертаємо скрол
          // clearInterval(modalTimeoutId); // якщо користувач сам відкриє модальне вікно то ми вже не будемо його показувати
      }
      function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = ''; //повертаємо скрол
      }
      closeButton.addEventListener('click', closeModal); //скорочений запис виклика функції по кліку
      // closeButton.addEventListener('click', () =>{
      //   // modal.style.display = 'none'; 
      //   closeModal();
      // });
      openButton.forEach((btn) => {
        btn.addEventListener('click', openModal);
      });
      modal.addEventListener('click', (event) =>{ //клік поза модалкою
        if (event.target == modal) {
          closeModal();
        }
      });
// ловимо події натиску клавіш  - ESC і Backspace
      document.addEventListener('keydown', (e) =>{
        // відслідковуємо код клавіші
        if (e.code === 'Escape' && modal.classList.contains('show')) {
          closeModal();
        } else if (e.code === 'Backspace' && modal.classList.contains('show')) {
          closeModal();
        }
      });
      // показ модалки через певний час
      // const modalTimeoutId = setTimeout(openModal, 3000);
      // показ модалки при скролі до певної частини вікна - до кінця
      // через функцію, щоб прибрати повтор
      function showModalByScroll() {
        if (window.scrollY  + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
          openModal();
          window.removeEventListener('scroll', showModalByScroll);//видаляємо обробник події - чітко вказуємо подію і функцію
        }
      }
      window.addEventListener('scroll', showModalByScroll);
      // використовуємо класи для карточок товарів
      class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
          this.src = src;
          this.alt = alt;
          this.title = title;
          this.descr = descr;
          this.price = price;
          this.classes = classes; // це буде масив з залишкових аргументів
          this.parent = document.querySelector(parentSelector); 
          this.transfer = 38; // курс
          this.changeToUAH();
        }
        // метод переведення в гривню
        changeToUAH(){
          this.price = this.price * this.transfer;
        }
        render(){
          const element = document.createElement('div');
          // перевірка на відсутність додаткових класів і введення дефолтного значення menu__item
          if (this.classes.length === 0) {
            this.classes = 'menu__item';
            element.classList.add('menu__item');
          } else {
            this.classes.forEach(className => element.classList.add(className)); // перебираємо масив і кожне значення записуємо в class до div
          }
          
          element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Ціна:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
          `;
          this.parent.append(element);
        }

      }
      // класичний виклик обєкта
      // const div = new MenuCard();
      // div.render();
      // спрощений варіант - створюємо обєкт і викликаємо у ньому метод render
      new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фітнес"',
        'Меню "Фітнес" - це новий підхід до приготування страв: більше свіжих овочів та фруктів. Продукт активних та здорових людей. Це абсолютно новий продукт з оптимальною ціною та високою якістю!',
        9,
        '.menu .container',
        // 'menu__item',  ми їх не передаємо, тому отримаємо лише дефолтний клас menu__item
        // 'big'
      ).render();
      new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Преміум”',
        'У меню “Преміум” ми використовуємо не лише гарний дизайн упаковки, але й якісне виконання страв. Червона риба, морепродукти, фрукти – ресторанне меню без походу до ресторану!',
        14,
        '.menu .container',
        'menu__item',
        'big'
      ).render();
      new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Пісне"',
        'Меню "Пісне" - це ретельний підбір інгредієнтів: повна відсутність продуктів тваринного походження, молоко з мигдалю, вівса, кокосу чи гречки, правильна кількість білків за рахунок тофу та імпортних вегетаріанських стейків.',
      21,
        '.menu .container',
        'menu__item',
        'big'
      ).render();


      
});