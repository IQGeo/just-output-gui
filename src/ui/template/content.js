import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Affix, Layout, Menu, Badge, Button, Switch } from 'antd';
import { TestSuitePanel } from '../testSuitePanel';
const { Header, Content:C } = Layout;

export class Content extends Component {
    
    render() {
        const { suites, hidePassingTests, testsInProgress, status, onHidePassingTests, onRunSuite, onRunTest } = this.props;
        
        return ( 
            <Layout>
                <Affix>
                <Header>
                    <span style={ {color: '#fff'} }>
                        Hide Passing Tests:&nbsp;&nbsp;
                        <Switch checked={ hidePassingTests } onChange={ onHidePassingTests.bind(this) } />
                    </span>
                    { this.renderRunButton() }
                </Header>
                </Affix>
                <C style={ { margin: '0 16px' } }>
                    <TestSuitePanel 
                        suites={ suites }
                        hidePassingTests={ hidePassingTests }
                        testsInProgress={ testsInProgress}
                        onRunSuite={ onRunSuite.bind(this)}
                        onRunTest={ onRunTest.bind(this)}
                    />
                </C>
            </Layout>
        )
    }
    
    renderRunButton() {
        const { testsInProgress, onTestAll, onCancel } = this.props;
        
        if (testsInProgress) {
            return (
                <Button style={ {marginLeft: 15} } 
                    type="danger"
                    onClick={ onCancel.bind(this) }>Cancel</Button>
            )
        }
        
        return (
            <Button style={ {marginLeft: 15} } 
                type="primary"
                onClick={ onTestAll.bind(this) }>Run All</Button>
        )
    }
};

