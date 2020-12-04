export const handleKey = <E extends React.KeyboardEvent<HTMLElement>>(
  key: string,
  handler: (event: E) => void,
  preventsDefault?: true
) => (event: E) => {
  if (event.key === key) {
    preventsDefault && event.preventDefault();
    handler(event);
  }
};
