const holidays = {
    "2024-01-01": "Ano Novo",
    "2024-02-12": "Carnaval",
    "2024-03-29": "Sexta-feira Santa",
    "2024-04-21": "Tiradentes",
    "2024-05-01": "Dia do Trabalho",
    "2024-06-15": "Corpus Christi",
    "2024-07-09": "Revolução Constitucionalista",
    "2024-09-07": "Independência do Brasil",
    "2024-10-12": "Nossa Senhora Aparecida",
    "2024-11-02": "Finados",
    "2024-11-15": "Proclamação da República",
    "2024-11-20": "Dia da Consciência Negra",
    "2024-12-08": "Aniversário de Guarulhos",
    "2024-12-25": "Natal",
};

const events = {};

const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

let currentYear = 2024;
let currentMonth = new Date().getMonth();

function renderCalendar(year, month) {
    const calendar = document.getElementById('calendar');
    const monthYear = document.getElementById('month-year');
    calendar.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    monthYear.textContent = `${months[month]} ${year}`;

    for (let i = 0; i < 7; i++) {
        const dayName = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][i];
        const cell = document.createElement('div');
        cell.textContent = dayName;
        cell.className = 'day-name';
        calendar.appendChild(cell);
    }

    for (let i = 0; i < firstDay; i++) {
        calendar.appendChild(document.createElement('div'));
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement('div');
        const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        cell.className = 'day-number';
        cell.innerHTML = `${day}`;

        if (holidays[date]) {
            cell.innerHTML += `<span class="holiday">${holidays[date]}</span>`;
        }

        if (events[date]) {
            cell.innerHTML += `<span class="event">${events[date]}</span>`;
        }

        calendar.appendChild(cell);
    }
}

document.getElementById('prev-month').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentYear, currentMonth);
});

document.getElementById('next-month').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentYear, currentMonth);
});

document.getElementById('event-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const date = document.getElementById('event-date').value;
    const description = document.getElementById('event-description').value;
    if (date && description) {
        events[date] = description;
        alert(`Evento adicionado para ${date}: ${description}`);
        document.getElementById('event-form').reset();
        renderCalendar(currentYear, currentMonth);
    }
});

document.getElementById('feedback-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const feedback = document.getElementById('feedback').value;
    if (feedback) {
        alert('Obrigado pelo seu feedback!');
        document.getElementById('feedback-form').reset();
    }
});

renderCalendar(currentYear, currentMonth);
