/// <reference types="cypress" />

context('A running read the docs push', () => {
    it('opens the CIMonitor dashboard', () => {
        cy.visit('/');
    });

    it('pushes a failed build', () => {
        cy.readthedocs(`build-failed/1`);
        cy.wait(1000);
        cy.readthedocs(`build-failed/2`);
    });

    it('pushes a successful build', () => {
        cy.wait(2000);
        cy.readthedocs(`build-success/1`);
        cy.wait(1000);
        cy.readthedocs(`build-success/2`);
    });
});
