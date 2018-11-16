context('Waiting', () => {
    it('opens the dashboard', () => {
        cy.visit('/');
    });

    it('pushes a successful GitLab pipeline', () => {
        for (let i = 1; i <= 27; i++) {
            cy.pushGitLabWebHook(`master-pipeline-success/${i}.json`);
            cy.wait(1000);
        }
    });
});
