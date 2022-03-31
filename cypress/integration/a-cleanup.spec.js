/// <reference types="cypress" />

context('A cleanup spec that removes all statuses', () => {
    it('ask the backend to remove all statuses', () => {
        cy.request({
            url: `status/all`,
            method: 'DELETE',
        });
    });
});
