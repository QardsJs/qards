import React, {Component} from 'react';
import styled from 'styled-components';

import theme from '../../theme';
import {CardContentEntityType, CardType, EntityTypes} from './card';
import {CardHeaderType} from '../qard/header';
import {graphql, StaticQuery} from "gatsby";
import {CardHeaderDataProps} from "../qard/header/queried";

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
    cards: CardType[];
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

    renderCard(card: CardType, headers: CardHeaderType[]) {
        return (
            <Wrapper>
                <li
                    className={`parent toc-item ${
                        this.state.activeItemId == `h-item-${card.id}`
                            ? 'active'
                            : null
                        }`}
                >
                    <a href={`#h-item-${card.id}`}>{card.title}</a>
                </li>

                {headers.length > 0 && (
                    <li>
                        <ul>
                            {headers.map((header, key: number) => {
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

    cardHeaders(card: CardType, data: CardHeaderDataProps): CardHeaderType[] {
        const headers: CardHeaderType[] = [];

        for (let i = 0; i < card.content.content.length; i++) {
            const entity: CardContentEntityType = card.content.content[i];

            if (!entity.data.target) continue;

            const cardType = entity.data.target.sys.contentType.sys.id;

            if (cardType == EntityTypes.HEADER) {
                const needleId = entity.data.target.sys.id;

                for (let j = 0; j < data.headers.edges.length; j++) {
                    const node = data.headers.edges[j].node;

                    if (node.contentful_id == needleId) {
                        headers.push(node)
                    }
                }

            }
        }

        return headers;
    }

    renderToc(data: CardHeaderDataProps) {
        const {cards} = this.props;

        return cards.map((card, key) => (
            <React.Fragment key={key}>{this.renderCard(card, this.cardHeaders(card, data))}</React.Fragment>
        ));
    }

    render() {
        return <StaticQuery
            query={graphql`
                query {
                    headers: allContentfulCardHeader {
                        edges{
                            node{
                                id
                                contentful_id
                                title
                                subtitle
                            }
                        }
                    }
                }
            `}

            render={(data: CardHeaderDataProps) => {
                return this.renderToc(data);
            }}
        />;
    }
}

export default Toc;
