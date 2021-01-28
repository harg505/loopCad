xhr.onreadystatechange = function(){
    if (xhr.readyState == 4 && xhr.status == 200){

        // append the menu to `body`
        document.body.innerHTML += xhr.responseText;

        var menu = document.getElementById('menu');

        // overwrite the right click event
        document.addEventListener("contextmenu", function(e) {      
            e.preventDefault();     
			console.log(e);    
            // show the menu        
            menu.style.display = 'block';
            // set the left and top position based on mouse event coordonates
            menu.style.left = e.x + 'px';
            menu.style.top = e.y + 'px';        
        });

        // close the menu on document click
        // TODO verify if the click is in the menu boundaries
        document.addEventListener("click", function(e){
            menu.style.display = 'none';
        });
    }
}

// make xhr `async` request => third param `true`
xhr.open("GET", "circleContext.html", true);
xhr.send();
