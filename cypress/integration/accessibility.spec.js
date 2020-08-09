describe('Accessibility tests', () => {
  it('should run', () => {
    cy.visit('http://localhost:1313/dev/colors/dev-buttons');
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ['cat.color'],
    });
  });
});
