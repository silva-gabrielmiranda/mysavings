import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { CssBaseline } from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { SnackbarProvider } from 'notistack';

let themePreference = true;

const darkTheme = createMuiTheme({
	palette: {
		type: themePreference ? "dark" : "light",
		primary: blue,
	},
});

ReactDOM.render(
	<ThemeProvider theme={darkTheme}>
		<CssBaseline />
		<MuiPickersUtilsProvider utils={MomentUtils}>
			<SnackbarProvider maxSnack={2}>
				<App />
			</SnackbarProvider>
		</MuiPickersUtilsProvider>
	</ThemeProvider>,
	document.getElementById('root')
);