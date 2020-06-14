import React from "react";
import { TextField, Button, makeStyles } from "@material-ui/core";
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
  button: {},
}));

export default function OrderForm(props) {
  const { items } = props;
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
      alert(JSON.stringify(values, null, 2));
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
      <Button
        variant="contained"
        color="primary"
        disabled={!items.size || !formik.isValid}
        align="center"
        className={classes.field}
        type="submit"
      >
        Get pizza
      </Button>
    </form>
  );
}
