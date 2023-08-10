import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
  Fab,
  Collapse,
} from "@mui/material";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import dayjs from "dayjs";
import { addTodoInterface } from "../api/endpoints/todo/addTodo";

interface PropsAddTodoForm {
  open: boolean;
  onClose: () => void;
}

interface IFormInput {
  name: string;
  description: string | null;
  to_date: Date | null;
}

function AddTodoForm({ open, onClose }: PropsAddTodoForm) {
  const [descCollapseOpen, setDescCollapseOpen] = useState(false);
  const [dateTimeCollapseOpen, setDateTimeCollapseOpen] = useState(false);

  const {
    handleSubmit,
    watch,
    resetField,
    reset,
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      name: "",
      description: null,
      to_date: null,
    },
  });

  const sendForm: SubmitHandler<IFormInput> = (data) => {
    const dataToSend: addTodoInterface = {
      name: data.name,
      description: data.description ?? undefined,
      to_date: data.to_date ?? undefined,
    };
    console.log({dataToSend});
    reset();
    onClose();
  };

  const collapseButtonFunc = (
    field: "name" | "description" | "to_date",
    state: boolean,
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    resetField(field);
    setter(!state);
  };

  const nameValidationRules = {
    required: {
      value: true,
      message: "You need a name for this Todo!",
    },
    maxLength: {
      value: 255,
      message: "This input needs to be shorter than 255 characters",
    },
  };

  const descriptionValidationRules = {
    required: {
      value: descCollapseOpen,
      message: "You need to fill the description!",
    },
  };

  const dateValidationRules = {
    required: {
      value: dateTimeCollapseOpen,
      message: "You need to fill a due date!",
    },
    validate: {
      isValidDate: (value: Date | null | undefined) => {
        if (!dateTimeCollapseOpen) {
          return true;
        }
        if (value) {
          const date = new Date(value);
          if (dayjs(date).isValid()) {
            return true;
          }
        }
        return "Please fill a valid date";
      },
      isInFuture: (value: Date | null | undefined) => {
        if (!dateTimeCollapseOpen) {
          return true;
        }
        if (value) {
          const date = new Date(value);
          if (dayjs(date).isValid()) {
            return (
              dayjs(date).isAfter(dayjs()) ||
              "The date needs to be in the future"
            );
          }
        }
        return "Please fill a valid date";
      },
    },
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Stack spacing={3}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Todo
          </Typography>
          <Stack spacing={1}>
            {/* Each of these inputs are so big the probably need to be extracted into their own elements.
             /* However, this will prove to be a rather difficult task, given the amount of parameters*/}

            {/* Name input */}
            <>
              <Controller
                control={control}
                name="name"
                defaultValue={undefined}
                rules={nameValidationRules}
                render={({
                  field: { onChange, onBlur, value, ref,  },
                  fieldState: { invalid },
                }) => (
                  <TextField
                    label="Name"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={invalid}
                    fullWidth
                    required
                    helperText={<ErrorMessage errors={errors} name="name" />}
                    inputRef={ref}
                  />
                )}
              />
            </>

            {/* Description input */}
            <>
              <Button
                onClick={() =>
                  collapseButtonFunc(
                    "description",
                    descCollapseOpen,
                    setDescCollapseOpen
                  )
                }
              >
                {descCollapseOpen ? "Remove" : "Add"} Description
              </Button>
              <Collapse in={descCollapseOpen}>
                <Controller
                  name="description"
                  control={control}
                  rules={descriptionValidationRules}
                  render={({
                    field: { onChange, onBlur, value, ref },
                    fieldState: { invalid },
                  }) => (
                    <TextField
                      label="Description"
                      value={value ?? ""}
                      onChange={onChange}
                      onBlur={onBlur}
                      inputRef={ref}
                      fullWidth
                      error={invalid}
                      helperText={
                        <ErrorMessage errors={errors} name="description" />
                      }
                    />
                  )}
                />
              </Collapse>
            </>

            {/* DateTime input */}
            <>
              <Button
                onClick={() =>
                  collapseButtonFunc(
                    "to_date",
                    dateTimeCollapseOpen,
                    setDateTimeCollapseOpen
                  )
                }
              >
                {dateTimeCollapseOpen ? "Remove" : "Add"} due date
              </Button>
              <Collapse in={dateTimeCollapseOpen}>
                <Controller
                  control={control}
                  name="to_date"
                  rules={dateValidationRules}
                  render={({ field: { onChange, value, ref } }) => {
                    return (
                      <DesktopDateTimePicker
                        label="Date"
                        sx={inputStyle}
                        onChange={onChange}
                        value={value}
                        disablePast
                        slotProps={{
                          actionBar: { actions: ["clear", "today"] },
                          textField: {
                            helperText: (
                              <ErrorMessage errors={errors} name="to_date" />
                            ),
                          },
                        }}
                        inputRef={ref}
                      />
                    );
                  }}
                />
              </Collapse>
            </>
          </Stack>

          {import.meta.env.MODE === "production" ? (
            <div>
              <Typography>{JSON.stringify(watch())}</Typography>
              <Typography>{JSON.stringify({ errors })}</Typography>
              <Typography>
                {JSON.stringify({ descCollapseOpen, dateTimeCollapseOpen })}
              </Typography>
            </div>
          ) : null}
          <Fab color="primary" onClick={handleSubmit(sendForm)}>
            <AddIcon />
          </Fab>
        </Stack>
      </Box>
    </Modal>
  );
}

export default AddTodoForm;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  outterHeight: "100%",
};

const inputStyle = {
  width: "100%",
};
