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
