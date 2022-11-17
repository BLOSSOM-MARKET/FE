import { createQueryObj } from "./searchutils";

    const onClickPageBtn = (e, path, searchParams) => {
        const queryList = [...searchParams];
        const q = createQueryObj(queryList);
    }