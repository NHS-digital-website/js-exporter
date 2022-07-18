module.exports = {
  "nhsd-dataviz": {
    "library": "https://cdn.jsdelivr.net/gh/NHS-digital-website/nhsd-dataviz@latest/dist/nhsd-dataviz.min.js",
    "stylesheet": "https://design-system.digital.nhs.uk/cdn/latest/stylesheets/nhsd-frontend.css",
    "initScript": async ([options]) => await nhsdviz.chart('#viz', options),
  },
  "highcharts": {
    "library": "https://cdnjs.cloudflare.com/ajax/libs/highcharts/10.1.0/highcharts.min.js",
    "customScript": () => {
      Highcharts.setOptions({
        accessibility: {
          keyboardNavigation: {
            enabled : true
          }
        },
        colors: ['#005EB8', '#84919C', '#003087', '#71CCEF', '#D0D5D6'],
        chart: {
          backgroundColor: '#F4F5F6',
          style: {
            fontFamily: 'Frutiger W01'
          },
          zoomType: 'xy'
        },
        xAxis: {
          title: {
            style: {"color": "#000000", "fontWeight": "bold","fontSize":"16px"},
          },
          gridLineDashStyle: 'shortdash',
          gridLineWidth: 1
        },
        yAxis: {
          title: {
            style: {"color": "#000000", "fontWeight": "bold"},
          },
          gridLineDashStyle: 'shortdash',
          gridLineWidth: 1
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          scatter: {
            marker: {
              radius: 5,
            }
          },
          line: {
            marker: {
              enabled: false
            }
          }
        }
      });
    },
    "baseOptions": {
      plotOptions: {
        series: {
          animation: false,
        }
      }
    },
    "initScript": async ([options]) => await Highcharts.chart('viz', options),
  }
}
