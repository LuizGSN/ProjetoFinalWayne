function showRegister() {
    document.querySelector('.login-container').style.display = 'none';
    document.querySelector('.register-container').style.display = 'block';
}

function showLogin() {
    document.querySelector('.register-container').style.display = 'none';
    document.querySelector('.login-container').style.display = 'block';
}

function register() {
    const newUser = document.getElementById('new-username').value;
    const newPass = document.getElementById('new-password').value;
    if (newUser && newPass) {
        localStorage.setItem(newUser, newPass);
        alert('Cadastro realizado com sucesso!');
        showLogin();
    } else {
        alert('Preencha todos os campos!');
    }
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (localStorage.getItem(username) === password) {
        window.location.href = 'dashboard.html';
    } else {
        document.getElementById('error-msg').textContent = 'Usuário ou senha incorretos';
    }
}

document.addEventListener("DOMContentLoaded", loadResources);

function addResource() {
    let resourceInput = document.getElementById("resource-name");
    let categoryInput = document.getElementById("resource-category");
    let resourceName = resourceInput.value.trim();
    let resourceCategory = categoryInput.value.trim();

    if (resourceName === "" || resourceCategory === "") {
        alert("Digite um nome e selecione uma categoria!");
        return;
    }

    let resources = getResourcesFromStorage();
    resources.push({ name: resourceName, category: resourceCategory });
    saveResourcesToStorage(resources);
    
    renderResources();
    resourceInput.value = "";
    categoryInput.value = "";
}

function editResource(index) {
    let resources = getResourcesFromStorage();
    let newName = prompt("Editar nome do recurso:", resources[index].name);
    
    if (newName !== null && newName.trim() !== "") {
        resources[index].name = newName.trim();
        saveResourcesToStorage(resources);
        renderResources();
    }
}

function removeResource(index) {
    let resources = getResourcesFromStorage();
    resources.splice(index, 1);
    saveResourcesToStorage(resources);
    
    renderResources();
}

function getResourcesFromStorage() {
    let resources = localStorage.getItem("resources");
    return resources ? JSON.parse(resources) : [];
}

function saveResourcesToStorage(resources) {
    localStorage.setItem("resources", JSON.stringify(resources));
}

function loadResources() {
    renderResources();
}

function renderResources() {
    let resourceList = document.getElementById("resource-list");
    resourceList.innerHTML = "";

    let resources = getResourcesFromStorage();
    resources.forEach((resource, index) => {
        let li = document.createElement("li");
        li.textContent = `${resource.name} - (${resource.category})`;

        let editBtn = document.createElement("button");
        editBtn.textContent = "Editar";
        editBtn.onclick = () => editResource(index);
        editBtn.style.marginLeft = "10px";

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Remover";
        deleteBtn.onclick = () => removeResource(index);
        deleteBtn.style.marginLeft = "10px";

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        resourceList.appendChild(li);
    });
}

const ctx = document.getElementById('securityChart').getContext('2d');
const securityChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Câmeras Ativas', 'Portas Fechadas', 'Alarmes Disparados'],
        datasets: [{
            label: 'Status de Segurança',
            data: [12, 8, 2],
            backgroundColor: ['#1ABC9C', '#3498DB', '#E74C3C']
        }]
    }
});

document.getElementById("logout-btn").addEventListener("click", function() {
    alert("Você saiu do sistema.");
    window.location.href = "index.html";
});