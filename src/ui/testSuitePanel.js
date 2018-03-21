import React, { Component } from 'react';
import { Button, Card, Col, Row, Collapse, Alert } from 'antd';
import { TestPanel } from './testPanel';
const Panel = Collapse.Panel;

export class TestSuitePanel extends Component  {
    
    runSuiteTests(suite) {        
        this.props.onRunSuite(suite)
    }
    
    runSuiteTest(test) {    
        this.props.onRunTest(test);
    }
    
    renderTestList(suite, tests) {  
        const failed = tests.filter((test) => test.status === "error")
            
        return (            
            <Collapse activeKey={failed.map((t) => t.name)} >
                {
                    tests
                    .map((test, i) => {                    
                        return <TestPanel 
                                    hidePassingTests={ this.props.hidePassingTests }
                                    testsInProgress={ this.props.testsInProgress }
                                    onRun={ this.runSuiteTest.bind(this) } key={ test.name } test={ test } />
                    })
                }
            </Collapse>
        );
    }
    
    render() {
        const { suites, testsInProgress } = this.props;
        return (
            <div style={{padding: '30px'}}>
                <Row gutter={16}>
                {
                    Object.keys(suites)
                    .map((suiteKey, i) => {
                        const suite = suites[suiteKey];
                        const tests = Object.keys(suite).map((id) => suites[suiteKey][id])
                        const passed = tests.filter((test) => test.status === "success");
                        
                        if (this.props.hidePassingTests && passed.length === tests.length) return null;
                        
                        return (
                            <Col key={ i } span={24}>
                                <Card id={ suiteKey } title={ `${suiteKey} Suite: ${passed.length}/${tests.length} Tests Passing` } 
                                      extra={ 
                                          <Button type="primary" disabled={ testsInProgress } onClick={ this.runSuiteTests.bind(this, suiteKey)}>Run Suite</Button> 
                                      }
                                      style={{marginBottom: 15}}>
                                    { this.renderTestList(suite, tests) }
                                </Card>
                            </Col>
                        );
                    })
                }
                </Row> 
            </div>           
        )
    }
}
