var listaDeFormularios = [];

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

document.addEventListener("DOMContentLoaded", function() {
	carregarDadosArmazenados();
	
	var addButton = document.getElementById("addButton");
	if (addButton) {
		addButton.addEventListener("click", mostrarFormulario);
	}
	var submitButton = document.getElementById("submitButton");
	if (submitButton) {
		submitButton.addEventListener("click", processarFormulario);
	}
	preencherTabelaFormularios();
});

function carregarDadosArmazenados() {
	var formData = localStorage.getItem("formularios");
	if (formData) {
		listaDeFormularios = JSON.parse(formData);
	}
}

function salvarDadosArmazenados(){
	localStorage.setItem("formularios", JSON.stringify(listaDeFormularios));
}

function mostrarFormulario(){
	var formulario = document.getElementById("formulario");
	formulario.style.display = "block";
}

function preencherTabelaFormularios(){
	var tabelaFormularios = document.getElementById("tabelaFormularios");
	var tbody = tabelaFormularios.querySelector("tbody");
	tbody.innerHTML = "";

	listaDeFormularios.forEach(function (formulario, index) {
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
		cellTestRack.textContent = formulario.testRack ? "Yes" : "No";

		var editarButton = document.createElement("button");
		editarButton.textContent = "Editar";
		editarButton.addEventListener("click", function(){
		mostrarFormularioEditar(index);
	});
	cellAcoes.appendChild(editarButton);
	});
	tabelaFormularios.style.display = "block";
}

function mostrarFormularioEditar(index){
	var formulario = document.getElementById("formulario");
	formulario.style.display = "block";

	var formData = listaDeFormularios[index];
	document.getElementById("itemID").value = formData.itemID;
	document.getElementById("jobID").value = formData.jobID;
	document.getElementById("quantidadeRacks").value = formData.quantidadeRacks;
	document.getElementById("racksPintados").value = formData.racksPintados;
	document.getElementById("testRack").checked = formData.testRack;
}

function processarFormulario(){
	var formData = {
		itemID: document.getElementById("itemID").value,
		jobID: document.getElementById("jobID").value,
		quantidadeRacks: parseInt(document.getElementById("quantidadeRacks").value),
		racksPintados: parseInt(document.getElementById("racksPintados").value),
		testRack: document.getElementById("testRack").checked
	};
	listaDeFormularios.push(formData);
	salvarDadosArmazenados();

	var formulario = document.getElementById("formulario");
	formulario.style.display = "block";
}