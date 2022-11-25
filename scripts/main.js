//import javascript//
import gsap from "gsap";

//import d3
import { select as d3Select } from "d3";
n
const getData = async () => {
  let response = await fetch(`https://hp-api.herokuapp.com/api/characters`);
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
const init = async () => {
  const data = await getData();
  createList(data);
};
init();

function main() {
    //d3 code hier
    var svg = d3.select('svg'),
    width = svg.attr('width'),
    height = svg.attr('width'),
    radius = Math.min(width, height) / 2
    
    var g = svg.append('g')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    var color = d3.scaleOrdinal(['#968655', '#E9D18B', '#50472d', '#665d71'])
    var pie = d3.pie().value(function(d){
        return d.percent

    })
    var path = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);
    var tekst = d3.arc()
      .outerRadius(radius)
      .innerRadius(radius - 80);
      

}
