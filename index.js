const canvas= document.querySelector('canvas');
const c=canvas.getContext('2d');
canvas.width=window.innerWidth-25;
canvas.height=window.innerHeight-25; 
c.fillRect(0,0,canvas.width,canvas.height);
//creating arrow
window.addEventListener('resize',function(){
    canvas.width=window.innerWidth-25;
    canvas.height=window.innerHeight-25; 
    window.location.reload();
});
gravity=1;
    


const background=new Sprite({
    position:{
        x:0,
        y:0
    },
    imageSrc:'./img/background.png',
    scale:1
})
const shop=new Sprite({
    position:{
        x:200,
        y:100
    },
    imageSrc:'./img/shop.png',
    scale:2
})

const player=new Fighter({
    position:{
        x:0,y:0 
    },
    velocity:{
        x:0,y:10
    },
    color:'blue',
    offset:{
        x:0,
        y:0
    }
})

const enemy=new Fighter({
    position:{
        x:400,y:100 
    },
    velocity:{
        x:0,y:0
    },
    color:'yellow',
    offset:{
        x:50,
        y:50
    }
})
// enemy.draw();
// player.draw();

console.log(player);

const keys={
    a:{
        pressed:false
    },
    d:{
        pressed:false
    },
    w:{
        pressed:false
    },
    ArrowLeft:{
        pressed:false
    },
    ArrowRight:{
        pressed:false
    },
    ArrowUp:{
        pressed:false
    }
}

let hue=0
decreseTimer()
function animate(){
    c.fillStyle='rgba(0,0,0,0.2)'
    //c.globalCompositeOperation='source-over';
    c.fillRect(0,0,canvas.width,canvas.height)
    c.globalAlpha=9
    c.globalAlpha=1
    player.update()
    enemy.update()
    //player movement
    player.velocity.x=0;
    if(keys.a.pressed && player.lastKey==='a'){
        player.velocity.x=-5
    }else if(keys.d.pressed && player.lastKey==='d'){
        player.velocity.x=5
    }

    //enemy movement
    enemy.velocity.x=0;
    if(keys.ArrowLeft.pressed && enemy.lastKey==='ArrowLeft'){
        enemy.velocity.x=-5
    }else if(keys.ArrowRight.pressed && enemy.lastKey==='ArrowRight'){
        enemy.velocity.x=5
    }
  
   //detect collison
   if(rectangularCollision({rectangle1:player,rectangle2:enemy})&& player.isAttacking) {
        player.isAttacking=false
        enemy.health-=10;
        document.querySelector('#enemyHealth').style.width=enemy.health + '%'
   }
   if(rectangularCollision({rectangle1:enemy,rectangle2:player})&& enemy.isAttacking) {
    enemy.isAttacking=false
    player.health-=10;
    document.querySelector('#playerHealth').style.width=player.health + '%'
    console.log('go')
    }
    //end of the game if health is low
    if(enemy.health<=0 || player.health<=0){
      determineWinner({player,enemy,timerId})
    }
  hue++;
  window.requestAnimationFrame(animate)

}
animate()

window.addEventListener(
    'keydown',(event)=>{
        switch(event.key){
            case 'd':
                keys.d.pressed=true;
                player.lastKey='d'
            break
            case 'a':
                keys.a.pressed=true;
                player.lastKey='a'
            break
            case 'w':
                if(player.jump>0){
                    player.velocity.y=-20
                    player.jump-=1
                }
            break
            case ' ':
                player.attack()
            break
            case 'ArrowRight':
                keys.ArrowRight.pressed=true;
                enemy.lastKey='ArrowRight'
            break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed=true;
                enemy.lastKey='ArrowLeft'
            break
            case 'ArrowUp':
                if(enemy.jump>0){
                    enemy.velocity.y=-20
                    enemy.jump-=1    
                }
            break
            case 'ArrowDown':
                enemy.attack()
            break
            
        }
        console.log(event.key)
    }
)

window.addEventListener('keyup',(event)=>{
    switch(event.key){
        case 'd':
         keys.d.pressed=false;    
        break
        case 'a':
         keys.a.pressed=false;
        break
        case 'w':
         keys.w.pressed=false;
        break 
    }
    switch(event.key){
        case 'ArrowRight':
         keys.ArrowRight.pressed=false;    
        break
        case 'ArrowLeft':
         keys.ArrowLeft.pressed=false;
        break
        case 'ArrowUp':
         keys.ArrowUp.pressed=false;
        break
    }
})