// Declare as variáveis globais para os objetos do jogo
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

// Carregue as imagens e o som do jogo usando as funções loadImage() e
// loadSound()
function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  // Carregue e adicione o som assustador no jogo
  spookySound = loadSound("spooky.wav");
}

// Aumente a largura e altura da tela
function setup(){
  createCanvas(600,600);
  // Carregue e adicione o som assustador no jogo
  spookySound.loop();
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
//   Adicione o código para criar um grupo, vamos agrupar os sprites que possuem um comportamento em comum.
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  // adicionar createSprite e addImage para o sprite de fantasma
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    // Adicione a condição para fazer o fantasma se mover
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    // Crie uma torre infinita
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();

    
    // Mude a velocidade do fantasma para 0, quando o fantasma tocar na grade
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
//      Adicione o código para que quando o fantasma tocar qualquer sprite do grupo
// invisível, o fantasma seja destruído
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  // Crie o estado do jogo para encerrar o jogo 
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnDoors() {
  //escreva o código aqui para gerar portas na torre
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    // Adicione os obstáculos que desejamos que apareçam aleatoriamente
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    // Altere a profundidade do fantasma e da porta
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //atribua tempo de vida à variável
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //adicione cada porta ao grupo
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

