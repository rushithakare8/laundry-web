import * as d3 from 'd3';

const w = 300;
const h = 300;
let percent = 85;
const innerRadius = 90;
const ratio = percent / 100;
const outerRadius = (w / 2) - 10;
const color = ['ececec', '#f06b3e', '#888888'];

const pie = d3.pie().value(d => d).sort(null);

const arc = d3.svg.arc()
.innerRadius(0)
.outerRadius(outerRadius)
.startAngle(0)
.endAngle(2 * Math.PI);

const arcLine = d3.svg.arc()
.innerRadius(innerRadius)
.outerRadius(outerRadius - 10)
.startAngle(0);

const svg = d3.select('#chart').append('svg').attr({
  width: w,
  height: h,
  class: 'shadow',
}).append('g')
.attr({ transform: `translate(${w / 2},${h / 2})` });

const defs = svg.append('svg:defs');

const insetShadow = defs.append('svg:filter').attr('id', 'inset-shadow');

insetShadow.append('svg:feOffset').attr({
  dx: 0,
  dy: 0,
});

insetShadow.append('svg:feGaussianBlur').attr({
  stdDeviation: 4,
  result: 'offset-blur',
});

insetShadow.append('svg:feComposite').attr({
  operator: 'out',
  in: 'SourceGraphic',
  in2: 'offset-blur',
  result: 'inverse',
});

insetShadow.append('svg:feFlood').attr({
  'flood-color': 'black',
  'flood-opacity': 0.7,
  result: 'color',
});

insetShadow.append('svg:feComposite').attr({
  operator: 'in',
  in: 'color',
  in2: 'inverse',
  result: 'shadow',
});

insetShadow.append('svg:feComposite').attr({
  operator: 'over',
  in: 'shadow',
  in2: 'SourceGraphic',
});

const path = svg.append('path').attr({ d: arc }).style({
  fill: color[0],
  filter: 'url(#inset-shadow)',
});

const pathForeground = svg.append('path').datum({ endAngle: 0 }).attr({
  d: arcLine,
  transform: 'rotate(180)',
}).style({
  fill: color[1],
  filter: 'url(#inset-shadow)',
});

const middleCount = svg.append('text').datum(0).text(d => d).attr({
  class: 'middleText',
  'text-anchor': 'middle',
  dy: 25,
})
.style({
  fill: d3.rgb(color[2]),
  'font-size': '80px',
  filter: 'url(#inset-shadow)',
});

let oldValue = 0;
const arcTween = (transition, newValue, oldValue) => {
  transition.attrTween('d', d => {
    const interpolate = d3.interpolate(d.endAngle, ((2 * Math.PI)) * (newValue / 100));
    const interpolateCount = d3.interpolate(oldValue, newValue);
    return t => {
      d.endAngle = interpolate(t);
      middleCount.text(`${Math.floor(interpolateCount(t))}%`);
      return arcLine(d);
    };
  });
};

const animate = () => {
  pathForeground.transition().duration(750).ease('cubic').call(arcTween, percent, oldValue);
  oldValue = percent;
  percent = (Math.random() * 80) + 20;
  setTimeout(animate, 3000);
};

setTimeout(animate, 0);
