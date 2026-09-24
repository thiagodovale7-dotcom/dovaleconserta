/* ==========================================================
   DEPOIMENTOS
   Os nomes e textos abaixo são fictícios (exemplos).
   Para usar fotos reais, coloque os arquivos na pasta "img"
   e preencha "antes" e "depois", por exemplo: "img/cliente1-antes.jpg".
   Se ficar vazio (""), o site mostra uma ilustração de exemplo.
   ========================================================== */
const depoimentos = [
  {
    nome: "Mariana Albuquerque",
    detalhe: "Professora, Aldeota",
    texto: "Meu notebook levava dez minutos para ligar. O Thiago trocou o HD por um SSD e fez a limpeza. Hoje liga em segundos e ainda ficou silencioso.",
    servico: "Manutenção e upgrade",
    antes: "",
    depois: "",
  },
  {
    nome: "Carlos Eduardo Pinheiro",
    detalhe: "Dono de escritório contábil, Meireles",
    texto: "Ele montou a rede do escritório, organizou os cabos e configurou o Wi-Fi. Acabaram as quedas de conexão no meio do atendimento.",
    servico: "Montagem de rede",
    antes: "",
    depois: "",
  },
  {
    nome: "Rafael Sampaio",
    detalhe: "Estudante de Engenharia, Benfica",
    texto: "Montou meu PC dentro do orçamento que eu tinha e explicou cada peça. Roda tudo o que preciso para a faculdade e os jogos.",
    servico: "Montagem de computador",
    antes: "",
    depois: "",
  },
];

/* Ilustrações de exemplo (SVG) usadas quando não há foto */
function ilustracao(tipo, indice) {
  const sujo = tipo === "antes";
  const fundo = sujo ? "#5b5a55" : "#dfe8e3";
  const caixa = sujo ? "#3d3c39" : "#f7faf8";
  const cabos = sujo
    ? `<path d="M60 250 C120 180 200 300 260 200 S330 260 340 160" stroke="#8a6d3b" stroke-width="7" fill="none"/>
       <path d="M40 280 C140 230 180 320 300 260" stroke="#a04a3a" stroke-width="7" fill="none"/>
       ${Array.from({ length: 26 }, (_, i) => `<circle cx="${(i * 97 + indice * 41) % 400}" cy="${(i * 53) % 300}" r="${2 + (i % 4)}" fill="#8b8a84" opacity=".7"/>`).join("")}`
    : `<path d="M90 250 H310" stroke="#0E6B57" stroke-width="6" fill="none"/>
       <path d="M90 268 H310" stroke="#E8B923" stroke-width="6" fill="none"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
    <rect width="400" height="300" fill="${fundo}"/>
    <rect x="110" y="40" width="180" height="170" rx="8" fill="${caixa}" stroke="${sujo ? "#242321" : "#0B3B30"}" stroke-width="4"/>
    <circle cx="200" cy="125" r="42" fill="none" stroke="${sujo ? "#6f6e69" : "#0E6B57"}" stroke-width="5"/>
    <path d="M200 125 L200 90 M200 125 L230 142 M200 125 L170 142" stroke="${sujo ? "#6f6e69" : "#0E6B57"}" stroke-width="5"/>
    <rect x="130" y="185" width="140" height="10" rx="3" fill="${sujo ? "#2d2c2a" : "#E8B923"}"/>
    ${cabos}
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

function criarDepoimento(d, i) {
  const antes = d.antes || ilustracao("antes", i);
  const depois = d.depois || ilustracao("depois", i);
  const el = document.createElement("article");
  el.className = "depoimento";
  el.innerHTML = `
    <div class="comparador">
      <img class="depois" src="${depois}" alt="Equipamento de ${d.nome} depois do serviço">
      <img class="antes" src="${antes}" alt="Equipamento de ${d.nome} antes do serviço">
      <span class="linha"></span>
      <span class="rotulo e">Antes</span>
      <span class="rotulo d">Depois</span>
      <input type="range" min="0" max="100" value="50" aria-label="Comparar antes e depois: ${d.servico}">
    </div>
    <blockquote>“${d.texto}”</blockquote>
    <cite>${d.nome}<span>${d.detalhe} · ${d.servico}</span></cite>`;
  const comp = el.querySelector(".comparador");
  const range = el.querySelector("input");
  range.addEventListener("input", () => comp.style.setProperty("--pos", range.value + "%"));
  return el;
}

const lista = document.getElementById("lista-depoimentos");
depoimentos.forEach((d, i) => lista.appendChild(criarDepoimento(d, i)));

/* Menu do celular */
const btn = document.querySelector(".menu-btn");
const menu = document.getElementById("menu");
btn.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  btn.setAttribute("aria-expanded", aberto);
});
menu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menu.classList.remove("aberto");
    btn.setAttribute("aria-expanded", "false");
  })
);

/* Ano no rodapé */
document.getElementById("ano").textContent = new Date().getFullYear();
