import React, { Component } from 'react';
import { Affix, Layout, Button, Badge } from 'antd';
const { Sider } = Layout;

export class Sidebar extends Component {
    
    renderSuiteLinks() {
        const { suites, status, testsInProgress, onRunSuite } = this.props;
        return Object.keys(suites)
        .map((suiteId) => {
            return (
                <div  key={ suiteId } style={{position: 'relative'}}>
                    <a style={ {marginLeft: 15} } href={ `#${suiteId}` }>                        
                            <Badge status={ status[suiteId] || "default"} />
                            { suiteId }
                    </a>    
                    <Button
                        type="primary"
                        size="small"
                        disabled={ testsInProgress }
                        style={ {position: 'absolute', right: 10, top: 0} }
                        onClick={ onRunSuite.bind(this, suiteId) }
                        >Run</Button>
                </div>   
            );
        });
    }
    
    renderBack() {
        if (this.props.showBack) {
            return <div style={{marginLeft: 10}}><a onClick={ () => window.history.back() }>&larr; Back</a></div>
        }
        return null;
    }
    
    render() {
        const { tests } = this.props;
        
        return (
            <Sider style={{background: 'white', borderRight: '2px solid rgba(0,0,0,0.1)'}}>   
                <Affix style={{background: 'white', border: 'none'}} >
                    { this.renderBack() }
                    
                    <div style={{textAlign: 'center', padding: 10}}>
                        <b style={{color: '#1890ff'}}>T: { tests.length }</b>&nbsp;&nbsp;&nbsp;
                        <b style={{color: '#52c41a'}}>P: { tests.filter((t) => t.status === 'success').length }</b>&nbsp;&nbsp;&nbsp;
                        <b style={{color: '#f5222d'}}>F: { tests.filter((t) => t.status === 'error').length }</b>
                    </div>
                
                
                    <h4 style={{marginTop: 15, marginLeft: 10}}>Test Suites</h4>
                    { this.renderSuiteLinks() }                    
                </Affix>
            </Sider>
        )
    }
}