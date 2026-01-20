import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Tab,
  Tabs,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  type SelectChangeEvent,
} from '@mui/material';
import type { Person, PeopleStats } from './types/Equipment.ts';
import { peopleApi } from './services/api.ts';
import { PersonCard } from './components/EquipmentCard.tsx';
import { StatsCard } from './components/StatsCard.tsx';
import { PersonFlow } from './components/EquipmentFlow.tsx';
import { PersonDialog } from './components/EquipmentDialog.tsx';
import GroupsIcon from '@mui/icons-material/Groups';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';

function App() {
  const [people, setPeople] = useState<Person[]>([]);
  const [stats, setStats] = useState<PeopleStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [peopleData, statsData] = await Promise.all([
        peopleApi.getAll(),
        peopleApi.getStats(),
      ]);
      setPeople(peopleData);
      setStats(statsData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data. Make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePerson = async (personData: Omit<Person, 'id' | 'metSince'>) => {
    try {
      if (selectedPerson) {
        await peopleApi.update(selectedPerson.id, personData);
      } else {
        await peopleApi.create(personData);
      }
      await fetchData();
      setDialogOpen(false);
      setSelectedPerson(null);
    } catch (err) {
      console.error('Failed to save person:', err);
      setError('Failed to save person');
    }
  };

  const handleEditPerson = (person: Person) => {
    setSelectedPerson(person);
    setDialogOpen(true);
  };

  const handleAddPerson = () => {
    setSelectedPerson(null);
    setDialogOpen(true);
  };

  const filteredPeople = people.filter((person) => {
    const statusMatch = filterStatus === 'all' || person.status === filterStatus;
    const typeMatch = filterType === 'all' || person.type === filterType;
    return statusMatch && typeMatch;
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth={false} sx={{ py: 4, px: { xs: 2, sm: 4, md: 6 } }}>
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
        Social Network Visualizer
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom mb={4}>
        Visualize your social connections
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {stats && (
        <Grid container spacing={3} mb={4}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatsCard
              title="Total People"
              value={stats.total}
              icon={<GroupsIcon />}
              color="#2196f3"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatsCard
              title="Best Friends"
              value={stats.bestFriend}
              icon={<FavoriteIcon />}
              color="#4caf50"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatsCard
              title="Friends"
              value={stats.friend}
              icon={<PeopleIcon />}
              color="#2196f3"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatsCard
              title="Acquaintances"
              value={stats.acquaintance}
              icon={<PersonIcon />}
              color="#ff9800"
            />
          </Grid>
        </Grid>
      )}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="Grid View" />
          <Tab label="Network Map" />
        </Tabs>
      </Box>

      <Box display="flex" gap={2} mb={3} alignItems="center">
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Relationship</InputLabel>
          <Select
            value={filterStatus}
            label="Relationship"
            onChange={(e: SelectChangeEvent) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="best-friend">Best Friend</MenuItem>
            <MenuItem value="friend">Friend</MenuItem>
            <MenuItem value="acquaintance">Acquaintance</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={filterType}
            label="Type"
            onChange={(e: SelectChangeEvent) => setFilterType(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="colleague">Colleague</MenuItem>
            <MenuItem value="groupmate">Groupmate</MenuItem>
            <MenuItem value="family">Family</MenuItem>
            <MenuItem value="classmate">Classmate</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddPerson}
        >
          Add Person
        </Button>
      </Box>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          {filteredPeople.map((person) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={person.id}>
              <PersonCard person={person} onClick={() => handleEditPerson(person)} />
            </Grid>
          ))}
        </Grid>
      )}

      {tabValue === 1 && <PersonFlow people={filteredPeople} />}

      <PersonDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedPerson(null);
        }}
        onSave={handleSavePerson}
        person={selectedPerson}
      />
    </Container>
  );
}

export default App;
