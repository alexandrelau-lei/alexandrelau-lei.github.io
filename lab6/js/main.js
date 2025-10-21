if (!localStorage.getItem("produtos-selecionados")) {
  localStorage.setItem("produtos-selecionados", JSON.stringify([]));
}

const fmt = n => new Intl.NumberFormat("pt-PT",{style:"currency",currency:"EUR"}).format(n);

document.addEventListener("DOMContentLoaded", () => {
  const ano = document.getElementById("ano-atual");
  if (ano) ano.textContent = new Date().getFullYear();
  carregarProdutos(produtos);
  atualizaCesto();
});

function carregarProdutos(listaProdutos) {
  const lista = document.getElementById("lista-produtos");
  if (!lista) return;
  lista.innerHTML = "";
  listaProdutos.forEach(produto => {
    const li = document.createElement("li");
    li.appendChild(criarProduto(produto));
    lista.appendChild(li);
  });
}

function criarProduto(produto) {
  const artigo = document.createElement("article");
  const img = document.createElement("img");
  img.src = produto.image;
  img.alt = produto.title;
  const titulo = document.createElement("h3");
  titulo.textContent = produto.title;
  const descricao = document.createElement("p");
  descricao.textContent = produto.description;
  const preco = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = fmt(produto.price);
  preco.appendChild(strong);
  const botao = document.createElement("button");
  botao.textContent = "+ Adicionar ao Cesto";
  botao.addEventListener("click", () => {
    const carrinho = JSON.parse(localStorage.getItem("produtos-selecionados")) || [];
    carrinho.push(produto);
    localStorage.setItem("produtos-selecionados", JSON.stringify(carrinho));
    atualizaCesto();
  });
  artigo.append(img, titulo, descricao, preco, botao);
  return artigo;
}

function atualizaCesto() {
  const listaCesto = document.getElementById("lista-cesto");
  const outItens = document.getElementById("total-itens");
  const outPreco = document.getElementById("total-preco");
  if (!listaCesto) return;
  const carrinho = JSON.parse(localStorage.getItem("produtos-selecionados")) || [];
  listaCesto.innerHTML = "";
  let totalItens = 0;
  let totalPreco = 0;
  carrinho.forEach((produto, idx) => {
    const li = document.createElement("li");
    li.appendChild(criaProdutoCesto(produto, idx));
    listaCesto.appendChild(li);
    totalItens += 1;
    totalPreco += Number(produto.price) || 0;
  });
  if (outItens) outItens.textContent = totalItens;
  if (outPreco) outPreco.textContent = totalPreco.toFixed(2);
}

function criaProdutoCesto(produto, index) {
  const artigo = document.createElement("article");
  const titulo = document.createElement("h3");
  titulo.textContent = produto.title;
  const preco = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = fmt(produto.price);
  preco.appendChild(strong);
  const btnRem = document.createElement("button");
  btnRem.textContent = "Remover";
  btnRem.addEventListener("click", () => {
    const carrinho = JSON.parse(localStorage.getItem("produtos-selecionados")) || [];
    carrinho.splice(index, 1);
    localStorage.setItem("produtos-selecionados", JSON.stringify(carrinho));
    atualizaCesto();
  });
  artigo.append(titulo, preco, btnRem);
  return artigo;
}