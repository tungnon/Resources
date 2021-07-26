function show_hide_element(element) {
    if (window.getComputedStyle(element).display === 'none') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}