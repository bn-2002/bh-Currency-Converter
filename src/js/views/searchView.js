import { debounce } from "../helper.js";
import View from "./View.js";

const searchInputCurrency = document.querySelector('.search-input-currency')
const searchOutputCurrency = document.querySelector('.search-output-currency');
const searchSymbolCurrency = document.querySelector('.search-currency-chart');

class SearchView  extends View {

    handlerKeyup(searchfield,handler,type) {
        searchfield.addEventListener('keyup', debounce(async function() {
            const query = searchfield.value;
            handler(query,type);
            },1000),
        );    
    }

    addHandlerKeyup(handler) {
        this.handlerKeyup(searchInputCurrency,handler,0);
        this.handlerKeyup(searchOutputCurrency,handler,1);
        this.handlerKeyup(searchSymbolCurrency,handler,2)
    }

    clearField(type) {
        if (type === 0) searchInputCurrency.value = '';
        if (type === 1) searchOutputCurrency.value = '';
        if (type === 2 ) searchSymbolCurrency.value = '';
    }
}

export default new SearchView();


