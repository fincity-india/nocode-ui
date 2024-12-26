import { StylePropertyDefinition } from '../../types/common';

export const styleProperties: Array<StylePropertyDefinition> = [
	{
		gn: 'Progress Bar Background',
		dn: 'Default Design Progress Bar Background',
		n: 'progressBarBackgroundColor',
		dv: '<fontColorSix>',
		cp: 'background',
		sel: '.comp.compProgressBar._default ._track, .comp.compProgressBar._striped  ._track',
		np: true,
	},

	{
		gn: 'Progress Bar Border Radius',
		dn: 'Default Design Progress Bar Border Radius',
		n: 'progressBarBorderRadius',
		dv: '10px',
		cp: 'border-radius',
		sel: '.comp.compProgressBar._default  ._track, .comp.compProgressBar._default ._progress',
		np: true,
	},
	{
		gn: 'Progress Bar Border Radius',
		dn: 'Striped Design Progress Bar Border Radius',
		n: 'stripedProgressBarBorderRadius',
		dv: '2px',
		cp: 'border-radius',
		sel: '.comp.compProgressBar._striped  ._track, .comp.compProgressBar._striped ._progress',
		np: true,
	},
	{
		gn: 'Font Color',
		dn: 'Progress Bar Light Font Color',
		n: 'progressBarLightFontColor',
		dv: '<fontColorTwo>',
		cp: 'color',
		sel: '.comp.compProgressBar._default ._progress, .comp.compProgressBar._striped ._progress',
		np: true,
	},
	{
		gn: 'Font Color',
		dn: 'Progress Bar Dark Font Color',
		n: 'progressBarDarkFontColor',
		dv: '<fontColorOne>',
		cp: 'color',
		sel: '.comp.compProgressBar._default ._progress._top, .comp.compProgressBar._default ._progress._bottom, .comp.compProgressBar._striped ._progress._top, .comp.compProgressBar._striped ._progress._bottom',
		np: true,
	},

	{
		gn: 'Padding',
		dn: 'Progress Bar Text Padding Left',
		n: 'progressBarTextLeftPadding',
		dv: '5px',
		cp: 'padding-left',
		sel: '.comp.compProgressBar._default ._progress._left, .comp.compProgressBar._striped ._progress._left',
		np: true,
	},
	{
		gn: 'Padding',
		dn: 'Progress Bar Text Padding Right',
		n: 'progressBarTextRightPadding',
		dv: '5px',
		cp: 'padding-right',
		sel: '.comp.compProgressBar._default ._progress._right, .comp.compProgressBar._striped ._progress._right',
		np: true,
	},
	{
		gn: 'Padding',
		dn: 'Progress Bar Text Padding Top',
		n: 'progressBarTextTopPadding',
		dv: '5px',
		cp: 'padding-top',
		sel: '.comp.compProgressBar._default ._progress._top, .comp.compProgressBar._striped ._progress._top',
		np: true,
	},
	{
		gn: 'Padding',
		dn: 'Progress Bar Text Padding Bottom',
		n: 'progressBarTextBottomPadding',
		dv: '5px',
		cp: 'padding-bottom',
		sel: '.comp.compProgressBar._default ._progress._bottom, .comp.compProgressBar._striped ._progress._bottom',
		np: true,
	},

	{
		gn: 'Height',
		dn: 'Progress Bar Height Default Design',
		n: 'progressBarHeightWithoutText',
		dv: '10px',
		cp: 'height',
		sel: '.comp.compProgressBar._default  ._track, .comp.compProgressBar._striped  ._track',
		np: true,
	},
	{
		gn: 'Height',
		dn: 'Progress Bar Height Default Design With Text',
		n: 'progressBarHeightWithText',
		dv: '16px',
		cp: 'height',
		sel: '.comp.compProgressBar._default._hasLabel  ._track, .comp.compProgressBar._striped._hasLabel  ._track',
		np: true,
	},

	{
		gn: 'Progress Bar Outside Text Padding',
		dn: 'Progress Bar Outside Text Top Padding',
		n: 'progressOutsideTextTopPadding',
		dv: '5px',
		cp: 'padding-top',
		sel: '.comp.compProgressBar._default > ._bottom, .comp.compProgressBar._striped > ._bottom',
		np: true,
	},
	{
		gn: 'Progress Bar Outside Text Padding',
		dn: 'Progress Bar Outside Text Bottom Padding',
		n: 'progressOutsideTextBottomPadding',
		dv: '5px',
		cp: 'padding-bottom',
		sel: '.comp.compProgressBar._default > ._top, .comp.compProgressBar._striped > ._top',
		np: true,
	},
	{
		gn: 'Progress Bar Outside Text Padding',
		dn: 'Progress Bar Outside Text Left Padding',
		n: 'progressOutsideTextLeftPadding',
		dv: '5px',
		cp: 'padding-left',
		np: true,
	},
	{
		gn: 'Progress Bar Outside Text Padding',
		dn: 'Progress Bar Outside Text Right Padding',
		n: 'progressOutsideTextRightPadding',
		dv: '5px',
		cp: 'padding-right',
		np: true,
	},

	{
		gn: 'Circular Progress Label BG Size',
		dn: 'Circular Progress Label BG Size Width',
		n: 'circularProgressLabelBGSizeWidth',
		dv: '30%',
		cp: 'r',
		sel: '.comp.compProgressBar._circular_text_background_outline ._circular_progress ._circular_progres_text_bg, .comp.compProgressBar._circular_text_background ._circular_progress ._circular_progres_text_bg',
		np: true,
	},

	{
		gn: 'Circular Progress Track BG Color',
		dn: 'Primary Circular Design Progress Bar Track BG Color',
		n: 'primaryCircularDesignProgressBarTrackBGColor',
		dv: '<backgroundColorOne>66',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular._primary ._circular_track',
		np: true,
	},
	{
		gn: 'Circular Progress Track BG Color',
		dn: 'Secondary Circular Design Progress Bar Track BG Color',
		n: 'secondaryCircularDesignProgressBarTrackBGColor',
		dv: '<backgroundColorTwo>66',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular._secondary ._circular_track',
		np: true,
	},
	{
		gn: 'Circular Progress Track BG Color',
		dn: 'Tertiary Circular Design Progress Bar Track BG Color',
		n: 'tertiaryCircularDesignProgressBarTrackBGColor',
		dv: '<backgroundColorThree>66',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular._tertiary ._circular_track',
		np: true,
	},
	{
		gn: 'Circular Progress Track BG Color',
		dn: 'Quaternary Circular Design Progress Bar Track BG Color',
		n: 'quaternaryCircularDesignProgressBarTrackBGColor',
		dv: '<backgroundColorFour>66',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular._quaternary ._circular_track',
		np: true,
	},
	{
		gn: 'Circular Progress Track BG Color',
		dn: 'Quinary Circular Design Progress Bar Track BG Color',
		n: 'quinaryCircularDesignProgressBarTrackBGColor',
		dv: '<backgroundColorFive>66',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular._quinary ._circular_track',
		np: true,
	},

	{
		gn: 'Circular Progress Track BG Color',
		dn: 'Primary Circular Text Bg Design Progress Bar Track BG Color',
		n: 'primaryCircularTextBgDesignProgressBarTrackBGColor',
		dv: '<backgroundColorOne>66',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular_text_background._primary ._circular_track',
		np: true,
	},
	{
		gn: 'Circular Progress Track BG Color',
		dn: 'Secondary Circular Text Bg Design Progress Bar Track BG Color',
		n: 'secondaryCircularTextBgDesignProgressBarTrackBGColor',
		dv: '<backgroundColorTwo>66',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular_text_background._secondary ._circular_track',
		np: true,
	},
	{
		gn: 'Circular Progress Track BG Color',
		dn: 'Tertiary Circular Text Bg Design Progress Bar Track BG Color',
		n: 'tertiaryCircularTextBgDesignProgressBarTrackBGColor',
		dv: '<backgroundColorThree>66',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular_text_background._tertiary ._circular_track',
		np: true,
	},
	{
		gn: 'Circular Progress Track BG Color',
		dn: 'Quaternary Circular Text Bg Design Progress Bar Track BG Color',
		n: 'quaternaryCircularTextBgDesignProgressBarTrackBGColor',
		dv: '<backgroundColorFour>66',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular_text_background._quaternary ._circular_track',
		np: true,
	},
	{
		gn: 'Circular Progress Track BG Color',
		dn: 'Quinary Circular Text Bg Design Progress Bar Track BG Color',
		n: 'quinaryCircularTextBgDesignProgressBarTrackBGColor',
		dv: '<backgroundColorFive>66',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular_text_background._quinary ._circular_track',
		np: true,
	},

	{
		gn: 'Circular Progress Track BG Color',
		dn: 'Primary Circular Text Outline Bg Design Progress Bar Track BG Color',
		n: 'primaryCircularTextOutlineBgDesignProgressBarTrackBGColor',
		dv: '<backgroundColorOne>66',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular_text_background_outline._primary ._circular_track',
		np: true,
	},
	{
		gn: 'Circular Progress Track BG Color',
		dn: 'Secondary Circular Text Outline Bg Design Progress Bar Track BG Color',
		n: 'secondaryCircularTextOutlineBgDesignProgressBarTrackBGColor',
		dv: '<backgroundColorTwo>66',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular_text_background_outline._secondary ._circular_track',
		np: true,
	},
	{
		gn: 'Circular Progress Track BG Color',
		dn: 'Tertiary Circular Text Outline Bg Design Progress Bar Track BG Color',
		n: 'tertiaryCircularTextOutlineBgDesignProgressBarTrackBGColor',
		dv: '<backgroundColorThree>66',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular_text_background_outline._tertiary ._circular_track',
		np: true,
	},
	{
		gn: 'Circular Progress Track BG Color',
		dn: 'Quaternary Circular Text Outline Bg Design Progress Bar Track BG Color',
		n: 'quaternaryCircularTextOutlineBgDesignProgressBarTrackBGColor',
		dv: '<backgroundColorFour>66',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular_text_background_outline._quaternary ._circular_track',
		np: true,
	},
	{
		gn: 'Circular Progress Track BG Color',
		dn: 'Quinary Circular Text Outline Bg Design Progress Bar Track BG Color',
		n: 'quinaryCircularTextOutlineBgDesignProgressBarTrackBGColor',
		dv: '<backgroundColorFive>66',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular_text_background_outline._quinary ._circular_track',
		np: true,
	},

	{
		gn: 'Circular Progress Track Indicator Color',
		dn: 'Primary Circular Design Progress Bar Track Indicator Color',
		n: 'primaryCircularDesignProgressBarTrackIndicatorColor',
		dv: '<backgroundColorOne>',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular._primary ._circular_progress_indicator',
		np: true,
	},
	{
		gn: 'Circular Progress Track Indicator Color',
		dn: 'Secondary Circular Design Progress Bar Track Indicator Color',
		n: 'secondaryCircularDesignProgressBarTrackIndicatorColor',
		dv: '<backgroundColorTwo>',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular._secondary ._circular_progress_indicator',
		np: true,
	},
	{
		gn: 'Circular Progress Track Indicator Color',
		dn: 'Tertiary Circular Design Progress Bar Track Indicator Color',
		n: 'tertiaryCircularDesignProgressBarTrackIndicatorColor',
		dv: '<backgroundColorThree>',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular._tertiary ._circular_progress_indicator',
		np: true,
	},
	{
		gn: 'Circular Progress Track Indicator Color',
		dn: 'Quaternary Circular Design Progress Bar Track Indicator Color',
		n: 'quaternaryCircularDesignProgressBarTrackIndicatorColor',
		dv: '<backgroundColorFour>',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular._quaternary ._circular_progress_indicator',
		np: true,
	},
	{
		gn: 'Circular Progress Track Indicator Color',
		dn: 'Quinary Circular Design Progress Bar Track Indicator Color',
		n: 'quinaryCircularDesignProgressBarTrackIndicatorColor',
		dv: '<backgroundColorFive>',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular._quinary ._circular_progress_indicator',
		np: true,
	},

	{
		gn: 'Circular Progress Track Indicator Color',
		dn: 'Primary Circular Text Bg Design Progress Bar Track Indicator Color',
		n: 'primaryCircularTextBgDesignProgressBarTrackIndicatorColor',
		dv: '<backgroundColorOne>',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular_text_background._primary ._circular_progress_indicator',
		np: true,
	},
	{
		gn: 'Circular Progress Track Indicator Color',
		dn: 'Secondary Circular Text Bg Design Progress Bar Track Indicator Color',
		n: 'secondaryCircularTextBgDesignProgressBarTrackIndicatorColor',
		dv: '<backgroundColorTwo>',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular_text_background._secondary ._circular_progress_indicator',
		np: true,
	},
	{
		gn: 'Circular Progress Track Indicator Color',
		dn: 'Tertiary Circular Text Bg Design Progress Bar Track Indicator Color',
		n: 'tertiaryCircularTextBgDesignProgressBarTrackIndicatorColor',
		dv: '<backgroundColorThree>',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular_text_background._tertiary ._circular_progress_indicator',
		np: true,
	},
	{
		gn: 'Circular Progress Track Indicator Color',
		dn: 'Quaternary Circular Text Bg Design Progress Bar Track Indicator Color',
		n: 'quaternaryCircularTextBgDesignProgressBarTrackIndicatorColor',
		dv: '<backgroundColorFour>',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular_text_background._quaternary ._circular_progress_indicator',
		np: true,
	},
	{
		gn: 'Circular Progress Track Indicator Color',
		dn: 'Quinary Circular Text Bg Design Progress Bar Track Indicator Color',
		n: 'quinaryCircularTextBgDesignProgressBarTrackIndicatorColor',
		dv: '<backgroundColorFive>',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular_text_background._quinary ._circular_progress_indicator',
		np: true,
	},

	{
		gn: 'Circular Progress Track Indicator Color',
		dn: 'Primary Circular Text Outline Bg Design Progress Bar Track Indicator Color',
		n: 'primaryCircularTextOutlineBgDesignProgressBarTrackIndicatorColor',
		dv: '<backgroundColorOne>',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular_text_background_outline._primary ._circular_progress_indicator',
		np: true,
	},
	{
		gn: 'Circular Progress Track Indicator Color',
		dn: 'Secondary Circular Text Outline Bg Design Progress Bar Track Indicator Color',
		n: 'secondaryCircularTextOutlineBgDesignProgressBarTrackIndicatorColor',
		dv: '<backgroundColorTwo>',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular_text_background_outline._secondary ._circular_progress_indicator',
		np: true,
	},
	{
		gn: 'Circular Progress Track Indicator Color',
		dn: 'Tertiary Circular Text Outline Bg Design Progress Bar Track Indicator Color',
		n: 'tertiaryCircularTextOutlineBgDesignProgressBarTrackIndicatorColor',
		dv: '<backgroundColorThree>',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular_text_background_outline._tertiary ._circular_progress_indicator',
		np: true,
	},
	{
		gn: 'Circular Progress Track Indicator Color',
		dn: 'Quaternary Circular Text Outline Bg Design Progress Bar Track Indicator Color',
		n: 'quaternaryCircularTextOutlineBgDesignProgressBarTrackIndicatorColor',
		dv: '<backgroundColorFour>',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular_text_background_outline._quaternary ._circular_progress_indicator',
		np: true,
	},
	{
		gn: 'Circular Progress Track Indicator Color',
		dn: 'Quinary Circular Text Outline Bg Design Progress Bar Track Indicator Color',
		n: 'quinaryCircularTextOutlineBgDesignProgressBarTrackIndicatorColor',
		dv: '<backgroundColorFive>',
		cp: 'stroke',
		sel: '.comp.compProgressBar._circular_text_background_outline._quinary ._circular_progress_indicator',
		np: true,
	},

	{
		gn: 'Circular Progress Indicator Text Color',
		dn: 'Primary Circular Design Progress Bar Text Color',
		n: 'primaryCircularDesignProgressBarTextColor',
		dv: '<fontColorThree>',
		cp: 'color',
		sel: '.comp.compProgressBar._circular._primary ._circular_label',
		np: true,
	},
	{
		gn: 'Circular Progress Indicator Text Color',
		dn: 'Secondary Circular Design Progress Bar Text Color',
		n: 'secondaryCircularDesignProgressBarTextColor',
		dv: '<fontColorFour>',
		cp: 'color',
		sel: '.comp.compProgressBar._circular._secondary ._circular_label',
		np: true,
	},
	{
		gn: 'Circular Progress Indicator Text Color',
		dn: 'Tertiary Circular Design Progress Bar Text Color',
		n: 'tertiaryCircularDesignProgressBarTextColor',
		dv: '<fontColorFive>',
		cp: 'color',
		sel: '.comp.compProgressBar._circular._tertiary ._circular_label',
		np: true,
	},
	{
		gn: 'Circular Progress Indicator Text Color',
		dn: 'Quaternary Circular Design Progress Bar Text Color',
		n: 'quaternaryCircularDesignProgressBarTextColor',
		dv: '<fontColorNine>',
		cp: 'color',
		sel: '.comp.compProgressBar._circular._quaternary ._circular_label',
		np: true,
	},
	{
		gn: 'Circular Progress Indicator Text Color',
		dn: 'Quinary Circular Design Progress Bar Text Color',
		n: 'quinaryCircularDesignProgressBarTextColor',
		dv: '<fontColorSeven>',
		cp: 'color',
		sel: '.comp.compProgressBar._circular._quinary ._circular_label',
		np: true,
	},

	{
		gn: 'Circular Progress Indicator Text Color',
		dn: 'Primary Circular Text Bg Design Progress Bar Text Color',
		n: 'primaryCircularTextBgDesignProgressBarTextColor',
		dv: '<fontColorThree>',
		cp: 'color',
		sel: '.comp.compProgressBar._circular_text_background._primary ._circular_label',
		np: true,
	},
	{
		gn: 'Circular Progress Indicator Text Color',
		dn: 'Secondary Circular Text Bg Design Progress Bar Text Color',
		n: 'secondaryCircularTextBgDesignProgressBarTextColor',
		dv: '<fontColorFour>',
		cp: 'color',
		sel: '.comp.compProgressBar._circular_text_background._secondary ._circular_label',
		np: true,
	},
	{
		gn: 'Circular Progress Indicator Text Color',
		dn: 'Tertiary Circular Text Bg Design Progress Bar Text Color',
		n: 'tertiaryCircularTextBgDesignProgressBarTextColor',
		dv: '<fontColorFive>',
		cp: 'color',
		sel: '.comp.compProgressBar._circular_text_background._tertiary ._circular_label',
		np: true,
	},
	{
		gn: 'Circular Progress Indicator Text Color',
		dn: 'Quaternary Circular Text Bg Design Progress Bar Text Color',
		n: 'quaternaryCircularTextBgDesignProgressBarTextColor',
		dv: '<fontColorNine>',
		cp: 'color',
		sel: '.comp.compProgressBar._circular_text_background._quaternary ._circular_label',
		np: true,
	},
	{
		gn: 'Circular Progress Indicator Text Color',
		dn: 'Quinary Circular Text Bg Design Progress Bar Text Color',
		n: 'quinaryCircularTextBgDesignProgressBarTextColor',
		dv: '<fontColorSeven>',
		cp: 'color',
		sel: '.comp.compProgressBar._circular_text_background._quinary ._circular_label',
		np: true,
	},

	{
		gn: 'Circular Progress Indicator Text Color',
		dn: 'Primary Circular Text Outline Bg Design Progress Bar Text Color',
		n: 'primaryCircularTextOutlineBgDesignProgressBarTextColor',
		dv: '<fontColorTwo>',
		cp: 'color',
		sel: '.comp.compProgressBar._circular_text_background_outline._primary ._circular_label',
		np: true,
	},
	{
		gn: 'Circular Progress Indicator Text Color',
		dn: 'Secondary Circular Text Outline Bg Design Progress Bar Text Color',
		n: 'secondaryCircularTextOutlineBgDesignProgressBarTextColor',
		dv: '<fontColorTwo>',
		cp: 'color',
		sel: '.comp.compProgressBar._circular_text_background_outline._secondary ._circular_label',
		np: true,
	},
	{
		gn: 'Circular Progress Indicator Text Color',
		dn: 'Tertiary Circular Text Outline Bg Design Progress Bar Text Color',
		n: 'tertiaryCircularTextOutlineBgDesignProgressBarTextColor',
		dv: '<fontColorTwo>',
		cp: 'color',
		sel: '.comp.compProgressBar._circular_text_background_outline._tertiary ._circular_label',
		np: true,
	},
	{
		gn: 'Circular Progress Indicator Text Color',
		dn: 'Quaternary Circular Text Outline Bg Design Progress Bar Text Color',
		n: 'quaternaryCircularTextOutlineBgDesignProgressBarTextColor',
		dv: '<fontColorTwo>',
		cp: 'color',
		sel: '.comp.compProgressBar._circular_text_background_outline._quaternary ._circular_label',
		np: true,
	},
	{
		gn: 'Circular Progress Indicator Text Color',
		dn: 'Quinary Circular Text Outline Bg Design Progress Bar Text Color',
		n: 'quinaryCircularTextOutlineBgDesignProgressBarTextColor',
		dv: '<fontColorTwo>',
		cp: 'color',
		sel: '.comp.compProgressBar._circular_text_background_outline._quinary ._circular_label',
		np: true,
	},

	{
		gn: 'Circular Progress Label BG Color',
		dn: 'Primary Circular Design Progress Bar Text Background Color',
		n: 'primaryCircularDesignProgressBarTextBackgroundColor',
		dv: '<backgroundColorOne>66',
		cp: 'fill',
		sel: '.comp.compProgressBar._circular._primary ._circular_progres_text_bg',
		np: true,
	},
	{
		gn: 'Circular Progress Label BG Color',
		dn: 'Secondary Circular Design Progress Bar Text Background Color',
		n: 'secondaryCircularDesignProgressBarTextBackgroundColor',
		dv: '<backgroundColorTwo>66',
		cp: 'fill',
		sel: '.comp.compProgressBar._circular._secondary ._circular_progres_text_bg',
		np: true,
	},
	{
		gn: 'Circular Progress Label BG Color',
		dn: 'Tertiary Circular Design Progress Bar Text Background Color',
		n: 'tertiaryCircularDesignProgressBarTextBackgroundColor',
		dv: '<backgroundColorThree>66',
		cp: 'fill',
		sel: '.comp.compProgressBar._circular._tertiary ._circular_progres_text_bg',
		np: true,
	},
	{
		gn: 'Circular Progress Label BG Color',
		dn: 'Quaternary Circular Design Progress Bar Text Background Color',
		n: 'quaternaryCircularDesignProgressBarTextBackgroundColor',
		dv: '<backgroundColorFour>66',
		cp: 'fill',
		sel: '.comp.compProgressBar._circular._quaternary ._circular_progres_text_bg',
		np: true,
	},
	{
		gn: 'Circular Progress Label BG Color',
		dn: 'Quinary Circular Design Progress Bar Text Background Color',
		n: 'quinaryCircularDesignProgressBarTextBackgroundColor',
		dv: '<backgroundColorFive>66',
		cp: 'fill',
		sel: '.comp.compProgressBar._circular._quinary ._circular_progres_text_bg',
		np: true,
	},

	{
		gn: 'Circular Progress Label BG Color',
		dn: 'Primary Circular Text Bg Design Progress Bar Text Background Color',
		n: 'primaryCircularTextBgDesignProgressBarTextBackgroundColor',
		dv: '<backgroundColorOne>66',
		cp: 'fill',
		sel: '.comp.compProgressBar._circular_text_background._primary ._circular_progres_text_bg',
		np: true,
	},
	{
		gn: 'Circular Progress Label BG Color',
		dn: 'Secondary Circular Text Bg Design Progress Bar Text Background Color',
		n: 'secondaryCircularTextBgDesignProgressBarTextBackgroundColor',
		dv: '<backgroundColorTwo>66',
		cp: 'fill',
		sel: '.comp.compProgressBar._circular_text_background._secondary ._circular_progres_text_bg',
		np: true,
	},
	{
		gn: 'Circular Progress Label BG Color',
		dn: 'Tertiary Circular Text Bg Design Progress Bar Text Background Color',
		n: 'tertiaryCircularTextBgDesignProgressBarTextBackgroundColor',
		dv: '<backgroundColorThree>66',
		cp: 'fill',
		sel: '.comp.compProgressBar._circular_text_background._tertiary ._circular_progres_text_bg',
		np: true,
	},
	{
		gn: 'Circular Progress Label BG Color',
		dn: 'Quaternary Circular Text Bg Design Progress Bar Text Background Color',
		n: 'quaternaryCircularTextBgDesignProgressBarTextBackgroundColor',
		dv: '<backgroundColorFour>66',
		cp: 'fill',
		sel: '.comp.compProgressBar._circular_text_background._quaternary ._circular_progres_text_bg',
		np: true,
	},
	{
		gn: 'Circular Progress Label BG Color',
		dn: 'Quinary Circular Text Bg Design Progress Bar Text Background Color',
		n: 'quinaryCircularTextBgDesignProgressBarTextBackgroundColor',
		dv: '<backgroundColorFive>66',
		cp: 'fill',
		sel: '.comp.compProgressBar._circular_text_background._quinary ._circular_progres_text_bg',
		np: true,
	},

	{
		gn: 'Circular Progress Label BG Color',
		dn: 'Primary Circular Text Outline Bg Design Progress Bar Text Background Color',
		n: 'primaryCircularTextOutlineBgDesignProgressBarTextBackgroundColor',
		dv: '<backgroundColorOne>',
		cp: 'fill',
		sel: '.comp.compProgressBar._circular_text_background_outline._primary ._circular_progres_text_bg',
		np: true,
	},
	{
		gn: 'Circular Progress Label BG Color',
		dn: 'Secondary Circular Text Outline Bg Design Progress Bar Text Background Color',
		n: 'secondaryCircularTextOutlineBgDesignProgressBarTextBackgroundColor',
		dv: '<backgroundColorTwo>',
		cp: 'fill',
		sel: '.comp.compProgressBar._circular_text_background_outline._secondary ._circular_progres_text_bg',
		np: true,
	},
	{
		gn: 'Circular Progress Label BG Color',
		dn: 'Tertiary Circular Text Outline Bg Design Progress Bar Text Background Color',
		n: 'tertiaryCircularTextOutlineBgDesignProgressBarTextBackgroundColor',
		dv: '<backgroundColorThree>',
		cp: 'fill',
		sel: '.comp.compProgressBar._circular_text_background_outline._tertiary ._circular_progres_text_bg',
		np: true,
	},
	{
		gn: 'Circular Progress Label BG Color',
		dn: 'Quaternary Circular Text Outline Bg Design Progress Bar Text Background Color',
		n: 'quaternaryCircularTextOutlineBgDesignProgressBarTextBackgroundColor',
		dv: '<backgroundColorFour>',
		cp: 'fill',
		sel: '.comp.compProgressBar._circular_text_background_outline._quaternary ._circular_progres_text_bg',
		np: true,
	},
	{
		gn: 'Circular Progress Label BG Color',
		dn: 'Quinary Circular Text Outline Bg Design Progress Bar Text Background Color',
		n: 'quinaryCircularTextOutlineBgDesignProgressBarTextBackgroundColor',
		dv: '<backgroundColorFive>',
		cp: 'fill',
		sel: '.comp.compProgressBar._circular_text_background_outline._quinary ._circular_progres_text_bg',
		np: true,
	},

	{
		gn: 'Progress Bar Progress Background',
		dn: 'Primary Default Design Progress Bar Progress Bg',
		n: 'primaryDefaultDesignProgressBarProgressBg',
		dv: '<backgroundColorOne>',
		cp: 'background',
		sel: '.comp.compProgressBar._default._primary ._progress',
		np: true,
	},
	{
		gn: 'Progress Bar Progress Background',
		dn: 'Secondary Default Design Progress Bar Progress Bg',
		n: 'secondaryDefaultDesignProgressBarProgressBg',
		dv: '<backgroundColorTwo>',
		cp: 'background',
		sel: '.comp.compProgressBar._default._secondary ._progress',
		np: true,
	},
	{
		gn: 'Progress Bar Progress Background',
		dn: 'Tertiary Default Design Progress Bar Progress Bg',
		n: 'tertiaryDefaultDesignProgressBarProgressBg',
		dv: '<backgroundColorThree>',
		cp: 'background',
		sel: '.comp.compProgressBar._default._tertiary ._progress',
		np: true,
	},
	{
		gn: 'Progress Bar Progress Background',
		dn: 'Quaternary Default Design Progress Bar Progress Bg',
		n: 'quaternaryDefaultDesignProgressBarProgressBg',
		dv: '<backgroundColorFour>',
		cp: 'background',
		sel: '.comp.compProgressBar._default._quaternary ._progress',
		np: true,
	},
	{
		gn: 'Progress Bar Progress Background',
		dn: 'Quinary Default Design Progress Bar Progress Bg',
		n: 'quinaryDefaultDesignProgressBarProgressBg',
		dv: '<backgroundColorFive>',
		cp: 'background',
		sel: '.comp.compProgressBar._default._quinary ._progress',
		np: true,
	},

	{
		gn: 'Progress Bar Progress Background',
		dn: 'Primary Striped Design Progress Bar Progress Bg',
		n: 'primaryStripedDesignProgressBarProgressBg',
		dv: 'repeating-linear-gradient(75deg, <backgroundColorOne>, <backgroundColorOne> 10px, <backgroundColorOne>66 10px, <backgroundColorOne>66 20px)',
		cp: 'background',
		sel: '.comp.compProgressBar._striped._primary ._progress',
		np: true,
	},
	{
		gn: 'Progress Bar Progress Background',
		dn: 'Secondary Striped Design Progress Bar Progress Bg',
		n: 'secondaryStripedDesignProgressBarProgressBg',
		dv: 'repeating-linear-gradient(75deg, <backgroundColorTwo>, <backgroundColorTwo> 10px, <backgroundColorTwo>66 10px, <backgroundColorTwo>66 20px)',
		cp: 'background',
		sel: '.comp.compProgressBar._striped._secondary ._progress',
		np: true,
	},
	{
		gn: 'Progress Bar Progress Background',
		dn: 'Tertiary Striped Design Progress Bar Progress Bg',
		n: 'tertiaryStripedDesignProgressBarProgressBg',
		dv: 'repeating-linear-gradient(75deg, <backgroundColorThree>, <backgroundColorThree> 10px, <backgroundColorThree>66 10px, <backgroundColorThree>66 20px)',
		cp: 'background',
		sel: '.comp.compProgressBar._striped._tertiary ._progress',
		np: true,
	},
	{
		gn: 'Progress Bar Progress Background',
		dn: 'Quaternary Striped Design Progress Bar Progress Bg',
		n: 'quaternaryStripedDesignProgressBarProgressBg',
		dv: 'repeating-linear-gradient(75deg, <backgroundColorFour>, <backgroundColorFour> 10px, <backgroundColorFour>66 10px, <backgroundColorFour>66 20px)',
		cp: 'background',
		sel: '.comp.compProgressBar._striped._quaternary ._progress',
		np: true,
	},
	{
		gn: 'Progress Bar Progress Background',
		dn: 'Quinary Striped Design Progress Bar Progress Bg',
		n: 'quinaryStripedDesignProgressBarProgressBg',
		dv: 'repeating-linear-gradient(75deg, <backgroundColorFive>, <backgroundColorFive> 10px, <backgroundColorFive>66 10px, <backgroundColorFive>66 20px)',
		cp: 'background',
		sel: '.comp.compProgressBar._striped._quinary ._progress',
		np: true,
	},

	{
		gn: 'Progress Text Color Outside',
		dn: 'Primary Default Design Progress Bar Outside Text Color',
		n: 'primaryDefaultDesignProgressBarOutsideTextColor',
		dv: '<backgroundColorOne>',
		cp: 'color',
		sel: '.comp.compProgressBar._default._primary > ._top, .comp.compProgressBar._default._primary > ._bottom',
		np: true,
	},
	{
		gn: 'Progress Text Color Outside',
		dn: 'Secondary Default Design Progress Bar Outside Text Color',
		n: 'secondaryDefaultDesignProgressBarOutsideTextColor',
		dv: '<backgroundColorTwo>',
		cp: 'color',
		sel: '.comp.compProgressBar._default._secondary > ._top, .comp.compProgressBar._default._secondary > ._bottom',
		np: true,
	},
	{
		gn: 'Progress Text Color Outside',
		dn: 'Tertiary Default Design Progress Bar Outside Text Color',
		n: 'tertiaryDefaultDesignProgressBarOutsideTextColor',
		dv: '<backgroundColorThree>',
		cp: 'color',
		sel: '.comp.compProgressBar._default._tertiary > ._top, .comp.compProgressBar._default._tertiary > ._bottom',
		np: true,
	},
	{
		gn: 'Progress Text Color Outside',
		dn: 'Quaternary Default Design Progress Bar Outside Text Color',
		n: 'quaternaryDefaultDesignProgressBarOutsideTextColor',
		dv: '<backgroundColorFour>',
		cp: 'color',
		sel: '.comp.compProgressBar._default._quaternary > ._top, .comp.compProgressBar._default._quaternary > ._bottom',
		np: true,
	},
	{
		gn: 'Progress Text Color Outside',
		dn: 'Quinary Default Design Progress Bar Outside Text Color',
		n: 'quinaryDefaultDesignProgressBarOutsideTextColor',
		dv: '<backgroundColorFive>',
		cp: 'color',
		sel: '.comp.compProgressBar._default._quinary > ._top, .comp.compProgressBar._default._quinary > ._bottom',
		np: true,
	},

	{
		gn: 'Progress Text Color Outside',
		dn: 'Primary Striped Design Progress Bar Outside Text Color',
		n: 'primaryStripedDesignProgressBarOutsideTextColor',
		dv: '<backgroundColorOne>',
		cp: 'color',
		sel: '.comp.compProgressBar._striped._primary > ._top, .comp.compProgressBar._striped._primary > ._bottom',
		np: true,
	},
	{
		gn: 'Progress Text Color Outside',
		dn: 'Secondary Striped Design Progress Bar Outside Text Color',
		n: 'secondaryStripedDesignProgressBarOutsideTextColor',
		dv: '<backgroundColorTwo>',
		cp: 'color',
		sel: '.comp.compProgressBar._striped._secondary > ._top, .comp.compProgressBar._striped._secondary > ._bottom',
		np: true,
	},
	{
		gn: 'Progress Text Color Outside',
		dn: 'Tertiary Striped Design Progress Bar Outside Text Color',
		n: 'tertiaryStripedDesignProgressBarOutsideTextColor',
		dv: '<backgroundColorThree>',
		cp: 'color',
		sel: '.comp.compProgressBar._striped._tertiary > ._top, .comp.compProgressBar._striped._tertiary > ._bottom',
		np: true,
	},
	{
		gn: 'Progress Text Color Outside',
		dn: 'Quaternary Striped Design Progress Bar Outside Text Color',
		n: 'quaternaryStripedDesignProgressBarOutsideTextColor',
		dv: '<backgroundColorFour>',
		cp: 'color',
		sel: '.comp.compProgressBar._striped._quaternary > ._top, .comp.compProgressBar._striped._quaternary > ._bottom',
		np: true,
	},
	{
		gn: 'Progress Text Color Outside',
		dn: 'Quinary Striped Design Progress Bar Outside Text Color',
		n: 'quinaryStripedDesignProgressBarOutsideTextColor',
		dv: '<backgroundColorFive>',
		cp: 'color',
		sel: '.comp.compProgressBar._striped._quinary > ._top, .comp.compProgressBar._striped._quinary > ._bottom',
		np: true,
	},

	{
		gn: 'Progress Bar Font',
		dn: ' Default Design Progress Bar Text Font',
		n: ' DefaultDesignProgressBarTextFont',
		cp: 'font',
		sel: '.comp.compProgressBar._default',
		np: true,
	},
	{
		gn: 'Progress Bar Font',
		dn: ' Striped Design Progress Bar Text Font',
		n: ' StripedDesignProgressBarTextFont',
		cp: 'font',
		sel: '.comp.compProgressBar._striped',
		np: true,
	},
	{
		gn: 'Progress Bar Font',
		dn: ' Circular Design Progress Bar Progress Bar Text Font',
		n: ' CircularDesignProgressBarProgressBarTextFont',
		cp: 'font',
		sel: '.comp.compProgressBar._circular',
		np: true,
	},
	{
		gn: 'Progress Bar Font',
		dn: ' Circular Text Bg Design Progress Bar Progress Bar Text Font',
		n: ' CircularTextBgDesignProgressBarProgressBarTextFont',
		cp: 'font',
		sel: '.comp.compProgressBar._circular_text_background',
		np: true,
	},
	{
		gn: 'Progress Bar Font',
		dn: ' Circular Text Outline Bg Design Progress Bar Progress Bar Text Font',
		n: ' CircularTextOutlineBgDesignProgressBarProgressBarTextFont',
		cp: 'font',
		sel: '.comp.compProgressBar._circular_text_background_outline',
		np: true,
	},
];

export const styleDefaults = new Map<string, string>(
	styleProperties
		.filter(e => !!e.dv)
		.map(({ n: name, dv: defaultValue }) => [name, defaultValue!]),
);
