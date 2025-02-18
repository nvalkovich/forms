"use client";

import { useEffect, useState } from "react";
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { getTopics } from "@/services/api";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

interface Topic {
  id: string;
  title: string;
}

const TopicSelector = () => {
  const { register, setValue } = useFormContext();
  const t = useTranslations("TemplateBuilder");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>("");

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await getTopics();
        setTopics(data);
      } catch {
        toast.error("Error fetching themes");
      }
    };

    fetchTopics();
  }, []);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedTopic(value);
    setValue("topic", value);
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="topic-label">{t("topic")}</InputLabel>
      <Select
        {...register("topic")}
        labelId="topic-label"
        id="topic-select"
        value={selectedTopic}
        onChange={handleChange}
        label={t("topic")}
      >
        {topics.map((topic) => (
          <MenuItem key={topic.id} value={topic.id}>
            {topic.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TopicSelector;