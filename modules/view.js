
function highLight(e){e.target.setAttribute("class","circleSelected");}

function unHighLight(e){e.target.setAttribute("class","circleNotSelected");}

function refitWindow(marks,svg) 
{	
	var Xmax = Number.NEGATIVE_INFINITY; var Ymax = Number.NEGATIVE_INFINITY; 
	var Xmin = Number.POSITIVE_INFINITY; var Ymin = Number.POSITIVE_INFINITY;
	for (var k in marks){ var m = marks[k];
		if (m.x + m.dia/2 > Xmax)		{Xmax = m.x + m.dia*1.1/2;}
		else if (m.x - m.dia/2 < Xmin)	{Xmin = m.x - m.dia*1.1/2;}
		if (m.y + m.dia/2 > Ymax)		{Ymax = m.y + m.dia*1.1/2;}
		else if (m.y - m.dia/2 < Ymin)	{Ymin = m.y - m.dia*1.1/2;}
	}
	console.log( `Refit: ${Xmin} ${Ymin} ${Xmax-Xmin} ${Ymax-Xmin}`)
	svg.setAttribute("viewBox", `${Xmin} ${Ymin} ${Xmax-Xmin} ${Ymax-Xmin}`); 
}

class viewBox{constructor(svg){
	var vb = svg.getAttribute("viewBox").split(" ");
	this.w = parseInt(vb[2]); 		this.h = parseInt(vb[3]); 
	this.x = parseInt(vb[0]);		this.y = parseInt(vb[1]);
	this.calCentre();
	}

	calCentre(){this.cx = this.x + this.w/2; this.cy = this.y + this.h/2;}
	move(dx,dy)	{this.x -= dx;	this.y -= dy;	this.calCentre();}

	scale(sf)
	{
		this.x = this.x - (this.w*sf-this.w)/2;		this.y = this.y - (this.h*sf-this.h)/2;
		this.w=this.w*sf; 	this.h=this.h*sf;
		this.calCentre();
	}

	toString(){return(`${this.x} ${this.y} ${this.w} ${this.h}`)}
}

export {highLight, unHighLight, refitWindow, viewBox};