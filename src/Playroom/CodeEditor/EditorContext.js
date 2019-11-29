import React, { createContext, useContext, useState, useMemo } from 'react';
import { store } from '../../index';

const editorContext = createContext({
  editorPosition: 'bottom',
  editorSize: 200
});

export const useEditorContext = () => useContext(editorContext);

export const EditorProvider = ({ children }) => {
  const [editorPosition, setEditorPosition] = useState('bottom');
  const [editorSize, setEditorSize] = useState(200);

  const setSize = (size, position) => {
    setEditorSize(size);
    const storeKey = /(left|right)/.test(position)
      ? 'editorWidth'
      : 'editorHeight';

    store.setItem(storeKey, size);
  };
  const setPosition = position => {
    setEditorPosition(position);

    const storeKey = /(left|right)/.test(position)
      ? 'editorWidth'
      : 'editorHeight';
    store.getItem(storeKey).then(size => setEditorSize(size));
    store.setItem('editorPosition', position);
  };

  const editorContextValue = useMemo(
    () => ({
      editorPosition,
      setEditorPosition: setPosition,
      editorSize,
      setEditorSize: setSize
    }),
    [editorPosition, editorSize]
  );

  return (
    <editorContext.Provider value={editorContextValue}>
      {children}
    </editorContext.Provider>
  );
};