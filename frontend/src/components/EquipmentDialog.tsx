import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
} from '@mui/material';
import type { Person } from '../types/Equipment.ts';

interface PersonDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (person: Omit<Person, 'id' | 'metSince'>) => void;
  person?: Person | null;
}

export const PersonDialog = ({ open, onClose, onSave, person }: PersonDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'colleague' as 'colleague' | 'groupmate' | 'family' | 'classmate',
    status: 'friend' as 'best-friend' | 'friend' | 'acquaintance',
    notes: '',
    location: '',
    connections: '[]',
  });

  useEffect(() => {
    if (person) {
      setFormData({
        name: person.name,
        type: person.type,
        status: person.status,
        notes: person.notes,
        location: person.location || '',
        connections: person.connections || '[]',
      });
    } else {
      setFormData({
        name: '',
        type: 'colleague',
        status: 'friend',
        notes: '',
        location: '',
        connections: '[]',
      });
    }
  }, [person, open]);

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{person ? 'Edit Person' : 'Add New Person'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              select
              label="Type"
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value as 'colleague' | 'groupmate' | 'family' | 'classmate',
                })
              }
            >
              <MenuItem value="colleague">Colleague</MenuItem>
              <MenuItem value="groupmate">Groupmate</MenuItem>
              <MenuItem value="family">Family</MenuItem>
              <MenuItem value="classmate">Classmate</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              select
              label="Relationship"
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as 'best-friend' | 'friend' | 'acquaintance',
                })
              }
            >
              <MenuItem value="best-friend">Best Friend</MenuItem>
              <MenuItem value="friend">Friend</MenuItem>
              <MenuItem value="acquaintance">Acquaintance</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              label="Notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              required
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              label="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Connections (JSON array of IDs)"
              value={formData.connections}
              onChange={(e) => setFormData({ ...formData, connections: e.target.value })}
              helperText='Example: [2,3] for connections to person IDs 2 and 3'
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!formData.name || !formData.notes}
        >
          {person ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
