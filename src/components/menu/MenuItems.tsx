const items = {
  positionInLineButton: (onClickCallback: () => void) => {
    return {
      label: "Position in a Line",
      key: "line",
      icon: undefined,
      onClick: onClickCallback,
    };
  },
  saveShowButton: (onClickCallback: () => void) => {
    return {
      label: "Save Show",
      key: "save",
      icon: undefined,
      onClick: onClickCallback,
    };
  },
};

export default items;
