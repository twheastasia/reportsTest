
function get_overview_exam_chart_data(title_name, categories, scores){

    var chart_config = {
        /* HighchartsConfig */
        chart: {
            polar: true,
            type: 'line'
        },
        title: {
            text: '综合',
            align: "center"
        },
        pane: {
            size: '80%'
        },
        xAxis: {
            categories: ['数学', '语文', '英语'],
            tickmarkPlacement: 'on',
            lineWidth: 0
        },
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },
        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 70,
                layout: 'vertical'
            },
            series: [{
                name: '得分',
                data: [80, 19, 50],
                pointPlacement: 'on'
            }],
        exporting:{
            enabled: false
        }
    } ;

    chart_config.title.text = title_name;
    chart_config.xAxis.categories = categories;
    chart_config.series[0].data = scores;

    return chart_config;
}

exports.get_overview_exam_chart_data = get_overview_exam_chart_data;
