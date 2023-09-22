import React, { createRef, useEffect, useRef, useState } from 'react';
import { PageStoreExtractor } from '../../context/StoreContext';
import { Component, ComponentPropertyDefinition, ComponentProps } from '../../types/common';
import useDefinition from '../util/useDefinition';
import { propertiesDefinition, stylePropertiesDefinition } from './videoProperties';
import VideoStyle from './VideoStyle';
import { HelperComponent } from '../HelperComponent';
import { isNullValue } from '@fincity/kirun-js';

import { processComponentStylePseudoClasses } from '../../util/styleProcessor';
import { SubHelperComponent } from '../SubHelperComponent';
import { styleDefaults } from './videoStyleProperties';
import { IconHelper } from '../util/IconHelper';

function Video(props: ComponentProps) {
	const { definition, locationHistory, context, pageDefinition } = props;
	const pageExtractor = PageStoreExtractor.getForContext(context.pageName);
	const {
		properties: {
			src,
			type,
			poster,
			autoPlay,
			showPipButton,
			showFullScreenButton,
			showAudioControls,
			showSeekBar,
			showPlaypause,
			showTime,
		} = {},
		stylePropertiesWithPseudoStates,
	} = useDefinition(
		definition,
		propertiesDefinition,
		stylePropertiesDefinition,
		locationHistory,
		pageExtractor,
	);

	//to check wheater browser supports html5 video
	const [videoControls, setVideoControl] = useState<boolean>(true);
	//playPauseButton
	const [playPauseEnd, setPlayPauseEnd] = useState<string>('play');
	//VIDEODURATION
	const [progressbarMax, setProgressbarMax] = useState<number>(0);

	//current duration of the video(timeElapsed)
	const [progressbarCurr, setProgressBarCurr] = useState<number>(0);

	const [toolTipX, setToolTipX] = useState<number>(0);

	//To show seek time while hovering on input.
	const [seekToolTip, setSeekToolTip] = useState<{
		hours: string;
		minutes: string;
		seconds: string;
	}>({ hours: '00', minutes: '00', seconds: '00' });

	//TO SHOW VALUE IN THE TIME TAG
	const [duration, setDuration] = useState<{ hours: string; minutes: string; seconds: string }>({
		hours: '00',
		minutes: '00',
		seconds: '00',
	});
	//To show timeElapsed in time tag
	const [timElapsed, settimeElapsed] = useState<{
		hours: string;
		minutes: string;
		seconds: string;
	}>({
		hours: '00',
		minutes: '00',
		seconds: '00',
	});

	//To toggle tool tip
	const [toogleToolTip, setToggleToolTip] = useState<boolean>(false);
	const [controlsOnHover, setControlsOnHover] = useState<boolean>(false);
	const [muted, setMuted] = useState<boolean>(false);
	const [fullScreenState, setFullScreenState] = useState<String>('expand');

	//videoRef
	const video = createRef<HTMLVideoElement>();
	//InputProgressBarRef
	const progressBarRef = createRef<HTMLInputElement>();
	//VolumeInput ref
	const [volume, setVolume] = useState<string>('1');
	//
	const volumeButton = createRef<HTMLButtonElement>();
	//fullScreen
	const fullScreen = createRef<HTMLButtonElement>();
	//containerRef
	const videoContainer = createRef<HTMLDivElement>();
	//Pip ref
	const pipRef = createRef<HTMLButtonElement>();

	const resolvedStyles = processComponentStylePseudoClasses(
		pageDefinition,
		{},
		stylePropertiesWithPseudoStates,
	);

	useEffect(() => {
		if (!video.current) return;
		// checking wheather browser supports html5 video or not.
		if (typeof video.current.canPlayType === 'function') {
			setVideoControl(false);
		}
		if (autoPlay) {
			video.current.play();
		}
	}, []);

	const handlePlayPause = () => {
		if (!video.current) return;
		if (video.current.paused || video.current.ended) {
			video.current.play();
			setPlayPauseEnd('pause');
		} else {
			video.current.pause();
			setPlayPauseEnd('play');
		}
	};

	//To format time in hours min sec
	const formatTime = (time: number) => {
		const result = new Date(time * 1000).toISOString().substring(11, 19);
		return {
			hours: result.substring(0, 2),
			minutes: result.substring(3, 5),
			seconds: result.substring(6, 8),
		};
	};

	//By this we can get the current time of the video
	const updateTimeElapsed = () => {
		if (!video.current) return;
		const time = formatTime(Math.round(video.current.currentTime));
		setProgressBarCurr(Math.floor(video.current.currentTime));
		//to show in the time tag of time Elapsed
		settimeElapsed(time);
	};

	//By this we can get the videoDuration after initilizing
	const initializeVideo = () => {
		if (!video.current) return;
		const videoDuration = Math.round(video.current.duration);
		setProgressbarMax(videoDuration);
		// we are calculating this to show In the time TAG
		const time = formatTime(videoDuration);
		setDuration(time);
	};

	//to show time in toolTip on hover of input or progressBar
	const updateSeek = (event: any) => {
		if (!progressBarRef.current) return;
		const toolTipX = event.clientX - (progressBarRef.current.getBoundingClientRect().left - 1);
		const clientWidth = event.target.clientWidth;
		const skipTo = Math.round((toolTipX / clientWidth) * progressbarMax);
		const t = formatTime(skipTo);
		setSeekToolTip(t);
		if (clientWidth - toolTipX < 30) {
			setToolTipX(toolTipX - 32);
		} else {
			setToolTipX(toolTipX);
		}
	};

	const skipAhead = (value: number) => {
		if (!video.current) return;
		video.current.currentTime = value;
	};

	const [manualSeek, setManualSeek] = useState<number | undefined>(undefined);

	//volumeControl
	let vol: number;
	const updateVolume = (event: any) => {
		if (!video.current) return;
		if (video.current.muted) video.current.muted = false;
		setVolume(event.target.value);
		vol = parseFloat(event.target.value);
		if (isNaN(vol)) return;
		video.current.volume = vol;
		setMuted(false);
	};
	const volumeIconHandle = (event: any) => {
		if (!video.current) return;
		video.current.muted = !video.current.muted;
		setMuted(!muted);
		if (muted === false) {
			setVolume('0');
		} else {
			setVolume(`${vol}`);
		}
	};

	const handleFullScreen = (event: any) => {
		if (!videoContainer.current) return;
		if (document.fullscreenElement) {
			document.exitFullscreen();
			setFullScreenState('compress-wide');
		} else {
			videoContainer.current.requestFullscreen();
			setFullScreenState('expand');
		}
	};
	//Picture in picture
	const handlePictureInPicture = async () => {
		if (!video.current || !pipRef.current) return;
		try {
			if (video.current !== document.pictureInPictureElement) {
				pipRef.current.disabled = true;
				await video.current.requestPictureInPicture();
			} else {
				await document.exitPictureInPicture();
			}
		} catch (error) {
			console.error(error);
		} finally {
			pipRef.current.disabled = false;
		}
	};
	const handleMouseLeaveVideo = (event: any) => {
		setControlsOnHover(false);
	};
	const handleMouseEnterVideo = (event: any) => {
		setControlsOnHover(true);
	};
	const handleMouseEnterInput = (event: any) => {
		setToggleToolTip(true);
	};
	const handleMouseLeaveInput = (event: any) => {
		setToggleToolTip(false);
	};
	return (
		<div
			className="comp compVideo"
			ref={videoContainer}
			onMouseEnter={handleMouseEnterVideo}
			onMouseLeave={handleMouseLeaveVideo}
			style={resolvedStyles.comp ?? {}}
		>
			<HelperComponent definition={definition} />
			<video
				controls={videoControls}
				poster={poster}
				preload="metadata"
				ref={video}
				onLoadedMetadata={initializeVideo}
				onTimeUpdate={updateTimeElapsed}
				data-seek
				onChange={volumeIconHandle}
				onClick={handlePlayPause}
				style={resolvedStyles.player ?? {}}
			>
				<source src={src} type={type} />
				Your browser does not support HTML5 video.
			</video>
			<SubHelperComponent
				definition={props.definition}
				subComponentName="player"
				style={resolvedStyles.player ?? {}}
			/>
			{controlsOnHover && (
				<div className={`videoControlsContainer ${videoControls ? 'hidden' : ''} `}>
					{showSeekBar && (
						<div
							className="progressBarContainer"
							onMouseEnter={handleMouseEnterInput}
							onMouseLeave={handleMouseLeaveInput}
						>
							<input
								className="progressBar progress"
								id="seek"
								value={manualSeek === undefined ? progressbarCurr : manualSeek}
								min="0"
								type="range"
								step="1"
								max={progressbarMax}
								onMouseMove={updateSeek}
								onMouseDown={() => setManualSeek(progressbarCurr)}
								onMouseUp={() => {
									let value =
										Number.parseInt(progressBarRef.current?.value ?? '') ?? 0;
									skipAhead(value);
									setProgressBarCurr(value);
									setManualSeek(undefined);
								}}
								ref={progressBarRef}
								onChange={ev => {
									if (manualSeek) setManualSeek(parseInt(ev.target.value));
								}}
								style={resolvedStyles.seekSlider ?? {}}
							/>
							<SubHelperComponent
								definition={props.definition}
								subComponentName="seekSlider"
							/>
							{toogleToolTip && (
								<div
									style={{
										left: `${toolTipX}px`,
										...(resolvedStyles.seekTimeTextOnHover ?? {}),
									}}
									className="toolTip"
								>{`${seekToolTip.hours != '00' ? seekToolTip.hours + ':' : ''}${
									seekToolTip.minutes
								}:${seekToolTip.seconds}`}</div>
							)}
						</div>
					)}

					<div className="playAndFullscreenGrid">
						<div className="playAndVolumeGrid">
							{showPlaypause && (
								<i
									className={`playBackIcon  fa-solid fa-${playPauseEnd}`}
									onClick={handlePlayPause}
									style={resolvedStyles.playPauseButton ?? {}}
								></i>
							)}
							{showTime && (
								<div className="time">
									<time
										className="timeElapsed"
										id="time-elapsed"
										dateTime={`${
											timElapsed.hours != '00' ? timElapsed.hours : ''
										}${timElapsed.minutes != '00' ? timElapsed.minutes : ''}${
											timElapsed.seconds
										}`}
										style={resolvedStyles.timeText ?? {}}
									>{`${timElapsed.hours != '00' ? timElapsed.hours + ':' : ''}${
										timElapsed.minutes
									}:${timElapsed.seconds}`}</time>
									<span className="timeSplitter">/</span>
									<time
										className="duration"
										id="duration"
										dateTime={`${
											duration.hours != '00' ? duration.hours : ''
										}:${duration.minutes != '00' ? duration.minutes : ''}:${
											duration.seconds
										}`}
										style={resolvedStyles.timeText ?? {}}
									>{`${duration.hours != '00' ? duration.hours + ':' : ''}${
										duration.minutes
									}:${duration.seconds}`}</time>
								</div>
							)}
							{showAudioControls && (
								<div className="volumeControls">
									<i
										id="volume-button"
										ref={volumeButton}
										className={`volumeButton fa-solid fa-volume-${
											volume == '0' || muted ? 'xmark' : 'high'
										}`}
										onClick={volumeIconHandle}
									></i>
									<input
										id="volume"
										value={volume}
										max={'1'}
										min={'0'}
										step={'0.01'}
										type="range"
										onChange={updateVolume}
										style={resolvedStyles.volumeSlider ?? {}}
									/>
								</div>
							)}
						</div>
						<div className="pipAndFullScreenGrid">
							{showPipButton && (
								<i
									className="fa-solid fa-window-restore pip"
									onClick={handlePictureInPicture}
									ref={pipRef}
									style={resolvedStyles.pipButton ?? {}}
								></i>
							)}
							{showFullScreenButton && (
								<i
									className="fa-solid fa-expand fullScreen"
									ref={fullScreen}
									id="fullscreen-button"
									onClick={handleFullScreen}
									style={resolvedStyles.fullScreenButton ?? {}}
								></i>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

const component: Component = {
	name: 'Video',
	displayName: 'Video',
	description: 'Video component',
	component: Video,
	propertyValidation: (props: ComponentPropertyDefinition): Array<string> => [],
	properties: propertiesDefinition,
	styleProperties: stylePropertiesDefinition,
	styleComponent: VideoStyle,
	styleDefaults: styleDefaults,
	allowedChildrenType: new Map<string, number>([['', -1]]),
	subComponentDefinition: [
		{
			name: '',
			displayName: 'Component',
			mainComponent: true,
			description: 'Component',
			icon: (
				<IconHelper viewBox="0 0 24 24">
					<path
						d="M21.23 10.7446C22.2567 11.3373 22.2567 12.8192 21.23 13.4119L5.06 22.7477C4.03333 23.3404 2.75 22.5995 2.75 21.414L2.75 2.74249C2.75 1.557 4.03333 0.816067 5.06 1.40881L21.23 10.7446Z"
						fill="currentColor"
						fillOpacity="0.2"
					/>
					<path
						d="M21.23 10.7446C22.2567 11.3373 22.2567 12.8192 21.23 13.4119L5.06 22.7477C4.03333 23.3404 2.75 22.5995 2.75 21.414L2.75 2.74249C2.75 1.557 4.03333 0.816067 5.06 1.40881L21.23 10.7446Z"
						fill="currentColor"
						fillOpacity="0.2"
					/>
					<path
						d="M13.5508 11.6455C13.8841 11.8379 13.8841 12.3191 13.5508 12.5115L8.12078 15.6465C7.78745 15.839 7.37078 15.5984 7.37078 15.2135L7.37078 8.94348C7.37078 8.55858 7.78745 8.31802 8.12078 8.51047L13.5508 11.6455Z"
						fill="currentColor"
					/>
				</IconHelper>
			),
		},
		{
			name: 'player',
			displayName: 'Player',
			description: 'Player',
			icon: 'fa fa-solid fa-box',
		},
		{
			name: 'volumeSlider',
			displayName: 'Volume Slider',
			description: 'Volume Slider',
			icon: 'fa fa-solid fa-box',
		},
		{
			name: 'seekSlider',
			displayName: 'Seek Slider',
			description: 'Seek Slider',
			icon: 'fa fa-solid fa-box',
		},
		{
			name: 'playPauseButton',
			displayName: 'Play Pause Button',
			description: 'Play Pause Button',
			icon: 'fa fa-solid fa-box',
		},
		{
			name: 'pipButton',
			displayName: 'Pip Button',
			description: 'Pip Button',
			icon: 'fa fa-solid fa-box',
		},
		{
			name: 'fullScreenButton',
			displayName: 'Full Screen Button',
			description: 'Full Screen Button',
			icon: 'fa fa-solid fa-box',
		},
		{
			name: 'timeText',
			displayName: 'Time Text',
			description: 'Time Text',
			icon: 'fa fa-solid fa-box',
		},
		{
			name: 'seekTimeTextOnHover',
			displayName: 'Seek Time Text On Hover',
			description: 'Seek Time Text On Hover',
			icon: 'fa fa-solid fa-box',
		},
	],
};

export default component;
