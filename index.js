import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, message } from 'antd';

// 读取试卷json数据
var exams_data = require('./exams.json');

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


ReactDOM.render(<h1 style={{ width: 300, margin: '100px auto'}}>Reports</h1>, document.getElementById('title'));
ReactDOM.render(<AllExamsContent data={exams_data}/>, document.getElementById('lesson_details'));
