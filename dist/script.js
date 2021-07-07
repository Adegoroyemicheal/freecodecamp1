let url="https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"


let data;
let values
let hightscale
let Xscale
let xAxisScale
let yAxisScale

let width= 800;
let height=600;
let padding= 40;

let svg = d3.select('svg')

let drawCanvas = ()=>{
      svg.attr('width',width)
      svg.attr('height',width)

      heightscale= d3.scaleLinear()
      .domain([0,d3.max(values,items=>{
         return items[1]
      })])
      .range([0,height-(2*padding)])

      console.log(heightscale.range());

      Xscale = d3.scaleLinear()
      .domain([0,values.length-1])
      .range([padding,width-padding])

      let dateArray = values.map(data=>{
            return new Date(data[0])

      })

      xAxisScale = d3.scaleTime()
      .domain([d3.min(dateArray),d3.max(dateArray)])
      .range([padding,width-padding])

      yAxisScale = d3.scaleLinear()
      .domain([0,d3.max(values,(items) => items[1])])
      .range([height-padding,padding])
}

let generateAxis=()=>{
let xAxis = d3.axisBottom(xAxisScale) ;

let yaxis = d3.axisLeft(yAxisScale)
svg.append("g")
.attr("id","x-axis")
.call(xAxis)
.attr("transform","translate(0, " +(height-padding)+ ')')


svg.append("g")
.call(yaxis)
.attr("id","y-axis")
.attr('transform','translate('+padding + ')');


}

let generateScales = ()=>{
}
let drawBar= () =>{

      var tooltip = d3.select('body').append("div")
      .attr("id","tooltip")
      .attr("visibility","hidden")
      .attr('width',"auto")
      .attr("height","auto");
     svg.selectAll("rect").
     data(values)
     .enter().
     append('rect')
     .attr('class',"bar")

     .attr("data-date",items=> items[0])

     .attr("data-gdp",items=>items[[1]])

     .attr("height",(item)=> heightscale(item[1]))

     .attr('width',(width-( 2 *padding) /values.length))

     .attr('x',(item,ii)=> Xscale(ii))
     .attr('y',item=>{
           return (height-padding) - heightscale(item[1])
     })
     .on('mouseover',(item)=>{
           tooltip.transition()
           .style("visibility","visible")
           tooltip.text(item[0])
           document.querySelector('#tooltip').setAttribute('data-date',item[0])
     })
     .on('mouseout',item=>{
      tooltip.transition()
      .style("visibility","hidden")
     })
}





d3.json(url)
.then(result => {
        values = result.data; 
        console.log(values);
        drawCanvas();
        generateScales();
        drawBar();
        generateAxis();
      

 })