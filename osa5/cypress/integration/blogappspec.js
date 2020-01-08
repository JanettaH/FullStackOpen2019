describe("Blog ", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000");
  });
  describe("Blog app", function() {
    beforeEach(function() {
      cy.request("POST", "http://localhost:3003/api/testing/reset");
      const user = {
        username: "janetta",
        password: "janetta"
      };
      cy.request("POST", "http://localhost:3003/api/users/", user);
      cy.visit("http://localhost:3000");
    });

    it("front page can be opened", function() {
      cy.contains("application");
    });
    it("login form can be opened", function() {
      cy.contains("login").click();
    });
    it("user can login", function() {
      cy.contains("login").click();
      cy.get("#username").type("janetta");
      cy.get("#password").type("janetta");
      cy.contains("login").click();
      cy.contains("Welcome janetta");
    });

    it("a new blog can be created", function() {
      cy.contains("login").click();
      cy.get("#username").type("janetta");
      cy.get("#password").type("janetta");
      cy.contains("login").click();
      cy.contains("new").click();
      cy.get("#title").type("a blog1 created by cypress");
      cy.get("#author").type("a blog1 created by cypress");
      cy.get("#url").type("a blog1 created by cypress");
      cy.contains("create").click();
      cy.contains("a blog1 created by cypress");
    });
  });
});
