/// <reference types="Cypress" />
const chaiColors = require('chai-colors');

chai.use(chaiColors);

Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test on exceptions
	return false;
});

describe('Test Backend', () => {
	beforeEach(() => {
		// @ts-ignore
		cy.setNetlifySiteUrl();
	});

	const gotoAdmin = () => {
		cy.viewport(1200, 1200);
		cy.visit('/admin/');
	};

	const submitLoginFrm = () => {
		cy.get(`iframe`).then(($iframe) => {
			const $body = $iframe.contents().find('body');
			cy.wrap($body[0]).get('button').click();
			cy.wait(1000);

			cy.wrap($body[0]).find('input[type="email"]').eq(0).clear().type(
				Cypress.env('NETLIFY_USER') || 'invalid@user.com', {force: true},
			);

			cy.wrap($body[0]).find('input[type="password"]').eq(0).clear().type(
				Cypress.env('NETLIFY_PASSWORD') || 'invalid-password', {force: true},
			);

			cy.wrap($body[0]).find('button.btn[type=submit]').eq(0).click();
		});
	};

	const navigatetoPosts = () => {
		cy.contains('a', 'Posts').click();
	};

	const navigateCreatePost = () => {
		cy.contains('a', 'New Post').click();
	};

	const assertInsideAdmin = () => {
		cy.contains('a', 'Posts');
	};

	const assertOnPostsPage = () => {
		cy.url().should('contain', '/#/collections/posts');
		cy.contains('h1', 'Posts');
	};

	const toggleMarkdownEditor = () => {
		cy.get('div').contains('Markdown').parent().find('button[role=switch]').click();
	};

	// @ts-ignore
	const writePostBody = (postBody) => {
		cy.get(`[data-slate-editor]`).click().type(postBody.replace(/{/g, `{{}`), {
			delay: 0,
		});
	};

	it('should be able to log in', () => {
		gotoAdmin();
		submitLoginFrm();
		assertInsideAdmin();
	});

	it('should find the Posts collection', () => {
		navigatetoPosts();
		assertOnPostsPage();
	});

	it('should be able to create post', () => {
		navigateCreatePost();

		cy.readFile('./src/content/collections/posts/list-of-supported-cards.md').then((postBody) => {
			cy.get(`iframe`).then(($iframe) => {
				const $body = $iframe.contents().find('body');

				cy.get('input#title-field-1').clear().type('test new post');
				cy.wrap($body[0]).find('h1').eq(0).contains('test new post');

				//	switch to markdown
				toggleMarkdownEditor();

				//	enter our test post
				//cy.get('[data-slate-editor]').click().invoke('val', postBody).trigger('change');
				writePostBody(postBody);
			});
		});
	});
});
