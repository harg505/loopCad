import {mark} from './drawing.js'

function createMarks(no,r)
{
	var marks = {},i;
	for(i=0;i<no;i++)
	{
		var ss = true;
		if(i%2){ss=false}
		var a = -i*2*Math.PI/no;	
		marks[i] = new mark(i,30,r*Math.sin(a),r*Math.cos(a),ss);
	}
	var len = Object.keys(marks).length;
	for(i=0;i<len-1;i++){marks[i].up=i+1;}
	for(i=1;i<len;i++){marks[i].down=i-1;}
	marks[len-1].up = 0;
	marks[0].down = len-1;
	return marks;
}

var toType = function(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
  }

export {createMarks, toType};