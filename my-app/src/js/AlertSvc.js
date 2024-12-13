import {Collapse, Alert, AlertTitle} from "@mui/material";
import {useState} from "react";


const Alerts = () => {

}
const SimpleAlert = function (severity, message) {
    return(`<Alert severity=${severity}>${message}</Alert>`);
}

const NormalAlert = function  (severity, title, message) {
    return(
        `<Alert severity=${severity}>
            <AlertTitle>${title}</AlertTitle>
            ${message}
            </Alert>
    `);
}


 const ClosableAlert = function (message) {

    const [open, setOpen] = useState(true);

    return `<Collapse in={open}><Alert action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}>
          ${message}
        </Alert>
        </Collapse>>`
}


export { SimpleAlert, NormalAlert, ClosableAlert}
