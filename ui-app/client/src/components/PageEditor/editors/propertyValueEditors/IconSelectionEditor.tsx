import React, { useEffect, useState } from 'react';
import { ComponentPropertyDefinition } from '../../../../types/common';
import Portal from '../../../Portal';

interface IconSelectionEditorProps {
	value?: string;
	propDef: ComponentPropertyDefinition;
	onChange: (v: string | undefined) => void;
}

const OPTIONS = [
	['fa-solid', 'fa-regular'],
	[1, 2, 3, 4].map(i => `fa-${i}x`),
	['fa-rotate-0', 'fa-rotate-90', 'fa-rotate-180', 'fa-rotate-270'],
	['fa-flip-horizontal', 'fa-flip-vertical'],
];

const ALL_OPTIONS = OPTIONS.reduce((a, c) => [...a, ...c], []);

export function IconSelectionEditor({ value, onChange, propDef }: IconSelectionEditorProps) {
	const [chngValue, setChngValue] = useState(value ?? '');
	const [showIconBrowser, setShowIconBrowser] = useState(false);
	const [filter, setFilter] = useState('');

	useEffect(() => setChngValue(value ?? ''), [value]);

	let popup = <></>;
	if (showIconBrowser) {
		popup = (
			<Portal>
				<div className={`_popupBackground`} onClick={() => setShowIconBrowser(false)}>
					<div className="_popupContainer" onClick={e => e.stopPropagation()}>
						<div className="_iconSelectionBrowser">
							<input
								className="_peInput"
								placeholder="Search for icons..."
								type="text"
								value={filter}
								onChange={e => setFilter(e.target.value)}
							/>
							<div className="_iconSelectionDisplay">
								{(filter
									? ICONS.filter(i => i.includes(filter))
									: ICONS.slice(0, 30)
								).map(i => (
									<div
										key={i}
										className="_eachIcon"
										onClick={() => {
											let v =
												chngValue === '' ||
												chngValue === propDef.defaultValue
													? ''
													: chngValue;

											onChange(
												v
													.split(' ')
													.filter(
														e => e === 'fa' || ALL_OPTIONS.includes(e),
													)
													.join(' ') +
													' ' +
													i,
											);
											setShowIconBrowser(false);
										}}
									>
										<i className={`fa fa-2x ${i}`} />
										{i.substring(3)}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</Portal>
		);
	}

	return (
		<div className="_iconSelectionEditor">
			<div className="_pvExpressionEditor">
				<input
					type="text"
					className="_peInput"
					value={chngValue}
					placeholder={propDef.defaultValue}
					onChange={e => setChngValue(e.target.value)}
					onBlur={() =>
						onChange(
							chngValue === '' || chngValue === propDef.defaultValue
								? undefined
								: chngValue,
						)
					}
				/>
				<i
					className="_pillTag fa fa-search"
					tabIndex={0}
					onClick={() => setShowIconBrowser(true)}
				/>
			</div>
			<div className="_iconSelectionButtons">
				Style:
				{generateButtons(
					chngValue,
					OPTIONS[0],
					['fa-solid fa-square', 'fa-regular fa-square'],
					onChange,
				)}
			</div>
			<div className="_iconSelectionButtons">
				Size:
				{generateButtons(
					chngValue,
					OPTIONS[1],
					[1, 2, 3, 4].map(i => `fa-solid fa-${i}`),
					onChange,
				)}
			</div>
			<div className="_iconSelectionButtons">
				Rotate:
				{generateButtons(
					chngValue,
					OPTIONS[2],
					[
						'fa-solid fa-seedling fa-rotate-0',
						' fa-solid fa-seedling fa-rotate-90',
						'fa-solid fa-seedling fa-rotate-180',
						'fa-solid fa-seedling fa-rotate-270',
					],
					onChange,
				)}
			</div>
			<div className="_iconSelectionButtons">
				Flip:
				{generateButtons(
					chngValue,
					OPTIONS[3],
					['fa-solid fa-ruler-horizontal', 'fa-solid fa-ruler-vertical'],
					onChange,
				)}
			</div>
			{popup}
		</div>
	);
}

function generateButtons(
	value: string,
	options: string[],
	styles: string[],
	onChange: (v: string | undefined) => void,
): JSX.Element[] {
	return options.map((option, i) => (
		<i
			key={option}
			className={`_iconSelectionButton ${styles[i]} ${
				value.includes(option) ? 'active' : ''
			}`}
			onClick={() => onChange(clean(value, options, option))}
		/>
	));
}

function clean(value: string, options: string[], currentOption: string): string {
	if (value.includes(currentOption)) return value.replace(currentOption, '');
	return (
		options
			.reduce((a, c) => {
				if (!value) return '';
				return a.replace(c, '');
			}, value)
			.trim() +
		' ' +
		currentOption
	);
}

const ICONS = `fa-0
fa-1
fa-2
fa-3
fa-4
fa-5
fa-6
fa-7
fa-8
fa-9
fa-fill-drip
fa-arrows-to-circle
fa-chevron-circle-right
fa-circle-chevron-right
fa-at
fa-trash-alt
fa-trash-can
fa-text-height
fa-user-times
fa-user-xmark
fa-stethoscope
fa-comment-alt
fa-message
fa-info
fa-compress-alt
fa-down-left-and-up-right-to-center
fa-explosion
fa-file-alt
fa-file-lines
fa-file-text
fa-wave-square
fa-ring
fa-building-un
fa-dice-three
fa-calendar-alt
fa-calendar-days
fa-anchor-circle-check
fa-building-circle-arrow-right
fa-volleyball-ball
fa-volleyball
fa-arrows-up-to-line
fa-sort-desc
fa-sort-down
fa-circle-minus
fa-minus-circle
fa-door-open
fa-right-from-bracket
fa-sign-out-alt
fa-atom
fa-soap
fa-heart-music-camera-bolt
fa-icons
fa-microphone-alt-slash
fa-microphone-lines-slash
fa-bridge-circle-check
fa-pump-medical
fa-fingerprint
fa-hand-point-right
fa-magnifying-glass-location
fa-search-location
fa-forward-step
fa-step-forward
fa-face-smile-beam
fa-smile-beam
fa-flag-checkered
fa-football-ball
fa-football
fa-school-circle-exclamation
fa-crop
fa-angle-double-down
fa-angles-down
fa-users-rectangle
fa-people-roof
fa-people-line
fa-beer-mug-empty
fa-beer
fa-diagram-predecessor
fa-arrow-up-long
fa-long-arrow-up
fa-burn
fa-fire-flame-simple
fa-male
fa-person
fa-laptop
fa-file-csv
fa-menorah
fa-truck-plane
fa-record-vinyl
fa-face-grin-stars
fa-grin-stars
fa-bong
fa-pastafarianism
fa-spaghetti-monster-flying
fa-arrow-down-up-across-line
fa-spoon
fa-utensil-spoon
fa-jar-wheat
fa-envelopes-bulk
fa-mail-bulk
fa-file-circle-exclamation
fa-circle-h
fa-hospital-symbol
fa-pager
fa-address-book
fa-contact-book
fa-strikethrough
fa-k
fa-landmark-flag
fa-pencil-alt
fa-pencil
fa-backward
fa-caret-right
fa-comments
fa-file-clipboard
fa-paste
fa-code-pull-request
fa-clipboard-list
fa-truck-loading
fa-truck-ramp-box
fa-user-check
fa-vial-virus
fa-sheet-plastic
fa-blog
fa-user-ninja
fa-person-arrow-up-from-line
fa-scroll-torah
fa-torah
fa-broom-ball
fa-quidditch-broom-ball
fa-quidditch
fa-toggle-off
fa-archive
fa-box-archive
fa-person-drowning
fa-arrow-down-9-1
fa-sort-numeric-desc
fa-sort-numeric-down-alt
fa-face-grin-tongue-squint
fa-grin-tongue-squint
fa-spray-can
fa-truck-monster
fa-w
fa-earth-africa
fa-globe-africa
fa-rainbow
fa-circle-notch
fa-tablet-alt
fa-tablet-screen-button
fa-paw
fa-cloud
fa-trowel-bricks
fa-face-flushed
fa-flushed
fa-hospital-user
fa-tent-arrow-left-right
fa-gavel
fa-legal
fa-binoculars
fa-microphone-slash
fa-box-tissue
fa-motorcycle
fa-bell-concierge
fa-concierge-bell
fa-pen-ruler
fa-pencil-ruler
fa-people-arrows-left-right
fa-people-arrows
fa-mars-and-venus-burst
fa-caret-square-right
fa-square-caret-right
fa-cut
fa-scissors
fa-sun-plant-wilt
fa-toilets-portable
fa-hockey-puck
fa-table
fa-magnifying-glass-arrow-right
fa-digital-tachograph
fa-tachograph-digital
fa-users-slash
fa-clover
fa-mail-reply
fa-reply
fa-star-and-crescent
fa-house-fire
fa-minus-square
fa-square-minus
fa-helicopter
fa-compass
fa-caret-square-down
fa-square-caret-down
fa-file-circle-question
fa-laptop-code
fa-swatchbook
fa-prescription-bottle
fa-bars
fa-navicon
fa-people-group
fa-hourglass-3
fa-hourglass-end
fa-heart-broken
fa-heart-crack
fa-external-link-square-alt
fa-square-up-right
fa-face-kiss-beam
fa-kiss-beam
fa-film
fa-ruler-horizontal
fa-people-robbery
fa-lightbulb
fa-caret-left
fa-circle-exclamation
fa-exclamation-circle
fa-school-circle-xmark
fa-arrow-right-from-bracket
fa-sign-out
fa-chevron-circle-down
fa-circle-chevron-down
fa-unlock-alt
fa-unlock-keyhole
fa-cloud-showers-heavy
fa-headphones-alt
fa-headphones-simple
fa-sitemap
fa-circle-dollar-to-slot
fa-donate
fa-memory
fa-road-spikes
fa-fire-burner
fa-flag
fa-hanukiah
fa-feather
fa-volume-down
fa-volume-low
fa-comment-slash
fa-cloud-sun-rain
fa-compress
fa-wheat-alt
fa-wheat-awn
fa-ankh
fa-hands-holding-child
fa-asterisk
fa-check-square
fa-square-check
fa-peseta-sign
fa-header
fa-heading
fa-ghost
fa-list-squares
fa-list
fa-phone-square-alt
fa-square-phone-flip
fa-cart-plus
fa-gamepad
fa-circle-dot
fa-dot-circle
fa-dizzy
fa-face-dizzy
fa-egg
fa-house-medical-circle-xmark
fa-campground
fa-folder-plus
fa-futbol-ball
fa-futbol
fa-soccer-ball
fa-paint-brush
fa-paintbrush
fa-lock
fa-gas-pump
fa-hot-tub-person
fa-hot-tub
fa-map-location
fa-map-marked
fa-house-flood-water
fa-tree
fa-bridge-lock
fa-sack-dollar
fa-edit
fa-pen-to-square
fa-car-side
fa-share-alt
fa-share-nodes
fa-heart-circle-minus
fa-hourglass-2
fa-hourglass-half
fa-microscope
fa-sink
fa-bag-shopping
fa-shopping-bag
fa-arrow-down-z-a
fa-sort-alpha-desc
fa-sort-alpha-down-alt
fa-mitten
fa-person-rays
fa-users
fa-eye-slash
fa-flask-vial
fa-hand-paper
fa-hand
fa-om
fa-worm
fa-house-circle-xmark
fa-plug
fa-chevron-up
fa-hand-spock
fa-stopwatch
fa-face-kiss
fa-kiss
fa-bridge-circle-xmark
fa-face-grin-tongue
fa-grin-tongue
fa-chess-bishop
fa-face-grin-wink
fa-grin-wink
fa-deaf
fa-deafness
fa-ear-deaf
fa-hard-of-hearing
fa-road-circle-check
fa-dice-five
fa-rss-square
fa-square-rss
fa-land-mine-on
fa-i-cursor
fa-stamp
fa-stairs
fa-i
fa-hryvnia-sign
fa-hryvnia
fa-pills
fa-face-grin-wide
fa-grin-alt
fa-tooth
fa-v
fa-bicycle
fa-rod-asclepius
fa-rod-snake
fa-staff-aesculapius
fa-staff-snake
fa-head-side-cough-slash
fa-ambulance
fa-truck-medical
fa-wheat-awn-circle-exclamation
fa-snowman
fa-mortar-pestle
fa-road-barrier
fa-school
fa-igloo
fa-joint
fa-angle-right
fa-horse
fa-q
fa-g
fa-notes-medical
fa-temperature-2
fa-temperature-half
fa-thermometer-2
fa-thermometer-half
fa-dong-sign
fa-capsules
fa-poo-bolt
fa-poo-storm
fa-face-frown-open
fa-frown-open
fa-hand-point-up
fa-money-bill
fa-bookmark
fa-align-justify
fa-umbrella-beach
fa-helmet-un
fa-bullseye
fa-bacon
fa-hand-point-down
fa-arrow-up-from-bracket
fa-folder-blank
fa-folder
fa-file-medical-alt
fa-file-waveform
fa-radiation
fa-chart-simple
fa-mars-stroke
fa-vial
fa-dashboard
fa-gauge-med
fa-gauge
fa-tachometer-alt-average
fa-magic-wand-sparkles
fa-wand-magic-sparkles
fa-e
fa-pen-alt
fa-pen-clip
fa-bridge-circle-exclamation
fa-user
fa-school-circle-check
fa-dumpster
fa-shuttle-van
fa-van-shuttle
fa-building-user
fa-caret-square-left
fa-square-caret-left
fa-highlighter
fa-key
fa-bullhorn
fa-globe
fa-synagogue
fa-person-half-dress
fa-road-bridge
fa-location-arrow
fa-c
fa-tablet-button
fa-building-lock
fa-pizza-slice
fa-money-bill-wave
fa-area-chart
fa-chart-area
fa-house-flag
fa-person-circle-minus
fa-ban
fa-cancel
fa-camera-rotate
fa-air-freshener
fa-spray-can-sparkles
fa-star
fa-repeat
fa-cross
fa-box
fa-venus-mars
fa-arrow-pointer
fa-mouse-pointer
fa-expand-arrows-alt
fa-maximize
fa-charging-station
fa-shapes
fa-triangle-circle-square
fa-random
fa-shuffle
fa-person-running
fa-running
fa-mobile-retro
fa-grip-lines-vertical
fa-spider
fa-hands-bound
fa-file-invoice-dollar
fa-plane-circle-exclamation
fa-x-ray
fa-spell-check
fa-slash
fa-computer-mouse
fa-mouse
fa-arrow-right-to-bracket
fa-sign-in
fa-shop-slash
fa-store-alt-slash
fa-server
fa-virus-covid-slash
fa-shop-lock
fa-hourglass-1
fa-hourglass-start
fa-blender-phone
fa-building-wheat
fa-person-breastfeeding
fa-right-to-bracket
fa-sign-in-alt
fa-venus
fa-passport
fa-heart-pulse
fa-heartbeat
fa-people-carry-box
fa-people-carry
fa-temperature-high
fa-microchip
fa-crown
fa-weight-hanging
fa-xmarks-lines
fa-file-prescription
fa-weight-scale
fa-weight
fa-user-friends
fa-user-group
fa-arrow-up-a-z
fa-sort-alpha-up
fa-chess-knight
fa-face-laugh-squint
fa-laugh-squint
fa-wheelchair
fa-arrow-circle-up
fa-circle-arrow-up
fa-toggle-on
fa-person-walking
fa-walking
fa-l
fa-fire
fa-bed-pulse
fa-procedures
fa-shuttle-space
fa-space-shuttle
fa-face-laugh
fa-laugh
fa-folder-open
fa-heart-circle-plus
fa-code-fork
fa-city
fa-microphone-alt
fa-microphone-lines
fa-pepper-hot
fa-unlock
fa-colon-sign
fa-headset
fa-store-slash
fa-road-circle-xmark
fa-user-minus
fa-mars-stroke-up
fa-mars-stroke-v
fa-champagne-glasses
fa-glass-cheers
fa-clipboard
fa-house-circle-exclamation
fa-file-arrow-up
fa-file-upload
fa-wifi-3
fa-wifi-strong
fa-wifi
fa-bath
fa-bathtub
fa-underline
fa-user-edit
fa-user-pen
fa-signature
fa-stroopwafel
fa-bold
fa-anchor-lock
fa-building-ngo
fa-manat-sign
fa-not-equal
fa-border-style
fa-border-top-left
fa-map-location-dot
fa-map-marked-alt
fa-jedi
fa-poll
fa-square-poll-vertical
fa-mug-hot
fa-battery-car
fa-car-battery
fa-gift
fa-dice-two
fa-chess-queen
fa-glasses
fa-chess-board
fa-building-circle-check
fa-person-chalkboard
fa-mars-stroke-h
fa-mars-stroke-right
fa-hand-back-fist
fa-hand-rock
fa-caret-square-up
fa-square-caret-up
fa-cloud-showers-water
fa-bar-chart
fa-chart-bar
fa-hands-bubbles
fa-hands-wash
fa-less-than-equal
fa-train
fa-eye-low-vision
fa-low-vision
fa-crow
fa-sailboat
fa-window-restore
fa-plus-square
fa-square-plus
fa-torii-gate
fa-frog
fa-bucket
fa-image
fa-microphone
fa-cow
fa-caret-up
fa-screwdriver
fa-folder-closed
fa-house-tsunami
fa-square-nfi
fa-arrow-up-from-ground-water
fa-glass-martini-alt
fa-martini-glass
fa-rotate-back
fa-rotate-backward
fa-rotate-left
fa-undo-alt
fa-columns
fa-table-columns
fa-lemon
fa-head-side-mask
fa-handshake
fa-gem
fa-dolly-box
fa-dolly
fa-smoking
fa-compress-arrows-alt
fa-minimize
fa-monument
fa-snowplow
fa-angle-double-right
fa-angles-right
fa-cannabis
fa-circle-play
fa-play-circle
fa-tablets
fa-ethernet
fa-eur
fa-euro-sign
fa-euro
fa-chair
fa-check-circle
fa-circle-check
fa-circle-stop
fa-stop-circle
fa-compass-drafting
fa-drafting-compass
fa-plate-wheat
fa-icicles
fa-person-shelter
fa-neuter
fa-id-badge
fa-marker
fa-face-laugh-beam
fa-laugh-beam
fa-helicopter-symbol
fa-universal-access
fa-chevron-circle-up
fa-circle-chevron-up
fa-lari-sign
fa-volcano
fa-person-walking-dashed-line-arrow-right
fa-gbp
fa-pound-sign
fa-sterling-sign
fa-viruses
fa-square-person-confined
fa-user-tie
fa-arrow-down-long
fa-long-arrow-down
fa-tent-arrow-down-to-line
fa-certificate
fa-mail-reply-all
fa-reply-all
fa-suitcase
fa-person-skating
fa-skating
fa-filter-circle-dollar
fa-funnel-dollar
fa-camera-retro
fa-arrow-circle-down
fa-circle-arrow-down
fa-arrow-right-to-file
fa-file-import
fa-external-link-square
fa-square-arrow-up-right
fa-box-open
fa-scroll
fa-spa
fa-location-pin-lock
fa-pause
fa-hill-avalanche
fa-temperature-0
fa-temperature-empty
fa-thermometer-0
fa-thermometer-empty
fa-bomb
fa-registered
fa-address-card
fa-contact-card
fa-vcard
fa-balance-scale-right
fa-scale-unbalanced-flip
fa-subscript
fa-diamond-turn-right
fa-directions
fa-burst
fa-house-laptop
fa-laptop-house
fa-face-tired
fa-tired
fa-money-bills
fa-smog
fa-crutch
fa-cloud-arrow-up
fa-cloud-upload-alt
fa-cloud-upload
fa-palette
fa-arrows-turn-right
fa-vest
fa-ferry
fa-arrows-down-to-people
fa-seedling
fa-sprout
fa-arrows-alt-h
fa-left-right
fa-boxes-packing
fa-arrow-circle-left
fa-circle-arrow-left
fa-group-arrows-rotate
fa-bowl-food
fa-candy-cane
fa-arrow-down-wide-short
fa-sort-amount-asc
fa-sort-amount-down
fa-cloud-bolt
fa-thunderstorm
fa-remove-format
fa-text-slash
fa-face-smile-wink
fa-smile-wink
fa-file-word
fa-file-powerpoint
fa-arrows-h
fa-arrows-left-right
fa-house-lock
fa-cloud-arrow-down
fa-cloud-download-alt
fa-cloud-download
fa-children
fa-blackboard
fa-chalkboard
fa-user-alt-slash
fa-user-large-slash
fa-envelope-open
fa-handshake-alt-slash
fa-handshake-simple-slash
fa-mattress-pillow
fa-guarani-sign
fa-arrows-rotate
fa-refresh
fa-sync
fa-fire-extinguisher
fa-cruzeiro-sign
fa-greater-than-equal
fa-shield-alt
fa-shield-halved
fa-atlas
fa-book-atlas
fa-virus
fa-envelope-circle-check
fa-layer-group
fa-arrows-to-dot
fa-archway
fa-heart-circle-check
fa-house-chimney-crack
fa-house-damage
fa-file-archive
fa-file-zipper
fa-square
fa-glass-martini
fa-martini-glass-empty
fa-couch
fa-cedi-sign
fa-italic
fa-church
fa-comments-dollar
fa-democrat
fa-z
fa-person-skiing
fa-skiing
fa-road-lock
fa-a
fa-temperature-arrow-down
fa-temperature-down
fa-feather-alt
fa-feather-pointed
fa-p
fa-snowflake
fa-newspaper
fa-ad
fa-rectangle-ad
fa-arrow-circle-right
fa-circle-arrow-right
fa-filter-circle-xmark
fa-locust
fa-sort
fa-unsorted
fa-list-1-2
fa-list-numeric
fa-list-ol
fa-person-dress-burst
fa-money-check-alt
fa-money-check-dollar
fa-vector-square
fa-bread-slice
fa-language
fa-face-kiss-wink-heart
fa-kiss-wink-heart
fa-filter
fa-question
fa-file-signature
fa-arrows-alt
fa-up-down-left-right
fa-house-chimney-user
fa-hand-holding-heart
fa-puzzle-piece
fa-money-check
fa-star-half-alt
fa-star-half-stroke
fa-code
fa-glass-whiskey
fa-whiskey-glass
fa-building-circle-exclamation
fa-magnifying-glass-chart
fa-arrow-up-right-from-square
fa-external-link
fa-cubes-stacked
fa-krw
fa-won-sign
fa-won
fa-virus-covid
fa-austral-sign
fa-f
fa-leaf
fa-road
fa-cab
fa-taxi
fa-person-circle-plus
fa-chart-pie
fa-pie-chart
fa-bolt-lightning
fa-sack-xmark
fa-file-excel
fa-file-contract
fa-fish-fins
fa-building-flag
fa-face-grin-beam
fa-grin-beam
fa-object-ungroup
fa-poop
fa-location-pin
fa-map-marker
fa-kaaba
fa-toilet-paper
fa-hard-hat
fa-hat-hard
fa-helmet-safety
fa-eject
fa-arrow-alt-circle-right
fa-circle-right
fa-plane-circle-check
fa-face-rolling-eyes
fa-meh-rolling-eyes
fa-object-group
fa-chart-line
fa-line-chart
fa-mask-ventilator
fa-arrow-right
fa-map-signs
fa-signs-post
fa-cash-register
fa-person-circle-question
fa-h
fa-tarp
fa-screwdriver-wrench
fa-tools
fa-arrows-to-eye
fa-plug-circle-bolt
fa-heart
fa-mars-and-venus
fa-home-user
fa-house-user
fa-dumpster-fire
fa-house-crack
fa-cocktail
fa-martini-glass-citrus
fa-face-surprise
fa-surprise
fa-bottle-water
fa-circle-pause
fa-pause-circle
fa-toilet-paper-slash
fa-apple-alt
fa-apple-whole
fa-kitchen-set
fa-r
fa-temperature-1
fa-temperature-quarter
fa-thermometer-1
fa-thermometer-quarter
fa-cube
fa-bitcoin-sign
fa-shield-dog
fa-solar-panel
fa-lock-open
fa-elevator
fa-money-bill-transfer
fa-money-bill-trend-up
fa-house-flood-water-circle-arrow-right
fa-poll-h
fa-square-poll-horizontal
fa-circle
fa-backward-fast
fa-fast-backward
fa-recycle
fa-user-astronaut
fa-plane-slash
fa-trademark
fa-basketball-ball
fa-basketball
fa-satellite-dish
fa-arrow-alt-circle-up
fa-circle-up
fa-mobile-alt
fa-mobile-screen-button
fa-volume-high
fa-volume-up
fa-users-rays
fa-wallet
fa-clipboard-check
fa-file-audio
fa-burger
fa-hamburger
fa-wrench
fa-bugs
fa-rupee-sign
fa-rupee
fa-file-image
fa-circle-question
fa-question-circle
fa-plane-departure
fa-handshake-slash
fa-book-bookmark
fa-code-branch
fa-hat-cowboy
fa-bridge
fa-phone-alt
fa-phone-flip
fa-truck-front
fa-cat
fa-anchor-circle-exclamation
fa-truck-field
fa-route
fa-clipboard-question
fa-panorama
fa-comment-medical
fa-teeth-open
fa-file-circle-minus
fa-tags
fa-wine-glass
fa-fast-forward
fa-forward-fast
fa-face-meh-blank
fa-meh-blank
fa-parking
fa-square-parking
fa-house-signal
fa-bars-progress
fa-tasks-alt
fa-faucet-drip
fa-cart-flatbed
fa-dolly-flatbed
fa-ban-smoking
fa-smoking-ban
fa-terminal
fa-mobile-button
fa-house-medical-flag
fa-basket-shopping
fa-shopping-basket
fa-tape
fa-bus-alt
fa-bus-simple
fa-eye
fa-face-sad-cry
fa-sad-cry
fa-audio-description
fa-person-military-to-person
fa-file-shield
fa-user-slash
fa-pen
fa-tower-observation
fa-file-code
fa-signal-5
fa-signal-perfect
fa-signal
fa-bus
fa-heart-circle-xmark
fa-home-lg
fa-house-chimney
fa-window-maximize
fa-face-frown
fa-frown
fa-prescription
fa-shop
fa-store-alt
fa-floppy-disk
fa-save
fa-vihara
fa-balance-scale-left
fa-scale-unbalanced
fa-sort-asc
fa-sort-up
fa-comment-dots
fa-commenting
fa-plant-wilt
fa-diamond
fa-face-grin-squint
fa-grin-squint
fa-hand-holding-dollar
fa-hand-holding-usd
fa-bacterium
fa-hand-pointer
fa-drum-steelpan
fa-hand-scissors
fa-hands-praying
fa-praying-hands
fa-arrow-right-rotate
fa-arrow-rotate-forward
fa-arrow-rotate-right
fa-redo
fa-biohazard
fa-location-crosshairs
fa-location
fa-mars-double
fa-child-dress
fa-users-between-lines
fa-lungs-virus
fa-face-grin-tears
fa-grin-tears
fa-phone
fa-calendar-times
fa-calendar-xmark
fa-child-reaching
fa-head-side-virus
fa-user-cog
fa-user-gear
fa-arrow-up-1-9
fa-sort-numeric-up
fa-door-closed
fa-shield-virus
fa-dice-six
fa-mosquito-net
fa-bridge-water
fa-person-booth
fa-text-width
fa-hat-wizard
fa-pen-fancy
fa-digging
fa-person-digging
fa-trash
fa-gauge-simple-med
fa-gauge-simple
fa-tachometer-average
fa-book-medical
fa-poo
fa-quote-right-alt
fa-quote-right
fa-shirt
fa-t-shirt
fa-tshirt
fa-cubes
fa-divide
fa-tenge-sign
fa-tenge
fa-headphones
fa-hands-holding
fa-hands-clapping
fa-republican
fa-arrow-left
fa-person-circle-xmark
fa-ruler
fa-align-left
fa-dice-d6
fa-restroom
fa-j
fa-users-viewfinder
fa-file-video
fa-external-link-alt
fa-up-right-from-square
fa-table-cells
fa-th
fa-file-pdf
fa-bible
fa-book-bible
fa-o
fa-medkit
fa-suitcase-medical
fa-user-secret
fa-otter
fa-female
fa-person-dress
fa-comment-dollar
fa-briefcase-clock
fa-business-time
fa-table-cells-large
fa-th-large
fa-book-tanakh
fa-tanakh
fa-phone-volume
fa-volume-control-phone
fa-hat-cowboy-side
fa-clipboard-user
fa-child
fa-lira-sign
fa-satellite
fa-plane-lock
fa-tag
fa-comment
fa-birthday-cake
fa-cake-candles
fa-cake
fa-envelope
fa-angle-double-up
fa-angles-up
fa-paperclip
fa-arrow-right-to-city
fa-ribbon
fa-lungs
fa-arrow-up-9-1
fa-sort-numeric-up-alt
fa-litecoin-sign
fa-border-none
fa-circle-nodes
fa-parachute-box
fa-indent
fa-truck-field-un
fa-hourglass-empty
fa-hourglass
fa-mountain
fa-user-doctor
fa-user-md
fa-circle-info
fa-info-circle
fa-cloud-meatball
fa-camera-alt
fa-camera
fa-square-virus
fa-meteor
fa-car-on
fa-sleigh
fa-arrow-down-1-9
fa-sort-numeric-asc
fa-sort-numeric-down
fa-hand-holding-droplet
fa-hand-holding-water
fa-water
fa-calendar-check
fa-braille
fa-prescription-bottle-alt
fa-prescription-bottle-medical
fa-landmark
fa-truck
fa-crosshairs
fa-person-cane
fa-tent
fa-vest-patches
fa-check-double
fa-arrow-down-a-z
fa-sort-alpha-asc
fa-sort-alpha-down
fa-money-bill-wheat
fa-cookie
fa-arrow-left-rotate
fa-arrow-rotate-back
fa-arrow-rotate-backward
fa-arrow-rotate-left
fa-undo
fa-hard-drive
fa-hdd
fa-face-grin-squint-tears
fa-grin-squint-tears
fa-dumbbell
fa-list-alt
fa-rectangle-list
fa-tarp-droplet
fa-house-medical-circle-check
fa-person-skiing-nordic
fa-skiing-nordic
fa-calendar-plus
fa-plane-arrival
fa-arrow-alt-circle-left
fa-circle-left
fa-subway
fa-train-subway
fa-chart-gantt
fa-indian-rupee-sign
fa-indian-rupee
fa-inr
fa-crop-alt
fa-crop-simple
fa-money-bill-1
fa-money-bill-alt
fa-left-long
fa-long-arrow-alt-left
fa-dna
fa-virus-slash
fa-minus
fa-subtract
fa-child-rifle
fa-chess
fa-arrow-left-long
fa-long-arrow-left
fa-plug-circle-check
fa-street-view
fa-franc-sign
fa-volume-off
fa-american-sign-language-interpreting
fa-asl-interpreting
fa-hands-american-sign-language-interpreting
fa-hands-asl-interpreting
fa-cog
fa-gear
fa-droplet-slash
fa-tint-slash
fa-mosque
fa-mosquito
fa-star-of-david
fa-person-military-rifle
fa-cart-shopping
fa-shopping-cart
fa-vials
fa-plug-circle-plus
fa-place-of-worship
fa-grip-vertical
fa-arrow-turn-up
fa-level-up
fa-u
fa-square-root-alt
fa-square-root-variable
fa-clock-four
fa-clock
fa-backward-step
fa-step-backward
fa-pallet
fa-faucet
fa-baseball-bat-ball
fa-s
fa-timeline
fa-keyboard
fa-caret-down
fa-clinic-medical
fa-house-chimney-medical
fa-temperature-3
fa-temperature-three-quarters
fa-thermometer-3
fa-thermometer-three-quarters
fa-mobile-android-alt
fa-mobile-screen
fa-plane-up
fa-piggy-bank
fa-battery-3
fa-battery-half
fa-mountain-city
fa-coins
fa-khanda
fa-sliders-h
fa-sliders
fa-folder-tree
fa-network-wired
fa-map-pin
fa-hamsa
fa-cent-sign
fa-flask
fa-person-pregnant
fa-wand-sparkles
fa-ellipsis-v
fa-ellipsis-vertical
fa-ticket
fa-power-off
fa-long-arrow-alt-right
fa-right-long
fa-flag-usa
fa-laptop-file
fa-teletype
fa-tty
fa-diagram-next
fa-person-rifle
fa-house-medical-circle-exclamation
fa-closed-captioning
fa-hiking
fa-person-hiking
fa-venus-double
fa-images
fa-calculator
fa-people-pulling
fa-n
fa-cable-car
fa-tram
fa-cloud-rain
fa-building-circle-xmark
fa-ship
fa-arrows-down-to-line
fa-download
fa-face-grin
fa-grin
fa-backspace
fa-delete-left
fa-eye-dropper-empty
fa-eye-dropper
fa-eyedropper
fa-file-circle-check
fa-forward
fa-mobile-android
fa-mobile-phone
fa-mobile
fa-face-meh
fa-meh
fa-align-center
fa-book-dead
fa-book-skull
fa-drivers-license
fa-id-card
fa-dedent
fa-outdent
fa-heart-circle-exclamation
fa-home-alt
fa-home-lg-alt
fa-home
fa-house
fa-calendar-week
fa-laptop-medical
fa-b
fa-file-medical
fa-dice-one
fa-kiwi-bird
fa-arrow-right-arrow-left
fa-exchange
fa-redo-alt
fa-rotate-forward
fa-rotate-right
fa-cutlery
fa-utensils
fa-arrow-up-wide-short
fa-sort-amount-up
fa-mill-sign
fa-bowl-rice
fa-skull
fa-broadcast-tower
fa-tower-broadcast
fa-truck-pickup
fa-long-arrow-alt-up
fa-up-long
fa-stop
fa-code-merge
fa-upload
fa-hurricane
fa-mound
fa-toilet-portable
fa-compact-disc
fa-file-arrow-down
fa-file-download
fa-caravan
fa-shield-cat
fa-bolt
fa-zap
fa-glass-water
fa-oil-well
fa-vault
fa-mars
fa-toilet
fa-plane-circle-xmark
fa-cny
fa-jpy
fa-rmb
fa-yen-sign
fa-yen
fa-rouble
fa-rub
fa-ruble-sign
fa-ruble
fa-sun
fa-guitar
fa-face-laugh-wink
fa-laugh-wink
fa-horse-head
fa-bore-hole
fa-industry
fa-arrow-alt-circle-down
fa-circle-down
fa-arrows-turn-to-dots
fa-florin-sign
fa-arrow-down-short-wide
fa-sort-amount-desc
fa-sort-amount-down-alt
fa-less-than
fa-angle-down
fa-car-tunnel
fa-head-side-cough
fa-grip-lines
fa-thumbs-down
fa-user-lock
fa-arrow-right-long
fa-long-arrow-right
fa-anchor-circle-xmark
fa-ellipsis-h
fa-ellipsis
fa-chess-pawn
fa-first-aid
fa-kit-medical
fa-person-through-window
fa-toolbox
fa-hands-holding-circle
fa-bug
fa-credit-card-alt
fa-credit-card
fa-automobile
fa-car
fa-hand-holding-hand
fa-book-open-reader
fa-book-reader
fa-mountain-sun
fa-arrows-left-right-to-line
fa-dice-d20
fa-truck-droplet
fa-file-circle-xmark
fa-temperature-arrow-up
fa-temperature-up
fa-medal
fa-bed
fa-h-square
fa-square-h
fa-podcast
fa-temperature-4
fa-temperature-full
fa-thermometer-4
fa-thermometer-full
fa-bell
fa-superscript
fa-plug-circle-xmark
fa-star-of-life
fa-phone-slash
fa-paint-roller
fa-hands-helping
fa-handshake-angle
fa-location-dot
fa-map-marker-alt
fa-file
fa-greater-than
fa-person-swimming
fa-swimmer
fa-arrow-down
fa-droplet
fa-tint
fa-eraser
fa-earth-america
fa-earth-americas
fa-earth
fa-globe-americas
fa-person-burst
fa-dove
fa-battery-0
fa-battery-empty
fa-socks
fa-inbox
fa-section
fa-gauge-high
fa-tachometer-alt-fast
fa-tachometer-alt
fa-envelope-open-text
fa-hospital-alt
fa-hospital-wide
fa-hospital
fa-wine-bottle
fa-chess-rook
fa-bars-staggered
fa-reorder
fa-stream
fa-dharmachakra
fa-hotdog
fa-blind
fa-person-walking-with-cane
fa-drum
fa-ice-cream
fa-heart-circle-bolt
fa-fax
fa-paragraph
fa-check-to-slot
fa-vote-yea
fa-star-half
fa-boxes-alt
fa-boxes-stacked
fa-boxes
fa-chain
fa-link
fa-assistive-listening-systems
fa-ear-listen
fa-tree-city
fa-play
fa-font
fa-rupiah-sign
fa-magnifying-glass
fa-search
fa-ping-pong-paddle-ball
fa-table-tennis-paddle-ball
fa-table-tennis
fa-diagnoses
fa-person-dots-from-line
fa-trash-can-arrow-up
fa-trash-restore-alt
fa-naira-sign
fa-cart-arrow-down
fa-walkie-talkie
fa-file-edit
fa-file-pen
fa-receipt
fa-pen-square
fa-pencil-square
fa-square-pen
fa-suitcase-rolling
fa-person-circle-exclamation
fa-chevron-down
fa-battery-5
fa-battery-full
fa-battery
fa-skull-crossbones
fa-code-compare
fa-list-dots
fa-list-ul
fa-school-lock
fa-tower-cell
fa-down-long
fa-long-arrow-alt-down
fa-ranking-star
fa-chess-king
fa-person-harassing
fa-brazilian-real-sign
fa-landmark-alt
fa-landmark-dome
fa-arrow-up
fa-television
fa-tv-alt
fa-tv
fa-shrimp
fa-list-check
fa-tasks
fa-jug-detergent
fa-circle-user
fa-user-circle
fa-user-shield
fa-wind
fa-car-burst
fa-car-crash
fa-y
fa-person-snowboarding
fa-snowboarding
fa-shipping-fast
fa-truck-fast
fa-fish
fa-user-graduate
fa-adjust
fa-circle-half-stroke
fa-clapperboard
fa-circle-radiation
fa-radiation-alt
fa-baseball-ball
fa-baseball
fa-jet-fighter-up
fa-diagram-project
fa-project-diagram
fa-copy
fa-volume-mute
fa-volume-times
fa-volume-xmark
fa-hand-sparkles
fa-grip-horizontal
fa-grip
fa-share-from-square
fa-share-square
fa-gun
fa-phone-square
fa-square-phone
fa-add
fa-plus
fa-expand
fa-computer
fa-close
fa-multiply
fa-remove
fa-times
fa-xmark
fa-arrows-up-down-left-right
fa-arrows
fa-chalkboard-teacher
fa-chalkboard-user
fa-peso-sign
fa-building-shield
fa-baby
fa-users-line
fa-quote-left-alt
fa-quote-left
fa-tractor
fa-trash-arrow-up
fa-trash-restore
fa-arrow-down-up-lock
fa-lines-leaning
fa-ruler-combined
fa-copyright
fa-equals
fa-blender
fa-teeth
fa-ils
fa-shekel-sign
fa-shekel
fa-sheqel-sign
fa-sheqel
fa-map
fa-rocket
fa-photo-film
fa-photo-video
fa-folder-minus
fa-store
fa-arrow-trend-up
fa-plug-circle-minus
fa-sign-hanging
fa-sign
fa-bezier-curve
fa-bell-slash
fa-tablet-android
fa-tablet
fa-school-flag
fa-fill
fa-angle-up
fa-drumstick-bite
fa-holly-berry
fa-chevron-left
fa-bacteria
fa-hand-lizard
fa-disease
fa-briefcase-medical
fa-genderless
fa-chevron-right
fa-retweet
fa-car-alt
fa-car-rear
fa-pump-soap
fa-video-slash
fa-battery-2
fa-battery-quarter
fa-radio
fa-baby-carriage
fa-carriage-baby
fa-traffic-light
fa-thermometer
fa-vr-cardboard
fa-hand-middle-finger
fa-percent
fa-percentage
fa-truck-moving
fa-glass-water-droplet
fa-display
fa-face-smile
fa-smile
fa-thumb-tack
fa-thumbtack
fa-trophy
fa-person-praying
fa-pray
fa-hammer
fa-hand-peace
fa-rotate
fa-sync-alt
fa-spinner
fa-robot
fa-peace
fa-cogs
fa-gears
fa-warehouse
fa-arrow-up-right-dots
fa-splotch
fa-face-grin-hearts
fa-grin-hearts
fa-dice-four
fa-sim-card
fa-transgender-alt
fa-transgender
fa-mercury
fa-arrow-turn-down
fa-level-down
fa-person-falling-burst
fa-award
fa-ticket-alt
fa-ticket-simple
fa-building
fa-angle-double-left
fa-angles-left
fa-qrcode
fa-clock-rotate-left
fa-history
fa-face-grin-beam-sweat
fa-grin-beam-sweat
fa-arrow-right-from-file
fa-file-export
fa-shield-blank
fa-shield
fa-arrow-up-short-wide
fa-sort-amount-up-alt
fa-house-medical
fa-golf-ball-tee
fa-golf-ball
fa-chevron-circle-left
fa-circle-chevron-left
fa-house-chimney-window
fa-pen-nib
fa-tent-arrow-turn-left
fa-tents
fa-magic
fa-wand-magic
fa-dog
fa-carrot
fa-moon
fa-wine-glass-alt
fa-wine-glass-empty
fa-cheese
fa-yin-yang
fa-music
fa-code-commit
fa-temperature-low
fa-biking
fa-person-biking
fa-broom
fa-shield-heart
fa-gopuram
fa-earth-oceania
fa-globe-oceania
fa-square-xmark
fa-times-square
fa-xmark-square
fa-hashtag
fa-expand-alt
fa-up-right-and-down-left-from-center
fa-oil-can
fa-t
fa-hippo
fa-chart-column
fa-infinity
fa-vial-circle-check
fa-person-arrow-down-to-line
fa-voicemail
fa-fan
fa-person-walking-luggage
fa-arrows-alt-v
fa-up-down
fa-cloud-moon-rain
fa-calendar
fa-trailer
fa-bahai
fa-haykal
fa-sd-card
fa-dragon
fa-shoe-prints
fa-circle-plus
fa-plus-circle
fa-face-grin-tongue-wink
fa-grin-tongue-wink
fa-hand-holding
fa-plug-circle-exclamation
fa-chain-broken
fa-chain-slash
fa-link-slash
fa-unlink
fa-clone
fa-person-walking-arrow-loop-left
fa-arrow-up-z-a
fa-sort-alpha-up-alt
fa-fire-alt
fa-fire-flame-curved
fa-tornado
fa-file-circle-plus
fa-book-quran
fa-quran
fa-anchor
fa-border-all
fa-angry
fa-face-angry
fa-cookie-bite
fa-arrow-trend-down
fa-feed
fa-rss
fa-draw-polygon
fa-balance-scale
fa-scale-balanced
fa-gauge-simple-high
fa-tachometer-fast
fa-tachometer
fa-shower
fa-desktop-alt
fa-desktop
fa-m
fa-table-list
fa-th-list
fa-comment-sms
fa-sms
fa-book
fa-user-plus
fa-check
fa-battery-4
fa-battery-three-quarters
fa-house-circle-check
fa-angle-left
fa-diagram-successor
fa-truck-arrow-right
fa-arrows-split-up-and-left
fa-fist-raised
fa-hand-fist
fa-cloud-moon
fa-briefcase
fa-person-falling
fa-image-portrait
fa-portrait
fa-user-tag
fa-rug
fa-earth-europe
fa-globe-europe
fa-cart-flatbed-suitcase
fa-luggage-cart
fa-rectangle-times
fa-rectangle-xmark
fa-times-rectangle
fa-window-close
fa-baht-sign
fa-book-open
fa-book-journal-whills
fa-journal-whills
fa-handcuffs
fa-exclamation-triangle
fa-triangle-exclamation
fa-warning
fa-database
fa-arrow-turn-right
fa-mail-forward
fa-share
fa-bottle-droplet
fa-mask-face
fa-hill-rockslide
fa-exchange-alt
fa-right-left
fa-paper-plane
fa-road-circle-exclamation
fa-dungeon
fa-align-right
fa-money-bill-1-wave
fa-money-bill-wave-alt
fa-life-ring
fa-hands
fa-sign-language
fa-signing
fa-calendar-day
fa-ladder-water
fa-swimming-pool
fa-water-ladder
fa-arrows-up-down
fa-arrows-v
fa-face-grimace
fa-grimace
fa-wheelchair-alt
fa-wheelchair-move
fa-level-down-alt
fa-turn-down
fa-person-walking-arrow-right
fa-envelope-square
fa-square-envelope
fa-dice
fa-bowling-ball
fa-brain
fa-band-aid
fa-bandage
fa-calendar-minus
fa-circle-xmark
fa-times-circle
fa-xmark-circle
fa-gifts
fa-hotel
fa-earth-asia
fa-globe-asia
fa-id-card-alt
fa-id-card-clip
fa-magnifying-glass-plus
fa-search-plus
fa-thumbs-up
fa-user-clock
fa-allergies
fa-hand-dots
fa-file-invoice
fa-window-minimize
fa-coffee
fa-mug-saucer
fa-brush
fa-mask
fa-magnifying-glass-minus
fa-search-minus
fa-ruler-vertical
fa-user-alt
fa-user-large
fa-train-tram
fa-user-nurse
fa-syringe
fa-cloud-sun
fa-stopwatch-20
fa-square-full
fa-magnet
fa-jar
fa-note-sticky
fa-sticky-note
fa-bug-slash
fa-arrow-up-from-water-pump
fa-bone
fa-user-injured
fa-face-sad-tear
fa-sad-tear
fa-plane
fa-tent-arrows-down
fa-exclamation
fa-arrows-spin
fa-print
fa-try
fa-turkish-lira-sign
fa-turkish-lira
fa-dollar-sign
fa-dollar
fa-usd
fa-x
fa-magnifying-glass-dollar
fa-search-dollar
fa-users-cog
fa-users-gear
fa-person-military-pointing
fa-bank
fa-building-columns
fa-institution
fa-museum
fa-university
fa-umbrella
fa-trowel
fa-d
fa-stapler
fa-masks-theater
fa-theater-masks
fa-kip-sign
fa-hand-point-left
fa-handshake-alt
fa-handshake-simple
fa-fighter-jet
fa-jet-fighter
fa-share-alt-square
fa-square-share-nodes
fa-barcode
fa-plus-minus
fa-video-camera
fa-video
fa-graduation-cap
fa-mortar-board
fa-hand-holding-medical
fa-person-circle-check
fa-level-up-alt
fa-turn-up
fa-monero
fa-hooli
fa-yelp
fa-cc-visa
fa-lastfm
fa-shopware
fa-creative-commons-nc
fa-aws
fa-redhat
fa-yoast
fa-cloudflare
fa-ups
fa-wpexplorer
fa-dyalog
fa-bity
fa-stackpath
fa-buysellads
fa-first-order
fa-modx
fa-guilded
fa-vnv
fa-js-square
fa-square-js
fa-microsoft
fa-qq
fa-orcid
fa-java
fa-invision
fa-creative-commons-pd-alt
fa-centercode
fa-glide-g
fa-drupal
fa-hire-a-helper
fa-creative-commons-by
fa-unity
fa-whmcs
fa-rocketchat
fa-vk
fa-untappd
fa-mailchimp
fa-css3-alt
fa-reddit-square
fa-square-reddit
fa-vimeo-v
fa-contao
fa-square-font-awesome
fa-deskpro
fa-sistrix
fa-instagram-square
fa-square-instagram
fa-battle-net
fa-the-red-yeti
fa-hacker-news-square
fa-square-hacker-news
fa-edge
fa-napster
fa-snapchat-square
fa-square-snapchat
fa-google-plus-g
fa-artstation
fa-markdown
fa-sourcetree
fa-google-plus
fa-diaspora
fa-foursquare
fa-stack-overflow
fa-github-alt
fa-phoenix-squadron
fa-pagelines
fa-algolia
fa-red-river
fa-creative-commons-sa
fa-safari
fa-google
fa-font-awesome-alt
fa-square-font-awesome-stroke
fa-atlassian
fa-linkedin-in
fa-digital-ocean
fa-nimblr
fa-chromecast
fa-evernote
fa-hacker-news
fa-creative-commons-sampling
fa-adversal
fa-creative-commons
fa-watchman-monitoring
fa-fonticons
fa-weixin
fa-shirtsinbulk
fa-codepen
fa-git-alt
fa-lyft
fa-rev
fa-windows
fa-wizards-of-the-coast
fa-square-viadeo
fa-viadeo-square
fa-meetup
fa-centos
fa-adn
fa-cloudsmith
fa-pied-piper-alt
fa-dribbble-square
fa-square-dribbble
fa-codiepie
fa-node
fa-mix
fa-steam
fa-cc-apple-pay
fa-scribd
fa-openid
fa-instalod
fa-expeditedssl
fa-sellcast
fa-square-twitter
fa-twitter-square
fa-r-project
fa-delicious
fa-freebsd
fa-vuejs
fa-accusoft
fa-ioxhost
fa-fonticons-fi
fa-app-store
fa-cc-mastercard
fa-itunes-note
fa-golang
fa-kickstarter
fa-grav
fa-weibo
fa-uncharted
fa-firstdraft
fa-square-youtube
fa-youtube-square
fa-wikipedia-w
fa-rendact
fa-wpressr
fa-angellist
fa-galactic-republic
fa-nfc-directional
fa-skype
fa-joget
fa-fedora
fa-stripe-s
fa-meta
fa-laravel
fa-hotjar
fa-bluetooth-b
fa-sticker-mule
fa-creative-commons-zero
fa-hips
fa-behance
fa-reddit
fa-discord
fa-chrome
fa-app-store-ios
fa-cc-discover
fa-wpbeginner
fa-confluence
fa-mdb
fa-dochub
fa-accessible-icon
fa-ebay
fa-amazon
fa-unsplash
fa-yarn
fa-square-steam
fa-steam-square
fa-500px
fa-square-vimeo
fa-vimeo-square
fa-asymmetrik
fa-font-awesome-flag
fa-font-awesome-logo-full
fa-font-awesome
fa-gratipay
fa-apple
fa-hive
fa-gitkraken
fa-keybase
fa-apple-pay
fa-padlet
fa-amazon-pay
fa-github-square
fa-square-github
fa-stumbleupon
fa-fedex
fa-phoenix-framework
fa-shopify
fa-neos
fa-hackerrank
fa-researchgate
fa-swift
fa-angular
fa-speakap
fa-angrycreative
fa-y-combinator
fa-empire
fa-envira
fa-gitlab-square
fa-square-gitlab
fa-studiovinari
fa-pied-piper
fa-wordpress
fa-product-hunt
fa-firefox
fa-linode
fa-goodreads
fa-odnoklassniki-square
fa-square-odnoklassniki
fa-jsfiddle
fa-sith
fa-themeisle
fa-page4
fa-hashnode
fa-react
fa-cc-paypal
fa-squarespace
fa-cc-stripe
fa-creative-commons-share
fa-bitcoin
fa-keycdn
fa-opera
fa-itch-io
fa-umbraco
fa-galactic-senate
fa-ubuntu
fa-draft2digital
fa-stripe
fa-houzz
fa-gg
fa-dhl
fa-pinterest-square
fa-square-pinterest
fa-xing
fa-blackberry
fa-creative-commons-pd
fa-playstation
fa-quinscape
fa-less
fa-blogger-b
fa-opencart
fa-vine
fa-paypal
fa-gitlab
fa-typo3
fa-reddit-alien
fa-yahoo
fa-dailymotion
fa-affiliatetheme
fa-pied-piper-pp
fa-bootstrap
fa-odnoklassniki
fa-nfc-symbol
fa-ethereum
fa-speaker-deck
fa-creative-commons-nc-eu
fa-patreon
fa-avianex
fa-ello
fa-gofore
fa-bimobject
fa-facebook-f
fa-google-plus-square
fa-square-google-plus
fa-mandalorian
fa-first-order-alt
fa-osi
fa-google-wallet
fa-d-and-d-beyond
fa-periscope
fa-fulcrum
fa-cloudscale
fa-forumbee
fa-mizuni
fa-schlix
fa-square-xing
fa-xing-square
fa-bandcamp
fa-wpforms
fa-cloudversify
fa-usps
fa-megaport
fa-magento
fa-spotify
fa-optin-monster
fa-fly
fa-aviato
fa-itunes
fa-cuttlefish
fa-blogger
fa-flickr
fa-viber
fa-soundcloud
fa-digg
fa-tencent-weibo
fa-symfony
fa-maxcdn
fa-etsy
fa-facebook-messenger
fa-audible
fa-think-peaks
fa-bilibili
fa-erlang
fa-cotton-bureau
fa-dashcube
fa-42-group
fa-innosoft
fa-stack-exchange
fa-elementor
fa-pied-piper-square
fa-square-pied-piper
fa-creative-commons-nd
fa-palfed
fa-superpowers
fa-resolving
fa-xbox
fa-searchengin
fa-tiktok
fa-facebook-square
fa-square-facebook
fa-renren
fa-linux
fa-glide
fa-linkedin
fa-hubspot
fa-deploydog
fa-twitch
fa-ravelry
fa-mixer
fa-lastfm-square
fa-square-lastfm
fa-vimeo
fa-mendeley
fa-uniregistry
fa-figma
fa-creative-commons-remix
fa-cc-amazon-pay
fa-dropbox
fa-instagram
fa-cmplid
fa-facebook
fa-gripfire
fa-jedi-order
fa-uikit
fa-fort-awesome-alt
fa-phabricator
fa-ussunnah
fa-earlybirds
fa-trade-federation
fa-autoprefixer
fa-whatsapp
fa-slideshare
fa-google-play
fa-viadeo
fa-line
fa-google-drive
fa-servicestack
fa-simplybuilt
fa-bitbucket
fa-imdb
fa-deezer
fa-raspberry-pi
fa-jira
fa-docker
fa-screenpal
fa-bluetooth
fa-gitter
fa-d-and-d
fa-microblog
fa-cc-diners-club
fa-gg-circle
fa-pied-piper-hat
fa-kickstarter-k
fa-yandex
fa-readme
fa-html5
fa-sellsy
fa-sass
fa-wirsindhandwerk
fa-wsh
fa-buromobelexperte
fa-salesforce
fa-octopus-deploy
fa-medapps
fa-ns8
fa-pinterest-p
fa-apper
fa-fort-awesome
fa-waze
fa-cc-jcb
fa-snapchat-ghost
fa-snapchat
fa-fantasy-flight-games
fa-rust
fa-wix
fa-behance-square
fa-square-behance
fa-supple
fa-rebel
fa-css3
fa-staylinked
fa-kaggle
fa-space-awesome
fa-deviantart
fa-cpanel
fa-goodreads-g
fa-git-square
fa-square-git
fa-square-tumblr
fa-tumblr-square
fa-trello
fa-creative-commons-nc-jp
fa-get-pocket
fa-perbyte
fa-grunt
fa-weebly
fa-connectdevelop
fa-leanpub
fa-black-tie
fa-themeco
fa-python
fa-android
fa-bots
fa-free-code-camp
fa-hornbill
fa-js
fa-ideal
fa-git
fa-dev
fa-sketch
fa-yandex-international
fa-cc-amex
fa-uber
fa-github
fa-php
fa-alipay
fa-youtube
fa-skyatlas
fa-firefox-browser
fa-replyd
fa-suse
fa-jenkins
fa-twitter
fa-rockrms
fa-pinterest
fa-buffer
fa-npm
fa-yammer
fa-btc
fa-dribbble
fa-stumbleupon-circle
fa-internet-explorer
fa-telegram-plane
fa-telegram
fa-old-republic
fa-square-whatsapp
fa-whatsapp-square
fa-node-js
fa-edge-legacy
fa-slack-hash
fa-slack
fa-medrt
fa-usb
fa-tumblr
fa-vaadin
fa-quora
fa-reacteurope
fa-medium-m
fa-medium
fa-amilia
fa-mixcloud
fa-flipboard
fa-viacoin
fa-critical-role
fa-sitrox
fa-discourse
fa-joomla
fa-mastodon
fa-airbnb
fa-wolf-pack-battalion
fa-buy-n-large
fa-gulp
fa-creative-commons-sampling-plus
fa-strava
fa-ember
fa-canadian-maple-leaf
fa-teamspeak
fa-pushed
fa-wordpress-simple
fa-nutritionix
fa-wodu
fa-google-pay
fa-intercom
fa-zhihu
fa-korvue
fa-pix
fa-steam-symbol`.split('\n');

const MATERIAL_ICONS = [
	'123',
	'3d Rotation',
	'Abc',
	'Accessibility',
	'Accessibility New',
	'Accessible',
	'Accessible Forward',
	'Account Balance',
	'Account Balance Wallet',
	'Account Box',
	'Account Circle',
	'Add Card',
	'Add Home',
	'Add Shopping Cart',
	'Add Task',
	'Add To Drive',
	'Addchart',
	'Admin Panel Settings',
	'Ads Click',
	'Alarm',
	'Alarm Add',
	'Alarm Off',
	'Alarm On',
	'All Inbox',
	'All Out',
	'Analytics',
	'Anchor',
	'Android',
	'Announcement',
	'Api',
	'App Blocking',
	'App Shortcut',
	'Arrow Circle Down',
	'Arrow Circle Left',
	'Arrow Circle Right',
	'Arrow Circle Up',
	'Arrow Outward',
	'Arrow Right Alt',
	'Article',
	'Aspect Ratio',
	'Assessment',
	'Assignment',
	'Assignment Ind',
	'Assignment Late',
	'Assignment Return',
	'Assignment Returned',
	'Assignment Turned In',
	'Assured Workload',
	'Autorenew',
	'Backup',
	'Backup Table',
	'Balance',
	'Batch Prediction',
	'Book',
	'Book Online',
	'Bookmark',
	'Bookmark Add',
	'Bookmark Added',
	'Bookmark Border',
	'Bookmark Remove',
	'Bookmarks',
	'Browse Gallery',
	'Bug Report',
	'Build',
	'Build Circle',
	'Cached',
	'Calendar Month',
	'Calendar Today',
	'Calendar View Day',
	'Calendar View Month',
	'Calendar View Week',
	'Camera Enhance',
	'Cancel Schedule Send',
	'Card Giftcard',
	'Card Membership',
	'Card Travel',
	'Change History',
	'Check Circle',
	'Check Circle Outline',
	'Chrome Reader Mode',
	'Circle Notifications',
	'Class',
	'Close Fullscreen',
	'Code',
	'Code Off',
	'Comment Bank',
	'Commit',
	'Commute',
	'Compare Arrows',
	'Compress',
	'Contact Page',
	'Contact Support',
	'Contactless',
	'Copyright',
	'Credit Card',
	'Credit Card Off',
	'Css',
	'Currency Exchange',
	'Dangerous',
	'Dashboard',
	'Dashboard Customize',
	'Data Exploration',
	'Data Thresholding',
	'Date Range',
	'Delete',
	'Delete Forever',
	'Delete Outline',
	'Density Large',
	'Density Medium',
	'Density Small',
	'Description',
	'Disabled By Default',
	'Disabled Visible',
	'Display Settings',
	'Dns',
	'Done',
	'Done All',
	'Done Outline',
	'Donut Large',
	'Donut Small',
	'Drag Indicator',
	'Dynamic Form',
	'Edit Calendar',
	'Edit Off',
	'Eject',
	'Euro Symbol',
	'Event',
	'Event Repeat',
	'Event Seat',
	'Exit To App',
	'Expand',
	'Explore',
	'Explore Off',
	'Extension',
	'Extension Off',
	'Face',
	'Face Unlock',
	'Fact Check',
	'Favorite',
	'Favorite Border',
	'Fax',
	'Feedback',
	'File Present',
	'Filter Alt',
	'Filter Alt Off',
	'Find In Page',
	'Find Replace',
	'Fingerprint',
	'Fit Screen',
	'Flaky',
	'Flight Land',
	'Flight Takeoff',
	'Flip To Back',
	'Flip To Front',
	'Flutter Dash',
	'Free Cancellation',
	'G Translate',
	'Gavel',
	'Generating Tokens',
	'Get App',
	'Gif',
	'Gif Box',
	'Grade',
	'Grading',
	'Group Work',
	'Help',
	'Help Center',
	'Help Outline',
	'Hide Source',
	'Highlight Alt',
	'Highlight Off',
	'History',
	'History Toggle Off',
	'Hls',
	'Hls Off',
	'Home',
	'Horizontal Split',
	'Hotel Class',
	'Hourglass Disabled',
	'Hourglass Empty',
	'Hourglass Full',
	'Html',
	'Http',
	'Https',
	'Important Devices',
	'Info',
	'Input',
	'Install Desktop',
	'Install Mobile',
	'Integration Instructions',
	'Invert Colors',
	'Javascript',
	'Join Full',
	'Join Inner',
	'Join Left',
	'Join Right',
	'Label',
	'Label Important',
	'Label Off',
	'Language',
	'Launch',
	'Leaderboard',
	'Lightbulb',
	'Lightbulb Circle',
	'Line Style',
	'Line Weight',
	'List',
	'Lock',
	'Lock Clock',
	'Lock Open',
	'Lock Person',
	'Lock Reset',
	'Login',
	'Logout',
	'Loyalty',
	'Manage Accounts',
	'Manage History',
	'Mark As Unread',
	'Markunread Mailbox',
	'Maximize',
	'Mediation',
	'Minimize',
	'Model Training',
	'Network Ping',
	'New Label',
	'Next Plan',
	'Nightlight Round',
	'No Accounts',
	'Noise Aware',
	'Noise Control Off',
	'Not Accessible',
	'Not Started',
	'Note Add',
	'Offline Bolt',
	'Offline Pin',
	'On Device Training',
	'Online Prediction',
	'Opacity',
	'Open In Browser',
	'Open In Full',
	'Open In New',
	'Open In New Off',
	'Open With',
	'Outbound',
	'Outbox',
	'Outlet',
	'Output',
	'Pageview',
	'Paid',
	'Pan Tool',
	'Pan Tool Alt',
	'Payment',
	'Pending',
	'Pending Actions',
	'Percent',
	'Perm Camera Mic',
	'Perm Contact Calendar',
	'Perm Data Setting',
	'Perm Device Information',
	'Perm Identity',
	'Perm Media',
	'Perm Phone Msg',
	'Perm Scan Wifi',
	'Pets',
	'Php',
	'Picture In Picture',
	'Picture In Picture Alt',
	'Pin End',
	'Pin Invoke',
	'Pinch',
	'Plagiarism',
	'Play For Work',
	'Polymer',
	'Power Settings New',
	'Pregnant Woman',
	'Preview',
	'Print',
	'Privacy Tip',
	'Private Connectivity',
	'Production Quantity Limits',
	'Published With Changes',
	'Query Builder',
	'Question Answer',
	'Question Mark',
	'Quickreply',
	'Receipt',
	'Record Voice Over',
	'Redeem',
	'Remove Done',
	'Remove Shopping Cart',
	'Reorder',
	'Repartition',
	'Report Problem',
	'Request Page',
	'Restore',
	'Restore From Trash',
	'Restore Page',
	'Rocket',
	'Rocket Launch',
	'Room',
	'Rounded Corner',
	'Rowing',
	'Rule',
	'Satellite Alt',
	'Saved Search',
	'Savings',
	'Schedule',
	'Schedule Send',
	'Search',
	'Search Off',
	'Segment',
	'Send And Archive',
	'Sensors',
	'Sensors Off',
	'Settings',
	'Settings Accessibility',
	'Settings Applications',
	'Settings Backup Restore',
	'Settings Bluetooth',
	'Settings Brightness',
	'Settings Cell',
	'Settings Ethernet',
	'Settings Input Antenna',
	'Settings Input Component',
	'Settings Input Composite',
	'Settings Input Hdmi',
	'Settings Input Svideo',
	'Settings Overscan',
	'Settings Phone',
	'Settings Power',
	'Settings Remote',
	'Settings Voice',
	'Shop',
	'Shop 2',
	'Shop Two',
	'Shopping Bag',
	'Shopping Basket',
	'Shopping Cart',
	'Shopping Cart Checkout',
	'Smart Button',
	'Source',
	'Space Dashboard',
	'Spatial Audio',
	'Spatial Audio Off',
	'Spatial Tracking',
	'Speaker Notes',
	'Speaker Notes Off',
	'Spellcheck',
	'Star Rate',
	'Stars',
	'Sticky Note 2',
	'Store',
	'Subject',
	'Subtitles Off',
	'Supervised User Circle',
	'Supervisor Account',
	'Support',
	'Swap Horiz',
	'Swap Horizontal Circle',
	'Swap Vert',
	'Swap Vertical Circle',
	'Swipe',
	'Swipe Down',
	'Swipe Down Alt',
	'Swipe Left',
	'Swipe Left Alt',
	'Swipe Right',
	'Swipe Right Alt',
	'Swipe Up',
	'Swipe Up Alt',
	'Swipe Vertical',
	'Switch Access Shortcut',
	'Switch Access Shortcut Add',
	'Sync Alt',
	'System Update Alt',
	'Tab',
	'Tab Unselected',
	'Table View',
	'Task Alt',
	'Terminal',
	'Text Rotate Up',
	'Text Rotate Vertical',
	'Text Rotation Angledown',
	'Text Rotation Angleup',
	'Text Rotation Down',
	'Text Rotation None',
	'Theaters',
	'Thumb Down',
	'Thumb Down Off Alt',
	'Thumb Up',
	'Thumb Up Off Alt',
	'Thumbs Up Down',
	'Timeline',
	'Tips And Updates',
	'Toc',
	'Today',
	'Token',
	'Toll',
	'Touch App',
	'Tour',
	'Track Changes',
	'Transcribe',
	'Translate',
	'Trending Down',
	'Trending Flat',
	'Trending Up',
	'Troubleshoot',
	'Try',
	'Turned In',
	'Turned In Not',
	'Unfold Less Double',
	'Unfold More Double',
	'Unpublished',
	'Update',
	'Update Disabled',
	'Upgrade',
	'Verified',
	'Verified User',
	'Vertical Split',
	'View Agenda',
	'View Array',
	'View Carousel',
	'View Column',
	'View Comfy Alt',
	'View Compact Alt',
	'View Cozy',
	'View Day',
	'View Headline',
	'View In Ar',
	'View Kanban',
	'View List',
	'View Module',
	'View Quilt',
	'View Sidebar',
	'View Stream',
	'View Timeline',
	'View Week',
	'Visibility',
	'Visibility Off',
	'Voice Over Off',
	'Watch Later',
	'Webhook',
	'Width Full',
	'Width Normal',
	'Width Wide',
	'Wifi Protected Setup',
	'Work',
	'Work History',
	'Work Off',
	'Work Outline',
	'Wysiwyg',
	'Youtube Searched For',
	'Zoom In',
	'Zoom Out',
	'Add Alert',
	'Add Alert',
	'Auto Delete',
	'Error',
	'Error Outline',
	'Notification Important',
	'Warning',
	'Warning Amber',
	'10k',
	'10k',
	'1k',
	'1k Plus',
	'2k',
	'2k Plus',
	'3k',
	'3k Plus',
	'4k',
	'4k Plus',
	'5g',
	'5k',
	'5k Plus',
	'6k',
	'6k Plus',
	'7k',
	'7k Plus',
	'8k',
	'8k Plus',
	'9k',
	'9k Plus',
	'Add To Queue',
	'Airplay',
	'Album',
	'Art Track',
	'Audio File',
	'Av Timer',
	'Branding Watermark',
	'Call To Action',
	'Closed Caption',
	'Closed Caption Disabled',
	'Closed Caption Off',
	'Control Camera',
	'Equalizer',
	'Explicit',
	'Fast Forward',
	'Fast Rewind',
	'Featured Play List',
	'Featured Video',
	'Fiber Dvr',
	'Fiber Manual Record',
	'Fiber New',
	'Fiber Pin',
	'Fiber Smart Record',
	'Forward 10',
	'Forward 30',
	'Forward 5',
	'Games',
	'Hd',
	'Hearing',
	'Hearing Disabled',
	'High Quality',
	'Interpreter Mode',
	'Library Add',
	'Library Add Check',
	'Library Books',
	'Library Music',
	'Loop',
	'Lyrics',
	'Mic',
	'Mic None',
	'Mic Off',
	'Missed Video Call',
	'Movie',
	'Music Video',
	'New Releases',
	'Not Interested',
	'Note',
	'Pause',
	'Pause Circle',
	'Pause Circle Filled',
	'Pause Circle Outline',
	'Play Arrow',
	'Play Circle',
	'Play Circle Filled',
	'Play Circle Outline',
	'Play Disabled',
	'Playlist Add',
	'Playlist Add Check',
	'Playlist Add Check Circle',
	'Playlist Add Circle',
	'Playlist Play',
	'Playlist Remove',
	'Queue',
	'Queue Music',
	'Queue Play Next',
	'Radio',
	'Recent Actors',
	'Remove From Queue',
	'Repeat',
	'Repeat On',
	'Repeat One',
	'Repeat One On',
	'Replay',
	'Replay 10',
	'Replay 30',
	'Replay 5',
	'Replay Circle Filled',
	'Sd',
	'Shuffle',
	'Shuffle On',
	'Skip Next',
	'Skip Previous',
	'Slow Motion Video',
	'Snooze',
	'Sort By Alpha',
	'Speed',
	'Stop',
	'Stop Circle',
	'Subscriptions',
	'Subtitles',
	'Surround Sound',
	'Video Call',
	'Video File',
	'Video Label',
	'Video Library',
	'Video Settings',
	'Videocam',
	'Videocam Off',
	'Volume Down',
	'Volume Mute',
	'Volume Off',
	'Volume Up',
	'Web',
	'Web Asset',
	'Web Asset Off',
	'3p',
	'3p',
	'Add Ic Call',
	'Alternate Email',
	'App Registration',
	'Business',
	'Call',
	'Call End',
	'Call Made',
	'Call Merge',
	'Call Missed',
	'Call Missed Outgoing',
	'Call Received',
	'Call Split',
	'Cancel Presentation',
	'Cell Tower',
	'Cell Wifi',
	'Chat',
	'Chat Bubble',
	'Chat Bubble Outline',
	'Clear All',
	'Co Present',
	'Comment',
	'Comments Disabled',
	'Contact Emergency',
	'Contact Mail',
	'Contact Phone',
	'Contacts',
	'Desktop Access Disabled',
	'Dialer Sip',
	'Dialpad',
	'Document Scanner',
	'Domain Disabled',
	'Domain Verification',
	'Duo',
	'Email',
	'Forum',
	'Forward To Inbox',
	'Hourglass Bottom',
	'Hourglass Top',
	'Hub',
	'Import Contacts',
	'Import Export',
	'Invert Colors Off',
	'Key',
	'Key Off',
	'List Alt',
	'Live Help',
	'Location Off',
	'Location On',
	'Mail Lock',
	'Mail Outline',
	'Mark Chat Read',
	'Mark Chat Unread',
	'Mark Email Read',
	'Mark Email Unread',
	'Mark Unread Chat Alt',
	'Message',
	'Mobile Screen Share',
	'More Time',
	'Nat',
	'No Sim',
	'Pause Presentation',
	'Person Add Disabled',
	'Person Search',
	'Phone',
	'Phone Disabled',
	'Phone Enabled',
	'Phonelink Erase',
	'Phonelink Lock',
	'Phonelink Ring',
	'Phonelink Setup',
	'Portable Wifi Off',
	'Present To All',
	'Print Disabled',
	'Qr Code',
	'Qr Code 2',
	'Qr Code Scanner',
	'Read More',
	'Ring Volume',
	'Rss Feed',
	'Rtt',
	'Screen Share',
	'Send Time Extension',
	'Sentiment Satisfied Alt',
	'Sip',
	'Speaker Phone',
	'Spoke',
	'Stay Current Landscape',
	'Stay Current Portrait',
	'Stay Primary Landscape',
	'Stay Primary Portrait',
	'Stop Screen Share',
	'Swap Calls',
	'Textsms',
	'Unsubscribe',
	'Voicemail',
	'Vpn Key',
	'Vpn Key Off',
	'Wifi Calling',
	'Add',
	'Add',
	'Add Box',
	'Add Circle',
	'Add Circle Outline',
	'Add Link',
	'Archive',
	'Attribution',
	'Backspace',
	'Ballot',
	'Biotech',
	'Block',
	'Bolt',
	'Calculate',
	'Change Circle',
	'Clear',
	'Content Copy',
	'Content Cut',
	'Content Paste',
	'Content Paste Go',
	'Content Paste Off',
	'Content Paste Search',
	'Copy All',
	'Create',
	'Delete Sweep',
	'Deselect',
	'Drafts',
	'Dynamic Feed',
	'File Copy',
	'Filter List',
	'Filter List Off',
	'Flag',
	'Flag Circle',
	'Font Download',
	'Font Download Off',
	'Forward',
	'Gesture',
	'How To Reg',
	'How To Vote',
	'Inbox',
	'Insights',
	'Inventory',
	'Inventory 2',
	'Link',
	'Link Off',
	'Low Priority',
	'Mail',
	'Markunread',
	'Move To Inbox',
	'Next Week',
	'Outlined Flag',
	'Policy',
	'Push Pin',
	'Redo',
	'Remove',
	'Remove Circle',
	'Remove Circle Outline',
	'Reply',
	'Reply All',
	'Report',
	'Report Gmailerrorred',
	'Report Off',
	'Save',
	'Save Alt',
	'Save As',
	'Select All',
	'Send',
	'Shield',
	'Sort',
	'Square Foot',
	'Stacked Bar Chart',
	'Stream',
	'Tag',
	'Text Format',
	'Unarchive',
	'Undo',
	'Upcoming',
	'Waves',
	'Web Stories',
	'Weekend',
	'Where To Vote',
	'1x Mobiledata',
	'1x Mobiledata',
	'30fps',
	'3g Mobiledata',
	'4g Mobiledata',
	'4g Plus Mobiledata',
	'60fps',
	'Access Alarm',
	'Access Alarms',
	'Access Time',
	'Access Time Filled',
	'Ad Units',
	'Add Alarm',
	'Add To Home Screen',
	'Air',
	'Airplane Ticket',
	'Airplanemode Active',
	'Airplanemode Inactive',
	'Aod',
	'Battery 0 Bar',
	'Battery 1 Bar',
	'Battery 2 Bar',
	'Battery 3 Bar',
	'Battery 4 Bar',
	'Battery 5 Bar',
	'Battery 6 Bar',
	'Battery Alert',
	'Battery Charging Full',
	'Battery Full',
	'Battery Saver',
	'Battery Std',
	'Battery Unknown',
	'Bloodtype',
	'Bluetooth',
	'Bluetooth Connected',
	'Bluetooth Disabled',
	'Bluetooth Drive',
	'Bluetooth Searching',
	'Brightness Auto',
	'Brightness High',
	'Brightness Low',
	'Brightness Medium',
	'Cable',
	'Cameraswitch',
	'Credit Score',
	'Dark Mode',
	'Data Saver Off',
	'Data Saver On',
	'Data Usage',
	'Dataset',
	'Dataset Linked',
	'Developer Mode',
	'Device Thermostat',
	'Devices',
	'Devices Fold',
	'Discount',
	'Do Not Disturb On Total Silence',
	'Dvr',
	'E Mobiledata',
	'Edgesensor High',
	'Edgesensor Low',
	'Flashlight Off',
	'Flashlight On',
	'Fluorescent',
	'Fmd Bad',
	'Fmd Good',
	'G Mobiledata',
	'Gpp Bad',
	'Gpp Good',
	'Gpp Maybe',
	'Gps Fixed',
	'Gps Not Fixed',
	'Gps Off',
	'Graphic Eq',
	'Grid 3x3',
	'Grid 4x4',
	'Grid Goldenratio',
	'H Mobiledata',
	'H Plus Mobiledata',
	'Hdr Auto',
	'Hdr Auto Select',
	'Hdr Off Select',
	'Hdr On Select',
	'Lan',
	'Lens Blur',
	'Light Mode',
	'Location Disabled',
	'Location Searching',
	'Lte Mobiledata',
	'Lte Plus Mobiledata',
	'Macro Off',
	'Media Bluetooth Off',
	'Media Bluetooth On',
	'Medication',
	'Medication Liquid',
	'Mobile Friendly',
	'Mobile Off',
	'Mobiledata Off',
	'Mode Night',
	'Mode Standby',
	'Monitor Heart',
	'Monitor Weight',
	'Nearby Error',
	'Nearby Off',
	'Network Cell',
	'Network Wifi',
	'Network Wifi 1 Bar',
	'Network Wifi 2 Bar',
	'Network Wifi 3 Bar',
	'Nfc',
	'Nightlight',
	'Note Alt',
	'Password',
	'Pattern',
	'Phishing',
	'Pin',
	'Play Lesson',
	'Price Change',
	'Price Check',
	'Punch Clock',
	'Quiz',
	'R Mobiledata',
	'Radar',
	'Remember Me',
	'Reset Tv',
	'Restart Alt',
	'Reviews',
	'Rsvp',
	'Screen Lock Landscape',
	'Screen Lock Portrait',
	'Screen Lock Rotation',
	'Screen Rotation',
	'Screen Search Desktop',
	'Screenshot',
	'Screenshot Monitor',
	'Sd Storage',
	'Security Update',
	'Security Update Good',
	'Security Update Warning',
	'Sell',
	'Send To Mobile',
	'Settings Suggest',
	'Settings System Daydream',
	'Share Location',
	'Shortcut',
	'Signal Cellular 0 Bar',
	'Signal Cellular 4 Bar',
	'Signal Cellular Alt',
	'Signal Cellular Alt 1 Bar',
	'Signal Cellular Alt 2 Bar',
	'Signal Cellular Connected No Internet 0 Bar',
	'Signal Cellular Connected No Internet 4 Bar',
	'Signal Cellular No Sim',
	'Signal Cellular Nodata',
	'Signal Cellular Null',
	'Signal Cellular Off',
	'Signal Wifi 0 Bar',
	'Signal Wifi 4 Bar',
	'Signal Wifi 4 Bar Lock',
	'Signal Wifi Bad',
	'Signal Wifi Connected No Internet 4',
	'Signal Wifi Off',
	'Signal Wifi Statusbar 4 Bar',
	'Signal Wifi Statusbar Connected No Internet 4',
	'Signal Wifi Statusbar Null',
	'Sim Card Download',
	'Splitscreen',
	'Sports Score',
	'Ssid Chart',
	'Storage',
	'Storm',
	'Summarize',
	'System Security Update',
	'System Security Update Good',
	'System Security Update Warning',
	'Task',
	'Thermostat',
	'Timer 10 Select',
	'Timer 3 Select',
	'Tungsten',
	'Usb',
	'Usb Off',
	'Wallpaper',
	'Water',
	'Widgets',
	'Wifi 1 Bar',
	'Wifi 2 Bar',
	'Wifi Calling 3',
	'Add Chart',
	'Approval',
	'Adf Scanner',
	'Auto Mode',
	'10mp',
	'360',
	'Add Home Work',
	'Account Tree',
	'Ac Unit',
	'Bathroom',
	'18 Up Rating',
	'Check Box',
];
