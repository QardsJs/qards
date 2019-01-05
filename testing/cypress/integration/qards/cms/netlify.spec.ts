/// <reference types="Cypress" />

const chaiColors = require('chai-colors');

chai.use(chaiColors);

Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test
	return false;
});

describe('Test Backend', () => {
	beforeEach(() => {
		cy.visit('/admin/#/collections/posts/entries/list-of-supported-cards');
	});

	const login = () => {
		cy.viewport(1200, 1200);
		cy.visit('/admin/');
		cy.get('input.formControl').clear().type('https://www.qards.io/');
		cy.get('button.btn').click();
	};
});
