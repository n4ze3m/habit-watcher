import { UnstyledButton } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const BackBtn = () => {
	const navigate = useNavigate();
	return (
		<UnstyledButton mb="md" onClick={() => navigate(-1)}>
			{"⬅ Back"}
		</UnstyledButton>
	);
};
