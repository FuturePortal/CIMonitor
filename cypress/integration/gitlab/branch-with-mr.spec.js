/// <reference types="cypress" />

context('A running GitLab pipeline', () => {
    it('opens the CIMonitor dashboard', () => {
        cy.visit('/');
    });

    it('creates a pending pipeline', () => {
        // Quickly go through the initial created pushes
        for (let count = 1; count <= 15; count++) {
            cy.gitlab(`branch-with-mr/${count}`);
        }
    });

    it('test pushes pipeline step by step', () => {
        // Push all created events
        for (let count = 16; count <= 80; count++) {
            if (count > 1) {
                cy.wait(300);
            }
            cy.gitlab(`branch-with-mr/${count}`);
        }
    });
});
