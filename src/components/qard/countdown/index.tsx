import * as React from 'react';

// @ts-ignore
import moment from 'moment-timezone';
import {Flex, Box} from 'grid-styled';

import QardBase, {QardProps} from '../base';
import {Wrapper, Title, Subtitle, Counter, Indicator, EndedTag} from './styles';
import {Intent} from '@blueprintjs/core';
import Hide from '../../common/hide';

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
		const {title, subtitle, event} = this.props;
		const {d, m, h, s} = this.state;

		const isEnded = d <= 0 && m <= 0 && h <= 0 && s <= 0;
		const isEnding = d <= 0 && m <= 0 && h <= 0 && s > 0;

		const userTz = moment.tz.guess();
		const dateRelativeToUser = moment.utc(event).tz(userTz).format('YYYY-MM-DD HH:mm:ss');

		return <Wrapper>
			<Flex flexWrap={`wrap`}>
				<Box width={1}>
					<Flex justifyContent={'center'}>
						<Box width={[1 / 2, 1 / 3, 1 / 4, 1 / 4]} px={2}>
							<Counter>{d}</Counter>
						</Box>
						<Box width={[1 / 2, 1 / 3, 1 / 4, 1 / 4]} px={2}>
							<Counter>{h}</Counter>
						</Box>
						<Box width={[0, 1 / 3, 1 / 4, 1 / 4]} px={2}>
							<Hide small>
								<Counter>{m}</Counter>
							</Hide>
						</Box>

						<Box width={[0, 0, 1 / 4, 1 / 4]} px={2}>
							<Hide small xsmall>
								<Counter>{s}</Counter>
							</Hide>
						</Box>
					</Flex>

					<Flex>
						<Box width={[1 / 2, 1 / 3, 1 / 4, 1 / 4]} px={2}>
							<Indicator>Days</Indicator>
						</Box>
						<Box width={[1 / 2, 1 / 3, 1 / 4, 1 / 4]} px={2}>
							<Indicator>Hours</Indicator>
						</Box>
						<Box width={[0, 1 / 3, 1 / 4, 1 / 4]} px={2}>
							<Hide small>
								<Indicator>Minutes</Indicator>
							</Hide>
						</Box>

						<Box width={[0, 0, 1 / 4, 1 / 4]} px={2}>
							<Hide small xsmall>
								<Indicator>Seconds</Indicator>
							</Hide>
						</Box>
					</Flex>
				</Box>
				<Box width={1} className={'header'}>
					{title && <Title>
						<EndedTag intent={isEnded ? Intent.DANGER : Intent.SUCCESS}>
							{isEnded && <span>Ended on</span>} {dateRelativeToUser}
						</EndedTag>

						<EndedTag intent={Intent.PRIMARY} className={'tz'}>{userTz}</EndedTag>
						{title}
					</Title>}
					{subtitle && <Subtitle>{subtitle}</Subtitle>}
				</Box>
			</Flex>
		</Wrapper>;
	}
}
