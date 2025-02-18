"use client";

import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, Chip, Box, Stack, IconButton, InputAdornment } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddIcon from "@mui/icons-material/Add"; // Импортируем иконку плюса

const TagSelector = () => {
  const { setValue, watch } = useFormContext();
  const [tags, setTags] = useState<string[]>([]); // Все существующие теги
  const [inputValue, setInputValue] = useState(""); // Текущее значение в инпуте
  const [selectedTags, setSelectedTags] = useState<string[]>(watch("tags") || []); // Выбранные теги
  const [isOpen, setIsOpen] = useState(false); // Состояние открытия меню автокомплита

  // Загрузка существующих тегов при монтировании компонента
  useEffect(() => {
    fetchTags();
  }, []);

  // Функция для загрузки всех тегов
  const fetchTags = async () => {
    try {
      const response = await fetch("http://localhost:5000/tags");
      const data = await response.json();
      setTags(data.map((tag) => tag.name));
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  // Обновляем значение в форме при изменении selectedTags
  useEffect(() => {
    setValue("tags", selectedTags);
    console.log("tags", selectedTags);
  }, [selectedTags, setValue]);

  // Обработчик добавления тега
  const handleAddTag = async (tag: string) => {
    if (!tag.trim()) return; // Игнорируем пустые теги

    if (selectedTags.includes(tag.trim())) {
      toast.error("This tag is already selected.");
      return;
    }

    try {
      // Отправляем новый тег на бэкенд
      const response = await fetch("http://localhost:5000/tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tag: tag.trim() }),
      });

      if (response.ok) {
        const newTag = await response.json();
        setSelectedTags([...selectedTags, newTag.name]);
        setInputValue(""); // Очищаем инпут
      }
    } catch (error) {
      console.error("Error adding tag:", error);
      toast.error("Failed to add tag.");
    }
  };

  // Обработчик удаления тега
  const handleDeleteTag = (tagToDelete: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToDelete));
  };

  // Обработчик поиска тегов для автокомплита
  const handleSearchTags = async (searchQuery: string) => {
    if (searchQuery) {
      try {
        const response = await fetch(
          `http://localhost:5000/tags?search=${searchQuery}`
        );
        const data = await response.json();
        setTags(data.map((tag) => tag.name));
      } catch (error) {
        console.error("Error searching tags:", error);
      }
    }
  };

  // Фильтруем теги, исключая уже выбранные
  const filteredTags = tags.filter((tag) => !selectedTags.includes(tag));

  return (
    <div>
      {/* Контейнер для выбранных тегов */}
      <Box sx={{ mb: 2 }}>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {selectedTags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleDeleteTag(tag)}
              sx={{ marginBottom: 1 }} // Добавляем отступ между тегами
            />
          ))}
        </Stack>
      </Box>

      {/* Поле ввода для поиска и добавления тегов */}
      <Autocomplete
        freeSolo // Позволяет вводить произвольные значения
        options={filteredTags} // Используем отфильтрованные теги
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          handleSearchTags(newInputValue); // Вызываем поиск тегов при изменении инпута
        }}
        onChange={(event, newValue) => {
          if (newValue) {
            handleAddTag(newValue);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && inputValue.trim()) {
            handleAddTag(inputValue);
          }
        }}
        open={isOpen} // Управляем открытием меню
        onOpen={() => {
          fetchTags(); // Загружаем все теги при открытии меню
          setIsOpen(true); // Открываем меню при фокусе
        }}
        onClose={() => setIsOpen(false)} // Закрываем меню при потере фокуса
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select or add tags"
            placeholder="Type a tag and press Enter"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {/* Кнопка добавления тега (отображается только если есть текст) */}
                  {inputValue.trim() && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleAddTag(inputValue)}
                        edge="end" // Фиксируем иконку справа
                      >
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  )}
                  {/* Очистка стандартных элементов Autocomplete */}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </div>
  );
};

export default TagSelector;