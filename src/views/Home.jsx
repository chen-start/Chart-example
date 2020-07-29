import React from 'react';
import eCharts from 'echarts';
import $ from 'jquery';
import css from './Home.module.css';
import {Breadcrumb} from 'antd';
import { HomeOutlined } from '@ant-design/icons';

export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tree1: {
                id: 1,
                label: '根节点1',
                name: '根节点1',
                children: [
                    {
                        id: 2,
                        label: '子节点1-1',
                        name: '子节点1-1',
                        children: [
                            {
                                id: 5,
                                label: '子节点1-1-1',
                                name: '子节点1-1-1'
                            },
                            {
                                id: 6,
                                label: '子节点1-1-2',
                                name: '子节点1-1-2'
                            }
                        ]
                    },
                    {
                        id: 3,
                        label: '子节点1-2',
                        name: '子节点1-2',
                        children: [
                            {
                                id: 7,
                                label: '子节点1-2-1',
                                name: '子节点1-2-1'
                            },
                            {
                                id: 8,
                                label: '子节点1-2-2',
                                name: '子节点1-2-2'
                            }
                        ]
                    },
                    {
                        id: 4,
                        label: '子节点1-3',
                        name: '子节点1-3',
                        children: [
                            {
                                id: 9,
                                label: '子节点1-3-1',
                                name: '子节点1-3-1'
                            },
                            {
                                id: 10,
                                label: '子节点1-3-2',
                                name: '子节点1-3-2'
                            }
                        ]
                    }
                ]
            },
            tree2: {
                id: 11,
                label: '根节点2',
                name: '根节点2',
                children: [
                    {
                        id: 12,
                        label: '子节点2-1',
                        name: '子节点2-1',
                        children: [
                            {
                                id: 15,
                                label: '子节点2-1-1',
                                name: '子节点2-1-1'
                            },
                            {
                                id: 16,
                                label: '子节点2-1-2',
                                name: '子节点2-1-2'
                            }
                        ]
                    },
                    {
                        id: 13,
                        label: '子节点2-2',
                        name: '子节点2-2',
                        children: [
                            {
                                id: 17,
                                label: '子节点2-2-1',
                                name: '子节点2-2-1'
                            },
                            {
                                id: 18,
                                label: '子节点2-2-2',
                                name: '子节点2-2-2'
                            }
                        ]
                    },
                    {
                        id: 14,
                        label: '子节点2-3',
                        name: '子节点2-3',
                        children: [
                            {
                                id: 19,
                                label: '子节点2-3-1',
                                name: '子节点2-3-1'
                            },
                            {
                                id: 20,
                                label: '子节点2-3-2',
                                name: '子节点2-3-2'
                            }
                        ]
                    }
                ]
            },
            graph: undefined,
            frame: undefined,
            data: [
                {
                    name: "所有物品",
                    children: [
                        {
                            name: "水果",
                            children: [{name: "苹果", children: [{name: '青苹果'}, {name: '红苹果'}]}]
                        },
                        {
                            name: '主食',
                            children: [
                                {name: "米饭", children: [{name: '北方米饭'}, {name: '南方米饭'}]}
                            ]
                        },
                        {
                            name: '生活用品',
                            children: [
                                {name: "电脑类", children: [{name: '联想电脑'}, {name: '苹果电脑'}]},
                                {name: "工具类", children: [{name: "锄头"}, {name: "锤子"}]},
                                {name: "生活用品", children: [{name: "洗发水"}, {name: "沐浴露"}]}
                            ]
                        }
                    ]
                }]
        };
    };
    componentDidMount() {
        this.state.graph = eCharts.init(document.getElementById('charts'));
        this.setOption();

        // jQuery 控制拖动悬浮窗
        $(document).mousemove((e) => {
            let X = e.clientX;
            let Y = e.clientY;
            $('#frame').offset({left: X + 10, top: Y});
        })
        $('#frame').hide();
        $(document).mouseup( e => {
            $('#frame').hide();
        });

        this.dealWith(this.state.data);
    };
    setOption(){
        let _this = this;
        this.state.graph.setOption({
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            series: [
                {
                    type: 'tree',

                    data: [_this.state.tree1],

                    top: '1%',
                    left: '5%',
                    bottom: '1%',
                    right: '60%',

                    symbolSize: 7,

                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 9
                    },

                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    },

                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                },
                {
                    type: 'tree',

                    data: [_this.state.tree2],

                    top: '1%',
                    left: '55%',
                    bottom: '1%',
                    right: '10%',

                    symbolSize: 7,

                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 9
                    },

                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    },

                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }
            ]
        });

        this.state.graph.on('mousedown', ev => {
            console.log(ev.data);
            $('#frame').show();
            _this.setState({
                frame: ev.data
            });
        });

        this.state.graph.on('mouseup', ev => {
            console.log(ev.data);
            $('#frame').hide();
            _this.dealWith(ev.data);
        });
    };
    // TODO 递归遍历tree2
    dealWith(data){
        let str = '';
        let getStr = function(list){
            list.forEach(function(row){
                if(row.children){
                    getStr(row.children)
                }else {
                    str += row.name + ";"
                }
            })
        }
        getStr(this.state.data);
        console.log(str);
    };
    render(){
        return (
            <div className={css.home}>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        双层图表嵌套
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className={css.title}>
                    <span>树1</span>
                    <span>树2</span>
                </div>
                <div id='charts' style={{width: '100%', height: '800px'}} />
                <div id='frame' className={css.frame}>
                    {this.state.frame ? this.state.frame.name : ''}
                </div>
            </div>
        )
    };

}