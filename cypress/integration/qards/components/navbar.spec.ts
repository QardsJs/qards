/// <reference types="Cypress" />

context('Components:Navbar', () => {
	beforeEach(() => {
		cy.visit('/blog');
	});

	it('should make sure it contains Qards brand name', () => {
		cy.get('.qards-navbar').should('be.visible').contains('Qards');
	});

	it('should make sure it contains Categories dropdown', () => {
		cy.get('.qards-navbar .qards-navbar-categoriesBtn').contains('Categories');
	});

	it('should make sure it contains that categories open menu when clicked', () => {
		cy.get('.qards-categories-menu').should('not.be.visible');
		cy.get('.qards-navbar .qards-navbar-categoriesBtn').click();
		cy.get('.qards-categories-menu').should('be.visible');
	});

	it('should make sure it contains a search button', () => {
		cy.get('.qards-navbar .qards-navbar-searchBtn').should('be.visible');
	});

	it('should open the drawer when search is button clicked', () => {
		cy.get('.qards-navbar-drawer-wrapper').should('not.be.visible');
		cy.get('.qards-navbar .qards-navbar-searchBtn').click();
		cy.get('.qards-navbar-drawer-wrapper').should('be.visible');
	});

	//	remeber that the drawer itself does not go invisible when hidden
	//	it will still be detected as visible because it uses a translate
	//	3d to move -600px to the left and, even though we can't see it on
	//	the page any more cypress will see it as visible. The element that
	//	has a `display: none` applied when the body has a class of
	//	`qards-navbar-drawer` so we should aim for that when checking
	//	against visibility
	it('DESKTOP should close drawer when ESC key is pressed', () => {
		cy.get('.qards-navbar-drawer').should('not.be.visible');
		cy.get('.qards-navbar .qards-navbar-searchBtn').click();
		cy.get('.qards-navbar-drawer').should('be.visible');
		cy.get('body').type('{esc}');
		cy.get('.qards-navbar-drawer').should('not.be.visible');
	});

	it('DESKTOP should add and remove css class to body element to indicate its open state', () => {
		cy.get('body').should('not.have.class', 'has-drawer-open');
		cy.get('.qards-navbar .qards-navbar-searchBtn').click();
		cy.get('body').should('have.class', 'has-drawer-open');
		cy.get('body').type('{esc}');
		cy.get('body').should('not.have.class', 'has-drawer-open');
	});

	it('MOBILE should hide elements when on mobile viewport', () => {
		cy.viewport('iphone-6');
		cy.get('.qards-navbar .qards-navbar-searchBtn').should('not.be.visible');
		cy.get('.qards-navbar svg[data-icon="menu"]').should('be.visible');
	});

	it('MOBILE should open the drawer when the icon is clicked', () => {
		cy.viewport('iphone-6');
		cy.get('.qards-navbar-drawer-wrapper').should('not.be.visible');
		cy.get('.qards-navbar svg[data-icon="menu"]').click();
		cy.get('.qards-navbar-drawer-wrapper').should('be.visible');
	});

	it('MOBILE should close the drawer when any of the child elements is clicked', () => {
		cy.viewport('iphone-6');
		cy.get('.qards-navbar svg[data-icon="menu"]').click();
		cy.get('.qards-navbar-drawer a').first().click({ force: true });
		cy.get('.qards-navbar-drawer').should('not.be.visible');
	});

	it('should have a search input with Algolia logo present', () => {
		cy.get('.qards-navbar .qards-navbar-searchBtn').click();
		cy.get('.qards-navbar-drawer .qards-search').should('be.visible');
		cy.get('.qards-navbar-drawer .qards-search img[alt="Search by algolia"]').should('be.visible');
		cy.get('body').type('{esc}');

		cy.viewport('iphone-6');
		cy.get('.qards-navbar svg[data-icon="menu"]').click();
		cy.get('.qards-navbar-drawer .qards-search').should('be.visible');
		cy.get('.qards-navbar-drawer .qards-search img[alt="Search by algolia"]').should('be.visible');
	});
});
