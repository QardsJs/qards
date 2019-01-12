/// <reference types="Cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test
	return false;
});

context('Components:Post', () => {
	beforeEach(() => {
		cy.visit('/list-of-supported-cards/');
	});

	it('should render only one H1 as a page title', () => {
		cy.get('h1')
			.should('be.visible')
			.should('have.length', 1)
			.should('have.class', 'qards-post-title')
			.contains('Supported cards');
	});

	it('should render the post date', () => {
		cy.get('span.qards-post-date')
			.should('be.visible')
			.should('have.length', 1)
			.contains('September 23, 2018');
	});

	it('should render the post hero', () => {
		cy.get('.qards-post-hero')
			.should('be.visible');
	});

	it('should render the post excerpt', () => {
		cy.get('.qards-post-excerpt')
			.should('be.visible');
	});

	it('should render the post excerpt in lightText', () => {
		cy.get('.qards-post-excerpt')
			.should('be.visible')
			.should('have.css', 'color')
			.and('eq', '#5a6c7a');
	});

	it('should maximize the hero img on click', () => {
		cy.get('.qards-post-hero').click();
		cy.get('#lightboxBackdrop').should('be.visible');
		cy.get('body').type('{esc}');
		cy.get('#lightboxBackdrop').should('not.be.visible');
	});

	it('should render emojis', () => {
		cy.get('img.emojione').click().should('be.visible');
	});
});
