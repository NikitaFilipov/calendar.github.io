let calendar = document.querySelector('#calendar');
let body = calendar.querySelector('.body');
let prev = calendar.querySelector('.prev');
let next = calendar.querySelector('.next');
let dateInfo =document.querySelector('.info')
const months=['Jan','Feb','March','Apr','May','Jun','July','Aug','Sept','Oct','Nov','Dec']
let date  = new Date();
let year  = date.getFullYear();
let month = date.getMonth();
let j = month; // Предполагается, что у вас есть переменные month и year
let y = year;
let dateNum;
draw(body, year, month);
function draw(body, year, month) {
	let arr = range(getLastDay(year, month));
	
	let firstWeekDay = getFirstWeekDay(year, month);
	let lastWeekDay  = getLastWeekDay(year, month);
	
	let nums = chunk(normalize(arr, firstWeekDay, 6 - lastWeekDay), 7);
	createTable(body, nums)
}


// GetNextDate
function getNextMonth() {
  j++;
  if (j === months.length) {
    j = 0;
  // Обновляем год, если переходим от Dec к Jan
  }
  if(j ===months.length){
	y++;
  }
  dateInfo.textContent = `${months[j]} ${y}`;
}

function getNextYear() {
  if (j === 0) {
    y++;
	return y;
  }
  
}

// GetPrevDate
function getPrevMonth() {
  j--;
}

function getPrevYear() {
	if (j === -1) {
	
    j = months.length - 1;
    y--;
	// Обновляем год, если переходим от Jan к Dec
  }

	dateInfo.textContent=`${months[j]} ${y}`
//   if (j === months.length - 1) {
//     y--;
	
//   }
//   return y;
}
function putCorrectMonth(){
	for(let i=0;i<months.length;i++){
		if(i === month){
			
			dateInfo.textContent=`${months[i] } ${year}`
		}

	}
}
putCorrectMonth()

next.addEventListener('click', function() {
	 getNextYear(year, month);
	 getNextMonth(month)
	 draw(body,j,y)
});
prev.addEventListener("click",function(e){
	 getPrevYear(year,month);
	 getPrevMonth(month);
	 draw(body,j,y)
})


function createTable(parent, arr) {
	parent.textContent = '';
	let cells = [];
	
	for (let sub of arr) {
		let tr = document.createElement('tr');
		
		for (let num of sub) {
			let td = document.createElement('td');
			td.textContent = num;
			tr.appendChild(td);
			
			cells.push(td);
		}
		
		parent.appendChild(tr);
	}
	
	return cells;
}

function normalize(arr, left, right) {
	for (let i = 0; i < left; i++) {
		arr.unshift('');
	}
	for (var i = 0; i < right; i++) {
		arr.push('');
	}
	
	return arr;
}

function getFirstWeekDay(year, month) {
	let date = new Date(year, month, 1);
	let num  = date.getDay();
	
	if (num == 0) {
		return 6;
	} else {
		return num - 1;
	}
}

function getLastWeekDay(year, month) {
	let date = new Date(year, month + 1, 0);
	let num  = date.getDay();
	
	if (num == 0) {
		return 6;
	} else {
		return num - 1;
	}
}

function getLastDay(year, month) {
	 
		let date = new Date(year, j + 1, 0);

		if((0 == y % 4)  && (0 != y % 100) || (0 == y % 400 ) ) {
			if(j ===1){
				console.log(true)
				return 29
			}
		}
		return date.getDate();
	  
	
	
}

function range(count) {
	let arr = [];
	
	for (let i = 1; i <= count; i++) {
		arr.push(i);
	}
	
	return arr;
}

function chunk(arr, n) {
	let result = [];
	let count = Math.ceil(arr.length / n);
	
	for (let i = 0; i < count; i++) {
		let elems = arr.splice(0, n);
		result.push(elems);
	}
	
	return result;
}