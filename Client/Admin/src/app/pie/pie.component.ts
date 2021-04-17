import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DatabaseService } from './../services/database.service';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
})
export class PieComponent implements OnInit {
  constructor(private dataBaseService: DatabaseService) {}
  data = [];
 

  ngOnInit(): void {
    const myObserver = {
      next: (x) => {
        x.data.map((val) => this.data.push(val));
      },
      error: (err) => console.error('Observer got an error: ', err),
      complete: () => console.log('Observer got a complete notification'),
    };
    this.dataBaseService.getAllProducts().subscribe(myObserver);

    this.createSvg();
    this.createColors();
    this.drawChart();
  }

  private svg;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;

  private createSvg(): void {
    this.svg = d3
      .select('figure#pie')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );
  }

  private createColors(): void {
    this.colors = d3
      .scaleOrdinal()
      .domain(this.data_.map((d) => d.amount.toString()))
      .range(['#c7d3ec', '#a5b8db', '#879cc4', '#677795', '#5a6782']);
  }
  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.amount));
    
    //
    // Build the pie chart
    this.svg
      .selectAll('pieces')
      .data(pie(this.data_))
      .enter()
      .append('path')
      .attr('d', d3.arc().innerRadius(0).outerRadius(this.radius))
      .attr('fill', (d, i) => this.colors(i))
      .attr('stroke', '#121926')
      .style('stroke-width', '1px');

    // Add labels
    const labelLocation = d3.arc().innerRadius(100).outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(this.data_))
      .enter()
      .append('text')
      .text((d) => d.data.address)
      .attr('transform', (d) => 'translate(' + labelLocation.centroid(d) + ')')
      .style('text-anchor', 'middle')
      .style('font-size', 15);
  }

  private data_ = [
    { address: 'Holon', amount: '1664' },
    { address: 'Tel Aviv', amount: '1079' },
    { address: 'Rishon le Zion', amount: '2471' },
    { address: 'Haifa', amount: '1471' },
    { address: 'Ness Ziona', amount: '1000' },
  ];
}
