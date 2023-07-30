import { Typography } from "@mui/material";

export const NameItem = ({name}) => {
  return (
    <Typography variant="h6" component="p" sx={{padding: "10px", textWeight: "700" }}>
       {name}
  </Typography>
  )
}

