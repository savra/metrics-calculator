import './App.css';
import fetch from 'cross-fetch';
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import 'fontsource-roboto';
import {ru} from "date-fns/locale";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import {Alert} from '@material-ui/lab';
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";
import {
    orange,
    blue,
    deepPurple,
    deepOrange
} from "@material-ui/core/colors";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import Switch from "@material-ui/core/Switch";
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    },
    menuButton: {
        marginRight: 36
    },
    menuButtonHidden: {
        display: "none"
    },
    margin: {
        margin: theme.spacing(1),
    },
    marginLeft: {
        marginLeft: theme.spacing(2),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
    formControl: {
        minWidth: 120,
        margin: theme.spacing(1),
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    asIsGroup: {
        border: '1px solid rgba(0, 0, 0, 0.2)',
        borderRadius: '4px'
    },
    padding: {
        padding: theme.spacing(1)
    },
    control: {
        padding: theme.spacing(2),
    },
    collapse: {
        position: theme.fixed,
        bottom: 800
    },
    title: {
        flexGrow: 1
    },
}));

function NumberFormatCustom(props) {
    const {inputRef, onChange, ...other} = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        /*name: props.name,*/
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    /*name: PropTypes.string.isRequired,*/
    onChange: PropTypes.func.isRequired,
};

function PlannedReleaseMonth({params}) {
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    React.useEffect(() => {
        params(selectedDate);
    }, [selectedDate]);

    return (
        <MuiPickersUtilsProvider locale={ru} utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    views={["month"]}
                    disableToolbar
                    variant="inline"
                    format="MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Планируемый месяц релиза"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}

function Metrics({params, setValueSign, setIsHiddenDrivers}) {
    const classes = useStyles();
    const [metric, setMetric] = React.useState('');

    const handleChange = (event) => {
        setMetric(event.target.value);

        switch (event.target.value) {
            case 'DURATION_OF_MANUAL_OPERATIONS':
                setIsHiddenDrivers(false);
                setValueSign('%');
                break;
            case 'RR':
                setIsHiddenDrivers(true);
                setValueSign('%');
                break;
            default:
                setIsHiddenDrivers(true);
                setValueSign('₽');
                break;
        }
    };

    React.useEffect(() => {
        params(metric);
    }, [metric]);

    return (
        <FormControl variant="outlined" style={{width: "25ch", marginLeft: "15px"}} className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Метрика</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={metric}
                onChange={handleChange}
                label="Метрика"
            >
                <MenuItem value={"DURATION_OF_MANUAL_OPERATIONS"}>Длительность ручных операций</MenuItem>
                <MenuItem value={"RR"}>RR</MenuItem>
                <MenuItem value={"WRITE_OFF"}>Списания</MenuItem>
                <MenuItem value={"CESSIONS"}>Цессии</MenuItem>
                <MenuItem value={"NPL"}>NPL</MenuItem>
            </Select>
        </FormControl>
    );
}

function InputMetricValues({props, valueSign}) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        userAsIsValue: 0,
        bpAsIsValue: 0,
        userToBeValue: 0,
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    React.useEffect(() => {
        props(values);
    }, [values]);

    return (
        <div className={classes.root}>
            <div /*className={classes.asIsGroup}*/>
                <Grid>
                    <Grid container>
                        <Grid item sm={8}>
                            <Typography style={{paddingTop: 8}} align={"center"}>AS-IS</Typography>
                        </Grid>
                        <Grid item sm={4}>
                            <Typography style={{paddingTop: 8}} align={"center"}>TO-BE</Typography>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.root}>
                        <Grid item sm={4}>
                            <div>
                                <FormControl className={classes.margin} style={{width: "25ch"}} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-amount">Введите свое значение</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        value={values.userAsIsValue}
                                        onChange={handleChange('userAsIsValue')}
                                        endAdornment={<InputAdornment position="end">{valueSign}</InputAdornment>}
                                        labelWidth={180}
                                        inputComponent={NumberFormatCustom}
                                    />
                                </FormControl>
                            </div>
                        </Grid>
                        <Grid item sm={4}>
                            <div>
                                <FormControl className={classes.margin} style={{width: "25ch"}} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-amount">Значение из БП</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        value={values.bpAsIsValue}
                                        onChange={handleChange('bpAsIsValue')}
                                        endAdornment={<InputAdornment position="end">{valueSign}</InputAdornment>}
                                        labelWidth={120}
                                        inputComponent={NumberFormatCustom}
                                    />
                                </FormControl>
                            </div>
                        </Grid>
                        <Grid item sm={4}>
                            <div>
                                <FormControl className={classes.margin} style={{width: "25ch"}} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-amount">Введите свое значение</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        value={values.userToBeValue}
                                        onChange={handleChange('userToBeValue')}
                                        endAdornment={<InputAdornment position="end">{valueSign}</InputAdornment>}
                                        labelWidth={180}
                                        inputComponent={NumberFormatCustom}
                                    />
                                </FormControl>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

function Stages(props) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [stage, setStage] = React.useState('');
    const loading = open && options.length === 0;

    const handleChange = (event, value) => {
        setStage(value);
    };

    React.useEffect(() => {
        props.params(stage);
    }, [stage]);

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const response = await fetch('http://localhost:8080/metrics-calculator/getAllStages');

            if (!response.ok) {
                const message = `Ошибка при получении стадий: статус ${response.status}`;
                throw new Error(message);
            }

            const stages = await response.json();

            if (active) {
                setOptions(Object.keys(stages).map(key => stages[key]));
            }
        })().catch((error) => {
            props.errorMessage(error.message);
            props.a(true);
        });

        return () => {
            active = false;
        };
    }, [loading]);

    return (
        <Autocomplete
            id="asynchronous-demo"
            style={{width: "25ch", display: "inline-flex"}}

            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionLabel={(option) => option.description}
            options={options}
            loading={loading}
            onChange={handleChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Стадия"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}

function Products(props) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [product, setProduct] = React.useState('');
    const loading = open && options.length === 0;

    const handleChange = (event, value) => {
        setProduct(value);
    };

    React.useEffect(() => {
        props.params(product);
    }, [product]);

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const response = await fetch('http://localhost:8080/metrics-calculator/getAllProducts');

            if (!response.ok) {
                const message = `Ошибка при получении продуктов: статус ${response.status}`;
                throw new Error(message);
            }

            const products = await response.json();

            if (active) {
                setOptions(Object.keys(products).map(key => products[key]));
            }
        })().catch((error) => {
            props.errorMessage(error.message);
            props.a(true);
        });

        return () => {
            active = false;
        };
    }, [loading]);

    return (
        <Autocomplete
            id="asynchronous-demo"
            style={{width: "25ch", display: "inline-flex"}}

            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionLabel={(option) => option.description}
            options={options}
            loading={loading}
            onChange={handleChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Продукт"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}

function ResultTextFields({props}) -{
    const classes = useStyles();

    let ddd = 0;

    if (props !== undefined) {
        ddd = props;
    }

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <Typography align={"center"} style={{paddingTop: 8}}>Результат</Typography>

                <div>
                    <TextField
                        id="average-monthly-input-result"
                        label="Среднемес."
                        defaultValue="0"
                        value={ddd}
                        InputProps={{
                            readOnly: true,
                            endAdornment: <InputAdornment position="end">₽</InputAdornment>,
                            inputComponent: NumberFormatCustom,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        id="expenses-input-result"
                        label="Расходы"
                        defaultValue="0"
                        InputProps={{
                            readOnly: true,
                            endAdornment: <InputAdornment position="end">₽</InputAdornment>,
                        }}
                        variant="outlined"
                    />
                </div>
            </div>
        </form>
    );
}

function App() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [darkState, setDarkState] = React.useState(false);
    const palletType = darkState ? "dark" : "light";
    const mainPrimaryColor = darkState ? orange[600] : blue[700];
    const [valueSign, setValueSign] = React.useState('');
    const [isHiddenDrivers, setIsHiddenDrivers] = React.useState(false);
    const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];
    const darkTheme = createMuiTheme({
        palette: {
            type: palletType,
            primary: {
                main: mainPrimaryColor
            },
            secondary: {
                main: mainSecondaryColor
            }
        }
    });
    const handleThemeChange = () => {
        setDarkState(!darkState);
    };

    const [responseValue, setResponseValue] = React.useState("");
    const [stage, setStage] = React.useState("");
    const [plannedReleaseMonth, setPlannedReleaseMonth] = React.useState("");
    const [metric, setMetric] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const [inputMetricsValues, setInputMetricsValues] = React.useState({
        userAsIsValue: 0,
        bpAsIsValue: 0,
        userToBeValue: 0,
    });
    const [inputDriversValues, setInputDriversValues] = React.useState({
        driverAsIsValue: 0,
        driverToBeValue: 0,
    });

    const handleInputMetricsValuesChange = (prop) => (event) => {
        setInputMetricsValues({...inputMetricsValues, [prop]: event.target.value});
    };
    const handleInputDriversValuesChange = (prop) => (event) => {
        setInputDriversValues({...inputDriversValues, [prop]: event.target.value});
    };
    /*
        React.useEffect(() => {
            props(values);
        }, [values]);*/

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleButtonClick = () => {
        alert(`${stage.code} ${metric} ${plannedReleaseMonth} ${inputMetricsValues.userToBeValue} ${inputMetricsValues.bpAsIsValue} ${inputMetricsValues.userAsIsValue}`);

        const requestParams = {
            "stageCode": "VV",
            "metricCode": metric,
            "userAsIsValue": inputMetricsValues.userAsIsValue,
            "bpAsIsValue": inputMetricsValues.bpAsIsValue,
            "userToBeValue": inputMetricsValues.userToBeValue,
            "releaseMonth": plannedReleaseMonth
        }

        axios.post("http://localhost:8080/metrics-calculator/calculate",
            requestParams,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
            setResponseValue(response.data);
        }).catch(() => {
            console.log("error!!!!!");
        });

        console.log(responseValue);
        Object.keys(inputMetricsValues).map(key => inputMetricsValues[key]);
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <AppBar
                position="relative"
                className={clsx(classes.appBar, open && classes.appBarShift)}
            >
                <Toolbar className={classes.toolbar}>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}
                    >
                        Dashboard
                    </Typography>
                    <Switch checked={darkState} onChange={handleThemeChange}/>
                </Toolbar>
            </AppBar>
            <div className="App">
                <Grid style={{margin: "10px"}} className={classes.root}>
                    <Grid item>
                        <Grid container>
                        </Grid>
                        <Grid container>
                            <Grid item sm={3}/>
                            <Grid item sm={9}>
                                <Grid container>
                                    <Grid item sm={12}>
                                        <Typography style={{paddingTop: 8}}
                                                    align={"center"}>Значение метрики (среднемес.)</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item sm={8}>
                                        <Typography style={{paddingTop: 8}}
                                                    align={"center"}>AS-IS</Typography>
                                    </Grid>
                                    <Grid item sm={4}>
                                        <Typography style={{paddingTop: 8}}
                                                    align={"center"}>TO-BE</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item sm={3}>
                                <Metrics params={setMetric} setValueSign={setValueSign} setIsHiddenDrivers={setIsHiddenDrivers}/>
                            </Grid>
                            <Grid item sm={3}>
                                <FormControl className={classes.margin}
                                             style={{width: "25ch"}} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-amount">Введите
                                        свое значение</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        value={inputMetricsValues.userAsIsValue}
                                        onChange={handleInputMetricsValuesChange('userAsIsValue')}
                                        endAdornment={<InputAdornment
                                            position="end">{valueSign}</InputAdornment>}
                                        labelWidth={180}
                                        inputComponent={NumberFormatCustom}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={3}>
                                <FormControl className={classes.margin}
                                             style={{width: "25ch"}} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-amount">Значение
                                        из БП</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        value={inputMetricsValues.bpAsIsValue}
                                        onChange={handleInputMetricsValuesChange('bpAsIsValue')}
                                        endAdornment={<InputAdornment
                                            position="end">{valueSign}</InputAdornment>}
                                        labelWidth={120}
                                        inputComponent={NumberFormatCustom}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={3}>
                                <FormControl className={classes.margin}
                                             style={{width: "25ch"}} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-amount">Введите
                                        свое значение</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        value={inputMetricsValues.userToBeValue}
                                        onChange={handleInputMetricsValuesChange('userToBeValue')}
                                        endAdornment={<InputAdornment
                                            position="end">{valueSign}</InputAdornment>}
                                        labelWidth={180}
                                        inputComponent={NumberFormatCustom}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Hidden smUp={isHiddenDrivers}>
                                <Grid item sm={3}/>
                                <Grid item sm={9}>
                                    <Grid container>
                                        <Grid item sm={12}>
                                            <Typography style={{paddingTop: 8}}
                                                        align={"center"}>Значение драйвера (среднемес.)</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item sm={8}>
                                            <Typography style={{paddingTop: 8}}
                                                        align={"center"}>AS-IS</Typography>
                                        </Grid>
                                        <Grid item sm={4}>
                                            <Typography style={{paddingTop: 8}}
                                                        align={"center"}>TO-BE</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Hidden>
                        </Grid>
                        <Grid container>
                            <Hidden smUp={isHiddenDrivers}>
                                <Grid item sm={3}/>
                                <Grid item sm={3}>
                                    <FormControl className={classes.margin}
                                                 style={{width: "25ch"}} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-amount">Введите свое
                                            значение</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            value={inputDriversValues.driverAsIsValue}
                                            onChange={handleInputDriversValuesChange('driverAsIsValue')}
                                            endAdornment={<InputAdornment
                                                position="end">шт.</InputAdornment>}
                                            labelWidth={180}
                                            inputComponent={NumberFormatCustom}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item sm={3}/>
                                <Grid item sm={3}>
                                    <FormControl className={classes.margin}
                                                 style={{width: "25ch"}} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-amount">Введите
                                            свое значение</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            value={inputDriversValues.driverToBeValue}
                                            onChange={handleInputDriversValuesChange('driverToBeValue')}
                                            endAdornment={<InputAdornment
                                                position="end">шт.</InputAdornment>}
                                            labelWidth={180}
                                            inputComponent={NumberFormatCustom}
                                        />
                                    </FormControl>
                                </Grid>
                            </Hidden>
                        </Grid>
                        <Grid container>
                            <Grid item>
                                <ResultTextFields props={responseValue}/>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item>
                                <Button variant="contained" color="primary" className={classes.margin}
                                        onClick={handleButtonClick}>
                                    Рассчитать
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid item style={{marginLeft: "15ch"}}>
                            <div>
                                <Stages a={setOpen} errorMessage={setErrorMessage} params={setStage}/>
                            </div>
                        </Grid>
                        <Grid item style={{marginLeft: "15ch"}}>
                            <Products a={setOpen} errorMessage={setErrorMessage} params={setStage}/>
                        </Grid>
                        <Grid item style={{marginLeft: "15ch"}}>
                            <PlannedReleaseMonth params={setPlannedReleaseMonth}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >
                    <Alert onClose={handleClose} severity="error">
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </div>
        </ThemeProvider>
    );
}

export default App;
