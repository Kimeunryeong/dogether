const section1Event = document.getElementById('section1-event');
const section1Event2 = document.getElementById('section1-event2');

// section1-event가 2초 뒤에 나타나도록 설정
setTimeout(() => {
  section1Event.style.opacity = 1;

  // section1-event가 나타난 후 2초 뒤에 section1-event2가 나타나도록 설정
  setTimeout(() => {
    section1Event2.style.opacity = 1;
  }, 1000);
}, 1000);