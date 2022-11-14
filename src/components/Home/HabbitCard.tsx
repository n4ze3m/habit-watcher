import { Group, Card, Text, Checkbox } from "@mantine/core";
import Calendar from "react-github-contribution-calendar";

var values = {
	"2016-06-23": 1,
	"2016-06-26": 1,
	"2016-06-27": 1,
	"2016-06-28": 1,
	"2016-06-29": 1,
};
var until = "2016-06-30";
var panelColors = ["#0d1117", "#39d353"];

export const HabbitCardStats = ({
	label,
	value,
}: {
	label: string;
	value: string;
}) => {
	return (
		<div>
			<Text weight={700} size="xl" align="center">
				{value}
			</Text>
			<Text color="dimmed" transform="uppercase" weight={700} size="xs">
				{label}
			</Text>
		</div>
	);
};
export const HabbitCard = () => {
	return (
		<Card withBorder={true} p="md">
			<Group position="apart">
				<Text weight="bold" size="lg">
					Habbit Name
				</Text>
				<Checkbox color="teal" size="lg" />
			</Group>
			<Group position="apart" my="md">
				<HabbitCardStats label="Completed" value="5" />
				<HabbitCardStats label="Missed" value="2" />
				<HabbitCardStats label="Current Streak" value="3" />
			</Group>
			<Calendar
				values={values}
				until={until}
				weekLabelAttributes={undefined}
				monthLabelAttributes={undefined}
				panelAttributes={undefined}
				panelColors={panelColors}
			/>
		</Card>
	);
};
