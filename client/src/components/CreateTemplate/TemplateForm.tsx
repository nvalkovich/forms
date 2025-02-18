"use client";

import React from "react";
import { TextField, Typography } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { TemplateFormData } from "@/types";
import { QuestionField } from "./QuestionField";
import TopicSelector from "./TopicSelector";
import TagSelector from "./TagSelector";
import { useTranslations } from "next-intl";
import { Button } from "../Button/Button";
import { useFormContext } from "react-hook-form";

interface TemplateFormProps {
  handleSubmit: () => void;
  addQuestion: () => void;
  fields: any[];
  remove: (index: number) => void;
}

const TemplateForm: React.FC<TemplateFormProps> = ({
  handleSubmit,
  addQuestion,
  fields,
  remove,
}) => {
  const { register, control, watch, setValue } = useFormContext<TemplateFormData>();
  const t = useTranslations("TemplateBuilder");

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow w-50%">
      <Typography variant="h5" className="mb-6">
        {t("createTemplateTitle")}
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-6">
        <TextField {...register("title")} label="Title" fullWidth />
        <TextField
          {...register("description")}
          label="Description"
          fullWidth
          multiline
          rows={3}
        />

        <TopicSelector />
        <TagSelector />

        {fields.map((field, index) => (
          <QuestionField key={field.id} index={index} remove={remove} />
        ))}

        <Button
          label={"Add Question"}
          onClick={addQuestion}
          startIcon={<FaPlus />}
        />

        <Button type="submit" label={"Save Template"} />
      </form>
    </div>
  );
};

export default TemplateForm;