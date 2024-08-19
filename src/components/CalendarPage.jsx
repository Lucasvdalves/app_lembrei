import React, { useState } from 'react';
import { Box, Container, Typography, Button, AppBar, Toolbar, Modal, TextField, Checkbox, FormControlLabel } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { v4 as uuidv4 } from 'uuid';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [reminder, setReminder] = useState(null);
  const [editingEventId, setEditingEventId] = useState(null);

  const handleLogout = () => {
    console.log('Logout');
  };

  const handleRefresh = () => {
    console.log('Refresh');
  };

  const openModal = (dateInfo, eventId = null) => {
    console.log('openModal called');
    console.log('dateInfo:', dateInfo);
    console.log('eventId:', eventId);

    if (eventId) {
      const event = events.find(e => e.id === eventId);
      if (event) {
        setEventTitle(event.title);
        setEventDescription(event.description);
        setEventDate(event.start.split('T')[0]);
        setEventTime(event.start.split('T')[1].split(':')[0] + ':' + event.start.split('T')[1].split(':')[1]);
        setReminder(event.reminder);
      }
    } else {
      setEventTitle('');
      setEventDescription('');
      setEventDate(dateInfo.dateStr);
      setEventTime('00:00');
      setReminder(null);
    }
    setEditingEventId(eventId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEventTitle('');
    setEventDescription('');
    setEventDate('');
    setEventTime('');
    setReminder(null);
  };

  const handleSaveEvent = () => {
    if (eventTitle && eventDate && eventTime) {
      const newEvent = {
        id: editingEventId || uuidv4(),
        title: eventTitle,
        description: eventDescription,
        start: `${eventDate}T${eventTime}`,
        end: `${eventDate}T${eventTime}`,
        reminder,
      };

      if (editingEventId) {
        // Update existing event
        setEvents(events.map(event => (event.id === editingEventId ? newEvent : event)));
      } else {
        // Add new event
        setEvents([...events, newEvent]);
      }

      closeModal();
    } else {
      alert('Preencha todos os campos obrigatórios!');
    }
  };

  const handleDeleteEvent = () => {
    if (editingEventId) {
      setEvents(events.filter(event => event.id !== editingEventId));
      closeModal();
    }
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Bem-vindo, Admin
          </Typography>
          <Button color="inherit" onClick={handleRefresh}>
            Atualizar
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 2 }}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={(info) => openModal(info)}
          eventClick={(info) => openModal(null, info.event.id)} // Open modal on event click
        />
        <Modal
          open={modalOpen}
          onClose={closeModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}>
            <Typography id="modal-title" variant="h6" component="h2">
              {editingEventId ? 'Editar Evento' : 'Adicionar Novo Evento'}
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="event-title"
              label="Título"
              name="event-title"
              autoComplete="off"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="event-description"
              label="Descrição"
              name="event-description"
              autoComplete="off"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="event-date"
              label="Data"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="event-time"
              label="Hora"
              type="time"
              InputLabelProps={{ shrink: true }}
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={reminder === 5}
                  onChange={() => setReminder(reminder === 5 ? null : 5)}
                />
              }
              label="Lembrar 5 min antes"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={reminder === 10}
                  onChange={() => setReminder(reminder === 10 ? null : 10)}
                />
              }
              label="Lembrar 10 min antes"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={reminder === 30}
                  onChange={() => setReminder(reminder === 30 ? null : 30)}
                />
              }
              label="Lembrar 30 min antes"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={reminder === 60}
                  onChange={() => setReminder(reminder === 60 ? null : 60)}
                />
              }
              label="Lembrar 1h antes"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button onClick={handleSaveEvent} variant="contained" color="primary">
                Salvar
              </Button>
              {editingEventId && (
                <Button onClick={handleDeleteEvent} variant="outlined" color="secondary">
                  Excluir
                </Button>
              )}
            </Box>
          </Box>
        </Modal>
      </Container>
    </Box>
  );
};

export default CalendarPage;
