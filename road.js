class Road{
    constructor(x,width, laneCount = 3){
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = x - width/2;
        this.right = x + width/2;

        const infinity = 1000000;
        // road never ends
        this.top = - infinity;
        this.bottom = infinity;

        // boarders
        const topLeft = {x:this.left, y:this.top};
        const topRight = {x:this.right, y:this.top};
        const bottomLeft = {x:this.left, y:this.bottom};
        const bottomRight = {x:this.right, y:this.bottom};

        this.borders=[
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ];
    }

    // puts the car in the center of the lane
    getLaneCenter(laneIndex){
        const laneWidth = this.width/this.laneCount;
 
        // CANNNOT HAVE TWO RETURN STATEMENTS IN IF ELSE!! SHOCKERS
        return this.left + laneWidth/2 + Math.min(laneIndex, this.laneCount - 1)
        *laneWidth;
    }

    draw(ctx){
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        // changes the number of lane depends on the input
        for (let i = 1; i <= this.laneCount - 1; i++){
            const x = lerp(
                this.left,
                this.right,
                i/this.laneCount
            );

            // dotted line instead of a straight line
            ctx.setLineDash([20,20]);
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }
        
        ctx.setLineDash([]);
        this.borders.forEach(border=>{
            ctx.beginPath();
            ctx.moveTo(border[0].x, border[0].y);
            ctx.lineTo(border[1].x, border[1].y);
            ctx.stroke();
        });
       
    }
}
