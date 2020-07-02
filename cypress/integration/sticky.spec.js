describe("Sticky", () => {
  describe("navbar", () => {
    it('should stick to top when sticky is true', () => {
      cy.visit('/dev/sticky/nav-sticky')
      cy.scrollTo(0, 300)
      cy.get('#nav').should(nav => 
        expect(nav.get(0).getBoundingClientRect().y).to.be.equal(0)
      )
    })

    it('should not stick to top when sticky is false', () => {
      cy.visit('/dev/sticky/nav-not-sticky')
      cy.scrollTo(0, 300)
      cy.get('#nav').should(nav => 
        expect(nav.get(0).getBoundingClientRect().y).to.be.lessThan(0)
      )
    })
  })

  describe('content sidebar', () => {
    it('should stick to top of page when navbar.sticky is false and sidebar.sticky is true', () => {
      cy.visit('/dev/sticky/nav-not-sticky')
      cy.scrollTo(0, 500)
      cy.get('.content-sidebar .sticky-top').should(sidebar => {
        expect(sidebar.get(0).getBoundingClientRect().y).to.be.equal(0)
      })
    })

    it('should stick to navbar when navbar.sticky is true and sidebar.sticky is true', () => {
      cy.visit('/dev/sticky/nav-sticky')
      cy.scrollTo(0, 500)
      cy.get('.content-sidebar .sticky-top .content-sidebar-title').should(sidebar => {
        // TODO: Follwing 72 is pt-3+nav.height. I haven't found a way to get the value dynamically in this test.
        expect(sidebar.get(0).getBoundingClientRect().y).to.be.equal(72)
      })
    })
    it('should stick to top of page when navbar.sticky is false and sidebar.sticky is false', () => {
      cy.visit('/dev/sticky/nav-not-sticky')
      cy.scrollTo(0, 500)
      cy.get('.content-sidebar:nth-child(1)').should(sidebar => {
        expect(sidebar.get(0).getBoundingClientRect().y).to.be.lessThan(0)
      })
    })

    it('should stick to navbar when navbar.sticky is true and sidebar.sticky is false', () => {
      cy.visit('/dev/sticky/nav-sticky')
      cy.scrollTo(0, 500)
      cy.get('.content-sidebar > .content-sidebar-title').should(sidebar => {
        expect(sidebar.get(0).getBoundingClientRect().y).to.be.lessThan(0)
      })
    })
  })
})
