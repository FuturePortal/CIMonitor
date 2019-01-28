// https://on.cypress.io/custom-commands

Cypress.Commands.add('pushStatus', request => {
    cy.fixture(`status/${request}`).then(body => {
        cy.request({
            url: 'http://localhost:9999/status',
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    });
});

Cypress.Commands.add('pushGitLabWebhook', request => {
    cy.fixture(`gitlab-webhook/${request}`).then(body => {
        cy.request({
            url: 'http://localhost:9999/webhook/gitlab',
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    });
});

Cypress.Commands.add('pushTravisCIWebhook', request => {
    cy.fixture(`travis-ci-webhook/${request}`).then(body => {
        cy.request({
            url: 'http://localhost:9999/webhook/travis',
            method: 'POST',
            body: {
                payload: JSON.stringify(body),
            },
            headers: {
                'Content-Type': 'x-www-form-urlencoded',
            },
            form: true,
        });
    });
});

Cypress.Commands.add('pushDeployerWebhook', request => {
    cy.fixture(`deployer-recipe/${request}`).then(body => {
        cy.request({
            url: 'http://localhost:9999/webhook/deployer',
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    });
});
