context('GitLab pipeline tests', () => {
    it('opens the dashboard', () => {
        cy.visit('/');
    });

    it('pushes a successful GitLab pipeline', () => {
        for (let loopCount = 1; loopCount <= 27; loopCount++) {
            cy.pushGitLabWebhook(`master-pipeline-success/${loopCount}.json`);

            // Speed up the first 9 pipeline events, they're not interesting for us
            cy.wait(loopCount < 9 ? 10 : 800);
        }
    });
});
