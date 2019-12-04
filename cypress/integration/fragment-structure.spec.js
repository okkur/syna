describe("Fragment structure", () => {
  it("should display fragments from global", () => {
    cy.visit("/dev/fragment-fallthrough");
    cy.get("#nav").should("have.length", 1);
    cy.get("#hero").should("have.length", 1);
    cy.get("#content").should("have.length", 1);
    cy.get("#copyright").should("have.length", 1);
    cy.get("#footer").should("have.length", 1);
  });

  it("should support fragment falltrough", () => {
    cy.visit("/dev/fragment-fallthrough");
    cy.get("#hero .hero-subtitle").should(
      "contain",
      "If you see this, directory fragment fallthrough is working"
    );
    cy.get("#content h2").should("contain", "Content fragment from Page");
    cy.get("#copyright .copyright-notice").should(
      "contain",
      "This is loaded from globals of the current section"
    );
  });
});
