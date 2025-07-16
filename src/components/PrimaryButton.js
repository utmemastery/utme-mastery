import React from 'react';
import { Button } from 'react-native-paper';

export default function PrimaryButton({ children, style, ...props }) {
  return (
    <Button
      mode="contained"
      style={style}
      contentStyle={{ paddingVertical: 8 }}
      labelStyle={{ fontWeight: 'bold', fontSize: 16 }}
      {...props}
    >
      {children}
    </Button>
  );
} 