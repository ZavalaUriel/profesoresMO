// La URL base de nuestra API
const API_URL_Calificaciones = 'http://localhost:3024/api/calificaciones';

// la URL de jonathan
const API_URL_Alumnos = 'http://localhost:3025/api/alumnos';

// Elementos del DOM
const form = document.getElementById('student-form');
const matriculaAlumno = document.getElementById('matriculaAlumno');
const nombreAlumno = document.getElementById('nombreAlumno');
const calificacion = document.getElementById('calificacion');
const studentsTbody = document.getElementById('students-tbody');
const cancelButton = document.getElementById('cancel-button');

// Jonathan tiene alumnos 
// Función para obtener y mostrar todos los estudiantes
const fetchAlumnos = async () => {
    try {
        const response = await fetch(`${API_URL_Alumnos}`);
        const dataAlumnos = await response.json();
    
        const responseCalificaciones = await fetch(`${API_URL}/alumno/${dataAlumnos.matriculaAlumno}`);
        const dataCalificaciones = await responseCalificaciones.json();
        const calificaciones = dataCalificaciones.length > 0 ? dataCalificaciones[0] : { parcial: 'N/A', calificacion: 'N/A' };

        // Limpiar el tbody antes de agregar nuevos datos
        studentsTbody.innerHTML = '';

        dataAlumnos.forEach(alumnos => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${alumnos.matriculaAlumno}</td>
                <td>${alumnos.nombreAlumno}</td>
                <td>${calificaciones}</td>
                <td>
                    <button class="btn btn-edit" onclick="editCalificaciones(${alumnos.matriculaAlumno}, '${alumnos.nombreAlumno}', ${calificaciones})">Editar</button>
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

    const matriculaAlumno = matriculaAlumno.value;
    const nombreAlumno = nombreAlumno.value;
    const calificacion = calificacion.value;

    const dataAlumnos = { nombreAlumno, calificacion, matriculaAlumno };

    let url = API_URL;
    let method = 'POST';

    // Si hay un ID, es una actualización (PUT)
    if (matriculaAlumno) {
        url = `${API_URL}/${matriculaAlumno}`;
        method = 'PUT';
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataAlumnos)
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
const editCalificaciones = (matriculaAlumno, nombreAlumno, calificacion) => {
    matriculaAlumno.value = matriculaAlumno;
    nombreAlumno.value = nombreAlumno;
    calificacion.value = calificacion;
    cancelButton.style.display = 'inline-block';
    window.scrollTo(0, 0); // Desplazar al inicio de la página
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