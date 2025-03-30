import { useState, useEffect, useCallback } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import axios from "axios";
import {
	sleeperDraftAtom,
	sleeperDraftIdAtom,
	sleeperPicksAtom,
	remainingPlayersAtom,
} from "../Atoms";
import { SleeperDraft, SleeperPick } from "../types";

type UseSleeperDraftResult = {
	isLoading: boolean;
	error: Error | null;
};

//This handles watching the sleeper draft and removing players
export function useSleeperDraft(): UseSleeperDraftResult {
	const draftId = useAtomValue(sleeperDraftIdAtom);
	const setRemainingPlayers = useSetAtom(remainingPlayersAtom);
	const [draft, setDraft] = useAtom(sleeperDraftAtom);
	const setPicks = useSetAtom(sleeperPicksAtom);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchDraft = useCallback(async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<SleeperDraft>(
				`https://api.sleeper.app/v1/draft/${draftId}`
			);
			setDraft(data);
		} catch (err) {
			setError(
				err instanceof Error
					? err
					: new Error("An unknown error occurred")
			);
		} finally {
			setIsLoading(false);
		}
	}, [draftId, setDraft]);

	const fetchPicks = useCallback(async () => {
		try {
			setIsLoading(true);
			const { data: picks } = await axios.get<SleeperPick[]>(
				`https://api.sleeper.app/v1/draft/${draftId}/picks?cacheBust=${Date.now()}`
			);
			setPicks(picks);
			setRemainingPlayers((prev) => ({
				...prev!,
				Players:
					prev?.Players.filter(
						(p) =>
							!picks.some(
								(pick) => pick.player_id === p.player_id
							)
					) ?? [],
			}));
		} catch (err) {
			setError(
				err instanceof Error
					? err
					: new Error("An unknown error occurred")
			);
		} finally {
			setIsLoading(false);
		}
	}, [draftId, setPicks, setRemainingPlayers]);

	useEffect(() => {
		fetchDraft();
		fetchPicks();
	}, [fetchDraft]);

	useEffect(() => {
		if (!error && draft) {
			const pollFreq =
				Math.min(
					Math.max((draft?.settings?.pick_timer ?? 30) / 12, 5),
					60
				) * 1000;
			const intervalId = setInterval(fetchPicks, pollFreq);
			return () => clearInterval(intervalId);
		}
	}, [error, draft, fetchPicks]);

	return { isLoading, error };
}
