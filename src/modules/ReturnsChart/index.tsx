import { Observation, TimeSeries } from "./types";
import ReactEcharts from "echarts-for-react";

interface Props {
    data: Array<TimeSeries>;
}

const ReturnsChart = ({ data }: Props) => {
    const makeOptions = () => ({
        title: {
            text: 'Returns',
            subtext: 'pool and benchmark returns'
        },
        // We don't want the toolbox in our app.
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                }
            }
        },
        tooltip: {
            show: true,
            trigger: 'axis',
            valueFormatter: formatPercent(1),
            axisPointer: {
                label: {
                    // @ts-ignore
                    formatter: (entry) => {
                        const date = new Date(entry.value);
                        return [
                            date.getDay() + 1,
                            date.toLocaleString('en-US', { month: 'short' }),
                            date.getFullYear()
                        ].join('-')
                    }
                }
            }
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            },
            axisLine: { show: false },
            axisTick: { show: false }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: false
            },
            axisLabel: {
                formatter: formatPercent(0)
            }
        },

        series: [
            {
                type: 'line',
                markLine: {
                    silent: true,
                    label: {formatter: ''},
                    symbol: ['none', 'none'],
                    data: [
                        {name: 'x-axis', yAxis: 0}
                    ],
                    lineStyle: {
                        width: 1.5,
                        color: 'lightgray'
                    }
                }
            }
            // @ts-ignore
        ].concat(data.map(formatTimeSeries)),
        legend: { data: data.map((entry: TimeSeries) => entry.entity_id) }
    });


    const formatTimeSeries = (series: TimeSeries) => {
        return {
            name: series.entity_id,
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: series.observations.map((obs: Observation) => {
                return {
                    name: obs.time.toString(),
                    value: [obs.time, obs.value]
                }
            })
        }
    }

    const formatPercent = (decimals: number) => (value: number) => (value * 100).toFixed(decimals) + '%'

    return <ReactEcharts option={makeOptions()} style={{ height: '100vh' }} />;
}

export default ReturnsChart;