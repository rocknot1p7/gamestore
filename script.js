const canvas=document.getElementById('canvas1');
const ctx= canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let particleArray=[];
particleArray.push(10);
flip=0;
//handle mouse
const mouse={
    x:null,
    y:null,
    radius:100
}

window.addEventListener('mousemove',function(event){
    mouse.x=event.x;
    mouse.y=event.y;
    // console.log(mouse.x,mouse.y);
});
ctx.fillStyle='white';
ctx.font='30px Verdana';
ctx.fillText('GAME*',3,30);

const textCoordinates=ctx.getImageData(0,0,120,40);
// console.log(textCoordinates.data);

class Particle{
    constructor(x,y){
        this.x=x*4;
        this.y=y*4;
        this.size=1;
        this.baseX=this.x;
        this.baseY=this.y;
        this.density=(Math.random()*40)+5;
    }
    draw(){
        ctx.fillStyle='white';
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.closePath(); 
        ctx.fill();
    }
    update(){
        let dx=mouse.x-this.x;
        let dy=mouse.y-this.y;
        let distance=Math.sqrt(dx*dx+dy*dy);
        let forceDirectionX=dx/distance;
        let forceDirectionY=dy/distance;
        let maxDistance=mouse.radius;
        let force=(maxDistance-distance)/maxDistance;
        let directionX=forceDirectionX*force*this.density;
        let directionY=forceDirectionY*force*this.density;

        if(distance<mouse.radius){
            if(flip==0){
                this.x-=directionX;
                this.y-=directionY;
            }else if(flip==1){
                this.x+=directionX;
                this.y+=directionY;
            }else if(flip==2){
                this.x*=directionX;
                this.y/=directionY;
            }else if(flip==3){
                this.x+=directionX/1000;
                this.y-=directionY;
            }else{
                this.x*=directionX;
                this.y*=directionY;
            }
          
           // this.size=1;
        }else{
            if(this.x!==this.baseX){
                let dx=this.x-this.baseX;
                this.x-=dx/10;
            }
            if(this.y!==this.baseY){
                let dy=this.y-this.baseY;
                this.y-=dy/10;
            }
           this.size=3;
        }
        
    
    }
}

function init(){
    particleArray=[];
    for(let y=0,y2=textCoordinates.height;y<y2;y++){
        for(let x=0,x2=textCoordinates.width;x<x2;x++){
            // console.log(textCoordinates.data[(y*4*textCoordinates.width)+(x*4)+3]);
            if(textCoordinates.data[(y*4*textCoordinates.width)+(x*4)+3]>='128'){
                let positionX=x*3.5;
                let positionY=y*3.5;
                particleArray.push(new Particle(positionX,positionY));
            }
        }
    }


 
}
init();

function handleParticles(){
    let hue=0;
    for(let i=0;i<particleArray.length;i++){
        particleArray[i].update();
        for(let j=i; j<particleArray.length;j++){
            const dx=particleArray[i].x-particleArray[j].x;
            const dy=particleArray[i].y-particleArray[j].y;
            const distance=Math.sqrt(dx*dx+dy*dy);

            const dxm=particleArray[j].x-mouse.x;
            const dym=particleArray[j].y-mouse.y;

            const distancem=Math.sqrt(dxm*dxm+dym*dym);
            if(distancem>100&&distance<25){
                ctx.beginPath();
                ctx.strokeStyle='hsl('+hue+',100%,50%)';
                ctx.lineWidth=particleArray[i].size/1.5;
                ctx.moveTo(particleArray[i].x,particleArray[i].y);
                //ctx.lineTo(mouse.y,mouse.x);
                ctx.lineTo(particleArray[j].x,particleArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        if(particleArray[i].size<=0.3){
            particleArray.splice(i,1);
            i--;
        }
        hue+=10;
    }
}
//console.log("hello");

window.addEventListener(
    'keydown',(event)=>{
        switch(event.key){
            case 'w':
                if(flip<4){
                    flip+=1;
                }
            break
            case 's':
                if(flip>0){
                    flip-=1;
                }
            break
        }
    })
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<particleArray.length;i++){
        particleArray[i].draw();
        particleArray[i].update();
    }
    handleParticles();
    requestAnimationFrame(animate);
}
animate();
   //for random generation of particles;
    // for(let i=0;i<1000;i++){
    //     let x=Math.random()*canvas.width;
    //     let y=Math.random()*canvas.height;
    //     particleArray.push(new Particle(x,y));
    // }