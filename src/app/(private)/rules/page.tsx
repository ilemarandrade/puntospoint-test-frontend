'use client';

import type React from 'react';

import { useState, type ReactElement } from 'react';
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
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  IconButton,
  Grid,
  Switch,
  FormControlLabel,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  type SelectChangeEvent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CelebrationIcon from '@mui/icons-material/Celebration';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PeopleIcon from '@mui/icons-material/People';
import TimelineIcon from '@mui/icons-material/Timeline';

// Define types
type RuleType = 'Compra' | 'Evento' | 'Ubicación' | 'Temporada' | 'Referido';
type RuleStatus = 'Activo' | 'Inactivo' | 'Programado';

interface Rule {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: RuleType;
  factor: number;
  estado: RuleStatus;
  fechaInicio: string;
  fechaFin: string | null;
  condiciones: string;
  puntosOtorgados: number;
  icon: ReactElement;
}

interface Stats {
  reglasActivas: number;
  reglasInactivas: number;
  reglasProgramadas: number;
  puntosOtorgadosMes: number;
  puntosOtorgadosTotal: number;
  tasaRedencion: number;
}

const mockRules: Rule[] = [
  {
    id: 1,
    nombre: 'Compra Estándar',
    descripcion: 'Puntos por cada compra realizada',
    tipo: 'Compra',
    factor: 0.05, // 5% del valor de compra
    estado: 'Activo',
    fechaInicio: '2023-01-01',
    fechaFin: null,
    condiciones: 'Todas las compras',
    puntosOtorgados: 12450,
    icon: <ShoppingCartIcon />,
  },
  {
    id: 2,
    nombre: 'Cumpleaños',
    descripcion: 'Puntos extra en el mes de cumpleaños del cliente',
    tipo: 'Evento',
    factor: 2, // Multiplicador x2
    estado: 'Activo',
    fechaInicio: '2023-01-01',
    fechaFin: null,
    condiciones: 'Solo en el mes de cumpleaños',
    puntosOtorgados: 5200,
    icon: <CelebrationIcon />,
  },
  {
    id: 3,
    nombre: 'Primera Compra',
    descripcion: 'Bonificación por primera compra',
    tipo: 'Evento',
    factor: 500, // Puntos fijos
    estado: 'Activo',
    fechaInicio: '2023-01-01',
    fechaFin: null,
    condiciones: 'Solo para la primera compra del cliente',
    puntosOtorgados: 7500,
    icon: <LocalOfferIcon />,
  },
  {
    id: 4,
    nombre: 'Compra en Tienda Física',
    descripcion: 'Puntos adicionales por compras en tiendas físicas',
    tipo: 'Ubicación',
    factor: 0.02, // 2% adicional
    estado: 'Inactivo',
    fechaInicio: '2023-03-15',
    fechaFin: '2023-09-15',
    condiciones: 'Solo en tiendas físicas',
    puntosOtorgados: 3800,
    icon: <StorefrontIcon />,
  },
  {
    id: 5,
    nombre: 'Referidos',
    descripcion: 'Puntos por referir a un amigo',
    tipo: 'Referido',
    factor: 200, // Puntos fijos
    estado: 'Activo',
    fechaInicio: '2023-02-01',
    fechaFin: null,
    condiciones: 'El referido debe realizar una compra',
    puntosOtorgados: 4600,
    icon: <PeopleIcon />,
  },
  {
    id: 6,
    nombre: 'Temporada Navideña',
    descripcion: 'Puntos extra durante temporada navideña',
    tipo: 'Temporada',
    factor: 0.1, // 10% del valor de compra
    estado: 'Programado',
    fechaInicio: '2023-12-01',
    fechaFin: '2023-12-31',
    condiciones: 'Todas las compras en diciembre',
    puntosOtorgados: 0,
    icon: <CalendarMonthIcon />,
  },
];

// Mock data for statistics
const mockStats: Stats = {
  reglasActivas: 4,
  reglasInactivas: 1,
  reglasProgramadas: 1,
  puntosOtorgadosMes: 8750,
  puntosOtorgadosTotal: 33550,
  tasaRedencion: 68,
};

const ReglasAcumulacionView = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [tabValue, setTabValue] = useState<number>(0);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenDialog = (rule: Rule | null = null) => {
    setSelectedRule(rule);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRule(null);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filteredRules = mockRules.filter(
    (rule) =>
      rule.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (
    status: RuleStatus
  ): 'success' | 'error' | 'warning' | 'default' => {
    switch (status) {
      case 'Activo':
        return 'success';
      case 'Inactivo':
        return 'error';
      case 'Programado':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'Sin fecha límite';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatFactor = (rule: Rule): string => {
    switch (rule.tipo) {
      case 'Compra':
      case 'Ubicación':
      case 'Temporada':
        return `${(rule.factor * 100).toFixed(0)}% del valor`;
      case 'Evento':
        return rule.factor % 1 === 0
          ? `${rule.factor} puntos`
          : `${rule.factor}x multiplicador`;
      case 'Referido':
        return `${rule.factor} puntos`;
      default:
        return rule.factor.toString();
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    console.log(event.target.value);
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked);
  };

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target.value);
  };

  const handleSaveRule = () => {
    handleCloseDialog();
  };

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
          Reglas de Acumulación
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Nueva Regla
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Puntos Otorgados (Total)
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="bold">
                    {mockStats.puntosOtorgadosTotal.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Este mes: {mockStats.puntosOtorgadosMes.toLocaleString()}
                  </Typography>
                </Box>
                <TimelineIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Estado de Reglas
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    <Box>
                      <Typography
                        variant="h5"
                        component="div"
                        fontWeight="bold"
                        color="success.main"
                      >
                        {mockStats.reglasActivas}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Activas
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="h5"
                        component="div"
                        fontWeight="bold"
                        color="error.main"
                      >
                        {mockStats.reglasInactivas}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Inactivas
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="h5"
                        component="div"
                        fontWeight="bold"
                        color="warning.main"
                      >
                        {mockStats.reglasProgramadas}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Programadas
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <LocalOfferIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Tasa de Redención
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="bold">
                    {mockStats.tasaRedencion}%
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Puntos canjeados vs. otorgados
                  </Typography>
                </Box>
                <ShoppingCartIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
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
          <Tab label="Todas" />
          <Tab label="Activas" />
          <Tab label="Inactivas" />
          <Tab label="Programadas" />
        </Tabs>
        <TextField
          placeholder="Buscar regla..."
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
      </Box>

      <TableContainer component={Paper} sx={{ mb: 3 }} numberOfColumns={7}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: 'background.paper' }}>
            <TableRow>
              <TableCell>Regla</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Beneficio</TableCell>
              <TableCell>Vigencia</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Puntos Otorgados</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRules.map((rule) => (
              <TableRow key={rule.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderRadius: '50%',
                        width: 36,
                        height: 36,
                      }}
                    >
                      {rule.icon}
                    </Box>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {rule.nombre}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {rule.descripcion}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{rule.tipo}</TableCell>
                <TableCell>{formatFactor(rule)}</TableCell>
                <TableCell>
                  <Typography variant="body2">
                    Desde: {formatDate(rule.fechaInicio)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Hasta: {formatDate(rule.fechaFin)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={rule.estado}
                    size="small"
                    color={getStatusColor(rule.estado)}
                  />
                </TableCell>
                <TableCell>{rule.puntosOtorgados.toLocaleString()}</TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(rule)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Rule Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedRule
            ? 'Editar Regla de Acumulación'
            : 'Nueva Regla de Acumulación'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre de la Regla"
                fullWidth
                defaultValue={selectedRule?.nombre || ''}
                margin="normal"
                onChange={handleTextFieldChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Tipo de Regla</InputLabel>
                <Select
                  defaultValue={selectedRule?.tipo || 'Compra'}
                  label="Tipo de Regla"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="Compra">Compra</MenuItem>
                  <MenuItem value="Evento">Evento</MenuItem>
                  <MenuItem value="Ubicación">Ubicación</MenuItem>
                  <MenuItem value="Temporada">Temporada</MenuItem>
                  <MenuItem value="Referido">Referido</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                fullWidth
                multiline
                rows={2}
                defaultValue={selectedRule?.descripcion || ''}
                margin="normal"
                onChange={handleTextFieldChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Factor de Acumulación"
                fullWidth
                type="number"
                defaultValue={selectedRule?.factor || ''}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                onChange={handleTextFieldChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Estado</InputLabel>
                <Select
                  defaultValue={selectedRule?.estado || 'Activo'}
                  label="Estado"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="Activo">Activo</MenuItem>
                  <MenuItem value="Inactivo">Inactivo</MenuItem>
                  <MenuItem value="Programado">Programado</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Fecha de Inicio"
                type="date"
                fullWidth
                defaultValue={
                  selectedRule?.fechaInicio ||
                  new Date().toISOString().split('T')[0]
                }
                margin="normal"
                InputLabelProps={{ shrink: true }}
                onChange={handleTextFieldChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Fecha de Fin (opcional)"
                type="date"
                fullWidth
                defaultValue={selectedRule?.fechaFin || ''}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                onChange={handleTextFieldChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Condiciones"
                fullWidth
                multiline
                rows={2}
                defaultValue={selectedRule?.condiciones || ''}
                margin="normal"
                onChange={handleTextFieldChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Configuración Avanzada
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch defaultChecked onChange={handleSwitchChange} />
                }
                label="Aplicar a todos los productos"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch defaultChecked onChange={handleSwitchChange} />
                }
                label="Combinar con otras reglas"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Límite de puntos por cliente"
                fullWidth
                type="number"
                defaultValue="1000"
                margin="normal"
                onChange={handleTextFieldChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Mínimo de compra (MXN)"
                fullWidth
                type="number"
                defaultValue="0"
                margin="normal"
                onChange={handleTextFieldChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button variant="contained" onClick={handleSaveRule}>
            {selectedRule ? 'Guardar Cambios' : 'Crear Regla'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReglasAcumulacionView;
