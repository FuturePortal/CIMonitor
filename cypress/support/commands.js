// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

const fireFixture = (service, file) => {
    cy.fixture(`${service}/${file}`).then((fixture) => {
        cy.request({
            url: `webhook/${service}`,
            method: 'POST',
            body: fixture.body,
            headers: fixture.headers,
        });
    });
};

Cypress.Commands.add('github', (file) => fireFixture('github', file));

Cypress.Commands.add('gitlab', (file) => fireFixture('gitlab', file));

Cypress.Commands.add('readthedocs', (file) => fireFixture('readthedocs', file));
