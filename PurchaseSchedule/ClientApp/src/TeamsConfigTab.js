﻿import React from 'react';
import { connectTeamsComponent, Panel, PanelBody, Input } from 'msteams-ui-components-react';
import BuyerDropDown from './components/BuyerDropDown';
import SupplierDropDown from './components/SupplierDropDown';
import WorkspaceDropDown from './components/WorkspaceDropDown';
import { inTeams, getQueryVariable } from './Utils';
import microsoftTeams from '@microsoft/teams-js';

class TeamsConfigTabInner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBuyer: {
                buyername: '',
                buyerid: ''
            },
            selectedSupplier: {
                suppliername: '',
                supplierid: ''
            },
            selectedWorkspace: {
                workspacename: '',
                workspaceid: ''
            },
            tabDetails: {
                tabEntityId: '',
                tabName: '',
                isReady: false
            }
        };
        this.handleBuyerSelected = this.handleBuyerSelected.bind(this);
        this.handleSupplierSelected = this.handleSupplierSelected.bind(this);
        this.handleWorkspaceSelected = this.handleWorkspaceSelected.bind(this);
        this.onTabNameChanged = this.onTabNameChanged.bind(this);

        if (inTeams()) {
                      
            microsoftTeams.getTabInstances((t, e) => {
                this.ActivateTabName();
            });

            microsoftTeams.settings.registerOnSaveHandler((saveEvent) => {
                let host = "https://" + window.location.host;
                microsoftTeams.settings.setSettings({
                    entityId: this.state.tabDetails.tabEntityId,
                    Name: this.state.tabDetails.tabName,
                    contentUrl: host + "/home/?theme={theme}&loginHint={loginHint}",
                    suggestedDisplayName: this.state.tabDetails.tabName
                });
                saveEvent.notifySuccess();
              
            });
        }

    }
    ActivateTabName() {
            var currentEntity = getQueryVariable('entityId');
            if (currentEntity !== '') {
                this.setState({
                        tabDetails: {
                            isReady: true,
                        }
                    });
            }
    }
   
    componentDidUpdate() {
       
        if (inTeams()) {
            if (this.state.selectedBuyer.buyername
                && this.state.selectedSupplier.supplierid
                && this.state.selectedWorkspace.workspaceid
                && this.state.tabDetails.tabName) {
                microsoftTeams.settings.setValidityState(true);
            } else {
                microsoftTeams.settings.setValidityState(false);
            }
        }
    }

    handleBuyerSelected(e, buyer) {
        if (buyer !== this.state.selectedBuyer) {
            this.setState(
                {
                    selectedBuyer: {
                        buyername: buyer.buyername ? buyer.buyername : buyer.buyerid,
                        buyerid: buyer.buyerid
                    }
                });
        }
    }
    handleSupplierSelected(e, supplier) {
        if (supplier !== this.state.selectedSupplier) {
            this.setState(
                {
                    selectedSupplier: {
                        suppliername: supplier.suppliername ? supplier.suppliername : supplier.supplierid,
                        supplierid: supplier.supplierid
                    }
                });
        }
    }
    onTabNameChanged(e) {
        if (e.target.value !== this.state.tabDetails.tabName) {
            this.setState(
                {
                    tabDetails: {
                        tabName: e.target.value,
                        tabEntityId: (e.target.value).replace(' ', '') + '_EntityId'
                    }
                });
        }
    }
    handleWorkspaceSelected(e, workspace) {
        if (workspace !== this.state.selectedWorkspace) {
            this.setState(
                {
                    selectedWorkspace: {
                        workspacename: workspace.workspacename ? workspace.workspacename : workspace.workspaceid,
                        workspaceid: workspace.workspaceid
                    }
                });
        }
    }

    render() {
       
        const { context } = this.props;
        const { rem, font } = context;
        const { sizes, weights } = font;
        const styles = {
            panel:
            {
                height: window.innerHeight,
                border: 0,
                padding: 0,
                margin: 0
            },
            input: {
                paddingTop: rem(0.5),
                width: '100%'
            }
        };
        return (
            <Panel style={styles.panel}>
                <PanelBody>
                    <span className={this.state.tabDetails.isReady ? 'hidden' : ''}>
                        <span>Tab Name</span> <Input
                            autoFocus
                            style={styles.input}
                            placeholder="Tab name"
                            onChange={this.onTabNameChanged}
                            required
                            className={this.state.tabDetails.isReady ? 'hidden' : ''}
                        />
                    </span>
                    <WorkspaceDropDown onClick={this.handleWorkspaceSelected} workspace={this.state.selectedWorkspace} />
                    <BuyerDropDown onClick={this.handleBuyerSelected} buyer={this.state.selectedBuyer} />
                    <SupplierDropDown onClick={this.handleSupplierSelected} supplier={this.state.selectedSupplier} />

                </PanelBody>
            </Panel>
        );
    }
}

const TeamsConfigTab = connectTeamsComponent(TeamsConfigTabInner);

export default TeamsConfigTab;