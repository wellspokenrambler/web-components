const eventPanelTemplate = document.createElement("template");
eventPanelTemplate.innerHTML = `
    <style>
        :host {
            display: block;
            max-width: 32rem;
            margin-block: 1rem;
            padding: 1rem;
            border: 1px solid #9aa6b2;
            border-radius: 0.5rem;
            font: 1rem/1.5 system-ui, sans-serif;
        }

        button {
            padding: 0.6rem 0.9rem;
            border: 0;
            border-radius: 0.25rem;
            color: white;
            background: #176b87;
            font: inherit;
            cursor: pointer;
        }

        button:focus-visible {
            outline: 3px solid #e3a72f;
            outline-offset: 3px;
        }
    </style>
    <button type="button">Send component event</button>
`;

class EventPanel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(eventPanelTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelector("button").addEventListener("click", () => {
            this.shadowRoot.querySelector("button").dispatchEvent(
                new CustomEvent("panel-action", {
                    bubbles: true,
                    composed: true,
                    detail: { action: "button-pressed" }
                })
            );
        });
    }
}

customElements.define("event-panel", EventPanel);

document.addEventListener("panel-action", (event) => {
    const entry = document.createElement("li");
    const internalTarget = event.composedPath()[0];
    entry.textContent = `Received ${event.detail.action}; outside target: ${event.target.localName}; original target: ${internalTarget.localName}.`;
    document.querySelector("#event-log").prepend(entry);
});