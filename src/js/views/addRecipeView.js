import View from './View.js';

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _windowElement = document.querySelector('.add-recipe-window');
    _overlayElement = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');
    _message = 'Recipe was successfully uploaded';

    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    _toggleWindow() {
        this._overlayElement.classList.toggle('hidden');
        this._windowElement.classList.toggle('hidden');
    }

    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this._toggleWindow.bind(this));
    }
    _addHandlerHideWindow() {
        this._btnClose.addEventListener('click', this._toggleWindow.bind(this));
        this._overlayElement.addEventListener('click', this._toggleWindow.bind(this));
    }

    addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', function(e) {
            e.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handler(data);
        })
    }

    _generateMarkup() {

    } 
}

export default new AddRecipeView();
