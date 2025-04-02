// ADDING MULIPLE IMAGES

let addImg = document.getElementById("add-image");
let count = 0;
let maxFile = 2;

addImg.addEventListener("click", () => {
  count += 1;

  if (count <= maxFile) {
    let addingImg = document.querySelector("#more-img");
    let extraImg = document.createElement("input");
    extraImg.name = "listing[image]";
    extraImg.classList.add("form-control", "mt-2");
    extraImg.type = "file";
    addingImg.appendChild(extraImg);
    console.log(extraImg);
  } else {
    console.log("error");
  }
});
//BOTTSSTRAP
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
