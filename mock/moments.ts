import { MockMethod } from 'vite-plugin-mock'

export default [
	{
		url: '/api/mock/gallerys',
		method: 'get',
		response: () => {
			return {
				code: 0,
				data: [
					{
						id: 1,
						name: '风光',
						alias: 'scenery',
						description: '风光风光',
						count: 2,
						cover:
							'https://demo.photo.gallery/content/galleries/landscapes/antarctica.jpg',
					},
					{
						id: 2,
						name: '人文',
						alias: 'humanity',
						description: '人文人文',
						count: 19,
						cover:
							'https://demo.photo.gallery/content/galleries/landscapes/hills.jpg',
					},
					{
						id: 3,
						name: '人像',
						alias: 'portrait',
						description: '关于人像',
						count: 19,
						cover:
							'https://demo.photo.gallery/content/galleries/landscapes/hills.jpg',
					},
					{
						id: 4,
						name: '月亮',
						alias: 'moon',
						description: '白玉盘',
						count: 19,
						cover:
							'https://demo.photo.gallery/content/galleries/landscapes/hills.jpg',
					},
				],
			}
		},
	},
	{
		url: '/api/mock/momments/:alias',
		method: 'get',
		response: ({ query }) => {
			return {
				code: 0,
				data: {
					id: 1,
					title: '风光',
					description: '风光风光',
					author: '秋月2525',
					alias: query.alias,
					cover:
						'https://demo.photo.gallery/content/galleries/landscapes/antarctica.jpg',
					momments: [
						{
							id: 2,
							isTop: 1,
							tags: ['scenery', 'portrait'],
							content:
								'<p><a href="http://localhost:5173/"><span style="color: rgb(212, 177, 6);">#庆余年2#</span></a>什么时候可以看呢？😅</p>这是一条动态这是一条动态这是一条动态这是一条动态这是一条动态这是一条动态这是一条动态这是一条动态这是一条动态',
							images: [
								{
									id: 1,
									fileName: '1',
									url: 'https://tenfei01.cfp.cn/creative/vcg/800/new/VCG21gic16120417.jpg',
									exif: {
										Model: 'Canon',
										ISOSpeedRatings: 'Canon EOS 5D Mark III',
										ExposureTime: '1/100',
										LensModel: 'EF24-70mm f/2.8L II USM',
										DateTimeOriginal: '2019:08:10 16:00:00',
										FNumber: 'f/2.8',
									},
								},
								{
									id: 1,
									fileName: '1',
									url: 'https://tenfei01.cfp.cn/creative/vcg/800/new/VCG21gic16120417.jpg',
									exif: {
										Model: 'Canon',
										ISOSpeedRatings: 'Canon EOS 5D Mark III',
										ExposureTime: '1/100',
										LensModel: 'EF24-70mm f/2.8L II USM',
										DateTimeOriginal: '2019:08:10 16:00:00',
										FNumber: 'f/2.8',
									},
								},
								{
									id: 1,
									fileName: '1',
									url: 'https://tenfei01.cfp.cn/creative/vcg/800/new/VCG21gic16120417.jpg',
									exif: {
										Model: 'Canon',
										ISOSpeedRatings: 'Canon EOS 5D Mark III',
										ExposureTime: '1/100',
										LensModel: 'EF24-70mm f/2.8L II USM',
										DateTimeOriginal: '2019:08:10 16:00:00',
										FNumber: 'f/2.8',
									},
								},
							],
						},
						{
							id: 1,
							isTop: 0,
							tags: ['scenery', 'portrait', 'humanity'],
							content:
								'这是一条动态这是一条动态这是一条动态这是一条动态这是一条动态这是一条动态这是一条动态这是一条动态这是一条动态',
							images: [
								{
									id: 1,
									fileName: '1',
									url: 'https://tenfei01.cfp.cn/creative/vcg/800/new/VCG21gic16120417.jpg',
									exif: {
										Model: 'Canon',
										ISOSpeedRatings: 'Canon EOS 5D Mark III',
										ExposureTime: '1/100',
										LensModel: 'EF24-70mm f/2.8L II USM',
										DateTimeOriginal: '2019:08:10 16:00:00',
										FNumber: 'f/2.8',
									},
								},
								{
									id: 2,
									fileName: '2',
									url: 'https://alifei02.cfp.cn/creative/vcg/800/new/VCG41N1385726677.jpg',
									exif: {
										Model: 'Canon',
										ISOSpeedRatings: 'Canon EOS 5D Mark III',
										ExposureTime: '1/100',
										LensModel: 'EF24-70mm f/2.8L II USM',
										DateTimeOriginal: '2019:08:10 16:00:00',
										FNumber: 'f/2.8',
									},
								},
								{
									id: 3,
									fileName: '2',
									url: 'https://tenfei01.cfp.cn/creative/vcg/800/new/VCG21gic16120417.jpg',
									exif: {
										Model: 'Canon',
										ISOSpeedRatings: 'Canon EOS 5D Mark III',
										ExposureTime: '1/100',
										LensModel: 'EF24-70mm f/2.8L II USM',
										DateTimeOriginal: '2019:08:10 16:00:00',
										FNumber: 'f/2.8',
									},
								},
								{
									id: 4,
									fileName: '2',
									url: 'https://alifei02.cfp.cn/creative/vcg/800/new/VCG41N1385726677.jpg',
									exif: {
										Model: 'Canon',
										ISOSpeedRatings: 'Canon EOS 5D Mark III',
										ExposureTime: '1/100',
										LensModel: 'EF24-70mm f/2.8L II USM',
										DateTimeOriginal: '2019:08:10 16:00:00',
										FNumber: 'f/2.8',
									},
								},
								{
									id: 5,
									fileName: '2',
									url: 'https://alifei02.cfp.cn/creative/vcg/800/new/VCG41N1385726677.jpg',
									exif: {
										Model: 'Canon',
										ISOSpeedRatings: 'Canon EOS 5D Mark III',
										ExposureTime: '1/100',
										LensModel: 'EF24-70mm f/2.8L II USM',
										DateTimeOriginal: '2019:08:10 16:00:00',
										FNumber: 'f/2.8',
									},
								},
								{
									id: 6,
									fileName: '2',
									url: 'https://tenfei01.cfp.cn/creative/vcg/800/new/VCG21gic16120417.jpg',
									exif: {
										Model: 'Canon',
										ISOSpeedRatings: 'Canon EOS 5D Mark III',
										ExposureTime: '1/100',
										LensModel: 'EF24-70mm f/2.8L II USM',
										DateTimeOriginal: '2019:08:10 16:00:00',
										FNumber: 'f/2.8',
									},
								},
								{
									id: 7,
									fileName: '2',
									url: 'https://tenfei01.cfp.cn/creative/vcg/800/new/VCG21gic16120417.jpg',
									exif: {
										Model: 'Canon',
										ISOSpeedRatings: 'Canon EOS 5D Mark III',
										ExposureTime: '1/100',
										LensModel: 'EF24-70mm f/2.8L II USM',
										DateTimeOriginal: '2019:08:10 16:00:00',
										FNumber: 'f/2.8',
									},
								},
								{
									id: 8,
									fileName: '2',
									url: 'https://tenfei01.cfp.cn/creative/vcg/800/new/VCG21gic16120417.jpg',
									exif: {
										Model: 'Canon',
										ISOSpeedRatings: 'Canon EOS 5D Mark III',
										ExposureTime: '1/100',
										LensModel: 'EF24-70mm f/2.8L II USM',
										DateTimeOriginal: '2019:08:10 16:00:00',
										FNumber: 'f/2.8',
									},
								},
								{
									id: 9,
									fileName: '2',
									url: 'https://tenfei01.cfp.cn/creative/vcg/800/new/VCG21gic16120417.jpg',
									exif: {
										Model: 'Canon',
										ISOSpeedRatings: 'Canon EOS 5D Mark III',
										ExposureTime: '1/100',
										LensModel: 'EF24-70mm f/2.8L II USM',
										DateTimeOriginal: '2019:08:10 16:00:00',
										FNumber: 'f/2.8',
									},
								},
								{
									id: 10,
									fileName: '2',
									url: 'https://tenfei01.cfp.cn/creative/vcg/800/new/VCG21gic16120417.jpg',
									exif: {
										Model: 'Canon',
										ISOSpeedRatings: 'Canon EOS 5D Mark III',
										ExposureTime: '1/100',
										LensModel: 'EF24-70mm f/2.8L II USM',
										DateTimeOriginal: '2019:08:10 16:00:00',
										FNumber: 'f/2.8',
									},
								},
								{
									id: 10,
									fileName: '2',
									url: 'https://tenfei01.cfp.cn/creative/vcg/800/new/VCG21gic16120417.jpg',
									exif: {
										Model: 'Canon',
										ISOSpeedRatings: 'Canon EOS 5D Mark III',
										ExposureTime: '1/100',
										LensModel: 'EF24-70mm f/2.8L II USM',
										DateTimeOriginal: '2019:08:10 16:00:00',
										FNumber: 'f/2.8',
									},
								},
								{
									id: 10,
									fileName: '2',
									url: 'https://tenfei01.cfp.cn/creative/vcg/800/new/VCG21gic16120417.jpg',
									exif: {
										Model: 'Canon',
										ISOSpeedRatings: 'Canon EOS 5D Mark III',
										ExposureTime: '1/100',
										LensModel: 'EF24-70mm f/2.8L II USM',
										DateTimeOriginal: '2019:08:10 16:00:00',
										FNumber: 'f/2.8',
									},
								},
								{
									id: 10,
									fileName: '2',
									url: 'https://tenfei01.cfp.cn/creative/vcg/800/new/VCG21gic16120417.jpg',
									exif: {
										Model: 'Canon',
										ISOSpeedRatings: 'Canon EOS 5D Mark III',
										ExposureTime: '1/100',
										LensModel: 'EF24-70mm f/2.8L II USM',
										DateTimeOriginal: '2019:08:10 16:00:00',
										FNumber: 'f/2.8',
									},
								},
							],
						},
					],
				},
			}
		},
	},
	{
		url: '/api/mock/momments',
		method: 'get',
		response: () => {
			return {
				code: 0,
				data: [
					{
						id: 2,
						title: 't1',
						isTop: 1,
						content:
							'<p><a href="http://localhost:5173/"><span style="color: rgb(212, 177, 6);">#庆余年2#</span></a>什么时候可以看呢？😅</p>这是一条动态这是一条动态这是一条动态这是一条动态这是一条动态这是一条动态这是一条动态这是一条动态这是一条动态',
						images: [
							{
								id: 1,
								fileName: '1',
								url: 'https://tenfei01.cfp.cn/creative/vcg/800/new/VCG21gic16120417.jpg',
								exif: {
									Model: 'Canon',
									ISOSpeedRatings: 'Canon EOS 5D Mark III',
									ExposureTime: '1/100',
									LensModel: 'EF24-70mm f/2.8L II USM',
									DateTimeOriginal: '2019:08:10 16:00:00',
									FNumber: 'f/2.8',
								},
							},
							{
								id: 1,
								fileName: '1',
								url: 'https://tenfei01.cfp.cn/creative/vcg/800/new/VCG21gic16120417.jpg',
								exif: {
									Model: 'Canon',
									ISOSpeedRatings: 'Canon EOS 5D Mark III',
									ExposureTime: '1/100',
									LensModel: 'EF24-70mm f/2.8L II USM',
									DateTimeOriginal: '2019:08:10 16:00:00',
									FNumber: 'f/2.8',
								},
							},
							{
								id: 1,
								fileName: '1',
								url: 'https://tenfei01.cfp.cn/creative/vcg/800/new/VCG21gic16120417.jpg',
								exif: {
									Model: 'Canon',
									ISOSpeedRatings: 'Canon EOS 5D Mark III',
									ExposureTime: '1/100',
									LensModel: 'EF24-70mm f/2.8L II USM',
									DateTimeOriginal: '2019:08:10 16:00:00',
									FNumber: 'f/2.8',
								},
							},
						],
						tags: ['scenery', 'portrait'],
						updateTime: '2021-08-10 16:00:00',
						createTime: '2021-08-10 16:00:00',
					},
					{
						id: 1,
						title: 't2',
						isTop: 0,
						content:
							'<p><a href="http://localhost:5173/"><span style="color: rgb(212, 177, 6);">#庆余年2#</span></a>什么时候可以看呢？😅</p>这是一条动态这是一条动态这是一条动态这是一条动态这是一条动态这是一条动态这是一条动态这是一条动态这是一条动态',
						images: [
							{
								id: 1,
								fileName: '1',
								url: 'https://tenfei01.cfp.cn/creative/vcg/800/new/VCG21gic16120417.jpg',
								exif: {
									Model: 'Canon',
									ISOSpeedRatings: 'Canon EOS 5D Mark III',
									ExposureTime: '1/100',
									LensModel: 'EF24-70mm f/2.8L II USM',
									DateTimeOriginal: '2019:08:10 16:00:00',
									FNumber: 'f/2.8',
								},
							},
							{
								id: 1,
								fileName: '1',
								url: 'https://tenfei01.cfp.cn/creative/vcg/800/new/VCG21gic16120417.jpg',
								exif: {
									Model: 'Canon',
									ISOSpeedRatings: 'Canon EOS 5D Mark III',
									ExposureTime: '1/100',
									LensModel: 'EF24-70mm f/2.8L II USM',
									DateTimeOriginal: '2019:08:10 16:00:00',
									FNumber: 'f/2.8',
								},
							},
							{
								id: 1,
								fileName: '1',
								url: 'https://tenfei01.cfp.cn/creative/vcg/800/new/VCG21gic16120417.jpg',
								exif: {
									Model: 'Canon',
									ISOSpeedRatings: 'Canon EOS 5D Mark III',
									ExposureTime: '1/100',
									LensModel: 'EF24-70mm f/2.8L II USM',
									DateTimeOriginal: '2019:08:10 16:00:00',
									FNumber: 'f/2.8',
								},
							},
						],
						tags: ['scenery'],
						updateTime: '2021-08-10 16:00:00',
						createTime: '2021-08-10 16:00:00',
					},
				],
			}
		},
	},
] as MockMethod[]
