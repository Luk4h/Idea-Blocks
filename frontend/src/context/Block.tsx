import { useState, createContext, useContext } from "react";

const BlockContext = createContext<any>({})

export const BlockProvider = ({ children }: any) => {
    const [block, setBlock] = useState<any>({});

    const selectBlock = (block: any) => {
        setBlock(block);
    }

    return (
        <BlockContext.Provider value={{ block, setBlock }}>
            {children}
        </BlockContext.Provider>
    )
}

export const useBlock = () => {
    const context = useContext(BlockContext)
    return context
}