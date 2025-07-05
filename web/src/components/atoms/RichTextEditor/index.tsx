import React, { useState, useRef, useEffect } from 'react';
import {
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  DraftHandleValue,
  ContentState,
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromHTML } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createStaticToolbarPlugin from '@draft-js-plugins/static-toolbar';
import createAnchorPlugin from '@draft-js-plugins/anchor';
import {
  BoldButton,
  ItalicButton,
  UnderlineButton,
  OrderedListButton,
  UnorderedListButton,
} from '@draft-js-plugins/buttons';
import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import '@draft-js-plugins/anchor/lib/plugin.css';
import ListButton from './UnorderedListButton';

type Props = {
  /** External HTML value ('' for empty) */
  value: string;
  /** Send updated HTML to parent */
  onChange: (html: string) => void;
  placeholder?: string;
};

/* ---------- toolbar plugins ---------- */
const toolbarPlugin = createStaticToolbarPlugin();
const { Toolbar } = toolbarPlugin;

const anchorPlugin = createAnchorPlugin();
const { LinkButton } = anchorPlugin;

const plugins = [toolbarPlugin, anchorPlugin];

const htmlToEditorState = (html: string) => {
  if (!html) return EditorState.createEmpty();
  const blocks = convertFromHTML(html);
  const content = ContentState.createFromBlockArray(
    blocks.contentBlocks,
    blocks.entityMap
  );
  return EditorState.createWithContent(content);
};

const RichTextEditor: React.FC<Props> = ({
  value,
  onChange,
  placeholder = 'Type here…',
}) => {
  /* ---------- internal EditorState ---------- */
  const [editorState, setEditorState] = useState(() => htmlToEditorState(value));
  const editorRef = useRef<Editor>(null);

  /* ---------- keep internal state in sync with external value ---------- */
  useEffect(() => {
    setEditorState((prev) => {
      const html = stateToHTML(prev.getCurrentContent());
      return html === value ? prev : htmlToEditorState(value);
    });
  }, [value]);

  /* ---------- propagate changes upward ---------- */
  const handleInternalChange = (state: EditorState) => {
    setEditorState(state);
    onChange(stateToHTML(state.getCurrentContent()));
  };

  /* ---------- keyboard helpers ---------- */
  const handleKeyCommand = (
    command: string,
    state: EditorState
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(state, command);
    if (newState) {
      handleInternalChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const keyBindingFn = (e: React.KeyboardEvent) => getDefaultKeyBinding(e);

  return (
    <div className="space-y-3 rounded rmv-border border-gray-300 rmv-p-4">
      {/* toolbar */}
      <Toolbar>
        {(externalProps) => (
          <>
            <BoldButton {...externalProps} />
            <ItalicButton {...externalProps} />
            <UnderlineButton {...externalProps} />
            {/* <OrderedListButton {...externalProps} />
            <UnorderedListButton {...externalProps} /> */}
            <ListButton
              editorState={editorState}
              onChange={handleInternalChange}
              type="ordered-list-item"
              label="OL"
            />
            <ListButton
              editorState={editorState}
              onChange={handleInternalChange}
              type="unordered-list-item"
              label="UL"
            />
            <LinkButton {...externalProps} />
          </>
        )}
      </Toolbar>

      {/* editor */}
      <div
        className="block w-full bg-[#eff2f9] font-normal text-[#1e2532] p-4"
        onClick={() => editorRef.current?.focus()}
      >
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={handleInternalChange}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={keyBindingFn}
          plugins={plugins}
          placeholder={placeholder}
          stripPastedStyles={false}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
