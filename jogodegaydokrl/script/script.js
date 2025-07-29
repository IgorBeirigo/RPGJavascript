// script.js

const dialogos = [
  "Você acorda em uma floresta escura...",
  "Um monstro aparece diante de você!",
  "Prepare-se para batalhar com ele!"
];

let dialogoIndex = 0;
let player = { nome: "Herói", hp: 100, ataque: 10 };
let inimigo = { nome: "Goblin", hp: 50, ataque: 5 };

function mostrarProximoDialogo() {
  const box = document.getElementById("dialogoBox");
  if (dialogoIndex < dialogos.length) {
    box.innerText = dialogos[dialogoIndex];
    dialogoIndex++;
  } else {
    iniciarBatalha();
  }
}

function iniciarBatalha() {
  document.getElementById("dialogoBox").style.display = "none";
  document.getElementById("batalhaBox").style.display = "block";
  atualizarStats();
}

function atualizarStats() {
  document.getElementById("playerStats").innerText = `${player.nome} - HP: ${player.hp}`;
  document.getElementById("enemyStats").innerText = `${inimigo.nome} - HP: ${inimigo.hp}`;
}
//da pra adicionar atacar, defender e fugir em um switch case
function defender() {
  player.hp += 5; // Regenera um pouco de HP
  alert(`${player.nome} se defendeu e recuperou 5 HP!`);
  atualizarStats();
}
function fugir() {
  alert(`${player.nome} fugiu da batalha!`);
  document.getElementById("batalhaBox").style.display = "none";
  document.getElementById("dialogoBox").style.display = "block";
  dialogoIndex = 0; // Reseta o diálogo
  mostrarProximoDialogo();
}

function atacar() {
  inimigo.hp -= player.ataque;
  if (inimigo.hp <= 0) {
    alert(`${inimigo.nome} foi derrotado!`);
    document.getElementById("batalhaBox").style.display = "none";
    document.getElementById("dialogoBox").style.display = "block";
    dialogoIndex = 0; // Reseta o diálogo
    mostrarProximoDialogo();
    return;
  }  

  player.hp -= inimigo.ataque;
  if (player.hp <= 0) {
    alert("Você foi derrotado!");
    return;
  }

  atualizarStats();
}

window.onload = mostrarProximoDialogo;
document.getElementById("dialogoBox").onclick = mostrarProximoDialogo;
