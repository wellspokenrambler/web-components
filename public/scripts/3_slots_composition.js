const profileCardTemplate = document.createElement("template");
profileCardTemplate.innerHTML = `
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

		header {
			padding-block-end: 0.75rem;
			border-block-end: 1px solid #d5dce1;
		}

		h2, p {
			margin: 0;
		}

		[name="role"] {
			color: #52616b;
		}

		::slotted(p) {
			margin-block: 0.75rem 0;
		}
	</style>
	<header>
		<h2><slot name="name">Unnamed profile</slot></h2>
		<p><slot name="role">No role provided</slot></p>
	</header>
	<slot></slot>
`;

class ProfileCard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.append(profileCardTemplate.content.cloneNode(true));
	}

	connectedCallback() {
		this.shadowRoot.querySelectorAll("slot").forEach((slot) => {
			slot.addEventListener("slotchange", () => {
				const status = document.querySelector("#slot-status");
				status.textContent = `Content assigned to the ${slot.name || "default"} slot.`;
			});
		});
	}
}

customElements.define("profile-card", ProfileCard);
