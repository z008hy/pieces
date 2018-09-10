/**
 * 基础柱状图
 */
(function () {
  const dom = '#columnChart'
  const fillColor = '#3AA1FF'
  const hoverColor = '#2d8cf0'
  const svgHeigth = 300
  const svgWidth = 600
  const rectWidth = 36
  const padding = {left: 36, top: 26, bottom: 26}
  const dataset = [38, 52, 61, 145, 48, 38, 38, 38]

  /* 创建画布 */
  const svg = d3.select(dom).append('svg').attr('width', svgWidth + padding.left).attr('height', svgHeigth + padding.top + padding.bottom)
  /* 创建x轴比例尺 */
  const xLinear = d3.scale.ordinal().domain(d3.range(dataset.length)).rangeRoundBands([0, svgWidth])
  /* 创建x轴比例尺 */
  const yLinear = d3.scale.linear().domain([0, d3.max(dataset)]).range([svgHeigth, 0])
  /* 创建x坐标系 */
  const xAxis = d3.svg.axis().scale(xLinear).orient('bottom')
  /* 创建y坐标系 */
  const yAxis = d3.svg.axis().scale(yLinear).orient('left')

  /* 绘制画布 */
  svg.selectAll('rect').data(dataset).enter().append('rect')
    .attr('fill', fillColor)
    .on('mouseover', function(d,i) {
      d3.select(this)
        .attr('fill', hoverColor)
    })
    .on('mouseout', function(d,i) {
      d3.select(this)
        .transition()
        .duration(500)
        .attr("fill", fillColor)
    })
    .attr('x', function (d, i) {
      return xLinear(i) + padding.left + rectWidth/2
    })
    // 增加事件hover效果
    .attr('y', function (d) {
      return 0
    })
    .transition()
    .delay(function(d,i) {
      return i * 200;
    })
    .duration(1000)
    .ease('bounce')
    .attr('y', function (d) {
      return yLinear(d) + padding.top
    })
    .attr('width', rectWidth)
    .attr('height', function (d) {
      return svgHeigth - yLinear(d)
    })
  /* 绘制x轴 */
  svg.append('g').attr('class', 'axis')
    .attr('transform', `translate(${padding.left}, ${svgHeigth + padding.bottom})`)
    .call(xAxis)
  /* 绘制y轴 */
  svg.append('g').attr('class', 'axis')
    .attr('transform', `translate(${padding.left}, ${padding.bottom})`)
    .call(yAxis)
} ());

/**
 * 布局饼图
 */
(function () {
  const dom = '#pieChart'
  const dataset = [ 30 , 10 , 43 , 55 , 13 ]
  const outerR = 150
  const width = 600
  const height = 600
  const innerR = 0

  /* 创建布局 */
  const pie = d3.layout.pie()
  /* 生成布局数据 */
  const pieData = pie(dataset)
  /* 创建弧生成器更具半径 */
  const arc = d3.svg.arc().innerRadius(innerR).outerRadius(outerR)
  /* 创建颜色比例尺 */
  const color = d3.scale.category10()

  /* 绘制画布 */
  const svg = d3.select(dom).append('svg').attr('width', width).attr('height', height)
    .selectAll('g').data(pieData).enter().append('g')
    .attr('transform', `translate(${(width/2)}, ${(width/2)})`)
  /* 添加路径 */
  svg.append('path')
    .attr('fill', function(d,i){
      return color(i)
    })
    .attr('d', function(d){
      return arc(d);   //调用弧生成器，得到路径值
    })
  /* 添加文本数据 */
  svg.append('text')
    .attr('transform', function (d) {
      return `translate(${arc.centroid(d)})`;
    })
    .attr("text-anchor","middle")
    .text(function (d) {
      return d.data
    })
} ());

/**
 * 布局力导向图
 */
(function () {
  const dom = '#forceChart'
  const lineColor = '#3AA1FF'
  const width = 600
  const height = 600
  const lineLength = 150
  const forceCharge = -400
  const ponitR = 20
  const nodes = [
    {name: '北京', index: 0},
    {name: '上海', index: 1},
    {name: '杭州', index: 2},
    {name: '武汉', index: 3},
    {name: '西安', index: 4},
    {name: '成都', index: 5},
    {name: '郑州', index: 6},
    {name: '重庆', index: 7},
    {name: '兰州', index: 8},
    {name: '深圳', index: 9}
  ]
  const edges = [
    { source : 0 , target: 1 },
    { source : 0 , target: 6 },
    { source : 1 , target: 2 },
    { source : 1 , target: 9 },
    { source : 3 , target: 9 },
    { source : 4 , target: 5 },
    { source : 4 , target: 8 },
    { source : 5 , target: 7 },
    { source : 6 , target: 1 },
    { source : 6 , target: 3 },
    { source : 6 , target: 4 }
  ]


  // /* 创建布局 */
  const force = d3.layout.force().nodes(nodes).links(edges).size([width, height]).linkDistance(lineLength).charge(forceCharge)
  // /* 创建颜色 */
  const color = d3.scale.category20()


  // /* 绘制画布 */
  const svg = d3.select(dom).append('svg').attr('width', width).attr('height', height)
  // /* 绘制连线 */
  const svgEdges = svg.selectAll('line').data(edges).enter().append('line')
    .style('stroke', lineColor)
    .style('stroke-width', 1)
  // /* 绘制节点 */
  const svgNodes = svg.selectAll('circle').data(nodes).enter().append('circle')
    .attr('r', ponitR)
    .style('fill', function (d, i) {
      return color(i)
    })
    .call(force.drag)
  // /* 绘制文字 */
  const svgTexts = svg.selectAll('text').data(nodes).enter().append('text').style('fill', 'black')
    .attr('dx', 20)
    .attr('dy', 8)
    .text(function (d) {
      return d.name
    })

  force.start();	//开始作用


  force.on('tick', function () {
    svgEdges.attr('x1', function (d) {
      return d.source.x
    }).attr('y1', function (d) {
      return d.source.y
    }).attr('x2', function (d) {
      return d.target.x
    }).attr('y2', function (d) {
      return d.target.y
    })
    svgNodes.attr('cx', function (d) {
      return d.x
    }).attr('cy', function (d) {
      return d.y
    })
    svgTexts.attr('x', function (d) {
      return d.x
    }).attr('y', function (d) {
      return d.y
    })
  })
} ());