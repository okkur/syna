describe('Scroll', () => {
  it('should display scroll to top button when scrolled a bit', () => {
    cy.visit('/');
    cy.get('.scroll-to-top').should('be.hidden');
    cy.scrollTo(0, 500);
    cy.get('.scroll-to-top').should('be.visible');
  });

  it('should scroll to top when button is clicked', () => {
    cy.visit('/');
    cy.scrollTo(0, 500);
    cy.get('.scroll-to-top').click();
    cy.wait(500);
    cy.window().then(($window) => {
      expect($window.scrollY).to.be.equal(0, 0);
    });
  });
});

describe("Content fragment's sidebar scroll", () => {
  it('should not be scrollable when does not overflow', () => {
    cy.visit('/dev/sidebar-behavior/');
    cy.viewport(1200, 1200);
    cy.get('#content .content-sidebar-body').should((sidebar) => {
      expect(sidebar.prop('clientHeight')).to.be.at.least(
        sidebar.prop('scrollHeight'),
      );
    });
  });

  it('should be scrollable when it overflows', () => {
    cy.visit('/dev/sidebar-behavior/');
    cy.viewport(1200, 500);
    cy.get('#content .content-sidebar-body').should((sidebar) => {
      expect(sidebar.prop('clientHeight')).to.be.lessThan(
        sidebar.prop('scrollHeight'),
      );
    });
  });
});
