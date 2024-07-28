document.addEventListener('DOMContentLoaded', () => {
    const dateDisplay = document.getElementById('date-display');
    const eventList = document.getElementById('event-list');
    const monthYearDisplay = document.getElementById('month-year');
    const calendarDays = document.getElementById('calendar-days');
    const countdownDays = document.getElementById('countdown-days');
    const countdownHours = document.getElementById('countdown-hours');
    const countdownMinutes = document.getElementById('countdown-minutes');
    const countdownSeconds = document.getElementById('countdown-seconds');
    const celebrateButton = document.getElementById('celebrate-button');
    const balloonContainer = document.getElementById('balloon-container');
  
    let currentDate = new Date();
    let currentDayElement;
  
    const recurringEvents = {
      '7-30': ["Meow's Birthday"],
      '8-3': ["Meow became my girl"],
    };
  
    function getRecurringEvents(date) {
      const monthDayKey = `${date.getMonth() + 1}-${date.getDate()}`;
      return recurringEvents[monthDayKey] || [];
    }
  
    function updateDateDisplay() {
      const now = new Date();
      const day = now.getDate();
      const month = now.toLocaleString('default', { month: 'short' });
      dateDisplay.textContent = `${day}${getOrdinal(day)} ${month}`;
    }
  
    function getOrdinal(n) {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return (s[(v - 20) % 10] || s[v] || s[0]);
    }
  
    function updateEventList() {
      eventList.innerHTML = '';
      const eventListForDate = getRecurringEvents(currentDate);
      if (eventListForDate.length > 0) {
        eventListForDate.forEach(event => {
          const li = document.createElement('li');
          li.textContent = event;
          eventList.appendChild(li);
        });
      } else {
        const li = document.createElement('li');
        li.textContent = 'No events';
        eventList.appendChild(li);
      }
    }
  
    function updateCalendar() {
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
      const lastDateOfPrevMonth = new Date(year, month, 0).getDate();
  
      const adjustedFirstDay = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;
  
      monthYearDisplay.textContent = currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' });
  
      calendarDays.innerHTML = '';
  
      for (let i = adjustedFirstDay; i > 0; i--) {
        const dayFromPrevMonth = lastDateOfPrevMonth - i + 1;
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('other-month-day');
        emptyDiv.textContent = dayFromPrevMonth;
        emptyDiv.dataset.date = new Date(year, month - 1, dayFromPrevMonth);
        emptyDiv.addEventListener('click', (e) => {
          currentDate = new Date(e.target.dataset.date);
          updateCalendar();
        });
        calendarDays.appendChild(emptyDiv);
      }
  
      let currentDayFound = false;
      for (let i = 1; i <= lastDateOfMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        if (i === currentDate.getDate() && currentDate.getMonth() === month) {
          dayDiv.classList.add('current-day');
          currentDayFound = true;
          currentDayElement = dayDiv;
        }
        dayDiv.textContent = i;
  
        const eventsForDay = getRecurringEvents(new Date(year, month, i));
        if (eventsForDay.length > 0) {
          dayDiv.classList.add('has-event');
          dayDiv.addEventListener('mouseover', () => {
            eventList.innerHTML = '';
            eventsForDay.forEach(event => {
              const li = document.createElement('li');
              li.textContent = event;
              eventList.appendChild(li);
            });
          });
          dayDiv.addEventListener('mouseout', () => {
            updateEventList();
          });
        }
        dayDiv.addEventListener('click', () => {
          currentDate.setDate(i);
          updateDateDisplay();
          updateEventList();
          updateCalendar();
        });
        calendarDays.appendChild(dayDiv);
      }
  
      const lastDayOfMonth = new Date(year, month, lastDateOfMonth).getDay();
      const daysToFill = (7 - ((lastDayOfMonth === 0) ? 7 : lastDayOfMonth));
      for (let i = 1; i <= daysToFill; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('other-month-day');
        emptyDiv.textContent = i;
        emptyDiv.dataset.date = new Date(year, month + 1, i);
        emptyDiv.addEventListener('click', (e) => {
          currentDate = new Date(e.target.dataset.date);
          updateCalendar();
        });
        calendarDays.appendChild(emptyDiv);
      }
  
      if (currentDayElement) {
        currentDayElement.classList.remove('current-day');
      }
  
      if (currentDayFound && currentDayElement) {
        currentDayElement.classList.add('current-day');
      }
    }
  
    function updateCountdown() {
      const targetDate = new Date('2024-07-30T00:00:00'); 
      const now = new Date();
      const diff = targetDate - now;
  
      if (diff <= 0) {
        countdownDays.textContent = '0';
        countdownHours.textContent = '0';
        countdownMinutes.textContent = '0';
        countdownSeconds.textContent = '0';
        celebrateButton.style.display = 'block';
        startBalloonAnimation();
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
        countdownDays.textContent = days;
        countdownHours.textContent = hours;
        countdownMinutes.textContent = minutes;
        countdownSeconds.textContent = seconds;
      }
    }
  
    function startBalloonAnimation() {
      for (let i = 0; i < 3; i++) {
        const balloon = document.createElement('img');
        balloon.classList.add('balloon');
        balloon.src = `imgs/balloon${Math.floor(Math.random() * 3) + 1}.svg`;
        balloon.style.left = `${Math.random() * 100}vw`;
        balloon.style.width = `${Math.random() * 100 + 30}px`;
        balloon.style.height = `${Math.random() * 140 + 50}px`;
        balloon.style.animation = `float ${Math.random() * 10 + 5}s linear forwards`;

        setTimeout(() => {
          balloon.style.animation += ', pop 1s forwards';
        }, Math.random() * 5000 + 3000); 
  
        balloonContainer.appendChild(balloon);
      }
    }
  
    celebrateButton.addEventListener('click', () => {
      window.location.href = '/happybirthday.html';
    });
  
    document.getElementById('prev-month').addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      updateCalendar();
    });
  
    document.getElementById('next-month').addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      updateCalendar();
    });
  
    updateDateDisplay();
    updateEventList();
    updateCalendar();
  
    setInterval(updateDateDisplay, 1000);
    setInterval(updateCountdown, 1000);
  });
  