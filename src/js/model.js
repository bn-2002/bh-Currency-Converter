import { API_VERSION, BASE_URL, API_URL, KEY } from "./config.js";

export const state = {
  inputAmount: "",
  inputCurrency: "BTC", 
  proportion: "",
  outputAmonut: "",
  outputCurrency: "USD", 
  currencies: [],
  historyPrice: [],
  symbols: [],
  selectedSymbol: "btcusd", 
  timeRange: "1m",
};

/**
 * Calculate and sets model.state.outputAmount.
 * @function calcOutputAmonut
 * @param {Number} inputAmount the number that given by user.
 * @returns {undefined}
 */
export const calcOutputAmonut = async function (inputAmount) {
  try {
    await fetch(
      `${API_URL}ticker?key=${KEY}&ids=${state.inputCurrency}&convert=${state.outputCurrency}`
    )
      .then((response) => response.json())
      .then((data) => {
        state.proportion = +data[0].price;
        state.inputAmount = +inputAmount;
        state.outputAmonut = (state.proportion * state.inputAmount).toFixed(3);
      });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Load all currencies available and sets currencies array.
 * @function loadCurrencies
 * @returns {undefined}
 */
export const loadCurrencies = async function () {
  try {
    await fetch(`${API_URL}ticker?key=${KEY}`)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((curr) => {
          const currency = {
            id: curr.id,
            price: curr.price,
            logoUrl: curr.logo_url,
          };
          state.currencies.push(currency);
        });
      });
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Search for selected currency data {id,price(USD),logoURl}.
 * @function getSelectedCurrency
 * @param {Number} id id of selected currency
 * @param {Number} type of dropdown ? input dropdown (0)|| output dropdown (1) || chart dropdown (2)
 * @returns {object} currency instance
 */
export const getSelectedCurrency = function (id, type) {
  //Search for selected currency in state array
  if (type === 0 || type === 1) {
    const selectedcurrency = state.currencies.find((curr) => curr.id === id);

    //Set model.state according to type of selectd currency.
    switch (type) {
      case 0:
        state.inputCurrency = id;
        break;
      case 1:
        state.outputCurrency = id;
        break;
      case 2: {
        state.selectedSymbol = id;
        break;
      }
    }
    return selectedcurrency;
  }

  if (type === 2) {
    return state.symbols.find((symbol) => symbol.id === id);
  }
};

/**
 * Search for results based on query
 * @function loadSearchResults
 * @param {string}  : query
 * @param {Number} type of dropdown ? input dropdown (0)|| output dropdown (1) || chart dropdown (2)
 * @returns {object[]} {array of search results objects(currencies)}
 */
export const loadSearchResults = function (query, type) {
  let searchResults;
  if (type === 0 || type === 1) {
    searchResults = state.currencies.filter((curr) =>
      curr.id.startsWith(query)
    );
  } else if (type === 2) {
    searchResults = state.symbols.filter((curr) => curr.id.startsWith(query));
  }
  return searchResults;
};

/**
 * Get history of prices of a currency.
 * @function gethistoryPrice
 * @returns {undefined}
 */
export const gethistoryPrice = async function () {
  try {
    fetch(
      `${BASE_URL}/${API_VERSION}/candles/${state.selectedSymbol}/${state.timeRange}`,
    )
      .then( response => response.json())
      .then( data => state.historyPrice = data);
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Get symbols of currencies from genemi api
 * @function getSymbols
 * @returns {undefined}
 */
export const getSymbols = async function () {
  try {
    await fetch(`${BASE_URL}/v1/symbols`)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((curr) => {
          const currency = {
            id: curr,
          };
          state.symbols.push(currency);
        });
      });
  } catch (err) {
    throw new Error(err);
  }
};
