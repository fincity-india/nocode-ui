import { StyleGroupDefinition, StylePropertyDefinition } from '../../types/common';

export const styleProperties: Array<StylePropertyDefinition> = [
	{
		groupName: 'Font',
		displayName: 'Slider Font',
		name: 'sliderFont',
		defaultValue: '<primaryFont>',
		cssProperty: 'font',
		selector: '.comp.compSmallCarousel',
		noPrefix: true,
	},
	{
		groupName: 'Text Color',
		displayName: 'Slider Font Color',
		name: 'sliderFontColor',
		defaultValue: '<fontColorOne>',
		cssProperty: 'color',
		selector: '.comp.compSmallCarousel',
		noPrefix: true,
	},

	{
		groupName: 'Design One',
		displayName: ' Slider ContainerBackground ColorDesign One',
		name: ' SliderContainerBackgroundColorDesignOne',
		cssProperty: 'background',
		selector: '.comp.compSmallCarousel._design1',
		noPrefix: true,
	},
	{
		groupName: 'Design Two',
		displayName: ' Slider ContainerBackground ColorDesign Two',
		name: ' SliderContainerBackgroundColorDesignTwo',
		cssProperty: 'background',
		selector: '.comp.compSmallCarousel._design2',
		noPrefix: true,
	},
	{
		groupName: 'Design Three',
		displayName: ' Slider ContainerBackground ColorDesign Three',
		name: ' SliderContainerBackgroundColorDesignThree',
		cssProperty: 'background',
		selector: '.comp.compSmallCarousel._design3',
		noPrefix: true,
	},
	{
		groupName: 'Design Four',
		displayName: ' Slider ContainerBackground ColorDesign Four',
		name: ' SliderContainerBackgroundColorDesignFour',
		cssProperty: 'background',
		selector: '.comp.compSmallCarousel._design4',
		noPrefix: true,
	},
	{
		groupName: 'Design Five',
		displayName: ' Slider ContainerBackground ColorDesign Five',
		name: ' SliderContainerBackgroundColorDesignFive',
		cssProperty: 'background',
		selector: '.comp.compSmallCarousel._design5',
		noPrefix: true,
	},

	{
		groupName: 'Design One',
		displayName: ' Slider ContainerPaddingDesign One',
		name: ' SliderContainerPaddingDesignOne',
		defaultValue: '20px 0px 20px 0px',
		cssProperty: 'padding',
		selector: '.comp.compSmallCarousel._design1',
		noPrefix: true,
	},
	{
		groupName: 'Design Two',
		displayName: ' Slider ContainerPaddingDesign Two',
		name: ' SliderContainerPaddingDesignTwo',
		defaultValue: '20px 0px 20px 0px',
		cssProperty: 'padding',
		selector: '.comp.compSmallCarousel._design2',
		noPrefix: true,
	},
	{
		groupName: 'Design Three',
		displayName: ' Slider ContainerPaddingDesign Three',
		name: ' SliderContainerPaddingDesignThree',
		defaultValue: '20px 0px 20px 0px',
		cssProperty: 'padding',
		selector: '.comp.compSmallCarousel._design3',
		noPrefix: true,
	},
	{
		groupName: 'Design Four',
		displayName: ' Slider ContainerPaddingDesign Four',
		name: ' SliderContainerPaddingDesignFour',
		defaultValue: '20px 0px 20px 0px',
		cssProperty: 'padding',
		selector: '.comp.compSmallCarousel._design4',
		noPrefix: true,
	},
	{
		groupName: 'Design Five',
		displayName: ' Slider ContainerPaddingDesign Five',
		name: ' SliderContainerPaddingDesignFive',
		defaultValue: '20px 0px 20px 0px',
		cssProperty: 'padding',
		selector: '.comp.compSmallCarousel._design5',
		noPrefix: true,
	},

	{
		groupName: 'Design One',
		displayName: ' Slider Arrow ButtonColorDesign One',
		name: ' SliderArrowButtonColorDesignOne',
		cssProperty: 'color',
		selector: '.comp.compSmallCarousel._design1 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Two',
		displayName: ' Slider Arrow ButtonColorDesign Two',
		name: ' SliderArrowButtonColorDesignTwo',
		defaultValue: '<fontColorOne>',
		cssProperty: 'color',
		selector: '.comp.compSmallCarousel._design2 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Three',
		displayName: ' Slider Arrow ButtonColorDesign Three',
		name: ' SliderArrowButtonColorDesignThree',
		defaultValue: '<fontColorEight>',
		cssProperty: 'color',
		selector: '.comp.compSmallCarousel._design3 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Four',
		displayName: ' Slider Arrow ButtonColorDesign Four',
		name: ' SliderArrowButtonColorDesignFour',
		defaultValue: '<fontColorOne>',
		cssProperty: 'color',
		selector: '.comp.compSmallCarousel._design4 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Five',
		displayName: ' Slider Arrow ButtonColorDesign Five',
		name: ' SliderArrowButtonColorDesignFive',
		defaultValue: '<fontColorEight>',
		cssProperty: 'color',
		selector: '.comp.compSmallCarousel._design5 .button',
		noPrefix: true,
	},

	{
		groupName: 'Design One',
		displayName: ' Slider Arrow ButtonBackgroundColorDesign One',
		name: ' SliderArrowButtonBackgroundColorDesignOne',
		cssProperty: 'background',
		selector: '.comp.compSmallCarousel._design1 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Two',
		displayName: ' Slider Arrow ButtonBackgroundColorDesign Two',
		name: ' SliderArrowButtonBackgroundColorDesignTwo',
		cssProperty: 'background',
		selector: '.comp.compSmallCarousel._design2 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Three',
		displayName: ' Slider Arrow ButtonBackgroundColorDesign Three',
		name: ' SliderArrowButtonBackgroundColorDesignThree',
		cssProperty: 'background',
		selector: '.comp.compSmallCarousel._design3 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Four',
		displayName: ' Slider Arrow ButtonBackgroundColorDesign Four',
		name: ' SliderArrowButtonBackgroundColorDesignFour',
		cssProperty: 'background',
		selector: '.comp.compSmallCarousel._design4 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Five',
		displayName: ' Slider Arrow ButtonBackgroundColorDesign Five',
		name: ' SliderArrowButtonBackgroundColorDesignFive',
		cssProperty: 'background',
		selector: '.comp.compSmallCarousel._design5 .button',
		noPrefix: true,
	},

	{
		groupName: 'Design One',
		displayName: ' Slider Arrow Button BorderDesign One',
		name: ' SliderArrowButtonBorderDesignOne',
		defaultValue: '1px solid',
		cssProperty: 'border',
		selector: '.comp.compSmallCarousel._design1 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Two',
		displayName: ' Slider Arrow Button BorderDesign Two',
		name: ' SliderArrowButtonBorderDesignTwo',
		defaultValue: '1px solid',
		cssProperty: 'border',
		selector: '.comp.compSmallCarousel._design2 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Three',
		displayName: ' Slider Arrow Button BorderDesign Three',
		name: ' SliderArrowButtonBorderDesignThree',
		defaultValue: '1px solid',
		cssProperty: 'border',
		selector: '.comp.compSmallCarousel._design3 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Four',
		displayName: ' Slider Arrow Button BorderDesign Four',
		name: ' SliderArrowButtonBorderDesignFour',
		defaultValue: '1px solid',
		cssProperty: 'border',
		selector: '.comp.compSmallCarousel._design4 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Five',
		displayName: ' Slider Arrow Button BorderDesign Five',
		name: ' SliderArrowButtonBorderDesignFive',
		defaultValue: '1px solid',
		cssProperty: 'border',
		selector: '.comp.compSmallCarousel._design5 .button',
		noPrefix: true,
	},

	{
		groupName: 'Design One',
		displayName: ' Slider Arrow Button Border ColorDesign One',
		name: ' SliderArrowButtonBorderColorDesignOne',
		defaultValue: 'transparent ',
		cssProperty: 'border-color',
		selector: '.comp.compSmallCarousel._design1 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Two',
		displayName: ' Slider Arrow Button Border ColorDesign Two',
		name: ' SliderArrowButtonBorderColorDesignTwo',
		defaultValue: 'transparent ',
		cssProperty: 'border-color',
		selector: '.comp.compSmallCarousel._design2 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Three',
		displayName: ' Slider Arrow Button Border ColorDesign Three',
		name: ' SliderArrowButtonBorderColorDesignThree',
		defaultValue: 'transparent ',
		cssProperty: 'border-color',
		selector: '.comp.compSmallCarousel._design3 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Four',
		displayName: ' Slider Arrow Button Border ColorDesign Four',
		name: ' SliderArrowButtonBorderColorDesignFour',
		defaultValue: 'transparent ',
		cssProperty: 'border-color',
		selector: '.comp.compSmallCarousel._design4 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Five',
		displayName: ' Slider Arrow Button Border ColorDesign Five',
		name: ' SliderArrowButtonBorderColorDesignFive',
		defaultValue: 'transparent ',
		cssProperty: 'border-color',
		selector: '.comp.compSmallCarousel._design5 .button',
		noPrefix: true,
	},

	{
		groupName: 'Design One',
		displayName: ' Slider Arrow Button PaddingDesign One',
		name: ' SliderArrowButtonPaddingDesignOne',
		defaultValue: '4px',
		cssProperty: 'padding',
		selector: '.comp.compSmallCarousel._design1 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Two',
		displayName: ' Slider Arrow Button PaddingDesign Two',
		name: ' SliderArrowButtonPaddingDesignTwo',
		defaultValue: '4px',
		cssProperty: 'padding',
		selector: '.comp.compSmallCarousel._design2 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Three',
		displayName: ' Slider Arrow Button PaddingDesign Three',
		name: ' SliderArrowButtonPaddingDesignThree',
		defaultValue: '4px',
		cssProperty: 'padding',
		selector: '.comp.compSmallCarousel._design3 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Four',
		displayName: ' Slider Arrow Button PaddingDesign Four',
		name: ' SliderArrowButtonPaddingDesignFour',
		defaultValue: '4px',
		cssProperty: 'padding',
		selector: '.comp.compSmallCarousel._design4 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Five',
		displayName: ' Slider Arrow Button PaddingDesign Five',
		name: ' SliderArrowButtonPaddingDesignFive',
		defaultValue: '4px',
		cssProperty: 'padding',
		selector: '.comp.compSmallCarousel._design5 .button',
		noPrefix: true,
	},

	{
		groupName: 'Design One',
		displayName: ' Slider Arrow Button Border RadiusDesign One',
		name: ' SliderArrowButtonBorderRadiusDesignOne',
		defaultValue: '4px',
		cssProperty: 'border-radius',
		selector: '.comp.compSmallCarousel._design1 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Two',
		displayName: ' Slider Arrow Button Border RadiusDesign Two',
		name: ' SliderArrowButtonBorderRadiusDesignTwo',
		defaultValue: '4px',
		cssProperty: 'border-radius',
		selector: '.comp.compSmallCarousel._design2 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Three',
		displayName: ' Slider Arrow Button Border RadiusDesign Three',
		name: ' SliderArrowButtonBorderRadiusDesignThree',
		defaultValue: '4px',
		cssProperty: 'border-radius',
		selector: '.comp.compSmallCarousel._design3 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Four',
		displayName: ' Slider Arrow Button Border RadiusDesign Four',
		name: ' SliderArrowButtonBorderRadiusDesignFour',
		defaultValue: '4px',
		cssProperty: 'border-radius',
		selector: '.comp.compSmallCarousel._design4 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Five',
		displayName: ' Slider Arrow Button Border RadiusDesign Five',
		name: ' SliderArrowButtonBorderRadiusDesignFive',
		defaultValue: '4px',
		cssProperty: 'border-radius',
		selector: '.comp.compSmallCarousel._design5 .button',
		noPrefix: true,
	},

	{
		groupName: 'Design One',
		displayName: ' Slider Arrow Button Font SizeDesign One',
		name: ' SliderArrowButtonFontSizeDesignOne',
		cssProperty: 'font-size',
		selector: '.comp.compSmallCarousel._design1 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Two',
		displayName: ' Slider Arrow Button Font SizeDesign Two',
		name: ' SliderArrowButtonFontSizeDesignTwo',
		cssProperty: 'font-size',
		selector: '.comp.compSmallCarousel._design2 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Three',
		displayName: ' Slider Arrow Button Font SizeDesign Three',
		name: ' SliderArrowButtonFontSizeDesignThree',
		cssProperty: 'font-size',
		selector: '.comp.compSmallCarousel._design3 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Four',
		displayName: ' Slider Arrow Button Font SizeDesign Four',
		name: ' SliderArrowButtonFontSizeDesignFour',
		cssProperty: 'font-size',
		selector: '.comp.compSmallCarousel._design4 .button',
		noPrefix: true,
	},
	{
		groupName: 'Design Five',
		displayName: ' Slider Arrow Button Font SizeDesign Five',
		name: ' SliderArrowButtonFontSizeDesignFive',
		cssProperty: 'font-size',
		selector: '.comp.compSmallCarousel._design5 .button',
		noPrefix: true,
	},

	{
		groupName: 'Design One',
		displayName: ' Slider Arrow Button BorderDesign One',
		name: ' SliderArrowButtonBorderDesignOne',
		defaultValue: '1px solid',
		cssProperty: 'border',
		selector: '.comp.compSmallCarousel._design1 .childElement',
		noPrefix: true,
	},
	{
		groupName: 'Design Two',
		displayName: ' Slider Arrow Button BorderDesign Two',
		name: ' SliderArrowButtonBorderDesignTwo',
		defaultValue: '1px solid',
		cssProperty: 'border',
		selector: '.comp.compSmallCarousel._design2 .childElement',
		noPrefix: true,
	},
	{
		groupName: 'Design Three',
		displayName: ' Slider Arrow Button BorderDesign Three',
		name: ' SliderArrowButtonBorderDesignThree',
		defaultValue: '1px solid',
		cssProperty: 'border',
		selector: '.comp.compSmallCarousel._design3 .childElement',
		noPrefix: true,
	},
	{
		groupName: 'Design Four',
		displayName: ' Slider Arrow Button BorderDesign Four',
		name: ' SliderArrowButtonBorderDesignFour',
		defaultValue: '1px solid',
		cssProperty: 'border',
		selector: '.comp.compSmallCarousel._design4 .childElement',
		noPrefix: true,
	},
	{
		groupName: 'Design Five',
		displayName: ' Slider Arrow Button BorderDesign Five',
		name: ' SliderArrowButtonBorderDesignFive',
		defaultValue: '1px solid',
		cssProperty: 'border',
		selector: '.comp.compSmallCarousel._design5 .childElement',
		noPrefix: true,
	},

	{
		groupName: 'Design One',
		displayName: ' Slider Arrow Button Border ColorDesign One',
		name: ' SliderArrowButtonBorderColorDesignOne',
		defaultValue: 'transparent ',
		cssProperty: 'border-color',
		selector: '.comp.compSmallCarousel._design1 .childElement',
		noPrefix: true,
	},
	{
		groupName: 'Design Two',
		displayName: ' Slider Arrow Button Border ColorDesign Two',
		name: ' SliderArrowButtonBorderColorDesignTwo',
		defaultValue: 'transparent ',
		cssProperty: 'border-color',
		selector: '.comp.compSmallCarousel._design2 .childElement',
		noPrefix: true,
	},
	{
		groupName: 'Design Three',
		displayName: ' Slider Arrow Button Border ColorDesign Three',
		name: ' SliderArrowButtonBorderColorDesignThree',
		defaultValue: '<borderColorTwo>',
		cssProperty: 'border-color',
		selector: '.comp.compSmallCarousel._design3 .childElement',
		noPrefix: true,
	},
	{
		groupName: 'Design Four',
		displayName: ' Slider Arrow Button Border ColorDesign Four',
		name: ' SliderArrowButtonBorderColorDesignFour',
		defaultValue: 'transparent ',
		cssProperty: 'border-color',
		selector: '.comp.compSmallCarousel._design4 .childElement',
		noPrefix: true,
	},
	{
		groupName: 'Design Five',
		displayName: ' Slider Arrow Button Border ColorDesign Five',
		name: ' SliderArrowButtonBorderColorDesignFive',
		defaultValue: '<borderColorTwo>',
		cssProperty: 'border-color',
		selector: '.comp.compSmallCarousel._design5 .childElement',
		noPrefix: true,
	},

	{
		groupName: 'Design One',
		displayName: ' Slider Arrow Button Border RadiusDesign One',
		name: ' SliderArrowButtonBorderRadiusDesignOne',
		defaultValue: '4px',
		cssProperty: 'border-radius',
		selector: '.comp.compSmallCarousel._design1 .childElement',
		noPrefix: true,
	},
	{
		groupName: 'Design Two',
		displayName: ' Slider Arrow Button Border RadiusDesign Two',
		name: ' SliderArrowButtonBorderRadiusDesignTwo',
		defaultValue: '4px',
		cssProperty: 'border-radius',
		selector: '.comp.compSmallCarousel._design2 .childElement',
		noPrefix: true,
	},
	{
		groupName: 'Design Three',
		displayName: ' Slider Arrow Button Border RadiusDesign Three',
		name: ' SliderArrowButtonBorderRadiusDesignThree',
		defaultValue: '4px',
		cssProperty: 'border-radius',
		selector: '.comp.compSmallCarousel._design3 .childElement',
		noPrefix: true,
	},
	{
		groupName: 'Design Four',
		displayName: ' Slider Arrow Button Border RadiusDesign Four',
		name: ' SliderArrowButtonBorderRadiusDesignFour',
		defaultValue: '4px',
		cssProperty: 'border-radius',
		selector: '.comp.compSmallCarousel._design4 .childElement',
		noPrefix: true,
	},
	{
		groupName: 'Design Five',
		displayName: ' Slider Arrow Button Border RadiusDesign Five',
		name: ' SliderArrowButtonBorderRadiusDesignFive',
		defaultValue: '4px',
		cssProperty: 'border-radius',
		selector: '.comp.compSmallCarousel._design5 .childElement',
		noPrefix: true,
	},

	{
		groupName: 'Design One',
		displayName: ' Slider Arrow Button Padding Design One',
		name: ' SliderArrowButtonPaddingDesignOne',
		defaultValue: '0px 20px 0px 20px ',
		cssProperty: 'padding',
		selector: '.comp.compSmallCarousel._design1 .childElement',
		noPrefix: true,
	},
	{
		groupName: 'Design Two',
		displayName: ' Slider Arrow Button Padding Design Two',
		name: ' SliderArrowButtonPaddingDesignTwo',
		defaultValue: '20px 20px 20px 20px ',
		cssProperty: 'padding',
		selector: '.comp.compSmallCarousel._design2 .childElement',
		noPrefix: true,
	},
	{
		groupName: 'Design Three',
		displayName: ' Slider Arrow Button Padding Design Three',
		name: ' SliderArrowButtonPaddingDesignThree',
		defaultValue: '0px 20px 0px 20px ',
		cssProperty: 'padding',
		selector: '.comp.compSmallCarousel._design3 .childElement',
		noPrefix: true,
	},
	{
		groupName: 'Design Four',
		displayName: ' Slider Arrow Button Padding Design Four',
		name: ' SliderArrowButtonPaddingDesignFour',
		defaultValue: '20px 20px 20px 20px ',
		cssProperty: 'padding',
		selector: '.comp.compSmallCarousel._design4 .childElement',
		noPrefix: true,
	},
	{
		groupName: 'Design Five',
		displayName: ' Slider Arrow Button Padding Design Five',
		name: ' SliderArrowButtonPaddingDesignFive',
		defaultValue: '0px 20px 0px 20px ',
		cssProperty: 'padding',
		selector: '.comp.compSmallCarousel._design5 .childElement',
		noPrefix: true,
	},

	{
		groupName: 'Design One',
		displayName: ' Slider Arrow Button Box Shadow Design One',
		name: ' SliderArrowButtonBoxShadowDesignOne',
		cssProperty: 'box-shadow',
		selector: '.comp.compSmallCarousel._design1 .childElement',
		noPrefix: true,
	},
	{
		groupName: 'Design Two',
		displayName: ' Slider Arrow Button Box Shadow Design Two',
		name: ' SliderArrowButtonBoxShadowDesignTwo',
		cssProperty: 'box-shadow',
		selector: '.comp.compSmallCarousel._design2 .childElement',
		noPrefix: true,
	},
	{
		groupName: 'Design Three',
		displayName: ' Slider Arrow Button Box Shadow Design Three',
		name: ' SliderArrowButtonBoxShadowDesignThree',
		cssProperty: 'box-shadow',
		selector: '.comp.compSmallCarousel._design3 .childElement',
		noPrefix: true,
	},
	{
		groupName: 'Design Four',
		displayName: ' Slider Arrow Button Box Shadow Design Four',
		name: ' SliderArrowButtonBoxShadowDesignFour',
		cssProperty: 'box-shadow',
		selector: '.comp.compSmallCarousel._design4 .childElement',
		noPrefix: true,
	},
	{
		groupName: 'Design Five',
		displayName: ' Slider Arrow Button Box Shadow Design Five',
		name: ' SliderArrowButtonBoxShadowDesignFive',
		cssProperty: 'box-shadow',
		selector: '.comp.compSmallCarousel._design5 .childElement',
		noPrefix: true,
	},

	{
		groupName: 'Design One',
		displayName: ' Slider Arrow Button Background Design One',
		name: ' SliderArrowButtonBackgroundDesignOne',
		cssProperty: 'background',
		selector: '.comp.compSmallCarousel._design1 .childElement',
		noPrefix: true,
	},
	{
		groupName: 'Design Two',
		displayName: ' Slider Arrow Button Background Design Two',
		name: ' SliderArrowButtonBackgroundDesignTwo',
		cssProperty: 'background',
		selector: '.comp.compSmallCarousel._design2 .childElement',
		noPrefix: true,
	},
	{
		groupName: 'Design Three',
		displayName: ' Slider Arrow Button Background Design Three',
		name: ' SliderArrowButtonBackgroundDesignThree',
		cssProperty: 'background',
		selector: '.comp.compSmallCarousel._design3 .childElement',
		noPrefix: true,
	},
	{
		groupName: 'Design Four',
		displayName: ' Slider Arrow Button Background Design Four',
		name: ' SliderArrowButtonBackgroundDesignFour',
		cssProperty: 'background',
		selector: '.comp.compSmallCarousel._design4 .childElement',
		noPrefix: true,
	},
	{
		groupName: 'Design Five',
		displayName: ' Slider Arrow Button Background Design Five',
		name: ' SliderArrowButtonBackgroundDesignFive',
		cssProperty: 'background',
		selector: '.comp.compSmallCarousel._design5 .childElement',
		noPrefix: true,
	},

	{
		groupName: 'Design One',
		displayName: ' Slider Arrow Button Scale CenterDesign One',
		name: ' SliderArrowButtonScaleCenterDesignOne',
		cssProperty: 'transform',
		selector: '.comp.compSmallCarousel._design1 .childElement.center',
		noPrefix: true,
	},
	{
		groupName: 'Design Two',
		displayName: ' Slider Arrow Button Scale CenterDesign Two',
		name: ' SliderArrowButtonScaleCenterDesignTwo',
		defaultValue: 'scale(1.1) translateX(20px)',
		cssProperty: 'transform',
		selector: '.comp.compSmallCarousel._design2 .childElement.center',
		noPrefix: true,
	},
	{
		groupName: 'Design Three',
		displayName: ' Slider Arrow Button Scale CenterDesign Three',
		name: ' SliderArrowButtonScaleCenterDesignThree',
		cssProperty: 'transform',
		selector: '.comp.compSmallCarousel._design3 .childElement.center',
		noPrefix: true,
	},
	{
		groupName: 'Design Four',
		displayName: ' Slider Arrow Button Scale CenterDesign Four',
		name: ' SliderArrowButtonScaleCenterDesignFour',
		defaultValue: 'scale(1.1) translateX(20px)',
		cssProperty: 'transform',
		selector: '.comp.compSmallCarousel._design4 .childElement.center',
		noPrefix: true,
	},
	{
		groupName: 'Design Five',
		displayName: ' Slider Arrow Button Scale CenterDesign Five',
		name: ' SliderArrowButtonScaleCenterDesignFive',
		cssProperty: 'transform',
		selector: '.comp.compSmallCarousel._design5 .childElement.center',
		noPrefix: true,
	},
];

export const styleDefaults = new Map<string, string>(
	styleProperties
		.filter(e => !!e.defaultValue)
		.map(({ name, defaultValue }) => [name, defaultValue!]),
);
