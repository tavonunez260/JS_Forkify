import icons from "url:../../img/icons.svg";
export default class View {
    _data;
    
    render(data, render = true) {
        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        const markup = this._generateMarkup();
        if(!render) return markup;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    update(data) {
        // if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        const newMarkup = this._generateMarkup();

        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const curElements = Array.from(this._parentElement.querySelectorAll('*'));
        newElements.forEach((newElement, index) => {
            const curElement = curElements[index];
            //Text updated
            if(!newElement.isEqualNode(curElement) && newElement.firstChild?.nodeValue.trim() !== '') {
                curElement.textContent = newElement.textContent;
            }
            //Attributes updated
            if(!newElement.isEqualNode(curElement)) {
                Array.from(newElement.attributes).forEach(attribute => {
                    curElement.setAttribute(attribute.name, attribute.value);
                })
            }
        })
    }
    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderError(message = this._errorMessage) {
        const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>`
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderMessage(message = this._message) {
        const markup = `
        <div class="message">
            <div>
            <svg>
                <use href="src/img/icons.svg#icon-smile"></use>
            </svg>
            <p>${message}</p>
        </div>`
    }
}