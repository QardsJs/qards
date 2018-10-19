/// <reference types="Cypress" />

const chaiColors = require('chai-colors');

chai.use(chaiColors);

Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test
	return false;
});

context('Qards:Hero', () => {
	beforeEach(() => {
		cy.visit('/posts/list-of-supported-cards/');
	});

	it('should render with required css class', () => {
		cy.get('.qards-widget-hero')
			.first().should('be.visible');
	});

	it('should render an h2 for title', () => {
		cy.get('.qards-widget-hero')
			.first()
			.find('h2')
			.should('have.length', 1)
			.first()
			.should('be.visible')
			.contains('Card Hero').next();
	});

	it('should render a span for subtitle', () => {
		cy.get('.qards-widget-hero')
			.first()
			.find('span')
			.first()
			.contains('Well, you\'re looking at it. It has a title and subtitle.');
	});

	it('should render the subtitle with lightText color', () => {
		cy.get('.qards-widget-hero')
			.first()
			.find('span')
			.first()
			.should('have.css', 'color')
			.and('be.colored', '#5a6c7a');
	});
});
