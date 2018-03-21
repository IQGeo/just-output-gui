import React, { Component } from 'react';
import { Button, Collapse, Badge, Tooltip  } from 'antd';
const Panel = Collapse.Panel;

export class TestPanel extends Component {
    
    constructor(props) {
        super(props);
        this.state = { expanded: false };
    }
    
    renderDiff(diffs = [], expanded, limit=0) {
        let ndiffs = 0;
        return diffs.map((diff, i) => {            
            const defaultStyles = { padding: '5px 10px' };
            if (limit && (ndiffs > limit) && !expanded) return null;
            switch (diff.operation) {
                case 'delete':
                    ndiffs++;
                    return <div key={ i } style={ {background: '#d2f0df' ,  fontWeight: 'bold', ...defaultStyles} }>
                        <span style={{color: '#52c41a', width:20, marginRight: 10}}>+</span>{ diff.atom}
                    </div>
                case 'add':
                    ndiffs++;
                    return <div key={ i } style={ {background: '#fac4c3', fontWeight: 'bold', ...defaultStyles} }>
                        <span style={{color: '#f5222d', width:20, marginRight: 10}}>-</span>{ diff.atom}
                    </div>
                case 'none':
                    if (!expanded) return null;
                    return <div key={ i } style={ defaultStyles }>
                        <span style={{width:20, marginRight: 10}}></span>{ diff.atom}
                    </div>
            }
            if (!expanded) return null;
            return <div key={ i } style={ defaultStyles }><span style={{width:20, marginRight: 10}}></span>{ diff }</div>
        })
    }
    
    renderExpanded() {
        const { test } = this.props;
        const { expanded } = this.state;
        
        if (expanded) {
            return (
                <pre                 
                    style={{marginTop: 15, background: '#e4e4e4', cursor: 'pointer'}}
                    onClick={() => this.setState({expanded: !expanded})}            
                >
                    { this.renderDiff(test.comparison, true) }
                </pre>
            )
        }
        
        return (
            <Tooltip title="Click to expand" placement="topLeft">
                <pre 
                    style={{background: '#e4e4e4', cursor: 'pointer'}}
                    onClick={() => this.setState({expanded: !expanded})}    
                >
                    { this.renderDiff(test.comparison, false, 10) }
                </pre>
            </Tooltip>
        );
    }
    
    render() {
        const { test, testsInProgress } = this.props;
        
        if (this.props.hidePassingTests && test.status === 'success') return null;
        
        const header = <div>
            <Badge status={ test.status || "default"} />
            { test.name }
            
            <Button 
                onClick={(e) => {
                    e.stopPropagation();
                    this.props.onRun(test)
                }}
                disabled={ testsInProgress }
                style={ {position: 'absolute', right: 10, top: 7} }
                type="primary">Run</Button>
        </div>
        
        return (            
            <Panel {...this.props } showArrow={ false } key={ test.name } header={ header }>
                { this.renderExpanded() }
            </Panel>
        )
    }
}

