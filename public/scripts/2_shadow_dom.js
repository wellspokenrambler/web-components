const shadowCardTemplate = document.createElement("template");
shadowCardTemplate.innerHTML = `
	<style>
		:host {
			display: block;
			max-width: 32rem;
			margin-block: 1rem;
			padding: 1rem;
			border: 1px solid #9aa6b2;
			border-radius: 0.5rem;
			color: #17212b;
			background: #f4f7f8;
			font: 1rem/1.5 system-ui, sans-serif;
		}

		h2 {
			margin: 0 0 0.5rem;
			font-size: 1.1rem;
		}

		p {
			margin: 0;
		}
	</style>
	<h2></h2>
	<p><slot></slot></p>
`;

class ShadowCard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.append(shadowCardTemplate.content.cloneNode(true));
	}

	connectedCallback() {
		this.shadowRoot.querySelector("h2").textContent =
			this.getAttribute("heading") || "Shadow card";
	}
}

customElements.define("shadow-card", ShadowCard);
