import logo from './logo.svg';
import './App.css';
import Child1 from './Child1';
import SampleDataset from './SampleDataset.csv';
import Child2 from './Child2';
import { Component } from 'react';
import * as d3 from 'd3';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
    }
    
    componentDidMount() {
        let self = this;
        d3
            .csv(SampleDataset, function(d) {
                return {
                    x: d.x,
                    y: d.y,
                    category: d.category
                }
            })
            .then(function(csvData) {
                self.setState({data: csvData});
            });
    }

    render() {
        return (
            <div>
                <Child1 data={ this.state.data } />
                <br></br>
                <br></br>
                <br></br>
                <Child2 data={ this.state.data } />
            </div>
        );
    }
}

export default App;
