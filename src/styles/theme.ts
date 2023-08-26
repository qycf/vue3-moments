import type { GlobalThemeOverrides } from 'naive-ui'

export const themeOverrides: GlobalThemeOverrides = {
	common: {
		// primaryColor: '#EC5E42',
		// primaryColorHover: '#CF523A',
		// primaryColorPressed: '#963C2A',
		// primaryColorSuppl: '#4098FC'
	},
	Tabs: {
		// tabColor: 'red',
		tabColorSegment: 'red',
		// tabTextColorActiveSegment: 'red',
	},
}

export const darkThemeOverrides: GlobalThemeOverrides = {
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
