/**
 * Show Hello (basic shadow DOM element)
 */
customElements.define('show-hello', class extends HTMLElement {
	connectedCallback() {
		const shadow = this.attachShadow({mode: 'open'});
		shadow.innerHTML = `<p>
			Hello, ${this.getAttribute('name')}!
		</p>`
	}
});

/**
 * encapsulated CSS in a shadow DOM
 */
const encapsulated = document.getElementById('encapsulated');

encapsulated.attachShadow({mode: 'open'});
encapsulated.shadowRoot.innerHTML = `
	<style> p {color: olive;}</style>
	<p>Hello, Olive!
	<br/>
	(I'm in the shadow DOM so I'm doing my own, encapsulated thing)</p>
`;

/**
 * template shadow DOM
 */
const template = document.getElementById('template');
const templatedElem = document.getElementById('templated-elem');

templatedElem.onclick = function() {
	templatedElem.attachShadow({mode: 'open'});
	templatedElem.shadowRoot.append(template.content.cloneNode(true));
	templatedElem.shadowRoot.getElementById('message').innerHTML = "Hello from the shadows oooo"
}