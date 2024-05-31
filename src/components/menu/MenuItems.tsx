const items = {
  positionInLineButton: (onClickCallback: () => void) => {
    return {
      label: "Position in a Line",
      key: "line",
      icon: undefined,
      onClick: onClickCallback,
    };
  },
};

export default items;
