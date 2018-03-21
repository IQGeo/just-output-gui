import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Anchor, Layout, Menu, Badge, Button, Switch } from 'antd';
import { TestSuitePanel } from '../testSuitePanel';
const { Header, Content:C } = Layout;

export class Content extends Component {
        
    render() {
        const { suites, hidePassingTests, testsInProgress, status, onHidePassingTests, onRunSuite, onRunTest, onTestAll } = this.props;
        
        return ( 
            <Layout>
                <Header>
                    <span style={ {color: '#fff'} }>
                        Hide Passing Tests:&nbsp;&nbsp;
                        <Switch checked={ hidePassingTests } onChange={ onHidePassingTests.bind(this) } />
                    </span>
                    <Button style={ {marginLeft: 15} } 
                            type="primary"
                            disabled={ testsInProgress }
                            onClick={ onTestAll.bind(this) }>Run All</Button>
                </Header>
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
};

