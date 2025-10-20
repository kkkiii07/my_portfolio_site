'use strict';

{
  const targets = document.querySelectorAll('.fuwa');

  function callback(entries, obs) {
    console.log(entries);

    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }
  
      entry.target.classList.add('appear');
      obs.unobserve(entry.target);
    });
  }

  //   if (entries[0].isIntersecting) {
  //     entries[0].target.classList.add('appear');
  //   } else {
  //     entries[0].target.classList.remove('appear');
  //   }
  // }

  const options = {
    threshold: 0.5,
    // rootMargin: '0px 0px -50px',
  };

  const observer = new IntersectionObserver(callback, options);

  targets.forEach(target => {
    observer.observe(target);
  })
}

{
  // const $switch = document.getElementById('switch');
  const $main_nav = document.getElementById('main_nav');
  // const $ul = $main_nav.querySelectorAll('ul')[0];
  const $li = $main_nav.querySelectorAll('li');
  // console.log($main_nav.querySelectorAll('li'));

  for (let i = 0; i < $li.length; i++) {
      let b = (i + 1) * .3;
      $li[i].style = 'transition: '+b+'s;';
  }


//  $switch.addEventListener('click', () => {
//   $main_nav.classList.add('on');
//   setTimeout (() => {
//     $ul.classList.add('on');
//   }, 1000);
//  });
}