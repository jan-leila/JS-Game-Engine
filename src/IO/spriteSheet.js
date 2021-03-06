class SpriteSheet{
  constructor(image, width, height){
    this.sheet = new Image;
    this.sheet.src = image;

    this.width = width;
    this.height = height;

    this.sheet.onload = () => {
      this.rows = this.sheet.height / height;
      this.columns = this.sheet.width / width;
    }
  }

  draw(ctx, row, column, location, scale = 1){
    let { sheet, width, height } = this;
    let { x, y } = location;
    ctx.drawImage(sheet, width * row, height * column, width, height, x, y, width * scale, height * scale);
  }
}

module.exports = SpriteSheet;
