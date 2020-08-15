import React, { useState, useEffect } from 'react';
import { Grid, TextField, Typography, Paper, FormControl, InputAdornment, Input, MenuItem, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import axios from 'axios';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: 20
	},
	margins: {
		marginBottom: 10
	}
}));

const valueType = [
	{ value: 1, description: "Compra" },
	{ value: 2, description: "Venda" }
]

function App() {

	const classes = useStyles();
	const [values, setValues] = useState({
		type: "",
		amount: "",
		price: "",
		description: ""
	})
	const [data, setData] = useState([{ description: "teste" }])

	useEffect(() => {
		getAllData();
		return () => console.log("Clear Function")
	}, []);

	const getAllData = async () => {
		await axios.post("http://localhost:3001/getAllData").then(resp => setData(resp.data.allSavingsLog)).catch(err => console.error(err))
	}

	const handleChange = field => event => setValues({ ...values, [field]: event.target.value })


	const handleSubmit = () => axios.post("http://localhost:3001/newData", values).then(response => console.log(response.data)).catch(err => console.error(err));

	return (
		<Grid container justify="center" className={classes.root} alignItems="center">
			<Grid item xs={5}>
				<Paper elevation={2}>
					<Typography align="center" gutterBottom variant="h6" className={classes.margins}>Adicione uma ação</Typography>
					<Grid container justify="center" alignItems="center">
						<Grid item xs={8}>
							<FormControl fullWidth>
								<Input
									startAdornment={<InputAdornment position="start">R$</InputAdornment>}
									value={values.price}
									onChange={handleChange("price")}
									placeholder="Valor"
									className={classes.margins}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={8}>
							<FormControl fullWidth>
								<Input
									value={values.amount}
									onChange={handleChange("amount")}
									placeholder="Quantidade"
									className={classes.margins}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={8}>
							<FormControl fullWidth>
								<Input
									value={values.description}
									onChange={handleChange("description")}
									placeholder="Ação"
									className={classes.margins}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={8}>
							<FormControl fullWidth>
								<TextField label="Tipo" select onChange={handleChange("type")} value={values.type} className={classes.margins}>
									{valueType.map(item => <MenuItem key={item.value} value={item.value}>{item.description}</MenuItem>)}
								</TextField>
							</FormControl>
						</Grid>
						<Grid item xs={8}>
							<Button fullWidth className={classes.margins} onClick={handleSubmit}>Adicionar</Button>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
			{data.map(items => {
				return (
					<Grid container justify="center" className={classes.root} alignItems="center">
						<Grid item xs={5}>
							<Paper elevation={2}>
								<Typography align="center" gutterBottom variant="h6" className={classes.margins}>{items.description}</Typography>
								<Grid container justify="center" alignItems="center">
									<Grid item xs={8}>
										<Typography>Tipo da Ordem: {items.type === 1 ? "Compra" : "Venda"}</Typography>
										<Typography>Quantidade: {items.amount}</Typography>
										<Typography>Valor: {items.price}</Typography>
										<Typography>Data: {moment(items.date).format("DD/MM/YYYY")}</Typography>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					</Grid>
				)
			})}
		</Grid>
	);
}

export default App;