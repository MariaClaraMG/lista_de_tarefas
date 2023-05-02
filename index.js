// texto
const texto = document.querySelector('input')
// botão de enviar
const btnInsert = document.querySelector('.add button')
// lixeira
const btnDeleteAll = document.querySelector('.titulo button')
// lista
const ul = document.querySelector('ul')

// variavel global, para armazenar os dados
var itensDB = []

// enviar o texto a partir da tecla enter
texto.addEventListener('keypress', function (e) {
    if (e.key == 'Enter' && texto.value != '') {
        setItemDB()
    }
})

// enviar o texto a partir do click
btnInsert.onclick = () => {
    if (texto.value != '') {
        setItemDB()
    }
}


// limite de quantos itens pode ser adds
function setItemDB() {
    if (itensDB.length >= 17) {
        alert('Limite máximo de 15 itens atingido!')
        return
    }
    // quanto o limite for respeitado, o item é add na variavel
    itensDB.push({ 'item': texto.value, 'status': '' })
    updateDB()
}


// atualiza as ações
// o localStorage armazena as tarefas adicionadas. A função updateDB atualiza o banco de dados sempre que uma tarefa é adicionada ou removida.
function updateDB() {
    localStorage.setItem('todolist', JSON.stringify(itensDB))
    loadItens()
}


// carrega os itens da lista de tarefas a partir do banco de dados local e exibi-os na tela. 
// Ele usa o método localStorage.getItem() para recuperar os itens do banco de dados local, converte a string JSON em um objeto JavaScript usando a função JSON.parse(), 
// e adiciona cada item à tela usando a função insertItemTela().
function loadItens() {
    ul.innerHTML = "";
    itensDB = JSON.parse(localStorage.getItem('todolist')) ?? []
    itensDB.forEach((item, i) => {
        insertItemTela(item.item, item.status, i)
    })
}

// recebe três argumentos: o texto do item, seu status e o índice do item no array. 
// Ele cria um elemento li para representar cada item na lista, com um checkbox para marcar como concluído, um span para exibir o texto do item e um botão para remover o item. 
// Ele adiciona um evento onchange para o checkbox, que chama a função done() para atualizar o status do item no banco de dados local. 
// Ele também adiciona um evento onclick para o botão, que chama a função removeItem() para remover o item do banco de dados local.
function insertItemTela(text, status, i) {
    const li = document.createElement('li')

    li.innerHTML = `
    <div class="divLi">
      <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});" />
      <span data-si=${i}>${text}</span>
      <button onclick="removeItem(${i})" data-i=${i}><i class='bx bx-trash'></i></button>
    </div>
    `
    ul.appendChild(li)

    if (status) {
        document.querySelector(`[data-si="${i}"]`).classList.add('line-through')
    } else {
        document.querySelector(`[data-si="${i}"]`).classList.remove('line-through')
    }

    texto.value = ''
}

// A função done() é responsável por atualizar o status do item no banco de dados local quando o usuário marca ou desmarca o checkbox. 
// Ele atualiza o status do item no array itensDB e chama a função updateDB() para atualizar o banco de dados local.
function done(chk, i) {

    if (chk.checked) {
        itensDB[i].status = 'checked'
    } else {
        itensDB[i].status = ''
    }

    updateDB()
}

// lixeira individual
// A função removeItem() é responsável por remover o item da lista quando o usuário clica no botão de remoção. 
// Ele remove o item do array itensDB e chama a função updateDB() para atualizar o banco de dados local.
function removeItem(i) {
    itensDB.splice(i, 1)
    updateDB()
}

// lixeira geral
// adiciona um evento onclick para o botão de limpar todos os itens da lista, 
// que remove todos os itens do array itensDB e chama a função updateDB() para atualizar o banco de dados local.

btnDeleteAll.onclick = () => {
    itensDB = []
    updateDB()
}

loadItens()