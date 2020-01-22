describe("Search", () => {
  it("should work in nav fragment", () => {
    cy.visit("/");
    cy.get(".search-results-container").should("be.hidden");
    cy.get("#search-query-nav").type("installation");
    cy.get(".search-results-container").should("be.visible");
    cy.get("#search-results-nav").should("not.be.empty");
  });

  it("should work in search fragment", () => {
    cy.visit("/search");
    cy.get("#search-results-index a").should("have.length", 0);
    cy.get("#search-query-index").type("installation");
    cy.get("#search-results-index a").should("not.have.length", 0);
  });
});
