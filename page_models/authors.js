import { Selector } from 'testcafe';

class AuthorsPage {
    constructor () {

        // Buttons
      this.addButton    = Selector('main span').withText('Add Author');
      this.deleteButton = Selector('main button').withText('Delete');
      this.editButton   = Selector('main button').withText('Edit');

        // Statics
      this.authorName   = Selector('#author div h3');
    }
}
export default new AuthorsPage();
