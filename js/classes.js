
class Sprite{
    constructor({position,imageSrc,scale=1}){
        this.position=position;
        this.height=150
        this.width=50
        this.image=new Image()
        this.image.src=imageSrc
        this.scale=scale
    }
    draw(){
        c.drawImage(
            this.image,
            0,
            0,
            this.width*2.3,
            this.height,
            this.position.x,
            this.position.y,
            (this.image.width/6)*this.scale,
            this.image.height*this.scale
            )
    }

    update(){
        //dc.globalCompositeOperation='xor';
        this.draw()
    }

}
class Fighter{
    constructor({position,velocity,color='red',offset}){
        this.jump=2;
        this.position=position;
        this.velocity=velocity;
        this.height=150
        this.width=50
        this.lastKey
        this.attackBox={
            position:{
                x:this.position.x,
                y:this.position.y
            },
            offset,
            width:100 ,
            height:50 
        }
        this.color=color
        this.isAttacking
        this.health=100
    }
    draw(){
        c.fillStyle=this.color
        
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
        
        //attack box
        
        if(this.isAttacking){
            c.fillStyle='green'
            c.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height)
            }
    }
    update(){
        //dc.globalCompositeOperation='xor';
        this.draw()
        this.attackBox.position.x=this.position.x -this.attackBox.offset.x
        this.attackBox.position.y=this.position.y
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
        if(this.position.y+this.height+this.velocity.y>=canvas.height-10){
            this.velocity.y=0
            this.jump=2;
        }else{
            this.velocity.y+=gravity
        }
    }
    attack(){
        this.isAttacking=true
        setTimeout(()=>{
            this.isAttacking=false
        },100)
    }
}
