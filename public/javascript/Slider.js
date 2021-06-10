var images = ['1.jpg','2.jpg','3.jpg','4.jpg'];
var leftbtn = document.getElementById('slider-button-left');
var rightbtn = document.getElementById('slider-button-right');
var img = document.getElementById("slider-image");
var currentindex = 1;

function slideright(){
    ++currentindex;
    if(currentindex >= images.length){
        currentindex=0;
    }
    img.src = "/Images/"+images[currentindex];
}

function slideleft(){
    --currentindex;
    if(currentindex < 0){
        currentindex=images.length-1;
    }
    img.src = "/Images/"+images[currentindex];
}
