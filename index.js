import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, message } from 'antd';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
  }
  handleChange(date) {
    message.info('您选择的日期是: ' + date.toString());
    this.setState({ date });
  }
  render() {
    return (
      <div style={{ width: 400, margin: '100px auto' }}>
        <DatePicker onChange={value => this.handleChange(value)} />
        <div style={{ marginTop: 20 }}>当前日期：{this.state.date.toString()}</div>
      </div>
    );
  }
}


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
  }

  render(){
    var rows = [];
    [1,2,3,4,5].forEach(function(cell){
      rows.push(<TechRow key={cell} jineng={"jineng"+cell} stars={cell+""}/>);
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
  }

  render(){
    return(
      <table>
        <thead>
          <tr>
            <th>数学</th>
            <th>建议意见</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><LessonTable /></td>
            <td>参考建议balabala</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

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

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<h1 style={{ width: 400, margin: '100px auto'}}>Reports</h1>, document.getElementById('title'));
ReactDOM.render(<LessonOverViewTable />, document.getElementById('lesson_details'));
