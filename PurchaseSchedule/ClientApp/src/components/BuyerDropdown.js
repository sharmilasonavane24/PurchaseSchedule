import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Buyer';
import { Dropdown, connectTeamsComponent } from 'msteams-ui-components-react';

class BuyerDropDownInner extends React.Component {
    constructor(props) {
        super(props);
        this.props.requestBuyers();
    }

    render() {
        return (
            <div>
                <Dropdown
                    autoFocus
                    label={this.props.loading ? 'Loading Buyers...' : 'Buyers'}
                    mainButtonText={this.props.buyer.buyerid ?
                        this.props.buyer.buyername :
                        "Please select a Buyer..."}
                    style={{ width: '100%' }}
                    items={
                        this.props.buyers.map(buyer => {
                            if (buyer.buyerid) {
                                return {
                                    text: buyer.buyername ? buyer.buyername : buyer.buyerid,
                                    key: buyer.buyerid,
                                    onClick: (e) => this.props.onClick(e, buyer)
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

const BuyerDropDown = connectTeamsComponent(BuyerDropDownInner);

export default connect(
    state => state.buyers,
    dispatch => bindActionCreators(actionCreators, dispatch))(BuyerDropDown);