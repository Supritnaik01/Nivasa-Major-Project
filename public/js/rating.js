const ratingContainer = document.querySelector('.rating-stars');
const ratingInputs = document.querySelectorAll('input[name="review[rating]"]');
const submitBtn=document.querySelector('.rating-btn');
let val=0;
ratingInputs.forEach((input) => {
  const label = input.nextElementSibling;

  // Hover 
  label.addEventListener('mouseover', () => {
    const hoverValue = parseInt(input.value);
    
    ratingInputs.forEach((inp) => {
      const lbl = document.querySelector(`label[for="${inp.getAttribute("id")}"]`);
      if (parseInt(inp.value) <= hoverValue) {
        lbl.classList.add('active');
      } else {
        lbl.classList.remove('active');
      }
    });
  });

  // click 
  input.addEventListener('change', () => {
    const clickValue = parseInt(input.value);
    val=clickValue;
    submitBtn.disabled=false;
    
   
    ratingInputs.forEach((inp) => {
      inp.checked =false;
      // = parseInt(inp.value) <= clickValue;
    });
    input.checked=true;
    updateStars();
  });
});


ratingContainer.addEventListener('mouseleave', updateStars);

function updateStars() {
  ratingInputs.forEach((inp) => {
    const lbl = document.querySelector(`label[for="${inp.getAttribute("id")}"]`);
    if (inp.value<=val) {
      lbl.classList.add('active');
    } else {
      lbl.classList.remove('active');
    }
  });
}