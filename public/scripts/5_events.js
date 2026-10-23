/**
 * user card with event listener on button
 */
customElements.define('user-card', class extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `<p>
            <button>Click me</button>
        </p>`;
        this.shadowRoot.firstElementChild.onclick = e => alert('Inner target: ' + e.target.tagName);
    }
});

document.onclick = e => alert("Outer target: " + e.target.tagName);

/**
 * user card with event listener on slot contents
 */

customElements.define('user-card-slots', class extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `<div>
            <b>Name:</b> <slot name="username"></slot>
        </div>`;
        this.shadowRoot.firstElementChild.onclick = e => alert('Inner target: ' + e.target.tagName);
    }
});

const userCardSlots = document.getElementById('user-card-slots');
userCardSlots.onclick = (e) => {
    alert("Outer target: " + e.target.tagName + "\nComposed path: " + e.composedPath())
};

/**
 * custom event example
 */

const outer = document.getElementById('outer');
outer.attachShadow({mode: 'open'});

let inner = document.createElement('div');
outer.shadowRoot.append(inner);

document.addEventListener('test', event => alert(event.detail));

inner.dispatchEvent(new CustomEvent('test', {
    bubbles: true,
    composed: true,
    detail: 'composed event from inner element of #outer'
}));

inner.dispatchEvent(new CustomEvent('test', {
    bubbles: true,
    composed: false,
    detail: 'not composed event from inner element of #outer'
}));