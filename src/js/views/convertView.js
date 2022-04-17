const inputAmountField = document.querySelector('.input-amount-field');
import { debounce } from "../helper";
import View from "./View.js";

class ConvertView extends View {
  
    _parentElement = document.querySelector('.output-amount-field');

    _handleInput(element,event,handler) {
        element.addEventListener(event,debounce(async function() {
            await handler();
          },1000),
        ); 
    }

    addHandlerKeyup(handler) {
        this._handleInput(inputAmountField,'keyup',handler);        
        this._handleInput(inputAmountField,'input',handler);
    }

    render(data) {
        this._parentElement.innerHTML = '';
        this._parentElement.textContent = '';
        this._parentElement.textContent = +(data);
    }

    getInputAmount() {
        return +(document.querySelector('.input-amount-field').value);
    }     
}

export default new ConvertView();