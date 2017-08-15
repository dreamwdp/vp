export function getBoxPercWidth() {
  let result = 0;
  let w = window.innerWidth;
  if(w >= 1440){
    result = 74;
  } else if(w >= 1280){
    result = 85;
  }else if(w >= 1024){
    result = 78;
  }else if(w >= 768){
    result = 80;
  }else {
    result = 92;
  }

  result += '%';
  return result;
}

export function mobileDetect() {
  var isMobile = false;
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    isMobile = true;
  }

  return isMobile;
}

export function scrollTop() {
  if(window.scrollY > 220){
    window.scrollTo(0, 0);
  }
}

export function downloadCanvas(color) {
  const HEIGHT = 380,
    WIDTH = 340,
    MARGIN = 13,
    CANVASRATIO = 0.7,
    BOTTOMRADIO = 5;
  const colors = color.split('#').map(v => '#'+v);
  const myCanvas = document.createElement('canvas');
  const ctx = myCanvas.getContext('2d');
  myCanvas.id = "tempCanvas";
  myCanvas.width = WIDTH;
  myCanvas.height = HEIGHT;
  myCanvas.style = 'border: 1px solid #c1c1c1';
  myCanvas.toDataURL();

  const boxHts = [
    HEIGHT * CANVASRATIO * 0.4,
    HEIGHT * CANVASRATIO * 0.25,
    HEIGHT * CANVASRATIO * 0.175,
    HEIGHT * CANVASRATIO * 0.175,
  ];
  ctx.fillStyle = '#fff';
  ctx.fillRect(0,0, WIDTH, HEIGHT);
  
  ctx.fillStyle = colors[0];
  ctx.fillRect(MARGIN,MARGIN,WIDTH - (MARGIN * 2), boxHts[0]);
  ctx.fillStyle = colors[1];
  ctx.fillRect(MARGIN,MARGIN + boxHts[0],WIDTH - (MARGIN * 2), boxHts[1]);
  ctx.fillStyle = colors[2];
  ctx.fillRect(MARGIN,MARGIN + boxHts[0] + boxHts[1],WIDTH - (MARGIN * 2), boxHts[2]);
  ctx.fillStyle = colors[3];
  ctx.fillRect(MARGIN,MARGIN + boxHts[0] + boxHts[1] + boxHts[2],WIDTH - (MARGIN * 2), boxHts[3]);

	const colorTxtPosition = CANVASRATIO* HEIGHT + (MARGIN * 3),
  space = 17;
  
	ctx.font = '13px Arial';
  ctx.fillStyle = "#a3a3a3";
  ctx.fillText('ColorPK.com', WIDTH - MARGIN - 78,colorTxtPosition + space * 3);  
  
  ctx.font = '15px Arial';
  ctx.fillStyle = '#218bbc';
  ctx.fillText(colors[0], MARGIN, colorTxtPosition);  
  ctx.fillText(colors[1], MARGIN, colorTxtPosition + space);
  ctx.fillText(colors[2], MARGIN, colorTxtPosition + space * 2);
  ctx.fillText(colors[3], MARGIN, colorTxtPosition + space * 3);




  document.body.appendChild(myCanvas);
}
