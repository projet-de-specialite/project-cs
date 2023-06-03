describe('Login Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should display error message on invalid login', () => {
    cy.get('input[name="username"]').type('Mays');
    cy.get('input[name="password"]').type('Mays');
    cy.get('button[type="submit"]').click();

    cy.get('.chakra-alert-error').should('be.visible');
  });

  it('should display success message on successful login', () => {
    cy.get('input[name="username"]').type('hiba');
    cy.get('input[name="password"]').type('hiba');
    cy.get('button[type="submit"]').click();

    cy.get('.chakra-alert-success').should('be.visible');
  });

  it('should navigate to signup page on "SignUp" link click', () => {
    cy.get('a[href="/signup"]').click();

    cy.url().should('include', '/signup');
  });
});
