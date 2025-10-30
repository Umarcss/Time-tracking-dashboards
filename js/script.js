const allBoards = document.querySelectorAll(".boards__board");
const allBtns = document.querySelectorAll(".boards__board-btn");
const SRC = "./data.json";
let term;
let isAnimated = false;
fetch(SRC)
	.then((res) => res.json())
	.then((data) => {
		allBtns.forEach((btn) =>
			btn.addEventListener("click", (e) => {
				if (isAnimated) return;

				isAnimated = true;
				allBtns.forEach((el) => el.classList.remove("active"));

				term = e.target.textContent.toLowerCase();

				e.target.classList.add("active");
				updateBoards(data);
			})
		);
		document.querySelector(".boards__board-btn-weekly").classList.add("active");
		updateBoards(data);
	})
	.catch((err) => {
		console.log(err);
		const container = document.querySelector(".boards__content");
		container.innerHTML = "Failed to load content";
		container.style.textAlign = "center";
		container.style.color = "#fff";
	});

const updateBoards = (data) => {
	allBoards.forEach((board, index) => {
		board.classList.add("animated");
		setTimeout(() => {
			board.classList.remove("animated");
			isAnimated = false;
		}, 500);

		let hour;
		const cat = data[index].title;
		hour = term || "weekly";
		const category = board.querySelector(".boards__board-category");
		const time = board.querySelector(".boards__board-time");
		const lastTime = board.querySelector(".boards__board-last-time");
		category.textContent = cat;
		time.textContent = `${data[index].timeframes[hour].current}hrs`;
		lastTime.textContent = `Last Week - ${data[index].timeframes[hour].previous}hrs`;
	});
};
