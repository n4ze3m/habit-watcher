import { Group, Paper, Text, createStyles } from "@mantine/core";
import { HabbitStats } from "../../models/habbit";

const useStyles = createStyles((theme) => ({
    statsValue: {
        fontSize: 40,
    }
}))

export const SummaryStatsCard = (stat: HabbitStats) => {
    const { classes } = useStyles()
    return (
        <Paper withBorder={true} p="md" radius="md">
            <Group position="apart">
                <div>
                    <Text
                        color="dimmed"
                        transform="uppercase"
                        weight={700}
                        size="sm"
                    >
                        {stat.name}
                    </Text>
                    <Text weight="bold" className={classes.statsValue}>
                        {stat.value}
                    </Text>
                </div>
            </Group>
        </Paper>
    );
};
