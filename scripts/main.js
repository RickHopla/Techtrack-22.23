//import javascript//
import gsap from "gsap";

//import d3
import * as d3 from 'd3';

const getData = async () => {
  let response = await fetch(`Harry Potter API.json`);
  let data = await response.json();
  console.log(data);
  return data
};
const createList = async data => {
  const list = document.querySelector(".swiper-wrapper")
  await data.forEach(character => {
    let listItem = document.createElement("div")
    listItem.className = 'swiper-slide';
    listItem.innerHTML = `
    <div class="kaart-info">     
      Name: ${character.name}<br> 
      House: ${character.house}<br>
      Date: ${character.dateOfBirth}
    </div>  
` 
    list.appendChild (listItem)
    
  });
  await new Swiper(".mySwiper", {
    effect: "cards",
    grabCursor: true,
  });
} 

const createPiechart = (info) => {
  // set the dimensions and margins of the graph
    const width = 325,
    height = 325,
    margin = 40;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin;

    // data

    const getPercentage = (house) => {
      const filtered = info.filter((d) => d.house === house);
      return (filtered.length / info.length) * 100;
    };
    
    const hufflepuff = getPercentage("Hufflepuff");
    const gryffindor = getPercentage("Gryffindor");
    const slytherin = getPercentage("Slytherin");
    const ravenclaw = getPercentage("Ravenclaw");
    const noHouse = getPercentage("");
    console.log(hufflepuff, gryffindor, slytherin, ravenclaw, noHouse);

    
    // append the svg object to the div called 'my_dataviz'
    const svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width/2}, ${height/2})`);

    // create 2 data_set
    const data1 = {a: hufflepuff, b: gryffindor, c: slytherin, d: ravenclaw, e: noHouse}
    
 
    // set the color scale
    const color = d3.scaleOrdinal()
    .range(["#dfcc73", "#b00e1a", "#14600d", "#09487b", "#abacab"]);

    // A function that create / update the plot for a given variable:
    function update(data) {

      // Compute the position of each group on the pie:
      const pie = d3.pie()
      .value(function(d) {return d[1]; })
      .sort(function(a, b) { return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
      const data_ready = pie(Object.entries(data))

      // map to data
      const u = svg.selectAll("path")
      .data(data_ready)

      // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
      u
      .join('path')
      .transition()
      .duration(1000)
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
      )
      .attr('fill', function(d){ return(color(d.data[0])) })
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 1)



    }

    // Initialize the plot with the first dataset
    update(data1)
}


const init = async () => {
  const data = await getData();
  createList(data);
  createPiechart(data)
  
};
init();













  




































