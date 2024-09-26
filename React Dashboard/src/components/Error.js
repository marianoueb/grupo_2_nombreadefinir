import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Link, Redirect } from 'react-router-dom';
import Button from '@mui/material/Button';

function Error (props) {
    const [value, setValue] = React.useState('Dione');
    const [open, setOpen] = React.useState(false);

    const handleClickListItem = () => {
      setOpen(true);
    };
    
    useEffect(() => {
        handleClickListItem();
    }, [])
    const handleClose = (newValue) => {
      setOpen(false);
  
      if (newValue) {
        setValue(newValue);
      }
    };

  return( 
    <Fragment>
        <section className="error-main">
            <Paper elevation={3} style={{
                        width: "50%",
                        height: "50%",
                        display: 'flex', 
                        flexDirection: 'column',
                        justifyContent: 'space-around', 
                        alignItems: 'center'
                    }} >
                <section>
                    <h1>Error 404</h1>
                    <h3>La página solicitada no existe</h3>
                </section>
                <Link to="/" className="" exact="true">
                    <Button variant="contained">Volver al inicio</Button>
                </Link>
            </Paper>
        </section>
    </Fragment>
  )
}
export default Error;