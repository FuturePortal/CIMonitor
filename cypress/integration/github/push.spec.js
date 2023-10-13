/// <reference types="cypress" />

context('A running GitHub push', () => {
	it('opens the CIMonitor dashboard', () => {
		cy.visit('/');
	});

	it('pushes a GitHub failed action flow', () => {
		for (let count = 1; count <= 8; count++) {
			if (count > 1) {
				cy.wait(1000);
			}
			cy.github(`push-failed/${count}`);
		}

		cy.wait(2000);
	});

	it('pushes a GitHub successful action flow', () => {
		for (let count = 1; count <= 14; count++) {
			if (count > 1) {
				cy.wait(1000);
			}
			cy.github(`push/${count}`);
		}
	});
});
