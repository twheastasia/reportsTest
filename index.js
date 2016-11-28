import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, message, Icon, BackTop, Spin } from 'antd';

const ReactHighcharts = require('react-highcharts');
// Highcharts more
var HighchartsMore = require('highcharts-more');
HighchartsMore(ReactHighcharts.Highcharts);
var HighchartsExporting = require('highcharts-exporting');
HighchartsExporting(ReactHighcharts.Highcharts);
var Highlight = require('react-highlight');
var HighchartsSolidGauge = require('highcharts-solid-gauge');
HighchartsSolidGauge(ReactHighcharts.Highcharts);

// import qrcode
var QRCode = require('qrcode.react');


var singleExamData = require('./libs/single_exam_chart_data.js');
var overviewExamData = require('./libs/overview_exam_chart_data.js');

// 读取试卷json数据
var exams_data = require('./data/exams.json');

// var chart_config = require('./data/chart_config.json');
// var chart_config = require('./data/chart2.json');
var config1 = singleExamData.get_single_exam_chart_view_data('数学xx试卷', 85);
var config2 = singleExamData.get_single_exam_chart_view_data('English', 75);
var overview_config = overviewExamData.get_overview_exam_chart_data('综合成绩', ['数学','语文','英语','物理'], [90, 80, 70, 60]);
var exam_title = "数学xx考试试卷报告--xx学生";
var exam_rank_info = "你真棒!排名就不告诉你了。";
var qrcode_url = "http://www.alo7.com";
var qrcode_tip = "扫描上面的二维码，分享到手机上。";

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

ReactDOM.render(<p></p>, document.getElementById('loading'));
// ReactDOM.render(<ReactHighcharts config={overview_config} />, document.getElementById('overview_chart'));
ReactDOM.render(<ReactHighcharts config={config1} />, document.getElementById('single_exam_container1'));
// ReactDOM.render(<ReactHighcharts config={config2} />, document.getElementById('single_exam_container2'));
ReactDOM.render(<Icon type="exclamation-circle" />, document.getElementById('info'));
ReactDOM.render(<strong>{exam_title}</strong>, document.getElementById('title'));
ReactDOM.render(<AllExamsContent data={exams_data}/>, document.getElementById('lesson_details'));
ReactDOM.render(<BackTop />, document.getElementById('backtop'));
ReactDOM.render(<p>{exam_rank_info}</p>, document.getElementById('single_exam_rank'));
ReactDOM.render(<QRCode value={qrcode_url} />, document.getElementById('qrcode'));
ReactDOM.render(<p>{qrcode_tip}</p>, document.getElementById('qrcode_tip'));
