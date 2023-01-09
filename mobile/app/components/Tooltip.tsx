import { Tooltip, TooltipProps } from '@rneui/themed';
import React from 'react';

export const ControlledTooltip: React.FC<
  TooltipProps & {
    customOverlay: (closeHandler: () => void) => React.ReactElement;
    children: React.ReactNode;
  }
> = props => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Tooltip
      visible={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      {...props}
      popover={props.customOverlay(handleClose)}
    />
  );
};
