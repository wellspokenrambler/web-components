const styledNoticeTemplate = document.createElement("template");
styledNoticeTemplate.innerHTML = `
    <style>
        :host {
            --notice-accent: #187a68;
            display: block;
            max-width: 32rem;
            margin-block: 1rem;
            padding: 1rem;
            border: 1px solid #c5d0d5;
            border-inline-start: 0.35rem solid var(--notice-accent);
            color: #17212b;
            background: #f4f7f8;
            font: 1rem/1.5 system-ui, sans-serif;
        }

        h2 {
            margin: 0 0 0.5rem;
            color: var(--notice-accent);
            font-size: 1.1rem;
        }

        p {
            margin: 0;
        }

        ::slotted(strong) {
            font-weight: 700;
        }
    </style>
    <h2><slot name="title">Notice</slot></h2>
    <p><slot></slot></p>
`;

class StyledNotice extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(styledNoticeTemplate.content.cloneNode(true));
    }
}

customElements.define("styled-notice", StyledNotice);

const accentColorInput = document.querySelector("#accent-color");
const styledNotice = document.querySelector("styled-notice");

accentColorInput.addEventListener("input", () => {
    styledNotice.style.setProperty("--notice-accent", accentColorInput.value);
});