var dialog = document.querySelector('dialog');
var showModalButton = document.querySelector('.show-modal');
if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}
showModalButton.addEventListener('click', function() {
    dialog.showModal();
});
dialog.querySelector('.close').addEventListener('click', function() {
    dialog.close();
});


var slider = document.getElementById("slider");
var tooltip = document.querySelector(".mdl-tooltip");
slider.addEventListener("mouseover", function(){
    tooltip.innerHTML = this.value + " m&sup2";
});
slider.addEventListener("input", function() {
    tooltip.innerHTML = this.value + " m&sup2";
});