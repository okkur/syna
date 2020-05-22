describe("List fragment", () => {
  it("should display pages from same, specific section, with subsections and with subsection leaves", () => {
    cy.visit("/dev/list");
    cy.get("#upper-leaves article").should("have.length", 2);
    cy.get("#branches article").should("have.length", 4);
    cy.get("#leaves article").should("have.length", 8);
  });
});
