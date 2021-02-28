import React, { Component } from 'react';

export default class EditFishForm extends Component {
  handleChange = (e) => {
    // update the fish:
    // 1. take a copy of current fish
    const updatedFish = { 
      ...this.props.fish,
      [e.currentTarget.name]: e.currentTarget.value
    };
    // 2. update the fish, send the changes "upstream" to state
    this.props.updateFish(this.props.index, updatedFish);
  }
  render() {
    return (
      <div className="fish-edit">
        <input 
          type="text" 
          name="name" 
          onChange={this.handleChange} 
          value={this.props.fish.name} />
        <input 
          type="text" 
          name="price" 
          onChange={this.handleChange} 
          value={this.props.fish.price} />
        <select 
          type="text" 
          name="status" 
          onChange={this.handleChange} 
          value={this.props.fish.status}>
            <option value="available">Fresh!</option>
            <option value="unavailable">Sold Out!</option>
        </select>
        <textarea 
          type="text" 
          name="desc" 
          onChange={this.handleChange} 
          value={this.props.fish.desc}></textarea>
        <input 
          type="text" 
          name="image" 
          onChange={this.handleChange} 
          value={this.props.fish.image} />
      </div>
    );
  }
}
