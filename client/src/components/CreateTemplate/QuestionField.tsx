"use client";

import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  IconButton,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Stack,
} from "@mui/material";
import { FaTrash, FaPlus } from "react-icons/fa";
import { useFormContext, useFieldArray } from "react-hook-form";
import { TemplateFormData } from "@/types";

export enum QuestionTypes {
  singleLineString = "singleLineString",
  multiLineString = "multiLineString",
  positiveInteger = "positiveInteger",
  checkbox = "checkbox",
}

interface QuestionFieldProps {
  index: number;
  remove: (index: number) => void;
}

export const QuestionField: React.FC<QuestionFieldProps> = ({ index, remove }) => {
  const { register, control, watch } = useFormContext<TemplateFormData>();
  const { fields, append, remove: removeOption } = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });

  const questionType = watch(`questions.${index}.type`);

  return (
    <div className="mb-4 p-4 border rounded-lg bg-white dark:bg-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <Typography variant="subtitle1">Question {index + 1}</Typography>
        <IconButton onClick={() => remove(index)} size="small" className="ml-auto">
          <FaTrash className="text-red-500" />
        </IconButton>
      </div>

      {/* Заголовок вопроса */}
      <TextField
        {...register(`questions.${index}.title`)}
        label="Question Title"
        fullWidth
        className="mb-4"
      />

      {/* Тип вопроса */}
      <Select
        {...register(`questions.${index}.type`)}
        defaultValue={QuestionTypes.singleLineString}
        fullWidth
        className="mb-4"
      >
        {Object.values(QuestionTypes).map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>

      {/* Опции для чекбокса */}
      {questionType === QuestionTypes.checkbox && (
        <div className="mb-4">
          <Typography variant="body2" className="mb-2">
            Options:
          </Typography>
          <Stack spacing={2}>
            {fields.map((option, optionIndex) => (
              <div key={option.id} className="flex items-center gap-2">
                <TextField
                  {...register(`questions.${index}.options.${optionIndex}.value`)}
                  label={`Option ${optionIndex + 1}`}
                  fullWidth
                />
                <IconButton
                  onClick={() => removeOption(optionIndex)}
                  size="small"
                >
                  <FaTrash className="text-red-500" />
                </IconButton>
              </div>
            ))}
          </Stack>
          <Button
            variant="outlined"
            startIcon={<FaPlus />}
            onClick={() => append({ value: "" })}
            className="mt-2"
          >
            Add Option
          </Button>
        </div>
      )}
    </div>
  );
};