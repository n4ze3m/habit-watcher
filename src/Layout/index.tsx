import { AppShell, Container } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { HabbitHeader } from "./HabbitHeader";

type LayoutProps = {
	children?: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
	return (
		<AppShell padding="md" header={<HabbitHeader />}>
			<Container p="md">{children || <Outlet />}</Container>
		</AppShell>
	);
};
