console.log("Hi")
const dates = document.querySelectorAll(".date");
for (var i = 0; i < dates.length; i++) {
  const longDate = dates[i].textContent;
  if (longDate.length > 0){
    const now = moment(longDate);
    dates[i].textContent = now.format("LLLL");
  }
}

const deleteForm = document.querySelector("form.delete");
if (deleteForm){
  deleteForm.addEventListener("submit", function(event){
    if (confirm("Are you sure?") !== true ){
      event.preventDefault();
    }
  })
}
