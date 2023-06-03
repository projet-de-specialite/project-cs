describe('Sign Up Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signup');
  });

  it('should display error message on invalid registration', () => {
    cy.get('input[name="username"]').type('existing_username');
    cy.get('input[name="email"]').type('existing_email@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.get('.chakra-alert-error').should('be.visible');
  });

  it('should display success message on successful registration', () => {
    cy.get('input[name="username"]').type('lea');
    cy.get('input[name="email"]').type('lea@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.get('.chakra-alert-success').should('be.visible');
  });

  it('should navigate to login page on "Login" link click', () => {
    cy.get('a[href="/login"]').click();

    cy.url().should('include', '/login');
  });
});
