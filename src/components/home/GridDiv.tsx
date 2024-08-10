interface GridDivProps {
    height: string;
    grid? : string;
    children?: React.ReactNode;
}

const GridDiv = ({height, grid,children} : GridDivProps) =>{
    return(
        <div className={`${height} ${grid} rounded-2xl bg-[#fbfbfb] p-3 shadow-GridDiv`}>
            {children}
        </div>
    )
}

export default GridDiv;