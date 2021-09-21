function show_hide_element(element) {
    if (window.getComputedStyle(element).display === 'none') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}

forms = ['f','c','s'];
function lineup(units_array){
	images_array = Array(10);
	images_array.fill(`<div class = 'imageholder'><img width = '74px' height = '56.2px' style = 'background-color: #f0e1c9'/></div>`);
	images_array[4] = `<div class = 'imageholder'><img width = '74px' height = '56.2px' style = 'background-color: #f0e1c9'/></div><br>`
	for(let i = 0; i < units_array.length; i++){
		val = units_array[i];
		vals = val.split('-');
		images_array[i] = `<div class = 'imageholder'><img src = 'https://thanksfeanor.pythonanywhere.com/static/UnitProcessed/uni${vals[2].padStart(3,'0')}_${forms[vals[1]]}00.png'/><div class="bottom-left">${vals[0]}</div></div>`;
		if (i % 5 == 0)
			images_array[images_array.length-1] += '<br>';
	}
	return '<div class = "lineup">'+images_array.join('')+'</div>';
}
