const form = document.getElementById("formReserva");
const lista = document.getElementById("listaReservas");
const mensagem = document.getElementById("mensagem");
const whatsappBtn = document.getElementById("whatsappBtn");

let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

// Mostrar reservas
function mostrarReservas() {
  lista.innerHTML = "";

  reservas.forEach((reserva, index) => {
    let item = document.createElement("li");

    item.innerHTML = `
      ${reserva.nome} - ${reserva.pessoas} pessoas - ${reserva.data} às ${reserva.hora}
      <button onclick="removerReserva(${index})">❌</button>
    `;

    lista.appendChild(item);
  });
}

// Remover reserva
function removerReserva(index) {
  reservas.splice(index, 1);
  localStorage.setItem("reservas", JSON.stringify(reservas));
  mostrarReservas();
}

// Submeter formulário
form.addEventListener("submit", function(e) {
  e.preventDefault();

  let nome = document.getElementById("nome").value;
  let pessoas = document.getElementById("pessoas").value;
  let data = document.getElementById("data").value;
  let hora = document.getElementById("hora").value;

  let reserva = { nome, pessoas, data, hora };

  reservas.push(reserva);
  localStorage.setItem("reservas", JSON.stringify(reservas));

  mensagem.textContent = "Reserva confirmada!";

  mostrarReservas();
  form.reset();
});

// WhatsApp
whatsappBtn.addEventListener("click", function () {
  let texto = "Olá, gostaria de reservar uma mesa no Restaurante MBalu";
  let numero = "244949876388"; // 👉 coloca teu número

  let url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
  whatsappBtn.href = url;
});

// Inicializar
mostrarReservas();