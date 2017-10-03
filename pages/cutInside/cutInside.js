/**
 * Created by sail on 2017/6/1.
 * 
 */
const app = getApp();
import weCropper from '../../utils/weCropper.js'

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50

Page({
	data: {
		cropperOpt: {
			id: 'cropper',
			width,
			height,
			scale: 2.5,
			zoom: 8,
			cut: {
				x: (width - 300) / 2,
				y: (height - 200) / 2,
				width: 300,
				height: 200
			}
		},
    src: '',
    display: false
	},
	touchStart (e) {
		this.wecropper.touchStart(e)
	},
	touchMove (e) {
		this.wecropper.touchMove(e)
	},
	touchEnd (e) {
		this.wecropper.touchEnd(e)
	},
	getCropperImage () {
		this.wecropper.getCropperImage((src) => {
			if (src) {
        this.setData({
          src: src,
          display: true
        })
			} else {
				console.log('获取图片地址失败，请稍后重试')
			}
		})
	},
	uploadTap () {
		const self = this

		wx.chooseImage({
			count: 1, // 默认9
			success (res) {
				let src = res.tempFilePaths[0]
				//  获取裁剪图片资源后，给data添加src属性及其值
				self.wecropper.pushOrign(src)
			}
		})
	},
	onLoad (option) {
		const { cropperOpt } = this.data

		new weCropper(cropperOpt)
			.on('ready', (ctx) => {
				console.log(`wecropper is ready for work!`)
			})
			.on('beforeImageLoad', (ctx) => {
				console.log(`before picture loaded, i can do something`)
				console.log(`current canvas context:`, ctx)
				wx.showToast({
					title: '上传中',
					icon: 'loading',
					duration: 20000
				})
			})
			.on('imageLoad', (ctx) => {
				console.log(`picture loaded`)
				console.log(`current canvas context:`, ctx)
				wx.hideToast()
			})
			.on('beforeDraw', (ctx, instance) => {
				console.log(`before canvas draw,i can do something`)
				console.log(`current canvas context:`, ctx)
			})
			.updateCanvas();
    // 将图片渲染到canvas中
    setTimeout(()=> {
      this.wecropper.pushOrign(option.tempFilePath)
    }, 1000)

	},
  submit () {
    app.globalData.picture = this.data.src;
    wx.navigateBack()
  },
  cancel () {
    this.wecropper.pushOrign(this.data.src);
    this.setData({
      display: false
    })
  }
})
