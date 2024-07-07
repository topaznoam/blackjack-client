
type PointsProps = {
    number: number | null;
}

const Points: React.FC<PointsProps> = ({ number }) => {
    if(number !== null){
        var point = <strong>{number}</strong>;
    }
    else{
        var point = <strong>?</strong>;
    }
    return <h1>{point}</h1>
}

export default Points;
