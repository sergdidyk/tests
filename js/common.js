const TABLE_SIZE = 10;
let start_btn = document.getElementsByClassName("start_btn")[0];
let time_inp = document.getElementsByClassName("time_input")[0];
let player_span = document.getElementById("player_counter");
let comp_span = document.getElementById("comp_counter");
let player_counter = 0;
let comp_counter = 0;

let cells_arr = [];

createTable(TABLE_SIZE);
function createTable(size){
	let fieldTable = document.getElementsByClassName("field")[0];
	let tbody = document.createElement("tbody");

	for(let i = 0; i < TABLE_SIZE; i++){
		let tr = document.createElement("tr");
		for(let j = 0; j < TABLE_SIZE; j++){
			let td = document.createElement("td");
			td.className = "bg-primary";
			tr.appendChild(td);
			cells_arr.push(td);
		}
		tbody.appendChild(tr);
	}
	fieldTable.appendChild(tbody);
};

function randomCellNum(){
	let cell_num = Math.floor(Math.random() * (Math.pow(TABLE_SIZE, 2) + 1));
	return cell_num;
};

function gameOver(player_counter, comp_counter){
	if(player_counter == 10 || comp_counter == 10){
		let player_span_modal = document.getElementById("player_counter_modal");
		let comp_span_modal = document.getElementById("comp_counter_modal"); 
		let close_window = document.getElementsByClassName("close_window")[0];
		let play_again = document.getElementsByClassName("play_again")[0];
		close_window.addEventListener("click", function(){
			window.close();
		});
		play_again.addEventListener("click", function(){
			location.reload();
		});

		player_span_modal.innerHTML = player_counter;
		comp_span_modal.innerHTML = comp_counter;
		$("#gameOverModal").modal("show");
	}
}


start_btn.addEventListener("click", function(){
	let time_val = Number(time_inp.value);
	if(!time_val){
		this.setAttribute("data-target", "#emptyTimeModal");
		return;
	}
	this.removeAttribute("data-target");

	let randomCell = cells_arr[randomCellNum()];
	randomCell.className = "bg-warning";

	let greenBtnClickHandler = function(event){
		event.preventDefault();
		randomCell.className = "bg-success";
		player_counter += 1;
		player_span.innerHTML = player_counter;
		clearTimeout(timer);
		randomCell.removeEventListener("click", greenBtnClickHandler, false);
		gameOver(player_counter, comp_counter);
	};
	randomCell.addEventListener("click", greenBtnClickHandler, false);

	let timer =	setTimeout(function(){
			randomCell.className = "bg-danger";
			comp_counter += 1;
			comp_span.innerHTML = comp_counter;
			randomCell.removeEventListener("click", greenBtnClickHandler, false);
			gameOver(player_counter, comp_counter);
		}, time_val);
});


