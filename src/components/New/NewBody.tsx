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

export function NewBody() {
	const form = useForm({
		initialValues: {
			name: "",
		},
	});

	return (
		<Paper radius="md" p="xl" withBorder={true}>
			<Text size="lg" weight={500}>
				{`Let's Start an Awesome Habit 👀`}
			</Text>
			<form onSubmit={form.onSubmit(() => {})}>
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
						<Chip value="Walk the dog 🐶">{`Walk the dog 🐶`}</Chip>
						<Chip value="Go to the gym 🏋️‍♂️">{`Go to the gym 🏋️‍♂️`}</Chip>
						<Chip value="Read a book 📚">{`Read a book 📚`}</Chip>
						<Chip value="Meditate 🧘‍♂️">{`Meditate 🧘‍♂️`}</Chip>
						<Chip value="Drink water 💧">{`Drink water 💧`}</Chip>
						<Chip value={"Eat healthy 🥗"}>{`Eat healthy 🥗`}</Chip>
						<Chip value={"Sleep early 🛌"}>{`Sleep early 🛌`}</Chip>
					</Chip.Group>
				</Stack>

				<Group position="apart" mt="xl">
					<Button fullWidth={true} type="submit" color="teal">
						Create Habbit
					</Button>
				</Group>
			</form>
		</Paper>
	);
}
