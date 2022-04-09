/// <reference types="cypress" />

context('A running GitHub pull-request push', () => {
    it('opens the CIMonitor dashboard', () => {
        cy.visit('/');
    });

    it('creates a pull request with actio flow', () => {
        for (let count = 1; count <= 9; count++) {
            if (count > 1) {
                cy.wait(1000);
            }
            cy.github(`pull-request/${count}`);
        }
    });
});
