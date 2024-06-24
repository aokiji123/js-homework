document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('myRange');

    slider.addEventListener('input', function() {
        console.log(slider.value);
    });
});
