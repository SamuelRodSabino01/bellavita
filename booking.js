// Removendo listener de DOMContentLoaded desnecessário pois o script está no final do body
(function() {
    
    
    // --- Dados Mockados ---
    const services = [
        { id: 'harmonizacao', name: 'Harmonização Facial', duration: 60, price: 'R$ 1.500,00', icon: 'fa-magic' },
        { id: 'corporal', name: 'Tratamentos Corporais', duration: 45, price: 'R$ 350,00', icon: 'fa-leaf' },
        { id: 'pele', name: 'Cuidados com a Pele', duration: 30, price: 'R$ 180,00', icon: 'fa-gem' },
        { id: 'depilacao', name: 'Depilação a Laser', duration: 30, price: 'R$ 120,00', icon: 'fa-star' },
        { id: 'avaliacao', name: 'Avaliação Gratuita', duration: 20, price: 'Grátis', icon: 'fa-clipboard-check' }
    ];

    // Simulação de agendamentos existentes (ocupados)
    // Formato: 'YYYY-MM-DD': ['HH:MM', 'HH:MM'] (horários de INÍCIO ocupados)
    // Para simplificar, vamos assumir que cada array contém horários ocupados
    const existingAppointments = {
        '2026-02-12': ['09:00', '09:30', '14:00'],
        '2026-02-13': ['10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'], // Dia quase cheio
    };

    // Estado da Aplicação
    let currentStep = 1;
    let bookingData = {
        service: null,
        date: null,
        time: null,
        user: {}
    };

    // Elementos do DOM
    const steps = document.querySelectorAll('.step-content');
    const progressSteps = document.querySelectorAll('.progress-step');
    const btnNext = document.querySelector('.btn-next');
    const btnPrev = document.querySelector('.btn-prev');
    const btnSubmit = document.querySelector('.btn-submit');
    const servicesGrid = document.querySelector('.services-selection');
    const timeSlotsGrid = document.querySelector('.time-slots-grid');
    const calendarGrid = document.querySelector('.calendar-grid');
    const currentMonthEl = document.getElementById('currentMonth');
    const summaryContainer = document.getElementById('bookingSummary');

    // --- Inicialização ---
    try {
        renderServices();
        initCalendar();
        updateNavigation();
        
    } catch (e) {
        
    }

    // --- Navegação ---
    btnNext.addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir comportamento padrão
        console.log('Next clicked. Current step:', currentStep);
        
        if (validateStep(currentStep)) {
            currentStep++;
            console.log('Advancing to step:', currentStep);
            updateUI();
        } else {
            console.warn('Validation failed for step:', currentStep);
            // Feedback visual para o usuário caso o botão esteja habilitado indevidamente
            alert('Por favor, complete a etapa atual para continuar.');
            updateNavigation(); // Re-validar estado do botão
        }
    });

    btnPrev.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateUI();
        }
    });

    // --- Funções de Renderização ---

    function renderServices() {
        servicesGrid.innerHTML = '';
        services.forEach(service => {
            const el = document.createElement('div');
            el.className = `service-option ${bookingData.service?.id === service.id ? 'selected' : ''}`;
            el.dataset.id = service.id;
            el.innerHTML = `
                <i class="fas ${service.icon}"></i>
                <h4>${service.name}</h4>
                <span class="price">${service.price}</span>
                <span class="duration"><i class="far fa-clock"></i> ${service.duration} min</span>
            `;
            el.addEventListener('click', () => selectService(service));
            servicesGrid.appendChild(el);
        });
    }

    function selectService(service) {
        try {
            console.log('Service selected:', service);
            bookingData.service = service;
            bookingData.time = null; // Resetar horário se mudar o serviço
            
            // Atualizar UI
            document.querySelectorAll('.service-option').forEach(el => {
                el.classList.remove('selected');
                if (el.dataset.id === service.id) {
                    el.classList.add('selected');
                }
            });

            // Habilitar botão próximo IMEDIATAMENTE
            updateNavigation();
            
            // Atualizar calendário com base na duração do novo serviço
            // Usando timeout para não bloquear a UI e garantir que o botão habilite
            setTimeout(() => {
                try {
                    renderCalendar(currentDate);
                } catch (e) {
                    console.error('Error rendering calendar:', e);
                }
            }, 0);

        } catch (error) {
            console.error('Error in selectService:', error);
        }
    }

    // --- Calendário e Lógica de Data ---
    let currentDate = new Date();
    
    function initCalendar() {
        renderCalendar(currentDate);

        document.getElementById('prevMonth').addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar(currentDate);
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar(currentDate);
        });
    }

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay(); // 0 = Domingo

        currentMonthEl.textContent = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
        
        // Limpar grid (mantendo cabeçalhos)
        const dayElements = calendarGrid.querySelectorAll('.calendar-day');
        dayElements.forEach(el => el.remove());

        // Dias vazios antes do início do mês
        for (let i = 0; i < startingDay; i++) {
            const empty = document.createElement('div');
            calendarGrid.appendChild(empty);
        }

        // Dias do mês
        for (let i = 1; i <= daysInMonth; i++) {
            const dayDate = new Date(year, month, i);
            const dateString = formatDateISO(dayDate);
            const isToday = isSameDay(dayDate, new Date());
            const isPast = dayDate < new Date().setHours(0,0,0,0);
            
            const el = document.createElement('div');
            el.className = 'calendar-day';
            el.textContent = i;
            
            if (isToday) el.classList.add('today');
            if (bookingData.date === dateString) el.classList.add('selected');

            // Verificar disponibilidade do DIA
            if (isPast || dayDate.getDay() === 0) { // Domingo fechado
                el.classList.add('disabled');
            } else if (bookingData.service) {
                // Verificar se o dia está lotado para o serviço selecionado
                if (!checkDayAvailability(dateString, bookingData.service.duration)) {
                    el.classList.add('disabled');
                    el.title = "Dia sem horários disponíveis";
                }
            }

            if (!el.classList.contains('disabled')) {
                el.addEventListener('click', () => selectDate(dateString));
            }

            calendarGrid.appendChild(el);
        }
    }

    function checkDayAvailability(dateString, duration) {
        // Gera todos os slots possíveis (8h às 18h)
        const slots = generateTimeSlotsForDay(dateString, duration);
        // Se houver pelo menos um slot disponível, o dia está livre
        return slots.some(slot => !slot.occupied);
    }

    function selectDate(dateString) {
        bookingData.date = dateString;
        bookingData.time = null; // Reset time
        renderCalendar(currentDate); // Re-render to show selection
        generateTimeSlotsUI(dateString);
        updateNavigation();
    }

    // --- Lógica de Horários ---

    function generateTimeSlotsForDay(dateString, duration) {
        const startHour = 8;
        const endHour = 18; // Fechamento
        const interval = 30; // Grid de 30 em 30 min
        
        const slots = [];
        let current = new Date(`${dateString}T${String(startHour).padStart(2,'0')}:00:00`);
        const end = new Date(`${dateString}T${String(endHour).padStart(2,'0')}:00:00`);

        // Obter agendamentos do dia (mock)
        const busyTimes = existingAppointments[dateString] || [];
        
        // Converter busyTimes para objetos Date para facilitar comparação (assumindo 30min por slot ocupado)
        const busyIntervals = busyTimes.map(timeStr => {
            const start = new Date(`${dateString}T${timeStr}:00`);
            const end = new Date(start.getTime() + interval * 60000); 
            return { start, end };
        });

        while (current < end) {
            const timeString = current.toTimeString().substring(0, 5);
            
            // Verificar se o horário + duração cabe antes do fechamento
            const slotEndTime = new Date(current.getTime() + duration * 60000);
            
            if (slotEndTime <= end) {
                // Verificar colisão com agendamentos existentes (OVERLAP REAL)
                let isOccupied = false;
                
                for (const busy of busyIntervals) {
                    // Colisão: (StartA < EndB) && (EndA > StartB)
                    if (current < busy.end && slotEndTime > busy.start) {
                        isOccupied = true;
                        break;
                    }
                }
                
                slots.push({
                    time: timeString,
                    occupied: isOccupied
                });
            }
            
            current = new Date(current.getTime() + interval * 60000);
        }
        
        return slots;
    }

    function generateTimeSlotsUI(dateString) {
        if (!bookingData.service) return;
        
        const slots = generateTimeSlotsForDay(dateString, bookingData.service.duration);
        timeSlotsGrid.innerHTML = '';

        if (slots.length === 0) {
            timeSlotsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Nenhum horário disponível para esta data.</p>';
            return;
        }

        slots.forEach(slot => {
            const btn = document.createElement('button');
            btn.className = `time-slot ${slot.occupied ? 'disabled' : ''}`;
            btn.textContent = slot.time;
            
            if (slot.occupied) {
                btn.disabled = true;
            } else {
                btn.addEventListener('click', () => selectTime(slot.time));
                if (bookingData.time === slot.time) btn.classList.add('selected');
            }
            
            timeSlotsGrid.appendChild(btn);
        });
    }

    function selectTime(time) {
        bookingData.time = time;
        // Update UI styling
        document.querySelectorAll('.time-slot').forEach(el => el.classList.remove('selected'));
        const selectedBtn = Array.from(document.querySelectorAll('.time-slot')).find(el => el.textContent === time);
        if(selectedBtn) selectedBtn.classList.add('selected');
        updateNavigation();
    }

    // --- Helpers e Validação ---

    function updateUI() {
        console.log('Updating UI for step:', currentStep);
        
        // Steps Visibility - Usando IDs para maior segurança
        // Ocultar todos
        document.querySelectorAll('.step-content').forEach(el => {
            el.classList.remove('active');
            el.style.display = 'none';
        });

        // Mostrar atual
        const currentStepEl = document.getElementById(`step${currentStep}`);
        if (currentStepEl) {
            currentStepEl.classList.add('active');
            currentStepEl.style.display = 'block';
        } else {
            console.error(`Step element not found: step${currentStep}`);
        }

        // Progress Bar
        progressSteps.forEach((step, index) => {
            if (index + 1 === currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else if (index + 1 < currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else {
                step.classList.remove('active', 'completed');
            }
        });

        // Buttons
        btnPrev.classList.toggle('hidden', currentStep === 1);
        
        if (currentStep === 4) { // Confirmação
            btnNext.classList.add('hidden');
            btnSubmit.classList.remove('hidden');
            renderSummary();
        } else {
            btnNext.classList.remove('hidden');
            btnSubmit.classList.add('hidden');
        }

        updateNavigation();
    }

    function updateNavigation() {
        // Desabilitar botão próximo se o passo atual não estiver válido
        const isValid = validateStep(currentStep);
        console.log('Updating navigation. Step:', currentStep, 'Valid:', isValid);
        btnNext.disabled = !isValid;
    }

    function validateStep(step) {
        if (step === 1) return !!bookingData.service;
        if (step === 2) return !!bookingData.date;
        if (step === 3) return !!bookingData.time;
        if (step === 4) return validateForm();
        return false;
    }
    
    function validateForm() {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        return name.length > 3 && phone.length > 8;
    }

    function renderSummary() {
        if (!bookingData.service || !bookingData.date || !bookingData.time) return;
        
        const dateObj = new Date(bookingData.date + 'T00:00:00');
        const dateFormatted = dateObj.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

        summaryContainer.innerHTML = `
            <div class="summary-item">
                <span class="summary-label">Procedimento:</span>
                <span class="summary-value">${bookingData.service.name}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Data:</span>
                <span class="summary-value">${dateFormatted}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Horário:</span>
                <span class="summary-value">${bookingData.time}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Duração Est.:</span>
                <span class="summary-value">${bookingData.service.duration} min</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Valor:</span>
                <span class="summary-value">${bookingData.service.price}</span>
            </div>
        `;
    }

    // Form Listener
    document.getElementById('name').addEventListener('input', updateNavigation);
    document.getElementById('phone').addEventListener('input', updateNavigation);

    // Utils
    function formatDateISO(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function isSameDay(d1, d2) {
        return d1.getFullYear() === d2.getFullYear() &&
               d1.getMonth() === d2.getMonth() &&
               d1.getDate() === d2.getDate();
    }
})();
