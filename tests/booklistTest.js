import { Selector } from 'testcafe';

fixture `Book List Test`
    .page `http://localhost:4200`;

test('should have 4 occurrences of the book element', async t => {
    // Select all elements with id 'book' inside 'booklist'
    const books = Selector('#booklist #book');

    // Check the count of the selected elements
    await t.expect(books.count).eql(5);
});
