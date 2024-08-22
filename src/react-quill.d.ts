// src/react-quill.d.ts

declare module 'react-quill' {
  import * as React from 'react';

  export interface QuillEditorProps {
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    onChange?: (content: string, delta: any, source: any, editor: any) => void;
    modules?: any;
    formats?: string[];
    bounds?: string | HTMLElement;
    readOnly?: boolean;
    theme?: string;
    style?: React.CSSProperties;
    className?: string;
  }

  export default class QuillEditor extends React.Component<QuillEditorProps> {}
}
