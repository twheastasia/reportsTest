import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, message } from 'antd';

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

var exams_data = [
  {
      "category": "Math",
      "exam": "exam1",
      "skills": [
          {
              "name": "jineng1",
              "judgement": "2"
          },
          {
              "name": "jineng2",
              "judgement": "4"
          },
          {
              "name": "jineng3",
              "judgement": "5"
          },
          {
              "name": "jineng4",
              "judgement": "3"
          }
      ],
      "comment": "work much more hard!"
  },
  {
      "category": "English",
      "exam": "exam2",
      "skills": [
          {
              "name": "jineng10",
              "judgement": "5"
          },
          {
              "name": "jineng12",
              "judgement": "4"
          },
          {
              "name": "jineng23",
              "judgement": "5"
          },
          {
              "name": "jineng43",
              "judgement": "3"
          }
      ],
      "comment": "继续努力，继续努力，还有进步的空间，还有上升的余地！不要放弃!"
  }
]
// class ProductRow extends React.Component {
//   render() {
//     var name = this.props.product.stocked ?
//       this.props.product.name :
//       <span style={{color: 'red'}}>
//         {this.props.product.name}
//       </span>;
//     return (
//       <tr>
//         <td>{name}</td>
//         <td>{this.props.product.price}</td>
//       </tr>
//     );
//   }
// }
//
// class ProductTable extends React.Component {
//   render() {
//     var rows = [];
//     var lastCategory = null;
//     this.props.products.forEach(function(product) {
//       if (product.category !== lastCategory) {
//         rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
//       }
//       rows.push(<ProductRow product={product} key={product.name} />);
//       lastCategory = product.category;
//     });
//     return (
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Price</th>
//           </tr>
//         </thead>
//         <tbody>{rows}</tbody>
//       </table>
//     );
//   }
// }
//
// class SearchBar extends React.Component {
//   render() {
//     return (
//       <form>
//         <input type="text" placeholder="Search..." />
//         <p>
//           <input type="checkbox" />
//           {' '}
//           Only show products in stock
//         </p>
//       </form>
//     );
//   }
// }
//
// class FilterableProductTable extends React.Component {
//   render() {
//     return (
//       <div>
//         <SearchBar />
//         <ProductTable products={this.props.products} />
//       </div>
//     );
//   }
// }
//
//
// var PRODUCTS = [
//   {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
//   {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
//   {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
//   {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
//   {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
//   {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
// ];
//
// ReactDOM.render(
//   <FilterableProductTable products={PRODUCTS} />,
//   document.getElementById('overview_chart')
// );

ReactDOM.render(<h1 style={{ width: 400, margin: '100px auto'}}>Reports</h1>, document.getElementById('title'));
ReactDOM.render(<AllExamsContent data={exams_data}/>, document.getElementById('lesson_details'));
