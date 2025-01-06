import { StylePropertyDefinition } from '../../types/common';

export const styleProperties: Array<StylePropertyDefinition> = [
	{ dn: 'Font', n: 'rangeSliderFont', dv: '<primaryFont>' },
	{ dn: 'Label Font', n: 'labelRangeSliderFont', dv: '<quaternaryFont>' },
	{
		dn: 'Tooltip Font',
		n: 'tooltipRangeSliderFont',
		dv: '<quaternaryFont>',
	},
	{
		dn: 'Fixed Tooltip Font',
		n: 'fixedTooltipRangeSliderFont',
		dv: '<senaryFont>',
	},

	{
		gn: 'Track',
		dn: 'Thin Track Height',
		n: 'thinTrackHeightRangeSlider',
		dv: '2px',
		cp: 'height',
		sel: '.comp.compRangeSlider._thinTrack ._track, .comp.compRangeSlider._thinTrack ._rangeTrack',
		np: true,
	},
	{
		gn: 'Track',
		dn: 'Thick Track Height',
		n: 'thickTrackHeightRangeSlider',
		dv: '10px',
		cp: 'height',
		sel: '.comp.compRangeSlider._thickTrack ._track, .comp.compRangeSlider._thickTrack ._rangeTrack',
		np: true,
	},
	{
		gn: 'Track',
		dn: 'Medium Track Height',
		n: 'mediumTrackHeightRangeSlider',
		dv: '4px',
		cp: 'height',
		sel: '.comp.compRangeSlider._mediumTrack ._track, .comp.compRangeSlider._mediumTrack ._rangeTrack',
		np: true,
	},

	{
		gn: 'Track',
		dn: 'Thin Track Border Radius',
		n: 'thinTrackBorderRadiusRangeSlider',
		cp: 'border-radius',
		sel: '.comp.compRangeSlider._thinTrack ._track, .comp.compRangeSlider._thinTrack ._rangeTrack',
		np: true,
	},
	{
		gn: 'Track',
		dn: 'Thick Track BorderRaidus',
		n: 'thickTrackBorderRaidusRangeSlider',
		dv: '5px',
		cp: 'border-radius',
		sel: '.comp.compRangeSlider._thickTrack ._track, .comp.compRangeSlider._thickTrack ._rangeTrack',
		np: true,
	},
	{
		gn: 'Track',
		dn: 'Medium Track Border Radius',
		n: 'mediumTrackBorderRadiusRangeSlider',
		dv: '2px',
		cp: 'border-radius',
		sel: '.comp.compRangeSlider._mediumTrack ._track, .comp.compRangeSlider._mediumTrack ._rangeTrack',
		np: true,
	},

	{
		gn: 'Track',
		dn: 'Small Thumb Track Margin Top',
		n: 'smallThumbTrackMarginTopRangeSlider',
		dv: '5px',
		cp: 'margin-top',
		sel: '.comp.compRangeSlider._smallThumb ._track',
		np: true,
	},
	{
		gn: 'Track',
		dn: 'Medium Thumb Track Margin Top',
		n: 'mediumThumbTrackMarginTopRangeSlider',
		dv: '10px',
		cp: 'margin-top',
		sel: '.comp.compRangeSlider._mediumThumb ._track',
		np: true,
	},
	{
		gn: 'Track',
		dn: 'Large Thumb Track Margin Top',
		n: 'largeThumbTrackMarginTopRangeSlider',
		dv: '15px',
		cp: 'margin-top',
		sel: '.comp.compRangeSlider._largeThumb ._track',
		np: true,
	},

	{
		gn: 'Track',
		dn: 'Small Thumb Track Margin Bottom',
		n: 'smallThumbTrackMarginBottomRangeSlider',
		dv: '5px',
		cp: 'margin-bottom',
		sel: '.comp.compRangeSlider._smallThumb ._track',
		np: true,
	},
	{
		gn: 'Track',
		dn: 'Medium Thumb Track Margin Bottom',
		n: 'mediumThumbTrackMarginBottomRangeSlider',
		dv: '10px',
		cp: 'margin-bottom',
		sel: '.comp.compRangeSlider._mediumThumb ._track',
		np: true,
	},
	{
		gn: 'Track',
		dn: 'Large Thumb Track Margin Bottom',
		n: 'largeThumbTrackMarginBottomRangeSlider',
		dv: '15px',
		cp: 'margin-bottom',
		sel: '.comp.compRangeSlider._largeThumb ._track',
		np: true,
	},

	{
		gn: 'Thumb',
		dn: 'Small Thumb Width',
		n: 'smallThumbWidthRangeSlider',
		dv: '14px',
		cp: 'width',
		sel: '.comp.compRangeSlider._smallThumb ._thumb',
		np: true,
	},
	{
		gn: 'Thumb',
		dn: 'Medium Thumb Width',
		n: 'mediumThumbWidthRangeSlider',
		dv: '24px',
		cp: 'width',
		sel: '.comp.compRangeSlider._mediumThumb ._thumb',
		np: true,
	},
	{
		gn: 'Thumb',
		dn: 'Large Thumb Width',
		n: 'largeThumbWidthRangeSlider',
		dv: '34px',
		cp: 'width',
		sel: '.comp.compRangeSlider._largeThumb ._thumb',
		np: true,
	},

	{
		gn: 'Thumb',
		dn: 'Small Thumb Height',
		n: 'smallThumbHeightRangeSlider',
		dv: '14px',
		cp: 'height',
		sel: '.comp.compRangeSlider._smallThumb ._thumb',
		np: true,
	},
	{
		gn: 'Thumb',
		dn: 'Medium Thumb Height',
		n: 'mediumThumbHeightRangeSlider',
		dv: '24px',
		cp: 'height',
		sel: '.comp.compRangeSlider._mediumThumb ._thumb',
		np: true,
	},
	{
		gn: 'Thumb',
		dn: 'Large Thumb Height',
		n: 'largeThumbHeightRangeSlider',
		dv: '34px',
		cp: 'height',
		sel: '.comp.compRangeSlider._largeThumb ._thumb',
		np: true,
	},

	{
		gn: 'Mark Thumb',
		dn: 'Small Mark Thumb Width',
		n: 'smallMarkThumbWidthRangeSlider',
		dv: '10px',
		cp: 'width',
		sel: '.comp.compRangeSlider._smallThumb ._mark._thumb',
		np: true,
	},
	{
		gn: 'Mark Thumb',
		dn: 'Medium Mark Thumb Width',
		n: 'mediumMarkThumbWidthRangeSlider',
		dv: '20px',
		cp: 'width',
		sel: '.comp.compRangeSlider._mediumThumb ._mark._thumb',
		np: true,
	},
	{
		gn: 'Mark Thumb',
		dn: 'Large Mark Thumb Width',
		n: 'largeMarkThumbWidthRangeSlider',
		dv: '30px',
		cp: 'width',
		sel: '.comp.compRangeSlider._largeThumb ._mark._thumb',
		np: true,
	},

	{
		gn: 'Mark Thumb',
		dn: 'Small Mark Thumb Height',
		n: 'smallMarkThumbHeightRangeSlider',
		dv: '10px',
		cp: 'height',
		sel: '.comp.compRangeSlider._smallThumb ._mark._thumb',
		np: true,
	},
	{
		gn: 'Mark Thumb',
		dn: 'Medium Mark Thumb Height',
		n: 'mediumMarkThumbHeightRangeSlider',
		dv: '20px',
		cp: 'height',
		sel: '.comp.compRangeSlider._mediumThumb ._mark._thumb',
		np: true,
	},
	{
		gn: 'Mark Thumb',
		dn: 'Large Mark Thumb Height',
		n: 'largeMarkThumbHeightRangeSlider',
		dv: '30px',
		cp: 'height',
		sel: '.comp.compRangeSlider._largeThumb ._mark._thumb',
		np: true,
	},

	{
		gn: 'Round Thumb',
		dn: 'All Size Round Thumb Border Radius',
		n: 'allSizeRoundThumbBorderRadiusRangeSlider',
		dv: '50%',
		cp: 'border-radius',
		sel: '.comp.compRangeSlider._roundThumb ._thumb',
		np: true,
	},

	{
		gn: 'Rounded Square Thumb',
		dn: 'Small Rounded Square Thumb Border Radius',
		n: 'smallRoundedSquareThumbBorderRadiusRangeSlider',
		dv: '2px',
		cp: 'border-radius',
		sel: '.comp.compRangeSlider._roundedThumbSquare._smallThumb ._thumb',
		np: true,
	},
	{
		gn: 'Rounded Square Thumb',
		dn: 'Medium Rounded Square Thumb Border Radius',
		n: 'mediumRoundedSquareThumbBorderRadiusRangeSlider',
		dv: '4px',
		cp: 'border-radius',
		sel: '.comp.compRangeSlider._roundedThumbSquare._mediumThumb ._thumb',
		np: true,
	},
	{
		gn: 'Rounded Square Thumb',
		dn: 'Large Rounded Square Thumb Border Radius',
		n: 'largeRoundedSquareThumbBorderRadiusRangeSlider',
		dv: '6px',
		cp: 'border-radius',
		sel: '.comp.compRangeSlider._roundedThumbSquare._largeThumb ._thumb',
		np: true,
	},

	{
		gn: 'Pill Thumb',
		dn: 'Small Pill Thumb Border Radius',
		n: 'smallPillThumbBorderRadiusRangeSlider',
		dv: '7px',
		cp: 'border-radius',
		sel: '.comp.compRangeSlider._pillThumb._smallThumb ._thumb',
		np: true,
	},
	{
		gn: 'Pill Thumb',
		dn: 'Medium Pill Thumb Border Radius',
		n: 'mediumPillThumbBorderRadiusRangeSlider',
		dv: '12px',
		cp: 'border-radius',
		sel: '.comp.compRangeSlider._pillThumb._mediumThumb ._thumb',
		np: true,
	},
	{
		gn: 'Pill Thumb',
		dn: 'Large Pill Thumb Border Radius',
		n: 'largePillThumbBorderRadiusRangeSlider',
		dv: '17px',
		cp: 'border-radius',
		sel: '.comp.compRangeSlider._pillThumb._largeThumb ._thumb',
		np: true,
	},

	{
		gn: 'Pill Thumb',
		dn: 'Small Pill Thumb Width',
		n: 'smallPillThumbWidthRangeSlider',
		dv: '24px',
		cp: 'width',
		sel: '.comp.compRangeSlider._pillThumb._smallThumb ._thumb',
		np: true,
	},
	{
		gn: 'Pill Thumb',
		dn: 'Medium Pill Thumb Width',
		n: 'mediumPillThumbWidthRangeSlider',
		dv: '34px',
		cp: 'width',
		sel: '.comp.compRangeSlider._pillThumb._mediumThumb ._thumb',
		np: true,
	},
	{
		gn: 'Pill Thumb',
		dn: 'Large Pill Thumb Width',
		n: 'largePillThumbWidthRangeSlider',
		dv: '44px',
		cp: 'width',
		sel: '.comp.compRangeSlider._pillThumb._largeThumb ._thumb',
		np: true,
	},

	{
		gn: 'Pill Mark Thumb',
		dn: 'Small Pill Mark Thumb Width',
		n: 'smallPillMarkThumbWidthRangeSlider',
		dv: '20px',
		cp: 'width',
		sel: '.comp.compRangeSlider._pillThumb._smallThumb ._mark._thumb',
		np: true,
	},
	{
		gn: 'Pill Mark Thumb',
		dn: 'Medium Pill Mark Thumb Width',
		n: 'mediumPillMarkThumbWidthRangeSlider',
		dv: '30px',
		cp: 'width',
		sel: '.comp.compRangeSlider._pillThumb._mediumThumb ._mark._thumb',
		np: true,
	},
	{
		gn: 'Pill Mark Thumb',
		dn: 'Large Pill Mark Thumb Width',
		n: 'largePillMarkThumbWidthRangeSlider',
		dv: '40px',
		cp: 'width',
		sel: '.comp.compRangeSlider._pillThumb._largeThumb ._mark._thumb',
		np: true,
	},

	{
		gn: 'Pill Thumb Pit',
		dn: 'Small Pill Thumb Pit Width',
		n: 'smallPillThumbPitWidthRangeSlider',
		dv: '20px',
		cp: 'width',
		sel: '.comp.compRangeSlider._pillThumb._smallThumb ._thumbPit',
		np: true,
	},
	{
		gn: 'Pill Thumb Pit',
		dn: 'Medium Pill Thumb Pit Width',
		n: 'mediumPillThumbPitWidthRangeSlider',
		dv: '27px',
		cp: 'width',
		sel: '.comp.compRangeSlider._pillThumb._mediumThumb ._thumbPit',
		np: true,
	},
	{
		gn: 'Pill Thumb Pit',
		dn: 'Large Pill Thumb Pit Width',
		n: 'largePillThumbPitWidthRangeSlider',
		dv: '34px',
		cp: 'width',
		sel: '.comp.compRangeSlider._pillThumb._largeThumb ._thumbPit',
		np: true,
	},

	{
		gn: 'Pill Thumb Pit',
		dn: 'Small Pill Thumb Pit Height',
		n: 'smallPillThumbPitHeightRangeSlider',
		dv: '10px',
		cp: 'height',
		sel: '.comp.compRangeSlider._pillThumb._smallThumb ._thumbPit',
		np: true,
	},
	{
		gn: 'Pill Thumb Pit',
		dn: 'Medium Pill Thumb Pit Height',
		n: 'mediumPillThumbPitHeightRangeSlider',
		dv: '17px',
		cp: 'height',
		sel: '.comp.compRangeSlider._pillThumb._mediumThumb ._thumbPit',
		np: true,
	},
	{
		gn: 'Pill Thumb Pit',
		dn: 'Large Pill Thumb Pit Height',
		n: 'largePillThumbPitHeightRangeSlider',
		dv: '24px',
		cp: 'height',
		sel: '.comp.compRangeSlider._pillThumb._largeThumb ._thumbPit',
		np: true,
	},

	{
		gn: 'Pill Thumb Pit',
		dn: 'Small Pill Thumb Pit Border Radius',
		n: 'smallPillThumbPitBorderRadiusRangeSlider',
		dv: '5px',
		cp: 'border-radius',
		sel: '.comp.compRangeSlider._pillThumb._smallThumb ._thumbPit',
		np: true,
	},
	{
		gn: 'Pill Thumb Pit',
		dn: 'Medium Pill Thumb Pit Border Radius',
		n: 'mediumPillThumbPitBorderRadiusRangeSlider',
		dv: '10px',
		cp: 'border-radius',
		sel: '.comp.compRangeSlider._pillThumb._mediumThumb ._thumbPit',
		np: true,
	},
	{
		gn: 'Pill Thumb Pit',
		dn: 'Large Pill Thumb Pit Border Radius',
		n: 'largePillThumbPitBorderRadiusRangeSlider',
		dv: '15px',
		cp: 'border-radius',
		sel: '.comp.compRangeSlider._pillThumb._largeThumb ._thumbPit',
		np: true,
	},

	{
		gn: 'Pill Mark Thumb Pit',
		dn: 'Small Pill Mark Thumb Pit Width',
		n: 'smallPillMarkThumbPitWidthRangeSlider',
		dv: '16px',
		cp: 'width',
		sel: '.comp.compRangeSlider._pillThumb._smallThumb ._mark._thumb ._thumbPit',
		np: true,
	},
	{
		gn: 'Pill Mark Thumb Pit',
		dn: 'Medium Pill Mark Thumb Pit Width',
		n: 'mediumPillMarkThumbPitWidthRangeSlider',
		dv: '22px',
		cp: 'width',
		sel: '.comp.compRangeSlider._pillThumb._mediumThumb ._mark._thumb ._thumbPit',
		np: true,
	},
	{
		gn: 'Pill Mark Thumb Pit',
		dn: 'Large Pill Mark Thumb Pit Width',
		n: 'largePillMarkThumbPitWidthRangeSlider',
		dv: '30px',
		cp: 'width',
		sel: '.comp.compRangeSlider._pillThumb._largeThumb ._mark._thumb ._thumbPit',
		np: true,
	},

	{
		gn: 'Pill Mark Thumb Pit',
		dn: 'Small Pill Mark Thumb Pit Height',
		n: 'smallPillMarkThumbPitHeightRangeSlider',
		dv: '7px',
		cp: 'height',
		sel: '.comp.compRangeSlider._pillThumb._smallThumb ._mark._thumb ._thumbPit',
		np: true,
	},
	{
		gn: 'Pill Mark Thumb Pit',
		dn: 'Medium Pill Mark Thumb Pit Height',
		n: 'mediumPillMarkThumbPitHeightRangeSlider',
		dv: '14px',
		cp: 'height',
		sel: '.comp.compRangeSlider._pillThumb._mediumThumb ._mark._thumb ._thumbPit',
		np: true,
	},
	{
		gn: 'Pill Mark Thumb Pit',
		dn: 'Large Pill Mark Thumb Pit Height',
		n: 'largePillMarkThumbPitHeightRangeSlider',
		dv: '20px',
		cp: 'height',
		sel: '.comp.compRangeSlider._pillThumb._largeThumb ._mark._thumb ._thumbPit',
		np: true,
	},

	{
		gn: 'Content Margin',
		dn: 'Content Small Thumb Margin Left',
		n: 'contentSmallThumbMarginLeftRangeSlider',
		dv: '7px',
		cp: 'margin-left',
		sel: '.comp.compRangeSlider._smallThumb ._contentMargin',
		np: true,
	},
	{
		gn: 'Content Margin',
		dn: 'Content Medium Thumb Margin Left',
		n: 'contentMediumThumbMarginLeftRangeSlider',
		dv: '12px',
		cp: 'margin-left',
		sel: '.comp.compRangeSlider._mediumThumb ._contentMargin',
		np: true,
	},
	{
		gn: 'Content Margin',
		dn: 'Content Large Thumb Margin Left',
		n: 'contentLargeThumbMarginLeftRangeSlider',
		dv: '17px',
		cp: 'margin-left',
		sel: '.comp.compRangeSlider._largeThumb ._contentMargin',
		np: true,
	},

	{
		gn: 'Content Margin',
		dn: 'Content Small Thumb Margin Right',
		n: 'contentSmallThumbMarginRightRangeSlider',
		dv: '7px',
		cp: 'margin-right',
		sel: '.comp.compRangeSlider._smallThumb ._contentMargin',
		np: true,
	},
	{
		gn: 'Content Margin',
		dn: 'Content Medium Thumb Margin Right',
		n: 'contentMediumThumbMarginRightRangeSlider',
		dv: '12px',
		cp: 'margin-right',
		sel: '.comp.compRangeSlider._mediumThumb ._contentMargin',
		np: true,
	},
	{
		gn: 'Content Margin',
		dn: 'Content Large Thumb Margin Right',
		n: 'contentLargeThumbMarginRightRangeSlider',
		dv: '17px',
		cp: 'margin-right',
		sel: '.comp.compRangeSlider._largeThumb ._contentMargin',
		np: true,
	},

	{
		gn: 'Content Margin Pill Thumb',
		dn: 'Content Small Pill Thumb Margin Left',
		n: 'contentSmallPillThumbMarginLeftRangeSlider',
		dv: '12px',
		cp: 'margin-left',
		sel: '.comp.compRangeSlider._smallThumb._pillThumb ._contentMargin',
		np: true,
	},
	{
		gn: 'Content Margin Pill Thumb',
		dn: 'Content Medium Pill Thumb Margin Left',
		n: 'contentMediumPillThumbMarginLeftRangeSlider',
		dv: '17px',
		cp: 'margin-left',
		sel: '.comp.compRangeSlider._mediumThumb._pillThumb ._contentMargin',
		np: true,
	},
	{
		gn: 'Content Margin Pill Thumb',
		dn: 'Content Large Pill Thumb Margin Left',
		n: 'contentLargePillThumbMarginLeftRangeSlider',
		dv: '22px',
		cp: 'margin-left',
		sel: '.comp.compRangeSlider._largeThumb._pillThumb ._contentMargin',
		np: true,
	},

	{
		gn: 'Content Margin Pill Thumb',
		dn: 'Content Small Pill Thumb Margin Right',
		n: 'contentSmallPillThumbMarginRightRangeSlider',
		dv: '12px',
		cp: 'margin-right',
		sel: '.comp.compRangeSlider._smallThumb._pillThumb ._contentMargin',
		np: true,
	},
	{
		gn: 'Content Margin Pill Thumb',
		dn: 'Content Medium Pill Thumb Margin Right',
		n: 'contentMediumPillThumbMarginRightRangeSlider',
		dv: '17px',
		cp: 'margin-right',
		sel: '.comp.compRangeSlider._mediumThumb._pillThumb ._contentMargin',
		np: true,
	},
	{
		gn: 'Content Margin Pill Thumb',
		dn: 'Content Large Pill Thumb Margin Right',
		n: 'contentLargePillThumbMarginRightRangeSlider',
		dv: '22px',
		cp: 'margin-right',
		sel: '.comp.compRangeSlider._largeThumb._pillThumb ._contentMargin',
		np: true,
	},

	{
		gn: 'Label',
		dn: 'Min Label Font',
		n: 'minLabelFontRangeSlider',
		dv: '<labelRangeSliderFont>',
		cp: 'font',
		sel: '.comp.compRangeSlider ._minLabel',
		np: true,
	},
	{
		gn: 'Label',
		dn: 'Max Label Font',
		n: 'maxLabelFontRangeSlider',
		dv: '<labelRangeSliderFont>',
		cp: 'font',
		sel: '.comp.compRangeSlider ._maxLabel',
		np: true,
	},
	{
		gn: 'Label',
		dn: 'Mark Label Font',
		n: 'markLabelFontRangeSlider',
		dv: '<labelRangeSliderFont>',
		cp: 'font',
		sel: '.comp.compRangeSlider ._markLabel',
		np: true,
	},
	{
		gn: 'Label',
		dn: 'Tick Label Font',
		n: 'tickLabelFontRangeSlider',
		dv: '<labelRangeSliderFont>',
		cp: 'font',
		sel: '.comp.compRangeSlider ._tickLabel',
		np: true,
	},

	{
		gn: 'Label',
		dn: 'Bottom Label Container Height',
		n: 'bottomLabelContainerHeightRangeSlider',
		dv: '20px',
		cp: 'height',
		sel: '.comp.compRangeSlider ._bottomLabelContainer',
		np: true,
	},
	{
		gn: 'Label',
		dn: 'Top Label Container Height',
		n: 'topLabelContainerHeightRangeSlider',
		dv: '20px',
		cp: 'height',
		sel: '.comp.compRangeSlider ._topLabelContainer',
		np: true,
	},

	{
		gn: 'Tick Container',
		dn: 'Tick Container Gap',
		n: 'tickContainerGapRangeSlider',
		dv: '3px',
		cp: 'gap',
		sel: '.comp.compRangeSlider ._tickContainer',
		np: true,
	},

	{
		gn: 'Tick',
		dn: 'Tick Width',
		n: 'tickWidthRangeSlider',
		dv: '2px',
		cp: 'width',
		sel: '.comp.compRangeSlider ._tick',
		np: true,
	},
	{
		gn: 'Tick',
		dn: 'Tick Height',
		n: 'tickHeightRangeSlider',
		dv: '6px',
		cp: 'height',
		sel: '.comp.compRangeSlider ._tick',
		np: true,
	},

	{
		gn: 'Fixed Label Tooltip',
		dn: 'Fixed Label Tooltip Height',
		n: 'fixedLabelTooltipHeightRangeSlider',
		dv: '30px',
		cp: 'height',
		sel: '.comp.compRangeSlider._fixedLabelTT ._toolTip',
		np: true,
	},
	{
		gn: 'Fixed Label Tooltip',
		dn: 'Fixed Label Tooltip Line Height',
		n: 'fixedLabelTooltipLineHeightRangeSlider',
		dv: '30px',
		cp: 'line-height',
		sel: '.comp.compRangeSlider._fixedLabelTT ._toolTip',
		np: true,
	},
	{
		gn: 'Fixed Label Tooltip',
		dn: 'Fixed Label Tooltip Margin Top',
		n: 'fixedLabelTooltipMarginTopRangeSlider',
		dv: '5px',
		cp: 'margin-top',
		sel: '.comp.compRangeSlider._fixedLabelTT ._toolTip',
		np: true,
	},
	{
		gn: 'Fixed Label Tooltip',
		dn: 'Fixed Label Tooltip Margin Bottom',
		n: 'fixedLabelTooltipMarginBottomRangeSlider',
		dv: '5px',
		cp: 'margin-bottom',
		sel: '.comp.compRangeSlider._fixedLabelTT ._toolTip',
		np: true,
	},
	{
		gn: 'Fixed Label Tooltip',
		dn: 'Fixed Label Tooltip Font',
		n: 'fixedLabelTooltipFontRangeSlider',
		dv: '<fixedTooltipRangeSliderFont>',
		cp: 'font',
		sel: '.comp.compRangeSlider._fixedLabelTT ._toolTip',
		np: true,
	},

	{
		gn: 'Tooltip',
		dn: 'Tooltip Font',
		n: 'tooltipFontRangeSlider',
		dv: '<tooltipRangeSliderFont>',
		cp: 'font',
		sel: '.comp.compRangeSlider._roundedTT ._toolTip, .comp.compRangeSlider._roundedRectangleTT ._toolTip, .comp.compRangeSlider._largeRoundedTT ._toolTip',
		np: true,
	},
	{
		gn: 'Tooltip',
		dn: 'Rounded Tooltip Border Radius',
		n: 'roundedTooltipBorderRadiusRangeSlider',
		dv: '15px',
		cp: 'border-radius',
		sel: '.comp.compRangeSlider._roundedTT ._toolTip',
		np: true,
	},
	{
		gn: 'Tooltip',
		dn: 'Rounded Rectangle Tooltip Border Radius',
		n: 'roundedRectangleTooltipBorderRadiusRangeSlider',
		dv: '5px',
		cp: 'border-radius',
		sel: '.comp.compRangeSlider._roundedRectangleTT ._toolTip',
		np: true,
	},
	{
		gn: 'Tooltip',
		dn: 'Large Rounded Tooltip Border Radius',
		n: 'largeRoundedTooltipBorderRadiusRangeSlider',
		dv: '15px',
		cp: 'border-radius',
		sel: '.comp.compRangeSlider._largeRoundedTT ._toolTip',
		np: true,
	},

	{
		gn: 'Tooltip',
		dn: 'Rounded Tooltip Padding',
		n: 'roundedTooltipPaddingRangeSlider',
		dv: '3px 7px',
		cp: 'padding',
		sel: '.comp.compRangeSlider._roundedTT ._toolTip',
		np: true,
	},
	{
		gn: 'Tooltip',
		dn: 'Rounded Rectangle Padding',
		n: 'roundedRectanglePaddingRangeSlider',
		dv: '3px 7px',
		cp: 'padding',
		sel: '.comp.compRangeSlider._roundedRectangleTT ._toolTip',
		np: true,
	},
	{
		gn: 'Tooltip',
		dn: 'Large Rounded Tooltip Padding',
		n: 'largeRoundedTooltipPaddingRangeSlider',
		dv: '7px 9px',
		cp: 'padding',
		sel: '.comp.compRangeSlider._largeRoundedTT ._toolTip',
		np: true,
	},

	{
		gn: 'Empty Track',
		dn: 'Empty Track Color',
		n: 'emptyTrackColorRangeSlider',
		dv: '<backgroundColorNine>',
		cp: 'background',
		sel: '.comp.compRangeSlider._emptyTrack ._track',
		np: true,
	},

	{
		gn: 'Thumb',
		dn: 'Thumb Color',
		n: 'thumbColorRangeSlider',
		dv: '<backgroundColorSeven>',
		cp: 'background',
		sel: '.comp.compRangeSlider ._thumb',
		np: true,
	},
	{
		gn: 'Thumb',
		dn: 'Inverted Thumb Color',
		n: 'invertedThumbColorRangeSlider',
		dv: '<backgroundColorSeven>',
		cp: 'background',
		sel: '.comp.compRangeSlider._invertThumb ._thumbPit',
		np: true,
	},

	{
		gn: 'Tick',
		dn: 'Tick Color',
		n: 'tickColorRangeSlider',
		dv: '<backgroundColorEight>',
		cp: 'background',
		sel: '.comp.compRangeSlider ._tick',
		np: true,
	},
	{
		gn: 'Tick',
		dn: 'Tick Label Color',
		n: 'tickLabelColorRangeSlider',
		dv: '<backgroundColorEight>',
		cp: 'color',
		sel: '.comp.compRangeSlider ._tickLabel',
		np: true,
	},

	{
		gn: 'Thumb',
		dn: 'Thumb Box Shadow',
		n: 'thumbBoxShadowRangeSlider',
		dv: '0px 2px 10px 0px  <colorNine>',
		cp: 'box-shadow',
		sel: '.comp.compRangeSlider ._thumb',
		np: true,
	},
	{
		gn: 'Tooltip',
		dn: 'Tooltip Box Shadow',
		n: 'tooltipBoxShadowRangeSlider',
		dv: '0px 2px 10px 0px <colorNine>',
		cp: 'box-shadow',
		sel: '.comp.compRangeSlider._roundedTT ._toolTip, .comp.compRangeSlider._roundedRectangleTT ._toolTip, .comp.compRangeSlider._largeRoundedTT ._toolTip',
		np: true,
	},

	{
		gn: 'Range Track',
		dn: 'Primary  Design Range Track Background Range Slider',
		n: 'primaryDesignRangeTrackBackgroundRangeSlider',
		dv: '<backgroundColorOne>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._primary ._rangeTrack',
		np: true,
	},
	{
		gn: 'Range Track',
		dn: 'Secondary  Design Range Track Background Range Slider',
		n: 'secondaryDesignRangeTrackBackgroundRangeSlider',
		dv: '<backgroundColorTwo>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._secondary ._rangeTrack',
		np: true,
	},
	{
		gn: 'Range Track',
		dn: 'Tertiary  Design Range Track Background Range Slider',
		n: 'tertiaryDesignRangeTrackBackgroundRangeSlider',
		dv: '<backgroundColorThree>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._tertiary ._rangeTrack',
		np: true,
	},
	{
		gn: 'Range Track',
		dn: 'Quaternary  Design Range Track Background Range Slider',
		n: 'quaternaryDesignRangeTrackBackgroundRangeSlider',
		dv: '<backgroundColorFour>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._quaternary ._rangeTrack',
		np: true,
	},
	{
		gn: 'Range Track',
		dn: 'Quinary  Design Range Track Background Range Slider',
		n: 'quinaryDesignRangeTrackBackgroundRangeSlider',
		dv: '<backgroundColorFive>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._quinary ._rangeTrack',
		np: true,
	},

	{
		gn: 'Filled Track',
		dn: 'Primary  Design Filled Track Background Range Slider',
		n: 'primaryDesignFilledTrackBackgroundRangeSlider',
		dv: '<backgroundHoverColorOne>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._primary._filledTrack ._track',
		np: true,
	},
	{
		gn: 'Filled Track',
		dn: 'Secondary  Design Filled Track Background Range Slider',
		n: 'secondaryDesignFilledTrackBackgroundRangeSlider',
		dv: '<backgroundHoverColorTwo>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._secondary._filledTrack ._track',
		np: true,
	},
	{
		gn: 'Filled Track',
		dn: 'Tertiary  Design Filled Track Background Range Slider',
		n: 'tertiaryDesignFilledTrackBackgroundRangeSlider',
		dv: '<backgroundHoverColorThree>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._tertiary._filledTrack ._track',
		np: true,
	},
	{
		gn: 'Filled Track',
		dn: 'Quaternary  Design Filled Track Background Range Slider',
		n: 'quaternaryDesignFilledTrackBackgroundRangeSlider',
		dv: '<backgroundHoverColorFour>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._quaternary._filledTrack ._track',
		np: true,
	},
	{
		gn: 'Filled Track',
		dn: 'Quinary  Design Filled Track Background Range Slider',
		n: 'quinaryDesignFilledTrackBackgroundRangeSlider',
		dv: '<backgroundHoverColorFive>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._quinary._filledTrack ._track',
		np: true,
	},

	{
		gn: 'Thumb Pit',
		dn: 'Primary  Design Thumb Pit Background Range Slider',
		n: 'primaryDesignThumbPitBackgroundRangeSlider',
		dv: '<backgroundColorOne>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._primary ._thumbPit',
		np: true,
	},
	{
		gn: 'Thumb Pit',
		dn: 'Secondary  Design Thumb Pit Background Range Slider',
		n: 'secondaryDesignThumbPitBackgroundRangeSlider',
		dv: '<backgroundColorTwo>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._secondary ._thumbPit',
		np: true,
	},
	{
		gn: 'Thumb Pit',
		dn: 'Tertiary  Design Thumb Pit Background Range Slider',
		n: 'tertiaryDesignThumbPitBackgroundRangeSlider',
		dv: '<backgroundColorThree>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._tertiary ._thumbPit',
		np: true,
	},
	{
		gn: 'Thumb Pit',
		dn: 'Quaternary  Design Thumb Pit Background Range Slider',
		n: 'quaternaryDesignThumbPitBackgroundRangeSlider',
		dv: '<backgroundColorFour>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._quaternary ._thumbPit',
		np: true,
	},
	{
		gn: 'Thumb Pit',
		dn: 'Quinary  Design Thumb Pit Background Range Slider',
		n: 'quinaryDesignThumbPitBackgroundRangeSlider',
		dv: '<backgroundColorFive>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._quinary ._thumbPit',
		np: true,
	},

	{
		gn: 'Inverted Thumb Pit',
		dn: 'Primary  Design Inverted Thumb Pit Background Range Slider',
		n: 'primaryDesignInvertedThumbPitBackgroundRangeSlider',
		dv: '<backgroundColorOne>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._primary._invertThumb ._thumb',
		np: true,
	},
	{
		gn: 'Inverted Thumb Pit',
		dn: 'Secondary  Design Inverted Thumb Pit Background Range Slider',
		n: 'secondaryDesignInvertedThumbPitBackgroundRangeSlider',
		dv: '<backgroundColorTwo>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._secondary._invertThumb ._thumb',
		np: true,
	},
	{
		gn: 'Inverted Thumb Pit',
		dn: 'Tertiary  Design Inverted Thumb Pit Background Range Slider',
		n: 'tertiaryDesignInvertedThumbPitBackgroundRangeSlider',
		dv: '<backgroundColorThree>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._tertiary._invertThumb ._thumb',
		np: true,
	},
	{
		gn: 'Inverted Thumb Pit',
		dn: 'Quaternary  Design Inverted Thumb Pit Background Range Slider',
		n: 'quaternaryDesignInvertedThumbPitBackgroundRangeSlider',
		dv: '<backgroundColorFour>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._quaternary._invertThumb ._thumb',
		np: true,
	},
	{
		gn: 'Inverted Thumb Pit',
		dn: 'Quinary  Design Inverted Thumb Pit Background Range Slider',
		n: 'quinaryDesignInvertedThumbPitBackgroundRangeSlider',
		dv: '<backgroundColorFive>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._quinary._invertThumb ._thumb',
		np: true,
	},

	{
		gn: 'Rounded Tooltip',
		dn: 'Primary  Design Rounded Tooltip Background Range Slider',
		n: 'primaryDesignRoundedTooltipBackgroundRangeSlider',
		dv: '<backgroundColorOne>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._primary._roundedTT ._toolTip',
		np: true,
	},
	{
		gn: 'Rounded Tooltip',
		dn: 'Secondary  Design Rounded Tooltip Background Range Slider',
		n: 'secondaryDesignRoundedTooltipBackgroundRangeSlider',
		dv: '<backgroundColorTwo>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._secondary._roundedTT ._toolTip',
		np: true,
	},
	{
		gn: 'Rounded Tooltip',
		dn: 'Tertiary  Design Rounded Tooltip Background Range Slider',
		n: 'tertiaryDesignRoundedTooltipBackgroundRangeSlider',
		dv: '<backgroundColorThree>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._tertiary._roundedTT ._toolTip',
		np: true,
	},
	{
		gn: 'Rounded Tooltip',
		dn: 'Quaternary  Design Rounded Tooltip Background Range Slider',
		n: 'quaternaryDesignRoundedTooltipBackgroundRangeSlider',
		dv: '<backgroundColorFour>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._quaternary._roundedTT ._toolTip',
		np: true,
	},
	{
		gn: 'Rounded Tooltip',
		dn: 'Quinary  Design Rounded Tooltip Background Range Slider',
		n: 'quinaryDesignRoundedTooltipBackgroundRangeSlider',
		dv: '<backgroundColorFive>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._quinary._roundedTT ._toolTip',
		np: true,
	},

	{
		gn: 'Large Rounded Tooltip',
		dn: 'Primary  Design Large Rounded Tooltip Background Range Slider',
		n: 'primaryDesignLargeRoundedTooltipBackgroundRangeSlider',
		dv: '<backgroundColorOne>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._primary._largeRoundedTT ._toolTip',
		np: true,
	},
	{
		gn: 'Large Rounded Tooltip',
		dn: 'Secondary  Design Large Rounded Tooltip Background Range Slider',
		n: 'secondaryDesignLargeRoundedTooltipBackgroundRangeSlider',
		dv: '<backgroundColorTwo>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._secondary._largeRoundedTT ._toolTip',
		np: true,
	},
	{
		gn: 'Large Rounded Tooltip',
		dn: 'Tertiary  Design Large Rounded Tooltip Background Range Slider',
		n: 'tertiaryDesignLargeRoundedTooltipBackgroundRangeSlider',
		dv: '<backgroundColorThree>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._tertiary._largeRoundedTT ._toolTip',
		np: true,
	},
	{
		gn: 'Large Rounded Tooltip',
		dn: 'Quaternary  Design Large Rounded Tooltip Background Range Slider',
		n: 'quaternaryDesignLargeRoundedTooltipBackgroundRangeSlider',
		dv: '<backgroundColorFour>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._quaternary._largeRoundedTT ._toolTip',
		np: true,
	},
	{
		gn: 'Large Rounded Tooltip',
		dn: 'Quinary  Design Large Rounded Tooltip Background Range Slider',
		n: 'quinaryDesignLargeRoundedTooltipBackgroundRangeSlider',
		dv: '<backgroundColorFive>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._quinary._largeRoundedTT ._toolTip',
		np: true,
	},

	{
		gn: 'Rounded Rectangle Tooltip',
		dn: 'Primary  Design Rounded Rectangle Tooltip Background Range Slider',
		n: 'primaryDesignRoundedRectangleTooltipBackgroundRangeSlider',
		dv: '<backgroundColorOne>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._primary._roundedRectangleTT ._toolTip',
		np: true,
	},
	{
		gn: 'Rounded Rectangle Tooltip',
		dn: 'Secondary  Design Rounded Rectangle Tooltip Background Range Slider',
		n: 'secondaryDesignRoundedRectangleTooltipBackgroundRangeSlider',
		dv: '<backgroundColorTwo>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._secondary._roundedRectangleTT ._toolTip',
		np: true,
	},
	{
		gn: 'Rounded Rectangle Tooltip',
		dn: 'Tertiary  Design Rounded Rectangle Tooltip Background Range Slider',
		n: 'tertiaryDesignRoundedRectangleTooltipBackgroundRangeSlider',
		dv: '<backgroundColorThree>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._tertiary._roundedRectangleTT ._toolTip',
		np: true,
	},
	{
		gn: 'Rounded Rectangle Tooltip',
		dn: 'Quaternary  Design Rounded Rectangle Tooltip Background Range Slider',
		n: 'quaternaryDesignRoundedRectangleTooltipBackgroundRangeSlider',
		dv: '<backgroundColorFour>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._quaternary._roundedRectangleTT ._toolTip',
		np: true,
	},
	{
		gn: 'Rounded Rectangle Tooltip',
		dn: 'Quinary  Design Rounded Rectangle Tooltip Background Range Slider',
		n: 'quinaryDesignRoundedRectangleTooltipBackgroundRangeSlider',
		dv: '<backgroundColorFive>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._quinary._roundedRectangleTT ._toolTip',
		np: true,
	},

	{
		gn: 'Rounded Tooltip',
		dn: 'Primary  Design Rounded Tooltip Font Color Range Slider',
		n: 'primaryDesignRoundedTooltipFontColorRangeSlider',
		dv: '<fontColorTwo>',
		cp: 'color',
		sel: '.comp.compRangeSlider._primary._roundedTT ._toolTip',
		np: true,
	},
	{
		gn: 'Rounded Tooltip',
		dn: 'Secondary  Design Rounded Tooltip Font Color Range Slider',
		n: 'secondaryDesignRoundedTooltipFontColorRangeSlider',
		dv: '<fontColorTwo>',
		cp: 'color',
		sel: '.comp.compRangeSlider._secondary._roundedTT ._toolTip',
		np: true,
	},
	{
		gn: 'Rounded Tooltip',
		dn: 'Tertiary  Design Rounded Tooltip Font Color Range Slider',
		n: 'tertiaryDesignRoundedTooltipFontColorRangeSlider',
		dv: '<fontColorTwo>',
		cp: 'color',
		sel: '.comp.compRangeSlider._tertiary._roundedTT ._toolTip',
		np: true,
	},
	{
		gn: 'Rounded Tooltip',
		dn: 'Quaternary  Design Rounded Tooltip Font Color Range Slider',
		n: 'quaternaryDesignRoundedTooltipFontColorRangeSlider',
		dv: '<fontColorTwo>',
		cp: 'color',
		sel: '.comp.compRangeSlider._quaternary._roundedTT ._toolTip',
		np: true,
	},
	{
		gn: 'Rounded Tooltip',
		dn: 'Quinary  Design Rounded Tooltip Font Color Range Slider',
		n: 'quinaryDesignRoundedTooltipFontColorRangeSlider',
		dv: '<fontColorTwo>',
		cp: 'color',
		sel: '.comp.compRangeSlider._quinary._roundedTT ._toolTip',
		np: true,
	},

	{
		gn: 'Large Rounded Tooltip',
		dn: 'Primary  Design Large Rounded Tooltip Font Color Range Slider',
		n: 'primaryDesignLargeRoundedTooltipFontColorRangeSlider',
		dv: '<fontColorTwo>',
		cp: 'color',
		sel: '.comp.compRangeSlider._primary._largeRoundedTT ._toolTip',
		np: true,
	},
	{
		gn: 'Large Rounded Tooltip',
		dn: 'Secondary  Design Large Rounded Tooltip Font Color Range Slider',
		n: 'secondaryDesignLargeRoundedTooltipFontColorRangeSlider',
		dv: '<fontColorTwo>',
		cp: 'color',
		sel: '.comp.compRangeSlider._secondary._largeRoundedTT ._toolTip',
		np: true,
	},
	{
		gn: 'Large Rounded Tooltip',
		dn: 'Tertiary  Design Large Rounded Tooltip Font Color Range Slider',
		n: 'tertiaryDesignLargeRoundedTooltipFontColorRangeSlider',
		dv: '<fontColorTwo>',
		cp: 'color',
		sel: '.comp.compRangeSlider._tertiary._largeRoundedTT ._toolTip',
		np: true,
	},
	{
		gn: 'Large Rounded Tooltip',
		dn: 'Quaternary  Design Large Rounded Tooltip Font Color Range Slider',
		n: 'quaternaryDesignLargeRoundedTooltipFontColorRangeSlider',
		dv: '<fontColorTwo>',
		cp: 'color',
		sel: '.comp.compRangeSlider._quaternary._largeRoundedTT ._toolTip',
		np: true,
	},
	{
		gn: 'Large Rounded Tooltip',
		dn: 'Quinary  Design Large Rounded Tooltip Font Color Range Slider',
		n: 'quinaryDesignLargeRoundedTooltipFontColorRangeSlider',
		dv: '<fontColorTwo>',
		cp: 'color',
		sel: '.comp.compRangeSlider._quinary._largeRoundedTT ._toolTip',
		np: true,
	},

	{
		gn: 'Rounded Rectangle Tooltip',
		dn: 'Primary  Design Rounded Rectangle Tooltip Font Color Range Slider',
		n: 'primaryDesignRoundedRectangleTooltipFontColorRangeSlider',
		dv: '<fontColorTwo>',
		cp: 'color',
		sel: '.comp.compRangeSlider._primary._roundedRectangleTT ._toolTip',
		np: true,
	},
	{
		gn: 'Rounded Rectangle Tooltip',
		dn: 'Secondary  Design Rounded Rectangle Tooltip Font Color Range Slider',
		n: 'secondaryDesignRoundedRectangleTooltipFontColorRangeSlider',
		dv: '<fontColorTwo>',
		cp: 'color',
		sel: '.comp.compRangeSlider._secondary._roundedRectangleTT ._toolTip',
		np: true,
	},
	{
		gn: 'Rounded Rectangle Tooltip',
		dn: 'Tertiary  Design Rounded Rectangle Tooltip Font Color Range Slider',
		n: 'tertiaryDesignRoundedRectangleTooltipFontColorRangeSlider',
		dv: '<fontColorTwo>',
		cp: 'color',
		sel: '.comp.compRangeSlider._tertiary._roundedRectangleTT ._toolTip',
		np: true,
	},
	{
		gn: 'Rounded Rectangle Tooltip',
		dn: 'Quaternary  Design Rounded Rectangle Tooltip Font Color Range Slider',
		n: 'quaternaryDesignRoundedRectangleTooltipFontColorRangeSlider',
		dv: '<fontColorTwo>',
		cp: 'color',
		sel: '.comp.compRangeSlider._quaternary._roundedRectangleTT ._toolTip',
		np: true,
	},
	{
		gn: 'Rounded Rectangle Tooltip',
		dn: 'Quinary  Design Rounded Rectangle Tooltip Font Color Range Slider',
		n: 'quinaryDesignRoundedRectangleTooltipFontColorRangeSlider',
		dv: '<fontColorTwo>',
		cp: 'color',
		sel: '.comp.compRangeSlider._quinary._roundedRectangleTT ._toolTip',
		np: true,
	},

	{
		gn: 'Readonly',
		dn: 'Readonly Background Color Range Slider',
		n: 'readonlyBackgroundColorRangeSlider',
		dv: '<backgroundColorNine>',
		cp: 'background-color',
		sel: '.comp.compRangeSlider._readOnly ._track, .comp.compRangeSlider._readOnly ._rangeTrack, .comp.compRangeSlider._readOnly ._thumb, .comp.compRangeSlider._readOnly._filledTrack ._track, .comp.compRangeSlider._readOnly ._thumbPit,.comp.compRangeSlider._primary._roundedTT._readOnly ._toolTip, .comp.compRangeSlider._secondary._roundedTT._readOnly ._toolTip, .comp.compRangeSlider._tertiary._roundedTT._readOnly ._toolTip, .comp.compRangeSlider._quaternary._roundedTT._readOnly ._toolTip, .comp.compRangeSlider._quinary._roundedTT._readOnly ._toolTip, .comp.compRangeSlider._primary._largeRoundedTT._readOnly ._toolTip, .comp.compRangeSlider._secondary._largeRoundedTT._readOnly ._toolTip, .comp.compRangeSlider._tertiary._largeRoundedTT._readOnly ._toolTip, .comp.compRangeSlider._quaternary._largeRoundedTT._readOnly ._toolTip, .comp.compRangeSlider._quinary._largeRoundedTT._readOnly ._toolTip, .comp.compRangeSlider._primary._roundedRectangleTT._readOnly ._toolTip, .comp.compRangeSlider._secondary._roundedRectangleTT._readOnly ._toolTip, .comp.compRangeSlider._tertiary._roundedRectangleTT._readOnly ._toolTip, .comp.compRangeSlider._quaternary._roundedRectangleTT._readOnly ._toolTip, .comp.compRangeSlider._quinary._roundedRectangleTT._readOnly ._toolTip',
		np: true,
	},

	{
		gn: 'ReadOnly',
		dn: 'Readonly Tooltip Box Shadow',
		n: 'readonlyTooltipBoxShadowRangeSlider',
		dv: 'none',
		cp: 'box-shadow',
		sel: '.comp.compRangeSlider._roundedTT._readOnly ._toolTip, .comp.compRangeSlider._roundedRectangleTT._readOnly ._toolTip, .comp.compRangeSlider._largeRoundedTT._readOnly ._toolTip, .comp.compRangeSlider._readOnly ._thumb',
		np: true,
	},

	{
		gn: 'ReadOnly',
		dn: 'Readonly Tooltip Color',
		n: 'readonlyTooltipColorRangeSlider',
		dv: '<fontColorOne>',
		cp: 'color',
		sel: '.comp.compRangeSlider._roundedTT._readOnly ._toolTip, .comp.compRangeSlider._roundedRectangleTT._readOnly ._toolTip, .comp.compRangeSlider._largeRoundedTT._readOnly ._toolTip',
		np: true,
	},
];
export const styleDefaults = new Map<string, string>(
	styleProperties
		.filter(e => !!e.dv)
		.map(({ n: name, dv: defaultValue }) => [name, defaultValue!]),
);
