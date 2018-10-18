import React from 'react';
import { connectTeamsComponent, Panel, PanelBody } from 'msteams-ui-components-react';
import BuyerDropDown from './components/BuyerDropDown';
import SupplierDropDown from './components/SupplierDropDown';
import WorkspaceDropDown from './components/WorkspaceDropDown';

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
            }
        };
        this.handleBuyerSelected = this.handleBuyerSelected.bind(this);
        this.handleSupplierSelected = this.handleSupplierSelected.bind(this);
        this.handleWorkspaceSelected = this.handleWorkspaceSelected.bind(this);

    }

    componentDidUpdate() {

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
        const styles = {
            panel:
            {
                height: window.innerHeight,
                border: 0,
                padding: 0,
                margin: 0
            }
        };

        return (
            <Panel style={styles.panel}>
                <PanelBody>
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