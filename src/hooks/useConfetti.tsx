import React from "react";

export interface ConfettiType {
    show: boolean;
    visible: boolean;
    setShowing: (show: boolean) => void;
}

export const ConfettiContext = React.createContext<ConfettiType>({
    show: false,
    visible: false,
    setShowing: () => {}
})

export const useConfetti = () => {
    const context = React.useContext(ConfettiContext)
    if (context === undefined) {
        throw new Error('useConfetti must be used within a ConfettiProvider')
    }
    return context
}

export const ConfettiProvider = (props: {
    children: React.ReactNode
}) => {
    const [show, setShow] = React.useState(false)
    const [visible, setVisible] = React.useState(false)

    const setShowing = (show: boolean) => {
        setShow(show)
    }


    const value = React.useMemo(() => {
        return {
            show,
            visible,
            setShowing,
        }
    }, [show, visible])

    return (
        <ConfettiContext.Provider value={value}>
            {props.children}
        </ConfettiContext.Provider>
    )
}


