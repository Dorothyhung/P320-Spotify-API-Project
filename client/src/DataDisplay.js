import './App.css';
import React, {useState, useEffect} from 'react';
import ReactApexChart from 'react-apexcharts';

// Library used: https://github.com/apexcharts/react-apexcharts
// Code adapted from here: https://apexcharts.com/react-chart-demos/radar-charts/basic/

// DataDisplay component which handles Radar chart
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
              text: ""
            },
            xaxis: {
              categories: ['Acousticness', 'Danceability', 'Energy', 'Liveness', 'Speechiness', 'Valence']
            }
          },
        };
      }
      render() {
        return (
          <div>
            <div id="chart" className="text-dark">
              <ReactApexChart options={this.state.options} series={this.state.series} type="radar" height={500} width={450} />
            </div>
            <div id="html-dist"></div>
          </div>
        );
      }
}
export default RadarDisplay;