// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

const checkIn=document.getElementById("checkIn");
const checkOut=document.getElementById("checkOut");
const today=new Date().toISOString().split("T")[0];
checkIn.min=today;
checkIn.addEventListener("change",()=>{
  checkOut.disabled=false;
      const minDate=new Date(checkIn.value);
      minDate.setDate(minDate.getDate()+1);
      
      checkOut.min=minDate.toISOString().split("T")[0];;
      checkOut.value="";
})