import React from 'react';
import { connect } from 'react-redux';
import ToggleDisplay from 'react-toggle-display';
import { IconButton,PrimaryButton, connectTeamsComponent } from 'msteams-ui-components-react';
import { MSTeamsIconWeight,MSTeamsIconType  } from 'msteams-ui-icons-react';

class HomeInner extends React.Component {
    constructor() {
        super();
        this.state = { show: false };
    }

    handleClick() {
        this.setState({
            show: !this.state.show
        });
    }

    render() {
        return (
            <div>
                <p>
                    <IconButton
                        iconWeight={MSTeamsIconWeight.Regular}
                        onClick={() => this.handleClick()}
                        iconType={this.state.show ? MSTeamsIconType.ChevronDown : MSTeamsIconType.ChevronUp}
                         />
                </p>
                <ToggleDisplay show={this.state.show}>
                    I am rendered in a span (by default) and hidden with display:none when show is false.
                </ToggleDisplay>

                <ToggleDisplay if={this.state.show} tag="section">
                    I am rendered in a section and removed from the DOM when if is false.
                </ToggleDisplay>
            </div>
        );
    }
}
const Home = connectTeamsComponent(HomeInner);


export default connect()(Home);
