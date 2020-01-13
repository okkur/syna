describe("Scroll", () => {
  it("should display scroll to top button when scrolled a bit", () => {
    cy.visit("/");
    cy.get(".scroll-to-top").should("be.hidden");
    cy.scrollTo(0, 500);
    cy.get(".scroll-to-top").should("be.visible");
  });

  it("should scroll to top when button is clicked", () => {
    cy.visit("/");
    cy.scrollTo(0, 500);
    cy.get(".scroll-to-top").click();
    cy.wait(500);
    cy.window().then($window => {
      expect($window.scrollY).to.be.equal(0, 0);
    });
  });
});
