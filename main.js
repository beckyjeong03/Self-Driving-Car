const carCanvas=document.getElementById("carCanvas");

carCanvas.width = 200;

const networkCanvas=document.getElementById("networkCanvas");

networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width/2, carCanvas.width*0.9);
const car = new Car(road.getLaneCenter(1),500,30,50,"AI",3);
const traffic = [
    new Car(road.getLaneCenter(1), 100, 30, 50,"DUMMY",2)
];


animate();

function animate(time){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    car.update(road.borders,traffic);

    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;

    carCtx.save();
    // perspective is fixed on the top of the car
    // translating the canvas
    carCtx.translate(0, -car.y + carCanvas.height*0.8);


    road.draw(carCtx);
    for (let i = 0; i<traffic.length;i++){
        traffic[i].draw(carCtx,"red");
    }
    car.draw(carCtx,"black");

    carCtx.restore();

    networkCtx.lineDashOffset = time;
    Visualizer.drawNetwork(networkCtx,car.brain);


    requestAnimationFrame(animate);

}