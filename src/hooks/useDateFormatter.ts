import { format, parseISO } from "date-fns";
import { useCallback } from "react";

const useDateFormatter = () => {
  const formatDate = useCallback(
    (isoString: string | undefined): string | undefined => {
      if (!isoString) {
        return undefined;
      }
      return format(parseISO(isoString), "yyyy-MM-dd");
    },
    [],
  );

  return { formatDate };
};

export default useDateFormatter;
