'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  Button,
  IconButton,
  Tabs,
  Tab,
  Grid,
  Pagination,
} from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';

const mockClients = [
  {
    id: 1,
    nombre: 'María González',
    email: 'maria.gonzalez@example.com',
    telefono: '+52 555 123 4567',
    fechaRegistro: '2023-05-15',
    puntos: 2450,
    estado: 'Activo',
    ultimaCompra: '2023-10-28',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 2,
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com',
    telefono: '+52 555 987 6543',
    fechaRegistro: '2023-06-22',
    puntos: 1850,
    estado: 'Activo',
    ultimaCompra: '2023-10-15',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 3,
    nombre: 'Ana Rodríguez',
    email: 'ana.rodriguez@example.com',
    telefono: '+52 555 456 7890',
    fechaRegistro: '2023-04-10',
    puntos: 3200,
    estado: 'Inactivo',
    ultimaCompra: '2023-08-05',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 4,
    nombre: 'Carlos Martínez',
    email: 'carlos.martinez@example.com',
    telefono: '+52 555 234 5678',
    fechaRegistro: '2023-07-18',
    puntos: 950,
    estado: 'Activo',
    ultimaCompra: '2023-10-25',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 5,
    nombre: 'Laura Sánchez',
    email: 'laura.sanchez@example.com',
    telefono: '+52 555 876 5432',
    fechaRegistro: '2023-03-30',
    puntos: 4100,
    estado: 'Activo',
    ultimaCompra: '2023-10-22',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 6,
    nombre: 'Roberto Díaz',
    email: 'roberto.diaz@example.com',
    telefono: '+52 555 345 6789',
    fechaRegistro: '2023-08-05',
    puntos: 750,
    estado: 'Inactivo',
    ultimaCompra: '2023-09-10',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 7,
    nombre: 'Patricia López',
    email: 'patricia.lopez@example.com',
    telefono: '+52 555 654 3210',
    fechaRegistro: '2023-02-14',
    puntos: 5200,
    estado: 'Activo',
    ultimaCompra: '2023-10-18',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 8,
    nombre: 'Miguel Torres',
    email: 'miguel.torres@example.com',
    telefono: '+52 555 765 4321',
    fechaRegistro: '2023-09-12',
    puntos: 300,
    estado: 'Activo',
    ultimaCompra: '2023-10-01',
    avatar: '/placeholder.svg?height=40&width=40',
  },
];

const mockStats = {
  totalClientes: 1248,
  clientesNuevos: 156,
  clientesActivos: 987,
  clientesInactivos: 261,
  puntosPromedio: 2150,
};

const ClientesView = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClients, setFilteredClients] = useState(mockClients);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const filtered = mockClients.filter(
      (client) =>
        client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.telefono.includes(searchTerm)
    );
    setFilteredClients(filtered);
  }, [searchTerm]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const getStatusColor = (status: string) => {
    return status === 'Activo' ? 'success' : 'error';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Calculate pagination
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedClients = filteredClients.slice(startIndex, endIndex);
  const pageCount = Math.ceil(filteredClients.length / rowsPerPage);

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          Clientes
        </Typography>
        <Box>
          <Button variant="contained" startIcon={<AddIcon />} sx={{ mr: 2 }}>
            Nuevo Cliente
          </Button>
          <Button variant="outlined" startIcon={<DownloadIcon />}>
            Exportar
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Clientes
              </Typography>
              <Typography variant="h5" component="div" fontWeight="bold">
                {mockStats.totalClientes}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Nuevos (30 días)
              </Typography>
              <Typography
                variant="h5"
                component="div"
                fontWeight="bold"
                color="primary"
              >
                {mockStats.clientesNuevos}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Clientes Activos
              </Typography>
              <Typography
                variant="h5"
                component="div"
                fontWeight="bold"
                color="success.main"
              >
                {mockStats.clientesActivos}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Clientes Inactivos
              </Typography>
              <Typography
                variant="h5"
                component="div"
                fontWeight="bold"
                color="error.main"
              >
                {mockStats.clientesInactivos}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Puntos Promedio
              </Typography>
              <Typography variant="h5" component="div" fontWeight="bold">
                {mockStats.puntosPromedio}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box
        sx={{
          mb: 3,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', md: 'center' },
          gap: 2,
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            '& .MuiTabs-indicator': { backgroundColor: 'primary.main' },
            '& .Mui-selected': { color: 'primary.main' },
          }}
        >
          <Tab label="Todos" />
          <Tab label="Activos" />
          <Tab label="Inactivos" />
          <Tab label="Nuevos" />
        </Tabs>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            placeholder="Buscar cliente..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            sx={{ minWidth: 'auto' }}
          >
            Filtros
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ mb: 3 }} numberOfColumns={7}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: 'background.paper' }}>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell>Contacto</TableCell>
              <TableCell>Fecha Registro</TableCell>
              <TableCell>Puntos</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Última Compra</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedClients.map((client) => (
              <TableRow key={client.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={client.avatar} alt={client.nombre} />
                    <Typography variant="body2" fontWeight="medium">
                      {client.nombre}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{client.email}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {client.telefono}
                  </Typography>
                </TableCell>
                <TableCell>{formatDate(client.fechaRegistro)}</TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {client.puntos.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={client.estado}
                    size="small"
                    color={getStatusColor(client.estado)}
                  />
                </TableCell>
                <TableCell>{formatDate(client.ultimaCompra)}</TableCell>
                <TableCell align="right">
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
};

export default ClientesView;
