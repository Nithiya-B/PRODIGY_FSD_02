const addEmployeeForm = document.getElementById("addEmployeeForm");
const employeeTable = document.querySelector("#employeeTable tbody");
const token = localStorage.getItem("token");

// Fetch Employees
async function fetchEmployees() {
  const res = await fetch("http://localhost:5000/api/employees", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  employeeTable.innerHTML = "";

  data.forEach(emp => {
    const row = `<tr>
      <td>${emp.id}</td>
      <td>${emp.name}</td>
      <td>${emp.email}</td>
      <td>${emp.phone}</td>
      <td>${emp.department}</td>
      <td>${emp.designation}</td>
      <td>${emp.salary}</td>
      <td>
        <button onclick="editEmployee(${emp.id})">Edit</button>
        <button onclick="deleteEmployee(${emp.id})">Delete</button>
      </td>
    </tr>`;
    employeeTable.innerHTML += row;
  });
}

fetchEmployees();

// Add Employee
addEmployeeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const employee = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    department: document.getElementById("department").value,
    designation: document.getElementById("designation").value,
    salary: document.getElementById("salary").value
  };

  const res = await fetch("http://localhost:5000/api/employees", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(employee)
  });

  const data = await res.json();
  alert(data.message || JSON.stringify(data));
  fetchEmployees();
});
