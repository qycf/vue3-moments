import type { GlobalThemeOverrides } from 'naive-ui'

export const themeOverrides: GlobalThemeOverrides = {
	Input: {
		color: '#f3f3f3',
		colorFocus: '#f3f3f3',
		border: '0',
		borderHover: '0',
		caretColor: '',
		boxShadowFocus: '0',
		borderColor: '#fe4821',
		borderColorHover: '#fe4821',
		borderFocus: '0',
		borderColorDisabled: '#fe4821',
		borderColorFocusHover: '#fe4821',
		borderColorFocusDisabled: '#fe4821',
		borderColorHoverDisabled: '#fe4821',
		borderColorFocusHoverDisabled: '#fe4821',
	},
	common: {
		// primaryColor: '#EC5E42',
		// primaryColorHover: '#CF523A',
		// primaryColorPressed: '#963C2A',
		// primaryColorSuppl: '#4098FC'
	},
	Tabs: {
		tabTextColorActiveLine: '#fe4821',
		tabTextColorHoverLine: '#fe4821',
		tabTextColorLine: '#5d636b',
		tabFontWeight: 'bold',
		tabFontWeightActive: 'bold',
		tabFontSizeMedium: '1.125rem',
		tabGapMediumLine: '0.5rem',
		panePaddingMedium: '0 0 0 0',

		// tabTextColorLine: '#fe4821',
		// tabTextColorActiveSegment: 'red',
	},
	Drawer: {
		headerPadding: '10px 0px',
		headerBorderBottom: '0',
	},
	Menu: {
		itemTextColorActiveHorizontal: '#fe4821',
		itemTextColorActiveVertical: '#fe4821',
		itemTextColorHoverVertical: '#fe4821',
		itemTextColorHoverHorizontal: '#fe4821',
		itemTextColorHorizontal: '#fff',
		itemTextColorActiveHoverHorizontal: '#fe4821',
		itemColorActive: '#f3f3f3',
		itemTextColorActive: '#fe4821',
		itemColorActiveHover: '#f3f3f3',
		itemTextColorActiveHover: '#fe4821',
		fontSize: '15px',
	},
}

export const darkThemeOverrides: GlobalThemeOverrides = {
	Input: {
		color: '#323232',
		colorFocus: '#323232',
		border: '0',
		borderHover: '0',
		caretColor: '',
		boxShadowFocus: '0',
		borderColor: '#fe4821',
		borderColorHover: '#fe4821',
		borderFocus: '0',
		borderColorDisabled: '#fe4821',
		borderColorFocusHover: '#fe4821',
		borderColorFocusDisabled: '#fe4821',
		borderColorHoverDisabled: '#fe4821',
		borderColorFocusHoverDisabled: '#fe4821',
	},
	Menu: {
		itemTextColorActiveHorizontal: '#fe4821',
		itemTextColorActiveVertical: '#fe4821',
		itemTextColorHoverVertical: '#fe4821',
		itemTextColorHoverHorizontal: '#fe4821',
		itemTextColorHorizontal: '#fff',
		itemTextColorActiveHoverHorizontal: '#fe4821',
		itemColorActive: '#161616',
		itemTextColorActive: '#fe4821',
		itemColorActiveHover: '#161616',
		itemTextColorActiveHover: '#fe4821',
		fontSize: '15px',
	},
	Drawer: {
		headerPadding: '10px 0px',
		headerBorderBottom: '0',
	},
	common: {
		// primaryColor: '#EC5E42',
		// primaryColorHover: '#CF523A',
		// primaryColorPressed: '#963C2A',
		// primaryColorSuppl: '#4098FC'
	},
	Tabs: {
		tabColor: '#000',
		// tabTextColorActiveSegment: 'red',
	},
	List: {
		color: '#3c3c3c',
	},
}
