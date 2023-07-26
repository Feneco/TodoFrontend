import { ErrorMessage } from "@hookform/error-message";
import { Add } from "@mui/icons-material";
import ErrorIcon from "@mui/icons-material/Error";
import { Alert, Fab, Stack, TextField, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { DateTimePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import addTodo, { addTodoInterface } from "../api/endpoints/todo/addTodo";


interface PropsAddTodoForm {
  onAdd?: () => {};
}

function AddTodoForm({ onAdd } : PropsAddTodoForm) {
  const [name       , setName        ] = useState<string>("");
  const [description, setDescription ] = useState<string>("");
  const [dueDate    , setDate        ] = useState<Date | undefined>(undefined);
  const [renderFeedback, setRenderFeedback] = useState<boolean>(false);
  const [feedback   , setFeedback    ] = useState<React.ReactNode>();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<addTodoInterface>();

  const onSubmit: SubmitHandler<addTodoInterface> = (data) => {
    addTodo(data).then((response) => {
      if (response.ok) {
        reset({
          name: "",
          description:"",
          dueDate: undefined
        });
        setRenderFeedback(true);
        setFeedback(
          <Alert severity="success" onClose={() => {setRenderFeedback(false)}}>Todo added!</Alert>
        );
        if (onAdd != null) { onAdd(); }
      } else {
        setRenderFeedback(true);
        setFeedback(
          <Alert severity="error" onClose={() => {setRenderFeedback(false)}}>Error, can't add todo</Alert>
        );
      }
    });
  };

  const renderErrorMessage = (message: string) => {
    return (
      <Stack direction={"row"} color={red[500]}>
        <ErrorIcon />
        <Typography>{message}</Typography>
      </Stack>
    );
  };

  return (
    <Stack sx={{ width: "100%" }} gap={2}>
      <TextField
        label="Name"
        variant="outlined"
        {...register("name", {
          required: "You need a name for the Todo",
          minLength: {
            value: 5,
            message: "Needs to be at least 5 characters long",
          },
          maxLength: {
            value: 50,
            message: "Needs to be at most 50 characters",
          },
        })}
        error={errors.name ? true : false}
      />
      <ErrorMessage
        errors={errors}
        name="name"
        render={({ message }) => renderErrorMessage(message)}
      />
      <TextField
        label="Description"
        variant="outlined"
        {...register("description", {
          required: {
            value: true,
            message: "Required",
          },
          minLength: {
            value: 5,
            message: "Needs to be at least 5 characters long",
          },
          maxLength: {
            value: 256,
            message: "Needs to be at most 256 chars",
          },
        })}
        error={errors.description ? true : false}
      />
      <ErrorMessage
        errors={errors}
        name="description"
        render={({ message }) => renderErrorMessage(message)}
      />
      <Controller
        name="dueDate"
        control={control}
        render={({ field }) => (
          <DateTimePicker
            label="Due date"
            onChange={(value) => {
              field.onChange(value);
            }}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name="dueDate"
        render={({ message }) => renderErrorMessage(message)}
      />
      <Stack sx={{ width: "100%" }} direction="row" gap={2}>
        <Fab
          color="primary"
          aria-label="add"
          type="button"
          onClick={handleSubmit(onSubmit)}
        >
          <Add />
        </Fab>
        { renderFeedback && feedback }
      </Stack>
    </Stack>
  );
}

export default AddTodoForm;
