import React from 'react';
import { connect } from 'react-redux';
import { Toggle, IconButton, connectTeamsComponent, Table, TBody, Td, Tr, PrimaryButton, Dropdown, PanelBody, Panel } from 'msteams-ui-components-react';
import { MSTeamsIconWeight, MSTeamsIconType } from 'msteams-ui-icons-react';
import './Home.css';
class HomeInner extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
            isPurchaseOrder: true,
            isPlannedOrder: true,
            isForecastSale: true,
            isForecastLongTerm: true,
            innerHeight: window.innerHeight,
        };
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {
        this.setState({ innerHeight: window.innerHeight });
    }
    handleShowClick() {
        this.setState({
            show: !this.state.show
        });
    }
    handlePurchaseOrderToggle() {
        this.setState({
            isPurchaseOrder: !this.state.isPurchaseOrder
        });
    }
    handlePlannedOrderToggle() {
        this.setState({
            isPlannedOrder: !this.state.isPlannedOrder
        });
    }
    handleForecastSaleToggle() {
        this.setState({
            isForecastSale: !this.state.isForecastSale
        });
    }
    handleForecastLongTermToggle() {
        this.setState({
            isForecastLongTerm: !this.state.isForecastLongTerm
        });
    }
    render() {
        const { context } = this.props;
        const { colors, style, font } = context;
        const { sizes, weights } = font;

        const styles = {
            header: { ...sizes.title, ...weights.semibold },
            label: { ...sizes.caption, ...weights.semibold },
            ylabel: { ...sizes.xsmall, ...weights.semibold },
            panel: { height: this.state.innerHeight }
        };
        return (
            <Panel className="rootPanel" style={styles.panel}>

                <PanelBody>
                    <div className="top-container">
                        <div>
                            
                            <IconButton
                                iconWeight={MSTeamsIconWeight.Regular}
                                onClick={() => this.handleShowClick()}
                                iconType={this.state.show ? MSTeamsIconType.ChevronUp : MSTeamsIconType.ChevronDown}
                            />
                            <IconButton
                                iconWeight={MSTeamsIconWeight.Regular}
                                onClick={() => this.handleShowClick()}
                                iconType={this.state.show ? MSTeamsIconType.ChevronUp : MSTeamsIconType.ChevronDown}
                                className="icon-show"/>
                        </div>
                         
                        <div className={this.state.show ? 'hidden' : ''}>
                            <div className="row">
                                <div className="column">
                                    <Table>
                                        <TBody>
                                            <Tr>
                                                <Td> Purchase orders:</Td>
                                                <Td><Toggle autoFocus label='Purchase orders' checked={this.state.isPurchaseOrder} onToggle={() => this.handlePurchaseOrderToggle()} />
                                                </Td>
                                                <Td> Planned orders:</Td>
                                                <Td>
                                                    <Toggle label='Purchase orders' checked={this.state.isPlannedOrder} onToggle={() => this.handlePlannedOrderToggle()} />
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Forecast (sales):</Td>
                                                <Td>
                                                    <Toggle label='Purchase orders' checked={this.state.isForecastSale} onToggle={() => this.handleForecastSaleToggle()} />
                                                </Td>
                                                <Td>Forecast (long Term): </Td>
                                                <Td>
                                                    <Toggle label='Purchase orders' checked={this.state.isForecastLongTerm} onToggle={() => this.handleForecastLongTermToggle()} />
                                                </Td>
                                            </Tr>
                                        </TBody>
                                    </Table>
                                </div>
                                <div className="column">
                                    <Dropdown
                                        label="Old version"
                                        mainButtonText="Old version"
                                        items={[
                                            { text: 'option1', onClick: () => console.log('hello') },
                                            { text: 'option2', onClick: () => console.log('hello') },
                                            { text: 'option3', onClick: () => console.log('hello') },
                                            { text: 'option4', onClick: () => console.log('hello') }
                                        ]}
                                    />
                                    <div>Has been send to supplier</div>
                                </div>
                                <div className="column">
                                     <PrimaryButton>Send report to supplier</PrimaryButton>
                                        <br /> <br /><PrimaryButton>Run report with filter</PrimaryButton> 

                                </div>
                            </div>
                        </div>
                    </div>
                </PanelBody>
            </Panel>
           
        );
    }
}
const Home = connectTeamsComponent(HomeInner);


export default connect()(Home);
