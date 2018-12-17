import * as React from 'react';

// @ts-ignore
import moment from 'moment-timezone';
import {Flex, Box} from '@rebass/grid';

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
	y: number;
	mo: number;
	d: number;
	h: number;
	m: number;
	s: number;
}

export default class QardCountdown extends QardBase<CardCountdownType, State> {
	setInterval: any;
	state = {
		y: 0,
		mo: 0,
		d: 0,
		h: 0,
		m: 0,
		s: 0,
	};

	setCountdown() {
		const {event} = this.props;

		const eventTime = moment.utc(event).unix();
		const currentTime = moment().unix();
		const diffTime = eventTime - currentTime;
		const duration = moment.duration(diffTime * 1000, 'milliseconds');

		const y = moment.duration(duration).years();
		const mo = moment.duration(duration).months();
		const d = moment.duration(duration).days();
		const h = moment.duration(duration).hours();
		const m = moment.duration(duration).minutes();
		const s = moment.duration(duration).seconds();

		this.setState({
			y: y > 0 ? y : 0,
			mo: mo > 0 ? mo : 0,
			d: d > 0 ? d : 0,
			h: h > 0 ? h : 0,
			m: m > 0 ? m : 0,
			s: s > 0 ? s : 0,
		});
	}

	componentDidMount() {
		this.setCountdown();
		if (this.setInterval) clearInterval(this.setInterval);
		this.setInterval = setInterval(this.setCountdown.bind(this), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.setInterval);
	}

	//	!IMPORTANT: Pick the date relative to your timezone. The widget will converti it
	//	to UTC by default so here you get a UTC date but in the widget (when setting time)
	//	you have to think relative to your timezone
	public render() {
		const {title, subtitle, event} = this.props;
		const {y, mo, d, m, h, s} = this.state;
		const isEnded = d <= 0 && m <= 0 && h <= 0 && s <= 0;
		const userTz = moment.tz.guess();
		const dateRelativeToUser = moment.utc(event).tz(userTz).format('YYYY-MM-DD HH:mm:ss');

		let firstDuration = d;
		let firstLabel = 'days';

		let secondDuration = h;
		let secondLabel = 'hours';

		let thirdDuration = m;
		let thirdLabel = 'minutes';

		let fourthDuration = s;
		let fourthLabel = 'seconds';

		if (mo > 0) {
			firstDuration = mo;
			firstLabel = 'months';

			secondDuration = d;
			secondLabel = 'days';

			thirdDuration = h;
			thirdLabel = 'hours';

			fourthDuration = m;
			fourthLabel = 'minutes';
		}
		if (y > 0) {
			firstDuration = y;
			firstLabel = 'years';

			secondDuration = mo;
			secondLabel = 'months';

			thirdDuration = d;
			thirdLabel = 'days';

			fourthDuration = h;
			fourthLabel = 'hours';
		}

		return <Wrapper>
				<Flex flexWrap={`wrap`}>
					<Box width={1}>
						<Flex justifyContent={'center'}>
							<Box width={[1 / 2, 1 / 3, 1 / 4, 1 / 4]} px={2}>
								<Counter>{firstDuration}</Counter>
							</Box>
							<Box width={[1 / 2, 1 / 3, 1 / 4, 1 / 4]} px={2}>
								<Counter>{secondDuration}</Counter>
							</Box>
							<Box width={[0, 1 / 3, 1 / 4, 1 / 4]} px={2}>
								<Hide small>
									<Counter>{thirdDuration}</Counter>
								</Hide>
							</Box>

							<Box width={[0, 0, 1 / 4, 1 / 4]} px={2}>
								<Hide small xsmall>
									<Counter>{fourthDuration}</Counter>
								</Hide>
							</Box>
						</Flex>

						<Flex>
							<Box width={[1 / 2, 1 / 3, 1 / 4, 1 / 4]} px={2}>
								<Indicator>{firstLabel}</Indicator>
							</Box>
							<Box width={[1 / 2, 1 / 3, 1 / 4, 1 / 4]} px={2}>
								<Indicator>{secondLabel}</Indicator>
							</Box>
							<Box width={[0, 1 / 3, 1 / 4, 1 / 4]} px={2}>
								<Hide small>
									<Indicator>{thirdLabel}</Indicator>
								</Hide>
							</Box>

							<Box width={[0, 0, 1 / 4, 1 / 4]} px={2}>
								<Hide small xsmall>
									<Indicator>{fourthLabel}</Indicator>
								</Hide>
							</Box>
						</Flex>
					</Box>
					<Box width={1} className={'header'}>
						{title && <Title>
								<EndedTag intent={isEnded ? Intent.DANGER : Intent.SUCCESS}>
									{isEnded && <span>Ended on</span>} {dateRelativeToUser}
								</EndedTag>

								<EndedTag intent={Intent.PRIMARY} className={'tz'}>
									{userTz}
								</EndedTag>
								{title}
							</Title>}
						{subtitle && <Subtitle>{subtitle}</Subtitle>}
					</Box>
				</Flex>
			</Wrapper>;
	}
}
