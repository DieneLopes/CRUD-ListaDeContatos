function filtrar() {   
    let expressao = input_busca.value;   //valor que o usuario digitou

    let linhas = tabela_contatos.getElementsByTagName('tr');   //pagando todas as linhas (<tr>) da tabela 

    for (let posicao in linhas) {
        if (isNaN(posicao)) {
            continue;
        }

        //se dentro da linha atual (<tr>) existir a expressão digitada pelo usuário, mostrar a linha. Se não, esconde a linha 

        let coluna1 = linhas[posicao].children[1].innerText.toLowerCase();
        let coluna2 = linhas[posicao].children[2].innerText.toLowerCase();
        let coluna3 = linhas[posicao].children[3].innerText.toLowerCase();

        let colunas = coluna1 + coluna2 + coluna3;

        //let linha = linhas[posicao].innerText.toLowerCase();

        if(colunas.includes(expressao) ) {
            linhas[posicao].style.display = '';
        } else {
            linhas[posicao].style.display = 'none';
        }

    console.log(posicao);
    }    
}