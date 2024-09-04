import { json } from '@codemirror/lang-json';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Box, ButtonGroup, IconButton, Paper } from '@mui/material';
import ReactCodeMirror, { Extension } from '@uiw/react-codemirror';
import clsx from 'clsx';
import { graphql } from 'cm6-graphql';
import { GraphQLSchema } from 'graphql';
import parserBabel from 'prettier/plugins/babel';
import parserEstree from 'prettier/plugins/estree';
import parserGraphql from 'prettier/plugins/graphql';
import prettier from 'prettier/standalone';
import { dracula, smoothy } from 'thememirror';

import { useTheme } from '@/shared/contexts';

import style from './code-editor.module.css';

type CodeEditorProps = {
  isGraphQl?: boolean;
  schema?: GraphQLSchema | null;
  isEdit?: boolean;
  value: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
};
export const CodeEditor = (props: CodeEditorProps) => {
  const {
    isGraphQl = false,
    schema = null,
    isEdit = true,
    value,
    onChange,
    onSubmit,
  } = props;
  const extensions: Extension[] = [];
  if (isGraphQl && schema) {
    extensions.push(graphql(schema));
  } else {
    extensions.push(json());
  }
  const { darkMode } = useTheme();

  const handlePrettier = async () => {
    let formatted = value;
    try {
      formatted = await prettier.format(value, {
        parser: isGraphQl ? 'graphql' : 'json',
        plugins: isGraphQl ? [parserGraphql] : [parserBabel, parserEstree],
      });
    } catch (error) {
      console.error('Error formatting code:', error);
    }

    if (onChange) {
      onChange(formatted);
    }
  };

  return (
    <Box className={clsx(style.editor, { ['read-only']: !isEdit })}>
      <Paper
        elevation={isEdit ? 2 : 0}
        square={false}
        className={clsx(
          style['editor-wrapper'],
          { ['read-only']: !isEdit },
          'code-editor'
        )}
      >
        <ReactCodeMirror
          value={value}
          theme={darkMode ? dracula : smoothy}
          editable={isEdit}
          extensions={extensions}
          onChange={onChange}
          className={style.cm}
        />
        <ButtonGroup className={style.tools}>
          {isGraphQl && (
            <IconButton
              size="small"
              color="primary"
              aria-label="submit"
              onClick={() => onSubmit && onSubmit()}
            >
              <PlayCircleIcon />
            </IconButton>
          )}
          {isEdit && (
            <IconButton
              size="small"
              aria-label="prettify"
              onClick={handlePrettier}
            >
              <FormatPaintIcon />
            </IconButton>
          )}
        </ButtonGroup>
      </Paper>
    </Box>
  );
};
