import { useQuery, useQueryClient } from "@tanstack/react-query";

const EDITOR_CONTENT_KEY = "editor_content";

export const useEditorContent = (boardId: string) => {
  const queryClient = useQueryClient();
  const queryKey = [EDITOR_CONTENT_KEY, boardId];

  const {
    data: content,
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn: () => "", // default empty content
  });

  const setContent = (newContent: string | ((prev: string) => string)) => {
    let updatedContent: string;

    if (typeof newContent === "function") {
      const currentContent = queryClient.getQueryData<string>(queryKey) || "";
      updatedContent = newContent(currentContent);
    } else {
      updatedContent = newContent;
    }

    queryClient.setQueryData(queryKey, updatedContent);
  };

  return {
    content: content || "",
    setContent,
    isLoading,
    error,
  };
};