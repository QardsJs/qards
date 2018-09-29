import React, {Component} from 'react';
import styled from 'styled-components';
import {throttle, maxBy} from "lodash";
// @ts-ignore
import SP from 'scrollprogress';

import theme from '../../theme';
import {PostType} from "../../fragments/post";
import {decodeWidgetDataObject} from "../../cms/utils";
import {CardHeaderType} from "../qard/header";
import {cPattern, getThemeConfig, lineRepresentsEncodedComponent, slugify} from '../../utils/helpers';

const Wrapper = styled.ul`
	list-style-type: none;
	margin: 0!important;
	padding: 0;

	li {
		margin: 0;
		padding: 0 10px 0 20px;
		
		&.active {
			a {
				color: ${theme.color(['accent', 'background'])};
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
			font-size: 1rem;
			
			b {
				display: block;
				margin-bottom: 4px;
				font-weight: 500;
			}

			&:hover {
				opacity: 1;
				text-decoration: none;
			}
		}
		
		&.type-primary {
			font-size: 1rem;
			margin-top: 1.3rem;
			padding-top: 1.6rem;
			border-top: 1px solid ${theme.color(['borders'])};
		}
		
		&:first-child {
			border-top: none;
			margin: 0;
		}
		
		&:last-child {
			margin-bottom: 1.3rem;
		}
		
		&.type-secondary {
			padding-left: 40px;
			margin-top: 1.3rem;
			
			
			a {
				opacity: 0.6;
				
				b {
					font-weight: 400;
				}
	
				&:hover {
					opacity: 1;
					text-decoration: none;
				}
			}
		}
	}
`;

interface Props {
	post: PostType;
}

interface State {
	activeItemId?: string | null;
}

class Toc extends Component<Props, State> {
	state: State = {
		activeItemId: null,
	};

	progressObserver: any;

	updateScrollPosition() {
		const scrollDistance = window.pageYOffset || document.documentElement.scrollTop;
		const items = document.getElementsByClassName('h-item') as HTMLCollectionOf<HTMLElement>;

		let lastId: string = items[0].id;
		//	find the lastId and farthest item before calling setstate
		//	otherwise you're re-rendering for each header present in the page
		for (let index = 0; index < items.length; index++) {
			const element = items[index];

			if (element.offsetTop - 100 <= scrollDistance) {
				lastId = element.id;
			}
		}

		if (this.state.activeItemId !== lastId) this.setState({
			activeItemId: lastId
		});
	}

	initObserver = () => {
		if (this.progressObserver) {
			this.progressObserver.destroy();
			this.progressObserver = undefined;
		}

		this.progressObserver = new SP(() => this.scrollPosUpgrade.bind(this)());
	};

	scrollPosUpgrade = throttle(this.updateScrollPosition, 400, {
		leading : false,
		trailing: true
	});

	componentDidMount() {
		this.initObserver();
	}

	componentWillUnmount() {
		this.progressObserver.destroy();
	}

	get headings() {
		const {post} = this.props;
		const md = post.md;
		const headings: CardHeaderType[] = [];

		md.split("\n").map((line, k) => {
			if (lineRepresentsEncodedComponent(line)) {
				const params = line.match(cPattern);
				if (!params || params.length < 3) return;

				const widget = params[1];

				if (widget == 'qards-section-heading') {
					const config = decodeWidgetDataObject(params[2]);
					headings.push({...config})
				}
			}
		});

		return headings;
	}

	render() {
		return <Wrapper>
			{this.headings.length > 0 && this.headings.map((header: CardHeaderType, key: number) => {
				return (
					<li
						key={key}
						id={`toc-header-${slugify(header.title)}`}
						className={`toc-item ${
							this.state.activeItemId ==
							`h-item-${slugify(header.title)}`
								? 'active'
								: ''
							} type-${header.type}`}
					>
						<a href={`#h-item-${slugify(header.title)}`}>
							<b>{header.title}</b>
						</a>
					</li>
				);
			})}
		</Wrapper>
	}
}

export default Toc;
