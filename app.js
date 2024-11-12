const data = [
    { id: 0, name: "Janu", English: 50, Maths: 86, Science: 77, SocialScience: 88 },
    { id: 1, name: "Thanu", English: 75, Maths: 96, Science: 67, SocialScience: 91 },
    { id: 2, name: "Tara", English: 90, Maths: 35, Science: 86, SocialScience: 100 },
    { id: 3, name: "Glen", English: 79, Maths: 68, Science: 77, SocialScience: 78 },
    { id: 4, name: "Zara", English: 80, Maths: 85, Science: 96, SocialScience: 68 }
];

let filteredData = [...data];  
let sortDirection = 'asc'; 

function applyFilter() {
    const subject = document.getElementById('subject').value;
    const filterCondition = document.querySelector('input[name="filter"]:checked').value;
    const minValue = document.getElementById('min-value').value;
    const maxValue = document.getElementById('max-value').value;

    filteredData = data.filter(student => {
        let marks = student[subject];
        switch (filterCondition) {
            case 'Above':
                return marks > minValue;
            case 'Below':
                return marks < minValue;
            case 'Between':
                return marks >= minValue && marks <= maxValue;
            default:
                return true;
        }
    });

    updateTable();
}
function clearFilter() {
    document.getElementById('min-value').value = '';
    document.getElementById('max-value').value = '';
    document.querySelector('input[name="filter"]:checked').checked = false;
    filteredData = [...data];  
    updateTable();
}
function toggleFilterInputs() {
    const filterCondition = document.querySelector('input[name="filter"]:checked').value;
    const minValueInput = document.getElementById('min-value');
    const maxValueInput = document.getElementById('max-value');

    if (filterCondition === 'Above' || filterCondition === 'Below') {
        minValueInput.style.display = 'inline-block';
        maxValueInput.style.display = 'none';
    } else if (filterCondition === 'Between') {
        minValueInput.style.display = 'inline-block';
        maxValueInput.style.display = 'inline-block';
    }
}

function sortTable(columnIndex) {
    const table = document.getElementById('student-table');
    const rows = Array.from(table.querySelectorAll('tbody tr'));

    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].innerText;
        const cellB = rowB.cells[columnIndex].innerText;

        let valA = isNaN(cellA) ? cellA : parseFloat(cellA);
        let valB = isNaN(cellB) ? cellB : parseFloat(cellB);

        if (sortDirection === 'asc') {
            return valA < valB ? -1 : 1;
        } else {
            return valA < valB ? 1 : -1;
        }
    });

    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';  

    const tbody = table.querySelector('tbody');
    tbody.innerHTML = ''; 
    rows.forEach(row => tbody.appendChild(row)); 
}
function updateTable() {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ''; 

    filteredData.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.English}</td>
            <td>${student.Maths}</td>
            <td>${student.Science}</td>
            <td>${student.SocialScience}</td>
        `;
        tableBody.appendChild(row);
    });
}