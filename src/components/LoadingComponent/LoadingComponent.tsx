import LoopIcon from '@mui/icons-material/Loop';
import './LoadingComponent.scss';

const LoadingComponent = () => {
    return (
        <div className={"loading-component"}>
            <LoopIcon className={"loading-spinner"}/>
        </div>
    )
}

export default LoadingComponent;