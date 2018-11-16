context('Waiting', () => {
    it('opens the dashboard', () => {
        cy.visit('/');
    });

    it('clears the dashboard', () => {
        cy.request('/status/clear-all');
    });
});
