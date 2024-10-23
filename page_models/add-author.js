import { Selector } from 'testcafe';

class AddAuthorsPage {
    constructor () {

        //Text Boxes
//        this.firstNameTextBox = Selector('#firstname');
        this.firstNameTextBox =Selector('#firstname');
        this.lastNameTextBox = Selector('#lastname');
        this.imageURLTextBox = Selector('#imageUrl');

        // Buttons
        this.addAuthorButton = Selector('main span').withText('Add Author');
        this.deleteAuthorButton = Selector('main button').withText('Delete');
        this.editAuthorButton = Selector('main button').withText('Edit');

        // Statics
        this.authorName = Selector('#author div h3');
    }
}

export default new AddAuthorsPage();
