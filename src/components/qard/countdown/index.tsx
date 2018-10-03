import * as React from 'react';

import moment from 'moment';
import {Flex, Box} from 'grid-styled';

import QardBase, {QardProps} from '../base';
import {Wrapper, Title, Subtitle, Counter, Indicator, EndedTag} from './styles';
import {Intent} from '@blueprintjs/core';

export interface CardCountdownType extends QardProps {
	title: string;
	subtitle?: string;
	event: string;
}

interface State {
	d: number;
	h: number;
	m: number;
	s: number;
}

export default class QardCountdown extends QardBase<CardCountdownType, State> {
	setInterval: any;
	state = {
		d: 0,
		h: 0,
		m: 0,
		s: 0,
	};

	setCountdown() {
		const {event} = this.props;

		const eventTime = moment(event).unix();
		const currentTime = moment().unix();
		const diffTime = eventTime - currentTime;
		const duration = moment.duration(diffTime * 1000, 'milliseconds');

		const d = moment.duration(duration).days();
		const h = moment.duration(duration).hours();
		const m = moment.duration(duration).minutes();
		const s = moment.duration(duration).seconds();

		this.setState({
			d: d > 0 ? d : 0,
			h: h > 0 ? h : 0,
			m: m > 0 ? m : 0,
			s: s > 0 ? s : 0,
		});
	}

	componentDidMount() {
		if (this.setInterval) clearInterval(this.setInterval);
		this.setInterval = setInterval(this.setCountdown.bind(this), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.setInterval);
	}

	public render() {
		const {title, subtitle} = this.props;
		const {d, m, h, s} = this.state;

		const isEnded = d <= 0 && m <= 0 && h <= 0 && s <= 0;
		const isEnding = d <= 0 && m <= 0 && h <= 0 && s > 0;

		return <Wrapper>
			<Flex flexWrap={`wrap`}>
				<Box width={[2 / 2, 2 / 2, 2 / 2, 1 / 2]}>
					<Flex justifyContent={'center'}>
						<Box width={1 / 3} px={2}>
							<Counter>{d}</Counter>
						</Box>
						<Box width={1 / 3} px={2}>
							<Counter>{h}</Counter>
						</Box>
						<Box width={1 / 3} px={2}>
							<Counter>{m}</Counter>
						</Box>
					</Flex>

					<Flex>
						<Box width={1 / 3} px={2}>
							<Indicator>Days</Indicator>
						</Box>
						<Box width={1 / 3} px={2}>
							<Indicator>Hours</Indicator>
						</Box>
						<Box width={1 / 3} px={2}>
							<Indicator>Minutes</Indicator>
						</Box>
					</Flex>
				</Box>
				<Box width={[2 / 2, 2 / 2, 2 / 2, 1 / 2]}>
					<Flex className={'header'} justifyContent={['center', 'center', 'center', 'left']}>
						<Box mt={2}>
							{title && <Title>
								{isEnded && <EndedTag intent={Intent.DANGER}>ENDED</EndedTag>}
								{isEnding && <EndedTag intent={Intent.WARNING}>{s}</EndedTag>}
								{title}
							</Title>}
							{subtitle && <Subtitle>{subtitle}</Subtitle>}
						</Box>
					</Flex>
				</Box>
			</Flex>
		</Wrapper>;
	}
}
