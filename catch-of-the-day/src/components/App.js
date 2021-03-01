import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';
class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.object
  }

  componentDidMount() {
    const { params } = this.props.match;
    // reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    })
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // take a copy of existing state
    const fishes = {...this.state.fishes};
    // add new fish to fishes
    fishes[`fish${Date.now()}`] = fish;
    // set the new fishes obj to state
    this.setState({ fishes });
  }

  updateFish = (key, updatedFish) => {
    // take a copy of existing state
    const fishes = { ...this.state.fishes };
    // update the state
    fishes[key] = updatedFish;
    // set the new state
    this.setState({ fishes });
  }

  deleteFish = (key) => {
    // take a copy of existing state
    const fishes = { ...this.state.fishes };
    // update the state
    fishes[key] = null;
    // set the new state
    this.setState({ fishes });
  }

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder = (key) => {
    // take a copy of existing state
    const order = {...this.state.order};
    // add to the order, or update number of order
    order[key] = order[key] + 1 || 1;
    // set the state
    this.setState({ order });
  }

  removeFromOrder = (key) => {
    // take a copy of existing state
    const order = {...this.state.order};
    // remove item from order
    delete order[key];
    // set the state
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fighting COVID" age={19} />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish key={key} 
                    index={key}
                    details={this.state.fishes[key]}
                    addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order 
          fishes={this.state.fishes} 
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory 
          addFish={this.addFish} 
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes} 
          fishes={this.state.fishes}
        />
      </div>
    )
  }
}

export default App;