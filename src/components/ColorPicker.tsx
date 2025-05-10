import React, { forwardRef, useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Box } from "@mui/material";
import { useTheme } from '@mui/material/styles'

type Props = {
  onChange: (value: string) => void;
  value: string;
};

const ColorPicker = forwardRef(({ onChange, value }: Props, ref) => {
  const theme = useTheme()

  const [displayPicker, setDisplayPicker] = useState<boolean>(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target as Node)
    ) {
      setDisplayPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          width: "30px",
          height: "30px",
          cursor: "pointer",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: "3px",
          background: "transparent",
          p: "3px",
        }}
        color={value}
        onClick={() => setDisplayPicker(!displayPicker)}
      >
        <Box
          sx={{
            background: value,
            width: "100%",
            height: "100%",
          }}
        />
      </Box>
      {displayPicker && (
        <Box
          ref={pickerRef}
          sx={{ position: "absolute", zIndex: 1000, right: 0, top: "50px" }}
        >
          <HexColorPicker color={value} onChange={onChange} />
        </Box>
      )}
    </Box>
  );
});

export default ColorPicker;
