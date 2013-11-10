$(window).load( function() {

  var margin = {top: 20, right: 80, bottom: 30, left: 50},
      width = 650 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  var parseDate = d3.time.format("%Y%m%d").parse;

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var y2 = d3.scale.linear()
    .range([height, 0]);

  var color = d3.scale.category10();

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var yAxis2 = d3.svg.axis()
      .scale(y)
      .orient("right");

  var line = d3.svg.line()
      .interpolate("basis")
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.stock_price); });

  var line_2 = d3.svg.line()
      .interpolate("basis")
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y2(d.stock_price); });

  // var tip = d3.tip()
  //   .attr('class', 'd3-tip')
  //   .offset([-10, 0])
  //   .html(function(d) {
  //     return "<span style='color:seagreen'>" + y(d.stock_price)+ "</span>";
  //   })

  var svg = d3.select("#content").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  var stock_data, mentions;

  // Parse.initialize("pTIObRSyHRKupzJySoBXk2LIlVIMIYTujkZGJfDp", "VIdoauTktSkduOLw2CDmui2YO28Mb91pTcDS6g7v");
  // var datacsv = Parse.object.extend('stockdata');
  // var query = new Parse.Query(datacsv);

  d3.csv("data.csv", function(error, data) {

    stock_data=data
    color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

    data.forEach(function(d) {
      d.date = parseDate(d.date);
  });



  // svg.call(tip);

  var companies = color.domain().map(function(name) {
      return {
        name: name,
        values: data.map(function(d) {
          return {date: d.date, stock_price: +d[name]};
        })
      };
    });

    x.domain(d3.extent(data, function(d) { return d.date; }));

    y.domain([
      d3.min(companies, function(c) { return d3.min(c.values, function(v) { return v.stock_price; }); }),
      d3.max(companies, function(c) { return d3.max(c.values, function(v) { return v.stock_price; }); })
    ]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Price $");

    svg.append("g")
      .attr("class", "y axis2")
      .attr("transform", "translate(" + (width+15) + ",0)")
      .call(yAxis2)
      .append("text")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Mentions");

  var company = svg.selectAll(".company")
      .data(companies)
      .enter().append("g")
      .attr("class", "company")

      // .on('mouseover', tip.show)
      // .on('mouseout', tip.hide);

    company.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(d.values); })
        .style("stroke", function(d) { return color(d.name); })
        // .on('mouseover', tip.show)
        // .on('mouseout', tip.hide)

    company.append("path")
        .attr("class", "line_2")
        .attr("d", function(d) { return line_2(d.values); })
        .style("stroke", "green")
        // .on('mouseover', tip.show)
        // .on('mouseout', tip.hide)

    company.append("text")
        .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
        .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.stock_price) + ")"; })
        .attr("x", 3)
        .attr("dy", ".35em")
        .text(function(d) { return d.name; });
        // .text(function(d) { return d.stock_price; })

  var div = d3.select("body").append("div")
      // .attr("class", "tooltip")
      // .style("opacity", 0);

  });

});