
/* ===== VETMOTO CLINIC STAFF ===== */

// LOGIN
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const error = document.getElementById("loginError");

  if (email === "mae@vetmoto.com" && password === "VetoMoto01") {
    window.location.href = "dashboard.html";
  } else {
    error.textContent = "Incorrect username or password.";
  }
}

// PET RECORDS
function loadPetRecords() {
  const table = document.getElementById("petTable");
  if (!table) return;

  const pets = JSON.parse(localStorage.getItem("vetmotoPets") || "[]");

  pets.forEach(pet => {
    if ([...table.rows].some(row => row.cells[0]?.textContent === pet.id)) {
      return;
    }

    const row = table.insertRow();
    [pet.id, "🐾", pet.name, pet.species, pet.breed, pet.owner]
      .forEach(value => {
        row.insertCell().textContent = value || "";
      });

    const actions = row.insertCell();
    const view = document.createElement("button");
    view.textContent = "View";
    view.onclick = () => location.href = "pet-profile.html";

    const edit = document.createElement("button");
    edit.textContent = "Edit";
    edit.style.marginLeft = "5px";
    edit.onclick = () => location.href = "edit-pet.html";

    actions.append(view, edit);
  });
}

function searchPetData() {
  const input = document.getElementById("petSearch");
  const table = document.getElementById("petTable");
  if (!input || !table) return;

  const query = input.value.toLowerCase();

  [...table.rows].forEach(row => {
    row.hidden = !row.textContent.toLowerCase().includes(query);
  });
}

// OWNER RECORDS
function searchOwnerData() {
  const input = document.getElementById("ownerSearch");
  const table = document.getElementById("ownerTable");
  if (!input || !table) return;

  const query = input.value.toLowerCase();

  [...table.rows].forEach(row => {
    row.hidden = !row.textContent.toLowerCase().includes(query);
  });
}

function editOwner(button) {
  const row = button.closest("tr");
  if (!row) return;

  const name = prompt("Owner Name:", row.cells[2].textContent);
  if (name === null) return;

  const contact = prompt("Contact:", row.cells[3].textContent);
  if (contact === null) return;

  const email = prompt("Email:", row.cells[4].textContent);
  if (email === null) return;

  row.cells[2].textContent = name;
  row.cells[3].textContent = contact;
  row.cells[4].textContent = email;
}

function deleteOwner(button) {
  if (confirm("Delete this owner record?")) {
    button.closest("tr").remove();
  }
}

// MEDICINE INVENTORY SEARCH
function searchMedicineData() {
  const input = document.getElementById("medicineSearch");
  const table = document.getElementById("medicineTable");
  if (!input || !table) return;

  const query = input.value.toLowerCase();

  [...table.rows].forEach(row => {
    row.hidden = !row.textContent.toLowerCase().includes(query);
  });
}

// LOAD SAVED PET RECORDS
document.addEventListener("DOMContentLoaded", loadPetRecords);


function displaySavedPets() {
  const table = document.getElementById("petTable");
  if (!table) return;

  const pets = JSON.parse(localStorage.getItem("vetmotoPets") || "[]");

  pets.forEach(pet => {
    if ([...table.rows].some(row => row.cells[0]?.textContent === pet.id)) {
      return;
    }

    const row = table.insertRow();
    [
      pet.id,
      "🐾",
      pet.name,
      pet.species,
      pet.breed,
      pet.owner
    ].forEach(value => {
      row.insertCell().textContent = value || "";
    });

    const actions = row.insertCell();
    const view = document.createElement("button");
    view.textContent = "View";
    view.onclick = () => location.href = "pet-profile.html";

    const edit = document.createElement("button");
    edit.textContent = "Edit";
    edit.style.marginLeft = "5px";
    edit.onclick = () => location.href = "edit-pet.html";

    actions.append(view, edit);
  });
}

document.addEventListener("DOMContentLoaded", displaySavedPets);


function displaySavedMedicines() {
  const table = document.getElementById("medicineTableBody");
  if (!table) return;

  const medicines = JSON.parse(
    localStorage.getItem("vetmotoMedicines") || "[]"
  );

  medicines.forEach(medicine => {
    if ([...table.rows].some(row =>
      row.cells[1]?.textContent === medicine.name
    )) return;

    const row = table.insertRow();

    [
      medicine.expirationDate,
      medicine.name + (medicine.genericName ? " (" + medicine.genericName + ")" : ""),
      medicine.quantity + " units",
      medicine.status,
      "",
      medicine.productionDate
    ].forEach(value => {
      row.insertCell().textContent = value || "—";
    });

    const button = document.createElement("button");
    button.textContent = "OPEN";
    button.onclick = () => location.href = "medicine-detail.html";
    row.cells[4].appendChild(button);
  });
}

document.addEventListener("DOMContentLoaded", displaySavedMedicines);