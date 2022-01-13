const box = document.querySelectorAll('.box');

const updateStatusesFunction = (ev) => {
  const div = Array.from(document.querySelectorAll('.listItem'));
  const example = div[ev.target.dataset.input-1].children[1].firstChild.data;
  let x=example;
    if(ev.target.checked) {
      div[ev.target.dataset.input-1].children[1].style.textDecoration = "line-through";
    } else {
      div[ev.target.dataset.input-1].children[1].style.textDecoration = 'none';
    }
}

box.forEach(item => item.addEventListener('change', updateStatusesFunction));