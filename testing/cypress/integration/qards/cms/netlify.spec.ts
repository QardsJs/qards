/// <reference types="Cypress" />

const chaiColors = require('chai-colors');
const Base64 = require('js-base64').Base64;

chai.use(chaiColors);

// @ts-ignore
Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test on exceptions
	return !!Cypress.env('TRAVIS_BUILD_ID');
});

const encodeWidgetDataObject = (data: object): string => {
	return Base64.encode(JSON.stringify(data));
};

describe('Test Backend', () => {
	beforeEach(() => {
		// @ts-ignore
		cy.setNetlifySiteUrl();
	});

	after(() => {
		cy.visit('/', {failOnStatusCode: false});
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

	const writePostBody = (postBody: string, clearBeforeWrite: boolean | undefined) => {
		if (clearBeforeWrite) {
			cy.get(`[data-slate-editor]`).click().clear({
				force: true,
			});
		}
		return cy.get(`[data-slate-editor]`).click().type(postBody.replace(/{/g, `{{}`), {
			delay: 0,
		});
	};

	const getPreviewBody = (): Promise<any> => {
		// @ts-ignore
		return new Cypress.Promise((resolve: any) => {
			cy.get(`iframe`).then(($iframe) => {
				resolve($iframe.contents().find('body')[0]);
			});
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

	it('should write and make visible main title', () => {
		//	switch to markdown
		navigateCreatePost();
		toggleMarkdownEditor();

		getPreviewBody().then(($body) => {
			cy.get('input#title-field-1').clear().type('test new post');
			cy.wrap($body).find('h1').eq(0).contains('test new post');
		});
	});

	describe('should be able to preview most widgets', () => {
		it('- section heading', () => {
			getPreviewBody().then(($body) => {
				//	Section heading
				writePostBody(JSON.stringify({
					widget: 'qards-section-heading',
					config: encodeWidgetDataObject({
						'title'   : 'A primary section heading',
						'subtitle': 'A primary section heading is like a chapter',
						'type'    : 'primary',
					}),
				}), true);

				cy.wrap($body).find('#h-item-a-primary-section-heading h2')
					.contains('A primary section heading');

				cy.wrap($body).find('#h-item-a-primary-section-heading span')
					.contains('A primary section heading is like a chapter');

				writePostBody(JSON.stringify({
					widget: 'qards-section-heading',
					config: encodeWidgetDataObject({
						'title'   : 'A secondary section heading',
						'subtitle': 'A secondary section heading is like a chapter',
						'type'    : 'secondary',
					}),
				}), true);

				cy.wrap($body).find('#h-item-a-secondary-section-heading h3')
					.contains('A secondary section heading');

				cy.wrap($body).find('#h-item-a-secondary-section-heading span')
					.contains('A secondary section heading is like a chapter');
			});
		});

		describe('- countdown', () => {
			it('should preview', () => {
				getPreviewBody().then(($body) => {
					writePostBody(JSON.stringify({
						widget: 'qards-countdown',
						config: encodeWidgetDataObject({
							'event'   : '2025-10-04T14:00:00.000Z',
							'title'   : 'Time until robots take over the world',
							'subtitle': 'The singularity is near',
						}),
					}), true);

					cy.wrap($body).find('.countdown .digits pre').eq(0).contains('6');
				});
			});
		});

		describe('- gallery', () => {
			it('should preview', () => {
				getPreviewBody().then(($body) => {
					writePostBody(JSON.stringify({
						widget: 'qards-gallery',
						config: encodeWidgetDataObject({
							'items': [{
								'src'    : '/images/uploads/mike-dorner-173502-unsplash.jpg',
								'alt'    : 'Banana for scale',
								'caption': 'This is a **caption**. It supports _markdown_',
							}, {
								'src': '/images/uploads/patrick-fore-557736-unsplash.jpg',
								'alt': 'Cool kid',
							}, {
								'src': '/images/uploads/marko-blazevic-219788-unsplash.jpg',
								'alt': 'Cat tax',
							}, {'src': '/images/uploads/valerie-elash-690673-unsplash.jpg', 'alt': 'Awesome dog'}],
						}),
					}), true);

					cy.wrap($body).find('.react-photo-gallery--gallery img').eq(0).click();
					cy.get('#lightboxBackdrop').should('be.visible');
					cy.get('body').type('{esc}');
					cy.get('#lightboxBackdrop').should('not.be.visible');

					cy.wrap($body).find('.react-photo-gallery--gallery img').eq(1).click();
					cy.get('#lightboxBackdrop').should('be.visible');
					cy.get('body').type('{esc}');
					cy.get('#lightboxBackdrop').should('not.be.visible');

					cy.wrap($body).find('.react-photo-gallery--gallery img').eq(2).click();
					cy.get('#lightboxBackdrop').should('be.visible');
					cy.get('body').type('{esc}');
					cy.get('#lightboxBackdrop').should('not.be.visible');
				});
			});
		});

		describe('- code block', () => {
			it('should preview', () => {
				getPreviewBody().then(($body) => {
					writePostBody(JSON.stringify({
						widget: 'qards-audio',
						config: encodeWidgetDataObject({
							'items': [{
								'title'   : 'Lost',
								'url'     : 'https://www.mixcloud.com/Bazfawlty/lost/',
								'subtitle': 'Deep techno ',
								'src'     : '/images/uploads/27f0-b205-4a15-b995-c18287703cda.jpg',
							}],
						}),
					}), true);

					cy.wrap($body).find('span[icon=play].bp3-icon.bp3-icon-play').eq(0).should('be.visible');
					cy.wrap($body).find('span[icon=step-forward].bp3-icon.bp3-icon-step-forward').eq(0)
						.should('be.visible');
					cy.wrap($body).find('span[icon=step-backward].bp3-icon.bp3-icon-step-backward').eq(0)
						.should('be.visible');


					cy.wrap($body).find('ul > li.active').eq(0).contains('Lost');
				});
			});
		});

		describe('- reveal', () => {
			it('should preview', () => {
				getPreviewBody().then(($body) => {
					writePostBody(JSON.stringify({
						widget: 'qards-reveal',
						config: encodeWidgetDataObject({
							'items': [{
								'title'  : 'What is a accordion?',
								'content': 'An accordion is a list of html elements that can collapse',
							}, {
								'title'  : 'Why would I need one?',
								'content': 'A reveal could make a good candidate for a small FAQ section',
							}],
						}),
					}), true);

					cy.wrap($body).find('div.accordion').eq(0).should('be.visible');
					cy.wrap($body).find('div.accordion__item > #accordion__title-0').contains('What is a accordion?');
				});
			});
		});

		describe('- video', () => {
			it('should preview', () => {
				getPreviewBody().then(($body) => {
					writePostBody(JSON.stringify({
						widget: 'qards-video',
						config: encodeWidgetDataObject({
							'url': 'https://www.youtube.com/watch?time_continue=301&v=JplRSJr8K-g',
						}),
					}), true);

					cy.wrap($body).find('div.video-player').eq(0).should('be.visible');
					cy.wrap($body).find('div.video-player iframe[title="YouTube video player"]').eq(0).should(
						'be.visible');
				});
			});
		});

		describe('- audio', () => {
			it('should preview', () => {
				getPreviewBody().then(($body) => {
					writePostBody(JSON.stringify({
						widget: 'qards-code',
						config: encodeWidgetDataObject({
							'language': 'javascript',
							'code'    : 'a + b',
						}),
					}), true);

					cy.wrap($body).find('pre > code').eq(0).contains('a + b');
				});
			});
		});

		describe('- callouts', () => {
			it('- primary', () => {
				getPreviewBody().then(($body) => {
					writePostBody(JSON.stringify({
						widget: 'qards-callout',
						config: encodeWidgetDataObject({
							'intent' : 'primary',
							'title'  : 'Callout title primary',
							'message': 'Callout title primary meesage',
						}),
					}), true);

					cy.wrap($body).find('.bp3-callout.bp3-intent-primary.bp3-callout-icon > h4.bp3-heading')
						.eq(0).contains('Callout title primary');

					cy.wrap($body).find('.bp3-callout.bp3-intent-primary.bp3-callout-icon > div > p')
						.eq(0).contains('Callout title primary meesage');
				});
			});

			it('- success', () => {
				getPreviewBody().then(($body) => {
					writePostBody(JSON.stringify({
						widget: 'qards-callout',
						config: encodeWidgetDataObject({
							'intent' : 'success',
							'title'  : 'Callout title success',
							'message': 'Callout title success meesage',
						}),
					}), true);

					cy.wrap($body).find('.bp3-callout.bp3-intent-success.bp3-callout-icon > h4.bp3-heading')
						.eq(0).contains('Callout title success');

					cy.wrap($body).find('.bp3-callout.bp3-intent-success.bp3-callout-icon > div > p')
						.eq(0).contains('Callout title success meesage');
				});
			});

			it('- warning', () => {
				getPreviewBody().then(($body) => {
					writePostBody(JSON.stringify({
						widget: 'qards-callout',
						config: encodeWidgetDataObject({
							'intent' : 'warning',
							'title'  : 'Callout title warning',
							'message': 'Callout title warning meesage',
						}),
					}), true);

					cy.wrap($body).find('.bp3-callout.bp3-intent-warning.bp3-callout-icon > h4.bp3-heading')
						.eq(0).contains('Callout title warning');

					cy.wrap($body).find('.bp3-callout.bp3-intent-warning.bp3-callout-icon > div > p')
						.eq(0).contains('Callout title warning meesage');
				});
			});

			it('- danger', () => {
				getPreviewBody().then(($body) => {
					writePostBody(JSON.stringify({
						widget: 'qards-callout',
						config: encodeWidgetDataObject({
							'intent' : 'danger',
							'title'  : 'Callout title danger',
							'message': 'Callout title danger meesage',
						}),
					}), true);

					cy.wrap($body).find('.bp3-callout.bp3-intent-danger.bp3-callout-icon > h4.bp3-heading')
						.eq(0).contains('Callout title danger');

					cy.wrap($body).find('.bp3-callout.bp3-intent-danger.bp3-callout-icon > div > p')
						.eq(0).contains('Callout title danger meesage');
				});
			});
		});
	});
});
