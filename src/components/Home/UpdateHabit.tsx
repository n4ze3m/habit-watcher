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
import { updateHabbit } from "../../services/storage";
import { showNotification } from "@mantine/notifications";
import { Habbit } from "../../models/habbit";

interface UpdateHabitProps extends Habbit {
    onFinish: () => void;
}

export function UpdaetHabit({ name, id, onFinish }: UpdateHabitProps) {
    const client = useQueryClient();
    const form = useForm({
        initialValues: {
            name: name,
        },
    });

    const onHabbitSubmit = async (name: string) => {
        await updateHabbit(id, name);
    };

    const { mutate: update, isLoading } = useMutation(onHabbitSubmit, {
        onSuccess: () => {
            showNotification({
                title: "Success",
                message: "Great! You've updated your habit",
                color: "teal",
            })
            client.invalidateQueries(["fetchAllHabbits"]);
            onFinish();
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
        "Take a nap 💤",
        "Take a shower 🚿",
        "Eat a healthy meal 🍎",
    ]

    return (
        <Paper radius="md" p="xl" withBorder={true}>
            <Text size="lg" weight={500}>
                {"So, what's your new habit name?"}
            </Text>
            <form onSubmit={form.onSubmit((value) => update(value.name))}>
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
                        Update Habit
                    </Button>
                </Group>
            </form>
        </Paper>
    );
}
