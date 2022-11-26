import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getHabitByID } from "../../services/storage";

export const SummaryBody = () => {

    const params = useParams()
    const navigate = useNavigate()

    const fetchData = async () => {
        const id = params.id as string
        const response = await getHabitByID(+id)
        return response
    }

    const { data } = useQuery(['fetchHabitByID', params.id], fetchData, {
        refetchOnWindowFocus: false,
        enabled: Boolean(params.id),
        onError: () => navigate('/')
    })

    console.log(data)

    return (
        <div>
            {
                params.id
            }
        </div>
    )
}