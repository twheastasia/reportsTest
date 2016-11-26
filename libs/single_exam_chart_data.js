// 引入highcharts
const ReactHighcharts = require('react-highcharts');

function get_single_exam_chart_view_data(exam_name, exam_score){

    // 初始数据
    var origin_data = {
            chart: {
                type: 'solidgauge',
                marginTop: 50,
                // 图表一加载完就显示tiiltip
                events: {
                    load: function(){
                        var p = this.series[0].points[0];
                        this.tooltip.refresh(p);
                    }
                }
            },

            title: {
                text: '',
                style: {
                    fontSize: '24px'
                }
            },

            tooltip: {
                animation: true,
                hideDelay: 100000,
                borderWidth: 0,
                backgroundColor: 'none',
                shadow: false,
                style: {
                    fontSize: '16px'
                },
                pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
                positioner: function (labelWidth) {
                    return {
                        x: 300 - labelWidth / 2,
                        y: 180
                    };
                },
                enabled: true
            },

            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [{ // Track for Move
                    outerRadius: '87%',
                    innerRadius: '63%',
                    backgroundColor: ReactHighcharts.Highcharts.Color(ReactHighcharts.Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
                    borderWidth: 0
                }]
            },

            yAxis: {
                min: 0,
                max: 100,
                lineWidth: 0,
                tickPositions: []
            },

            plotOptions: {
                solidgauge: {
                    borderWidth: '34px',
                    dataLabels: {
                        enabled: false
                    },
                    linecap: 'round',
                    stickyTracking: true,
                    enableMouseTracking: true,
                    events:{
                      show: true
                    }
                }
            },

            series: [{
                name: '得分',
                borderColor: ReactHighcharts.Highcharts.getOptions().colors[0],
                data: [{
                    color: ReactHighcharts.Highcharts.getOptions().colors[0],
                    radius: '75%',
                    innerRadius: '75%',
                    y: 100
                }]
            }],

            exporting: {
                enabled: false
            }
        };

        // 设置考试名字，考试成绩
        origin_data.title.text = exam_name;
        origin_data.series[0].data[0].y = exam_score;

        // 返回数据
        return origin_data;
}

exports.get_single_exam_chart_view_data = get_single_exam_chart_view_data;
