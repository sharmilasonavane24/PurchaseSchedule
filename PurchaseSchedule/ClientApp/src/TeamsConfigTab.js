import React from 'react';
import { connectTeamsComponent, Panel, PanelBody } from 'msteams-ui-components-react';
import BuyerDropDown from './components/BuyerDropDown';
import SupplierDropDown from './components/SupplierDropDown';

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
            }
        };
        this.handleBuyerSelected = this.handleBuyerSelected.bind(this);
        this.handleSupplierSelected = this.handleSupplierSelected.bind(this);

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
                    <BuyerDropDown onClick={this.handleBuyerSelected} buyer={this.state.selectedBuyer} />
                    <SupplierDropDown onClick={this.handleSupplierSelected} supplier={this.state.selectedSupplier} />

                </PanelBody>
            </Panel>
        );
    }
}

const TeamsConfigTab = connectTeamsComponent(TeamsConfigTabInner);

export default TeamsConfigTab;