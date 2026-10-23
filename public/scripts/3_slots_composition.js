/**
 * user card - named slots example
 */

customElements.define('user-card', class extends HTMLElement {
	connectedCallback() {
		this.attachShadow({mode: 'open'});
		this.shadowRoot.innerHTML = `
			<div>
				Name: <slot name="username">Nonny Mouse</slot>
			</div>
			<div>
				Birthday: <slot name="birthday">31.01.1969</slot>
			</div>
			<fieldset>
				<legend>Other stuff</legend>
				<slot>N/A</slot>
			</fieldset>
		`;
	}
});

/**
 * Custom Menu slots example
 */
const customMenuTemplate = document.getElementById('custom-menu-template');

customElements.define('custom-menu', class extends HTMLElement {
	connectedCallback() {
		this.attachShadow({mode: 'open'});
		this.shadowRoot.append(customMenuTemplate.content.cloneNode(true));
		this.shadowRoot.querySelector('slot[name="title"').onclick = () => {
			this.shadowRoot.querySelector('.menu').classList.toggle('closed');
		}
	}
});

/**
 * Custom menu dynamic insertion example
 */

customElements.define('custom-menu-dynamic', class extends HTMLElement {
	connectedCallback() {
		this.attachShadow({mode: 'open'});
		this.shadowRoot.innerHTML = `<div class="menu">
			<slot name="title"></slot>
			<ul><slot name="item"></slot></ul>
		</div>`;

		this.shadowRoot.firstElementChild.addEventListener('slotchange', e => alert('slotchange: '+ e.target.name));
	}
});

const dynamicMenu = document.getElementById("dynamic-menu");

setTimeout(() => {
	dynamicMenu.insertAdjacentHTML('beforeend', '<li slot="item">Lollipop</li>')
}, 3000);

setTimeout(() => {
	dynamicMenu.querySelector('[slot="title"]').innerHTML = "New menu";
}, 5000);

/**
 * Custom Menu slots API example
 */

customElements.define('custom-menu-slots-api', class extends HTMLElement {
	items = [];

	connectedCallback() {
		this.attachShadow({mode: 'open'});
		this.shadowRoot.innerHTML = `<div class="menu">
			<slot name="title"></slot>
			<ul><slot name="item"></slot</ul>
		</div>`;

		this.shadowRoot.firstElementChild.addEventListener('slotchange', e => {
			let slot = e.target;
			if (slot.name == 'item') {
				this.items = slot.assignedElements().map(elem => elem.textContent);
				console.log("items: " + this.items);
			}
		})
	}
});

const slotsAPIMenu = document.getElementById("slots-api-menu");

setTimeout(() => {
	slotsAPIMenu.insertAdjacentHTML('beforeend', '<li slot="item">Taffy</li>')
},7000);