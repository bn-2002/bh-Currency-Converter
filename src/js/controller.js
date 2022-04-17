import * as model from "./model.js";
import convertView from "./views/convertView.js";
import dropdownView from "./views/dropdownView.js";
import searchView from "./views/searchView.js";
import chartView from "./views/chartView.js";
import containerView from "./views/containerView.js";
import { updateDateAndTime } from "./helper.js";


if (module.hot) {
  module.hot.accept();
}

const controlLoadDropdown = async function () {
  try {
    //Load currencies data.
    await model.loadCurrencies();

    //Render currencies as a dropdown. //0
    dropdownView.render(model.state.currencies,0);

    //Load data for chart dropdown
    await model.getSymbols();
    
    //Render symbols in chart dropdown //2
    dropdownView.render(model.state.symbols,2);

  } catch (err) {
    containerView.renderEror('there is problem in your internet connection!')
    console.error(err);
  }
};

const controlConverter = async function () {
  try {

    //render spinner in result filed
    convertView.renderSpinner();

    //Gets input amount.
    const inputAmount = convertView.getInputAmount();

    if (inputAmount < 0) throw new Error('please enter valid amount');

    //Load and calculate output amount based on input amount.
    await model.calcOutputAmonut(inputAmount);

    //Render and display output feild.
    convertView.render(model.state.outputAmonut);


  } catch (err) {
    containerView.renderEror(err);
  }
};

const controlSelectedItem = function (id,type) {
  //Search for selected currency data.
  const currency = model.getSelectedCurrency(id,type);

  //Render selected currency data
  dropdownView.renderSelectedCurrency(currency,type);

  //close dropdown
  dropdownView.close(type);

  //reset dropDown
  if (type === 0 || type === 1 ) dropdownView.render(model.state.currencies,type,true);

  if (type === 2 ) dropdownView.render(model.state.symbols,type,true);

  //clear searchfield
  searchView.clearField(type);

  //Update output feild and display it.
  if (type === 0 || type === 1 ) {
    controlConverter();  
  }
  else if (type ===2) {

  model.state.selectedSymbol = id;
  controlChart(model.state.timeRange,model.state.selectedSymbol);
  }
};

const controlSearchResults = function (query,type) {
  //Load search results according to query.
  const searchResults = model.loadSearchResults(query, type);

  //Render and dispaly search results.
  dropdownView.render(searchResults,type, true);

};

const controlChart = async function (timeRange,symbol) {
  try {
    if (timeRange) model.state.timeRange = timeRange;
    if (symbol) model.state.selectedSymbol = symbol;

    // get history price from api
    await model.gethistoryPrice();
    
    // set chart y and x data
    chartView.setChartDetails(model.state.historyPrice,model.state.timeRange);

    //render chart and display it
    chartView.renderChart(chartView.labels,chartView.data,model.state.historyPrice);

  }
     catch(err) {
      containerView.renderEror('there might be a problem.Try again.')
       console.error(err);
     }
}

const init = function () {
  updateDateAndTime();
  containerView.addErrorHandler();
  dropdownView.addHandlerLoadDropdown(controlLoadDropdown);
  convertView.addHandlerKeyup(controlConverter);
  dropdownView.addHandlerDisplayDropdown();
  dropdownView.addHandlerDropdownItem(controlSelectedItem);
  searchView.addHandlerKeyup(controlSearchResults);
  chartView.addHandlerChartType(controlChart);
  chartView.addChartHandler(controlChart);
  chartView.addHandlerAreaBtn();
};

init(); 
