import { getDate, getTime , getMonth , getDay , getWeekday } from "../helper";
import View from "./View";
import { Chart,registerables } from 'chart.js';
Chart.register(...registerables);

const rangeList = document.querySelector(".range-list");
const lineChartContainer = document.querySelector('.lineChartContainer');
const chart = document.getElementById("chart").getContext('2d');
const candleChart = document.getElementById("candle-chart");
const displayAreaBtn = document.querySelector('.chart-area-btn');
const dispalyLineChartBtn = document.querySelector('.display-line-chart');
const dispalyCandleChartBtn = document.querySelector('.display-candle-chart');

let tooltips = [];

class ChartView extends View {
  
  chartType = 'linechart';
  candleChartData = [];
  lineChart;
  stockChart;
  data = [];
  labels = [];

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

  _updateLineChart(labels,data,tooltipsArr) {
    this.lineChart.data.datasets[0].data = data;
    this.lineChart.data.labels = labels;
    tooltips = tooltipsArr;
    this.lineChart.update();
  }

  _clearChartData() {
    this.data = [];
    this.labels = [];
    tooltips = [];
  } 

  _renderLineChart(labels,data) {
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

  renderChart(labels,data,historyPrice) {
    if (this.chartType === 'linechart') {
      candleChart.classList.add('hidden');
      lineChartContainer.classList.remove('hidden');
      if (typeof this.lineChart === 'undefined') {
        this._renderLineChart(labels,data);
        } else if (typeof this.lineChart !== 'undefined') {
          this._updateLineChart(this.labels,this.data,tooltips);
        }
    }

    if (this.chartType === 'candlechart') {
      lineChartContainer.classList.add('hidden');
      candleChart.classList.remove('hidden');
        if (typeof this.stockChart === 'undefined') {
          this._renderCandleChart(historyPrice);
        } else if (typeof this.stockChart !== 'undefined') {
          this._updateCandleChart(historyPrice);
        }
      }
  }

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

  addHandlerAreaBtn() {
    const that = this;
    if (typeof that.lineChart && this.chartType === 'linechart') {
      displayAreaBtn.addEventListener('click',function() {
        if (typeof that.lineChart) {
          if (!that.lineChart.data.datasets[0].fill) {
            that.lineChart.data.datasets[0].backgroundColor =  "#15be9d";
            that.lineChart.data.datasets[0].fill = true;
            displayAreaBtn.classList.add('selected-button');
          } else {
            that.lineChart.data.datasets[0].fill = false;
            displayAreaBtn.classList.remove('selected-button');
           }
          that.lineChart.update();
          }
      })}
  }

  _getOptions(array) {
    this.candleChartData = [];
    array.forEach(data => {
        const obj = {
            x : new Date(data[0]),
            y : [data[1],data[2],data[3],data[4]]
        }
        this.candleChartData.push(obj);
    })
  }

  _renderCandleChart(history) {

    this._getOptions(history);
  
    const options = {
        series: [{
        data : this.candleChartData,
      }],
        chart: {
        type: 'candlestick',
        height: 560
      },
      title: {
        align: 'left'
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    };
    
    this.stockChart = new ApexCharts(candleChart,options);
    this.stockChart.render();
  }

  _updateCandleChart(history) {
    
    this._getOptions(history);

    this.stockChart.updateOptions({
      series: [{
        data: this.candleChartData,
      }],
    })
  }

  addHandlerChartType(handler) {
    const that = this;
    dispalyCandleChartBtn.addEventListener('click',function() {
      that.chartType = 'candlechart';
      dispalyLineChartBtn.classList.remove('selected-button');
      dispalyCandleChartBtn.classList.add('selected-button');
      handler();
    });

    dispalyLineChartBtn.addEventListener('click',function() {
      that.chartType = 'linechart';
      dispalyLineChartBtn.classList.add('selected-button');
      dispalyCandleChartBtn.classList.remove('selected-button');
      handler();
    })
  }
}

export default new ChartView();
