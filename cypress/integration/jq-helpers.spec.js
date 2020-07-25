// file deepcode ignore PromiseNotCaughtGeneral: Cypress will fail in case there are any errors
import $ from '../../assets/js/helpers/jq-helpers';

describe('jq-helpers', () => {
  beforeEach('visit js-helpers/jq-helpers dev page', () => {
    cy.visit('/dev/js-helpers/jq-helpers');
  });

  it('should not be null in the special dev page', () => {
    cy.window().then((win) => {
      expect(win.jqHelpers).to.be.a('function');
    });
  });

  it('should find elements using selectors', () => {
    cy.window().then((win) => {
      expect(win.jqHelpers('#index').$nodes).to.have.length(1);
    });
  });

  it('should add and remove classes', () => {
    cy.window().then((win) => {
      win.jqHelpers('#nav').addClass('new-class');
      cy.get('#nav').should('have.class', 'new-class');
      win.jqHelpers('#nav').removeClass('navbar');
      cy.get('#nav').should('not.have.class', 'navbar');
    });
  });

  it('should read, write, remove element attributes', () => {
    cy.window().then((win) => {
      expect(win.jqHelpers('#nav').attr('role')).to.equal('navigation');
      win.jqHelpers('#nav').attr('role', 'nothing');
      expect(win.jqHelpers('#nav').attr('role')).to.equal('nothing');
      win.jqHelpers('#nav').removeAttr('role');
      expect(win.jqHelpers('#nav').attr('role')).to.equal(null);
    });
  });

  it('should read and set innerHTML of selected element', () => {
    cy.window().then((win) => {
      expect(win.jqHelpers('#empty-content .content-body').html()).to.equal('');
      win
        .jqHelpers('#empty-content .content-body')
        .html('<h3>Not empty now</h3>');
      expect(win.jqHelpers('#empty-content .content-body').html()).to.equal(
        '<h3>Not empty now</h3>',
      );
    });
  });

  it('should append html elements to the selected element', () => {
    cy.window().then((win) => {
      expect(win.jqHelpers('#empty-content .content-body').html()).to.equal('');
      win
        .jqHelpers('#empty-content .content-body')
        .append('<h3>Not empty now</h3>');
      expect(win.jqHelpers('#empty-content .content-body').html()).to.equal(
        '<h3>Not empty now</h3>',
      );
    });
  });

  it('should set text content of the selected element', () => {
    cy.window().then((win) => {
      cy.get('#empty-content .content-body').should('contain', '');
      win.jqHelpers('#empty-content .content-body').text('Not empty now');
      cy.get('#empty-content .content-body').should('contain', 'Not empty now');
    });
  });

  it('should read and set value of the selected element', () => {
    cy.window().then((win) => {
      expect(win.jqHelpers('#contact input').val()).to.equal('');
      win.jqHelpers('#contact input').val();
      win.jqHelpers('#contact input').val('value');
      expect(win.jqHelpers('#contact input').val()).to.equal('value');
    });
  });

  it('should serialize form', () => {
    cy.window().then((win) => {
      win.jqHelpers('#contact input').val('value');
      expect(win.jqHelpers('#contact form').serialize()).to.equal('name=value');
      expect(win.jqHelpers('#contact form').serialize(true)).to.equal(
        '{"name":"value"}',
      );
    });
  });

  it('should scroll to a selected element', () => {
    cy.viewport(1200, 400);
    cy.window().then((win) => {
      win.jqHelpers.scrollTo(win.document.scrollingElement, 200, 200);
      cy.wait(500).then(() => {
        expect(win.document.scrollingElement.scrollTop).to.equal(200);
      });
    });
  });
});
