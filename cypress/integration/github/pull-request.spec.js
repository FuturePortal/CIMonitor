/// <reference types="cypress" />

context('A running GitHub pull-request push', () => {
	it('opens the CIMonitor dashboard', () => {
		cy.visit('/');
	});

	it('creates a pull request with action flow', () => {
		for (let count = 1; count <= 9; count++) {
			if (count > 1) {
				cy.wait(300);
			}
			cy.github(`pull-request/${count}`);
		}
	});

	it('pushes a new commit', () => {
		for (let count = 10; count <= 18; count++) {
			cy.wait(300);
			cy.github(`pull-request/${count}`);
		}
	});
});
