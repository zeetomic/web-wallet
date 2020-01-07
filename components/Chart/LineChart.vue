<template>
    <div id="line" ref="line_wrap"></div>
</template>

<script>
import echarts from 'echarts';

export default {
mounted() {
    let myChart = echarts.init(this.$refs.line_wrap);
    let colors = ['#5793f3', '#d14a61', '#675bba'];

    myChart.setOption({
        color: colors,
        tooltip: {
            trigger: 'none',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: colors[1]
                    }
                },
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return '  ' + params.value
                                + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                        }
                    }
                },
                data: ["2016-1", "2016-2", "2016-3", "2016-4", "2016-5"]
                
            },
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: colors[0],
                        width: '1'
                    }
                },
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return '  ' + params.value
                                + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                        }
                    }
                },
                data: ["2015-1", "2015-2", "2015-3", "2015-4", "2015-5"]
            },
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name:'2015 ',
                type:'line',
                lineStyle: {
                    width: '6'
                },
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'skyblue' // color at 0% position
                    }, {
                        offset: 0.8, color: 'green' // color at 100% position
                    }],
                    global: false // false by default
                },
                xAxisIndex: 1,
                smooth: true,
                data: [0,60,20,50,30]
            },
            {
                name:'2016 ',
                type:'line',
                lineStyle: {
                    width: '6'
                },
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'blue' // color at 0% position
                    }, {
                        offset: 0.8, color: 'purple' // color at 100% position
                    }],
                    global: false // false by default
                },
                smooth: true,
                data: [0,40,20,30,80]
            }
        ]
    })
}

}
</script>

<style>
#line {
    width: auto;
    height: 258px;
}
</style>
