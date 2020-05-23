describe("Events", () => {
  beforeEach(() => {
    cy.visit("/dev/events/payment//");
  });

  it("should focus stripe form when stripe event is fired", () => {
    cy.get(
      "a[href$='/dev/events/payment?event=pricing:change&product=Starting%20plan&price=$9.99/mo&currency=usd']"
    ).click();
    cy.get("#stripe input[name=email]").should("focused", true);
    cy.get("#stripe .price-display .btn-group label")
      .should("have.length", 1)
      .should("contain", "$9.99/mo");
  });

  it("should focus contact form when contact event is fired", () => {
    cy.get(
      "a[href$='/dev/events/payment?e=P2V2ZW50PWNvbnRhY3Q6dXBkYXRlJm1lc3NhZ2U9VGl0bGU6IExldCdzIG5lZ290aWF0ZQpQbGFuOiBFbnRlcnByaXNlIHBsYW4KWW91ciBtZXNzYWdlOgo=']"
    ).click();
    cy.get("#contact input[name=name]").should("focused", true);
    cy.get("#contact textarea[name=message]").should(
      "contain",
      `Title: Let's negotiate
Plan: Enterprise plan
Your message:
`
    );
  });
});
