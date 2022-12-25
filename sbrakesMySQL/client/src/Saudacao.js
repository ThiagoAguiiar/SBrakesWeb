export default function Saudacao() {
  const data = new Date();
  const hora = data.getHours();

  if (hora >= 1 && hora < 12) {
    return "Bom dia";
  }

  if (hora >= 12 && hora <= 18) {
    return "Boa tarde";
  }

  if (hora > 18 && hora < 24) {
    return "Boa noite";
  }
}
