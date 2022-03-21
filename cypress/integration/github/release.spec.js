/// <reference types="cypress" />

context('A running GitHub release', () => {
    it('opens the CIMonitor dashboard', () => {
        cy.visit('/');
    });

    it('pushes a GitHub action flow', () => {
        for (let count = 1; count <= 18; count++) {
            cy.wait(1000);
            cy.github(`release/${count}`);
        }
    });
});
