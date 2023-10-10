
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
	// Définir ici les attributs de la 'classe'
  this.posiInitX = 0
  this.posiInitY = 0
  this.posiFinalX = 0
  this.posiFinalY = 0
  this.isClick = false

	// Developper les 3 fonctions gérant les événements
  this.mouseDown = function setPositionMouseClic(evt){
    this.isClick = true
    pos = getMousePosition(canvas, evt)
    this.posiInitX = pos.x
    this.posiInitY = pos.y
    //console.log(pos)
    interactor.onInteractionStart(this);
  }.bind(this)

  this.mouseUp = function setPositionMouseUnclic(evt){
      this.isClick = false
      pos = getMousePosition(canvas, evt)
      this.posiFinalX = pos.x
      this.posiFinalY = pos.y
      //console.log(pos)
      interactor.onInteractionEnd(this);
  }.bind(this)

  this.mouseMove = function setPositionMouseMove(evt){
    if(this.isClick){
      isClick = true
      pos = getMousePosition(canvas, evt)
      this.posiFinalX = pos.x
      this.posiFinalY = pos.y
      //console.log(pos)
      interactor.onInteractionUpdate(this);
    }
  }.bind(this)

	// Associer les fonctions précédentes aux évènements du canvas.

  canvas.addEventListener('mousedown', this.mouseDown, false);
  canvas.addEventListener('mousemove', this.mouseMove, false);
  canvas.addEventListener('mouseup', this.mouseUp, false);
};


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};



