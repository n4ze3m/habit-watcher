import { Modal, ScrollArea, SimpleGrid, Skeleton, Text } from "@mantine/core";
import { getAllhabbitsWithStats } from "../../services/storage";
import { HabbitCard } from "./HabbitCard";
import { useQuery } from "@tanstack/react-query";
import { Habbit } from "../../models/habbit";
import React from "react";
import { UpdaetHabit } from "./UpdateHabit";

export const HabbitList = () => {
	const fetchHabbit = async () => {
		const result = await getAllhabbitsWithStats();
		return result;
	};

	const { data, status } = useQuery(["fetchAllHabbits"], fetchHabbit);


	const [habbit, setHabbit] = React.useState<Habbit | null>(null)
	const [open, setOpen] = React.useState(false);


	return (
		<>
	
			{
				status === "loading" ? (<div>
					<Skeleton height={40} />
					<Skeleton my="md" height={60} />
					<Skeleton my="md" height={80} />
					<Skeleton height={20} />
				</div>) : null
			}
			{
				status === "success" ? <ScrollArea mt="lg">
						
					<SimpleGrid
						cols={2}
						spacing="lg"
						breakpoints={[
							{ maxWidth: 980, cols: 2, spacing: "md" },
							{ maxWidth: 755, cols: 1, spacing: "sm" },
							{ maxWidth: 600, cols: 1, spacing: "sm" },
						]}
					>
						{
						}
						{
							data.length > 0 ? data.map((habbit) => (<HabbitCard key={habbit.habbit.id} {...habbit}
								setHabbit={setHabbit}
								setIsOpen={setOpen}
							/>))
								: <Text>
									Oh no! You don't have any habbits yet. Create one now!
								</Text>
						}
					</SimpleGrid>
					<Modal
						opened={open}
						onClose={() => setOpen(false)}
						title="Update Habit"
					>
						{
							habbit ? <UpdaetHabit {...habbit} onFinish={() => setOpen(false)} /> : null
						}
					</Modal>
				</ScrollArea> : null
			}
			{
				status === "error" ? (<div>
					<Text>
						There was an error fetching your habbits
					</Text>
				</div>
				) : null
			}
		</>
	);
};
