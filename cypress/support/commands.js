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

const submitFixtureAsWebhook = (webhook, fixture, overrideSettings) => {
    cy.fixture(`${webhook}/${fixture}`).then((body) => {
        body = {
            ...body,
            ...overrideSettings,
        };

        cy.request({
            url: `webhook/${webhook}`,
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    });
};

Cypress.Commands.add('gitlab', (fixture, overrideSettings = {}) =>
    submitFixtureAsWebhook('gitlab', fixture, overrideSettings)
);

Cypress.Commands.add('github', (fixture, overrideSettings = {}) =>
    submitFixtureAsWebhook('github', fixture, overrideSettings)
);
