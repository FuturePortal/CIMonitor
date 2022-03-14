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

    it('test pushes pipeline step by step', () => {
        // Push all created events
        for (let count = 16; count <= 65; count++) {
            cy.wait(1000);
            cy.gitlab(`pipeline/${count}`);
        }

        // TODO: Check a status is showing properly
    });
});
