import { Header, Text, createStyles, Container } from "@mantine/core";
import { useNavigate } from "react-router-dom";
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
	return (
		<Header height={65}>
			<Container className={classes.inner} fluid={true}>
				<Text
					onClick={() => navigate("/")}
					className={classes.curosrPointer}
					weight="bold"
					size="lg"
				>
					Habit Watcher
				</Text>
			</Container>
		</Header>
	);
};
