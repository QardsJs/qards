import React, {Component} from 'react';

import styled from 'styled-components';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import {Button, InputGroup, Intent} from '@blueprintjs/core';

import {AppToaster} from "../toaster";
import theme from '../../theme';

const Wrapper = styled.div`
	max-width: 600px;
	margin: 0 auto;
	text-align: center;

	.title {
		display: block;
		font-size: 1.8rem;
		margin-bottom: 5px;
	}

	.subtitle {
		display: block;
		font-size: 1rem;
		margin-bottom: 40px;
	}

	input {
		font-size: 1.1rem !important;
		font-family: inherit !important;
		padding: 30px 60px !important;
	}

	.bp3-input-group {
		.bp3-icon {
			top: 6px;
			left: 8px !important;
			font-size: 24px !important;
			
			svg {
			    width: 24px !important;
			    height: 24px !important;
			}
		}
		
		.bp3-input-action {
			font-family: inherit !important;
			top: 10px !important;
			right: 10px !important;
		}
	}
`;

interface Props {
    title?: string;
    subtitle?: string;
    style?: object;
}

interface State {
    email: string;
    result?: any;
    submitting: boolean;
}

export default class Subscribe extends Component<Props, State> {
    state: State = {submitting: false, email: ""};

    _handleSubmit = async (e: any) => {
        e.preventDefault();

        this.setState({submitting: true});

        const result = await addToMailchimp(this.state.email);

        let intent: Intent = Intent.SUCCESS;
        if (result.result !== "success") {
            intent = Intent.WARNING;
        } else {
            this.setState({email: ""});
        }

        // @ts-ignore
        AppToaster.show({message: result.msg, intent});

        this.setState({submitting: false});
    };

    _handleChange = (e: any) => {
        this.setState({email: e.target.value});
    };

    render() {
        return (
            <Wrapper style={this.props.style}>
                <b className="title">{this.props.title || "Don't miss our next post"}</b>
                <span className="subtitle">
					{this.props.subtitle || 'Cool stuff like this article. No spam.'}
				</span>

                <InputGroup
                    disabled={this.state.submitting}
                    large={true}
                    round={false}
                    leftIcon="envelope"
                    placeholder="gollum@ring.com"
                    value={this.state.email}
                    onChange={this._handleChange.bind(this)}
                    rightElement={
                        <Button
                            disabled={this.state.submitting}
                            minimal={true}
                            active={true}
                            large={true}
                            intent={Intent.PRIMARY}
                            onClick={this._handleSubmit.bind(this)}
                            style={{
                                color:
                                theme.colors
                                    .bgPrimaryText,
                                background:
                                theme.colors.primary,
                            }}
                        >
                            JOIN
                        </Button>
                    }
                    style={{
                        background: theme.colors.faded,
                        border: 'none',
                        boxShadow: 'none',
                    }}
                />
            </Wrapper>
        );
    }
}
