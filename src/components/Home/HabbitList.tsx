import { ScrollArea, SimpleGrid } from "@mantine/core";
import { HabbitCard } from "./HabbitCard";

export const HabbitList = () => {
	return (
		<ScrollArea mt="lg">
			<SimpleGrid
				cols={2}
				spacing="lg"
				breakpoints={[
					{ maxWidth: 980, cols: 2, spacing: "md" },
					{ maxWidth: 755, cols: 1, spacing: "sm" },
					{ maxWidth: 600, cols: 1, spacing: "sm" },
				]}
			>
				<HabbitCard />
				<HabbitCard />
				<HabbitCard />
				<HabbitCard />
				<HabbitCard />
			</SimpleGrid>
		</ScrollArea>
	);
};
