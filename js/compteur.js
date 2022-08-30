const app = {
    init() {
        app.createCounter();
        app.createButton();
    },

    state: {
        count: 0
    },

    createCounter() {
        const counterEl = document.createElement('h1');
        counterEl.textContent = app.state.count;
        app.el.appendChild(counterEl);
    },

    createButton() {
        const buttonEl = document.createElement('button');
        buttonEl.textContent = '+1';
        app.el.appendChild(buttonEl);

        buttonEl.addEventListener('click', app.incrementButton)
    },

    incrementButton() {
        app.state.count++;
        app.render();
    },

    render() {
        app.el.innerHTML = '';
        app.init();
    },

    el: document.getElementById('app'),
}

document.addEventListener('DOMContentLoaded', app.init);