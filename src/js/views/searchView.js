import { debounce } from "../helper.js";
import View from "./view.js";

const searchInputCurrency = document.querySelector('.search-input-currency')
const searchOutputCurrency = document.querySelector('.search-output-currency');
const searchSymbolCurrency = document.querySelector('.search-currency-chart');

class SearchView  extends View {
/**
   * Read value of searchfield typed by user. 
   * Add handler listener to searchfield.
   * @function SearchView.handlerKeyup
   * @param {Element} searchfield
   * @param {function} handler
   * @param {Number} type of dropdown ? input dropdown (0)|| output dropdown (1) || chart dropdown (2)
   * @returns {function debounce(params) {
       undefined
   }} 
*/
    handlerKeyup(searchfield,handler,type) {
        searchfield.addEventListener('keyup', debounce(async function() {
            const query = searchfield.value;
            handler(query,type);
            },1000),
        );    
    }

/** 
   * Add handler listener to searchInputCurrency and searchOutputCurrency.
   * @function SearchView.addHandlerKeyup
   * @param {function} handler
   * @returns {undefined} 
*/
    addHandlerKeyup(handler) {
        this.handlerKeyup(searchInputCurrency,handler,0);
        this.handlerKeyup(searchOutputCurrency,handler,1);
        this.handlerKeyup(searchSymbolCurrency,handler,2)
    }

/** 
   * Clear searchfeild used to search for currency.
   * @function SearchView.clearField
   * @param {Number} type of dropdown ? input dropdown (0)|| output dropdown (1) || chart dropdown (2)
   * @returns {undefined} 
*/
    clearField(type) {
        if (type === 0) searchInputCurrency.value = '';
        if (type === 1) searchOutputCurrency.value = '';
        if (type === 2 ) searchSymbolCurrency.value = '';
    }
}

export default new SearchView();


