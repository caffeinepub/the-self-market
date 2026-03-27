import { useQuery } from "@tanstack/react-query";
import type { Category, Item, JournalEntry } from "../backend.d";
import { SAMPLE_ITEMS, SAMPLE_JOURNAL_ENTRIES } from "../data/sampleData";
import { useActor } from "./useActor";

export function useAllItems() {
  const { actor, isFetching } = useActor();
  return useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: async () => {
      if (!actor) return SAMPLE_ITEMS;
      const result = await actor.getAllItems();
      return result.length > 0 ? result : SAMPLE_ITEMS;
    },
    enabled: !isFetching,
    placeholderData: SAMPLE_ITEMS,
  });
}

export function useItemsByCategory(category: Category) {
  const { actor, isFetching } = useActor();
  return useQuery<Item[]>({
    queryKey: ["items", category],
    queryFn: async () => {
      if (!actor) return SAMPLE_ITEMS.filter((i) => i.category === category);
      const result = await actor.getItemsByCategory(category);
      return result.length > 0
        ? result
        : SAMPLE_ITEMS.filter((i) => i.category === category);
    },
    enabled: !isFetching,
    placeholderData: SAMPLE_ITEMS.filter((i) => i.category === category),
  });
}

export function useJournalEntries() {
  const { actor, isFetching } = useActor();
  return useQuery<JournalEntry[]>({
    queryKey: ["journal"],
    queryFn: async () => {
      if (!actor) return SAMPLE_JOURNAL_ENTRIES;
      const result = await actor.getAllJournalEntries();
      return result.length > 0 ? result : SAMPLE_JOURNAL_ENTRIES;
    },
    enabled: !isFetching,
    placeholderData: SAMPLE_JOURNAL_ENTRIES,
  });
}
