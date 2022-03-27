/// <reference types="cypress" />

context('A running GitLab pipeline', () => {
    it('opens the CIMonitor dashboard', () => {
        cy.visit('/');
    });

    it('creates a release', () => {
        cy.gitlab(`deployment/1`);
        cy.wait(2000);
        cy.gitlab(`deployment/2`);
    });
});
