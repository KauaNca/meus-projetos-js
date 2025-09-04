let componentes = {
    input: document.querySelector("#input-tarefa"),
    btnAdd: document.querySelector("#adicionarTarefa"),
    lista: document.querySelector("#listaTarefas")
};
componentes.btnAdd.addEventListener("click", ()=>{
    let tarefa = new Tarefa();
    let resultado = tarefa.setTarefa(componentes.input.value);
    if(resultado) {
        componentes.input.value = "";
        let table = document.querySelector("table");
        // while(tarefa.getTarefa().length > 0) {
        //     let tr = document.createElement("tr");
        //     let tdNumero = document.createElement("td");
        //     let tdTarefa = document.createElement("td");
        //     tdNumero.innerText = tarefa.getTarefa()[0].numero;
        //     tdTarefa.innerText = tarefa.getTarefa()[0].tarefa;
        //     tr.appendChild(tdNumero);
        //     tr.appendChild(tdTarefa);
        //     table.appendChild(tr);
        //     tarefa.getTarefa().shift();

        // }
        tarefa.salvarTarefa();
    }
});

class Tarefa {
  #tarefa = [];
  #contagem = 0;

  setTarefa(tarefa) {
    if (tarefa) {
      this.#tarefa.push({
        numero: this.#contagem++,
        tarefa: tarefa,
      });
      return true;
    } else {
      return "Erro: O valor passado é inválido";
    }
  }
  getTarefa() {
    return this.#tarefa;
  }
  salvarTarefa() {
    localStorage.setItem("tarefas", JSON.stringify(this.#tarefa));
  }
  carregarTarefa() {
    this.#tarefa = JSON.parse(localStorage.getItem("tarefas")) || [];
    this.#contagem = this.#tarefa.length
      ? this.#tarefa[this.#tarefa.length - 1].numero + 1
      : 0;
    return this.#tarefa;
  }
}
