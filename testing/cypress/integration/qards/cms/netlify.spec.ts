/// <reference types="Cypress" />
const chaiColors = require('chai-colors');

chai.use(chaiColors);

Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test on exceptions
	return false;
});

describe('Test Backend', () => {
	// beforeEach(() => {
	// 	cy.visit('/admin/#/collections/posts/entries/list-of-supported-cards');
	// });

	const setSiteUrlAndLogin = () => {
		cy.viewport(1200, 1200);
		cy.visit('/admin/');

		cy.get('#netlify-identity-widget').then(($iframe) => {
			const $body = $iframe.contents().find('body');
			let form = cy.wrap($body[0]);

			form.find('input.formControl').eq(0).clear().type(
				'https://priceless-kare-fdc4ff.netlify.com', {force: true},
			);
			cy.wrap($body[0]).find('button.btn').eq(0).click();
		});

		cy.get(`iframe`).then(($iframe) => {
			const $body = $iframe.contents().find('body');
			cy.wrap($body[0]).get('button').click();
		});
	};

	it('should set site url to the cms', () => {
		setSiteUrlAndLogin();
	});
});
