Rectangle.prototype.paint = function(ctx){
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.tickness
    ctx.strokeRect(this.posiInitX, this.posiInitY, this.width, this.height)
};


Line.prototype.paint = function(ctx){
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.tickness
    ctx.beginPath()
    ctx.moveTo(this.posiInitX, this.posiInitY)
    ctx.lineTo(this.posiFinalX, this.posiFinalY)
    ctx.stroke();
};

Circle.prototype.paint = function(ctx){
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.tickness
    ctx.beginPath()
    ctx.arc(this.posiInitX, this.posiInitY, this.rayon, 0, Math.PI * 2)
    ctx.stroke()
};

Drawing.prototype.paint = function(ctx, canvas){
    ctx.fillStyle = '#F0F0F0';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    this.shapeArray.forEach(element => element.paint(ctx))
};

function updateShapeList(index, shape){
    document.getElementById('shapeList').insertAdjacentHTML('beforeend', toDom(shape, index))
}

function toDom(shape, index){
    if(shape && typeof shape === 'object'){
        let innerHtml = `<li id="liRemove${index}">`
        if(shape.constructor === Rectangle)
            innerHtml+= '<span style="color: ' + shape.color + '">#</ span> Rectangle'
         else if(shape.constructor === Line)
            innerHtml+= '<span style="color: ' + shape.color + '">/</ span> Line'
        else if(shape.constructor === Circle)
        innerHtml+= '<span style="color: ' + shape.color + '">O</ span> Circle'

        innerHtml += `
                        <button type="button" class="btn btn-default remove"
                        id= "remove${index}">
                        <span style="color: ` + shape.color + `" class="glyphicon glyphicon-remove-sign"></span></button>`
        return innerHtml
    }
}