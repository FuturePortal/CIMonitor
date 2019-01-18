context('Deployer Recipe', () => {
    it('opens the dashboard', () => {
        cy.visit('/');
    });

    it('pushes successful Deployer results', () => {
        for (let i = 1; i <= 3; i++) {
            cy.pushDeployerWebhook(`${i}.json`);
            cy.wait(1000);
        }
    });
});
