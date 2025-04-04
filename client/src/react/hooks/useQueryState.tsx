import Spinner from "../UI/Spinner/Spinner";
import Error from "../UI/Error/Error";
import EmptyData from "../UI/EmptyData/EmptyData";

type styleProps = {
    spinnerSize?: number;
    spinnerColor?: string;
    spinnerSpeedMultiplier?: number;

    errorWidth?: number;
    errorHeight?: number;

    emptyDataWidth?: number;
    emptyDataHeight?: number;
    emptyDataFontSize?: number;
}

const useQueryState = (isFetching: boolean, isError: boolean, data?: any, style? : styleProps) => {
    if (isFetching) return <Spinner size={style?.spinnerSize} color={style?.spinnerColor} speedMultiplier={style?.spinnerSpeedMultiplier}/>;
    if (isError) return <Error width={style?.errorWidth || 300} height={style?.errorHeight || 300}/>;
    if (!isFetching && data?.result?.length === 0) return <EmptyData fontSize={style?.emptyDataFontSize || 20} width={style?.emptyDataWidth} height={style?.emptyDataHeight} />;
    return null;
}

export default useQueryState;