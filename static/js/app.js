// Welcome to plotlyChallenge
// @_@_@_@_@_@_@_@_@_@_@_@_@_@_@

// GET SOME VARIABLES GOING
// ***************************
d3.json('samples.json').then(BBdata => {
  console.log(BBdata);

  var metadata = BBdata.metadata;
  console.log(metadata);

  var names = BBdata.names
  console.log(names);

  var samples = BBdata.samples
  console.log(samples);
// ******************************



// POPULATE THE TEST SUBJECT ID DROPDOWN
// **************************************
var message = ("Choose a Subject");
d3.select("#selDataset").append("option")
.attr("value", message).html(message);

var dropdown = d3.select("#selDataset");
names.forEach((item) => {
  // console.log(item);
  // var row = dropdown.append("option")
  // .attr("value", `Choose A Subject`);
  var row = dropdown.append("option")
  .attr("value", item);
  row.text(item);
});
// **************************************



// POPULATE DEMOGRAPHICS TABLE AND FILTER DATA
//        WHEN DROPDOWN IS SELECTED
// *******************************************

const dropdownchange = () => {

// SELECDEMOGRAPHICS TABLE ELEMENTS
//-------------------------------
var demoTable = d3.select("#demographics-table");
// CLEAR PREVIOUS TABLE
//---------------------
demoTable.html("")
var inputElement = d3.select("#selDataset");
var tableBody = demoTable.append("tbody");
var inputValue = inputElement.property("value");

// FILTERING DATA UPON INPUT VALUE SELECTION
//------------------------------------------
var filteredData = metadata.filter(item => item.id == inputValue);
var filteredSamples = samples.filter(item => item.id == inputValue);

// POPULATING TABLE WITH SELECTION DATA
//-------------------------------------
filteredData.forEach((item) => {
let row = tableBody.append("tr");
Object.entries(item).forEach(value => {
    let cell = row.append("tr");
    cell.text("");
    cell.text(`${value[0]}: ${value[1]}`);
})
});
// ****************************************



// SLICING/REVERSING DATA FOR HORIZONTAL BAR CHART
// ***********************************************
var SlicedSampleValues = filteredSamples[0].sample_values.slice(0,10).reverse();
var slicedOTUs = filteredSamples[0].otu_ids.slice(0,10).reverse().map(data => `OTU ` + data);
var slicedLabels = filteredSamples[0].otu_labels.slice(0,10).reverse();
// ******************************************



// PLOT HORIZONAL BAR CHART
// ************************************
var trace1 = {
x: SlicedSampleValues,
y: slicedOTUs,
text: slicedLabels,
type: "bar",
orientation: "h"
};
var bardata = [trace1];
var barlayout = {
  title: "Top 10 OTUs in Sample",
  xaxis: {title: "Prevalence in Sample"},
  yaxis: {title: "OTU ID Number"}  
};
Plotly.newPlot("bar", bardata, barlayout);
// **************************************



//BUBBLE CHART-KEEP WORKING!!!!
// *************************************
//Not using sliced values for this chart??
var size = filteredSamples[0].sample_values;

var trace2 = {
x: filteredSamples[0].otu_ids,
y: filteredSamples[0].sample_values,
text: filteredSamples[0].otu_labels,
mode: 'markers',
marker: {
  // work on this!!!!!!!!
  size: size,
  sizeref: .1,
  // !!!!!!!NEED MARKER COLORS!!!!!!! split into groups range based for colors
  sizemode: 'area',
  color: filteredSamples[0].otu_ids,
}}
var bubbledata = [trace2]
var bubblelayout = {
title: "OTU Prevalence in Sample",
xaxis: {title: 'OTU ID Number'},
yaxis: {title: 'Prevalence in Sample'},
}

Plotly.newPlot("bubble", bubbledata, bubblelayout)
// **********************************************

// CLOSE FUNCTION
//  *************************
};
//  *************************

// EVENT TRIGGER
//  *************************
dropdown.on("change", dropdownchange);
//  *************************

// CLOSE DATA RETRIEVAL AREA
//  *************************
});
//  *************************