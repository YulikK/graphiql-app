import { Allotment } from 'allotment';

import style from './resize-vertical.module.css';

type ResizeHorizontalProps = {
  pane1?: React.ReactNode;
  pane2?: React.ReactNode;
};

export const ResizeVertical = ({ pane1, pane2 }: ResizeHorizontalProps) => {
  return (
    <Allotment snap>
      {pane1 && (
        <Allotment.Pane
          snap
          preferredSize={pane1 && pane2 ? '50%' : '100%'}
          className={style.wrap}
        >
          {pane1}
        </Allotment.Pane>
      )}
      {pane2 && (
        <Allotment.Pane
          snap
          preferredSize={pane1 && pane2 ? '50%' : '100%'}
          className={style.wrap}
        >
          {pane2}
        </Allotment.Pane>
      )}
    </Allotment>
  );
};
