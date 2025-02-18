"use client";

import React from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import TemplateForm from "./TemplateForm";
import { LivePreview } from "./LivePreview";
import { TemplateFormData } from "@/types";
import { QuestionTypes } from "./QuestionField";

const FormTemplateBuilder = () => {
  const methods = useForm<TemplateFormData>({
    defaultValues: {
      title: "",
      description: "",
      topic: "",
      questions: [],
    },
  });

  const { control, handleSubmit, watch, setValue } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const addQuestion = () => {
    if (fields.length < 10) {
      append({
        title: "",
        type: QuestionTypes.singleLineString,
        description: "",
        required: false,
        showInResults: true,
      });
    }
  };

  const onSubmit = (data: TemplateFormData) => {
    console.log("data", JSON.stringify(data));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        {/* Используем grid для адаптивного размещения */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormProvider {...methods}>
            <TemplateForm
              addQuestion={addQuestion}
              handleSubmit={handleSubmit(onSubmit)}
              fields={fields}
              remove={remove}
            />
          </FormProvider>
          <LivePreview watch={watch} fields={fields} />
        </div>
      </div>
    </div>
  );
};

export default FormTemplateBuilder;
