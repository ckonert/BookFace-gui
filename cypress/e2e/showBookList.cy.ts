describe('Display the list of books', () => {
  describe('Show the booklist', () => {

    beforeEach(() => {
      cy.intercept('GET', '**/', {fixture: 'booklist.json'});
      cy.visit('http://localhost:4200/books');
    });

    it('should show a list of four books', () => {
      cy.get('#booklist').should('exist');
    });
  });
});