let faseAtual = 0;

const fases = [
  {
    dialogos: [
      "Você acorda em uma floresta escura...",
      "Um monstro aparece diante de você!",
      "Prepare-se para batalhar com ele!"
    ],
    inimigo: { nome: "Goblin", hp: 50, ataque: 5 }
  },
  {
    dialogos: [
      "Você segue em frente pela trilha sombria...",
      "Um Orc bloqueia seu caminho!",
      "Ele parece mais forte que o anterior!"
    ],
    inimigo: { nome: "Orc", hp: 80, ataque: 12 }
  },
  {
    dialogos: [
      "Você chega a uma caverna misteriosa...",
      "Um Dragão enorme surge das sombras!",
      "Esta será a batalha mais difícil!"
    ],
    inimigo: { nome: "Dragão", hp: 150, ataque: 20 }
  }
];

let inventario = [];

if (faseAtual === 0) {
  inventario.push("Espada de Ferro");
}


let dialogoIndex = 0;
let player = { nome: "Herói", hp: 100, ataque: 10 };
let inimigo = { nome: "Goblin", hp: 50, ataque: 5 };

function mostrarProximoDialogo() {
  const box = document.getElementById("dialogoBox");
  const dialogos = fases[faseAtual].dialogos;

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

  // pega o inimigo da fase atual
  inimigo = { ...fases[faseAtual].inimigo }; // clona pra não alterar original
  atualizarStats();
}


function atualizarStats() {
  document.getElementById("playerStats").innerText = `${player.nome} - HP: ${player.hp} | ATK: ${player.ataque}`;
  document.getElementById("enemyStats").innerText = `${inimigo.nome} - HP: ${inimigo.hp} | ATK: ${inimigo.ataque}`;
}


function atacar() {
  const log = document.getElementById("batalhaLog");

  inimigo.hp -= player.ataque;
  log.innerText = `${player.nome} atacou ${inimigo.nome} causando ${player.ataque} de dano!`;

  if (inimigo.hp <= 0) {
    log.innerText += `\n${inimigo.nome} foi derrotado!`;
    document.getElementById("batalhaBox").style.display = "none";
    document.getElementById("depoisdabatalhabox").style.display = "block";
    return;
  }

  player.hp -= inimigo.ataque;
  log.innerText += `\n${inimigo.nome} contra-atacou causando ${inimigo.ataque} de dano!`;

  if (player.hp <= 0) {
    log.innerText += `\n${player.nome} foi derrotado!`;
    alert("Você perdeu a batalha...");
    document.getElementById("batalhaBox").style.display = "none";
    return;
  }

  atualizarStats();
}

function defender() {
  const log = document.getElementById("batalhaLog");
  player.hp += 5;
  log.innerText = `${player.nome} se defendeu e recuperou 5 HP!`;

  player.hp -= inimigo.ataque;
  log.innerText += `\n${inimigo.nome} atacou causando ${inimigo.ataque} de dano!`;

  if (player.hp <= 0) {
    log.innerText += `\n${player.nome} foi derrotado!`;
    alert("Você perdeu a batalha...");
    document.getElementById("batalhaBox").style.display = "none";
    return;
  }

  atualizarStats();
}

function fugir() {
  const log = document.getElementById("batalhaLog");
  log.innerText = `${player.nome} fugiu da batalha!`;
  document.getElementById("batalhaBox").style.display = "none";
  document.getElementById("dialogoBox").style.display = "block";

  // Reinicia o estado da batalha se quiser continuar
  dialogoIndex = 0;
  player.hp = 100;
  inimigo.hp = 50;
  atualizarStats();
  mostrarProximoDialogo();
}

function continuar() {
  document.getElementById("depoisdabatalhabox").style.display = "none";
  document.getElementById("dialogoBox").style.display = "block";

  // Buffs por progresso
  if (faseAtual === 0) {
    player.ataque += 5; // ganha uma espada
    alert("Você encontrou uma Espada de Ferro! (+5 ataque)");
  } else if (faseAtual === 1) {
    player.hp += 30; // ganha poção de vida permanente
    alert("Você encontrou uma Poção de Vitalidade! (+30 HP)");
  }

  faseAtual++;
  dialogoIndex = 0;

  if (faseAtual < fases.length) {
    mostrarProximoDialogo();
  } else {
    document.getElementById("dialogoBox").innerText = "Parabéns, você completou o jogo!";
    document.getElementById("batalhaBox").style.display = "none";
  }
}



// Inicia o jogo
window.onload = () => {
  mostrarProximoDialogo();
  document.getElementById("dialogoBox").onclick = mostrarProximoDialogo;
};
