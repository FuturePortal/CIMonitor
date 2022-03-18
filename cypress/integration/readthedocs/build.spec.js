/// <reference types="cypress" />

context('A running read the docs push', () => {
    it('opens the CIMonitor dashboard', () => {
        cy.visit('/');
    });

    it('pushes a failed build', () => {
        for (let count = 1; count <= 2; count++) {
            cy.wait(1000);
            cy.readthedocs(`build-failed/${count}`);
        }
    });

    it('pushes a successful build', () => {
        for (let count = 1; count <= 2; count++) {
            cy.wait(1000);
            cy.readthedocs(`build-success/${count}`);
        }
    });
});
