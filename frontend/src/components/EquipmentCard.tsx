import { Card, CardContent, Typography, Chip, Box, Avatar } from '@mui/material';
import type { Person } from '../types/Equipment.ts';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import GroupsIcon from '@mui/icons-material/Groups';

interface PersonCardProps {
  person: Person;
  onClick?: () => void;
}

const getIcon = (type: string) => {
  switch (type) {
    case 'colleague':
      return <WorkIcon />;
    case 'classmate':
      return <SchoolIcon />;
    case 'family':
      return <FamilyRestroomIcon />;
    case 'groupmate':
      return <GroupsIcon />;
    default:
      return <GroupsIcon />;
  }
};

const getStatusColor = (status: string): 'success' | 'info' | 'warning' | 'default' => {
  switch (status) {
    case 'best-friend':
      return 'success';
    case 'friend':
      return 'info';
    case 'acquaintance':
      return 'warning';
    default:
      return 'default';
  }
};

const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'best-friend':
      return 'Best Friend';
    case 'friend':
      return 'Friend';
    case 'acquaintance':
      return 'Acquaintance';
    default:
      return status;
  }
};

export const PersonCard = ({ person, onClick }: PersonCardProps) => {
  return (
    <Card
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? { boxShadow: 6 } : {},
        transition: 'box-shadow 0.3s',
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={1}>
          <Avatar src="/smile.webp" alt={person.name} />
          <Typography variant="h6" component="div">
            {person.name}
          </Typography>
        </Box>
        <Box display="flex" gap={1} mb={1} alignItems="center">
          {getIcon(person.type)}
          <Chip label={person.type} size="small" variant="outlined" />
          <Chip label={getStatusLabel(person.status)} size="small" color={getStatusColor(person.status)} />
        </Box>
        <Typography variant="body2" color="text.secondary">
          Notes: {person.notes}
        </Typography>
        {person.location && (
          <Typography variant="body2" color="text.secondary">
            Location: {person.location}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
