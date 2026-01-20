export interface Person {
  id: number;
  name: string;
  type: 'colleague' | 'groupmate' | 'family' | 'classmate';
  status: 'best-friend' | 'friend' | 'acquaintance';
  notes: string;
  location?: string;
  metSince: string;
  connections?: string;
}

export interface PeopleStats {
  total: number;
  bestFriend: number;
  friend: number;
  acquaintance: number;
}

export interface FlowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    person: Person;
  };
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
}
