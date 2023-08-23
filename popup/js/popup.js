var listaDeFormularios = [];

let shifts = [
    { name: "Day", period: {start: 7, end: 15}},
    { name: "Evening", period: {start: 15, end: 23}},
    { name: "Night", period: {start: 23, end: 7}}
];

document.addEventListener('DOMContentLoaded', function() {
    carregarDadosArmazenados();

    var addButton = document.getElementById('addButton');
    if (addButton) {
        addButton.addEventListener('click', mostrarFormulario);
    }

    var submitButton = document.getElementById('submitButton');
    if (submitButton) {
        submitButton.addEventListener('click', processarFormulario);
    }

    // Preencher a tabela com os dados existentes
    preencherTabelaFormularios();
});

function carregarDadosArmazenados() {
    var formData = localStorage.getItem('formularios');
    if (formData) {
        listaDeFormularios = JSON.parse(formData);
    }
}

function salvarDadosArmazenados() {
    localStorage.setItem('formularios', JSON.stringify(listaDeFormularios));
}

function mostrarFormulario() {
    var formulario = document.getElementById('formulario');
    formulario.style.display = 'block';
}

function preencherTabelaFormularios() {
    var tabelaFormularios = document.getElementById('tabelaFormularios');
    var tbody = tabelaFormularios.querySelector('tbody');
    tbody.innerHTML = ''; // Limpar a tabela antes de preencher

    listaDeFormularios.forEach(function(formulario, index) {
        var row = tbody.insertRow();
        var cellItemID = row.insertCell(0);
        var cellJobID = row.insertCell(1);
        var cellQuantidadeRacks = row.insertCell(2);
        var cellRacksPintados = row.insertCell(3);
        var cellTestRack = row.insertCell(4);
        var cellAcoes = row.insertCell(5);

        cellItemID.textContent = formulario.itemID;
        cellJobID.textContent = formulario.jobID;
        cellQuantidadeRacks.textContent = formulario.quantidadeRacks;
        cellRacksPintados.textContent = formulario.racksPintados;
        cellTestRack.textContent = formulario.testRack ? 'Sim' : 'Não';

        var editarButton = document.createElement('button');
        editarButton.textContent = 'Editar';
        editarButton.addEventListener('click', function() {
            mostrarFormularioEditar(index);
        });
        cellAcoes.appendChild(editarButton);

        var verGraficoButton = document.createElement('button');
        verGraficoButton.textContent = 'Ver Gráfico';
        verGraficoButton.addEventListener('click', function() {
            exibirGrafico(index);
        });
        cellAcoes.appendChild(verGraficoButton);

        var deletarButton = document.createElement('button');
        deletarButton.textContent = 'Deletar';
        deletarButton.addEventListener('click', function() {
            deletarFormulario(index);
        });
        cellAcoes.appendChild(deletarButton);
    });

    tabelaFormularios.style.display = 'block';
}

function mostrarFormularioEditar(index) {
    var formulario = document.getElementById('formulario');
    formulario.style.display = 'block';

    var formData = listaDeFormularios[index];
    document.getElementById('itemID').value = formData.itemID;
    document.getElementById('jobID').value = formData.jobID;
    document.getElementById('quantidadeRacks').value = formData.quantidadeRacks;
    document.getElementById('racksPintados').value = formData.racksPintados;
    document.getElementById('testRack').checked = formData.testRack;
}

function processarFormulario() {
    var formData = {
        itemID: document.getElementById('itemID').value,
        jobID: document.getElementById('jobID').value,
        quantidadeRacks: parseInt(document.getElementById('quantidadeRacks').value),
        racksPintados: parseInt(document.getElementById('racksPintados').value),
        testRack: document.getElementById('testRack').checked,
        horarioInclusao: new Date().toLocaleString()
    };

    let index = verificarJob(formData);
    
    if (index === -1) {
    // Insere o formulário na lista de jobs.
        listaDeFormularios.push(formData);
    } else {
        listaDeFormularios[index] = formData;
    }
    // Salvar a lista no armazenamento
    salvarDadosArmazenados();

    preencherTabelaFormularios();

    // Realizar as operações desejadas com as informações
    var racksNaoPintados = formData.quantidadeRacks - formData.racksPintados;
    var mensagem =
        "ItemID: " + formData.itemID +
        "\nJobID: " + formData.jobID +
        "\nQuantidade de Racks: " + formData.quantidadeRacks +
        "\nRacks Pintados: " + formData.racksPintados +
        "\nRacks Não Pintados: " + racksNaoPintados +
        "\nTest Rack: " + (formData.testRack ? "Sim" : "Não");


    // Exibir ou usar a mensagem como desejar
    alert(mensagem);
    console.log(listaDeFormularios);

    // Depois de processar o formulário, você pode ocultar novamente o formulário
    var formulario = document.getElementById('formulario');
    formulario.style.display = 'none';
}

function verificarJob(formData) {
    var index = -1; // Inicializar com -1 para indicar que o formulário não foi encontrado
    listaDeFormularios.forEach(function(formulario, i) {
        if (formulario.jobID == formData.jobID) {
            index = i; // Atribuir o índice correto na lista
        }
    });
    return index;
}

function deletarFormulario(index) {
    listaDeFormularios.splice(index, 1); // Remove o formulário da lista pelo índice
    salvarDadosArmazenados(); // Salva a lista atualizada no armazenamento
    preencherTabelaFormularios(); // Atualiza a tabela na UI
}

var chart = null; // Variável para armazenar o gráfico

// Função para criar e exibir o gráfico com base nos dados do formulário
function exibirGrafico(index) {
    var graficoCanvas = document.getElementById('graficoBarras');
    graficoCanvas.style.display = 'block';

    var formData = listaDeFormularios[index];
    var labels = [];
    var data = [];

    var horaAtual = new Date().getHours();
    var periodoDeTrabalho = identificarPeriodoDeTrabalho(shifts);
    var inicioPeriodo = parseInt(periodoDeTrabalho.period.start);
    var fimPeriodo = parseInt(periodoDeTrabalho.period.end);

    var dataInclusao = formData.horarioInclusao.split(", ")[0];
    var horaTInclusao = formData.horarioInclusao.split(", ")[1];
    var horaInclusao = horaTInclusao.split(":")[0];
    console.log("Actual shift: " + periodoDeTrabalho.name + ", Data do registro: " + dataInclusao + ", Horário do registro: " + horaInclusao)

    for (var i = 0; i < 8; i++) {
        var hora = 'Hora ' + (i + 1);
        labels.push(hora);

        var quantidadeRacks = formData.testRack && i === 0 ? 1 : formData.quantidadeRacks;
        if (horaAtual >= inicioPeriodo && horaAtual < fimPeriodo) {
            if (i >= horaAtual && i < fimPeriodo) {
                data.push({ x: i, y: quantidadeRacks, r: 10 });
            } else {
                data.push(quantidadeRacks);
            }
        } else {
            data.push(quantidadeRacks);
        }
    }

    var ctx = graficoCanvas.getContext('2d');
    if (chart) {
        chart.destroy();
    }
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Quantidade de Racks',
                data: data,
                backgroundColor: function(context) {
                    if (context.dataIndex >= horaAtual) {
                        return 'rgba(255, 0, 0, 0.2)';
                    } else {
                        return 'rgba(75, 192, 192, 0.2)';
                    }
                },
                borderColor: function(context) {
                    if (context.dataIndex >= horaAtual) {
                        return 'rgba(255, 0, 0, 0.2)';
                    } else {
                        return 'rgba(75, 192, 192, 0.2)';
                    }
                },
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


// Função para identificar o período de trabalho com base no horário atual
function identificarPeriodoDeTrabalho(shifts) {
    var horaAtual = new Date().getHours();
    var periodo = null;
    shifts.forEach( function (shift, index){
        if (horaAtual >= shift.period.start && horaAtual < shift.period.end) {
            periodo = shift;
        } else if (horaAtual >= 23) {
            periodo = shifts[index];
        }
    });
    return periodo;
    // if (horaAtual >= 7 && horaAtual < 15) {
    //     return "7h às 15h";
    // } else if (horaAtual >= 15 && horaAtual < 23) {
    //     return "15h às 23h";
    // } else {
    //     return "23h às 7h";
    // }
}