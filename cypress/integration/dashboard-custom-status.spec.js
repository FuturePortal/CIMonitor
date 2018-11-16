context('Waiting', () => {
    it('opens the dashboard', () => {
        cy.visit('/');
    });

    it('pushes custom statuses', () => {
        cy.get('.toolbar');
        cy.pushStatus('custom-status-1-info.json');
        cy.wait(1000);
        cy.pushStatus('custom-status-2-started.json');
        cy.wait(1000);
        cy.pushStatus('custom-status-3-started.json');
        cy.wait(1000);
        cy.pushStatus('custom-status-3-error.json');
        cy.wait(1000);
        cy.pushStatus('custom-status-2-success.json');
        cy.wait(1000);
        cy.pushStatus('custom-status-4-started.json');
    });
});
