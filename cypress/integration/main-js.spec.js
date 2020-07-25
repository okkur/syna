describe('index.js (assets/scripts/main.js)', () => {
  beforeEach('visit js-helpers/general dev page', () => {
    cy.visit('/dev/js-helpers/general');
  });

  it('should open and close dropdowns', () => {
    cy.get('#dropdown .dropdown-toggle')
      .parent()
      .should('not.have.class', 'show');
    cy.get('#dropdown .dropdown-toggle').click();
    cy.get('#dropdown .dropdown-toggle').parent().should('have.class', 'show');
    cy.get('#dropdown .dropdown-toggle')
      .parent()
      .get('.dropdown-menu')
      .should('have.class', 'show');
    cy.get('#dropdown .dropdown-toggle').click();
    cy.get('#dropdown .dropdown-toggle')
      .parent()
      .should('not.have.class', 'show');
    cy.get('#dropdown .dropdown-toggle')
      .parent()
      .get('.dropdown-menu')
      .should('not.have.class', 'show');
  });

  it('should select item from dropdown', () => {
    cy.get('#dropdown .dropdown-toggle')
      .parent()
      .should('not.have.class', 'show');
    cy.get('#dropdown .dropdown-toggle').click();
    cy.get('#dropdown .dropdown-toggle').should('contain', '$');
    cy.get('#dropdown .dropdown-toggle')
      .parent()
      .get('.currency-menu .dropdown-item:nth-child(2)')
      .click();
    cy.get('#dropdown .dropdown-toggle')
      .parent()
      .should('not.have.class', 'show');
    cy.get('#dropdown .dropdown-toggle')
      .parent()
      .get('.dropdown-menu')
      .should('not.have.class', 'show');
    cy.get('#dropdown .dropdown-toggle').should('contain', '€');
  });

  it('should select buttons in a button-group', () => {
    cy.get('#button-group .btn-group .btn:nth-child(1)').should(
      'have.class',
      'active',
    );
    cy.get('#button-group .btn-group .btn.active').should('have.length', 1);
    cy.get('#button-group .btn-group .btn:nth-child(2)').click();
    cy.get('#button-group .btn-group .btn:nth-child(2)').should(
      'have.class',
      'active',
    );
    cy.get('#button-group .btn-group .btn.active').should('have.length', 1);
  });
});
