let modal = document.querySelector(".modal");
let btn = document.querySelector(".btn-cart");
let span = document.querySelector(".close-modal-window");

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}