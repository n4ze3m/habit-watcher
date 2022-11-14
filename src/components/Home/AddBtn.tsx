import { Group, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const AddBtn = () => {
	const navigate = useNavigate();
	return (
		<Group position="right">
			<Button color="teal" onClick={() => navigate("/new")}>
				Add New Habit
			</Button>
		</Group>
	);
};
