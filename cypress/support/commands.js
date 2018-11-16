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

Cypress.Commands.add('pushGitLabWebHook', request => {
    cy.fixture(`gitlab-web-hook/${request}`).then(body => {
        cy.request({
            url: 'http://localhost:9999/gitlab',
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    });
});
