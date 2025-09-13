// La URL base de nuestra API
const API_URL = 'http://localhost:3000/api/students';

// Elementos del DOM
const form = document.getElementById('student-form');
const studentIdInput = document.getElementById('student-id');
const nameInput = document.getElementById('name');
const gradeInput = document.getElementById('grade');
const studentsTbody = document.getElementById('students-tbody');
const cancelButton = document.getElementById('cancel-button');

// Función para obtener y mostrar todos los estudiantes
const fetchStudents = async () => {
    try {
        const response = await fetch(API_URL);
        const students = await response.json();

        // Limpiar la tabla antes de llenarla
        studentsTbody.innerHTML = '';

        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.grade}</td>
                <td>
                    <button class="btn btn-edit" onclick="editStudent(${student.id}, '${student.name}', ${student.grade})">Editar</button>
                    <button class="btn btn-delete" onclick="deleteStudent(${student.id})">Eliminar</button>
                </td>
            `;
            studentsTbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al obtener estudiantes:', error);
    }
};

// Función para manejar el envío del formulario (Crear y Actualizar)
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitar que la página se recargue

    const id = studentIdInput.value;
    const name = nameInput.value;
    const grade = gradeInput.value;

    const studentData = { name, grade };

    let url = API_URL;
    let method = 'POST';

    // Si hay un ID, es una actualización (PUT)
    if (id) {
        url = `${API_URL}/${id}`;
        method = 'PUT';
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });

        if (response.ok) {
            resetForm();
            fetchStudents(); // Recargar la lista de estudiantes
        } else {
            console.error('Error al guardar el estudiante');
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
});

// Función para cargar datos de un estudiante en el formulario para editar
const editStudent = (id, name, grade) => {
    studentIdInput.value = id;
    nameInput.value = name;
    gradeInput.value = grade;
    cancelButton.style.display = 'inline-block';
    window.scrollTo(0, 0); // Desplazar al inicio de la página
};

// Función para eliminar un estudiante
const deleteStudent = async (id) => {
    if (confirm('¿Estás seguro de que quieres eliminar a este estudiante?')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchStudents(); // Recargar la lista
            } else {
                console.error('Error al eliminar el estudiante');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    }
};

// Función para resetear el formulario
const resetForm = () => {
    form.reset();
    studentIdInput.value = '';
    cancelButton.style.display = 'none';
};

// Evento para el botón de cancelar
cancelButton.addEventListener('click', () => {
    resetForm();
});

// Cargar los estudiantes cuando la página se carga por primera vez
document.addEventListener('DOMContentLoaded', fetchStudents);