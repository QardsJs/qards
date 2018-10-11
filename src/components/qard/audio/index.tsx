import * as React from 'react';
import ReactPlayer from 'react-player';
import {Icon} from '@blueprintjs/core';
import moment from 'moment';

import TitledWrapper from '../../common/titled-wrapper';
import QardImage, {CardImageType} from '../image';
import QardBase, {QardProps} from '../base';
import {InterfaceBtn, Item, Main, Playlist, Wrapper} from './styles';

export interface CardAudioItemType {
	url: string;
	title: string;
	subtitle?: string;
	poster?: CardImageType;
}

interface Progress {
	played: number;
	playedSeconds: number;
	loaded: number;
	loadedSeconds: number;
}

export interface State {
	isPlaying: boolean;
	readyToPlay: boolean;
	duration?: number;
	progress?: Progress;
	currentTrack: CardAudioItemType;
}

export interface CardAudioType extends QardProps {
	items: CardAudioItemType[];
	//  on infinite if we're at the last track, clicking next will jump to the first track
	//  without infinite, when at the last track, the `next` button is disabled
	//  same story goes for prev controls
	infinite?: boolean;
}


export default class QardAudio extends QardBase<CardAudioType, State> {
	player: any;

	constructor(props: CardAudioType) {
		super(props);

		const {items} = this.props;

		this.state = {
			readyToPlay : false,
			isPlaying   : false,
			currentTrack: items[0],
		};
	}

	hasPrev = () => {
		return this.getCurrentKey() > 0;
	};

	hasNext = () => {
		const {items} = this.props;
		return items.length > this.getCurrentKey() + 1;
	};

	onReadyToPlay = () => {
		this.setState({readyToPlay: true});
	};

	play = (audio: CardAudioItemType) => {
		this.notAvailableInPreview(() => {
			if (audio == this.state.currentTrack) return;

			this.resetTimer();

			this.setState({isPlaying: false}, () =>
				this.setState({currentTrack: audio, isPlaying: true}));
		});
	};

	resetTimer = () => {
		this.setState({
			duration: 0,
			progress: {
				played       : 0,
				playedSeconds: 0,
				loaded       : 0,
				loadedSeconds: 0,
			},
		});
	};

	ref = (player: ReactPlayer) => {
		this.player = player;
	};

	reset = () => {
		this.setState({isPlaying: false, currentTrack: this.props.items[0]});
	};

	playPrev = () => {
		this.notAvailableInPreview(() => {
			if (!this.hasPrev() && !this.props.infinite) {
				return this.reset();
			}
			this.resetTimer();
			const {items} = this.props;
			this.play(this.hasPrev() ? items[this.getCurrentKey() - 1] : items[0]);
		});
	};

	playNext = () => {
		this.notAvailableInPreview(() => {
			if (!this.hasNext() && !this.props.infinite) {
				return this.reset();
			}
			this.resetTimer();
			const {items} = this.props;
			this.play(this.hasNext() ? items[this.getCurrentKey() + 1] : items[0]);
		});
	};

	getCurrentKey = (): number => {
		//	returns the array key of the current song within all songs/items
		const {items} = this.props;
		for (let i = 0; i < items.length; i++) {
			if (items[i].url === this.state.currentTrack.url) {
				return i;
			}
		}
		return -1;
	};

	togglePlay = () => {
		this.notAvailableInPreview(() => {
			this.setState({isPlaying: !this.state.isPlaying});
		});
	};

	setDuration = (seconds: number) => {
		//this.setState({duration: parseInt(Number(seconds).toFixed(0))});
	};

	seconds = (s: number): number => parseInt(Number(s).toFixed(0));

	setProgress = (progress: Progress) => {
		this.setState({
			//	the `onDuration` callback is faulty in react player
			//	https://github.com/CookPete/react-player/issues/488
			duration: this.seconds(this.player.getDuration()),
			progress: {
				loaded       : this.seconds(progress.loaded),
				played       : this.seconds(progress.played),
				loadedSeconds: this.seconds(progress.loadedSeconds),
				playedSeconds: this.seconds(progress.playedSeconds),
			},
		});
	};

	get playedTimer() {
		const {duration, progress} = this.state;

		if (!duration || !progress) return <i>loading</i>;

		const remainingSeconds = duration - progress.playedSeconds;

		let format: string = 'mm:ss';
		if (remainingSeconds > 3600) {
			format = 'hh:mm:ss';
		}

		const dur = moment.duration(remainingSeconds, 'seconds');
		return moment.utc(dur.asMilliseconds()).format(format);
	}

	componentDidMount() {
		const items = this.prepareItems();
		this.setState({currentTrack: items[0]});
	}

	getItemFromPostFields(item: CardAudioItemType) {
		const {post} = this.props;

		if (!post) return null;

		const {audios} = post.fields;

		for (let i = 0; i < audios.length; i++) {
			if (audios[i].url == item.url && audios[i].title == item.title) {
				return audios[i];
			}
		}
	}

	prepareItems(): CardAudioItemType[] {
		const {items, preview} = this.props;

		const audioItems: CardAudioItemType[] = [];

		//	Normalize items to a format that would be acceptable
		//	to our component. We have to make sure that at least
		//	one item is sent with the required fields in place
		//	(title, url)
		for (let i = 0; i < items.length; i++) {
			const audio = items[i];

			//	absolutely required
			if (!audio.title || !audio.url) continue;

			//  there's no sharp transformations in preview mode so we have
			//  to inject the src of the poster
			if (preview) audioItems.push(Object.assign(items[i], audio.poster ? {
				poster: {
					alt: items[i].title,
					src: items[i].poster,
				},
			} : {}));

			if (!preview) audioItems.push(items[i]);
		}

		return audioItems;
	}

	render() {
		if (!this.state) {
			console.warn('state was not set');
			return <React.Fragment/>;
		}

		if (!this.props.items || !this.props.items.length) {
			console.warn('no items received');
			return <React.Fragment/>;
		}

		const audioItems = this.prepareItems();

		if (!audioItems.length) return <React.Fragment/>;

		const {isPlaying, currentTrack} = this.state;
		const {title, subtitle, url} = currentTrack;

		const postCurrentTrack = this.getItemFromPostFields(currentTrack);
		if (!postCurrentTrack) {
			console.error('Unable to find audio file');
		}

		const poster = postCurrentTrack && postCurrentTrack.poster ? postCurrentTrack.poster.image : null;

		return (
			<TitledWrapper>
				<Wrapper>
					<ReactPlayer
						ref={this.ref}
						url={url}
						playing={this.state.isPlaying}
						controls={false}
						onEnded={this.playNext}
						onReady={this.onReadyToPlay}
						onDuration={this.setDuration}
						onError={e => console.error('player error:', e)}
						onProgress={this.setProgress}
						className='qard-audio-player'
						style={{
							display: 'none',
						}}
					/>

					<Main>
						<div className="details">
							<div className="content">
								<b className="title">{title}</b>
								<span className="subtitle">{subtitle}</span>
							</div>

							<div className="controls">
								<InterfaceBtn
									minimal
									disabled={!this.hasPrev() && !this.props.infinite}
									onClick={this.playPrev}
									icon={<Icon icon="step-backward" iconSize={34}/>}
								/>
								<InterfaceBtn
									minimal
									onClick={this.togglePlay}
									isPlaying={isPlaying}
									icon={<Icon icon={isPlaying ? 'pause' : 'play'} iconSize={62}/>}
								/>
								<InterfaceBtn
									minimal
									disabled={!this.hasNext() && !this.props.infinite}
									onClick={this.playNext}
									icon={<Icon icon="step-forward" iconSize={34}/>}
								/>

								{isPlaying && <div className="duration">{this.playedTimer}</div>}
							</div>
						</div>

						{poster && <QardImage {...poster}/>}
					</Main>

					<Playlist>
						{audioItems.map((audio: CardAudioItemType, key) => {
							return (
								<Item
									key={key}
									onClick={() => this.play(audio)}
									className={currentTrack.url == audio.url ? `active` : ''}
								>
									{audio.title}
								</Item>
							);
						})}
					</Playlist>
				</Wrapper>
			</TitledWrapper>
		);
	}
}
