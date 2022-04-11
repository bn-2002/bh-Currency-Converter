import { getDate, getTime , getMonth , getDay , getWeekday } from "../helper";
import View from "./View";

import { Chart,registerables } from 'chart.js';
Chart.register(...registerables);

const rangeList = document.querySelector(".range-list");
const chart = document.getElementById("chart").getContext('2d');
const displayAreaBtn = document.querySelector('.chart-area-btn');
let tooltips = [];

class ChartView extends View {
  
  lineChart;
  data = [];
  labels = [];

/**
   * Highlight selected range item 
   * @function ChartView.addChartHandler
   * @param {function} handler
   * @returns {undefined}
   * 
*/
  addChartHandler(handler) {
    rangeList.addEventListener("click", function (e) {
      for(let range of rangeList.children) {
        range.classList.remove('active-range-time');
      }
      const timeRangeEl = e.target.closest(".range-list-item");
      timeRangeEl.classList.add('active-range-time');
      if (!timeRangeEl) return;
      const timeRange = timeRangeEl.getAttribute("data-time-range");
      handler(timeRange);
    });
  }

/**
   * update chart line
   * @function ChartView._updateChart
   * @param {Array} labels
   * @param {Array} data
   * @param {Array} tooltipsArr
   * @returns {undefined}
   * 
*/
  _updateChart(labels,data,tooltipsArr) {
    this.lineChart.data.datasets[0].data = data;
    this.lineChart.data.labels = labels;
    tooltips = tooltipsArr;
    this.lineChart.update();
  }

/**
   * clear chart data
   * @function ChartView._clearChartData
   * @returns {undefined}
   * 
*/
  _clearChartData() {
    this.data = [];
    this.labels = [];
    tooltips = [];
  } 

/**
   * Render Chart (initialize or update)
   * @function ChartView.renderChart
   * @param {Array} labels
   * @param {Array} data
   * @returns {undefined}
   * 
*/
  renderChart(labels,data) {
    //Initialize chart line because this.lineChart hasn`t been defined yet.(for first time)
    if (typeof this.lineChart === 'undefined') {
      this.lineChart = new Chart(chart,{
        type: 'line',
        data: {
            labels:labels,
            datasets: [{
              label: "price",
              fill:false,
              backgroundColor :"#15be9d",
              strokeColor: "brown",
              lineTension: 0.2,
              borderColor: "#15be9d",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointHoverBorderColor: "#15be9d",
              pointHoverBackgroundColor : "#15be9d",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointRadius: 1,
              pointHitRadius: 10,
              data: data,
            }]
        },
        options: {
            responsive : true,
            maintainAspectRatio: false,
            scales: {  
                y : {
                  position : 'left',
                  ticks :{
                    color: 'black',
                  }
                },
                x :{
                  reverse:true,
                  position : 'right',
                    ticks : {
                      color: 'black',
                        autoSkip : true,
                        maxTicksLimit : 12,
                    }
                }
            },
            plugins : {
              tooltip : {
                callbacks : {
                  title : function(context) {
                      return `${tooltips[context[0].dataIndex]}`;
                  }
                }
              },
            },
        },
    })
    }
    //update chart`s data.
    else {
      this._updateChart(this.labels,this.data,tooltips);
    }
    return this.lineChart;
  }

/**
   * Set x and y scales
   * @function ChartView.setChartDetails
   * @param {Array} historyPrice
   * @param {String} timerange
   * @returns {undefined}
   * 
*/
  setChartDetails(historyPrice,timerange) {
    this._clearChartData();
    historyPrice.forEach((info) => {
      const date = new Date(info[0]);
      if (timerange === '1day') {
        this.labels.push(getMonth(date));
      }
      else if (timerange === '5m') { 
        this.labels.push(`${getWeekday(date)}`);
      }
      else if (timerange === '1m') {    
        this.labels.push(`${getWeekday(date)} ${getTime(date)}`);
      }
      else {    
        this.labels.push(`${getDay(date)} ${getMonth(date)}`);
      }
      this.data.push(info[1]);
      tooltips.push(`${getDate(date)} ${getTime(date)}`);
    });
  }

/**
   * add handler to btn (show area)
   * @function ChartView.addHandlerAreaBtn
   * @returns {undefined}
   * 
*/
  addHandlerAreaBtn() {
    const that = this;
    if (typeof that.lineChart) {
      displayAreaBtn.addEventListener('click',function() {
        if (typeof that.lineChart) {
          if (!that.lineChart.data.datasets[0].fill) {
            that.lineChart.data.datasets[0].backgroundColor =  "#15be9d";
            that.lineChart.data.datasets[0].fill = true;
          } else {
            that.lineChart.data.datasets[0].fill = false;
           }
          that.lineChart.update();
          }
      })}
  }
}

export default new ChartView();
