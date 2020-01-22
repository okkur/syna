describe("Form errors", () => {
  beforeEach(() => {
    cy.visit("/fragments/contact/");
  });

  it("should not be displayed by default", () => {
    cy.get("#contact .form-group .has-error").should("have.length", 0);
  });

  it("should be displayed if field is touched", () => {
    cy.get("#contact .form-group input[name=name]").focus();
    cy.get("#contact .form-group .has-error").should("have.length", 1);
  });

  it("should be not be displayed if field is touched but filled with valid information", () => {
    cy.fixture("contact").then(({ name }) =>
      cy.get("#contact .form-group input[name=name]").type(name)
    );
    cy.get("#contact .form-group .has-error").should("have.length", 0);
  });

  it("should all be displayed if all inputs are touched", () => {
    cy.get(
      "#contact .form-group input, #contact .form-group textarea"
    ).each((node, i) => setTimeout(() => node.focus(), i * 250));
    cy.get("#contact .form-group .has-error").should("have.length", 4);
  });

  it("should not be displayed if all fields are touched but filled with valid information", () => {
    cy.fixture("contact").then(fields =>
      Object.keys(fields).forEach(field =>
        cy
          .get(
            `#contact .form-group ${
              field === "message" ? "textarea" : "input"
            }[name=${field}]`
          )
          .type(fields[field])
      )
    );
    cy.get("#contact .form-group .has-error").should("have.length", 0);
  });
});
