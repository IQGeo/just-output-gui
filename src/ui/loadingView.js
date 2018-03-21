import React, { Component } from 'react';
import { Spin } from 'antd';

export class LoadingView extends Component {
    render() {
        return (
            <div style={{padding: 50, textAlign: 'center'}}><Spin size="large" tip="Loading Tests"/></div>
        )
    }
}