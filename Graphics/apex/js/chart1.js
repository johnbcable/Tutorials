var options = {
	chart: {
		width: 300,
		type: 'donut'
	},
	title: {
		text: "Respondent Age"
	},
	series: [44, 55, 41, 17, 15],
	labels: ["18-30", "31-40", "41-50", "51-60", "61-70"]
}

var chart = new ApexCharts(document.querySelector("#chart1"), options);

chart.render();
