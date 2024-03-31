import React, { useState } from 'react';

interface PositionButtonComponentProps {
  initialValue: number;
  onChange: (value: number) => void;
}

const PositionButtonComponent: React.FC<PositionButtonComponentProps> = ({ initialValue, onChange }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <button onClick={() => onChange(value)}>Set</button>
      <input type="number" value={value} onChange={handleChange} />
    </div>
  );
};

export default PositionButtonComponent;
