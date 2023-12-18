"use strict"
window.addEventListener('DOMContentLoaded', () => {
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
















});