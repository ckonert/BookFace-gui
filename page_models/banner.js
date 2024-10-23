import { Selector } from 'testcafe';

class Banner {
    constructor () {
        // Buttons
        this.booksButton = Selector('a').withText('Books');
        this.authorButton = Selector('a').withText('Authors');
    }
}

export default new Banner();
