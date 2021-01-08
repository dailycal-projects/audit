let keys = Object.keys(pie_data["1996-97"])
let keyDict = {"Asian": "Asian", "White": "White", "International": "International", "Chicano_Latino": "Chicanx Latinx", "African_American": "African American", "Decline_to_State": "Unknown", "Native_American_Alaska_Native": "Native American Alaska Native", "Pacific_Islander": "Pacific Islander"}

let selectedCategory2 = "2019-20"

const select2 = d3.select('#select-div')
.append('select')
.attr('id', 'category-select')

select2
  .selectAll('option')
  .data(Object.keys(pie_data))
  .enter()
  .append('option')
  .attr('value', function (d) {
    return d
  })
  .text(function (d) {
    return d
  })

const svg6 = d3
  .select('#my_dataviz4')
.append("svg")
    .attr("width", width)
    .attr("height", height)
.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


update()

function update(d, i) {
  let data2 = pie_data[selectedCategory2]
  let pied_data2 = pie(d3.entries(data2))
  svg6
      .selectAll('all')
      .data(pied_data2)
      .enter()
      .append('path')
      .attr('d', d3.arc()
          .innerRadius(radius * 0.5)
          .outerRadius(radius)
      )
      .attr('fill', function(d){ return(color(d.data.key)) })
      .attr("stroke", "black")
      .style("stroke-width", "1px")
      .on("mouseover", function(d, i) {
          d3.select(this)
              .style("opacity", 0.7)
          tooltip2.transition()
              .style("opacity", 1)
          tooltip2.html("<strong>"+ keyDict[keys[i]] + "</strong><br>" + Math.round(data2[keys[i]] / total(data2) * 10000) / 100 + "%")
              .style("left", (3 * width / 2 + margin1 - 75) + "px")
              .style("top", (height / 2 + 18) + "px")
        })
      .on("mouseout", function(d) {
          d3.select(this)
              .style("opacity", 1)
          tooltip2.transition()
              .style("opacity", 0)
          })
};

select.on("change", function (d) {
      selectedCategory2 = d3.select(this).property("value");
      svg6.selectAll("*").remove();
      update();
  })
