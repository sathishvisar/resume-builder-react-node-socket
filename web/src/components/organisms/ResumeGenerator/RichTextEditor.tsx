// RichTextEditor.tsx
import { useState, useEffect } from 'react';

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const [editorValue, setEditorValue] = useState(value);

  useEffect(() => {
    setEditorValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setEditorValue(newValue);
    onChange(newValue);
  };

  return (
    <textarea
      value={editorValue}
      onChange={handleChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 min-h-[150px]"
    />
  );
};

export default RichTextEditor;