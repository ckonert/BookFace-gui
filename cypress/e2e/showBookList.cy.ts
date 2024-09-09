describe('Display the list of books', () => {
  describe('Show the booklist', () => {

    beforeEach(() => {
      cy.intercept('GET', '**/', { fixture: 'booklist.json' }).as('getBooks');
      cy.visit('http://localhost:4200/books');
    });

    it('should show a list of four books', () => {
      cy.wait('@getBooks');
      cy.get('#booklist').should('exist');
      cy.get('#book').should('be.visible');
      cy.get('#booklist').find('#book').should('have.length', 4);
    });
  });
});
