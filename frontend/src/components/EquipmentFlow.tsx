import { useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import type { Person } from '../types/Equipment.ts';
import { Box, Paper, Typography, Chip, Avatar } from '@mui/material';

interface PersonFlowProps {
  people: Person[];
}

const getNodeColor = (status: string) => {
  switch (status) {
    case 'best-friend':
      return '#4caf50';
    case 'friend':
      return '#2196f3';
    case 'acquaintance':
      return '#ff9800';
    default:
      return '#9e9e9e';
  }
};

const PersonNode = ({ data }: { data: { label: string; person: Person } }) => {
  const { person } = data;

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        width: 140,
        height: 140,
        borderRadius: '50%',
        border: `4px solid ${getNodeColor(person.status)}`,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Handle type="target" position={Position.Top} />
      <Avatar
        src="/smile.webp"
        alt={person.name}
        sx={{
          width: 50,
          height: 50,
          mb: 1
        }}
      />
      <Typography variant="caption" fontWeight="bold" sx={{ fontSize: '0.7rem' }}>
        {person.name}
      </Typography>
      <Chip
        label={person.type}
        size="small"
        sx={{
          fontSize: '0.6rem',
          height: 20,
          mt: 0.5
        }}
      />
      <Handle type="source" position={Position.Bottom} />
    </Paper>
  );
};

const nodeTypes = {
  person: PersonNode,
};

export const PersonFlow = ({ people }: PersonFlowProps) => {
  const nodeTypesMemo = useMemo(() => nodeTypes, []);

  const initialNodes: Node[] = useMemo(() => {
    return people.map((person, index) => ({
      id: person.id.toString(),
      type: 'person',
      position: {
        x: (index % 3) * 220 + 50,
        y: Math.floor(index / 3) * 200 + 50,
      },
      data: {
        label: person.name,
        person: person,
      },
    }));
  }, [people]);

  const initialEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = [];
    people.forEach((person) => {
      if (person.connections) {
        try {
          const connections: number[] = JSON.parse(person.connections);
          connections.forEach((targetId) => {
            edges.push({
              id: `${person.id}-${targetId}`,
              source: person.id.toString(),
              target: targetId.toString(),
              animated: false,
              style: { stroke: getNodeColor(person.status), strokeWidth: 2 },
            });
          });
        } catch (e) {
          console.error('Failed to parse connections:', e);
        }
      }
    });
    return edges;
  }, [people]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <Box sx={{ height: 'calc(100vh - 280px)', width: '100%', border: '1px solid #ddd', borderRadius: 1 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypesMemo}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </Box>
  );
};
