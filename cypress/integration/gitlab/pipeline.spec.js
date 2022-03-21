/// <reference types="cypress" />

context('A running GitLab pipeline', () => {
    it('opens the CIMonitor dashboard', () => {
        cy.visit('/');
    });

    it('creates a pending pipeline', () => {
        // Quickly go through the initial created pushes
        for (let count = 1; count <= 10; count++) {
            cy.gitlab(`pipeline/${count}`);
        }
    });

    it('test pushes pipeline step by step', () => {
        // Push all created events
        for (let count = 11; count <= 56; count++) {
            cy.wait(500);
            cy.gitlab(`pipeline/${count}`);
        }
    });
});
