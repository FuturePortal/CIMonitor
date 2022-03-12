/// <reference types="cypress" />

context('A running GitLab pipeline', () => {
    it('opens the CIMonitor dashboard', () => {
        cy.visit('/');
    });

    it('creates a pending pipeline', () => {
        // Push all created events
        for (let count = 1; count <= 15; count++) {
            cy.gitlab(`pipeline/${count}`);
        }

        // TODO: Check a status is showing properly
    });

    // TODO: 18 is pipeline command
});
