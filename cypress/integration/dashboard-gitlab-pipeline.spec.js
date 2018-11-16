context('Gitlab pipeline', () => {
    it('opens the dashboard', () => {
        cy.visit('/');
    });

    it('pushes a successful GitLab pipeline', () => {
        for (let i = 1; i <= 27; i++) {
            cy.pushGitLabWebhook(`master-pipeline-success/${i}.json`);
            cy.wait(1000);
        }
    });
});
