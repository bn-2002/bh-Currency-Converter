
export default class View {
  _parentElement;
/**
   * Clear parent element
   * @function View._clear
   * @returns {undefined}
*/
  _clear() {
    this._parentElement.innerHTML = '';
  }

/**
   * Render spinner loader on parent element 
   * @function View.renderSpinner
   * @returns {undefined}
*/
  renderSpinner() {
    const markup = `
        <div class="spinner"></div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
