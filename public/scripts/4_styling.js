/**
 * custom dialog - :host demo
 */
const customDialogTemplate = document.getElementById('custom-dialog-template');

customElements.define('custom-dialog', class extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: 'open'}).append(customDialogTemplate.content.cloneNode(true));
    }
});

/**
 * user card - styling slotted content
 */
customElements.define('user-card', class extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
        <style>
            span {background: red;}
            slot[name="birthday"] {color: purple;}
            ::slotted(div) {background: lightgrey;padding: 4px;}
            ::slotted(div span) {border: 10px dashed putty;}
            ::slotted(div) span {font-family: serif;}
            .field {padding: 10px;background-color: var(--user-card-field-color, black);
            }
        </style>
        <div class="field">Name: <slot name="username"></slot></div>
        <div class="field">Birthday: <slot name="birthday"></slot></div>
        `;
    }
});