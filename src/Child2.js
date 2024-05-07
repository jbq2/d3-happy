import { Component } from "react";

class Child2 extends Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
    }

    componentDidMount() {
        console.log('Child2 mounted');
    }

    componentDidUpdate() {
        console.log('Child2 updated');
        const rawData = this.props.data;
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default Child2;