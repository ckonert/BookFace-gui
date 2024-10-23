import { Selector } from 'testcafe';

class GeneralButtons {
    constructor () {
        // Buttons
      this.addButton    = Selector('main span').withText('Add');
      this.deleteButton = Selector('main button').withText('Delete');
      this.editButton   = Selector('main button').withText('Edit');
      this.saveButton   = Selector('main button').withText('Save')
    }
}
export default new GeneralButtons();
