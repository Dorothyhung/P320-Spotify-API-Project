import './App.css';
import React, {useState, useEffect} from 'react';
import ReactApexChart from 'react-apexcharts';

// Library used: https://github.com/apexcharts/react-apexcharts
  // npm install react-apexcharts apexcharts
// Code adapted from here: https://apexcharts.com/react-chart-demos/radar-charts/basic/

class RadarDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          series: [{
            name: 'Song Analysis',
            data: [props.ac, props.da, props.en, props.li, props.sp, props.va],
          }],
          options: {
            chart: {
              height: 350,
              type: 'radar',
            },
            title: {
              text: 'Title Track'
            },
            xaxis: {
              categories: ['Acousticness', 'Danceability', 'Energy', 'Liveness', 'Speechiness', 'Valence']
            }
          },
        };
      }
      render() {
        return (
          <div style={{position: 'absolute', right: '0px', top: '0px', padding: '5%'}}>
            <div id="chart" style={{
            backgroundColor: 'black',
            borderStyle: 'solid',
            borderWidth: '2px',
            float: 'right'}}>
              <ReactApexChart options={this.state.options} series={this.state.series} type="radar" height={350} width={350} style={{float: 'right'}}/>
            </div>
            <div id="html-dist"></div>
          </div>
        );
      }
    }
//const domContainer = document.querySelector('#app');
//ReactDOM.render(React.createElement(ApexChart), domContainer);
export default RadarDisplay;