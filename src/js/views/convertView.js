const inputAmountField = document.querySelector('.input-amount-field');
import { debounce } from "../helper";
import View from "./view.js";

class ConvertView extends View {
  
    _parentElement = document.querySelector('.output-amount-field');

/**
   * Add handler to element
   * @function ConvertView._handleInput
   * @param {Element} element
   * @param {Event} event
   * @param {function} handler
   * @returns {undefined}
*/
    _handleInput(element,event,handler) {
        element.addEventListener(event,debounce(async function() {
            await handler();
          },1000),
        ); 
    }

/**
   * Add handler to input while user is typing
   * @function ConvertView.addHandlerKeyup
   * @param {function} handler
   * @returns {undefined}
*/
    addHandlerKeyup(handler) {
        this._handleInput(inputAmountField,'keyup',handler);        
        this._handleInput(inputAmountField,'input',handler);
    }

/**
   * Render result amount 
   * @function ConvertView.render
   * @param {Array} data
   * @returns {undefined}
   * 
*/
    render(data) {
        this._parentElement.innerHTML = '';
        this._parentElement.textContent = '';
        this._parentElement.textContent = +(data);
    }

/**
   * Get input amount 
   * @function ConvertView.getInputAmount
   * @returns {String} input amount field value
   * 
*/
    getInputAmount() {
        return +(document.querySelector('.input-amount-field').value);
    }     

    
}

export default new ConvertView();