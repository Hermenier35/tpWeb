
var editingMode = { rect: 0, line: 1, circle: 2};

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 5;
	this.currColour = '#000000';
	this.currentShape = 0;
	indexLast = 0;

	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.
	document.getElementById("butRect").onclick = (_) => this.currEditingMode = editingMode.rect
	document.getElementById("butLine").onclick = (_) => this.currEditingMode = editingMode.line
	document.getElementById("butCircle").onclick = (_) => this.currEditingMode = editingMode.circle
	document.getElementById("spinnerWidth").onchange = (e) => this.currLineWidth = e.target.value
	document.getElementById("colour").onchange = (e) => this.currColour = e.target.value
	document.getElementById("butUndo").onclick = (_) => doUndo()
	document.getElementById("butRedo").onclick = (_) => doRedo()


	new DnD(canvas, this);

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd

	this.onInteractionStart = function(dnd){
	
	}.bind(this);

	this.onInteractionUpdate = function(dnd){
		switch(this.currEditingMode){
			case editingMode.rect : this.currentShape = new Rectangle(dnd.posiInitX, dnd.posiInitY, this.currLineWidth, 
				this.currColour, dnd.posiFinalY - dnd.posiInitY, dnd.posiFinalX - dnd.posiInitX	) 
				break;
			case editingMode.line : this.currentShape = new Line(dnd.posiInitX, dnd.posiInitY, this.currLineWidth, this.currColour, dnd.posiFinalX, dnd.posiFinalY)
				break;
			case editingMode.circle : this.currentShape = new Circle(dnd.posiInitX, dnd.posiInitY,this.currLineWidth, 
				this.currColour, Math.abs(dnd.posiFinalY - dnd.posiInitY) + Math.abs(dnd.posiFinalX - dnd.posiInitX))
		}
		drawing.paint(ctx, canvas);
		this.currentShape.paint(ctx)
	}.bind(this);

	this.onInteractionEnd = function(dnd){
		id = getId()
		console.log(id)
		drawing.shapeArray.set(id, this.currentShape);
		drawing.paint(ctx, canvas);
		updateShapeList(id, this.currentShape)
		document.getElementById("remove" + id).onclick = (event) => remove(drawing, event.currentTarget.id.substring(6), ctx, canvas)
		this.currentShape.paint(ctx)
	}.bind(this);

	function getId(){
		indexLast++;
		return this.indexLast - 1
	}

	function remove(drawing, index, ctx, canvas){
		drawing.save.push(drawing.shapeArray.get(parseInt(index)))
		drawing.shapeArray.delete(parseInt(index))
		document.getElementById('liRemove' + index).remove()
		drawing.paint(ctx, canvas)
	}

	function doUndo(){
		if(drawing.shapeArray.size>0){
			index = Math.max(...drawing.shapeArray.keys())
			remove(drawing, index, ctx, canvas)
		}
	}

	function doRedo(){
		if(drawing.save.length>0){
			this.currentShape = drawing.save.pop()
			id = getId()
			drawing.shapeArray.set(id, this.currentShape);
			drawing.paint(ctx, canvas);
			updateShapeList(id, this.currentShape)
			document.getElementById("remove" + id).onclick = (event) => remove(drawing, event.currentTarget.id.substring(6), ctx, canvas)
			this.currentShape.paint(ctx)
		}
	}
	
};


