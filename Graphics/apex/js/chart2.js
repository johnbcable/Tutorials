var options = {
	chart: {
		height: 280,
		type: 'radialBar'
	},
	plotOptions: {
		circle: {
			dataLabels: {
				showOn: "hover"
			}
		}
	},
	title: {
		text: "Survey Responses"
	},
	series: [44, 55, 67, 83],
	labels: ["Disagree", "Strongly Disagree", "Neutral", "Strongly Agree"]
};

var chart = new ApexCharts(document.querySelector("#chart2"), options);

chart.render();

