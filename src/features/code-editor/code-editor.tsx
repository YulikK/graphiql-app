'use client';
import { useTranslations } from 'next-intl';

import { json } from '@codemirror/lang-json';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DataObjectIcon from '@mui/icons-material/DataObject';
import DoneIcon from '@mui/icons-material/Done';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import TitleIcon from '@mui/icons-material/Title';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {
  Alert,
  Box,
  ButtonGroup,
  Chip,
  Divider,
  IconButton,
  Paper,
  Snackbar,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from '@mui/material';
import ReactCodeMirror, { Extension } from '@uiw/react-codemirror';
import clsx from 'clsx';
import { graphql } from 'cm6-graphql';
import { GraphQLSchema } from 'graphql';
import parserBabel from 'prettier/plugins/babel';
import parserEstree from 'prettier/plugins/estree';
import parserGraphql from 'prettier/plugins/graphql';
import prettier from 'prettier/standalone';
import { useState } from 'react';
import { dracula, tomorrow } from 'thememirror';

import { useTheme } from '@/shared/contexts';

import style from './code-editor.module.css';
enum Language {
  JSON = 'json',
  GRAPHQL = 'graphql',
}

type CodeEditorProps = {
  isGraphQl?: boolean;
  isTextMode?: boolean;
  schema?: GraphQLSchema | null;
  isEdit?: boolean;
  value: string;
  status?: number;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  onBlur?: () => void;
  onModeChange?: (value: boolean) => void;
};
export const CodeEditor = (props: CodeEditorProps) => {
  const {
    isGraphQl = false,
    isTextMode = false,
    schema = null,
    isEdit = true,
    value,
    status = 0,
    onChange,
    onBlur,
    onSubmit,
    onModeChange,
  } = props;
  const extensions: Extension[] = [];
  if (isGraphQl && schema) {
    extensions.push(graphql(schema));
  } else {
    extensions.push(json());
  }
  const { darkMode } = useTheme();
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations('Common');

  const handlePrettier = async () => {
    let formatted = value;
    try {
      formatted = await prettier.format(value, {
        parser: isGraphQl ? Language.GRAPHQL : Language.JSON,
        plugins: isGraphQl ? [parserGraphql] : [parserBabel, parserEstree],
      });
    } catch (error) {
      setError(`${t('error-prettify')}: ${error}`);
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
          theme={darkMode ? dracula : tomorrow}
          editable={isEdit}
          extensions={extensions}
          onChange={onChange}
          onBlur={onBlur}
          className={style.cm}
        />
        <ButtonGroup className={style.tools}>
          {isGraphQl && (
            <IconButton
              size="small"
              color="primary"
              aria-label={t('submit')}
              onClick={() => onSubmit && onSubmit()}
            >
              <PlayCircleIcon />
            </IconButton>
          )}
          {isEdit && !isGraphQl && onModeChange && (
            <>
              <ToggleButtonGroup
                size="small"
                value={isTextMode}
                orientation="vertical"
                exclusive
                onChange={(e, value) => onModeChange(value)}
                aria-label={t('format-mode')}
                sx={{ ml: 'auto' }}
              >
                <Tooltip title={t('json')}>
                  <ToggleButton value={false} aria-label={t('json')}>
                    <DataObjectIcon />
                  </ToggleButton>
                </Tooltip>
                <Tooltip title={t('text')}>
                  <ToggleButton value={true} aria-label={t('text')}>
                    <TitleIcon />
                  </ToggleButton>
                </Tooltip>
              </ToggleButtonGroup>
            </>
          )}
          {isEdit && !isTextMode && (
            <>
              <Divider
                flexItem
                orientation="horizontal"
                sx={{ mx: 0.5, my: 1 }}
              />
              <ToggleButtonGroup size="small">
                <Tooltip title={t('pretty')}>
                  <IconButton
                    size="small"
                    aria-label={t('pretty')}
                    onClick={handlePrettier}
                  >
                    <AutoFixHighIcon />
                  </IconButton>
                </Tooltip>
              </ToggleButtonGroup>
            </>
          )}
        </ButtonGroup>
        {status > 0 && (
          <Chip
            className={style.status}
            color={status === 200 ? 'success' : 'error'}
            label={`${t('status-code')} ${status}`}
            size="medium"
            icon={status === 200 ? <DoneIcon /> : <WarningAmberIcon />}
          />
        )}
      </Paper>
      <Snackbar
        open={!!error}
        onClose={() => setError(null)}
        autoHideDuration={5000}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};
