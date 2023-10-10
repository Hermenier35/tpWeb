function Drawing() {
    this.shapeArray = new Map();
    this.save = [];
}

function Shape(posiInitX, posiInitY, tickness, color){
    this.posiInitX = posiInitX
    this.posiInitY = posiInitY
    this.tickness = tickness
    this.color = color
}

function Rectangle(posiInitX, posiInitY, tickness, color, height, width){
    Shape.call(this, posiInitX,posiInitY,tickness,color)
    this.height = height
    this.width = width
}

function Line(posiInitX, posiInitY, tickness, color, posiFinalX, posiFinalY){
    Shape.call(this, posiInitX,posiInitY,tickness,color)
    this.posiFinalX = posiFinalX
    this.posiFinalY = posiFinalY
}

function Circle(posiInitX, posiInitY, tickness, color, rayon){
    Shape.call(this, posiInitX, posiInitY, tickness, color)
    this.rayon = rayon
}