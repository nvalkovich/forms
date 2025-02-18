"use client";

import { useEffect, useState } from "react";
import { getTopicNameById } from "@/services/api"; 
import React from "react";
import { TextField, Typography, Chip, Box, Stack, Divider, Checkbox, FormControlLabel, Grid} from "@mui/material";
import { FieldArrayWithId, UseFormWatch } from "react-hook-form";
import { TemplateFormData } from "@/types";
import { QuestionTypes } from "./QuestionField";
import { FaHashtag } from "react-icons/fa";
import { MdOutlineTopic } from "react-icons/md";

interface LivePreviewProps {
  watch: UseFormWatch<TemplateFormData>;
  fields: FieldArrayWithId<TemplateFormData, "questions", "id">[];
}

export const LivePreview: React.FC<LivePreviewProps> = ({ watch, fields }) => {
  const title = watch("title");
  const description = watch("description");
  const topicId = watch("topic");
  const tags = watch("tags") || [];
  const topicName = useTopicName(topicId); // Используем хук для получения названия темы

  const questions = fields.map((field, index) => ({
    title: watch(`questions.${index}.title`),
    description: watch(`questions.${index}.description`),
    type: watch(`questions.${index}.type`),
    options: watch(`questions.${index}.options`),
  }));

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {/* Заголовок и описание */}
      <Typography variant="h4" className="mb-4 font-bold">
        {title || "Untitled Template"}
      </Typography>
      <Typography variant="body1" className="mb-6 text-gray-600 dark:text-gray-300">
        {description || "No description provided"}
      </Typography>

     
      <Box className="mb-6">
        <Stack direction="row" spacing={1} alignItems="center" className="mb-2">
          <MdOutlineTopic />
          <Typography variant="body2" className="text-gray-600 dark:text-gray-300">
            {topicName}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <FaHashtag />
          {tags.length > 0 ? (
            tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                className="m-1"
              />
            ))
          ) : (
            <Typography variant="body2" className="text-gray-600 dark:text-gray-300">
              No tags selected
            </Typography>
          )}
        </Stack>
      </Box>

      <Divider className="my-6" />

      {/* Вопросы */}
      {questions.map((question, index) => (
        <Box key={index} className="p-4 mb-4 border rounded-lg shadow-sm">
          <Typography variant="h6" className="mb-2 font-semibold">
            {question.title || `Question ${index + 1}`}
          </Typography>
          {question.description && (
            <Typography variant="body2" className="mb-4 text-gray-600 dark:text-gray-300">
              {question.description}
            </Typography>
          )}
          {renderInput(question.type, question.options)}
        </Box>
      ))}
    </div>
  );
};

const renderInput = (type: string, options?: { value: string }[]) => {
  switch (type) {
    case QuestionTypes.singleLineString:
      return <TextField fullWidth disabled placeholder="Text input" variant="outlined" />;
    case QuestionTypes.multiLineString:
      return <TextField fullWidth multiline rows={3} disabled placeholder="Multi-line text" variant="outlined" />;
    case QuestionTypes.positiveInteger:
      return <TextField fullWidth type="number" disabled placeholder="0" variant="outlined" />;
    case QuestionTypes.checkbox:
      return (
        <Grid container spacing={1.5}> {/* Сетка с отступами между элементами */}
          {options?.map((option, idx) => (
            <Grid item xs={6} key={idx}> {/* Каждый элемент занимает 6 колонок (половину ширины) */}
              <FormControlLabel
                control={<Checkbox disabled />}
                label={option.value}
                className="ml-0" // Убираем лишний отступ
                sx={{ width: "100%" }} // Занимает всю доступную ширину
              />
            </Grid>
          ))}
        </Grid>
      );
    default:
      return null;
  }
};

const useTopicName = (topicId: string) => {
  const [topicName, setTopicName] = useState<string>("Loading...");

  useEffect(() => {
    const fetchTopicName = async () => {
      try {
        const topic = await getTopicNameById(topicId);
        setTopicName(topic.title);
      } catch (error) {
        console.error("Error fetching topic name:", error);
        setTopicName("No topic selected");
      }
    };

    if (topicId) {
      fetchTopicName();
    } else {
      setTopicName("No topic selected");
    }
  }, [topicId]);

  return topicName;
};