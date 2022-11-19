import { Center, Modal, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import ReactConfetti from "react-confetti";
import { AddBtn } from "./components/Home/AddBtn";
import { HabbitList } from "./components/Home/HabbitList";
import { useConfetti } from "./hooks/useConfetti";
function App() {
	const { height, width } = useViewportSize()

	const { show, setShowing } = useConfetti()

	return (
		<>
			<Center hidden={!show}>
				<ReactConfetti
					height={height}
					width={width * 0.95}
				/>

			</Center>
			<AddBtn />
			<HabbitList />
			<Modal opened={show} onClose={() => setShowing(false)} centered={true}
				title="You did it! 🎉">
				<Text align="center">
					You have completed all your habbits for today! Good job!
				</Text>
			</Modal>
		</>
	);
}

export default App;
