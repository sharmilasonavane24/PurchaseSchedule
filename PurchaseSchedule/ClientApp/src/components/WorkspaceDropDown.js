﻿import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Workspace';
import { Dropdown, connectTeamsComponent } from 'msteams-ui-components-react';

class WorkspaceDropDownInner extends React.Component {
    constructor(props) {
        super(props);
        this.props.requestWorkspaces();
    }

    render() {
        return (
            <div>
                <span>{this.props.loading ? 'Loading Workspaces...' : 'Workspaces'}</span>
                <Dropdown
                    
                    mainButtonText={this.props.workspace.workspaceid ?
                        this.props.workspace.workspacename :
                        "Please select a Workspace..."}
                    style={{ width: '100%' }}
                    items={
                        this.props.workspaces.map(workspace => {
                            if (workspace.workspaceid) {
                                return {
                                    text: workspace.workspacename ? workspace.workspacename : workspace.workspaceid,
                                    key: workspace.workspaceid,
                                    onClick: (e) => this.props.onClick(e, workspace)
                                };
                            } else {
                                return {};
                            }
                        })
                    }
                    disabled={(this.props.isLoading || this.props.isError)}
                />
            </div>
        );
    }
}

const WorkspaceDropDown = connectTeamsComponent(WorkspaceDropDownInner);

export default connect(
    state => state.workspaces,
    dispatch => bindActionCreators(actionCreators, dispatch))(WorkspaceDropDown);