Cypress.Commands.add('setNetlifySiteUrl', () => {
	window.localStorage.setItem('netlifySiteURL', 'https://testing.qards.io');
});

Cypress.Commands.add('copyTestingImages', () => {
	cy.exec('cp -r testing/assets/images/*.jpg static/images/uploads');
});

Cypress.Commands.add('removeTestingImages', () => {
	cy.exec('rm static/images/uploads/*.jpg');
});
