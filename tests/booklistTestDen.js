import AuthorsPage from '../page_models/authors';
import AddAuthorsPage from '../page_models/add-author';
import BooksPage from '../page_models/books';
import AddBooksPage from '../page_models/add-book';
import Banner from '../page_models/banner';
import GeneralButtons from '../page_models/general_buttons'
// ^^^CHANGE import to something general
// Also naming convention is currently confusing, with Classes and Files being different

import { Selector } from 'testcafe';

// PAGE FIXTURE
fixture('Getting started')
  .page('http://localhost:4200');

// TEST 1 (Not really a test, there's no assertion, just for doing some functionalities)
// Currently fails: no book is added
  test('Click through Website and then add a book', async t => {
    const bookTitle= "Judo: De Nieuwe Basisleermethode";
    const isbn     = "9789051210354";
    const author   = "Anton Geesink"
    const imageurl = "https://media.s-bol.com/gv8qonLW5vG/550x703.jpg";
    await t.debug()

    await t.
        click(Banner.authorButton).
        click(Banner.booksButton).
        click(GeneralButtons.addButton).
        typeText(AddBooksPage.titleTextBox, bookTitle).
        typeText(AddBooksPage.isbnTextBox, isbn).
        typeText(AddBooksPage.authorIDTextBox, author).
        typeText(AddBooksPage.imageURLTextBox, imageurl).
        click(GeneralButtons.saveButton).
        click(Banner.booksButton).
        expect(BooksPage.authorName.withText(author).exists).ok(). //Book with specific author name exists
        expect(BooksPage.bookTitle.withText(bookTitle).exists).ok().
        expect(BooksPage.isbn.withText(isbn).exists).ok();
//        .expect(BooksPage.authorName.contains(author));
  })




// TEST 2
// This test still requires manual deletion of already existing author
  test('Add an author, check author is there, delete author, check author is gone', async t => {
    const firstName     = "Anton";
    const lastName      = "Geesink";
    const fullName      = firstName+" "+lastName;
    const imageurl      = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Anton_Geesink_%281956%29.jpg/1200px-Anton_Geesink_%281956%29.jpg";
//    await t.debug()

    await t.
        click(Banner.authorButton).
        expect(AuthorsPage.authorName.withText(fullName).exists).notOk(). // Author with fullname does not (yet) exist
        click(GeneralButtons.addButton).
        typeText(AddAuthorsPage.firstNameTextBox, firstName).
        typeText(AddAuthorsPage.lastNameTextBox, lastName).
        typeText(AddAuthorsPage.imageURLTextBox, imageurl).
        click(GeneralButtons.saveButton).
        click(Banner.authorButton).
        expect(AuthorsPage.authorName.withText(fullName).exists).ok(). //Author with fullname Exists
        click(Selector('main h3').withText(fullName).parent(1).find("button").withText('Delete')).
        //^^ This is an incredibly scuffed way of doing things but it'll do for now
        expect(AuthorsPage.authorName.withText(fullName).exists).notOk() // Author with fullname does not exist (anymore)
  })




// TEST 3
// This test makes an API call to the back-end and checks that one book's title and isbn in the front-end fits with the DB
  test('Add an author, check author is there, delete author, check author is gone', async t => {
    const dbResults     = await t.request('http://localhost:8080/books/');
    const bookTitle     = dbResults.body[1].title;
    const bookISBN      = dbResults.body[1].isbn13;
    console.log(bookTitle);
    console.log(bookISBN);
    await t.
      click(Banner.booksButton).
      expect(BooksPage.bookTitle.withText(bookTitle).exists).ok().
      expect(BooksPage.isbn.withText(bookISBN).exists).ok();
  })






//// Test Tester for quick tests
//test('Test', async t => {
//const results = await t.request('http://localhost:8080/books/')
////console.log(results)
//
//console.log(results.body[1])
//
//
////          const fullName = "Anton Geesink";
////          await t.
////              click(Banner.authorButton);
////          await t.debug()
////          const countAuthors = AuthorsPage.authorName.count;
////          console.log(countAuthors)
////          await t.expect(AuthorsPage.authorName.withText(fullName).exists).ok();
////          console.log("Dit moet wel voorkomen")
////          for (let i = 0; i < countAuthors; i++) {
////            text += "The number is " + i + "<br>";
////          }
//
//})




///WORKING NOTES///
// Hooks seem important for pre- and post-conditions of test cases:
// https://testcafe.io/documentation/402669/reference/test-api/requesthook
// Pre-hook bijvoorbeeld voor: deleting all books/authors
//
// Huidige Selectors van de Page model zijn redelijk iffy. Werken voor nu, maar ben benieuwd hoe dat gaat als er veranderingen komen
//
