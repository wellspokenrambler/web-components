/**
 * Time Formatted (basic component)
 */
class TimeFormatted extends HTMLElement {
    render() {
        let date = new Date(this.getAttribute('datetime') || date.now());

        this.innerHTML = "Today's date and time is: " + new Intl.DateTimeFormat("default", {
            year: this.getAttribute('year') || undefined,
            month: this.getAttribute('month') || undefined,
            day: this.getAttribute('day') || undefined,
            hour: this.getAttribute('hour') || undefined,
            minute: this.getAttribute('minute') || undefined,
            second: this.getAttribute('second') || undefined,
            timeZoneName: this.getAttribute('timezone-name') || undefined
        }).format(date);
    }

    connectedCallback() {
        if(!this.rendered) {
            this.render();
            this.rendered = true;
        }
    }

    static get observedAttributes() {
        return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'timezone-name'];
    }

    attributeChangedCallback(name, oldValue, newValuue) {
        this.render();
    }

}

customElements.define("time-formatted", TimeFormatted);

const elem = document.getElementById('elem');

setInterval(() => elem.setAttribute('datetime', new Date()), 1000);

/**
 * User info (connection and initialisation)
 */

customElements.define('user-info', class extends HTMLElement {
    connectedCallback() {
        alert(`${this.id} connected`);
        setTimeout(() => alert(`${this.id} initialised`));
    }
});

/**
 * Hello Button (customised built-in element)
 */
class HelloButton extends HTMLButtonElement {
    constructor() {
        super();
        this.addEventListener('click', () => alert('hello'));
    }
}

customElements.define('hello-button', HelloButton, {extends: 'button'});