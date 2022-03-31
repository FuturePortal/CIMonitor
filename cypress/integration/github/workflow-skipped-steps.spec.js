/// <reference types="cypress" />

context('Github actions run with skipped steps', () => {
    it('opens the CIMonitor dashboard', () => {
        cy.visit('/');
    });

    it('pushes a GitHub action flow', () => {
        for (let count = 1; count <= 29; count++) {
            if (count > 1) {
                cy.wait(500);
            }
            cy.github(`skipped-steps/${count}`);
        }
    });
});
