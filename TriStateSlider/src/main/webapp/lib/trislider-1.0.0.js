/* 
Copyright [2019] [Adrian Inness]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. 
*/
function init3Slider(id, r, label1, color1, label2, color2, label3, color3) {
    mouseDown = false;
    var canvas = document.getElementById(id);
    canvas.width = (r*2)+2;
    canvas.height =(r*2)+2;
    drawComponent(id, r, r, r, label1, color1, label2, color2, label3, color3);
    canvas.addEventListener("mousedown", function(){mouseDown = true;});
    canvas.addEventListener("mouseup", function(){mouseDown = false;});
//    canvas.addEventListener("mouseout", function(e){mouseDown = false;});
    canvas.addEventListener('mousemove', function(e){makeSelection(id, r, label1, color1, label2, color2, label3, color3, e.offsetX, e.offsetY, mouseDown);});    
    canvas.addEventListener('click', function(e){makeSelection(id, r, label1, color1, label2, color2, label3, color3, e.offsetX, e.offsetY, true);});        
}

function makeSelection(id, r, label1, color1, label2, color2, label3, color3, mx, my, mouseDown) {    
    if (!mouseDown) return;
    var x = r;
    var y = r;
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext("2d");        
    // In Circle?
    d = distanceBetweenPts(mx, my, x, y);
    if (d <= r) {
        rad = 270.0 * (Math.PI/180.0);
        x1p = x+(r*Math.cos(rad));
        y1p = y+(r*Math.sin(rad));
    
        rad = 150.0 * (Math.PI/180.0);
        x2p = x+(r*Math.cos(rad));
        y2p = y+(r*Math.sin(rad));
        
        rad = 30.0 * (Math.PI/180.0);
        x3p = x+(r*Math.cos(rad));
        y3p = y+(r*Math.sin(rad));
        
        sx = Math.round(distanceBetweenPts(mx, my, x1p, y1p)-r);
        sy = Math.round(distanceBetweenPts(mx, my, x2p, y2p)-r);
        sz = Math.round(distanceBetweenPts(mx, my, x3p, y3p))-r;
        sx = (sx<=1)?0:sx;
        sy = (sy<=1)?0:sy;
        sz = (sz<=1)?0:sz;
        var ss = Math.abs(((sx+sy+sz)-r)/2.0);
        sx = (sx-ss<=1)?0:sx-ss;
        sy = (sy-ss<=1)?0:sy-ss;
        sz = (sz-ss<=1)?0:sz-ss;
        document.getElementById(id+'1').value= Math.round((sz/r)*100);
        document.getElementById(id+'2').value= Math.round((sx/r)*100);
        document.getElementById(id+'3').value= Math.round((sy/r)*100);
        drawComponent(id, x, y, r, label1, color1, label2, color2, label3, color3);
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(mx, my, 3, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }
}

function distanceBetweenPts(x, y, x2, y2) {
    dx = Math.abs(x - x2);
    dy = Math.abs(y - y2);
    return Math.sqrt((dx*dx)+(dy*dy));
}

function drawComponent(id, x, y, r, label1, color1, label2, color2, label3, color3) {    
    x = x + 1;
    y = y + 1;
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext("2d");
    // Draw circle
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke(); 

    // 150 to 270
    ctx.fillStyle = color1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    rad = 270.0 * (Math.PI/180.0);
    xp = x+(r*Math.cos(rad));
    yp = y+(r*Math.sin(rad));
    ctx.lineTo(xp, yp);
    
    ctx.moveTo(x, y);
    rad = 150.0 * (Math.PI/180.0);
    xp = x+(r*Math.cos(rad));
    yp = y+(r*Math.sin(rad));
    ctx.lineTo(xp, yp);
    
    rad1 = 150.0 * (Math.PI/180.0);
    rad2 = 270.0 * (Math.PI/180.0);
    ctx.arc(x, y, r, rad1, rad2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    
    // 270 to 30
    ctx.fillStyle = color2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    rad = 30.0 * (Math.PI/180.0);
    xp = x+(r*Math.cos(rad));
    yp = y+(r*Math.sin(rad));
    ctx.lineTo(xp, yp);
    
    ctx.moveTo(x, y); 
    rad = 270.0 * (Math.PI/180.0);
    xp = x+(r*Math.cos(rad));
    yp = y+(r*Math.sin(rad));
    ctx.lineTo(xp, yp);    

    rad1 = 270.0 * (Math.PI/180.0);
    rad2 = 30.0 * (Math.PI/180.0);
    ctx.arc(x, y, r, rad1, rad2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
        
    // 30 to 150
    ctx.fillStyle = color3;
    ctx.beginPath();
    ctx.moveTo(x, y);
    rad = 150.0 * (Math.PI/180.0);
    xp = x+(r*Math.cos(rad));
    yp = y+(r*Math.sin(rad));
    ctx.lineTo(xp, yp);
    
    ctx.moveTo(x, y);
    rad = 30.0 * (Math.PI/180.0);
    xp = x+(r*Math.cos(rad));
    yp = y+(r*Math.sin(rad));
    ctx.lineTo(xp, yp);
    
    rad1 = 30.0 * (Math.PI/180.0);
    rad2 = 150.0 * (Math.PI/180.0);
    ctx.arc(x, y, r, rad1, rad2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();    
    
    // Labels
    rad = 270.0 * (Math.PI/180.0);
    x1p = x+(r*Math.cos(rad));
    y1p = y+(r*Math.sin(rad));

    rad = 150.0 * (Math.PI/180.0);
    x2p = x+(r*Math.cos(rad));
    y2p = y+(r*Math.sin(rad));

    rad = 30.0 * (Math.PI/180.0);
    x3p = x+(r*Math.cos(rad));
    y3p = y+(r*Math.sin(rad));
    ctx.font = "12px Arial";
    ctx.strokeStyle = color1;
    ctx.fillStyle = color3;
    ctx.strokeText(label1, (x1p+x2p-label1.length*5)/2, (y1p+y2p)/2); 
    ctx.fillText(label1, (x1p+x2p-label1.length*5)/2, (y1p+y2p)/2); 
    ctx.strokeStyle = color3;
    ctx.fillStyle = color2;
    ctx.strokeText(label2, (x2p+x3p-label2.length*5)/2, (y2p+y3p)/2); 
    ctx.fillText(label2, (x2p+x3p-label2.length*5)/2, (y2p+y3p)/2); 
    ctx.strokeStyle = color2;
    ctx.fillStyle = color1;
    ctx.strokeText(label3, (x1p+x3p-label3.length*5)/2, (y1p+y3p)/2);    
    ctx.fillText(label3, (x1p+x3p-label3.length*5)/2, (y1p+y3p)/2);    
}