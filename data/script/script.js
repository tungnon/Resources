function show_hide_contents() {
    let contents = document.getElementsByClassName('table-of-contents')[0];

    if (window.getComputedStyle(contents).display === 'none') {
        contents.style.display = 'block';
    } else {
        contents.style.display = 'none';
    }
}