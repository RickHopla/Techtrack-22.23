// Our bundler automatically creates styling when imported in the main JS file!
import '../styles/style.css'

// We can use node_modules directely in the browser!
import * as d3 from 'd3';
const data = [
    "robert",
    "vincent",
    "lAuRa",
    "Cas",
    "wIMER",
    "rOOs"
];



function convertArrayStringsToCapitalized() {
   let newArray = []
   data.map(x => {
    const lowerCase = x.toLowerCase()
    const capitalize = lowerCase.charAt(0).toUpperCase()
    const newWord = `${capitalize}${lowerCase.substring(1)}`
    newArray.push(newWord)
  })
  console.log(newArray)
}

convertArrayStringsToCapitalized()


