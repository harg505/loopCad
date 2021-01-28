function circle(d,x,y,id,c){
	if(c.includes("null")) {c= "circleNotSelected";} 
	return(`<circle id="${id}" cx="${x}" cy="${y}" r="${d/2}" stroke="black" class="${c}"/>`);
}

function line(x1,y1,x2,y2,c){return(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="1"/>`);}

function dot(x,y){return(`<circle cx="${x}" cy="${y}" r="3" stroke="black" stroke-width="1" style="fill: rgb(255,255,255); ${FO}"/>`);}

function vectorEnd(o,a,m){return [o[0]+m*Math.cos(a),o[1]+m*Math.sin(a)]};

function vline(id,o,a,m,c)
{
	var e = vectorEnd(o,a,m);
	return(`<line id="${id}" x1="${o[0]}" y1="${o[1]}" x2="${e[0]}" y2="${e[1]}" stroke="${c}" stroke-width="1"/>`);
}

function updateLine(line,p1,p2)
{
	line.setAttribute("x1",p1[0]);	line.setAttribute("y1",p1[1]);
	line.setAttribute("x2",p2[0]);	line.setAttribute("y2",p2[1]);
}

function joinMarks(M1,M2,svg)
{
		var dX = M2.x-M1.x; var dY = M2.y-M1.y;
		var r1 = M1.dia/2; var r2 = M2.dia/2;
		var aT = Math.atan2(dY,dX);	//angle between grid east and tangent vector	
		var H = Math.pow(Math.pow((M2.x-M1.x),2) + Math.pow((M2.y-M1.y),2),0.5)	//distance between centers (Hypotonuse)	
		var O,T,A, origin;	
		var line = "";
		var ID = `line${M1.name}-${M2.name}`;	
		var existingLine = svg.getElementById(ID);
		
		if(M1.direction == M2.direction)
			{		
				O = r2-r1;				
				var dT = Math.asin(O/H);			//theta angle between opposite(tangent vector) and hypotonuse
				A = H*Math.cos(dT);				//Adjacent (the lenght of the tangent line)

				//starboard - starboard
				if(M1.direction == true){
					origin = [Math.cos(aT-Math.PI/2-dT)*r1+M1.x,  Math.sin(aT-Math.PI/2-dT)*r1+M1.y];									
					T =	aT-dT;
					if(existingLine == null){svg.innerHTML += vline(ID,origin,T,A,"green");}
					else{updateLine(existingLine,origin,vectorEnd(origin,T,A));}
				}
				else{
					//port - port
					origin = [Math.cos(aT+Math.PI/2+dT)*r1+M1.x,  Math.sin(aT+Math.PI/2+dT)*r1+M1.y];
					T=aT+dT;						
					if(existingLine == null){svg.innerHTML += vline(ID,origin,T,A,"red");}
					else{updateLine(existingLine,origin,vectorEnd(origin,aT+dT,A));}
				}		
			}
		else if((r2+r1)<H)
			{
				O = r2+r1;
				var dT = Math.asin(O/H);			//theta angle between opposite(tangent vector) and hypotonuse
				A = H*Math.cos(dT);				//Adjacent (the lenght of the tangent line)	

				if((M1.direction == false) & (M2.direction == true)){
					//port - starboard
					origin = [Math.cos(aT+Math.PI/2-dT)*r1+M1.x,  Math.sin(aT+Math.PI/2-dT)*r1+M1.y];					
					T=aT-dT;
					if(existingLine == null){svg.innerHTML += vline(ID,origin,T,A,"green");}
					else{updateLine(existingLine,origin,vectorEnd(origin,T,A));}
				}
				else{			
					//starboard - port
					origin = [Math.cos(aT-Math.PI/2+dT)*r1+M1.x,  Math.sin(aT-Math.PI/2+dT)*r1+M1.y];			
					T=aT+dT;
					if(existingLine == null){svg.innerHTML += vline(ID,origin,T,A,"red");}
					else{updateLine(existingLine,origin,vectorEnd(origin,T,A));}
				}
			}	
		else
			{
				origin = [M1.x, M1.y];
				T= aT; 
				A = H*Math.cos(Math.asin((r2+r1)/H))
			}
	return [origin,T,A];
}

function drawMark(M,id,svg){	svg.innerHTML += circle(M.dia,M.x,M.y,id,`group${M.group}`);}

function drawAllMarks(svg,marks){
svg.innerHTML = '<image href="assy.jpg" height="150" width="150" x="-70" y="-70"/>'
for (var i in marks) {if (marks.hasOwnProperty(i)) {drawMark(marks[i],i,svg);}}}

class mark{
	constructor(name,dia,x,y,direction){
		this.name = name; this.dia = dia;
		this.x = x;this.y	= y; 
		this.up = null; this.down = null; 
		this.direction = direction;
		this.group = null;
	}
	
	deepCopy()
	{
		var m = new mark(this.name,this.dia,this.x,this.y,this.direction);
		m.group = this.group;
		m.up = this.up;
		m.down = this.down;
		return m;
	}
}
class pt2d{constructor(x,y){this.x = x;this.y	= y;}}

export {circle, line, dot, vectorEnd, vline, joinMarks, drawMark, drawAllMarks, pt2d, mark};
