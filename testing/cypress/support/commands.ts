Cypress.Commands.add('setNetlifySiteUrl', () => {
	window.localStorage.setItem('netlifySiteURL', 'https://testing.qards.io');
});
