/// <reference types="cypress" />

context('A running GitLab pipeline', () => {
	it('opens the CIMonitor dashboard', () => {
		cy.visit('/');
	});

	it('creates a pending pipeline', () => {
		// Quickly go through the initial created pushes
		for (let count = 1; count <= 8; count++) {
			cy.gitlab(`canceled-pipeline/${count}`);
		}
	});

	it('test pushes pipeline step by step', () => {
		// Push all created events
		for (let count = 9; count <= 20; count++) {
			if (count > 1) {
				cy.wait(300);
			}
			cy.gitlab(`canceled-pipeline/${count}`);
		}
	});
});
