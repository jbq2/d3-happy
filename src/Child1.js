import { Component } from "react";
import * as d3 from 'd3';

class Child1 extends Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
    }

    componentDidMount() {
        console.log('Child1 mounted');
    }

    componentDidUpdate() {
        console.log('Child1 updated');
        const rawData = this.props.data;
        const formattedData = this.formatData(rawData);
        console.log(formattedData);

        const margin = {
            top: 10,
            bottom: 70,
            left: 30,
            right: 30
        };

        const svgWidth = 800 - margin.left - margin.right;
        const svgHeight = 500 - margin.top - margin.bottom;

        const svgContainer = d3.select('#svg-child-1-container')
            .attr('width', svgWidth)
            .attr('height', svgHeight);

        const xScale = d3.scaleBand()
            .domain(formattedData.map(d => d.category))
            .range([margin.left, svgWidth])
            .padding(0.2);
        
        const yScaleHeight = svgHeight - margin.top - margin.bottom;
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(formattedData.map(d => d.total))])
            .range([svgHeight, margin.bottom]);
        
        svgContainer.selectAll('#child-1-x-axis-g')
            .data([0])
            .join('g')
            .attr('id', 'child-1-x-axis-g')
            .attr('transform', `translate(0, ${svgHeight - margin.bottom + 10})`)
            .call(d3.axisBottom(xScale));
        
        const plotGroup = svgContainer.selectAll('#child-1-plot-group')
            .data([0])
            .join('g')
            .attr('id', 'child-1-plot-group')
            .attr('transform', `translate(0, 10)`)
        
        plotGroup.selectAll('rect')
            .data(formattedData)
            .join('rect')
            .attr('x', d => xScale(d.category))
            .attr('y', d => yScale(d.total) - margin.bottom)
            .attr('width', xScale.bandwidth())
            .attr('height', d => svgHeight - yScale(d.total))
            .attr('fill', 'teal');

        svgContainer.selectAll('#x-label')
            .data([0])
            .join('text')
            .attr('id', 'x-label')
            .attr('y', svgHeight - 10)
            .attr('x', (svgWidth / 2) - 10)
            .attr('stroke', 'black')
            .attr('font-size', 15)
            .text('categories')
        
        plotGroup.selectAll('.bar-label')
            .data(formattedData)
            .join('text')
            .attr('className', 'bar-label')
            .attr('x', d => (xScale(d.category) + (xScale.bandwidth() / 2.0)))
            .attr('y', d => yScale(d.total) - margin.bottom + margin.top + 10)
            .attr('stroke', 'white')
            .attr('font-size', 15)
            .text(d => d.total);
    }

    formatData(rawData) {
        const categories = Array.from(new Set(rawData.map(d => d.category)));
        return categories.map(cat => {
            const totalInCategory = rawData
                .filter(d => d.category === cat)
                .length
            return {category: cat, total: totalInCategory}
        });
    }

    render() {
        return (
            <div>
                <svg id="svg-child-1-container"></svg>
            </div>
        );
    }
}

export default Child1;