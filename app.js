/* Created by Tivotal */

let form = document.querySelector("form");
let fileInput = document.querySelector(".file-input");
let progressArea = document.querySelector(".progress-area");
let uploadArea = document.querySelector(".upload-area");

form.addEventListener("click", () => {
  fileInput.click();
});

fileInput.onchange = ({ target }) => {
  //getting file from the files selected
  let file = target.files[0];

  //if file selected
  if (file) {
    //getting file name
    let fileName = file.name;

    if (fileName.length > 12) {
      //splitting file name to make it short
      let nameSplit = fileName.split(".");
      fileName = nameSplit[0].substring(0, 13) + "..." + nameSplit[1];
    }

    //calling upload function by passing file name as argument
    uploadFile(fileName);
  }
};

function uploadFile(name) {
  //creating new xml object
  let xhr = new XMLHttpRequest();

  //sending post to the specified URL
  xhr.open("POST", "php/upload.php");

  xhr.upload.addEventListener("progress", ({ loaded, total }) => {
    //getting percentage of file uploaded
    let fileLoaded = Math.floor((loaded / total) * 100);

    //getting total file size in kb from bytes
    let fileTotal = Math.floor(total / 1000);

    //converting file size to KB or MB based on the file size
    let fileSize;
    fileTotal < 1024
      ? (fileSize = fileTotal + "KB")
      : (fileSize = (loaded / (1024 * 1024)).toFixed(2) + "MB");

    //creating progress HTML
    let progressHTML = `<li class="row">
    <i class="fas fa-file-alt"></i>
    <div class="content">
      <div class="details">
        <span class="name">${name} . uploading...</span>
        <span class="percent">${fileLoaded}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress" style="width: ${fileLoaded}%"></div>
      </div>
    </div>
  </li>`;

    //inserting the progress html to progress area
    progressArea.innerHTML = progressHTML;

    //once the upload is completed
    if (loaded == total) {
      //removing progress html
      progressArea.innerHTML = "";
      //creating upload html
      let uploadHTML = ` <li class="row">
      <div class="content">
        <i class="fas fa-file-alt"></i>
        <div class="details">
          <span class="name">${name} . uploaded</span>
          <span class="size">${fileSize}</span>
        </div>
      </div>
      <i class="fas fa-check"></i>
    </li>`;

      //inserting upload html adjecent to previous elements
      uploadArea.insertAdjacentHTML("afterbegin", uploadHTML);
    }
  });

  //creating form data to send data from the local form
  let formData = new FormData(form);

  //sending form data
  xhr.send(formData);
}
