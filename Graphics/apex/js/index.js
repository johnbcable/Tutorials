var options = {
chart: {
    height: 300,
    type: "line"
  },

  series: [
    {
      name: "Website Blog",
      type: "column",
      data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
    },
    {
      name: "Social Media",
      type: "column",
      data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
    }
  ],
  stroke: {
    width: [0, 4],
    curve: 'smooth'
  },
  title: {
    text: "Traffic Sources"
  },
  // labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  labels: [
    "01 Jan 2001",
    "01 Feb 2001",
    "01 Mar 2001",
    "01 Apr 2001",
    "01 May 2001",
    "01 Jun 2001",
    "01 Jul 2001",
    "01 Aug 2001",
    "01 Sep 2001",
    "01 Oct 2001",
    "01 Nov 2001",
    "01 Dec 2001"
  ],
  xaxis: {
    type: "datetime"
  },
  yaxis: [
    {
      title: {
        text: "Website Blog"
      }
    },
    {
      opposite: true,
      title: {
        text: "Social Media"
      }
    }
  ]
};

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();
chart.addYaxisAnnotation({
  y: 752,
  yAxisIndex: 0,
  label: {
    text: 'Highest Web Traffic'
  },
})

chart.addPointAnnotation({
  x: new Date ('01 Sep 2001').getTime(),
  y: 752,
  yAxisIndex: 0,
  label: {
    text: 'New Web Update'
  },
})

