import React from "react";
import {
  TextField,
  Button,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";

const useStyles = makeStyles(theme => ({
  form: {
    padding: theme.spacing(2),
  },
  field: {
    width: "100%",
    marginBottom: theme.spacing(2),
    "&:last-child": {
      marginBottom: 0,
    },
  },
  button: {
    width: "100%",
  },
  wrapper: {
    position: "relative",
  },
  buttonProgress: {
    color: theme.palette.secondary,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function OrderForm(props) {
  const { items, setOrderId, setCartItems } = props;
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      email: "",
    },
    isInitialValid: false,
    validationSchema: yup.object({
      firstName: yup
        .string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: yup
        .string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      address: yup
        .string()
        .max(120, "Must be 120 characters or less")
        .required("Required"),
      email: yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: values => {
      values.items = Array.from(items);
      fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then(response => response.json())
        .then(data => {
          setOrderId(data.id);
          setCartItems(new Map());
        })
        .catch(error => console.error(error));
    },
  });

  return (
    <form
      noValidate
      autoComplete="on"
      className={classes.form}
      onSubmit={formik.handleSubmit}
    >
      <TextField
        error={formik.touched.firstName && !!formik.errors.firstName}
        helperText={formik.touched.firstName && formik.errors.firstName}
        label="Your first name"
        variant="outlined"
        className={classes.field}
        name="firstName"
        required
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
      />
      <TextField
        error={formik.touched.lastName && !!formik.errors.lastName}
        helperText={formik.touched.lastName && formik.errors.lastName}
        label="Your second name"
        variant="outlined"
        className={classes.field}
        name="lastName"
        required
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}
      />
      <TextField
        error={formik.touched.address && !!formik.errors.address}
        helperText={formik.touched.address && formik.errors.address}
        label="Delivery address"
        variant="outlined"
        className={classes.field}
        name="address"
        required
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.address}
      />
      <TextField
        error={formik.touched.email && !!formik.errors.email}
        helperText={formik.touched.email && formik.errors.email}
        label="Email"
        variant="outlined"
        className={classes.field}
        type="email"
        name="email"
        required
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      <div className={[classes.wrapper, classes.field].join(" ")}>
        <Button
          variant="contained"
          color="primary"
          disabled={!items.size || !formik.isValid || formik.isSubmitting}
          align="center"
          type="submit"
          className={classes.button}
        >
          Get pizza
        </Button>
        {formik.isSubmitting && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </form>
  );
}
