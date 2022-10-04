const API_URL = 'http://localhost:8000';

function marcarTodos() {
    let todos = document.querySelectorAll('[data-check="acao"]');

    todos.forEach((cadaCheck) => {
        if (cadaCheck.checked === true) {
            cadaCheck.checked = false
        } else {
            cadaCheck.checked = true;
        }
    });
}

function buscarParaEditar(id) {
    input_editar_id.value = id;

    fetch(API_URL + '/contatos/' + id)  //http://localhost:8000/contatos/
        .then(res => res.json())
        .then(dados => {
            input_editar_id.value = dados.id;
            input_editar_nome.value = dados.nome;
            input_editar_telefone.value = dados.telefone;
            input_editar_endereco.value = dados.endereco;
        });
}

function editar() {
    event.preventDefault();  //impedindo a pagina de dar refresh
    
    let dados = {           //recuperando os dados do formulario
        id: input_editar_id.value,
        nome: input_editar_nome.value,
        telefone: input_editar_telefone.value,
        endereco: input_editar_endereco.value,
    };

    fetch(API_URL +'/contatos/' + input_editar_id.value, {
        method: 'PATCH',
        body: JSON.stringify(dados),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(() => atualizarLista());

    let x = document.querySelector('[data-bs-dismiss="offcanvas"]');

    x.dispatchEvent(new Event('click'));
}

function inserir() {
    event.preventDefault();     //para a pagina não dar refresh

    let dados = {
        nome: input_nome.value,
        telefone: parseInt(input_telefone.value),
        endereco: input_endereco.value,
    };

    fetch(API_URL + '/contatos/', {
        method:'POST',
        body: JSON.stringify(dados),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resposta => resposta.json())
        .then(resposta => atualizarLista());

    add.reset();
}

async function excluir(id) {
    let resposta = confirm('Tem certeza que deseja excluir?');

    if (resposta !== true) {    
        return;
    }

    await fetch(API_URL + '/contatos/' + id, {
        method: 'DELETE'
    });

    atualizarLista();
}

function atualizarLista() {
    tabela_contatos.innerHTML = '';

    fetch(API_URL + '/contatos/')
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (lista) {
            lista.forEach(function (cadaContato) { //usando simbolo material-icons para os botões editar e excluir abaixo
                tabela_contatos.innerHTML += `   
                    <tr>
                        <td> <input data-check="acao" type="checkbox"> </td>
                        <td>${cadaContato.id}</td>
                        <td>${cadaContato.nome}</td>
                        <td>${cadaContato.telefone}</td>
                        <td>${cadaContato.endereco}</td>
                        <td>
                            <button onclick="buscarParaEditar(${cadaContato.id})" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEditar" class="botaoEditar material-icons"> <span>edit</span>
                                
                            </button>   

                            <button onclick="excluir(${cadaContato.id})" class="botaoExcluir material-icons"> <span>delete</span>
                                
                            </button>                        
                        </td>
                    </tr>
                `;
            })
        })
}
atualizarLista()