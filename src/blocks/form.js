import React from "react"
import { Button } from "../components/style"
import styled, { css } from "styled-components"
import { mix } from "polished"
import slugify from "react-slugify"
import firebase from "gatsby-plugin-firebase"
import { useFormik } from "formik"
import LoadingOverlay from 'react-loading-overlay'

export function Form({ form }) {
  const fields = Object.fromEntries(Object.entries(form.fields).map(([k, v]) => [v.key, '']));
  const [hasSubmitCompleted, setHasSubmitCompleted] = React.useState(false);

  const formik = useFormik({
    initialValues: fields,
    onSubmit: async (values, {setSubmitting, setErrors, resetForm}) => {
      setSubmitting(true);

      try {
        await firebase.functions().httpsCallable('submitForm')({
          form: form.formId,
          data: values
        });
        setHasSubmitCompleted(true);
        resetForm();
      }
      catch (err) {
        setErrors(err.message.replace("data.", ""));
      } 

      setSubmitting(false);
    },
  });

  if (hasSubmitCompleted) {
    return (
      <p>{form.successText}</p>
    );
  }

  return (
    <LoadingOverlay
      active={formik.isSubmitting}
      spinner
      text={form.loadingText}
    >
      {(formik.errors !== "" && Object.keys(formik.errors).length !== 0) &&
      <StyledError>{formik.errors}</StyledError>}
    <StyledForm
      onSubmit={formik.handleSubmit}
    >
{
  form.fields.map(field => {
    if (field.inputType === "textarea") {
      return (
        <FormField wide>
          <label for={slugify(field.label)}>{field.label}</label>
          <textarea
            cols="40"
            rows="5"
            name={slugify(field.label)}
            id={slugify(field.label)}
            {...formik.getFieldProps(field.key)}
          ></textarea>
        </FormField>
      )
    } else {
      return (
        <FormField>
          <label for={slugify(field.label)}>{field.label}</label>
          <input
            id={slugify(field.label)}
            name={slugify(field.label)}
            type={field.inputType}
            autocorrect="off"
            autocomplete={field.autocomplete | ``}
            {...formik.getFieldProps(field.key)}
          />
        </FormField>
      )
    }
  })
}
{
  form.fields.length > 0 && (
    <FormField wide>
      <Button primary type="submit" value="Submit">
        Submit
      </Button>
    </FormField>
  )
}
    </StyledForm >
    </LoadingOverlay>
  )
}

const base = {
  name: "customInput",
  key: "label",
  component: "group",
  fields: [
    { name: "label", label: "Label", component: "text" },
    { name: "key", label: "key", component: "text" },
    { name: "inputType", label: "Input Type", component: "text" },
    { name: "autocomplete", label: "Autocomplete", component: "text" },
  ],
}

export const customInputBlock = {
  label: "Custom Input",
  ...base,
}

export const nameInputBlock = {
  label: "Name Input",
  defaultItem: {
    label: "Name",
    inputType: "text",
    autocomplete: "name",
  },
  ...base,
}

export const emailInputBlock = {
  label: "Email Input",
  defaultItem: {
    label: "Email",
    inputType: "text",
    autocomplete: "email",
  },
  ...base,
}

export const phoneInputBlock = {
  label: "Phone Input",
  defaultItem: {
    label: "Phone",
    inputType: "text",
    autocomplete: "tel",
  },
  ...base,
}

export const companyInputBlock = {
  label: "Company Input",
  defaultItem: {
    label: "Company",
    inputType: "text",
    autocomplete: "organization",
  },
  ...base,
}

export const messageInputBlock = {
  label: "Message Input",
  defaultItem: {
    label: "Message",
    inputType: "textarea",
    autocomplete: "",
  },
  ...base,
}

export const FormBlock = {
  label: "Form",
  key: "name",
  name: "form",
  component: "group",
  defaultItem: {
    name: "Form",
    formId: "",
    fields: [],
  },
  fields: [
    { name: "name", label: "Name", component: "text" },
    {
      name: "formId",
      label: "Form ID",
      description: "The Devs Do Good Form ID for this form",
      component: "text",
    },
    {
      name: "loadingText",
      label: "Loading Text",
      description: "This text will display while form submissions are being processed.",
      component: "text",
    },
    {
      name: "successText",
      label: "Success Text",
      description: "This text will be displayed after users submit the form.",
      component: "text",
    },
    {
      label: "Fields",
      name: "fields",
      component: "blocks",
      templates: {
        customInputBlock,
        nameInputBlock,
        emailInputBlock,
        phoneInputBlock,
        companyInputBlock,
        messageInputBlock,
      },
    },
  ],
}

export const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 1.5rem;
  justify-items: stretch;

  @media (min-width: ${props => props.theme.breakpoints.medium}) {
    grid-template-columns: 1fr 1fr;
  }
`

export const StyledError = styled.div`
  color: #D8000C;
  background-color: #FFD2D2;
  margin-bottom: 5%;
  padding: 2.5%;
`;

export const FormField = styled.div`
  input,
  textarea {
    position: relative;
    line-height: 2.25rem;
    font-size: 1rem;
    padding: 0 0.625rem;
    border-radius: ${props => props.theme.radius.small};
    border: none;
    width: 100%;
    transition: box-shadow 150ms ${props => props.theme.easing};
    color: ${props => props.theme.color.foreground};
    background-color: ${props =>
    mix(0.95, props.theme.color.background, props.theme.color.foreground)};

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px ${props => props.theme.color.secondary};
    }

    ${props =>
    props.theme.isDarkMode &&
    css`
        background-color: ${props => props.theme.color.background};
      `};
  }

  textarea {
    line-height: 1.5;
    padding: 0.5rem 0.625rem;
    resize: vertical;
  }

  label {
    display: block;
    margin-bottom: 0.25rem;
  }

  ${p =>
    p.wide &&
    css`
      @media (min-width: ${props => props.theme.breakpoints.medium}) {
        grid-column-start: 1;
        grid-column-end: 3;
      }
    `};
`
