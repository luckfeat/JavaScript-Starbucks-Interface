const searchEl = document.querySelector('.sub-menu__search');
const searchInputEl = searchEl.querySelector('input');
const menuEls = document.querySelectorAll('.main-menu__item');

let clicked;
let canTriggerEvent = true;

function starEvents() {
  menuEls.forEach((menuEl) => {
    menuEl.addEventListener('mouseover', () => {
      if (canTriggerEvent) {
        canTriggerEvent = false;
        const contentsEl = menuEl.querySelector('.contents__menu');

        setTimeout(() => {
          contentsEl.style.height = contentsEl.scrollHeight + 'px';
          canTriggerEvent = true;
        }, 200);
      }
    });
  });

  menuEls.forEach((menuEl) => {
    menuEl.addEventListener('mouseout', () => {
      const contentsEl = menuEl.querySelector('.contents__menu');
      contentsEl.style.height = '0px';
    });
  });

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
}

starEvents();

// let arr = '';

// function generateLiTag(copiedText) {
//   let textArray = copiedText.split(',');
//   textArray.forEach((e) => {
//     arr += `<li>${e}</li>`;
//   });
// }

// generateLiTag(
//   '머그, 글라스, 플라스틱 텀블러, 스테인리스 텀블러, 보온병, 액세서리, 선물세트, 커피 용품, 패키지 티(티바나),시럽'
// );
// console.log(arr);
