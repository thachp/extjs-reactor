import React, { Component } from 'react';
import { Panel, Polar } from '@extjs/reactor/modern';
import ChartToolbar from '../Charts/ChartToolbar';

export default class Donut extends Component {

    store = Ext.create('Ext.data.Store', {
        fields: ['os', 'data1' ],
        data: [
            { os: 'Android', data1: 68.3 },
            { os: 'BlackBerry', data1: 1.7 },
            { os: 'iOS', data1: 17.9 },
            { os: 'Windows Phone', data1: 10.2 },
            { os: 'Others', data1: 1.9 }
        ]
    })

    state = {
        theme: 'default'
    }

    changeTheme = (select, choice) => {
        this.setState({ theme: choice.get('value') });
    }

    onResize = (view, width, height) => {
        const legend = this.refs.chart.getLegend();
        if(width > height) {
            legend.setDocked('right');
        } else {
            legend.setDocked('top');
        }
    }

    render() {
        const { theme } = this.state;

        return (
            <Panel shadow layout="fit" onResize={this.onResize}>
                <ChartToolbar onThemeChange={this.changeTheme} theme={theme}/>
                <Polar
                    ref="chart"
                    insetPadding={50}
                    store={this.store}
                    theme={theme}
                    legend={{
                        type: 'sprite',
                        marker: { size: 16 }
                    }}
                    interactions={['rotate', 'itemhighlight']}
                    series={[{
                        type: 'pie',
                        angleField: 'data1',
                        donut: 50,
                        highlight: true,
                        label: {
                            field: 'os'
                        },
                        tooltip: {
                            trackMouse: true,
                            renderer: (tooltip, record) => { tooltip.setHtml(record.get('os') + ': ' + record.get('data1') + '%'); }
                        }
                    }]}
                />
            </Panel>
        )
    }
}