import React from 'react';
import { connectTeamsComponent, Panel, PanelBody } from 'msteams-ui-components-react';
import BuyerDropDown from './components/BuyerDropdown';

class TeamsConfigTabInner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBuyer: {
                buyername: '',
                buyerid: ''
            }
        };
        this.handleBuyerSelected = this.handleBuyerSelected.bind(this);
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
                </PanelBody>
            </Panel>
        );
    }
}

const TeamsConfigTab = connectTeamsComponent(TeamsConfigTabInner);

export default TeamsConfigTab;