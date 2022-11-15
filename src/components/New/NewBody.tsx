import { useForm } from "@mantine/form";
import {
	TextInput,
	Text,
	Paper,
	Group,
	Button,
	Chip,
	Stack,
} from "@mantine/core";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHabbit } from "../../services/storage";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";

export function NewBody() {
	const client = useQueryClient();
	const navigate = useNavigate();
	const form = useForm({
		initialValues: {
			name: "",
		},
	});

	const onHabbitSubmit = async (name: string) => {
		await createHabbit(name);
	};

	const { mutate: addHabbit, isLoading } = useMutation(onHabbitSubmit, {
		onSuccess: () => {
			showNotification({
				title: "Success",
				message: "Awesome! You've created a new habit",
				color: "teal",
			})
			client.invalidateQueries(["fetchAllHabbits"]);
			navigate("/");
		},
		onError: (e) => {
			showNotification({
				title: "Error",
				message: "There was an error creating your habit",
				color: "red",
			})
		},
	});

	const suggestions = [
		"Walk the dog 🐶",
		"Drink water 💧",
		"Read a book 📚",
		"Go for a run 🏃‍♂️",
		"Go to the gym 🏋️‍♂️",
		"Meditate 🧘‍♂️",
		"Take a nap 💤",
		"Take a shower 🚿",
		"Eat a healthy meal 🍎",
	]

	return (
		<Paper radius="md" p="xl" withBorder={true}>
			<Text size="lg" weight={500}>
				{`Let's Start an Awesome Habit 👀`}
			</Text>
			<form onSubmit={form.onSubmit((value) => addHabbit(value.name))}>
				<Stack my="md">
					<TextInput
						required={true}
						placeholder="Walk the dog 🐶"
						value={form.values.name}
						onChange={(event) =>
							form.setFieldValue("name", event.currentTarget.value)
						}
					/>
					<Chip.Group
						position="center"
						onChange={(value) => {
							if (typeof value === "string") {
								form.setFieldValue("name", value);
							} else {
								form.setFieldValue("name", value.join(""));
							}
						}}
					>
						{
							suggestions.map((suggestion) => (
								<Chip key={suggestion} value={suggestion}>
									{suggestion}
								</Chip>
							))
						}
					</Chip.Group>
				</Stack>

				<Group position="apart" mt="xl">
					<Button
						fullWidth={true}
						type="submit"
						color="teal"
						loading={isLoading}
					>
						Create Habit
					</Button>
				</Group>
			</form>
		</Paper>
	);
}
