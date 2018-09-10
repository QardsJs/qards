import React, {Component} from 'react';
import {throttle} from 'lodash';
import styled from 'styled-components';

import theme from '../../theme';
import {Card as CardProps, CardHeader} from '../../templates/types';

const Wrapper = styled.ul`
	list-style-type: none;
	margin: 0;
	padding: 0;

	li {
		padding: 7px 0 5px 0;

		&.active {
			a {
				color: ${theme.colors.accent};
				opacity: 1;
				-webkit-transition: color 300ms linear;
				-ms-transition: color 300ms linear;
				transition: color 300ms linear;
			}
		}

		&.parent {
			margin-top: 10px;
		}

		a {
			display: block;
			font-weight: 500;
			font-size: 1rem;

			&:hover {
				opacity: 1;
				text-decoration: none;
			}
		}
	}

	ul {
		padding: 0 0 0 20px;
		margin: 0;
		list-style-type: none;

		a {
			opacity: 0.6;

			&:hover {
				opacity: 1;
				text-decoration: none;
			}
		}
	}
`;

interface Props {
    cards: CardProps[];
}

interface State {
    activeItemId?: string | null;
}

class Toc extends Component<Props, State> {
    state: State = {
        activeItemId: null,
    };

    updateScrollPosition() {
        const scrollDistance = window.pageYOffset || document.documentElement.scrollTop;
        const items = document.getElementsByClassName('h-item') as HTMLCollectionOf<HTMLElement>;

        for (let index = 0; index < items.length; index++) {
            const element = items[index];

            if (element.offsetTop <= scrollDistance) {
                this.setState({
                    activeItemId: element.id.replace('toc-header', 'h-item'),
                });
            }
        }
    }

    debouncedUpdateScrollPositionFunc = () => requestAnimationFrame(this.updateScrollPosition.bind(this));

    componentDidMount() {
        window.addEventListener('scroll', this.debouncedUpdateScrollPositionFunc);
    }

    componentWillUnmount() {
        window.removeEventListener(`scroll`, this.debouncedUpdateScrollPositionFunc);
    }

    renderCard(card: CardProps) {
        const {headers} = card;

        if (!headers) return;

        const clonedHeaders = Object.create(headers);

        const main = clonedHeaders[0];

        if (!main) return;

        //	remove main (first element) from the list
        clonedHeaders.shift();

        return (
            <Wrapper>
                <li
                    className={`parent toc-item ${
                        this.state.activeItemId == `h-item-${main.id}`
                            ? 'active'
                            : null
                        }`}
                >
                    <a href={`#h-item-${main.id}`}>{main.title}</a>
                </li>

                {clonedHeaders.length > 0 && (
                    <li>
                        <ul>
                            {clonedHeaders.map((header: CardHeader, key: number) => {
                                return (
                                    <li
                                        key={key}
                                        id={`toc-header-${header.id}`}
                                        className={`toc-item ${
                                            this.state.activeItemId ==
                                            `h-item-${header.id}`
                                                ? 'active'
                                                : null
                                            }`}
                                    >
                                        <a href={`#h-item-${header.id}`}>
                                            {header.title}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                )}
            </Wrapper>
        );
    }

    render() {
        const {cards} = this.props;

        return cards.map((card, key) => (
            <React.Fragment key={key}>{this.renderCard(card)}</React.Fragment>
        ));
    }
}

export default Toc;
