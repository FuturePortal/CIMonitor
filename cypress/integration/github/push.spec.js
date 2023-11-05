/// <reference types="cypress" />

context('A running GitHub push', () => {
	it('opens the CIMonitor dashboard', () => {
		cy.visit('/');
	});

	it('pushes a GitHub failed action flow', () => {
		for (let count = 1; count <= 23; count++) {
			if (count > 1) {
				cy.wait(300);
			}
			cy.github(`push-failed/${count}`);
		}

		cy.wait(2000);
	});

	it('pushes a GitHub successful action flow for organisations', () => {
		for (let count = 1; count <= 41; count++) {
			if (count > 1) {
				cy.wait(300);
			}
			cy.github(`push/organisation/${count}`);
		}
	});

	it('pushes a GitHub successful action flow for personal accounts', () => {
		for (let count = 1; count <= 23; count++) {
			if (count > 1) {
				cy.wait(300);
			}
			cy.github(`push/personal-account/${count}`);
		}
	});
});
