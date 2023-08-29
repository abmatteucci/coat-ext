var listaDeFormularios = [];

let shifts = [
    { name: "Day", period: {start: 7, end: 15}},
    { name: "Evening", period: {start: 15, end: 23}},
    { name: "Night", period: {start: 23, end: 7}}
];

let jobs = [];

let job = {
    jobID: null,
    itemID: null,
    qtyJobWires: 0,
    startTime: null,
    endTimePrevision: null,
    startShift: null,
    endShift: null,
    finished: false
};

let products = [
	{ 
		name :"Braun IV",
		item : "259040",
		substractOD: { diameter: 0.59, tolerance: 0.01},
		coating_thickness: { thickness_min: 0.007, thickness_max: 0.015 },
		m_unit: "milimeter",
		program: 8,
		notes: "Minimum OD needs to be 0.007mm or 0.0003inch for good consistent colour."  
	 },
	{
		name :"JW Medical",
		item : "307283",
		substractOD: { diameter: 0.675, tolerance: 0.005},
		coating_thickness: { thickness_min: 0.008, thickness_max: 0.014 },
		m_unit: "milimeter",
		program: 53,		
		notes: "Increased min OD to 0.008mm so it will shrink back in the oven to 0.006mm."  

	},
	{
		name :"Biosensor",
		item : "256403",
		substractOD: { diameter: 0.675, tolerance: 0.005},
		coating_thickness: { thickness_min: 0.008, thickness_max: 0.014 },
		m_unit: "milimeter",
		program: 4,
		notes: "Increased min OD to 0.008mm so it will shrink back in the oven to 0.006mm."  

	},
	{
		name :"Cerenovous/Embotrap",
		item : "309309",
		substractOD: { diameter: 0.018, tolerance: 0.0002},
		coating_thickness: { thickness_min: 0.0003, thickness_max: 0.0004 },
		m_unit: "inch",
		program: 46,
		notes: "Coat shrinks after curing so care must be taken to obtain a minimum coating thickness of 0.0003inches."  

	},
	{
		name :"Glyder",
		item : "269863",
		substractOD: { diameter: 0.019, tolerance: 0.0001},
		coating_thickness: { thickness_min: 0.0003, thickness_max: 0.021 },
		m_unit: "milimeter",
		program: 37,
		notes: "Minimum OD needs to be 0.007mm or 0.0003inch for good consistent colour."  

	},
	{
		name :"Maple Grove",
		item : "268972",
		substractOD: { diameter: 0.0185, tolerance: 0.0005},
		coating_thickness: { thickness_min: 0.0003, thickness_max: 0.0009 },
		m_unit: "inch",
		program: 32,
		notes: "0.0009 inches is a very thick coat and shoud be avoided as parts may stick to each other in the curing step. Target thickness of 0.0006inches after IR Oven."  

	},
	{
		name :"Maple Grove",
		item : "268974",
		substractOD: { diameter: 0.0185, tolerance: 0.0005},
		coating_thickness: { thickness_min: 0.0003, thickness_max: 0.0009 },
		m_unit: "inch",
		program: 32,
		notes: "0.0009 inches is a very thick coat and shoud be avoided as parts may stick to each other in the curing step. Target thickness of 0.0006inches after IR Oven."  

	},
	{
		name :"Given imaging",
		item : "266457",
		substractOD: { diameter: 0.029, tolerance: 0.0002},
		coating_thickness: { thickness_min: 0.007, thickness_max: 0.022 },
		m_unit: "inch",
		program: 16,
		notes: "0.0003 inches min needed for good colour after IR Oven."  

	},
	{
		name :"Ascenda",
		item : "259829",
		substractOD: { diameter: 0.0825, tolerance: 0.001},
		coating_thickness: { thickness_min: 0.007, thickness_max: 0.023 },
		m_unit: "inch",
		program: 27,
		notes: "0.0003 inches min needed for good colour after IR Oven."  

	},
	{
		name :"New Ascenda",
		item : "306891",
		substractOD: { diameter: 0.0645, tolerance: 0.001},
		coating_thickness: { thickness_min: 0.007, thickness_max: 0.024 },
		m_unit: "inch",
		program: 27,
		notes: "0.0003 inches min needed for good colour after IR Oven."  

	},
	{
		name :"Achieva (Nitinol)",
		item : "315191",
		substractOD: { diameter: 0.381, tolerance: 0.013},
		coating_thickness: { thickness_min: 0.007, thickness_max: 0.024 },
		m_unit: "milimeter",
		program: 41,
		notes: "Coated OD referencing 0.395mm for good colour."  

	},
	{
		name :"Achieva",
		item : "216827",
		substractOD: { diameter: 0.133, tolerance: 0.0005},
		coating_thickness: { thickness_min: 0.007, thickness_max: 0.026 },
		m_unit: "inch",
		program: 41,
		notes: "0.0003 inches min needed for good colour after IR Oven."  

	},
	{
		name :"Achieva",
		item : "309857",
		substractOD: { diameter: 0.013, tolerance: 0.0002},
		coating_thickness: { thickness_min: 0.007, thickness_max: 0.027 },
		m_unit: "inch",
		program: 41,
		notes: "0.0003 inches min needed for good colour after IR Oven."  

	},
	{
		name :"Silk road",
		item : "501417-01",
		substractOD: { diameter: 0.0129, tolerance: 0},
		coating_thickness: { thickness_min: 0.007, thickness_max: 0.028 },
		m_unit: "inch",
		program: 63,
		notes: "0.0003 inches min needed for good colour after IR Oven."  	
	},
	{
		name :"Prox Tube",
		item : "",
		substractOD: { diameter: 0.375, tolerance: 0},
		coating_thickness: { thickness_min: null, thickness_max: 0.007 },
		m_unit: "milimiter",
		program: 18,
		notes: "Max coated: 0.375. Uncoated: 0.350"  	
	},
	{
		name :"Push Pull",
		item : "",
		substractOD: { diameter: 0.0377, tolerance: 0},
		coating_thickness: { thickness_min: null, thickness_max: 0.001 },
		m_unit: "inch",
		program: 40,
		notes: "Max coated: 0.0377. Uncoated: 0.0353"  	
	},
	{
		name :"Spywire",
		item : "",
		substractOD: { diameter: 0.255, tolerance: 0},
		coating_thickness: { thickness_min: null, thickness_max: 0.0075 },
		m_unit: "inch",
		program: 39,
		notes: "Max coated: 0.255. Uncoated: 0.242"  	
	},
	{
		name :"Pwx",
		item : "",
		substractOD: { diameter: 0.367, tolerance: 0},
		coating_thickness: { thickness_min: null, thickness_max: 0.008 },
		m_unit: "milimeter",
		program: 18,
		notes: "Max coated: 0.375. Min coated: 0.359. Uncoated: 0.350."  	
	},
	{
		name :"Resonetics",
		item : "",
		substractOD: { diameter: 0.0309, tolerance: 0.0003},
		coating_thickness: { thickness_min: 0.0002, thickness_max: 0.0005 },
		m_unit: "inch",
		program: "64 / 60",
		notes: "Max coated: 0.0313. Min coated: 0.0306. Uncoated: 0.0302."  	
	}
];

function criarOpcoesSelect() {
    var select = document.getElementById('itemID');
    
    products.forEach(function(product) {
        var option = document.createElement('option');
        option.value = product.name + " (" + product.item +")";
        option.textContent = product.name + " (" + product.item +")";
        select.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    carregarDadosArmazenados();
    carregarJobsArmazenados();
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

document.addEventListener('DOMContentLoaded', function() {
    carregarDadosArmazenados();
    criarOpcoesSelect(); // Chama a função para criar as opções do select
    // Restante do seu código...
});

function carregarDadosArmazenados() {
    var formData = localStorage.getItem('formularios');
    var job = localStorage.getItem('jobs');
    if (formData) {
        listaDeFormularios = JSON.parse(formData);
    }
    if (job){
        jobs = JSON.parse(job);
    }
}

function salvarDadosArmazenados() {
    localStorage.setItem('formularios', JSON.stringify(listaDeFormularios));
    localStorage.setItem('jobs', JSON.stringify(jobs));
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
        var cellQtyJobWires = row.insertCell(2);
        var cellQuantidadeRacks = row.insertCell(3);
        var cellRacksPintados = row.insertCell(4);
        var cellTestRack = row.insertCell(5);
        var cellAcoes = row.insertCell(6);

        cellItemID.textContent = formulario.itemID;
        cellJobID.textContent = formulario.jobID;
        cellQtyJobWires = formulario.qtyJobWires;
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
            exibirGrafico(listaDeFormularios, index);
        });
        cellAcoes.appendChild(verGraficoButton);

        // Botão "Descrição do Job"
        var descricaoJobButton = document.createElement('button');
        descricaoJobButton.textContent = 'Descrição do Job';
        descricaoJobButton.addEventListener('click', function() {
            exibirDescricaoJob(index);
        });
        cellAcoes.appendChild(descricaoJobButton);

        var deletarButton = document.createElement('button');
        deletarButton.textContent = 'Deletar';
        deletarButton.addEventListener('click', function() {
            deletarFormulario(index);
        });
        cellAcoes.appendChild(deletarButton);
    });

    tabelaFormularios.style.display = 'block';
}

function exibirDescricaoJob(index) {
    var formData = listaDeFormularios[index];
    console.log("Formulario a ser exibido: " + formData.jobID);
    var job = jobs.find(function(j) {
        console.log("Formulario a ser exibido existe e é: " + formData.jobID);
        return j.jobID === formData.jobID;
    });

    if (job) {
        var descricaoJobTable = document.getElementById('descricaoJobTable');
        descricaoJobTable.style.display = 'block';

        var descricaoJobBody = descricaoJobTable.querySelector('tbody');
        descricaoJobBody.innerHTML = '';

        // Preencher a tabela de descrição do Job com os detalhes do Job
        var row = descricaoJobBody.insertRow();
        var cellLabel = row.insertCell(0);
        var cellValue = row.insertCell(1);

        cellLabel.textContent = 'Item ID:';
        cellValue.textContent = job.itemID;

        row = descricaoJobBody.insertRow();
        cellLabel = row.insertCell(0);
        cellValue = row.insertCell(1);

        cellLabel.textContent = 'Qty. Job Wires:';
        cellValue.textContent = job.qtyJobWires;

        // ... (continuar preenchendo a tabela com outros detalhes do Job)
    }
}

function mostrarFormularioEditar(index) {
    var formulario = document.getElementById('formulario');
    formulario.style.display = 'block';

    var formData = listaDeFormularios[index];
    document.getElementById('itemID').value = formData.itemID;
    document.getElementById('jobID').value = formData.jobID;
    document.getElementById('qtyJobWires').value = formData.qtyJobWires;
    document.getElementById('quantidadeRacks').value = formData.quantidadeRacks;
    document.getElementById('racksPintados').value = formData.racksPintados;
    document.getElementById('testRack').checked = formData.testRack;
}

function processarFormulario() {
    var formData = {
        itemID: document.getElementById('itemID').value,
        jobID: document.getElementById('jobID').value,
        qtyJobWires: parseInt(document.getElementById('qtyJobWires').value),
        quantidadeRacks: parseInt(document.getElementById('quantidadeRacks').value),
        racksPintados: parseInt(document.getElementById('racksPintados').value),
        testRack: document.getElementById('testRack').checked,
        horarioInclusao: parseInt(Date.now()),
        program: null
    };

    

    // Encontra o objeto product correspondente ao itemID selecionado
    var selectedProduct = products.find(function(product) {
        return product.name === formData.itemID;
    });

    // Define os campos do formulário com os valores do produto selecionado
    if (selectedProduct) {
        formData.program = selectedProduct.program;
        // Define outros campos se necessário...
    }

    let index = verificarJob(formData);
    
    if (index === -1) {
    // Insere o formulário na lista de jobs.
        listaDeFormularios.push(formData);
    } else {
        listaDeFormularios[index] = formData;
    }

    var job = criarJob(formData);
    jobs.push(job);
    console.log("Job end Prevision: " + job.endShift + ", Job End Shift: " + identificarPeriodoDeTrabalho(job.endShift, shifts));
    // Salvar a lista no armazenamento
    salvarDadosArmazenados();

    preencherTabelaFormularios();

    // Realizar as operações desejadas com as informações
    var racksNaoPintados = formData.quantidadeRacks - formData.racksPintados;
    var mensagem =
        "ItemID: " + formData.itemID +
        "\nJobID: " + formData.jobID +
        "\nQty. wires: " + formData.qtyJobWires +
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

function criarJob(formData){

    var actualTime = Date.now();
    job.jobID = formData.jobID;
    job.itemID = formData.itemID;
    job.qtyJobWires = formData.qtyJobWires;
    job.startShift = identificarPeriodoDeTrabalho(actualTime, shifts);
    job.startTime = actualTime;
    job.endTimePrevision = actualTime + qtyRacksToIntMiliseconds(formData);
    job.endShift = identificarPeriodoDeTrabalho(job.endTimePrevision, shifts);

    // Salvar o objeto job no localStorage
    salvarJobNoLocalStorage(job);
    return job;
};

// Função para salvar um objeto job no localStorage
function salvarJobNoLocalStorage(job) {
    var jobData = localStorage.getItem('jobs');
    var jobs = jobData ? JSON.parse(jobData) : [];
    jobs.push(job);
    localStorage.setItem('jobs', JSON.stringify(jobs));
};

function carregarJobsArmazenados() {
    var jobData = localStorage.getItem('jobs');
    if (jobData) {
        jobs = JSON.parse(jobData);
    }
};

function qtyRacksToIntMiliseconds(formData){
    return parseInt((formData.qtyJobWires / 40) / formData.quantidadeRacks) * 
        (3600 * 1000);
};

function verificarJob(formData) {
    var index = -1; // Inicializar com -1 para indicar que o formulário não foi encontrado
    listaDeFormularios.forEach(function(formulario, i) {
        if (formulario.jobID == formData.jobID) {
            index = i; // Atribuir o índice correto na lista
        }
    });
    return index;
}

function salvarJobsNoLocalStorage() {
    localStorage.setItem('jobs', JSON.stringify(jobs));
}

function deletarFormulario(index) {
    listaDeFormularios.splice(index, 1); // Remove o formulário da lista pelo índice
    salvarDadosArmazenados(); // Salva a lista atualizada no armazenamento

    // Encontra o job relacionado ao formulário excluído
    var deletedJobIndex = jobs.findIndex(function(job) {
        return job.jobID === deletedFormulario.jobID;
    });

    if (deletedJobIndex !== -1) {
        jobs.splice(deletedJobIndex, 1); // Remove o job relacionado
        salvarJobsNoLocalStorage(); // Salva os jobs atualizados no localStorage
    }
    preencherTabelaFormularios(); // Atualiza a tabela na UI
}

var chart = null; // Variável para armazenar o gráfico

// Função para criar e exibir o gráfico com base nos dados do formulário
function exibirGrafico(listaDeFormularios, index) {
    var graficoCanvas = document.getElementById('graficoBarras');
    graficoCanvas.style.display = 'block';

    var formData = listaDeFormularios[index];
    var labels = [];
    var data = [];

    var dataAtual = new Date();
    

    var horaAtual = Date.now();
    // console.log("Hora atual: " + horaAtual);
    // console.log("Imprimindo dados do formData: " + formData.horarioInclusao + ", tipo: " + typeof(formData.horarioInclusao));
    var periodoDeTrabalho = identificarPeriodoDeTrabalho(horaAtual, shifts);
    var inicioPeriodo = parseInt(periodoDeTrabalho.period.start);
    var fimPeriodo = parseInt(periodoDeTrabalho.period.end);
    var dataSaveForm = new Date(parseInt(formData.horarioInclusao));

    console.log("Actual shift: " + periodoDeTrabalho.name + ", Data do registro: " + dataSaveForm.getDate() + ", Horário do registro: " + dataSaveForm.getHours());

    for (var i = 0; i < 8; i++) {
        var hora = 'Hora ' + (i + 1);
        labels.push(hora);

        var quantidadeRacks = formData.testRack && i === 0 ? 1 : formData.quantidadeRacks;
        if (dataSaveForm.getHours() >= inicioPeriodo && dataSaveForm.getHours() < fimPeriodo) {
            if (i >= dataAtual.getHours() && i < fimPeriodo) {
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
    //dataSaveForm.setHours(hours = horaTInclusao);
    // console.log("Diferença datas: " + (dataAtual - dataSaveForm));
    // console.log("form data: " + dataSaveForm);
    // console.log("Miliseconds in 8 hours: " + (8 * 3600 * 1000));
    console.log("Horas até o final do shift: " + calcularHorasRestantes());
    console.log("Horas para finalizar o job: " + qtyRacksToIntMiliseconds(formData) / (60 * 60 * 1000))
    if (calcularHorasRestantes() < 8){
        
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Quantidade de Racks',
                    data: data,
                    backgroundColor: function(context) {
                        if (context.dataIndex >= (8 - calcularHorasRestantes())) {
                            return 'rgba(255, 0, 0, 0.2)';
                        } else {
                            return 'rgba(75, 192, 192, 0.2)';
                        }
                    },
                    borderColor: function(context) {
                        if (context.dataIndex >= (8 - calcularHorasRestantes())) {
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
    } else {
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Quantidade de Racks',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 0.2)',
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
    };
}


// Função para identificar o período de trabalho com base no horário atual
function identificarPeriodoDeTrabalho(date, shifts) {
    var horaAtual = new Date(date).getHours();
    var periodo = null;
    shifts.find(function (shift){
        if (horaAtual >= shift.period.start && horaAtual < shift.period.end) {
            periodo = shift;
        } else if (horaAtual >= 23 || horaAtual < 7) {
            periodo = shift;
        }
    });
    return periodo;
}

function identificarProximoPeriodoDeTrabalho(date, shifts) {
    var horaAtual = new Date(date).getHours();
    var shiftAtual = identificarPeriodoDeTrabalho(date, shifts);
    var periodo = null;
    shifts.forEach(function (shift, index){
        if (shift.period.start == shiftAtual.period.end) {
            periodo = shift;
        };
    });
    return periodo;
}

// Função para calcular a quantidade de horas restantes no turno atual
function calcularHorasRestantes() {
    var horaAtual = Date.now();
    var proximoTurno = identificarProximoPeriodoDeTrabalho(horaAtual, shifts);
    console.log("Próximo turno: " + proximoTurno.name + " se inicia às: " + proximoTurno.period.start)
    // Crie uma nova data com a mesma data que a atual, mas com a hora do início do próximo turno
    var horaInicioProximoTurno = new Date(horaAtual);
    
    // if (proximoTurno.period.start > proximoTurno.period.end) {
    //     // Se for Night shift, adicione um dia à data
    //     horaInicioProximoTurno.setDate(horaInicioProximoTurno.getDate() + 1);
    // }

    horaInicioProximoTurno.setHours(proximoTurno.period.start);

    // Calcule a diferença de tempo entre a hora atual e a hora de início do próximo turno
    var diferencaTempo = horaInicioProximoTurno - horaAtual;

    if (diferencaTempo <= 0) {
        // Próximo turno já começou, então não há horas restantes no turno atual
        return 0;
    } else {
        // Converta a diferença de tempo de milissegundos para horas
        var horasRestantes = diferencaTempo / (1000 * 60 * 60);
        return horasRestantes;
    }
}

// var horasRestantes = calcularHorasRestantes();
// console.log("Horas Restantes no Turno Atual:", horasRestantes);
