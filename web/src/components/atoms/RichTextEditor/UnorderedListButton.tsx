import { EditorState, RichUtils } from 'draft-js';

const ListButton = ({
  editorState,
  onChange,
  type,
  label,
}: {
  editorState: EditorState;
  onChange: (state: EditorState) => void;
  type: 'unordered-list-item' | 'ordered-list-item';
  label: string;
}) => {
  const toggleBlock = () => {
    const newState = RichUtils.toggleBlockType(editorState, type);
    onChange(newState);
  };

  return (
    <button
      type="button"
      onClick={toggleBlock}
      className="mx-1 px-2 py-1 rounded text-sm border bg-gray-100 hover:bg-gray-200"
    >
      {label}
    </button>
  );
};


export default ListButton