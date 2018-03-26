import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Promise } from 'bluebird';
import { Layout} from 'antd';
import { LoadingView } from './loadingView';
import { Sidebar, Content } from './template';

class App extends Component {
    
    constructor(props) {
        super(props);        
        this.state = {
            suites: null, 
            status: {},
            testsInProgress: true,
            hidePassingTests: true 
        }
    }
    
    componentDidMount() {
        this.jo = window.jo;
        let suites = {};
        jo.tests.map((t) => {
            suites[t.suite] = suites[t.suite] || {};
            suites[t.suite][t.name] = t;
            suites[t.suite][t.name].status = 'processing';
        })
        
        this.setState({suites});    
        
        window.handleTestResult = (result, test) => {            
            const {name, suite, output} = test;
            const {pass, message, comparison = [], diffs = []} = result;
            let suites = { ...this.state.suites };
            let status = { ...this.state.status };
            suites[suite][name].status = pass ?  "success" : "error";
            suites[suite][name].output = output;
            suites[suite][name].message = message;
            suites[suite][name].comparison = comparison;
            suites[suite][name].diffs = diffs;
            status[suite] = "";
            Object.keys(suites[suite]).forEach((test) => {
                if (status[suite] != "error") {
                    status[suite] = suites[suite][test].status;
                }
            });
            
            this.setState({suites, status});
        };
        
        
    }
    
    executeTests(filter = "") {
        this.setState({testsInProgress: true});
        this.jo.runTests(filter)
        .then(() => {
            this.setState({testsInProgress: false});
        });
    }        
    
    handleRunTest(test) {
        let suites = { ...this.state.suites };
        let status = { ...this.state.status };
        const {name, suite, output} = test;
        
        status[suite] = "processing";
        suites[suite][name].status = "processing";
        suites[suite][name].output = "";
        suites[suite][name].message = "";
        this.executeTests(name);
        this.setState({suites, status});
    }
    
    handleTestAll() {
        let suites = { ...this.state.suites };
        let status = { ...this.state.status };
                
        Object.keys(suites)
        .map((suite) => {
            status[suite] = "processing";
            Object.keys(suites[suite]).forEach((test) => {
                suites[suite][test].status = "processing";
            });            
        })
        this.setState({suites, status, testsInProgress: true});        
        this.executeTests();
    }
    
    handleRunSuite(suite) {
        let suites = { ...this.state.suites };
        let status = { ...this.state.status };
        status[suite] = "processing";
        
        Object.keys(suites[suite]).forEach((test) => {
            suites[suite][test].status = "processing";
        })
        
        this.setState({suites, status});
        this.executeTests(suite);
        
        Object.keys(suites[suite]).forEach((test) => {
            suites[suite][test].status = "";
        })
        
        this.setState({suites, status});
    }
    
    handleCancel() {
        let suites = { ...this.state.suites };
        let status = { ...this.state.status };
        
        this.jo.cancelTests();
        Object.keys(suites)
        .map((suite) => {
            status[suite] = "";
            Object.keys(suites[suite]).forEach((test) => {
                suites[suite][test].status = "";
            });            
        })
        this.setState({suites, status, testsInProgress: false});        
    }
    
    render() {
        const { suites, hidePassingTests, testsInProgress, status } = this.state;
        
        if (!suites) return <LoadingView /> ;
        
        let tests = Object.keys(suites)
                            .map((suiteId) => suites[suiteId])
                            .map((tests) => { 
                                return Object.keys(tests).map((testid) => tests[testid]);
                            })
                            
        tests = [].concat.apply([], tests)           
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar 
                    tests={ tests }
                    suites={ suites }
                    status={ status}
                    testsInProgress={ testsInProgress }
                    showBack={ this.props.showBack }
                    onRunSuite={ this.handleRunSuite.bind(this) }
                />
                <Content
                    suites={ suites }
                    hidePassingTests={ hidePassingTests }
                    onHidePassingTests={ (e) => this.setState({hidePassingTests: e}) }
                    testsInProgress={ testsInProgress }
                    onTestAll={ this.handleTestAll.bind(this) }
                    onCancel={ this.handleCancel.bind(this) }
                    onRunSuite={ this.handleRunSuite.bind(this)}
                    onRunTest={ this.handleRunTest.bind(this)}                    
                />
            </Layout>
        )
    }
};

ReactDOM.render(<LoadingView />, document.getElementById('app'));
window.justOutputUIRender = (showBack = false) => ReactDOM.render(<App showBack={ showBack }/>, document.getElementById('app'));
