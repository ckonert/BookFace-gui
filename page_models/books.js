import { Selector } from 'testcafe';

class BooksPage {
    constructor () {
        // Buttons
        this.addBook = Selector('main span').withText('Add Book');
        this.deleteButton = Selector('main button').withText('Delete');
        this.editButton =   Selector('main button').withText('Edit');
        this.addButton =    Selector('main span').withText('Add Book');

        // Statics
        this.topBookCover = Selector('main .w-24.h-auto').nth(0);
        // ^^^Waarschijnlijk even veranderen. Dynamische nth?
        this.bookCover =    Selector('main .w-24.h-auto');
        this.bookTitle =     Selector('main h3')
        this.authorName =   Selector('#author div h3');
        this.isbn =         Selector('main p').withText('ISBN:')
    }
}

export default new BooksPage();
