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
  Box,
  ButtonGroup,
  Chip,
  Divider,
  IconButton,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from '@mui/material';
import ReactCodeMirror, { Extension } from '@uiw/react-codemirror';
import clsx from 'clsx';
import { graphql } from 'cm6-graphql';
import { GraphQLSchema } from 'graphql';
import { dracula, tomorrow } from 'thememirror';

import { useAlertBar, useHistory, useTheme } from '@/shared/contexts';
import { useLocalStorage } from '@/shared/hooks/use-local-storage';
import FormatCode from '@/shared/utils/format-code';

import style from './code-editor.module.css';

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

  const { updateStatus } = useLocalStorage();

  const { isHistory } = useHistory();

  if (status !== 0 && isHistory.current === false) {
    updateStatus(status);
  }

  const extensions: Extension[] = [];

  if (isGraphQl && schema) {
    extensions.push(graphql(schema));
  } else if (!isTextMode) {
    extensions.push(json());
  }

  const { darkMode } = useTheme();

  const { setError } = useAlertBar();

  const t = useTranslations('Common');

  const handlePrettier = async () => {
    let formatted = value;

    try {
      formatted = await FormatCode(value, isGraphQl);
    } catch (error) {
      setError(`${t('error-prettify')}: ${error}`);
    }

    if (onChange) {
      onChange(formatted);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
      className={clsx({ ['read-only']: !isEdit })}
    >
      <Paper
        sx={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
        }}
        elevation={isEdit ? 2 : 0}
        square={false}
        className={clsx({ ['read-only']: !isEdit }, 'code-editor')}
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
        <ButtonGroup
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            display: 'flex',
            flexDirection: 'column',
            margin: '10px',
            marginRight: '15px',
            zIndex: 1,
          }}
        >
          {isGraphQl && (
            <Tooltip title={t('submit')}>
              <IconButton
                size="small"
                color="success"
                aria-label={t('submit')}
                onClick={() => onSubmit && onSubmit()}
              >
                <PlayCircleIcon />
              </IconButton>
            </Tooltip>
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
              {(isGraphQl || (isEdit && onModeChange)) && (
                <Divider orientation="horizontal" sx={{ mx: 0.5, my: 1 }} />
              )}
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
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              m: '10px',
              mr: '15px',
            }}
            color={status >= 400 ? 'error' : 'success'}
            label={`${t('status-code')} ${status}`}
            size="medium"
            icon={status === 200 ? <DoneIcon /> : <WarningAmberIcon />}
          />
        )}
      </Paper>
    </Box>
  );
};
