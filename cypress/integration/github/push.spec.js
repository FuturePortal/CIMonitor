/// <reference types="cypress" />

context('A running GitHub push', () => {
    it('opens the CIMonitor dashboard', () => {
        cy.visit('/');
    });

    it('pushes a GitHub action flow', () => {
        for (let count = 1; count <= 8; count++) {
            cy.wait(1000);
            cy.github(`push-failed/${count}`);
        }

        cy.wait(2000);

        // Push all created events
        for (let count = 1; count <= 14; count++) {
            cy.wait(1000);
            cy.github(`push/${count}`);
        }
    });
});
