document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('colorForm');
    const palette = document.getElementById('palette');
    const nameInput = document.getElementById('name');
    const typeInput = document.getElementById('type');
    const codeInput = document.getElementById('code');
    const nameError = document.getElementById('nameError');
    const codeError = document.getElementById('codeError');

    // chatgpt regex
    const colorRegex = {
        RGB: /^(\d{1,3}),(\d{1,3}),(\d{1,3})$/,
        RGBA: /^(\d{1,3}),(\d{1,3}),(\d{1,3}),(\d?(\.\d+)?)$/,
        HEX: /^#([0-9A-Fa-f]{6})$/
    };

    let colors = JSON.parse(getCookie('colors') || '[]');

    colors.forEach(addColorBlock);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = nameInput.value.trim();
        const type = typeInput.value;
        const code = codeInput.value.trim();

        let valid = true;
        nameError.textContent = '';
        codeError.textContent = '';

        if (!/^[a-zA-Z]+$/.test(name)) {
            nameError.textContent = 'Name must contain only letters.';
            valid = false;
        }

        if (colors.some(color => color.name.toLowerCase() === name.toLowerCase())) {
            nameError.textContent = 'Name must be unique.';
            valid = false;
        }

        if (!colorRegex[type].test(code)) {
            codeError.textContent = `Invalid ${type} code.`;
            valid = false;
        } else if (type === 'RGB' || type === 'RGBA') {
            const parts = code.split(',');
            if (parts.slice(0, 3).some(num => num < 0 || num > 255) || (type === 'RGBA' && (parts[3] < 0 || parts[3] > 1))) {
                codeError.textContent = `Invalid ${type} code.`;
                valid = false;
            }
        }

        if (valid) {
            const newColor = { name, type, code };
            colors.push(newColor);
            setCookie('colors', JSON.stringify(colors), 3);
            addColorBlock(newColor);
            form.reset();
        }
    });

    function addColorBlock(color) {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'color-block';
        colorDiv.textContent = color.name;
        if (color.code === '#FFFFFF') {
            colorDiv.style.color = 'black';
        }
        colorDiv.style.backgroundColor = color.type === 'HEX' ? color.code : `${color.type}(${color.code})`;
        palette.appendChild(colorDiv);
    }

    function setCookie(name, value, hours) {
        const date = new Date();
        date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
        document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
    }

    function getCookie(name) {
        const nameEQ = `${name}=`;
        const ca = document.cookie.split(';');
        for(let i= 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
});
