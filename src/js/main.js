import $ from 'jquery';

class Main {
    constructor() {
        const test = $('<div>helloworld</div>');
        $('body').append(test);
    }
}

window.main = new Main();