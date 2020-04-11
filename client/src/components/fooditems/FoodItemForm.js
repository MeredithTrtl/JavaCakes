import React, {Component} from 'react';

class FoodItemForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      foodItem:{
        name: "",
        stock: 0,
        category: null
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
  }

  componentDidMount(){
    if(this.props.foodItem){
      this.setState({foodItem: {...this.props.foodItem}})
    }
  }

  findCategoryIndex(){
    if(this.props.foodItem){
      return this.props.categories.findIndex(category => this.props.foodItem.category.id === category.id)
    } else {
      return null;
    }
  }

  handleChange(event){
    let propertyName = event.target.name;
    let foodItem = this.state.foodItem
    foodItem[propertyName] = event.target.value;
    this.setState({foodItem: foodItem})
  }

  handleSubmit(event){
    event.preventDefault();
    if(this.state.foodItem.id){
      this.props.onUpdate(this.state.foodItem)
    } else {
      this.props.onCreate(this.state.foodItem);
    }
  }

  handleCategory(event){
    const index = parseInt(event.target.value)
    const selectedCategory = this.props.categories[index]
    let foodItem = this.state.foodItem;
    foodItem['category'] = selectedCategory
    this.setState({foodItem: foodItem})
  }

  render(){

    if(!this.props.categories){
      return <p>Please wait...</p>
    }
    let heading = ""

    if (!this.props.foodItem){
      heading = "Create New Item"
    } else {
      heading = "Edit" + this.props.foodItem.name;
    }

    const categoryOptions = this.props.categories.map((category, index) => {
      return <option key={index} value={index}>{category.name}</option>
    })

    return(
      <div className = "foodItemForm">
      <h3>{heading}</h3>
      <form onSubmit={this.handleSubmit}>
      <input type="text" placeholder="name of Item" name="name" onChange={this.handleChange} value={this.state.foodItem.name}/>
      <input type="number" placeholder="stock" name="stock" onChange={this.handleChange} value={this.state.foodItem.stock}/>
      <select name="category" defaultValue={this.findCategoryIndex() || 'select-category' } onChange={this.handleCategory}>
      <option disabled value="select-category">Where would you like to put this Item?</option>
      {categoryOptions}
      </select>
      <button type="submit">Add Item to stock</button>
      </form>
      </div>
    )
  }
}

export default FoodItemForm;