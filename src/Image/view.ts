interface IPos {
  x: number
  y: number
}

class MapCanvas {
  private canvasRef: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private img!: HTMLImageElement
  private imgSrc: string // 图片url
  private startPos: IPos = { x: 0, y: 0 } // 开始坐标
  private movePos!: IPos // 存储移动坐标位置
  private imgX = 0 // 图片初始化X轴位置
  private imgY = 0 // 图片初始化Y轴位置
  private isMove = false // 是否移动
  private imgScale: number // 图片缩放比例
  private MINIMUM_SCALE: number // 最小缩放
  private MAX_SCALE: number // 最大缩放
  private showTipStatus = true // 是否展示Tip

  constructor(
    canvas: HTMLCanvasElement,
    imgSrc: string,
    imgScale = 0.3,
    minScale = 0.1,
    maxScale = 0.7,
  ) {
    this.imgSrc = imgSrc
    this.imgScale = imgScale
    this.MINIMUM_SCALE = minScale
    this.MAX_SCALE = maxScale
    this.canvasRef = canvas
    const { width, height } = this.canvasRef.getBoundingClientRect()
    this.canvasRef.width = width
    this.canvasRef.height = height
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    this.initCanvas()
  }

  /**
   * 初始化Canvas
   */
  async initCanvas() {
    await this.loadImage(this.imgSrc)
    // 设置图片在Canvas居中
    this.imgX = (this.canvasRef.width - this.img.width * this.imgScale) / 2
    this.imgY = (this.canvasRef.height - this.img.height * this.imgScale) / 2
    this.drawImage()
    this.showTip()
    // pc端事件监听
    this.canvasRef.addEventListener('mousedown', this.startMouse.bind(this))
    this.canvasRef.addEventListener('mousemove', this.moveMouse.bind(this))
    this.canvasRef.addEventListener('mouseup', this.endMouse.bind(this))
    // this.canvasRef.addEventListener('mousewheel', this.mouseWheel.bind(this)); // 监听滚轮
    this.canvasRef.addEventListener('wheel', this.mouseWheel.bind(this)) // 监听滚轮
    this.canvasRef.addEventListener('mouseover', this.mouseOver.bind(this)) // 鼠标移过 显示提示
    this.canvasRef.addEventListener('mouseout', this.mouseOut.bind(this))
  }

  /**
   * 改变Canvas渲染的图片
   */
  public async changeImage(src: string) {
    this.imgSrc = src
    const redraw = this.drawImage.bind(this)
    this.img.src = this.imgSrc
    this.img.onload = redraw
    this.img.onerror = function () {
      console.error('人物加载失败, 请刷新')
    }
  }

  /**
   * 移除监听器
   */
  public removeEventListener() {
    this.canvasRef.removeEventListener('mousedown', this.startMouse.bind(this))
    this.canvasRef.removeEventListener('mousemove', this.moveMouse.bind(this))
    this.canvasRef.removeEventListener('mouseup', this.endMouse.bind(this))
    // this.canvasRef.removeEventListener('mousewheel', this.mouseWheel.bind(this)); // 监听滚轮
    this.canvasRef.removeEventListener('wheel', this.mouseWheel.bind(this)) // 监听滚轮
    this.canvasRef.removeEventListener('mouseover', this.mouseOver.bind(this))
    this.canvasRef.removeEventListener('mouseout', this.mouseOut.bind(this))
  }

  /**
   * 获取图片比例
   * @returns
   */
  public getImgScale() {
    return this.imgScale
  }

  /**
   * 获取距离X比例
   * @returns
   */
  public getXScale() {
    return (this.imgX / this.canvasRef.width).toFixed(3)
  }

  /**
   * 获取距离Y比例
   * @return
   */
  public getYScale() {
    return (this.imgY / this.canvasRef.height).toFixed(3)
  }

  /**
   * 图片加载
   * @param src
   * @returns
   */
  private loadImage(src: string) {
    return new Promise((resolve, reject) => {
      this.img = new Image()
      this.img.crossOrigin = 'Anonymous'
      this.img.onload = function () {
        resolve('')
      }
      this.img.onerror = function (error) {
        console.error('人物加载失败, 请刷新')
        reject(error)
      }
      this.img.src = src
    })
  }

  /**
   * 图片绘制
   */
  private drawImage() {
    // 清楚上一帧绘制
    this.ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height)
    if (this.showTipStatus) this.showTip()
    // 绘制图片
    this.ctx.drawImage(
      this.img,
      this.imgX,
      this.imgY,
      this.img.width * this.imgScale,
      this.img.height * this.imgScale,
    )
  }

  private showTip() {
    this.ctx.font = '16px Microsoft YaHei'
    // this.ctx.fillText('拖拽移动, 鼠标滚轮缩放', 50, 50)
  }

  /**
   * 鼠标移入，关闭提示
   */
  private mouseOver() {
    this.showTipStatus = false
    this.drawImage()
  }

  /**
   * 鼠标移出，显示提示
   */
  private mouseOut() {
    this.showTipStatus = true
    this.drawImage()
  }

  /**
   * 开始拖拽
   * @param e
   */
  private startMouse(e: MouseEvent) {
    const { pageX, pageY } = e
    this.isMove = true
    this.startPos = this.windowToCanvas(pageX, pageY)
    this.canvasRef.style.cursor = 'pointer'
  }

  /**
   * 拖拽移动
   * @param e
   * @returns
   */
  private moveMouse(e: MouseEvent) {
    if (!this.isMove) return false
    const { pageX, pageY } = e
    this.movePos = this.windowToCanvas(pageX, pageY)
    const x = this.movePos.x - this.startPos.x
    const y = this.movePos.y - this.startPos.y
    this.imgX += x
    this.imgY += y
    this.startPos = { ...this.movePos } // 更新最新位置
    this.drawImage()
  }

  /**
   * 拖拽结束
   */
  private endMouse() {
    this.isMove = false
    this.canvasRef.style.cursor = 'default'
  }

  /**
   * 监听滚轮
   * @param e
   */
  private mouseWheel(e: WheelEvent) {
    const { clientX, clientY, deltaY } = e
    const pos = this.windowToCanvas(clientX, clientY)
    // 计算图片的位置
    const newPos = {
      x: Number(((pos.x - this.imgX) / this.imgScale).toFixed(2)),
      y: Number(((pos.y - this.imgY) / this.imgScale).toFixed(2)),
    }
    // 判断是放大还是缩小
    if (deltaY > 0) {
      // 放大
      this.imgScale += 0.02
      if (this.imgScale >= this.MAX_SCALE) this.imgScale = this.MAX_SCALE
    } else {
      // 缩小
      this.imgScale -= 0.02
      if (this.imgScale <= this.MINIMUM_SCALE)
        this.imgScale = this.MINIMUM_SCALE
    }
    // 计算图片的位置, 根据当前缩放比例,计算新的位置
    this.imgX = (1 - this.imgScale) * newPos.x + (pos.x - newPos.x)
    this.imgY = (1 - this.imgScale) * newPos.y + (pos.y - newPos.y)
    this.drawImage()
  }

  /**
   * 处理鼠标位置
   * @param startX
   * @param startY
   * @returns
   */
  private windowToCanvas(startX: number, startY: number) {
    const { left, top, width, height } = this.canvasRef.getBoundingClientRect()
    return {
      x: startX - left - (width - this.canvasRef.width) / 2,
      y: startY - top - (height - this.canvasRef.height) / 2,
    }
  }
}

export default MapCanvas
