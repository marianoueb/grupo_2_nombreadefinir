import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import Box from '@mui/material/Box';
import ProductsMainBought from './ProductsMainBought';
import ProductsMainTotal from './ProductsMainTotal';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function ConfirmationDialogRaw(props) {
    const { onClose, value: valueProp, open, ...other } = props;
    const [value, setValue] = useState(valueProp);
    const radioGroupRef = React.useRef(null);
    const [product, setProduct] = useState({})

    console.log(value);
    
    useEffect(() => {
        const url = "http://localhost:3001/api/product/" + value
        fetch(url)
            .then(respuesta => { 
                return respuesta.json() 
            })
            .then(products => {
                setProduct(products.data)
            }) 
            .catch(error => console.log(error))
      }, [])

    useEffect(() => {
      if (!open) {
        setValue(valueProp);
      }
    }, [valueProp, open]);
  
    const handleEntering = () => {
      if (radioGroupRef.current != null) {
        radioGroupRef.current.focus();
      }
    };
    
    return (
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        TransitionProps={{ onEntering: handleEntering }}
        open={open}
        {...other}
      >
        <DialogTitle>Detalles del producto</DialogTitle>
        <DialogContent>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <CardMedia
                    component="img"
                    height="194"
                    image={product.image}
                    alt="image"
                  />
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {product.category}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {product.brand} - ID: {product.id} - Precio: ${product.price}
                  </Typography>
                  <Typography variant="body2">
                    {product.description}
                  </Typography>
                </CardContent>
            </Card>
        </DialogContent>
        
        <DialogActions>
            <Link to="/products/">
                <Button>Ok</Button>
            </Link>
        </DialogActions>
      </Dialog>
    );
  }
  
  ConfirmationDialogRaw.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
  };

const initialDataState = {
  sort: [
    {
      field: "code",
      dir: "asc",
    },
  ],
  take: 6,
  skip: 0,
};

var gridWidth = 1400

const setPercentage = (percentage) => {
  return Math.round(gridWidth / 100) * percentage;
};

function ProductsMain (props) {
  const [dataState, setDataState] = useState(initialDataState);
  const [productos, setProductos] = useState([])
  const [value, setValue] = React.useState('Dione');
  const [open, setOpen] = React.useState(false);
  
  const id = props.match.params.id
  console.log(id);

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
        .then(respuesta => { 
            return respuesta.json() 
        })
        .then(productos => {
            setProductos(productos.data)
        }) 
        .catch(error => console.log(error))
  }, [])

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

  const CustomLinkCell = (props) => {
    return (
      <td>
        <Link to={`../products/${props.dataItem.id}`}>
          {
          props.dataItem[props.field]
          } 
        </Link>
      </td>
    )
  }

  return(
    <Fragment>
      <Box className="main-top" sx={{ width: '100%', height:'26%', textAlign:'center'}}>
        <ProductsMainBought/>
        <h1>Listado de productos</h1>
        <ProductsMainTotal/>
      </Box>
        <Grid
          data={process(productos, dataState)}
          {...dataState}
          onDataStateChange={(e) => {
            setDataState(e.dataState);
          }}
          sortable={true}
          reorderable={true}
          pageable={{
          }}
          style={{
            height: "65%",
            width: "90%"
          }}
        >
          <GridColumn title="ID" cell={CustomLinkCell} field="id" locked={true} width={setPercentage(5)} />
          <GridColumn title="Producto" cell={CustomLinkCell} field="name" width={setPercentage(25)} />
          <GridColumn title="Precio" cell={CustomLinkCell} field="price" width={setPercentage(10)} />
          <GridColumn title="Marca" cell={CustomLinkCell} field="brand" width={setPercentage(15)} />
          <GridColumn title="Categoría" cell={CustomLinkCell} field="category" width={setPercentage(10)} />
        </Grid>
        <ConfirmationDialogRaw
            id="product-info"
            keepMounted
            open={open}
            value={id}
        />
    </Fragment>
  )
}
export default ProductsMain;