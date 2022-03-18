// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('gitlab', (file) => {
    cy.fixture(`gitlab/${file}`).then((body) => {
        cy.request({
            url: `webhook/gitlab`,
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    });
});

const fireFixture = (service, file) => {
    cy.fixture(`${service}/${file}`).then((fixture) => {
        cy.request({
            url: `webhook/${service}`,
            method: 'POST',
            body: fixture.body,
            headers: fixture.headers,
        });
    });
}

Cypress.Commands.add('github', (file) => fireFixture('github', file));

Cypress.Commands.add('readthedocs', (file) => fireFixture('readthedocs', file));
