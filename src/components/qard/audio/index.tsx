import * as React from 'react';
import ReactPlayer from "react-player";
import {Icon} from "@blueprintjs/core";
import moment from "moment";

import TitledWrapper from "../../common/titled-wrapper";
import {CardAudio, CardAudioItem} from '../../../templates/types';
import {InterfaceBtn, Item, Main, Playlist, Wrapper} from "./styles";


export interface State {
    isPlaying: boolean;
    duration?: number;
    progress?: Progress;
    currentTrack: CardAudioItem;
}

export interface Props {
    element: CardAudio;
    //  on infinite if he's at the last track, clicking next will jump to the first track
    //  without infinit, when at the last track, the `next` button is disabled
    //  same story goes for prev controls
    infinite?: boolean;
}

interface Progress {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
}

export default class QardAudio extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        const {playlist} = this.props.element;

        this.state = {
            isPlaying: false,
            currentTrack: playlist[0]
        }
    }

    hasPrev = () => {
        const {playlist} = this.props.element;

        for (let i = 0; i < playlist.length; i++) {
            if (playlist[i].id === this.state.currentTrack.id) {
                return i > 0;
            }
        }

        return false;
    };

    hasNext = () => {
        const {playlist} = this.props.element;

        for (let i = 0; i < playlist.length; i++) {
            if (playlist[i].id === this.state.currentTrack.id) {
                return i < playlist.length - 1;
            }
        }

        return false;
    };

    play = (audio: CardAudioItem) => {
        this.setState({currentTrack: audio, isPlaying: true});
    };

    resetTimer = () => {
        this.setState({
            duration: 0, progress: {
                played: 0,
                playedSeconds: 0,
                loaded: 0,
                loadedSeconds: 0
            }
        });
    };

    playPrev = () => {
        if (!this.hasPrev() && !this.props.infinite) return;

        this.resetTimer();

        const {playlist} = this.props.element;

        for (let i = 0; i < playlist.length; i++) {
            if (playlist[i].id === this.state.currentTrack.id) {
                let prevTrack;
                //  if we're the first item we need to go to last
                const isFirst = playlist[i].id == playlist[0].id;

                if (isFirst) {
                    prevTrack = playlist[playlist.length - 1];
                } else {
                    prevTrack = playlist[i - 1];
                }

                if (this.state.isPlaying) {
                    this.setState({isPlaying: false});
                    this.setState({currentTrack: prevTrack, isPlaying: true});
                } else {
                    this.setState({currentTrack: prevTrack});
                }
            }
        }
    };

    playNext = () => {
        if (!this.hasNext() && !this.props.infinite) return;

        this.resetTimer();

        const {playlist} = this.props.element;

        for (let i = 0; i < playlist.length; i++) {
            if (playlist[i].id === this.state.currentTrack.id) {
                let nextTrack;
                //  if we're the last item we need to start from first one
                const isLast = playlist.length == i + 1;

                if (isLast) {
                    nextTrack = playlist[0];
                } else {
                    nextTrack = playlist[i + 1];
                }


                if (this.state.isPlaying) {
                    this.setState({isPlaying: false});
                    this.setState({currentTrack: nextTrack, isPlaying: true});
                } else {
                    this.setState({currentTrack: nextTrack});
                }
            }
        }
    };

    togglePlay = () => {
        this.setState({isPlaying: !this.state.isPlaying});
    };

    setDuration = (seconds: number) => {
        this.setState({duration: parseInt(Number(seconds).toFixed(0))});
    };

    setProgress = (progress: Progress) => {
        this.setState({
            progress: {
                loaded: parseInt(Number(progress.loaded).toFixed(0)),
                played: parseInt(Number(progress.played).toFixed(0)),
                loadedSeconds: parseInt(Number(progress.loadedSeconds).toFixed(0)),
                playedSeconds: parseInt(Number(progress.playedSeconds).toFixed(0))
            }
        });
    };

    get playedTimer() {
        //  We can't get a remaining timer because we don't know the total number of seconds
        //  this track has so we're forced to only showing the positive progress
        const {duration, progress} = this.state;

        if (!duration || !progress) return <i>loading</i>;

        const remainingSeconds = duration - progress.playedSeconds;

        let format: string = 'mm:ss';
        if (remainingSeconds > 3600) {
            format = 'hh:mm:ss';
        }

        const dur = moment.duration(remainingSeconds, "seconds");
        return moment.utc(dur.asMilliseconds()).format(format);
    }

    componentDidMount() {
        const {playlist} = this.props.element;
        this.setState({currentTrack: playlist[0]});
    }

    public render() {
        if (!this.state) return null;

        const {playlist} = this.props.element;
        const {isPlaying, currentTrack} = this.state;
        const {title, subtitle, url, poster} = currentTrack;

        return <TitledWrapper>
            <Wrapper>
                <ReactPlayer
                    url={url}
                    playing={this.state.isPlaying}
                    controls={false}
                    onEnded={this.playNext}
                    onDuration={this.setDuration}
                    onProgress={this.setProgress}
                    style={{
                        display: "none"
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
                                icon={<Icon icon={isPlaying ? "pause" : "play"} iconSize={62}/>}
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

                    {poster && <img src={poster.resize.src}/>}
                </Main>

                <Playlist>
                    {playlist.map((audio: CardAudioItem, key) => {
                        return <Item
                            key={key}
                            onClick={() => this.play(audio)}
                            className={currentTrack.id == audio.id ? `active` : ""}
                        >{audio.title}</Item>;
                    })}
                </Playlist>
            </Wrapper>
        </TitledWrapper>;
    }
}
