<template>
  <div id="Pie" ref="Pie_wrap"></div>
</template>

<script>
import echarts from 'echarts';

export default {
    mounted() {
        let myChart = echarts.init(this.$refs.Pie_wrap);

        myChart.setOption ({
        backgroundColor: '#131722',
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series : [
            {
                type:'pie',
                radius : '90%',
                center: ['50%', '50%'],
                data:[
                    {value:335, name:''},
                    {value:310, name:''},
                    {value:274, name:''},
                    {value:235, name:''},
                    {value:400, name:''},
                ].sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
        });
    }
}
</script>

<style scoped>
#Pie {
    height: 130px;
    width: auto;
}
@media only screen and (max-width: 768px) {
    #Pie {
        height: 170px;
        width: auto;
    }
}
</style>