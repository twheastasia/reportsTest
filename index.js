import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, message, Icon, BackTop } from 'antd';

const ReactHighcharts = require('react-highcharts');
// Note that Highcharts has to be in the codebase already
// Highcharts more
var HighchartsMore = require('highcharts-more');
HighchartsMore(ReactHighcharts.Highcharts);
// Highcharts exporting
var HighchartsExporting = require('highcharts-exporting');
HighchartsExporting(ReactHighcharts.Highcharts);
var Highlight = require('react-highlight');
var sg = require('highcharts-solid-gauge');

// 读取试卷json数据
var exams_data = require('./data/exams.json');
var chart_config = require('./data/chart_config.json');
// var chart_config = require('./data/chart2.json');
// var chart_config = {
//         chart: {
//             type: 'solidgauge',
//             marginTop: 50
//         },
//         credits: {
//             text: 'hcharts.cn',
//             href: 'http://www.hcharts.cn'
//         },
//         title: {
//             text: 'Activity',
//             style: {
//                 fontSize: '24px'
//             }
//         },
//         tooltip: {
//             borderWidth: 0,
//             backgroundColor: 'none',
//             shadow: false,
//             style: {
//                 fontSize: '16px'
//             },
//             pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
//             positioner: function (labelWidth, labelHeight) {
//                 return {
//                     x: 200 - labelWidth / 2,
//                     y: 180
//                 };
//             }
//         },
//         pane: {
//             startAngle: 0,
//             endAngle: 360,
//             background: [{ // Track for Move
//                 outerRadius: '112%',
//                 innerRadius: '88%',
//                 backgroundColor: 'blue',
//                 borderWidth: 0
//             }, { // Track for Exercise
//                 outerRadius: '87%',
//                 innerRadius: '63%',
//                 backgroundColor: 'green',
//                 borderWidth: 0
//             }, { // Track for Stand
//                 outerRadius: '62%',
//                 innerRadius: '38%',
//                 backgroundColor: 'yellow',
//                 borderWidth: 0
//             }]
//         },
//         yAxis: {
//             min: 0,
//             max: 100,
//             lineWidth: 0,
//             tickPositions: []
//         },
//         plotOptions: {
//             solidgauge: {
//                 borderWidth: '34px',
//                 dataLabels: {
//                     enabled: false
//                 },
//                 linecap: 'round',
//                 stickyTracking: false
//             }
//         },
//         series: [{
//             name: 'Move',
//             // borderColor: Highcharts.getOptions().colors[0],
//             data: [{
//                 color: 'silver',
//                 radius: '100%',
//                 innerRadius: '100%',
//                 y: 90
//             }]
//         }, {
//             name: 'Exercise',
//             borderColor: 'black',
//             data: [{
//                 color: 'black',
//                 radius: '75%',
//                 innerRadius: '75%',
//                 y: 65
//             }]
//         }, {
//             name: 'Stand',
//             borderColor: 'red',
//             data: [{
//                 color: 'red',
//                 radius: '50%',
//                 innerRadius: '50%',
//                 y: 50
//             }]
//         }]
// };

// 加载单个星星
class Star extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <img src="./resources/star.png" width="50px" height="50px"/>
    );
  }
}

// 显示若干个星星，可能有半个星星
class ShowStars extends React.Component{
  constructor(props){
    super(props);
    this.state = {count: props.count};
  }

  render(){
    // 拼接多个星星
    const rows = [];
    for (var i = 0; i < parseFloat(this.state.count); i++) {
      rows.push(<Star key={i}/>);
    }
    return(
      <div>
        {rows}
      </div>
    );
  }
}

class TechRow extends React.Component{
  constructor(props){
    super(props);
    this.state = {jineng: props.jineng, stars: props.stars};
  }

  render(){
    return (
      <tr>
        <td>{this.state.jineng}</td>
        <td><ShowStars count={this.state.stars}/></td>
      </tr>
    );
  }
}

class LessonTable extends React.Component{
  constructor(props){
    super(props);
    this.state = {"data": this.props.data};
  }

  render(){
    var rows = [];
    this.state.data.skills.forEach(function(cell){
      rows.push(<TechRow key={cell.name} jineng={cell.name} stars={cell.judgement}/>);
    });
    return (
      <table>
        <thead>
          <tr>
            <th>技能</th>
            <th>评分</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class LessonOverViewTable extends React.Component{
  constructor(props){
    super(props);
    this.state = {"exam_data": this.props.exam_data};
  }

  render(){
    return(
      <table>
        <thead>
          <tr>
            <th>{this.state.exam_data.category+" "+this.state.exam_data.exam}</th>
            <th>建议意见</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><LessonTable data={this.state.exam_data}/></td>
            <td>{this.state.exam_data.comment}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}


class AllExamsContent extends React.Component {
  constructor(props){
    super(props);
    this.state = {"exams_data": this.props.data};
  }

  render(){
    var rows = [];
    this.state.exams_data.forEach(function(exam_data){
      rows.push(<LessonOverViewTable key={exam_data.exam} exam_data={exam_data} />);
    });

    return(
      <div>
        {rows}
      </div>
    );
  }
}

ReactDOM.render(React.createElement(ReactHighcharts, { config: chart_config }), document.getElementById('container'));
ReactDOM.render(<Icon type="exclamation-circle" />, document.getElementById('info'));
ReactDOM.render(<h1 style={{ width: 300, margin: '100px auto'}}>Reports</h1>, document.getElementById('title'));
ReactDOM.render(<AllExamsContent data={exams_data}/>, document.getElementById('lesson_details'));
ReactDOM.render(<BackTop />, document.getElementById('backtop'));
