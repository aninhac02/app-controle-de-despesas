const transactionsUl = document.querySelector('#transactions');// id da lista nao ordenada no html
const incomeDisplay = document.querySelector('#money-plus'); // id de receitas
const expenseDisplay = document.querySelector('#money-minus'); // id de despesas
const balanceDisplay = document.querySelector('#balance');

const nameDisplay = document.querySelector('#name');
const amountDisplay = document.querySelector('#amount');

// objeto literal
let dummyTransactions = [
    { id: 1, name: 'Bolo de brigadeiro', amount: -20 },
    { id: 2, name: 'Salario', amount: 300 },
    { id: 3, name: 'Torta de frango', amount: -10 },
    { id: 4, name: 'Violão', amount: 150 }
]

// funcao para adicionar os itens na lista 
const addTransactionsIntoDOM = transaction =>{
    const operator = transaction.amount < 0 ? '-' : '+';// IF TERNARIO para saber se é despesa ou receita
    const amountWithoutOperator = Math.abs(transaction.amount);
    const li = document.createElement('li'); // criado o elemento de item de lista 'li'
    
    //aqui eu escreveo dentro do elemente criado na linha anterior
    li.innerHTML = 
    `${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span> <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button> `

    transactionsUl.append(li);
}


/**
 * Metodo que irá retonar todo os valores somando as receitas e despesas
 */

const updateBalanceValues = () =>{
    // retornar somente a propriedade amount de cada linha do objetio 
    const transactionsAmounts = dummyTransactions.map(transaction => transaction.amount);
    
    //retorna o totalizador
    const total = transactionsAmounts
                  .reduce((accumulator, transaction) => accumulator + transaction, 0)
                  .toFixed(2);   

    // retona somente as receitas              
    const income = transactionsAmounts
                   .filter(value => value > 0)
                   .reduce((accumulator, transaction) => accumulator + transaction, 0)
                   .toFixed(2); 
                
    // retona somente as receitas              
    const expense = transactionsAmounts
                   .filter(value => value < 0)
                   .reduce((accumulator, transaction) => accumulator + transaction, 0)
                   .toFixed(2); 
    
    balanceDisplay.textContent = `R$ ${total}`;           
    incomeDisplay.textContent = `R$ ${income}`;
    expenseDisplay.textContent = `R$ ${expense}`;
}

//gerador de id random
const generateId = () => Math.round(Math.random() * 1000);

// adicionar o listener  no submit
formulario.addEventListener('submit', event => {
    event.preventDefault();
    const transactionName = nameDisplay.value.trim();
    const transactionAmount = amountDisplay.value.trim();

    if(nameDisplay.value.trim() === '' ||transactionAmount === ''){
        alert('Informe o nome e o valor da transacao');
        return;
    }else{
        const newTransaction = { id: generateId(), name: transactionName, amount: Number(transactionAmount) };
    
    dummyTransactions.push(newTransaction);

    init();

   
    }
    
    transactionName.value = '';
    transactionAmount.value = '';
    
});

removeTransaction = Id => {
    dummyTransactions = dummyTransactions.filter(transaction => transaction.id !== Id);
    console.log(dummyTransactions);
    init();
};

const saveLocalStore = () => {
    
}

// construir uma funcao de inicializacao executavel
const init = () =>{
    transactionsUl.innerHTML = '';
    dummyTransactions.forEach(addTransactionsIntoDOM);
    updateBalanceValues();
}

// executo a funcao de inicializacao
init();





