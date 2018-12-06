context('Custom Style', () => {
    it('opens the dashboard', () => {
        cy.visit('/');
    });

    it('pushes successful colorstyled statuses', () => {
        for (let i = 1; i <= 4; i++) {
            cy.pushStyledStatus(`${i}.json`);
            cy.wait(1000);
        }
    });
});
