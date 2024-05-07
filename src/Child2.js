import { Component } from "react";
import * as d3 from 'd3';

class Child2 extends Component {

    dropdownChanged = false;

    constructor(props) {
        super(props);
        this.dropdownChanged = false
        this.state = {
            data: [],
            selection: 'A',
        };
    }

    componentDidMount() {
        console.log('Child2 mounted');
    }

    componentDidUpdate() {
        console.log('Child2 updated');
        const currSelection = this.state.selection;
        const filteredData = this.props.data.filter(d => d.category === currSelection);

        const margin = {
            top: 100,
            bottom: 75,
            left: 75,
            right: 30
        };

        const svgWidth = 800 - margin.left - margin.right;
        const svgHeight = 800 - margin.top - margin.bottom;

        const svgContainer = d3.select('#svg-child-2-container')
            .attr('width', svgWidth)
            .attr('height', svgHeight);

        svgContainer.selectAll('#child-2-plot-group').remove();
        
        const plotGroup = svgContainer.selectAll('#child-2-plot-group')
            .data([0])
            .join('g')
            .attr('id', 'child-2-plot-group')
            .attr('transform', `translate(0, 0)`);
        
        const xData = filteredData.map(d => parseInt(d.x));
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(xData) + 0.5])
            .range([margin.left, svgWidth]);
        
        const yData = filteredData.map(d => parseInt(d.y));
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(yData)])
            .range([svgHeight - margin.bottom, margin.top]);
        
        svgContainer.selectAll('#child-1-x-axis-g')
            .data([0])
            .join('g')
            .attr('id', 'child-1-x-axis-g')
            .attr('transform', `translate(0, ${svgHeight - margin.bottom})`)
            .call(d3.axisBottom(xScale));

        svgContainer.selectAll('#child-1-y-axis-g')
            .data([0])
            .join('g')
            .attr('id', 'child-1-y-axis-g')
            .attr('transform', `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(yScale));

            
        const toolTip = d3.select('body')
            .selectAll('#tool-tip-div')
            .data([0])
            .join('div')
            .attr('id', 'tool-tip-div')
            .style('position', 'absolute')
            .style('visibility', 'hidden');
        
        plotGroup.selectAll('.point')
            .data(filteredData)
            .join('circle')
            .attr('className', 'point')
            .attr('r', 4)
            .attr('cx', d => xScale(d.x))
            .attr('cy', d => yScale(d.y))
            .attr('fill', 'teal')
            .on('mouseover', (event, d) => {
                console.log(event);
                toolTip.html(`X: ${d.x}, Y: ${d.y}`)
                    .style('visibility', 'visible')
                    .style('background-color', 'white');
            })
            .on('mousemove', (event) => {
                toolTip
                    .style('top', event.pageY - 10 + 'px')
                    .style('left', event.pageX + 10 + 'px');
            })
            .on('mouseout', (event) => {
                console.log(event);
                toolTip.style('visibility', 'hidden');
            });
        
        svgContainer.selectAll('#child-1-x-label')
            .data([0])
            .join('text')
            .attr('id', 'child-1-x-label')
            .attr('x', 25)
            .attr('y', svgHeight / 2)
            .text('X');

        svgContainer.selectAll('#child-1-y-label')
            .data([0])
            .join('text')
            .attr('id', 'child-1-y-label')
            .attr('x', svgWidth / 2)
            .attr('y', svgHeight - 25)
            .text('Y');
    }


    render() {
        return (
            <div style={{ position: "absolute", width: "30px" }}>
                <select onChange={(e) => {
                    console.log(`dropdown changed to ${e.target.value}`)
                    this.setState({selection: e.target.value});
                    this.dropdownChanged = true;
                }}>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
                <svg id="svg-child-2-container"></svg>
            </div>
        );
    }
}

export default Child2;