import { Selector } from 'testcafe';

class AddBooksPage {
    constructor () {
        this.addBook = Selector('main span').withText('Add Book');

        // Buttons
        this.saveButton =   Selector('main button').withText('Save');
        this.editButton =   Selector('main button').withText('Edit');
        this.addButton =    Selector('main span').withText('Add Book');

        // Text boxes
        this.titleTextBox = Selector('#title');
        this.isbnTextBox = Selector('#isbn13');
        this.authorIDTextBox     = Selector('#authorId');
        this.imageURLTextBox    = Selector('#imageUrl');
    }
}

export default new AddBooksPage();
