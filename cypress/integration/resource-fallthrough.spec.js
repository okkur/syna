describe("Image Fallthrough", () => {
  it("should display image from fragment", () => {
    cy.visit("/dev/resource-fallthrough/fragment/");
    cy.get("#hero .header-image").should(
      "have.css",
      "background-image",
      'url("http://localhost:1313/dev/resource-fallthrough/fragment/hero/resource_logo.svg")'
    );
  });

  it("should display image from page", () => {
    cy.visit("/dev/resource-fallthrough/page/");
    cy.get("#hero .header-image").should(
      "have.css",
      "background-image",
      'url("http://localhost:1313/dev/resource-fallthrough/page/resource_logo.svg")'
    );
  });

  it("should display image from global", () => {
    cy.visit("/dev/resource-fallthrough/global/");
    cy.get("#hero .header-image").should(
      "have.css",
      "background-image",
      'url("http://localhost:1313/images/resource_logo.svg")'
    );
  });
});
