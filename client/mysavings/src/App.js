import React, { useState } from 'react';
import { Grid, TextField, Typography, Paper, FormControl, InputAdornment, Input, MenuItem, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	margins: {
		margin: 10
	}
}));

const valueType = [
	{ value: 1, description: "Receita" },
	{ value: 2, description: "Despesa" }
]

function App() {

	const classes = useStyles();
	const [values, setValues] = useState({
		type: "",
		amount: ""
	})

	const handleChange = field => event => setValues({ ...values, [field]: event.target.value })

	const handleSubmit = () => axios.post("http://localhost:3001/newData", values).then(response => console.log(response.data)).catch(err => console.error(err));

	return (
		<Grid container justify="center" className={classes.root} alignItems="center">
			<Grid item xs={5}>
				<Paper elevation={2}>
					<Typography align="center" gutterBottom variant="h6">Adicione uma nova despesa ou receita</Typography>
					<Grid container justify="center" alignItems="center">
						<Grid item xs={8}>
							<FormControl fullWidth>
								<TextField label="Tipo" select onChange={handleChange("type")} value={values.type} className={classes.margins}>
									{valueType.map(item => <MenuItem key={item.value} value={item.value}>{item.description}</MenuItem>)}
								</TextField>
							</FormControl>
						</Grid>
						<Grid item xs={8}>
							<FormControl fullWidth>
								<Input
									id="standard-adornment-amount"
									startAdornment={<InputAdornment position="start">R$</InputAdornment>}
									value={values.amount}
									onChange={handleChange("amount")}
									placeholder="150,00"
									className={classes.margins}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={8}>
							<Button fullWidth className={classes.margins} onClick={handleSubmit}>Adicionar</Button>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
			<Grid item xs={12}></Grid>
		</Grid>
	);
}

export default App;
