import React from 'react';
import { Card, Text } from 'react-native-paper';

export default function SectionCard({ title, description, onPress, style }) {
  return (
    <Card style={[{ marginVertical: 8, borderRadius: 12 }, style]} onPress={onPress}>
      <Card.Content>
        <Text variant="titleMedium" style={{ marginBottom: 4 }}>{title}</Text>
        {description ? <Text variant="bodyMedium" style={{ color: '#757575' }}>{description}</Text> : null}
      </Card.Content>
    </Card>
  );
} 