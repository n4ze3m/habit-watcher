import { Header, Text, createStyles, Container, Indicator } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { getVersion } from '@tauri-apps/api/app';
import { useQuery } from "@tanstack/react-query";
const useStyles = createStyles((_) => ({
	inner: {
		height: 65,
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
	curosrPointer: {
		cursor: "pointer",
		userSelect: "none",
	},
}));
export const HabbitHeader = () => {
	const { classes } = useStyles();
	const navigate = useNavigate();

	const { data: version } = useQuery(["getTauriVersion"], async () => {
		const appVersion = await getVersion();
		return appVersion;
	})


	return (
		<Header height={65}>
			<Container className={classes.inner} fluid={true}>
				<Indicator inline={true} label={`v${version}`} offset={-4} size={12} color="teal">
					<Text
						onClick={() => navigate("/")}
						className={classes.curosrPointer}
						weight="bold"
						size="lg"
					>
						Habit Watcher
					</Text>
				</Indicator>
			</Container>
		</Header>
	);
};
