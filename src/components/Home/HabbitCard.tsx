import { Group, Card, Text, Checkbox, Menu, createStyles, Divider } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Calendar from "react-github-contribution-calendar";
import { Habbit, HabbitView } from "../../models/habbit";
import { checkHabbit, deleteHabbit } from "../../services/storage";

var panelColors = ["#0d1117", "#39d353"];



const useStyles = createStyles((theme) => ({
	icon: {
		height: 30,
		width: 30,
		color: theme.colors.gray[7],
	}
}));
export const HabbitCardStats = ({
	label,
	value,
}: {
	label: string;
	value: number;
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

interface HabbitCardProps extends HabbitView {
	setHabbit: React.Dispatch<React.SetStateAction<Habbit | null>>;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HabbitCard = (view: HabbitCardProps) => {

	const client = useQueryClient()
	const { classes } = useStyles();


	const [checked, setChecked] = React.useState(view.isChecked);


	const { mutate: checkHabbitMutation } = useMutation(checkHabbit, {
		onSuccess: (data) => {
			client.invalidateQueries(["fetchAllHabbits"])
			showNotification({
				title: "Success",
				message: data,
				color: "teal",
			})
		},
		onError: () => {
			showNotification({
				title: "Error",
				message: "There was an error checking your habit",
				color: "red",
			})
		}
	})


	const { mutate: deleteHabbitMutation } = useMutation(deleteHabbit, {
		onSuccess: (data) => {
			client.invalidateQueries(["fetchAllHabbits"])
			showNotification({
				title: "Success",
				message: data,
				color: "teal",
			})
		},
		onError: () => {
			showNotification({
				title: "Error",
				message: "There was an error deleting your habit",
				color: "red",
			})
		}
	})





	return (
		<Card withBorder={true} p="md">
			<Group position="apart">
				<Text weight="bold" size="lg">
					{view.habbit.name}
				</Text>
				<div>
					<Group spacing={0} position="right">

						<Menu trigger="hover" openDelay={100} closeDelay={400} position="bottom-end">
							<Menu.Target>
								<svg className={classes.icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
									<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
								</svg>

							</Menu.Target>

							<Menu.Dropdown>
								<Menu.Item
									onClick={() => {
										view.setHabbit(view.habbit)
										view.setIsOpen(true)
									}}
								>
									Rename Habbit
								</Menu.Item>
								<Menu.Divider />
								<Menu.Label

								>Danger zone</Menu.Label>
								<Menu.Item color="red" onClick={() => {
									deleteHabbitMutation(view.habbit.id)
								}}>
									Remove Habbit
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					</Group>
				</div>
			</Group>
			<Group position="apart" my="md">
				{
					view.stats.map((stat) => (<HabbitCardStats key={stat.name} label={stat.name} value={stat.value} />))
				}
			</Group>
			<Calendar
				values={view.contributions}
				until={view.untilDate.toString()}
				weekLabelAttributes={undefined}
				monthLabelAttributes={undefined}
				panelAttributes={undefined}
				panelColors={panelColors}
			/>
			<Divider my="sm" />
			<Checkbox color="teal" size="lg"
				checked={checked}
				width="100%"
				label={checked ? "Done today" : "Mark as done"}
				onChange={(e) => {
					setChecked(e.currentTarget.checked);
					checkHabbitMutation(view.habbit.id);
				}}
			/>
		</Card>
	);
};
