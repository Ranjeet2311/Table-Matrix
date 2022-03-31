import SelectionArea from "@viselect/react";
import React, { useState } from "react";
import SelectTable from "./SelectTable";

function SelectableAreas() {
  const [selected, setSelected] = useState(() => new Set());

  const extractIds = (els) =>
    els
      .map((v) => v.getAttribute("data-key"))
      .filter(Boolean)
      .map(Number);

  const onStart = ({ event, selection }) => {
    if (!event?.ctrlKey && !event?.metaKey) {
      selection.clearSelection();
      setSelected(() => new Set());
    }
  };

  const onMove = ({
    store: {
      changed: { added, removed },
    },
  }) => {
    setSelected((prev) => {
      const next = new Set(prev);
      extractIds(added).forEach((id) => next.add(id));
      extractIds(removed).forEach((id) => next.delete(id));
      return next;
    });
  };

  return (
    <SelectionArea
      className="container"
      onStart={onStart}
      onMove={onMove}
      selectables=".selectable"
    >
      <SelectTable selected={selected} />
    </SelectionArea>
  );
}

export default SelectableAreas;
