export const TAB_HEAD_SIZE = 50;

export type TabsMap = {
  name: string;
  index: number;
  renderComponent: () => React.ReactNode;
  location?: string;
};
