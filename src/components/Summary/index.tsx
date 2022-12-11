import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getHabitByID } from "../../services/storage";
import { createStyles, Group, Paper, Text, ThemeIcon, SimpleGrid } from '@mantine/core';
import { HabitLoading } from "../Common/HabitLoading";
import { SummaryStatsCard } from "./SummartStatsCard";
import { BackBtn } from "../Common/BackBtn";
const useStyles = createStyles((theme) => ({
    root: {
        padding: theme.spacing.xl * 1.5,
    },
}));


export const SummaryBody = () => {
    const { classes } = useStyles();
    const params = useParams()
    const navigate = useNavigate()

    const fetchData = async () => {
        const id = params.id as string
        const response = await getHabitByID(+id)
        return response
    }

    const { data, status } = useQuery(['fetchHabitByID', params.id], fetchData, {
        refetchOnWindowFocus: false,
        enabled: Boolean(params.id),
        onError: () => navigate('/')
    })


    return (
        <div>
            {status === "loading" ? <HabitLoading /> : null}
            {status === "error" ? <Text>Something went wrong</Text> : null}
            {status === "success" ? (
                <div className={classes.root}>


                    <Group>
                        <BackBtn />
                            <Text size="xl" weight={700} mb="md">
                                {data.habbit.name}
                            </Text>
                    </Group>


                    <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                        {
                            data.stats.map((stat, i) => (<SummaryStatsCard key={i} {...stat} />))
                        }
                    </SimpleGrid>
                </div>
            ) : null}
        </div>
    )
}