import { Skeleton } from "@mantine/core";

export const HabitLoading = () => {
	return (
		<div>
			<Skeleton height={40} />
			<Skeleton my="md" height={60} />
			<Skeleton my="md" height={80} />
			<Skeleton height={20} />
		</div>
	);
};
