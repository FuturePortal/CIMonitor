/// <reference types="cypress" />

context('A running BitBucket push', () => {
	it('opens the CIMonitor dashboard', () => {
		cy.visit('/');
	});

	it('pushes a BitBucket branch', () => {
		for (let count = 1; count <= 4; count++) {
			if (count > 1) {
				cy.wait(1000);
			}
			cy.bitbucket(`push/${count}`);
		}

		cy.wait(2000);
	});
});
