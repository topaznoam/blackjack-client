
type PointsProps = {
    number: number | null;
}

const Points: React.FC<PointsProps> = ({ number }) => {
    
    return <h1>{number}</h1>
}

export default Points;
