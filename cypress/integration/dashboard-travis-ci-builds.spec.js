context('Waiting', () => {
    it('opens the dashboard', () => {
        cy.visit('/');
    });

    it('pushes successful Travis-CI builds', () => {
        for (let i = 1; i <= 8; i++) {
            cy.pushTravisCIWebhook(`${i}.json`);
            cy.wait(1000);
        }
    });
});
